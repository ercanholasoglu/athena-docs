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
        {to: '/site-structure', label: 'Site Structure', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Site Structure', to: '/site-structure'},
          ],
        },
        {
          title: 'Status',
          items: [
            {label: 'First content sprint pending', to: '/site-structure'},
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
