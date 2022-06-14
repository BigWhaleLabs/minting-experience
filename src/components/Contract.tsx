import {
  SimpleERC721,
  SimpleERC721__factory,
} from '@big-whale-labs/simple-erc721'
import { SubheaderText } from 'components/Text'
import { Suspense, useState } from 'react'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import ContractName from 'components/ContractName'
import ContractsStore from 'stores/ContractsStore'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  justifyContent,
  padding,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  borderWidth('border'),
  borderColor('border-blue-500'),
  borderRadius('rounded'),
  padding('p-2')
)

function MintButton({ contract }: { contract: SimpleERC721 }) {
  const { account } = useSnapshot(WalletStore)
  const { balanceMap } = useSnapshot(ContractsStore)
  const accountOwnsContract = balanceMap[contract.address]?.gt(0)
  const [loading, setLoading] = useState(false)

  return (
    <Button
      title={
        !account ? 'Connect wallet' : accountOwnsContract ? 'Owned' : 'Mint'
      }
      disabled={accountOwnsContract}
      loading={loading}
      onClick={async () => {
        if (!WalletStore.account) {
          return WalletStore.connect()
        }
        setLoading(true)
        try {
          if (!WalletStore.provider) throw new Error('No provider found')
          const contractWithSigner = SimpleERC721__factory.connect(
            contract.address,
            WalletStore.provider.getSigner(0)
          )
          const tx = await contractWithSigner.mint()
          await tx.wait()
        } catch (error) {
          handleError(error)
        } finally {
          setLoading(false)
        }
      }}
    />
  )
}

export default function ({ contract }: { contract: SimpleERC721 }) {
  return (
    <div className={container}>
      <SubheaderText>
        <ContractName address={contract.address} />
      </SubheaderText>
      <Suspense fallback={<Button loading />}>
        <MintButton contract={contract} />
      </Suspense>
    </div>
  )
}
