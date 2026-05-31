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
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/site-structure">
                Review documentation plan
              </Link>
              <Link className="button button--secondary button--lg" to="/site-structure">
                Review site structure
              </Link>
            </div>
          </div>
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
