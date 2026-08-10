import { Link, NavLink } from "react-router-dom";
import styles from "../../../styles/Header.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>

            <div className={styles.header__container}>

                {/* Logo */}
                <Link
                    to="/"
                    className={styles.header__logo}
                >
                    <div className={styles.header__logoMark}>
                        E
                    </div>

                    <div className={styles.header__logoText}>
                        <strong>EduSmart</strong>
                        <span>Decision Platform</span>
                    </div>
                </Link>


                {/* Navigation */}
                <nav className={styles.header__nav}>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${styles.header__link} ${
                                isActive ? styles.header__linkActive : ""
                            }`
                        }
                    >
                        Accueil
                    </NavLink>

                    <a
                        href="#features"
                        className={styles.header__link}
                    >
                        Fonctionnalités
                    </a>

                    <a
                        href="#architecture"
                        className={styles.header__link}
                    >
                        Architecture
                    </a>

                    <a
                        href="#about"
                        className={styles.header__link}
                    >
                        À propos
                    </a>

                </nav>


                {/* Actions */}
                <div className={styles.header__actions}>

                    <Link
                        to="/login"
                        className={styles.header__login}
                    >
                        Se connecter
                    </Link>

                    <Link
                        to="/login"
                        className={styles.header__button}
                    >
                        Accéder à la plateforme
                    </Link>

                </div>

            </div>

        </header>
    );
};

export default Header;