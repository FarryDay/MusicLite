import { AlertVariants } from '@/hooks/useAlert'
import { SnackbarContent } from 'notistack'
import { forwardRef } from 'react'
import DefaultAlert from './Default'
import ErrorAlert from './Error'

type Props = {
	message: string
	variant: AlertVariants
}

export const AlertBase = forwardRef((props: Props, ref) => {
	const variants = {
		default: <DefaultAlert />,
		error: <ErrorAlert message={props.message} />,
	}

	return (
		<SnackbarContent ref={ref as any} className='p-0'>
			{variants[props.variant] || variants.default}
		</SnackbarContent>
	)
})
