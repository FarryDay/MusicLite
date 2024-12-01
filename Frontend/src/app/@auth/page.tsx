'use client'
import AuthRegistrationForm from '@/components/forms/Auth/Registration'
import DefaultProvider from '@/components/layouts/DefaultProvider'
import AuthLoginForm from '@forms/Auth/Login'
import { Button } from '@nextui-org/react'
import { AnimatePresence, AnimationProps, motion } from 'framer-motion'
import { useState } from 'react'
import { IoIosSwap } from 'react-icons/io'

type forms = 'auth' | 'registration'

const variants = {
	hide: { opacity: 0, rotateY: -50, display: 'block' },
	show: {
		opacity: 1,
		rotateY: 0,
		display: 'block',
	},
	swipe: {
		opacity: 0,
		rotateY: 50,
		position: 'absolute',
		zIndex: -1,
	},
}

export default function Page() {
	const [form, setForm] = useState<forms>('auth')

	return (
		<DefaultProvider>
			<div className='h-screen bg-neutral-800 grid place-content-center relative overflow-hidden'>
				<motion.div
					animate={{ scale: [1, 1.3, 1] }}
					transition={{ duration: 5, repeat: Infinity }}
					className='absolute z-0 bg-auth bg-cover inset-0 blur-md pointer-events-none brightness-50'
				/>
				<AnimatePresence>
					{form == 'auth' && (
						<motion.div
							initial='hide'
							animate='show'
							exit='swipe'
							variants={variants as AnimationProps['variants']}
							transition={{ duration: 1 }}
							className='bg-white/5 relative text-white min-w-80 backdrop-blur-xl px-4 py-8 rounded-md'
						>
							<div className='absolute top-4 right-4'>
								<Button
									onClick={() => setForm('registration')}
									isIconOnly
									size='sm'
									className='bg-purple-600 text-xl text-white'
								>
									<IoIosSwap />
								</Button>
							</div>
							<div className='flex flex-col gap-4'>
								<h1 className='font-bold text-center text-xl'>Авторизация</h1>
								<AuthLoginForm />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{form == 'registration' && (
						<motion.div
							initial='hide'
							animate='show'
							exit='swipe'
							variants={variants as AnimationProps['variants']}
							transition={{ duration: 1 }}
							className='bg-white/5 relative text-white min-w-80 backdrop-blur-xl px-4 py-8 rounded-md'
						>
							<div className='absolute top-4 right-4'>
								<Button
									onClick={() => setForm('auth')}
									isIconOnly
									size='sm'
									className='bg-purple-600 text-xl text-white'
								>
									<IoIosSwap />
								</Button>
							</div>
							<div className='flex flex-col gap-4'>
								<h1 className='font-bold text-center text-xl'>Регистрация</h1>
								<AuthRegistrationForm />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</DefaultProvider>
	)
}
