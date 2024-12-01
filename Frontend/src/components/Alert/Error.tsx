import { MdOutlineErrorOutline } from 'react-icons/md'

type Props = {
	message: string
}

export default function ErrorAlert({ message }: Props) {
	return (
		<div className='bg-neutral-800 p-2 text-white border-1 rounded-md border-purple-700 w-full flex items-center gap-2'>
			<MdOutlineErrorOutline size={24} color='red' />
			<p className='text-sm font-light'>{message}</p>
		</div>
	)
}
