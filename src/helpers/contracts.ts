import { SimpleERC721__factory } from '@big-whale-labs/simple-erc721'
import defaultProvider from 'helpers/defaultProvider'

const contractAddresses = [
  '0x508C58996E46B10b093F9F4EaD6ab3416e73f3a1',
  '0x690Ea2D4E784E856A754bFE1F55C241e9e99D906',
  '0x08a38f2410FEf065384647205dB9801481f4F8E8',
  '0x529B8349A9b1d6122ccFFb2aD16D8c3C746d0193',
  '0xf58898F874dbB445E5E31615f8DB78411DE390a0',
  '0x6BDed8326a319A79772501B7931E96a054469B64',
  '0xEEa2d31B66a736eA987Ba06f3bD257168de4DD70',
]

export default contractAddresses.map((address) =>
  SimpleERC721__factory.connect(address, defaultProvider)
)
