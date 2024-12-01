import { API_URL } from '@/utils/config'
import axios from 'axios'
import { cookies } from 'next/headers'

export default async function checkAuthServerSide() {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value
	if (!token) return false
	try {
		const res = await axios.get(`${API_URL}/auth/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		if (res.status == 200) {
			return true
		}
	} catch (err) {
		return false
	}
	return false
	// console.log(1)
	// console.log(token)
}
