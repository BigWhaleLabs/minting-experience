import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import getMapOfOwners from 'helpers/getTokenIdToOwnerMap'
import sealCred from 'helpers/sealCred'

interface SealCredStoreType {
  ledger: Promise<Ledger>
  contractNames: { [contractAddress: string]: Promise<string | undefined> }
  originalContractsToOwnersMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }

  fetchContractNames: (ledger: Ledger) => void
  fetchContractsToOwnerMaps: (ledger: Ledger) => void
}

const SealCredStore = proxy<SealCredStoreType>({
  ledger: getLedger(sealCred).then((ledger) => {
    SealCredStore.fetchContractNames(ledger)
    SealCredStore.fetchContractsToOwnerMaps(ledger)
    for (const record of Object.values(ledger)) {
      addListenersToLedgerRecord(record)
    }
    return ledger
  }),
  contractNames: {},
  originalContractsToOwnersMaps: {},

  fetchContractNames(ledger: Ledger) {
    for (const { originalContract } of Object.values(ledger)) {
      SealCredStore.contractNames[originalContract.address] =
        originalContract.name()
    }
  },
  fetchContractsToOwnerMaps(ledger: Ledger) {
    for (const { originalContract } of Object.values(ledger)) {
      SealCredStore.originalContractsToOwnersMaps[originalContract.address] =
        getMapOfOwners(originalContract)
    }
  },
})

function addListenersToLedgerRecord({ originalContract }: LedgerRecord) {
  originalContract.on(
    originalContract.filters.Transfer(),
    async (_, to, tokenId) => {
      console.log('Transfer (original)', originalContract.address, to, tokenId)
      const originalContractToOwnerMap = await SealCredStore
        .originalContractsToOwnersMaps[originalContract.address]

      const newOriginalContractToOwnerMap = {
        ...originalContractToOwnerMap,
        [tokenId.toNumber()]: to,
      }

      SealCredStore.originalContractsToOwnersMaps[originalContract.address] =
        Promise.resolve(newOriginalContractToOwnerMap)
    }
  )
}

sealCred.on(
  sealCred.filters.SetMerkleRoot(),
  async (tokenAddress, merkleRoot) => {
    const ledger = await SealCredStore.ledger
    if (!ledger[tokenAddress]) {
      const record = getLedgerRecord(tokenAddress, merkleRoot)
      ledger[tokenAddress] = record
      addListenersToLedgerRecord(record)
    } else {
      ledger[tokenAddress].merkleRoot = merkleRoot
    }
  }
)
sealCred.on(sealCred.filters.DeleteMerkleRoot(), async (tokenAddress) => {
  const ledger = await SealCredStore.ledger
  ledger[tokenAddress]?.originalContract.removeAllListeners()
  delete ledger[tokenAddress]
})

export default SealCredStore
