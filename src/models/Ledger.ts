import LedgerRecord from 'models/LedgerRecord'

export default interface Ledger {
  [contractAddress: string]: LedgerRecord
}
