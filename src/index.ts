import * as dotenv from "dotenv";
dotenv.config();

const KRepositoryUrl = "https://api.github.com/orgs/NodeSecure/repos";
const headers = { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` };

export type ReposWithIssuesResult ={
    name : string,
	has_issues : boolean
}

export async function getReposWithIssues() {
  const response = await fetch(KRepositoryUrl, { headers });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const repositories = await response.json() as ReposWithIssuesResult [];
  repositories.filter((repository) => repository.has_issues)
    .map((repository) => repository.name);
}

