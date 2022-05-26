import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getAddressToMerkle from 'helpers/getAddressToMerkle'
import getLedgerRecord from 'helpers/getLedgerRecord'

export default async function (sealCredLedger: SealCredLedger) {
  const addressToMerkle = await getAddressToMerkle(sealCredLedger)

  const ledger = {} as Ledger

  for (const tokenAddress in addressToMerkle) {
    ledger[tokenAddress] = await getLedgerRecord(
      tokenAddress,
      addressToMerkle[tokenAddress]
    )
  }
  return ledger
}
