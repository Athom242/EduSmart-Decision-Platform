import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Login.module.scss";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log({
            email,
            password,
            rememberMe,
        });

        // TODO:
        // Ajouter ici l'appel à l'API d'authentification.
    };

    return (
        <main className={styles.login}>
            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className={styles.login__background}>
                <div className={styles.login__orb} />
                <div className={styles.login__grid} />
            </div>


            {/* =====================================================
                CONTAINER
            ===================================================== */}

            <div className={styles.login__container}>

                {/* =================================================
                    BRAND
                ================================================= */}

                <Link
                    to="/"
                    className={styles.login__brand}
                    aria-label="Retour à l'accueil EduSmart"
                >
                    <div className={styles.login__brandIcon}>
                        ES
                    </div>

                    <div className={styles.login__brandText}>
                        <strong>EduSmart</strong>
                        <span>Decision Platform</span>
                    </div>
                </Link>


                {/* =================================================
                    CARD
                ================================================= */}

                <section className={styles.login__card}>

                    {/* Header */}

                    <div className={styles.login__header}>

                        <span className={styles.login__eyebrow}>
                            ESPACE SÉCURISÉ
                        </span>

                        <h1>
                            Bienvenue sur EduSmart
                        </h1>

                        <p>
                            Connectez-vous pour accéder à votre
                            espace de travail et exploiter vos
                            données éducatives.
                        </p>

                    </div>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        className={styles.login__form}
                        onSubmit={handleSubmit}
                    >

                        {/* Email */}

                        <div className={styles.login__field}>

                            <label htmlFor="email">
                                Adresse email
                            </label>

                            <div className={styles.login__inputWrapper}>

                                <span
                                    className={styles.login__inputIcon}
                                    aria-hidden="true"
                                >
                                    @
                                </span>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="exemple@edusmart.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    autoComplete="email"
                                    required
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div className={styles.login__field}>

                            <div className={styles.login__labelRow}>

                                <label htmlFor="password">
                                    Mot de passe
                                </label>

                                <Link to="/forgot-password">
                                    Mot de passe oublié ?
                                </Link>

                            </div>


                            <div className={styles.login__inputWrapper}>

                                <span
                                    className={styles.login__inputIcon}
                                    aria-hidden="true"
                                >
                                    •••
                                </span>

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Votre mot de passe"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className={styles.login__passwordToggle}
                                    onClick={() =>
                                        setShowPassword(
                                            (current) => !current
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Masquer le mot de passe"
                                            : "Afficher le mot de passe"
                                    }
                                >
                                    {showPassword ? "Masquer" : "Afficher"}
                                </button>

                            </div>

                        </div>


                        {/* Remember */}

                        <label className={styles.login__remember}>

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(event) =>
                                    setRememberMe(event.target.checked)
                                }
                            />

                            <span>
                                Se souvenir de moi
                            </span>

                        </label>


                        {/* Submit */}

                        <button
                            type="submit"
                            className={styles.login__submit}
                        >
                            <span>
                                Se connecter
                            </span>

                            <span aria-hidden="true">
                                →
                            </span>
                        </button>

                    </form>


                    {/* =================================================
                        DIVIDER
                    ================================================= */}

                    <div className={styles.login__divider}>
                        <span />
                        <small>OU</small>
                        <span />
                    </div>


                    {/* =================================================
                        REGISTER
                    ================================================= */}

                    <div className={styles.login__register}>

                        <span>
                            Vous n'avez pas encore de compte ?
                        </span>

                        <Link to="/register">
                            Créer un compte
                        </Link>

                    </div>

                </section>


                {/* =================================================
                    SECURITY
                ================================================= */}

                <div className={styles.login__security}>

                    <span className={styles.login__securityIcon}>
                        ✓
                    </span>

                    <span>
                        Connexion sécurisée · Vos données restent
                        protégées.
                    </span>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className={styles.login__footer}>

                    <span>
                        © {new Date().getFullYear()} EduSmart
                    </span>

                    <span>·</span>

                    <Link to="/">
                        Retour à l'accueil
                    </Link>

                </div>

            </div>
        </main>
    );
};

export default Login;