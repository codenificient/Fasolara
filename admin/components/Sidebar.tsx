import Image from "next/image";
import Link from "next/link";

import styles from "@css/Sidebar.module.scss";
import Navigation from "./Navigation";

export default function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.title}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/laraOne.png"
            alt="fasolara logo"
            width={300}
            height={150}
          />
        </Link>
      </div>
      <Navigation />
      <span className={styles.Logout}>
      <Link key="13-931-2871" href="/logout"  passHref>
        <a className={styles.Line}>
          <i
            className="fas fa-sign-out-alt Icon"
            style={{ color: "#f24e1e", fontSize: "25px" }}
          />
          <span className={styles.Name}>Logout</span>
        </a>
        </Link>
      </span>
    </div>
  );
}
