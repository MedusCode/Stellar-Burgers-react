import React from 'react';
import { useSelector } from 'react-redux';

const useUserStatus = () => {
  const { isAuthorized, request, requestSuccess, requestFailed, errorStatus, errorMessage } = useSelector(store => ({
    isAuthorized: store.user.isAuthorized,
    request: store.user.request,
    requestSuccess: store.user.requestSuccess,
    requestFailed: store.user.requestFailed,
    errorStatus: store.user.errorStatus,
    errorMessage: store.user.errorMessage
  }))
  const [isRequested, setIsRequested] = React.useState(false)

  React.useEffect(() => {
    if (request || requestFailed || requestSuccess) setIsRequested(true)
    else setIsRequested(false)
  }, [request, requestFailed, requestSuccess])

  return { isAuthorized, request, requestFailed, errorStatus, isRequested, requestSuccess, errorMessage }
}

export default useUserStatus;