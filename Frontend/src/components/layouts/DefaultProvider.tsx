import { NextUIProvider } from '@nextui-org/react'
import { SnackbarProvider } from 'notistack'
import { AlertBase } from '../Alert/Base'

type Props = {
	children: React.ReactNode
}

export default function DefaultProvider({ children }: Props) {
	return (
		<NextUIProvider>
			<SnackbarProvider
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				maxSnack={3}
				autoHideDuration={2000}
				Components={{
					default: AlertBase,
					error: AlertBase,
				}}
			>
				{children}
			</SnackbarProvider>
		</NextUIProvider>
	)
}
