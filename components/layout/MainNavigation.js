import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const router = useRouter();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname == "/" ? classes.active : ""}>
                All Meetups
              </a>
            </Link>
          </li>
          <li>
            <Link href="/new-meetup">
              <a
                className={
                  router.pathname == "/new-meetup" ? classes.active : ""
                }
              >
                Add New Meetup
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
