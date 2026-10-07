import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>Name</span>
        <div className={styles.auth}>
          <Link
            href={"/sign-in"}
            className={`${styles.link} ${styles.linkStick}`}
          >
            Sing In{" "}
          </Link>
          <Link href={"/sign-up"} className={styles.link}>
            Sing Up
          </Link>
        </div>
      </header>
    </div>
  );
}
