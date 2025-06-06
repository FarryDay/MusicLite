import * as Yup from 'yup'

export const AuthRegistrationSchema = Yup.object({
	username: Yup.string()
		.min(4, 'Имя пользователя должна быть минимально 4 символа')
		.required('Имя пользователя обязательно'),
	login: Yup.string()
		.min(6, 'Логин должен быть минимально 6 символов')
		.required('Логин обязателен'),
	password: Yup.string()
		.min(6, 'Пароль должен быть минимально 6 символов')
		.required('Пароль обязателен'),
	repeatPassword: Yup.string()
		.required('Повторите пароль')
		.oneOf([Yup.ref('password')], 'Пароли отличаются'),
})
