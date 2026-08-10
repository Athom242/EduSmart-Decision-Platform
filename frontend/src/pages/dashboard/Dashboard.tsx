import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Dashboard.module.scss";

interface Metric {
    label: string;
    value: string;
    evolution: string;
    description: string;
}

interface DataSource {
    name: string;
    type: string;
    status: "Opérationnel" | "Synchronisation" | "Erreur";
    records: string;
}

interface Activity {
    title: string;
    description: string;
    time: string;
    type: "success" | "info" | "warning";
}

const Dashboard = (): React.JSX.Element => {
    const [period, setPeriod] = useState<string>("30 jours");

    const metrics: Metric[] = [
        {
            label: "Étudiants",
            value: "12 480",
            evolution: "+8.4%",
            description: "vs période précédente",
        },
        {
            label: "Performance moyenne",
            value: "78.6%",
            evolution: "+5.2%",
            description: "progression globale",
        },
        {
            label: "Taux de présence",
            value: "91.3%",
            evolution: "+2.7%",
            description: "sur les cours suivis",
        },
        {
            label: "Taux de réussite",
            value: "84.8%",
            evolution: "+6.1%",
            description: "résultats académiques",
        },
    ];

    const dataSources: DataSource[] = [
        {
            name: "PostgreSQL",
            type: "Gestion académique",
            status: "Opérationnel",
            records: "248 520",
        },
        {
            name: "MySQL",
            type: "Plateforme pédagogique",
            status: "Opérationnel",
            records: "182 430",
        },
        {
            name: "CSV",
            type: "Données externes",
            status: "Synchronisation",
            records: "45 820",
        },
        {
            name: "JSON",
            type: "Données structurées",
            status: "Opérationnel",
            records: "28 640",
        },
        {
            name: "Redis",
            type: "Données temps réel",
            status: "Opérationnel",
            records: "96 240",
        },
    ];

    const activities: Activity[] = [
        {
            title: "Pipeline ETL terminé",
            description:
                "Les données académiques ont été synchronisées avec succès.",
            time: "Il y a 12 min",
            type: "success",
        },
        {
            title: "Nouvelles données disponibles",
            description:
                "4 280 nouveaux enregistrements ont été intégrés.",
            time: "Il y a 35 min",
            type: "info",
        },
        {
            title: "Anomalie détectée",
            description:
                "Une variation inhabituelle a été détectée dans les données de présence.",
            time: "Il y a 1 h",
            type: "warning",
        },
        {
            title: "Rapport généré",
            description:
                "Le rapport de performance académique est disponible.",
            time: "Il y a 2 h",
            type: "success",
        },
    ];

    return (
        <main className={styles.dashboard}>

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className={styles.dashboard__header}>

                <div className={styles.dashboard__heading}>

                    <span className={styles.dashboard__eyebrow}>
                        EDUSMART ANALYTICS
                    </span>

                    <h1>
                        Tableau de bord
                    </h1>

                    <p>
                        Vue globale des données et performances
                        de votre environnement éducatif.
                    </p>

                </div>


                <div className={styles.dashboard__actions}>

                    <select
                        className={styles.dashboard__period}
                        value={period}
                        onChange={(event) =>
                            setPeriod(event.target.value)
                        }
                    >
                        <option value="7 jours">
                            7 jours
                        </option>

                        <option value="30 jours">
                            30 jours
                        </option>

                        <option value="90 jours">
                            90 jours
                        </option>

                        <option value="12 mois">
                            12 mois
                        </option>
                    </select>

                    <button
                        type="button"
                        className={styles.dashboard__refresh}
                    >
                        Actualiser
                    </button>

                </div>

            </header>


            {/* =====================================================
                STATUS
            ===================================================== */}

            <section className={styles.dashboard__systemStatus}>

                <div className={styles.systemStatus__indicator}>
                    <span />
                </div>

                <div>
                    <strong>
                        Système opérationnel
                    </strong>

                    <p>
                        Toutes les sources de données fonctionnent
                        normalement.
                    </p>
                </div>

                <span className={styles.systemStatus__time}>
                    Dernière synchronisation : il y a 5 min
                </span>

            </section>


            {/* =====================================================
                KPI
            ===================================================== */}

            <section className={styles.dashboard__metrics}>

                {metrics.map((metric) => (
                    <article
                        key={metric.label}
                        className={styles.metric}
                    >

                        <div className={styles.metric__header}>

                            <span>
                                {metric.label}
                            </span>

                            <span
                                className={
                                    styles.metric__icon
                                }
                            >
                                +
                            </span>

                        </div>

                        <strong>
                            {metric.value}
                        </strong>

                        <div className={styles.metric__footer}>

                            <span>
                                {metric.evolution}
                            </span>

                            <small>
                                {metric.description}
                            </small>

                        </div>

                    </article>
                ))}

            </section>


            {/* =====================================================
                ANALYTICS
            ===================================================== */}

            <section className={styles.dashboard__analytics}>

                {/* PERFORMANCE */}

                <article
                    className={
                        styles.analyticsCard
                    }
                >

                    <div
                        className={
                            styles.analyticsCard__header
                        }
                    >

                        <div>

                            <span>
                                PERFORMANCE ACADÉMIQUE
                            </span>

                            <h2>
                                Évolution des performances
                            </h2>

                        </div>

                        <button type="button">
                            Voir le rapport →
                        </button>

                    </div>


                    <div className={styles.chart}>

                        <div className={styles.chart__labels}>

                            <span>
                                100%
                            </span>

                            <span>
                                75%
                            </span>

                            <span>
                                50%
                            </span>

                            <span>
                                25%
                            </span>

                            <span>
                                0%
                            </span>

                        </div>


                        <div className={styles.chart__area}>

                            <div
                                className={
                                    styles.chart__grid
                                }
                            />

                            <svg
                                className={
                                    styles.chart__svg
                                }
                                viewBox="0 0 700 240"
                                preserveAspectRatio="none"
                                aria-label="Évolution des performances"
                            >

                                <defs>

                                    <linearGradient
                                        id="performanceGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopOpacity="0.25"
                                        />

                                        <stop
                                            offset="100%"
                                            stopOpacity="0"
                                        />
                                    </linearGradient>

                                </defs>


                                <path
                                    className={
                                        styles.chart__fill
                                    }
                                    d="
                                        M0 180
                                        C70 165 90 175 140 145
                                        C190 115 210 140 270 115
                                        C330 90 350 110 400 95
                                        C460 75 490 95 530 65
                                        C580 35 620 55 700 25
                                        L700 240
                                        L0 240
                                        Z
                                    "
                                />

                                <path
                                    className={
                                        styles.chart__line
                                    }
                                    d="
                                        M0 180
                                        C70 165 90 175 140 145
                                        C190 115 210 140 270 115
                                        C330 90 350 110 400 95
                                        C460 75 490 95 530 65
                                        C580 35 620 55 700 25
                                    "
                                />

                            </svg>


                            <div
                                className={
                                    styles.chart__months
                                }
                            >
                                <span>Jan</span>
                                <span>Fév</span>
                                <span>Mar</span>
                                <span>Avr</span>
                                <span>Mai</span>
                                <span>Juin</span>
                                <span>Juil</span>
                            </div>

                        </div>

                    </div>

                </article>


                {/* ATTENDANCE */}

                <article
                    className={
                        styles.attendanceCard
                    }
                >

                    <div
                        className={
                            styles.attendanceCard__header
                        }
                    >

                        <div>

                            <span>
                                PRÉSENCE
                            </span>

                            <h2>
                                Taux de présence
                            </h2>

                        </div>

                        <button type="button">
                            →
                        </button>

                    </div>


                    <div
                        className={
                            styles.attendanceCard__content
                        }
                    >

                        <div
                            className={
                                styles.attendanceCircle
                            }
                        >

                            <div
                                className={
                                    styles.attendanceCircle__inner
                                }
                            >
                                <strong>
                                    91.3%
                                </strong>

                                <span>
                                    présence
                                </span>
                            </div>

                        </div>


                        <div
                            className={
                                styles.attendanceLegend
                            }
                        >

                            <div>
                                <span
                                    className={
                                        styles.legend__dot
                                    }
                                />

                                <div>
                                    <strong>
                                        Présents
                                    </strong>

                                    <small>
                                        11 394 étudiants
                                    </small>
                                </div>
                            </div>


                            <div>
                                <span
                                    className={
                                        styles.legend__dot
                                    }
                                />

                                <div>
                                    <strong>
                                        Absents
                                    </strong>

                                    <small>
                                        1 086 étudiants
                                    </small>
                                </div>
                            </div>

                        </div>

                    </div>

                </article>

            </section>


            {/* =====================================================
                BOTTOM GRID
            ===================================================== */}

            <section className={styles.dashboard__bottomGrid}>

                {/* =================================================
                    DATA SOURCES
                ================================================= */}

                <article
                    className={
                        styles.sourcesCard
                    }
                >

                    <div
                        className={
                            styles.cardHeader
                        }
                    >

                        <div>

                            <span>
                                DATA INTEGRATION
                            </span>

                            <h2>
                                Sources de données
                            </h2>

                        </div>

                        <Link to="/data-sources">
                            Voir tout →
                        </Link>

                    </div>


                    <div
                        className={
                            styles.sourcesList
                        }
                    >

                        {dataSources.map((source) => (
                            <div
                                key={source.name}
                                className={
                                    styles.source
                                }
                            >

                                <div
                                    className={
                                        styles.source__icon
                                    }
                                >
                                    {source.name
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </div>


                                <div
                                    className={
                                        styles.source__info
                                    }
                                >

                                    <strong>
                                        {source.name}
                                    </strong>

                                    <span>
                                        {source.type}
                                    </span>

                                </div>


                                <div
                                    className={
                                        styles.source__records
                                    }
                                >

                                    <strong>
                                        {source.records}
                                    </strong>

                                    <span>
                                        enregistrements
                                    </span>

                                </div>


                                <span
                                    className={
                                        styles.source__status
                                    }
                                >
                                    <span />
                                    {source.status}
                                </span>

                            </div>
                        ))}

                    </div>

                </article>


                {/* =================================================
                    ACTIVITIES
                ================================================= */}

                <article
                    className={
                        styles.activityCard
                    }
                >

                    <div
                        className={
                            styles.cardHeader
                        }
                    >

                        <div>

                            <span>
                                ACTIVITÉ
                            </span>

                            <h2>
                                Activité récente
                            </h2>

                        </div>

                        <button type="button">
                            →
                        </button>

                    </div>


                    <div
                        className={
                            styles.activityList
                        }
                    >

                        {activities.map((activity) => (
                            <div
                                key={activity.title}
                                className={
                                    styles.activity
                                }
                            >

                                <span
                                    className={`${styles.activity__indicator} ${
                                        styles[
                                            `activity__indicator--${activity.type}`
                                        ]
                                    }`}
                                />


                                <div
                                    className={
                                        styles.activity__content
                                    }
                                >

                                    <strong>
                                        {activity.title}
                                    </strong>

                                    <p>
                                        {activity.description}
                                    </p>

                                    <small>
                                        {activity.time}
                                    </small>

                                </div>

                            </div>
                        ))}

                    </div>

                </article>

            </section>


            {/* =====================================================
                QUICK ACTIONS
            ===================================================== */}

            <section
                className={
                    styles.dashboard__quickActions
                }
            >

                <div
                    className={
                        styles.quickActions__heading
                    }
                >

                    <span>
                        ACTIONS RAPIDES
                    </span>

                    <h2>
                        Exploitez vos données
                    </h2>

                </div>


                <div
                    className={
                        styles.quickActions__grid
                    }
                >

                    <Link
                        to="/analytics"
                        className={
                            styles.quickAction
                        }
                    >

                        <span>
                            01
                        </span>

                        <strong>
                            Analytics
                        </strong>

                        <p>
                            Analysez les performances
                            académiques.
                        </p>

                        <b>
                            →
                        </b>

                    </Link>


                    <Link
                        to="/etl"
                        className={
                            styles.quickAction
                        }
                    >

                        <span>
                            02
                        </span>

                        <strong>
                            Pipeline ETL
                        </strong>

                        <p>
                            Consultez et contrôlez vos
                            pipelines de données.
                        </p>

                        <b>
                            →
                        </b>

                    </Link>


                    <Link
                        to="/reports"
                        className={
                            styles.quickAction
                        }
                    >

                        <span>
                            03
                        </span>

                        <strong>
                            Rapports
                        </strong>

                        <p>
                            Générez des rapports décisionnels.
                        </p>

                        <b>
                            →
                        </b>

                    </Link>


                    <Link
                        to="/data-sources"
                        className={
                            styles.quickAction
                        }
                    >

                        <span>
                            04
                        </span>

                        <strong>
                            Sources
                        </strong>

                        <p>
                            Gérez vos connexions de données.
                        </p>

                        <b>
                            →
                        </b>

                    </Link>

                </div>

            </section>

        </main>
    );
};

export default Dashboard;