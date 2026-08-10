
// import Header from "../../components/navigation/Header/Header";
// import Footer from "../../components/navigation/Footer/Footer";

import styles from "../../styles/Home.module.scss";

const Home:React.FC = () => {
    return (
        <div className={styles.home}>

            {/* <Header /> */}

            <main>

                {/* ================================
                    HERO
                ================================= */}

                <section className={styles.hero}>

                    <div className={styles.hero__content}>

                        <span className={styles.hero__badge}>
                            EduSmart Decision Platform
                        </span>

                        <h1 className={styles.hero__title}>
                            Transformez les données éducatives
                            <span>
                                {" "}en décisions intelligentes.
                            </span>
                        </h1>

                        <p className={styles.hero__description}>
                            Une plateforme Data Engineering conçue pour
                            centraliser, transformer, analyser et valoriser
                            les données issues des systèmes éducatifs afin
                            d'améliorer la prise de décision.
                        </p>

                        <div className={styles.hero__actions}>

                            <a
                                href="/login"
                                className={styles.hero__primaryButton}
                            >
                                Accéder à la plateforme
                            </a>

                            <a
                                href="#features"
                                className={styles.hero__secondaryButton}
                            >
                                Découvrir la plateforme
                            </a>

                        </div>

                    </div>


                    <div className={styles.hero__visual}>

                        <div className={styles.dashboard}>

                            <div className={styles.dashboard__header}>

                                <div>
                                    <span>
                                        EduSmart Analytics
                                    </span>

                                    <h3>
                                        Vue globale
                                    </h3>
                                </div>

                                <div className={styles.dashboard__status}>
                                    <span />
                                    Système opérationnel
                                </div>

                            </div>


                            <div className={styles.dashboard__metrics}>

                                <div className={styles.metric}>
                                    <span>Étudiants</span>
                                    <strong>12 480</strong>
                                    <small>+8.4%</small>
                                </div>

                                <div className={styles.metric}>
                                    <span>Performance</span>
                                    <strong>78.6%</strong>
                                    <small>+5.2%</small>
                                </div>

                                <div className={styles.metric}>
                                    <span>Présence</span>
                                    <strong>91.3%</strong>
                                    <small>+2.7%</small>
                                </div>

                            </div>


                            <div className={styles.dashboard__chart}>

                                <div className={styles.chart__header}>
                                    <span>
                                        Évolution des performances
                                    </span>

                                    <span>
                                        2026
                                    </span>
                                </div>

                                <div className={styles.chart}>
                                    <div
                                        className={styles.chart__line}
                                    />

                                    <div className={styles.chart__bars}>
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================================
                    DATA SOURCES
                ================================= */}

                <section className={styles.dataSection}>

                    <div className={styles.sectionHeader}>

                        <span className={styles.sectionHeader__eyebrow}>
                            DATA INTEGRATION
                        </span>

                        <h2>
                            Une vision unifiée de vos données
                        </h2>

                        <p>
                            EduSmart centralise les données provenant de
                            plusieurs systèmes et formats afin de construire
                            une source d'information cohérente et exploitable.
                        </p>

                    </div>


                    <div className={styles.dataSources}>

                        <div className={styles.dataSource}>
                            <div className={styles.dataSource__icon}>
                                PG
                            </div>

                            <div>
                                <h3>PostgreSQL</h3>
                                <p>Gestion académique</p>
                            </div>
                        </div>


                        <div className={styles.dataSource}>
                            <div className={styles.dataSource__icon}>
                                MY
                            </div>

                            <div>
                                <h3>MySQL</h3>
                                <p>Plateforme pédagogique</p>
                            </div>
                        </div>


                        <div className={styles.dataSource}>
                            <div className={styles.dataSource__icon}>
                                CSV
                            </div>

                            <div>
                                <h3>CSV</h3>
                                <p>Données externes</p>
                            </div>
                        </div>


                        <div className={styles.dataSource}>
                            <div className={styles.dataSource__icon}>
                                JSON
                            </div>

                            <div>
                                <h3>JSON</h3>
                                <p>Données structurées</p>
                            </div>
                        </div>


                        <div className={styles.dataSource}>
                            <div className={styles.dataSource__icon}>
                                RD
                            </div>

                            <div>
                                <h3>Redis</h3>
                                <p>Données temps réel</p>
                            </div>
                        </div>

                    </div>

                </section>


                {/* ================================
                    FEATURES
                ================================= */}

                <section
                    id="features"
                    className={styles.features}
                >

                    <div className={styles.sectionHeader}>

                        <span className={styles.sectionHeader__eyebrow}>
                            PLATEFORME
                        </span>

                        <h2>
                            Une architecture pensée pour la donnée
                        </h2>

                        <p>
                            De l'ingestion jusqu'à la visualisation,
                            EduSmart accompagne l'ensemble du cycle de vie
                            de la donnée.
                        </p>

                    </div>


                    <div className={styles.features__grid}>

                        <article className={styles.featureCard}>
                            <span className={styles.featureCard__number}>
                                01
                            </span>

                            <h3>
                                Centralisation
                            </h3>

                            <p>
                                Rassemblez les données provenant de
                                différentes sources dans une architecture
                                de données unifiée.
                            </p>
                        </article>


                        <article className={styles.featureCard}>
                            <span className={styles.featureCard__number}>
                                02
                            </span>

                            <h3>
                                ETL & Transformation
                            </h3>

                            <p>
                                Nettoyez, transformez et préparez les données
                                pour leur exploitation analytique.
                            </p>
                        </article>


                        <article className={styles.featureCard}>
                            <span className={styles.featureCard__number}>
                                03
                            </span>

                            <h3>
                                Analytics
                            </h3>

                            <p>
                                Analysez les performances académiques grâce
                                à des indicateurs et tableaux de bord.
                            </p>
                        </article>


                        <article className={styles.featureCard}>
                            <span className={styles.featureCard__number}>
                                04
                            </span>

                            <h3>
                                Aide à la décision
                            </h3>

                            <p>
                                Transformez les données en informations
                                permettant de prendre de meilleures décisions.
                            </p>
                        </article>

                    </div>

                </section>


                {/* ================================
                    ARCHITECTURE
                ================================= */}

                <section
                    id="architecture"
                    className={styles.pipeline}
                >

                    <div className={styles.sectionHeader}>

                        <span className={styles.sectionHeader__eyebrow}>
                            DATA PIPELINE
                        </span>

                        <h2>
                            Du système source à la décision
                        </h2>

                    </div>


                    <div className={styles.pipeline__flow}>

                        <div className={styles.pipelineStep}>
                            <span>01</span>
                            <strong>Sources</strong>
                            <small>
                                PostgreSQL · MySQL · CSV · JSON · Redis
                            </small>
                        </div>

                        <div className={styles.pipelineArrow}>
                            →
                        </div>

                        <div className={styles.pipelineStep}>
                            <span>02</span>
                            <strong>ETL</strong>
                            <small>
                                Extraction · Transformation · Nettoyage
                            </small>
                        </div>

                        <div className={styles.pipelineArrow}>
                            →
                        </div>

                        <div className={styles.pipelineStep}>
                            <span>03</span>
                            <strong>Data Warehouse</strong>
                            <small>
                                Données structurées et consolidées
                            </small>
                        </div>

                        <div className={styles.pipelineArrow}>
                            →
                        </div>

                        <div className={styles.pipelineStep}>
                            <span>04</span>
                            <strong>Analytics</strong>
                            <small>
                                KPI · Dashboards · Décision
                            </small>
                        </div>

                    </div>

                </section>


                {/* ================================
                    STATS
                ================================= */}

                <section className={styles.stats}>

                    <div className={styles.stat}>
                        <strong>5+</strong>
                        <span>Sources de données</span>
                    </div>

                    <div className={styles.stat}>
                        <strong>100%</strong>
                        <span>Pipeline automatisable</span>
                    </div>

                    <div className={styles.stat}>
                        <strong>360°</strong>
                        <span>Vision des données</span>
                    </div>

                    <div className={styles.stat}>
                        <strong>1</strong>
                        <span>Plateforme décisionnelle</span>
                    </div>

                </section>


                {/* ================================
                    CTA
                ================================= */}

                <section className={styles.cta}>

                    <div className={styles.cta__content}>

                        <span>
                            READY TO EXPLORE YOUR DATA?
                        </span>

                        <h2>
                            Passez de la donnée
                            <br />
                            à la décision.
                        </h2>

                        <p>
                            Connectez-vous à EduSmart et découvrez une
                            nouvelle manière d'exploiter les données
                            éducatives.
                        </p>

                        <a
                            href="/login"
                            className={styles.cta__button}
                        >
                            Commencer maintenant →
                        </a>

                    </div>

                </section>

            </main>

            {/* <Footer /> */}

        </div>
    );
};

export default Home;