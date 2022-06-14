import { BigNumber } from 'ethers'
import { SimpleERC721 } from '@big-whale-labs/simple-erc721'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import WalletStore from 'stores/WalletStore'
import contracts from 'helpers/contracts'

interface ContractsStoreType {
  contractNames: { [contractAddress: string]: Promise<string | undefined> }
  balanceMap: {
    [contractAddress: string]: Promise<BigNumber | undefined>
  }

  fetchContractNames: () => void
  fetchBalanceMap: () => void
}

const ContractsStore = proxy<ContractsStoreType>({
  contractNames: {},
  balanceMap: {},
  fetchContractNames() {
    for (const contract of contracts) {
      ContractsStore.contractNames[contract.address] = contract.name()
    }
  },
  fetchBalanceMap() {
    for (const contract of contracts) {
      fetchBalanceOf(contract)
    }
  },
})

ContractsStore.fetchContractNames()
ContractsStore.fetchBalanceMap()

function fetchBalanceOf(contract: SimpleERC721) {
  ContractsStore.balanceMap[contract.address] = WalletStore.account
    ? contract.balanceOf(WalletStore.account)
    : Promise.resolve(undefined)
}

for (const contract of contracts) {
  contract.on(contract.filters.Transfer(WalletStore.account), () => {
    fetchBalanceOf(contract)
  })
  contract.on(contract.filters.Transfer(null, WalletStore.account), () => {
    fetchBalanceOf(contract)
  })
}

subscribeKey(WalletStore, 'account', () => {
  ContractsStore.fetchBalanceMap()
})

export default ContractsStore
