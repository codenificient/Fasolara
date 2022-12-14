import Image from "next/image"
import { useRouter } from 'next/router'
import Sun from "../public/assets/theSun.gif"
import styles from "../styles/Home.module.scss"

const Hero = () =>
{
  const router = useRouter()
  return (
    <div className={styles.HeroWrapper}>
      <div className={styles.Hero}>
        <h1 className="text-7xl  font-extrabold">
          La Référence Africaine des
          énergies renouvellables
        </h1>
        <p className="text-lg text-gray-dark dark:text-gray" >
          FasoLara est une platforme polyvalente dans l’énergie solaire en mission pour faire du solair un pilier de dévelopement économique et social durable du Burkina et de l’Afrique
        </p>
        <button onClick={() => router.push( "/contact" )} className={styles.Hire}>
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
