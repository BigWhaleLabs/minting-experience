import { BodyText } from 'components/Text'
import { lazy } from 'react'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'
import contracts from 'helpers/contracts'

const Contract = lazy(() => import('components/Contract'))

const contractList = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)
export default function () {
  return (
    <div className={contractList}>
      {!contracts.length && <BodyText>No contracts to mint yet!</BodyText>}
      {contracts.map((contract) => (
        <div key={contract.address}>
          <Contract contract={contract} />
        </div>
      ))}
    </div>
  )
}
