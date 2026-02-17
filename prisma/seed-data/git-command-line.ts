export const gitCommandLineCards = [
  // ============================================================
  // SECTION 1: Terminal Navigation (cards 0-4)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What does the `pwd` command do in the terminal?",
    back: "**Print Working Directory** -- `pwd` outputs the full absolute path of your current directory.\n\nExample:\n```\n$ pwd\n/home/user/projects\n```\n\nUseful for confirming where you are in the filesystem before running other commands.",
    position: 0,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the commands to navigate into a folder and list its contents.",
    back: "Use `cd` to change directory and `ls` to list files. Together they are the most fundamental navigation commands.",
    codeSnippet: "$ {{cd}} my-project\n$ {{ls}} -la",
    blankAnswers: ["cd", "ls"],
    position: 1,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between `mkdir` and `mkdir -p`?",
    back: "`mkdir` creates a single directory and fails if the parent doesn't exist.\n\n`mkdir -p` creates the full path of nested directories, creating any missing parents along the way.\n\n```bash\nmkdir -p projects/frontend/src\n```\n\nThis creates `projects/`, `projects/frontend/`, and `projects/frontend/src/` all at once.",
    position: 2,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Fill in the command to remove an empty directory.",
    back: "`rmdir` only removes **empty** directories. Use `rm -r` to remove directories that contain files.",
    codeSnippet: "$ {{rmdir}} empty-folder",
    blankAnswers: ["rmdir"],
    position: 3,
  },
  {
    type: "CODE" as const,
    front: "Write JavaScript that logs the purpose of each navigation command: `cd`, `ls`, `pwd`.",
    back: "These three commands form the core of terminal navigation. You use them constantly when working in any project.",
    codeTemplate: "// Log what each command does\nconsole.log(\"cd: \");\nconsole.log(\"ls: \");\nconsole.log(\"pwd: \");",
    codeLanguage: "javascript" as const,
    expectedOutput: "cd: Change directory - navigate to a different folder\nls: List directory contents - show files and folders\npwd: Print working directory - show current location",
    position: 4,
  },

  // ============================================================
  // SECTION 2: File Operations (cards 5-10)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What does the `touch` command do?",
    back: "`touch` creates a new empty file if it doesn't exist. If the file already exists, it updates the file's last-modified timestamp without changing its contents.\n\n```bash\ntouch index.html\ntouch styles.css app.js\n```\n\nYou can create multiple files in a single command.",
    position: 5,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the commands to copy a file and then move it to another directory.",
    back: "`cp` copies files (original remains). `mv` moves files (original is removed from the source). `mv` is also used to rename files.",
    codeSnippet: "$ {{cp}} original.txt backup.txt\n$ {{mv}} backup.txt ./backups/",
    blankAnswers: ["cp", "mv"],
    position: 6,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between `rm` and `rm -rf`?",
    back: "`rm` deletes files (not directories).\n\n`rm -r` deletes directories **recursively** (all contents).\n\n`rm -rf` deletes recursively and **forces** deletion without prompting for confirmation.\n\n**Warning:** `rm -rf` is dangerous -- there is no undo. Always double-check the path before running it.",
    position: 7,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the command to display the contents of a file in the terminal.",
    back: "`cat` (concatenate) prints the entire contents of a file to the terminal. For large files, consider `less` or `head`/`tail` instead.",
    codeSnippet: "$ {{cat}} README.md",
    blankAnswers: ["cat"],
    position: 8,
  },
  {
    type: "CODE" as const,
    front: "Write JavaScript that logs what `echo` does and shows two common uses.",
    back: "`echo` prints text to the terminal and is often combined with redirection to write text into files.",
    codeTemplate: "// Explain echo and show two uses\nconsole.log(\"echo: \");\nconsole.log(\"Use 1: \");\nconsole.log(\"Use 2: \");",
    codeLanguage: "javascript" as const,
    expectedOutput: "echo: Prints text to the terminal (stdout)\nUse 1: echo Hello World - prints text to screen\nUse 2: echo 'content' > file.txt - writes text into a file",
    position: 9,
  },
  {
    type: "STANDARD" as const,
    front: "How do you rename a file using the command line?",
    back: "Use the `mv` (move) command with the old name and new name in the same directory:\n\n```bash\nmv old-name.txt new-name.txt\n```\n\nThere is no dedicated rename command. `mv` handles both moving and renaming.",
    position: 10,
  },

  // ============================================================
  // SECTION 3: Permissions & Pipes (cards 11-14)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What do the three permission groups in `chmod` represent?",
    back: "The three groups are **Owner**, **Group**, and **Others**.\n\nEach group has three permission bits: **r**ead (4), **w**rite (2), e**x**ecute (1).\n\n```bash\nchmod 755 script.sh\n# Owner: rwx (7) | Group: r-x (5) | Others: r-x (5)\n```\n\nThe numeric values are summed per group.",
    position: 11,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the command to make a script executable by the owner.",
    back: "`chmod +x` adds execute permission. `u+x` specifically targets the **u**ser (owner). Without this, you cannot run a script with `./script.sh`.",
    codeSnippet: "$ {{chmod}} u+x script.sh\n$ ./script.sh",
    blankAnswers: ["chmod"],
    position: 12,
  },
  {
    type: "STANDARD" as const,
    front: "What do the pipe `|` and redirection operators `>` and `>>` do?",
    back: "**Pipe `|`** sends the output of one command as input to the next:\n```bash\ncat log.txt | grep \"error\"\n```\n\n**`>`** redirects output to a file, **overwriting** it:\n```bash\necho \"hello\" > file.txt\n```\n\n**`>>`** redirects output to a file, **appending** to it:\n```bash\necho \"world\" >> file.txt\n```",
    position: 13,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the command to search for the word 'error' in a log file using a pipe.",
    back: "The pipe `|` passes `cat`'s output into `grep`, which filters lines containing the search term. This is a fundamental Unix pattern for chaining commands.",
    codeSnippet: "$ cat server.log {{|}} grep \"error\"",
    blankAnswers: ["|"],
    position: 14,
  },

  // ============================================================
  // SECTION 4: git init & clone (cards 15-17)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is the difference between `git init` and `git clone`?",
    back: "`git init` creates a **new** empty Git repository in the current directory by adding a `.git/` folder.\n\n`git clone <url>` **copies** an existing remote repository to your machine, including all history, branches, and files.\n\n```bash\ngit init              # start fresh\ngit clone <url>       # copy existing repo\n```",
    position: 15,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the command to clone a repository from GitHub.",
    back: "`git clone` downloads the entire repository including all commits, branches, and tags. It also automatically sets the remote `origin` to the source URL.",
    codeSnippet: "$ {{git}} {{clone}} https://github.com/user/repo.git",
    blankAnswers: ["git", "clone"],
    position: 16,
  },
  {
    type: "CODE" as const,
    front: "Write JavaScript that logs the step-by-step process of initializing a new Git repository.",
    back: "Initializing a repository creates the hidden `.git` directory which stores all version control data.",
    codeTemplate: "// Log the steps to create a new repo\nconsole.log(\"Step 1: \");\nconsole.log(\"Step 2: \");\nconsole.log(\"Step 3: \");\nconsole.log(\"Step 4: \");",
    codeLanguage: "javascript" as const,
    expectedOutput: "Step 1: mkdir my-project && cd my-project\nStep 2: git init\nStep 3: touch README.md\nStep 4: git add . && git commit -m \"Initial commit\"",
    position: 17,
  },

  // ============================================================
  // SECTION 5: Staging, Committing (cards 18-22)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is the Git **staging area** (index)?",
    back: "The staging area is an intermediate zone between your working directory and the repository. It lets you **selectively choose** which changes to include in the next commit.\n\n```\nWorking Dir  -->  Staging Area  -->  Repository\n  (edit)        (git add)         (git commit)\n```\n\nThis gives you fine-grained control over your commit history.",
    position: 18,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the commands to stage a specific file and then commit it.",
    back: "`git add` moves changes to the staging area. `git commit -m` creates a snapshot of all staged changes with a descriptive message.",
    codeSnippet: "$ git {{add}} index.html\n$ git {{commit}} -m \"Add homepage\"",
    blankAnswers: ["add", "commit"],
    position: 19,
  },
  {
    type: "STANDARD" as const,
    front: "What does `git add .` do versus `git add -A`?",
    back: "`git add .` stages all new and modified files **in the current directory and subdirectories**.\n\n`git add -A` stages all changes across the **entire repository**, including deletions.\n\nFrom the repo root, they behave the same. The difference matters when you run `git add .` from a subdirectory.",
    position: 20,
  },
  {
    type: "CODE" as const,
    front: "Write JavaScript that logs the three areas of a Git workflow and what moves changes between them.",
    back: "Understanding the three-area architecture is key to mastering Git: Working Directory, Staging Area, and Repository.",
    codeTemplate: "// Log the three Git areas and transitions\nconsole.log(\"Area 1: \");\nconsole.log(\"  --> git add -->\");\nconsole.log(\"Area 2: \");\nconsole.log(\"  --> git commit -->\");\nconsole.log(\"Area 3: \");",
    codeLanguage: "javascript" as const,
    expectedOutput: "Area 1: Working Directory (your edited files)\n  --> git add -->\nArea 2: Staging Area (changes ready to commit)\n  --> git commit -->\nArea 3: Repository (committed snapshots in .git/)",
    position: 21,
  },
  {
    type: "STANDARD" as const,
    front: "How do you amend the most recent commit message?",
    back: "Use `git commit --amend` to modify the last commit:\n\n```bash\ngit commit --amend -m \"Corrected message\"\n```\n\n**Warning:** Only amend commits that have **not** been pushed. Amending rewrites history and can cause issues for collaborators who already have the original commit.",
    position: 22,
  },

  // ============================================================
  // SECTION 6: Status, Log, Diff (cards 23-26)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What information does `git status` show?",
    back: "`git status` shows:\n- Current branch name\n- **Untracked** files (new, never added)\n- **Modified** files (changed but not staged)\n- **Staged** files (ready to commit)\n- Whether your branch is ahead/behind the remote\n\nIt is the most frequently used Git command for understanding your repo's state.",
    position: 23,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the command to see a compact one-line-per-commit log.",
    back: "The `--oneline` flag condenses each commit to its short hash and message. Combine with `--graph` to visualize branch structure.",
    codeSnippet: "$ git {{log}} {{--oneline}}",
    blankAnswers: ["log", "--oneline"],
    position: 24,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between `git diff` and `git diff --staged`?",
    back: "`git diff` shows changes in the **working directory** that are NOT yet staged.\n\n`git diff --staged` (or `--cached`) shows changes that ARE staged and will be included in the next commit.\n\n```bash\ngit diff              # unstaged changes\ngit diff --staged     # staged changes\ngit diff HEAD         # all changes vs last commit\n```",
    position: 25,
  },
  {
    type: "CODE" as const,
    front: "Write JavaScript that logs when to use `git status`, `git log`, and `git diff`.",
    back: "These three inspection commands help you understand what has changed and where those changes are in the Git workflow.",
    codeTemplate: "// Log when to use each inspection command\nconsole.log(\"git status: \");\nconsole.log(\"git log: \");\nconsole.log(\"git diff: \");",
    codeLanguage: "javascript" as const,
    expectedOutput: "git status: Check current state - what's staged, modified, or untracked\ngit log: View commit history - who changed what and when\ngit diff: See exact line-by-line changes in your files",
    position: 26,
  },

  // ============================================================
  // SECTION 7: Push, Pull, Fetch (cards 27-30)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is the difference between `git pull` and `git fetch`?",
    back: "`git fetch` downloads new data from the remote but does **not** modify your working files. It updates your remote-tracking branches.\n\n`git pull` does a `git fetch` **plus** automatically merges the remote changes into your current branch.\n\n```bash\ngit fetch origin       # download only\ngit pull origin main   # download + merge\n```\n\n`fetch` is safer because you can review changes before merging.",
    position: 27,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the command to push your local `main` branch to the remote for the first time.",
    back: "The `-u` (or `--set-upstream`) flag links your local branch to the remote branch. After this, you can simply use `git push` without extra arguments.",
    codeSnippet: "$ git {{push}} {{-u}} origin main",
    blankAnswers: ["push", "-u"],
    position: 28,
  },
  {
    type: "STANDARD" as const,
    front: "What does `git push` do?",
    back: "`git push` uploads your local commits to a remote repository.\n\n```bash\ngit push origin main\n```\n\nIt sends commits from your local `main` to the `main` branch on the `origin` remote. The push will be **rejected** if the remote has commits you don't have locally -- you need to `pull` first.",
    position: 29,
  },
  {
    type: "CODE" as const,
    front: "Write JavaScript that simulates and logs a typical push/pull workflow between local and remote.",
    back: "A typical collaboration cycle involves pulling the latest changes, making your edits, then pushing your commits back to the shared remote.",
    codeTemplate: "// Log a push/pull workflow\nconsole.log(\"1. \");\nconsole.log(\"2. \");\nconsole.log(\"3. \");\nconsole.log(\"4. \");\nconsole.log(\"5. \");",
    codeLanguage: "javascript" as const,
    expectedOutput: "1. git pull origin main - get latest changes from remote\n2. (make your code changes)\n3. git add . - stage your changes\n4. git commit -m \"description\" - commit locally\n5. git push origin main - upload commits to remote",
    position: 30,
  },

  // ============================================================
  // SECTION 8: Branching (cards 31-34)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is a Git branch and why use branches?",
    back: "A branch is a lightweight pointer to a specific commit. Branches let you **work on features in isolation** without affecting the main codebase.\n\n```bash\ngit branch feature-login  # create branch\ngit switch feature-login  # switch to it\n```\n\nBranches enable parallel development, safe experimentation, and clean collaboration via pull requests.",
    position: 31,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the command to create and immediately switch to a new branch.",
    back: "`git switch -c` (or the older `git checkout -b`) creates a new branch and switches to it in one step. The `-c` flag stands for \"create\".",
    codeSnippet: "$ git {{switch}} {{-c}} feature-navbar",
    blankAnswers: ["switch", "-c"],
    position: 32,
  },
  {
    type: "STANDARD" as const,
    front: "What is the difference between `git switch` and `git checkout`?",
    back: "`git checkout` is the older, multi-purpose command (switch branches, restore files, etc.).\n\n`git switch` was introduced in Git 2.23 as a **focused** command only for changing branches.\n\n```bash\ngit checkout main        # older way\ngit switch main          # newer, clearer way\ngit switch -c new-branch # create + switch\n```\n\n`git switch` is recommended for branch operations as it is less error-prone.",
    position: 33,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the commands to list all branches and then delete a merged branch.",
    back: "`git branch` with no flags lists local branches. The `-d` flag safely deletes a branch only if it has been merged. Use `-D` to force-delete an unmerged branch.",
    codeSnippet: "$ git {{branch}}\n$ git branch {{-d}} old-feature",
    blankAnswers: ["branch", "-d"],
    position: 34,
  },

  // ============================================================
  // SECTION 9: Merging (cards 35-37)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "How do you merge a feature branch into `main`?",
    back: "First switch to the target branch, then merge the feature branch into it:\n\n```bash\ngit switch main\ngit merge feature-login\n```\n\nIf there are no conflicts and `main` hasn't diverged, Git performs a **fast-forward** merge. Otherwise it creates a **merge commit**.",
    position: 35,
  },
  {
    type: "CODE" as const,
    front: "Write JavaScript that logs the steps to resolve a merge conflict.",
    back: "Merge conflicts occur when two branches modify the same lines. Git marks the conflicting sections and you must manually choose the correct code.",
    codeTemplate: "// Log the merge conflict resolution steps\nconsole.log(\"Step 1: \");\nconsole.log(\"Step 2: \");\nconsole.log(\"Step 3: \");\nconsole.log(\"Step 4: \");\nconsole.log(\"Step 5: \");",
    codeLanguage: "javascript" as const,
    expectedOutput: "Step 1: Run git merge feature-branch (conflict occurs)\nStep 2: Open the conflicted files in your editor\nStep 3: Look for <<<<<<< ======= >>>>>>> markers\nStep 4: Edit the file to keep the correct code, remove markers\nStep 5: git add . && git commit to complete the merge",
    position: 36,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the commands to merge a feature branch and abort if conflicts arise.",
    back: "`git merge --abort` cancels the merge and returns your branch to the state before the merge started. Useful when you want to rethink your approach to the conflicts.",
    codeSnippet: "$ git switch main\n$ git {{merge}} feature-branch\n# If conflicts are too complex:\n$ git merge {{--abort}}",
    blankAnswers: ["merge", "--abort"],
    position: 37,
  },

  // ============================================================
  // SECTION 10: git stash (cards 38-39)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What does `git stash` do and when would you use it?",
    back: "`git stash` temporarily saves your uncommitted changes and reverts your working directory to a clean state.\n\n```bash\ngit stash           # save changes\ngit stash pop       # restore and remove from stash\ngit stash list      # see all stashes\ngit stash apply     # restore but keep in stash\n```\n\nUse it when you need to **switch branches** but aren't ready to commit your current work.",
    position: 38,
  },
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the commands to stash your work, switch branches, then restore the stash.",
    back: "`git stash` saves work-in-progress. `git stash pop` restores the most recent stash and removes it from the stash list.",
    codeSnippet: "$ git {{stash}}\n$ git switch main\n$ git switch feature-branch\n$ git stash {{pop}}",
    blankAnswers: ["stash", "pop"],
    position: 39,
  },

  // ============================================================
  // SECTION 11: git rebase (cards 40-41)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What does `git rebase` do and how does it differ from `git merge`?",
    back: "`git rebase` moves your branch's commits to start from the tip of another branch, creating a **linear history**.\n\n```bash\ngit switch feature\ngit rebase main\n```\n\n**Merge** preserves the full branching history with a merge commit. **Rebase** rewrites history for a cleaner, linear log.\n\n**Rule:** Never rebase commits that have been pushed and shared with others.",
    position: 40,
  },
  {
    type: "CODE" as const,
    front: "Write JavaScript that logs a comparison of merge vs rebase history.",
    back: "Merge preserves branch topology while rebase creates a linear sequence. Choose based on whether you value history accuracy or readability.",
    codeTemplate: "// Compare merge vs rebase\nconsole.log(\"=== Merge ===\");\nconsole.log(\"History: \");\nconsole.log(\"Safe for: \");\nconsole.log(\"\");\nconsole.log(\"=== Rebase ===\");\nconsole.log(\"History: \");\nconsole.log(\"Safe for: \");",
    codeLanguage: "javascript" as const,
    expectedOutput: "=== Merge ===\nHistory: Non-linear, preserves branch structure with merge commits\nSafe for: Shared branches, public history\n\n=== Rebase ===\nHistory: Linear, replays commits on top of the target branch\nSafe for: Local/private branches before pushing",
    position: 41,
  },

  // ============================================================
  // SECTION 12: .gitignore (card 42)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is `.gitignore` and what patterns does it support?",
    back: "`.gitignore` tells Git which files and directories to **exclude from tracking**.\n\nCommon patterns:\n```\nnode_modules/     # ignore a directory\n*.log             # ignore by extension\n.env              # ignore a specific file\n!important.log    # negate (do track this)\nbuild/            # ignore build output\n```\n\nPlace `.gitignore` in the repo root. Files already tracked must be removed with `git rm --cached`.",
    position: 42,
  },

  // ============================================================
  // SECTION 13: Remote Management (card 43)
  // ============================================================
  {
    type: "FILL_IN_BLANK" as const,
    front: "Complete the command to add a remote named `origin` and verify it was added.",
    back: "`origin` is the conventional name for your primary remote repository. `git remote -v` shows all configured remotes with their fetch and push URLs.",
    codeSnippet: "$ git remote {{add}} {{origin}} https://github.com/user/repo.git\n$ git remote -v",
    blankAnswers: ["add", "origin"],
    position: 43,
  },

  // ============================================================
  // SECTION 14: git reset vs git revert (card 44)
  // ============================================================
  {
    type: "STANDARD" as const,
    front: "What is the difference between `git reset` and `git revert`?",
    back: "`git reset` **moves the branch pointer backward**, erasing commits from history:\n```bash\ngit reset --soft HEAD~1   # undo commit, keep staged\ngit reset --mixed HEAD~1  # undo commit + unstage\ngit reset --hard HEAD~1   # undo everything (dangerous)\n```\n\n`git revert` creates a **new commit** that undoes a previous commit's changes, preserving history:\n```bash\ngit revert abc123\n```\n\n**Rule:** Use `revert` on shared/pushed commits. Use `reset` only on local, unpushed commits.",
    position: 44,
  },
];
