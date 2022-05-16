import { HeaderText, Link, SubheaderText } from 'components/Text'
import Account from 'components/Account'
import ListOfContracts from 'components/ListOfContracts'
import SuspenseWithError from 'components/SuspenseWithError'

export default function () {
  return (
    <>
      <HeaderText>BWL Minting Experience</HeaderText>
      <SubheaderText>
        Welcome to the BWL Minting Experience! Feel free to mint any NFTs listed
        below, they're all supported by{' '}
        <Link url="https://sealcred.xyz">SealCred</Link>!
      </SubheaderText>
      <Account />
      <SuspenseWithError
        error="Error fetching ledger!"
        loadingText="Please, wait while I'm loading the contracts..."
      >
        <ListOfContracts />
      </SuspenseWithError>
    </>
  )
}
