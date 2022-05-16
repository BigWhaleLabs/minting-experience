import { BodyText } from 'components/Text'
import { margin } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import WalletStore from 'stores/WalletStore'

const container = margin('my-2')
export default function () {
  const { account } = useSnapshot(WalletStore)
  return account ? (
    <div className={container}>
      <BodyText>
        Account connected: <EnsAddress address={account} />
      </BodyText>
    </div>
  ) : null
}
