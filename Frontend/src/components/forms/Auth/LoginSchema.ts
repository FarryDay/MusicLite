import * as Yup from 'yup'

export const AuthLoginSchema = Yup.object({
	login: Yup.string()
		.min(6, 'Логин должен быть минимально 6 символов')
		.required('Логин обязателен'),
	password: Yup.string()
		.min(6, 'Пароль должен быть минимально 6 символов')
		.required('Пароль обязателен'),
})
