import Head from 'next/head'
import Image from 'next/image'
import Sorry from '../public/assets/coming-soon.png'

export default function Custom404()
{
	return (
		<>
			<Head>
				<title>Coming Soon | FasoLara</title>
			</Head>
			<Image src={Sorry} alt="Coming Soon" />
		</>
	)
}
