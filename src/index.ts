/* eslint-disable array-callback-return */
import * as dotenv from "dotenv";
dotenv.config();

import * as fs from "node:fs/promises";
import { URL } from "node:url";

const KGithubApiUrl = "https://api.github.com";
const headers = { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` };

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


export async function getReposWithIssues(organization: string, labels: string[]) : Promise<void> {
  const reposWithActiveIssueFunctionality = await fetchRepositoriesWithActiveIssues(organization);

  const results: ReposWithIssuesResult[] = [];
  for (const repo of reposWithActiveIssueFunctionality) {
    const issues = await fetchIssuesForRepositories(`${organization}/${repo}`, labels);

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

export async function fetchRepositoriesWithActiveIssues(organization: string) {
  if (typeof organization != "string") {
    throw new Error(`The organization must be a string but has ${organization}`);
  }

  if (organization.length < 1) {
    throw new Error("The organization should not be an empty string");
  }
  const { href } = new URL(`orgs/${organization}/repos`, KGithubApiUrl);

  const response = await fetch(href, { headers });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const repositories = await response.json() as ReposWithIssuesResult[];

  return repositories.filter((repository) => repository.has_issues)
    .map((repository) => repository.name);
}

export async function fetchIssuesForRepositories(repository: string, labels: string[]) {
  const encodedLabelNames = labels.map((label) => encodeURIComponent(label)).join(",");

  const { href } = new URL(`repos/${repository}/issues?labels=${encodedLabelNames}&state=open`,
    KGithubApiUrl);


  const response = await fetch(href, { headers });
  const issues = await response.json() as Issue[];

  return issues;
}
