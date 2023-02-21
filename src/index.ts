/* eslint-disable array-callback-return */
import * as dotenv from "dotenv";
dotenv.config();

import * as fs from "node:fs/promises";

const KRepositoryUrl = "https://api.github.com/orgs/NodeSecure/repos";
const headers = { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` };
const KLabelName = "good%20first%20issue";

export type Issue = {
  title: string;
  created_at: string;
  body: string;
  assignee: {
    login: string;
    avatar_url: string;
  };
};

export type ReposWithIssuesResult = {
  name: string,
  has_issues: boolean,
  issues: Issue[];
  issues_length: number;
}

export async function getReposWithIssues() {
  const response = await fetch(KRepositoryUrl, { headers });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const repositories = await response.json() as ReposWithIssuesResult[];
  const reposWithActiveIssueFunctionality = repositories.filter((repository) => repository.has_issues)
    .map((repository) => repository.name);

  const results: ReposWithIssuesResult[] = [];
  for (const repo of reposWithActiveIssueFunctionality) {
    const response = await fetch(`https://api.github.com/repos/NodeSecure/${repo}/issues?labels=${KLabelName}&state=open`,
      { headers });
    const issues = await response.json() as Issue[];

    if (issues.length === 0) {
      continue;
    }

    const issuesList = issues.map((issue) => {
      return {
        title: issue.title,
        created_at: issue.created_at,
        body: issue.body,
        assignee: issue.assignee

      };
    });

    results.push({
      name: repo,
      has_issues: true,
      issues: issuesList,
      issues_length: issuesList.length
    });
  }
  await fs.writeFile("issuesList.json", JSON.stringify(results));
}

