import { Button, ButtonProps } from '@nextui-org/react'

type Props = {
	children: string
} & React.ComponentProps<'button'> &
	ButtonProps

export default function ButtonForm({ children, ...props }: Props) {
	return (
		<Button
			className='bg-purple-600 text-white rounded-md font-bold'
			{...props}
		>
			{children}
		</Button>
	)
}
