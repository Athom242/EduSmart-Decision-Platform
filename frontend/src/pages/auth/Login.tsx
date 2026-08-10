import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/Login.module.scss";

const Login = (): React.JSX.Element => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState<boolean>(false);

    const [email, setEmail] =
        useState<string>("");

    const [password, setPassword] =
        useState<string>("");

    const [rememberMe, setRememberMe] =
        useState<boolean>(false);

    const [error, setError] =
        useState<string>("");

    const [isLoading, setIsLoading] =
        useState<boolean>(false);


    /*
     * ============================================================
     * HANDLE LOGIN
     * ============================================================
     */

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();

        setError("");

        /*
         * ========================================================
         * VALIDATION
         * ========================================================
         */

        if (!email || !password) {
            setError(
                "Veuillez renseigner votre adresse email et votre mot de passe."
            );

            return;
        }


        /*
         * ========================================================
         * LOADING
         * ========================================================
         */

        setIsLoading(true);


        /*
         * ========================================================
         * DONNÉES DE CONNEXION
         * ========================================================
         */

        const loginData = {
            email,
            password,
            rememberMe,
        };


        console.log(
            "Tentative de connexion :",
            loginData
        );


        /*
         * ========================================================
         * TODO : API AUTHENTICATION
         * ========================================================
         *
         * Exemple futur :
         *
         * const response = await fetch(
         *     "/api/auth/login",
         *     {
         *         method: "POST",
         *
         *         headers: {
         *             "Content-Type":
         *                 "application/json",
         *         },
         *
         *         body: JSON.stringify(
         *             loginData
         *         ),
         *     }
         * );
         *
         */


        /*
         * ========================================================
         * SIMULATION TEMPORAIRE
         * ========================================================
         *
         * À supprimer lorsque ton backend sera connecté.
         */

        setTimeout(() => {

            setIsLoading(false);

            /*
             * Redirection temporaire
             * après une connexion simulée.
             */

            navigate("/dashboard");

        }, 800);
    };


    return (
        <main className={styles.login}>

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className={styles.login__background}>

                <div
                    className={styles.login__orb}
                />

                <div
                    className={styles.login__grid}
                />

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

                    <div
                        className={styles.login__brandIcon}
                    >
                        ES
                    </div>

                    <div
                        className={styles.login__brandText}
                    >

                        <strong>
                            EduSmart
                        </strong>

                        <span>
                            Decision Platform
                        </span>

                    </div>

                </Link>


                {/* =================================================
                    LOGIN CARD
                ================================================= */}

                <section
                    className={styles.login__card}
                >


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                        className={styles.login__header}
                    >

                        <span
                            className={
                                styles.login__eyebrow
                            }
                        >
                            ESPACE SÉCURISÉ
                        </span>

                        <h1>
                            Bienvenue sur EduSmart
                        </h1>

                        <p>
                            Connectez-vous pour accéder à
                            votre espace de travail et exploiter
                            vos données éducatives.
                        </p>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div
                            className={
                                styles.login__error
                            }
                            role="alert"
                        >
                            {error}
                        </div>

                    )}


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        className={styles.login__form}
                        onSubmit={handleSubmit}
                    >


                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div
                            className={styles.login__field}
                        >

                            <label htmlFor="email">
                                Adresse email
                            </label>

                            <div
                                className={
                                    styles.login__inputWrapper
                                }
                            >

                                <span
                                    className={
                                        styles.login__inputIcon
                                    }
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
                                    onChange={(
                                        event
                                    ) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="email"
                                    required
                                />

                            </div>

                        </div>


                        {/* =================================================
                            PASSWORD
                        ================================================= */}

                        <div
                            className={styles.login__field}
                        >

                            <div
                                className={
                                    styles.login__labelRow
                                }
                            >

                                <label htmlFor="password">
                                    Mot de passe
                                </label>

                                <Link
                                    to="/forgot-password"
                                >
                                    Mot de passe oublié ?
                                </Link>

                            </div>


                            <div
                                className={
                                    styles.login__inputWrapper
                                }
                            >

                                <span
                                    className={
                                        styles.login__inputIcon
                                    }
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
                                    onChange={(
                                        event
                                    ) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className={
                                        styles.login__passwordToggle
                                    }
                                    onClick={() =>
                                        setShowPassword(
                                            (
                                                current
                                            ) =>
                                                !current
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Masquer le mot de passe"
                                            : "Afficher le mot de passe"
                                    }
                                >

                                    {showPassword
                                        ? "Masquer"
                                        : "Afficher"}

                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            REMEMBER ME
                        ================================================= */}

                        <label
                            className={
                                styles.login__remember
                            }
                        >

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(
                                    event
                                ) =>
                                    setRememberMe(
                                        event.target.checked
                                    )
                                }
                            />

                            <span>
                                Se souvenir de moi
                            </span>

                        </label>


                        {/* =================================================
                            SUBMIT
                        ================================================= */}

                        <button
                            type="submit"
                            className={
                                styles.login__submit
                            }
                            disabled={isLoading}
                        >

                            <span>
                                {isLoading
                                    ? "Connexion..."
                                    : "Se connecter"}
                            </span>

                            {!isLoading && (
                                <span aria-hidden="true">
                                    →
                                </span>
                            )}

                        </button>

                    </form>


                    {/* =================================================
                        DIVIDER
                    ================================================= */}

                    <div
                        className={styles.login__divider}
                    >

                        <span />

                        <small>
                            OU
                        </small>

                        <span />

                    </div>


                    {/* =================================================
                        REGISTER
                    ================================================= */}

                    <div
                        className={
                            styles.login__register
                        }
                    >

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

                <div
                    className={
                        styles.login__security
                    }
                >

                    <span
                        className={
                            styles.login__securityIcon
                        }
                    >
                        ✓
                    </span>

                    <span>
                        Connexion sécurisée · Vos données
                        restent protégées.
                    </span>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div
                    className={
                        styles.login__footer
                    }
                >

                    <span>
                        © {new Date().getFullYear()} EduSmart
                    </span>

                    <span>
                        ·
                    </span>

                    <Link to="/">
                        Retour à l'accueil
                    </Link>

                </div>

            </div>

        </main>
    );
};

export default Login;