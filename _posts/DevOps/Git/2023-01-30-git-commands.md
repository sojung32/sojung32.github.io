---
title: '[Git๐๏ธ] Git Commands ์ ๋ฆฌ'
categories: devops git
tags: [ git ]
toc: true
date: 2023-01-30
excerpt: '์์ฃผ์ฐ๋ Git ๋ช๋ น์ด ์ ๋ฆฌ'
---

## ์ค์ 
```
# ์ค์  ์กฐํ
git config --list # ์ ์ฒด ์กฐํ
git config user.name # ํน์  ์ค์  ์กฐํ

# ์ค์  ๋ฑ๋ก/์์ 
git config --global user.name "{USERNAME}"
git config --global user.email "{EMAIL}"

# ์ค์  ์ญ์ 
git config --unset --global user.name
git config --unset --global user.email
```

## ๊ธฐ๋ณธ
```
# ๋์๋ง ๋ณด๊ธฐ
git help {COMMAND}

# ๋ช๋ น์ด ์ต์ ๋ณด๊ธฐ
git {COMMAND} -h

# ์ด๊ธฐํ
git init

# ๋ก๊ทธ ํ์ธ
git log
git log -2 # ์ต๊ทผ 2๊ฐ ์กฐํ
git log -p # ๊ฐ ์ปค๋ฐ์ diff ๊ฒฐ๊ณผ ์กฐํ
```

## ์ ์ฅ์
```
# ์ ์ฅ์ ๋ณต์ 
git clone {GIT_URL}

# ์๊ฒฉ ์ ์ฅ์ ์กฐํ
git remote
git remote -v # URL๋ ์กฐํ
git remote show {REMOTE_NAME} # ์๊ฒฉ ์ ์ฅ์ ์์ธ ์ ๋ณด ์กฐํ

# ์๊ฒฉ ์ ์ฅ์ ์ถ๊ฐ
git remote add {REMOTE_NAME} {URL}

# ์๊ฒฉ ์ ์ฅ์ ์ด๋ฆ ๋ณ๊ฒฝ
git remote rename {REMOTE_NAME_FROM} {REMOTE_NAME_TO}

# ์๊ฒฉ ์ ์ฅ์ ์ญ์ 
git remote remove {REMOTE_NAME}

# ์๊ฒฉ ์ ์ฅ์ ๊ฐ์ ธ์ค๊ธฐ
git fetch {REMOTE_NAME}

# push
git push {REMOTE_NAME} {BRANCH_NAME}
git push --all

# pull
git pull {GIT_URL}
```

## ํ์ผ ๊ด๋ฆฌ (Stage)
```
# ํ์ผ ์ํ ํ์ธ (staged ์ํ ํ์ธ)
git status
git status -s # ํ์ผ ์ํ ๊ฐ๋จํ๊ฒ ํ์

# ํ์ผ ๋น๊ต 
git diff # unstaged ํ์ผ
git diff --staged # staged ํ์ผ

# ํ์ผ ์ถ๊ฐ (staged)
git add {FILENAME}
git add . # ํ์ฌ ๋๋ ํ ๋ฆฌ์ ๋ชจ๋  ํ์ผ ์ถ๊ฐ

# ๋๋๋ฆฌ๊ธฐ (unstaged)
git reset HEAD {FILENAME}

# ํ์ผ ์ญ์ 
git rm {FILENAME}

# ์ปค๋ฐ
git commit -m "{COMMIT_MESSAGE}"
git commit -a # git add ๋ช๋ น์ด ํฌํจ(๋ณ๊ฒฝํ ๋ชจ๋  ํ์ผ commit)
git commit --amend # ์ด์  ์ปค๋ฐ์ add ํ์ผ 

```

## ๋ธ๋์น
```
# ๋ธ๋์น ์กฐํ
git branch
git branch -v # ๋ง์ง๋ง ์ปค๋ฐ ๋ฉ์ธ์ง๋ ํจ๊ป ์กฐํ

# ๋ธ๋์น ์์ฑ
git branch {BRANCH_NAME}
git checkout -b {BRANCH_NAME} # ์์ฑ ํ ๋ธ๋์น checkout

# ๋ธ๋์น ๋ณ๊ฒฝ
git checkout {BRANCH_NAME}

# ๋ธ๋์น ์ญ์ 
git bransh -d {BRANCH_NAME}

# ๋ธ๋์น ๋ณํฉ
git merge {BRANCH_NAME}
```

## ์์์ ์ฅ(Stash)
```
# stash ์กฐํ
git stash list

# stash ์ ์ฅ
git stash
git stash save {STASH_NAME} # stash ์ด๋ฆ ์ค์ 

# stash ๊ฐ์ ธ์ค๊ธฐ
git stash apply # ๊ฐ์ฅ ์ต๊ทผ stash ๊ฐ์ ธ์ค๊ธฐ
git stash apply {STASH} # stash ์กฐํ ์ ๋์ค๋ ๊ฐ ex. stash@{0}

# stash ์ญ์ 
git stash drop # ๊ฐ์ฅ ์ต๊ทผ stash ์ญ์ 
git stash drop {STASH} # stash ์กฐํ ์ ๋์ค๋ ๊ฐ ex. stash@{0}
git stash clear # ๋ชจ๋  stash ์ญ์ 
```

**๊ณ์ํด์ ์ถ๊ฐ ๋ฐ ์ ๋ฆฌ ์์ **

---
<div style="font-size:14px;color:#aaa">
<p>์ฐธ๊ณ </p>
<p><a href="https://git-scm.com/book/ko/v2" target="_blank">git book</a></p>
<div>
