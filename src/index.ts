/* eslint-disable array-callback-return */
import * as dotenv from "dotenv";
dotenv.config();

const KRepositoryUrl = "https://api.github.com/orgs/NodeSecure/repos";
const headers = { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` };
const KLabelName = "good%20first%20issue";

export type Issue = {
  title: string;
  created_at: string;
  body: string;
  assignee: Assignee;
};

export type Assignee = {
  login: string;
  avatar_url: string;
};

export type ReposWithIssuesResult = {
  name: string,
  has_issues: boolean,
  issues: Issue[];
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
    const issuesList: Issue[] = [];
    if (issues.length > 0) {
      for (const issue of issues) {
        const data = {
          title: issue.title,
          created_at: issue.created_at,
          body: issue.body,
          assignee: issue.assignee
        };
        issuesList.push(data);
      }
    }
    results.push({
      name: repo,
      has_issues: true,
      issues: issuesList
    });
  }
  console.log(JSON.stringify(results));
}

