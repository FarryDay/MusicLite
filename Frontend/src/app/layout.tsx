import checkAuthServerSide from '@/server/checkAuth'
import { montserrat } from '@/utils/fonts'
import { Metadata } from 'next'
import './globals.css'

type Props = {
	auth: React.ReactNode
	main: React.ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
	const isAuth = await checkAuthServerSide()

	return {
		title: isAuth ? 'WhiteMusic' : 'Авторизация',
		openGraph: {
			// images: ['/some-specific-page-image.jpg', ...previousImages],
		},
	}
}
export default async function RootLayout({ auth, main }: Props) {
	const isAuth = await checkAuthServerSide()
	return (
		<html lang='en'>
			<body className={`${montserrat.className} antialiased`}>
				{isAuth ? main : auth}
			</body>
		</html>
	)
}
