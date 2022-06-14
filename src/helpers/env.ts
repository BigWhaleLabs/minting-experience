import { ETH_NETWORK, ETH_RPC, FORTMATIC_KEY } from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_APP_NAME: str(),
  VITE_FORTMATIC_KEY: str({ default: FORTMATIC_KEY }),
  VITE_ETH_NETWORK: str({ default: ETH_NETWORK }),
  VITE_ETH_RPC: str({ default: ETH_RPC }),
  VITE_ENCRYPT_KEY: str(),
})
