import { Input, InputProps } from '@nextui-org/react'

type Props = {} & React.ComponentProps<'input'> & InputProps

export default function InputForm({ ...props }: Props) {
	return (
		<Input
			required
			className='dark'
			classNames={{
				inputWrapper: [
					'rounded-md shadow-md border-purple-700/50 dark:focus-within:border-0 border-1',
				],
			}}
			{...props}
		/>
	)
}
