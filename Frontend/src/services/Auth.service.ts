import { LoginDataRequest, RegistrationDataRequest } from '@/types/Auth.types'
import { AxiosResponseError, ResponseError } from '@/types/request.types'
import { API_URL } from '@/utils/config'
import axios, { isAxiosError } from 'axios'

export default class AuthService {
	constructor() {}

	async login(data: LoginDataRequest): Promise<ResponseError> {
		try {
			const res = await axios.post(`${API_URL}/auth/login`, data)
			if (res.status === 201) {
				return res
			}
		} catch (error: any | AxiosResponseError) {
			if (isAxiosError(error)) {
				return error
			}
		}
		return undefined
	}

	async registration(data: RegistrationDataRequest): Promise<ResponseError> {
		try {
			const res = await axios.post(`${API_URL}/auth/registration`, data)
			if (res.status === 201) {
				return res
			}
		} catch (error: any | AxiosResponseError) {
			if (isAxiosError(error)) {
				return error
			}
		}
		return undefined
	}
}
