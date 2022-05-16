import LedgerRecord from 'models/LedgerRecord'

type Ledger = {
  [contractAddress: string]: LedgerRecord
}

export default Ledger
