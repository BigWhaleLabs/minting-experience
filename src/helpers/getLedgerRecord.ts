import { SimpleERC721__factory } from '@big-whale-labs/simple-erc721'
import LedgerRecord from 'models/LedgerRecord'
import defaultProvider from 'helpers/defaultProvider'

export default function (tokenAddress: string) {
  return {
    originalContract: SimpleERC721__factory.connect(
      tokenAddress,
      defaultProvider
    ),
  } as LedgerRecord
}
