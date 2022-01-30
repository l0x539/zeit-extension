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
      /^https\:\/\/.*atlassian\.net\/.*\/boards\/.?\?.*selectedIssue=.*$/,
    ],
  },
  {
    integration: 'zendesk',
    // eslint-disable-next-line max-len
    rules: [/^https\:\/\/.*zendesk\.com\/agent\/tickets\/.*$/],
  },
];

