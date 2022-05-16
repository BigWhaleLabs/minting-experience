import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'

export default function ListOfContracts() {
  const { ledger } = useSnapshot(SealCredStore)
  const contractAddresses = Object.keys(ledger)
  return (
    <>
      {contractAddresses.map((contractAddress) => (
        <BodyText key={contractAddress}>{contractAddress}</BodyText>
      ))}
    </>
  )
}
