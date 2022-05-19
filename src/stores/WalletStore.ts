import { ErrorList, handleError } from 'helpers/handleError'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import env from 'helpers/env'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore {
  account?: string
  walletLoading = false

  get cachedProvider() {
    return web3Modal.cachedProvider
  }

  get provider() {
    return provider
  }

  async connect(clearCachedProvider = false) {
    this.walletLoading = true
    try {
      if (clearCachedProvider) web3Modal.clearCachedProvider()

      const instance = await web3Modal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== env.VITE_ETH_NETWORK && env.VITE_ETH_NETWORK)
        throw new Error(
          ErrorList.wrongNetwork(userNetwork, env.VITE_ETH_NETWORK)
        )
      this.account = (await provider.listAccounts())[0]
      this.subscribeProvider(instance)
    } catch (error) {
      if (error !== 'Modal closed by user') {
        handleError(error)
        this.clearData()
      }
    } finally {
      this.walletLoading = false
    }
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.walletLoading = true
    const accounts = await provider.listAccounts()
    this.account = accounts[0]
    this.walletLoading = false
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', (accounts: string[]) => {
      accounts.length ? void this.handleAccountChanged() : this.clearData()
    })
    provider.on('disconnect', (error: unknown) => {
      if (provider) provider.removeAllListeners()
      handleError(error)
      this.clearData()
    })
    provider.on('chainChanged', async () => {
      this.account = undefined
      await this.connect()
    })
  }

  private clearData() {
    web3Modal.clearCachedProvider()
    this.account = undefined
  }
}

const exportedStore = proxy(new WalletStore())

if (exportedStore.cachedProvider) void exportedStore.connect()

export default exportedStore
