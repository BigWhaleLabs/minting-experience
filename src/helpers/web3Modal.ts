import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnect from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import env from 'helpers/env'

export default new Web3Modal({
  cacheProvider: true,
  theme: 'dark',
  disableInjectedProvider: false,
  network: env.VITE_ETH_NETWORK,
  providerOptions: {
    walletconnect: {
      package: WalletConnect,
      options: {
        rpc: {
          5: env.VITE_ETH_RPC,
        },
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: env.VITE_APP_NAME,
        rpc: {
          5: env.VITE_ETH_RPC,
        },
        darkMode: true,
      },
    },
  },
})
