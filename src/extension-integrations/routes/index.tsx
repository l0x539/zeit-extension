export const ROUTES = [
  {
    integration: 'github',
    rules: [/^https:\/\/.*github.com\/.*\/.*\/issues\/.*$/],
  },
  {
    integration: 'gitlab',
    rules: [/^https:\/\/.*gitlab.com\/.*\/.*\/.*\/issues\/.*$/],
  },
  {
    integration: 'jira',
    rules: [
      /^https\:\/\/.*atlassian\.net\/.*\/boards\/.*\?.*selectedIssue=.*$/,
      /^https\:\/\/.*atlassian\.net\/browse\/.+/,
      /^https\:\/\/jira\.jda\.com\/browse\/.+/
    ],
  },
  {
    integration: 'zendesk',
    // eslint-disable-next-line max-len
    rules: [/^https\:\/\/.*zendesk\.com\/agent\/tickets\/.*$/],
  },
];

