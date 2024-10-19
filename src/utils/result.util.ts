export interface ISuccessResult<GData> {
    isSuccess: true
    isError: false
    data: GData
}

export interface IErrorResult<GError> {
    isSuccess: false
    isError: true
    data: GError
}

export type TResult<GData, GError> = ISuccessResult<GData> | IErrorResult<GError>

interface ICreateResultUtil {
    success: <GData>(data: GData) => ISuccessResult<GData>
    error: <GError>(data: GError) => IErrorResult<GError>
}

export const createResultUtil: ICreateResultUtil = {
    success: (data) => ({ isSuccess: true, isError: false, data }),
    error: (data) => ({ isSuccess: false, isError: true, data })
}
