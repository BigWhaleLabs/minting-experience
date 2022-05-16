import { FC } from 'react'
import { Suspense } from 'react'
import EnsStore from 'stores/EnsStore'
import maxAddressLength from 'helpers/maxAddressLength'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useEnsNameOrAddress from 'hooks/useEnsNameOrAddress'

function EnsAddressSuspender({ address }: { address: string }) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return <>{truncateMiddleIfNeeded(ensNameOrAddress, maxAddressLength)}</>
}

const EnsAddress: FC<{ address: string }> = ({ address }) => {
  EnsStore.fetchEnsName(address)

  return (
    <Suspense
      fallback={<>{truncateMiddleIfNeeded(address, maxAddressLength)}</>}
    >
      <EnsAddressSuspender address={address} />
    </Suspense>
  )
}

export default EnsAddress
