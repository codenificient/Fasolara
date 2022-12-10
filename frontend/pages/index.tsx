import Head from "next/head"

const Page = () =>
{
  return (
    <>
      <Head>
        <title>Accueil | FasoLara</title>
        <link rel="icon" href="/assets/solar.svg" />
      </Head>
    
      <h1 className=" first:dark:dark:bg-black dark:text-gray-100 ">Welcome to home page!</h1>
    </>
  )
}

export default Page