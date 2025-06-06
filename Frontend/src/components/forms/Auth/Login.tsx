import PasswordInputForm from '@/components/UI/Auth/PasswordInput'
import useAlert from '@/hooks/useAlert'
import ButtonForm from '@UI/Auth/Button'
import InputForm from '@UI/Auth/Input'
import { CircularProgress } from '@nextui-org/react'
import AuthService from '@services/Auth.service'
import { isAxiosError } from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { AuthLoginSchema } from './LoginSchema'

export default function AuthLoginForm() {
	const router = useRouter()
	const { open } = useAlert()

	const form = useFormik({
		validationSchema: AuthLoginSchema,
		initialValues: {
			login: '',
			password: '',
		},
		onSubmit: async values => {
			form.setSubmitting(true)
			const res = await new AuthService().login(values)
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
					'Войти'
				)}
			</ButtonForm>
		</form>
	)
}
