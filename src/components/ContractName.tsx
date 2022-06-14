import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import maxAddressLength from 'helpers/maxAddressLength'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

function ContractNameComponent({ address }: { address: string }) {
  const { contractNames } = useSnapshot(ContractsStore)

  return (
    <a
      href={`https://goerli.etherscan.io/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {contractNames[address] ||
        truncateMiddleIfNeeded(address, maxAddressLength)}
    </a>
  )
}

export default function ({ address }: { address: string }) {
  return (
    <Suspense
      fallback={<>{truncateMiddleIfNeeded(address, maxAddressLength)}</>}
    >
      <ContractNameComponent address={address} />
    </Suspense>
  )
}
