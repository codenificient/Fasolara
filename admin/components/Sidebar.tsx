import styles from "@css/Sidebar.module.scss"
import Image from "next/image"
import Link from "next/link"
import Navigation from "./Navigation"

export default function LeftSidebar()
{
  return (
    <div className={styles.sidebar_container} >
      <div className={styles.title}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/laraOne.png"
            alt="fasolara logo"
            width={200}
            height={100}
            style={{
              maxWidth: "100%",
              height: "150px"
            }} />
        </Link>
      </div>
      <Navigation />
      <span className={styles.Logout}>
        <Link key="13-931-2871" href="/logout" passHref className={styles.Line}>

          <i
            className="fas fa-sign-out-alt Icon"
            style={{ color: "#f24e1e", fontSize: "25px" }}
          />
          <span className={styles.Name}>Logout</span>

        </Link>
      </span>
    </div>
  )
}
