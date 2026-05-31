import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Athena Documentation',
  tagline: 'Reasoning-native AutoML for governed model development.',
  favicon: 'img/logo.svg',

  url: 'https://docs.athenaml.app',
  baseUrl: '/',
  organizationName: 'athenaml',
  projectName: 'athena-docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    navbar: {
      title: 'Athena Docs',
      logo: {
        alt: 'Athena',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {to: '/getting-started/installation', label: 'Getting Started', position: 'left'},
        {to: '/concepts/decision-architecture', label: 'Concepts', position: 'left'},
        {to: '/deployment/on-premise', label: 'Deployment', position: 'left'},
        {to: '/security-compliance/authentication-sso', label: 'Security', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Installation', to: '/getting-started/installation'},
            {label: 'First Run', to: '/getting-started/first-run'},
            {label: 'Decision Architecture', to: '/concepts/decision-architecture'},
          ],
        },
        {
          title: 'Operations',
          items: [
            {label: 'On-Premise', to: '/deployment/on-premise'},
            {label: 'Backup & Recovery', to: '/operations/backup-recovery'},
            {label: 'Support', to: '/site-structure'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Athena ML.`,
    },
    prism: {
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
