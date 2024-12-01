import ButtonForm from '@/components/UI/Auth/Button'
import InputForm from '@/components/UI/Auth/Input'
import PasswordInputForm from '@/components/UI/Auth/PasswordInput'
import useAlert from '@/hooks/useAlert'
import AuthService from '@/services/Auth.service'
import { CircularProgress } from '@nextui-org/react'
import { isAxiosError } from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { AuthRegistrationSchema } from './RegistrationSchema'

export default function AuthRegistrationForm() {
	const router = useRouter()
	const { open } = useAlert()

	const form = useFormik({
		validationSchema: AuthRegistrationSchema,
		initialValues: {
			username: '',
			login: '',
			password: '',
			repeatPassword: '',
		},
		onSubmit: async values => {
			form.setSubmitting(true)
			const res = await new AuthService().registration(values)
			form.setSubmitting(false)
			if (!res) return
			if (isAxiosError(res)) {
				open(res.response?.data.message || 'Ошибка', 'error')
				return console.log(res.response?.data.message || '')
			}
			if (res.status === 201) {
				router.refresh()
			}
		},
	})

	return (
		<form onSubmit={form.submitForm} className='flex flex-col gap-4'>
			<InputForm
				id='username'
				isInvalid={!!form.errors.username && form.touched.username}
				errorMessage={form.errors.username}
				value={form.values.username}
				onChange={form.handleChange}
				label='Имя пользователя'
			/>
			<InputForm
				id='login'
				isInvalid={!!form.errors.login && form.touched.login}
				errorMessage={form.errors.login}
				value={form.values.login}
				onChange={form.handleChange}
				label='Логин'
			/>
			<PasswordInputForm
				id='password'
				isInvalid={!!form.errors.password && form.touched.password}
				errorMessage={form.errors.password}
				value={form.values.password}
				onChange={form.handleChange}
				label='Пароль'
			/>
			<PasswordInputForm
				id='repeatPassword'
				isInvalid={!!form.errors.repeatPassword && form.touched.repeatPassword}
				errorMessage={form.errors.repeatPassword}
				value={form.values.repeatPassword}
				onChange={form.handleChange}
				label='Повторите пароль'
			/>
			<ButtonForm
				isDisabled={form.isSubmitting}
				onClick={() => form.handleSubmit()}
			>
				{form.isSubmitting ? (
					<CircularProgress
						color='secondary'
						size='sm'
						aria-label='Загрузка...'
					/>
				) : (
					'Зарегистрироваться'
				)}
			</ButtonForm>
		</form>
	)
}
