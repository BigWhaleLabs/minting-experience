import { HeaderText, Link, SubheaderText } from 'components/Text'
import ListOfContracts from 'components/ListOfContracts'
import SuspenseWithError from 'components/SuspenseWithError'

export default function MainBlock() {
  return (
    <>
      <HeaderText>BWL Minting Experience</HeaderText>
      <SubheaderText>
        Welcome to the BWL Minting Experience! Feel free to mint any NFTs listed
        below, they're all supported by{' '}
        <Link url="https://sealcred.xyz">SealCred</Link>!
      </SubheaderText>
      <SuspenseWithError
        error="Error fetching ledger!"
        loadingText="Please, wait while I'm loading the contracts..."
      >
        <ListOfContracts />
      </SuspenseWithError>
    </>
  )
}
