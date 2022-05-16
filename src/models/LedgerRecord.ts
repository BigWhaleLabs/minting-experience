import { SimpleERC721 } from '@big-whale-labs/simple-erc721'

export default interface LedgerRecord {
  merkleRoot: string
  originalContract: SimpleERC721
}
