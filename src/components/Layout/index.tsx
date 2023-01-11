import * as React from "react";
import HeaderAppBar from "./componnents/HeaderAppBar";
import styles from "../../../styles/Home.module.css";

const Layout = ({children}: {children: React.ReactNode}) => {
  return <>
    <main className={styles.main_layout}>
    <HeaderAppBar />
      {children}
    </main>
  </>
}

export default Layout;