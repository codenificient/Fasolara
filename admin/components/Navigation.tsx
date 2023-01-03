import React from "react";

import styles from "@css/Navigation.module.scss";
import { icons } from "@data/navlinks";
import NavMenu from "./NavMenu";

export default function Navigation() {
  return (
    <div className={styles.navigation_container}>
      <NavMenu icons={icons} />
    </div>
  );
}
