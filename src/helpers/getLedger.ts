import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import getAllEvents from './getAllEvents'

export default async function (sealCredLedger: SealCredLedger) {
  const { events, deleteTopic } = await getAllEvents(sealCredLedger)

  const ledger = {} as Ledger
  const addressToMerkle: { [address: string]: string } = {}

  for (const event of events) {
    const {
      args: { tokenAddress, merkleRoot },
      topic,
    } = event

    if (topic === deleteTopic) {
      delete addressToMerkle[tokenAddress]
      continue
    }
    addressToMerkle[tokenAddress] = merkleRoot
  }

  for (const tokenAddress in addressToMerkle) {
    ledger[tokenAddress] = await getLedgerRecord(
      tokenAddress,
      addressToMerkle[tokenAddress]
    )
  }
  return ledger
}
