export const ROUTES = [
  {
    integration: 'github',
    rule: /^https:\/\/.*github.com\/.*\/.*\/issues\/.*$/,
  },
  {
    integration: 'gitlab',
    rule: /^https:\/\/.*gitlab.com\/.*\/.*\/.*\/issues\/.*$/,
  },
  {
    integration: 'jira',
    // eslint-disable-next-line max-len
    rule: /^https\:\/\/.*atlassian\.net\/.*\/boards\/.?\?.*selectedIssue=.*$/,
  },
];

