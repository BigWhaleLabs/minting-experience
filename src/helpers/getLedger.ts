import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getAddressToMerkleRoot from 'helpers/getAddressToMerkleRoot'
import getLedgerRecord from 'helpers/getLedgerRecord'

export default async function (sealCredLedger: SealCredLedger) {
  const addressToMerkle = await getAddressToMerkleRoot(sealCredLedger)

  const ledger = {} as Ledger

  for (const tokenAddress in addressToMerkle) {
    ledger[tokenAddress] = await getLedgerRecord(
      tokenAddress,
      addressToMerkle[tokenAddress]
    )
  }
  return ledger
}
