import { BodyText } from 'components/Text'
import { lazy } from 'react'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const Contract = lazy(() => import('components/Contract'))

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
      {!contractAddresses.length && (
        <BodyText>No contracts to mint yet!</BodyText>
      )}
      {contractAddresses.map((contractAddress) => (
        <div key={contractAddress}>
          <Contract address={contractAddress} />
        </div>
      ))}
    </div>
  )
}
