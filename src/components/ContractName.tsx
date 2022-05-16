import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import maxAddressLength from 'helpers/maxAddressLength'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

function ContractNameComponent({ address }: { address: string }) {
  const { contractNames } = useSnapshot(SealCredStore)

  return (
    <>
      {contractNames[address] ||
        truncateMiddleIfNeeded(address, maxAddressLength)}
    </>
  )
}

export default function ContractName({ address }: { address: string }) {
  return (
    <Suspense
      fallback={<>{truncateMiddleIfNeeded(address, maxAddressLength)}</>}
    >
      <ContractNameComponent address={address} />
    </Suspense>
  )
}
