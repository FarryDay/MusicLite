import { Button, Input, InputProps } from '@nextui-org/react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

type Props = {} & React.ComponentProps<'input'> & InputProps

export default function PasswordInputForm({ ...props }: Props) {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	return (
		<Input
			required
			endContent={
				<Button
					onClick={() => setIsVisible(!isVisible)}
					isIconOnly
					size='sm'
					className='bg-purple-500/50 border-1'
				>
					{isVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
				</Button>
			}
			type={isVisible ? 'text' : 'password'}
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
