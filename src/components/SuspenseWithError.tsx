import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import ErrorBoundary from 'components/ErrorBoundary'

export default function ({
  error,
  loadingText,
  children,
}: { error: string; loadingText: string } & ChildrenProp) {
  return (
    <ErrorBoundary fallbackText={error}>
      <Suspense fallback={<BodyText>{loadingText}</BodyText>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}
