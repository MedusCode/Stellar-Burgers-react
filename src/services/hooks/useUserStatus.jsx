import React from 'react';
import { useSelector } from 'react-redux';

const useUserStatus = () => {
  const { isAuthorized, request, requestFailed, errorStatus } = useSelector(store => ({
    isAuthorized: store.user.isAuthorized,
    request: store.user.request,
    requestFailed: store.user.requestFailed,
    errorStatus: store.user.errorStatus
  }))
  const [isRequested, setIsRequested] = React.useState(false)

  React.useEffect(() => {
    if (isAuthorized || request || requestFailed) setIsRequested(true)
    else setIsRequested(false)
  }, [isAuthorized, request, requestFailed])

  return { isAuthorized, request, requestFailed, errorStatus, isRequested }
}

export default useUserStatus;
