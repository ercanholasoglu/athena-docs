import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/first-run',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/decision-architecture',
        'concepts/strict-vs-exploratory',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/on-premise',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: [
        'operations/backup-recovery',
      ],
    },
    {
      type: 'category',
      label: 'Security & Compliance',
      items: [
        'security-compliance/authentication-sso',
        'security-compliance/bddk-mapping',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'tutorials/credit-default-model',
      ],
    },
    {
      type: 'category',
      label: 'Repository',
      items: ['site-structure'],
    },
  ],
};

export default sidebars;
