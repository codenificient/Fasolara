import styles from "@css/Sidebar.module.scss"
import { Icon } from '@iconify/react'
import Image from "next/image"
import Link from "next/link"
import Navigation from "./Navigation"

export default function LeftSidebar()
{
  return (
    <div className={styles.sidebar_container} >
      <div className={styles.Logo}>
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
        <Link href={"/api/auth/signout"} className={styles.Line}>
          <Icon
            icon="icon-park-outline:logout"
            className={styles.Inline}
            style={{ fontSize: "26px" }}
            color="#f24e1e"
          />
          <span className={styles.Name}>Logout</span>
        </Link>
      </span>
    </div>
  )
}
