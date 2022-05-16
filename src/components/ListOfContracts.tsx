import { useSnapshot } from 'valtio'
import Contract from 'components/Contract'
import SealCredStore from 'stores/SealCredStore'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const contractList = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)
export default function () {
  const { ledger } = useSnapshot(SealCredStore)
  const contractAddresses = Object.keys(ledger)
  return (
    <div className={contractList}>
      {contractAddresses.map((contractAddress) => (
        <div key={contractAddress}>
          <Contract address={contractAddress} />
        </div>
      ))}
    </div>
  )
}
