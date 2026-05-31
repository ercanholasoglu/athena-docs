import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type {ReactElement} from 'react';

import styles from './index.module.css';

const useCases = [
  {
    title: 'Governed model development',
    description:
      'Run AutoML workflows with decision records, validation gates, and auditable model outputs.',
  },
  {
    title: 'Traceable agentic reasoning',
    description:
      'Inspect how model, feature, retry, and reporting decisions were made during a run.',
  },
  {
    title: 'Private deployment',
    description:
      'Deploy Athena into customer-owned infrastructure with Helm, private storage, and controlled LLM provider configuration.',
  },
];

function UseCaseCard({title, description}: {title: string; description: string}) {
  return (
    <article className={styles.card}>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </article>
  );
}

export default function Home(): ReactElement {
  return (
    <Layout
      title="Athena Documentation"
      description="Documentation for Athena, a reasoning-native AutoML platform for governed model development.">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Athena Documentation</p>
            <Heading as="h1">Reasoning-native AutoML for governed model development</Heading>
            <p className={styles.subtitle}>
              Product, deployment, operations, security, compliance, API, and tutorial documentation for Athena.
              Athena is an agentic AutoML platform for tabular machine-learning workflows. It combines dataset
              inspection, feature creation, preprocessing, model training, explainability, monitoring, retraining
              signals, and deployment packaging in one application. This documentation site is written for teams
              that need to evaluate Athena as an enterprise system, not only as a local experiment.
            </p>
            <p className={styles.subtitle}>
              Start here if you are installing Athena, reviewing its security posture, planning an on-premise
              rollout, or preparing a governed model run. The docs define core terms on first use: AutoML means
              automated machine learning, RBAC means role-based access control, SSO means single sign-on, BDDK is
              Turkey's Banking Regulation and Supervision Agency, and KVKK is Turkey's personal data protection law.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/getting-started/installation">
                Start with installation
              </Link>
              <Link className="button button--secondary button--lg" to="/security-compliance/bddk-mapping">
                Review BDDK mapping
              </Link>
            </div>
          </div>
        </section>
        <section className={clsx('container', styles.overview)}>
          <Heading as="h2">What Athena helps teams prove</Heading>
          <p>
            Enterprise machine-learning reviews usually fail on evidence, not on modeling ambition. A model can have
            a good score and still be impossible to promote if nobody can explain which features were created, which
            model alternatives were rejected, whether validation was appropriate, whether leakage checks ran, and who
            approved the decision. Athena is designed around that evidence trail. A training run records model choices,
            feature engineering decisions, validator checks, score sanity warnings, and report outputs so that a model
            can be reviewed by engineers, risk teams, and business stakeholders together.
          </p>
          <p>
            The first documentation sprint focuses on the pages a buyer or implementation team needs immediately:
            installation, first run, decision architecture, strict versus exploratory mode, on-premise deployment,
            backup and recovery, authentication and SSO, BDDK mapping, and a complete credit default tutorial. Later
            sprints will expand API reference, feature store, high-dimensional data layer, monitoring, scaling, and
            compliance details.
          </p>
          <p>
            Screenshot placeholder: Athena dashboard with a completed training job, score sanity warning, decision
            trace panel, and model comparison table.
          </p>
          <p>
            Use the site as the shared reference during customer reviews. Platform teams can start with deployment,
            data science teams can start with the tutorial, and security teams can start with authentication and BDDK
            mapping.
          </p>
        </section>
        <section className={clsx('container', styles.useCases)}>
          {useCases.map((item) => (
            <UseCaseCard key={item.title} {...item} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
