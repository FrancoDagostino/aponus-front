import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { unAuthorizedHandler } from './unAuthorizedHandler.util';
import { TResponse, createResponseUtil } from '../response.util';
import tokenUtil from '../token.util';

export const urlBase = "https://aponusweb.onrender.com/Aponus"

const getConfigWithTokenHelper = (config: AxiosRequestConfig | undefined): AxiosRequestConfig => {
    return {
        ...config,
        headers: {
            ...config?.headers,
            Authorization: `Bearer  ${tokenUtil.get()}`
        }
    }
}

export interface IRestClient {
    get: <GData, GError>(url: string, config: AxiosRequestConfig | undefined) => Promise<TResponse<GData, GError>>
    post: <GData, GError>(url: string, body: any, config: AxiosRequestConfig | undefined) => Promise<TResponse<GData, GError>>
    put: <GData, GError>(url: string, body: any, config: AxiosRequestConfig | undefined) => Promise<TResponse<GData, GError>>
    del: <GError>(url: string, config: AxiosRequestConfig | undefined) => Promise<TResponse<null, GError>>
}

export const useRestClient = (): IRestClient => {

    const get: IRestClient['get'] = <TData, GError>(url: string, config: AxiosRequestConfig | undefined) =>
        axios.get<TData>(url, getConfigWithTokenHelper(config))
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                if (error.status === 401) unAuthorizedHandler();
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })
    const post: IRestClient['post'] = <TData, GError>(url: string, body: any, config: AxiosRequestConfig | undefined) =>
        axios.post<TData>(url, body, getConfigWithTokenHelper(config))
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                if (error.status === 401) unAuthorizedHandler();
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })
    const put: IRestClient['put'] = <TData, GError>(url: string, body: any, config: AxiosRequestConfig | undefined) =>
        axios.put<TData>(url, body, getConfigWithTokenHelper(config))
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                if (error.status === 401) unAuthorizedHandler();
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const del: IRestClient['del'] = <GError>(url: string, config: AxiosRequestConfig | undefined) =>
        axios.delete(url, getConfigWithTokenHelper(config))
            .then(response => createResponseUtil.success<null>(null, response.status))
            .catch((error: AxiosError<GError>) => {
                if (error.status === 401) unAuthorizedHandler();
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    return {
        get,
        post,
        put,
        del
    }
}
