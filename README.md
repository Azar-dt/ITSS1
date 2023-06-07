## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## WorkFlow

The most important rule of this workflow, is that the developer who is writing the code is responsible for making sure it goes through the entire process smoothly and in a timely manner.

## New Code

### Create Branch

1. Update the **main** branches to latest version(s)

- Always branch from the place it will be merged back into

2. Create branch

- git checkout -b [branch_name] (ex: git checkout -b issue_2)

### Make Changes

3. Make change

- Make sure all watch tasks are running (build, unit tests)

4. Test

- Run full test suite locally

5. Commit with descriptive name

- prefix with `[WIP]` ("work in progress") if task not done yet

### Push changes

6. git push origin [branch_name]

### Pull Request

7. Open pull request into a **main** branch
   - title: Issue_XX: [description]

### Code Review

8. Other devs should review code and leave notes

   - no confusing code
   - check for potential issues
   - any architectual improvements

9. Code owner is responsible for making any necessary fixes any pushing them up
   - Follow same commit process
