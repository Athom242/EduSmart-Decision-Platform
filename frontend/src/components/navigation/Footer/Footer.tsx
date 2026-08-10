
import { Link } from "react-router-dom";
import styles from "../../../styles/Footer.module.scss";

const Footer:React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>

            <div className={styles.footer__container}>

                {/* ==========================
                    BRAND
                ========================== */}

                <div className={styles.footer__brand}>

                    <Link
                        to="/"
                        className={styles.footer__logo}
                    >
                        <div className={styles.footer__logoMark}>
                            E
                        </div>

                        <div className={styles.footer__logoText}>
                            <strong>EduSmart</strong>
                            <span>Decision Platform</span>
                        </div>
                    </Link>

                    <p className={styles.footer__description}>
                        Une plateforme Data Engineering dédiée à la
                        centralisation, l'analyse et la valorisation
                        des données éducatives.
                    </p>

                </div>


                {/* ==========================
                    PLATFORM
                ========================== */}

                <div className={styles.footer__column}>

                    <h3>
                        Plateforme
                    </h3>

                    <Link to="/">
                        Accueil
                    </Link>

                    <a href="#features">
                        Fonctionnalités
                    </a>

                    <a href="#architecture">
                        Architecture
                    </a>

                    <Link to="/login">
                        Connexion
                    </Link>

                </div>


                {/* ==========================
                    DATA
                ========================== */}

                <div className={styles.footer__column}>

                    <h3>
                        Data
                    </h3>

                    <span>
                        PostgreSQL
                    </span>

                    <span>
                        MySQL
                    </span>

                    <span>
                        Redis
                    </span>

                    <span>
                        CSV & JSON
                    </span>

                </div>


                {/* ==========================
                    TECHNOLOGIES
                ========================== */}

                <div className={styles.footer__column}>

                    <h3>
                        Technologies
                    </h3>

                    <span>
                        React
                    </span>

                    <span>
                        TypeScript
                    </span>

                    <span>
                        Docker
                    </span>

                    <span>
                        ETL / Data Engineering
                    </span>

                </div>

            </div>


            {/* ==========================
                BOTTOM
            ========================== */}

            <div className={styles.footer__bottom}>

                <div className={styles.footer__bottomContainer}>

                    <p>
                        © {currentYear} EduSmart Decision Platform.
                        Tous droits réservés.
                    </p>

                    <div className={styles.footer__legal}>

                        <a href="#">
                            Politique de confidentialité
                        </a>

                        <a href="#">
                            Conditions d'utilisation
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;