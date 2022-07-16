import { useState, useEffect } from 'react';
import { useSelector } from '../../services/hooks/reduxHooks';

interface IUseUserStatusReturns {
  isAuthorized: boolean;
  request: boolean;
  requestFailed: boolean;
  errorStatus: number | null;
  isRequested: boolean;
  requestSuccess: boolean;
  errorMessage: string;
}

const useUserStatus = (): IUseUserStatusReturns => {
  const { isAuthorized, request, requestSuccess, requestFailed, errorStatus, errorMessage } = useSelector(store => ({
    isAuthorized: store.user.isAuthorized,
    request: store.user.request,
    requestSuccess: store.user.requestSuccess,
    requestFailed: store.user.requestFailed,
    errorStatus: store.user.errorStatus,
    errorMessage: store.user.errorMessage
  }))
  const [isRequested, setIsRequested] = useState<boolean>(false)

  useEffect(() => {
    if (request || requestFailed || requestSuccess) setIsRequested(true)
    else setIsRequested(false)
  }, [request, requestFailed, requestSuccess])

  return { isAuthorized, request, requestFailed, errorStatus, isRequested, requestSuccess, errorMessage }
}

export default useUserStatus;
