import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/Register.module.scss";

const Register = (): React.JSX.Element => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] =
        useState<string>("");

    const [acceptTerms, setAcceptTerms] =
        useState<boolean>(false);

    const [error, setError] = useState<string>("");

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();

        setError("");

        /*
         * ============================================
         * VALIDATION
         * ============================================
         */

        if (
            !firstName ||
            !lastName ||
            !email ||
            !role ||
            !password ||
            !confirmPassword
        ) {
            setError(
                "Veuillez remplir tous les champs."
            );

            return;
        }

        if (password.length < 8) {
            setError(
                "Le mot de passe doit contenir au moins 8 caractères."
            );

            return;
        }

        if (password !== confirmPassword) {
            setError(
                "Les mots de passe ne correspondent pas."
            );

            return;
        }

        if (!acceptTerms) {
            setError(
                "Vous devez accepter les conditions d'utilisation."
            );

            return;
        }

        /*
         * ============================================
         * DONNÉES DU FORMULAIRE
         * ============================================
         */

        const userData = {
            firstName,
            lastName,
            email,
            role,
            password,
        };

        console.log(
            "Inscription réussie :",
            userData
        );

        /*
         * ============================================
         * TODO : API
         * ============================================
         *
         * Ici tu feras plus tard :
         *
         * await fetch("/api/auth/register", {
         *     method: "POST",
         *     headers: {
         *         "Content-Type": "application/json",
         *     },
         *     body: JSON.stringify(userData),
         * });
         *
         */

        /*
         * ============================================
         * REDIRECTION
         * ============================================
         *
         * L'inscription est validée.
         * On redirige vers la connexion.
         */

        navigate("/login");
    };

    return (
        <main className={styles.register}>

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className={styles.register__background}>
                <div className={styles.register__orb} />
                <div className={styles.register__grid} />
            </div>


            {/* =====================================================
                CONTAINER
            ===================================================== */}

            <div className={styles.register__container}>

                {/* =================================================
                    BRAND
                ================================================= */}

                <Link
                    to="/"
                    className={styles.register__brand}
                    aria-label="Retour à l'accueil EduSmart"
                >
                    <div className={styles.register__brandIcon}>
                        ES
                    </div>

                    <div className={styles.register__brandText}>
                        <strong>
                            EduSmart
                        </strong>

                        <span>
                            Decision Platform
                        </span>
                    </div>
                </Link>


                {/* =================================================
                    REGISTER CARD
                ================================================= */}

                <section className={styles.register__card}>

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className={styles.register__header}>

                        <span
                            className={
                                styles.register__eyebrow
                            }
                        >
                            CRÉER UN COMPTE
                        </span>

                        <h1>
                            Rejoignez EduSmart
                        </h1>

                        <p>
                            Créez votre compte et accédez à
                            votre espace de travail éducatif.
                        </p>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (
                        <div
                            className={
                                styles.register__error
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
                        className={styles.register__form}
                        onSubmit={handleSubmit}
                    >

                        {/* =================================================
                            FIRST NAME / LAST NAME
                        ================================================= */}

                        <div
                            className={
                                styles.register__row
                            }
                        >

                            <div
                                className={
                                    styles.register__field
                                }
                            >

                                <label htmlFor="firstName">
                                    Prénom
                                </label>

                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="Anthony"
                                    value={firstName}
                                    onChange={(
                                        event
                                    ) =>
                                        setFirstName(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="given-name"
                                    required
                                />

                            </div>


                            <div
                                className={
                                    styles.register__field
                                }
                            >

                                <label htmlFor="lastName">
                                    Nom
                                </label>

                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Moussavou"
                                    value={lastName}
                                    onChange={(
                                        event
                                    ) =>
                                        setLastName(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="family-name"
                                    required
                                />

                            </div>

                        </div>


                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div
                            className={
                                styles.register__field
                            }
                        >

                            <label htmlFor="email">
                                Adresse email
                            </label>

                            <div
                                className={
                                    styles.register__inputWrapper
                                }
                            >

                                <span
                                    className={
                                        styles.register__inputIcon
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
                            ROLE
                        ================================================= */}

                        <div
                            className={
                                styles.register__field
                            }
                        >

                            <label htmlFor="role">
                                Type de compte
                            </label>

                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={(
                                    event
                                ) =>
                                    setRole(
                                        event.target.value
                                    )
                                }
                                required
                            >

                                <option
                                    value=""
                                    disabled
                                >
                                    Sélectionnez votre profil
                                </option>

                                <option value="student">
                                    Étudiant
                                </option>

                                <option value="teacher">
                                    Enseignant
                                </option>

                                <option value="admin">
                                    Administrateur
                                </option>

                            </select>

                        </div>


                        {/* =================================================
                            PASSWORD
                        ================================================= */}

                        <div
                            className={
                                styles.register__field
                            }
                        >

                            <label htmlFor="password">
                                Mot de passe
                            </label>

                            <div
                                className={
                                    styles.register__inputWrapper
                                }
                            >

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Minimum 8 caractères"
                                    value={password}
                                    onChange={(
                                        event
                                    ) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                />

                                <button
                                    type="button"
                                    className={
                                        styles.register__passwordToggle
                                    }
                                    onClick={() =>
                                        setShowPassword(
                                            (
                                                current
                                            ) =>
                                                !current
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Masquer"
                                        : "Afficher"}
                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            CONFIRM PASSWORD
                        ================================================= */}

                        <div
                            className={
                                styles.register__field
                            }
                        >

                            <label htmlFor="confirmPassword">
                                Confirmer le mot de passe
                            </label>

                            <div
                                className={
                                    styles.register__inputWrapper
                                }
                            >

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirmez votre mot de passe"
                                    value={confirmPassword}
                                    onChange={(
                                        event
                                    ) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                />

                                <button
                                    type="button"
                                    className={
                                        styles.register__passwordToggle
                                    }
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (
                                                current
                                            ) =>
                                                !current
                                        )
                                    }
                                >
                                    {showConfirmPassword
                                        ? "Masquer"
                                        : "Afficher"}
                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            TERMS
                        ================================================= */}

                        <label
                            className={
                                styles.register__terms
                            }
                        >

                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(
                                    event
                                ) =>
                                    setAcceptTerms(
                                        event.target.checked
                                    )
                                }
                                required
                            />

                            <span>
                                J'accepte les conditions
                                d'utilisation et la politique
                                de confidentialité d'EduSmart.
                            </span>

                        </label>


                        {/* =================================================
                            SUBMIT
                        ================================================= */}

                        <button
                            type="submit"
                            className={
                                styles.register__submit
                            }
                        >

                            <span>
                                Créer mon compte
                            </span>

                            <span aria-hidden="true">
                                →
                            </span>

                        </button>

                    </form>


                    {/* =================================================
                        LOGIN LINK
                    ================================================= */}

                    <div
                        className={
                            styles.register__login
                        }
                    >

                        <span>
                            Vous avez déjà un compte ?
                        </span>

                        <Link to="/login">
                            Se connecter
                        </Link>

                    </div>

                </section>


                {/* =================================================
                    SECURITY
                ================================================= */}

                <div
                    className={
                        styles.register__security
                    }
                >

                    <span
                        className={
                            styles.register__securityIcon
                        }
                    >
                        ✓
                    </span>

                    <span>
                        Vos informations sont protégées
                        et sécurisées.
                    </span>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div
                    className={
                        styles.register__footer
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

export default Register;