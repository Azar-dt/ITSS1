## 1. Getting Started

node v18.13.0

First, run:

```bash
yarn install
```

Create a new **.env** file from **.env.example**

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 2. VSCode Extension

- **ESLint** \*
- **Prettier** \*
  - After install, go to vscode setting ( **CTRL + ,** ):
    - Find formatter, set default formatter to prettier
    - Turn on format on save
- Code Spell Checker

## 3. WorkFlow

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

### Push changes

6. git push origin [branch_name]

### Pull Request

7. Open pull request into a **main** branch
   - title: Issue_XX: [description]
   - If pull request have **CONFLICT**
     - git checkout main
     - git pull origin main
     - git checkout [branch_name]
     - git merge main
     - **fix all conflicts in local**
     - git add .
     - git commit -m "[branch_name] fix conflict"
     - git push origin [branch_name]

### Code Review

8. Other devs should review code and leave notes

   - no confusing code
   - check for potential issues
   - any architectual improvements

9. Code owner is responsible for making any necessary fixes any pushing them up
   - Follow same commit process
