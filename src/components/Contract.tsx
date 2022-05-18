import { BodyText, SubheaderText } from 'components/Text'
import { SimpleERC721__factory } from '@big-whale-labs/simple-erc721'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Button from 'components/Button'
import ContractName from 'components/ContractName'
import SealCredStore from 'stores/SealCredStore'
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
  space,
} from 'classnames/tailwind'
import env from 'helpers/env'

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
const buttonContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-end'),
  space('space-y-2')
)

export default function ({ address }: { address: string }) {
  const { account } = useSnapshot(WalletStore)
  const { originalContractsToOwnersMaps } = useSnapshot(SealCredStore)
  const owners = Object.values(originalContractsToOwnersMaps[address])
  const accountOwnsContract = !!account && owners.includes(account)
  const isDosuInvites = env.VITE_DOSU_INVITES_CONTRACT_ADDRESS === address
  const [loading, setLoading] = useState(false)

  return (
    <div className={container}>
      <SubheaderText>
        <ContractName address={address} />
      </SubheaderText>
      <div className={buttonContainer}>
        <Button
          title={
            !account ? 'Connect wallet' : accountOwnsContract ? 'Owned' : 'Mint'
          }
          disabled={accountOwnsContract}
          loading={loading}
          onClick={async () => {
            if (isDosuInvites) {
              return window.open('https://invites.dosu.io', '_blank')
            }
            if (!WalletStore.account) {
              return WalletStore.connect()
            }
            setLoading(true)
            try {
              const ledger = await SealCredStore.ledger
              const ledgerRecord = ledger[address]
              if (!ledgerRecord) throw new Error('Contract not found')
              const { originalContract } = ledgerRecord
              if (!WalletStore.provider) throw new Error('No provider found')
              const contractWithSigner = SimpleERC721__factory.connect(
                originalContract.address,
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
        <BodyText>
          Total minted:{' '}
          {Object.keys(originalContractsToOwnersMaps[address]).length}
        </BodyText>
      </div>
    </div>
  )
}
