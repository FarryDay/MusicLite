import { AxiosError, AxiosResponse } from 'axios'

export type Error = {
	message: string
}

export type AxiosResponseError = AxiosError<Error>

export type ResponseError = AxiosResponse | AxiosResponseError | undefined
