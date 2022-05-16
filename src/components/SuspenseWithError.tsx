import { BodyText } from 'components/Text'
import { FC, Suspense } from 'react'
import ErrorBoundary from 'components/ErrorBoundary'

const SuspenseWithError: FC<{ error: string; loadingText: string }> = ({
  error,
  children,
  loadingText,
}) => {
  return (
    <ErrorBoundary fallbackText={error}>
      <Suspense fallback={<BodyText>{loadingText}</BodyText>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default SuspenseWithError
