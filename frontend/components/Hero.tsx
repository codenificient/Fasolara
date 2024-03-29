import Image from "next/image"
import { useRouter } from 'next/router'
import Sun from "../public/assets/theSun.gif"
import styles from "../styles/Home.module.scss"
import React from "react"

const Hero = (): JSX.Element =>
{
  const router = useRouter()
  return (
    <div className={styles.HeroWrapper}>
      <div className={styles.Hero}>
        <h1 className="text-6xl  font-extrabold leading-normal">
          La Référence Africaine des
          énergies renouvellables
        </h1>
        <p className="text-lg text-gray-dark dark:text-gray leading-loose" >
          FasoLara est une platforme polyvalente dans l’énergie solaire en mission pour faire du solaire un pilier de dévelopement économique et social durable du Burkina et de l’Afrique
        </p>
        <button onClick={() => router.push( "/projets" )} className={`${styles.More} py-3 px-10 my-7 bg-[#ed513b] rounded-3xl`}>
          Voir Plus..
        </button>
      </div>

      <div className={styles.Photo}>
        <Image src={Sun} alt="site logo" width={600} height={300} />
      </div>

    </div>
  )
}

export default Hero
