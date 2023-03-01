<p align="center"><h1 align="center">
  nodesecure-issue-tracker
</h1>

<p align="center">
    <a href="https://github.com/fabnguess/nodesecure-issue-tracker">
      <img src="https://img.shields.io/github/package-json/v/fabnguess/nodesecure-issue-tracker?style=for-the-badge" alt="npm version">
    </a>
     <a href="https://github.com/fabnguess/nodesecure-issue-tracker">
      <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge" alt="maintained">
    </a>
    <a href="https://github.com/fabnguess/nodesecure-issue-tracker">
      <img src="https://img.shields.io/github/license/fabnguess/nodesecure-issue-tracker?style=for-the-badge" alt="license">
    </a>
    <a href="https://api.securityscorecards.dev/projects/github.com/fabnguess/nodesecure-issue-tracker">
      <img src="https://api.securityscorecards.dev/projects/github.com/fabnguess/nodesecure-issue-tracker/badge?style=for-the-badge" alt="ossf scorecard">
    </a>
    <a href="https://github.com/fabnguess/nodesecure-issue-tracker/actions?query=workflow%3A%22Node.js+CI%22">
      <img src="https://img.shields.io/github/actions/workflow/status/fabnguess/nodesecure-issue-tracker/main.yml?style=for-the-badge" alt="github ci workflow">
    </a>
</p>

## Requirements

- [Node.js](https://nodejs.org/en/) v16 or higher

## Getting Started
Use this project to retrieve the list of active issues for each repository in a specified GitHub organization. Issues are filtered by labels and stored in a JSON file.

```bash
$ npm install github:fabnguess/nodesecure-issue-tracker
```

## Usage example

```ts
import {getReposWithIssues} from "nodesecure-issue-tracker";

await getReposWithIssues("NodeSecure", ['good first issue', 'enhancement']);
```

```ts
import {fetchRepositoriesWithActiveIssues} from "nodesecure-issue-tracker";

const Repositories = await fetchRepositoriesWithActiveIssues("NodeSecure");
console.log(Repositories);
```

```ts
import {fetchRepositoriesWithActiveIssues} from "nodesecure-issue-tracker";

const issues = await fetchRepositoriesWithActiveIssues("NodeSecure/rc", ['good first issue']);
console.log(issues);
```

## API

### getReposWithIssues(organization: string, labels: string[]) : Promise<void>
 - Retrieves the list of repositories from a specified GitHub organization that have active issues.
 - Filters active issues in each repository by specified labels.
 - Stores information from each repository, including active issues, in a JSON file.

 **Parameters**

 - `organization` : name of the GitHub organization whose repositories you want to retrieve. 
 - `Labels` : An array of label chains to filter active issues.

### fetchRepositoriesWithActiveIssues(organization: string): Promise<string[]>
 - Retrieves the list of repositories from a specified GitHub organization that have active issues.

 **Parameters**

 - `organization` : name of the GitHub organization whose repositories you want to retrieve. 

### fetchIssuesForRepositories(repository: string, labels: string[]): Promise<Issue[]>
 - Retrieves the list of active issues for a specified repository, filtered by labels.

  **Parameters**

 - `repository` : Name of the repository for which we want to retrieve the active issues. 
 - `Labels` : An array of label chains to filter active issues.