import { SnackbarKey, useSnackbar } from 'notistack'
import { useState } from 'react'

export type AlertVariants = 'default' | 'error'

export default function useAlert() {
	const [keys, setKeys] = useState<SnackbarKey[]>([])
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const open = (text: string, variant: AlertVariants) => {
		const key = enqueueSnackbar(text, { variant })
		setKeys(state => [...state, key])
	}

	const close = (key: SnackbarKey) => {
		closeSnackbar(key)
	}

	return { keys, open, close }
}
