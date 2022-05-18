import { QUERY_BLOCK_LIMIT } from '@big-whale-labs/constants'
import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import { SimpleERC721__factory } from '@big-whale-labs/simple-erc721'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import defaultProvider from 'helpers/defaultProvider'

export function getLedgerRecord(tokenAddress: string, merkleRoot: string) {
  return {
    merkleRoot,
    originalContract: SimpleERC721__factory.connect(
      tokenAddress,
      defaultProvider
    ),
  } as LedgerRecord
}

export default async function getLedger(sealCredLedger: SealCredLedger) {
  const eventsFilter = sealCredLedger.filters.SetMerkleRoot()
  const events = await sealCredLedger.queryFilter(
    eventsFilter,
    QUERY_BLOCK_LIMIT
  )
  const ledger = {} as Ledger
  for (const event of events) {
    const { tokenAddress } = event.args
    const merkleRoot = event.args.merkleRoot
    ledger[tokenAddress] = getLedgerRecord(tokenAddress, merkleRoot)
  }
  return ledger
}
