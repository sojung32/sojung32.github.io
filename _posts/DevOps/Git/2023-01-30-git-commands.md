---
title: '[Git🗃️] Git Commands 정리'
categories: devops git
tags: [ git ]
toc: true
date: 2023-01-30
excerpt: '자주쓰는 Git 명령어 정리'
---

## 설정
```
# 설정 조회
git config --list # 전체 조회
git config user.name # 특정 설정 조회

# 설정 등록/수정
git config --global user.name "{USERNAME}"
git config --global user.email "{EMAIL}"

# 설정 삭제
git config --unset --global user.name
git config --unset --global user.email
```

## 기본
```
# 도움말 보기
git help {COMMAND}

# 명령어 옵션 보기
git {COMMAND} -h

# 초기화
git init

# 로그 확인
git log
git log -2 # 최근 2개 조회
git log -p # 각 커밋의 diff 결과 조회
```

## 저장소
```
# 저장소 복제
git clone {GIT_URL}

# 원격 저장소 조회
git remote
git remote -v # URL도 조회
git remote show {REMOTE_NAME} # 원격 저장소 상세 정보 조회

# 원격 저장소 추가
git remote add {REMOTE_NAME} {URL}

# 원격 저장소 이름 변경
git remote rename {REMOTE_NAME_FROM} {REMOTE_NAME_TO}

# 원격 저장소 삭제
git remote remove {REMOTE_NAME}

# 원격 저장소 가져오기
git fetch {REMOTE_NAME}

# push
git push {REMOTE_NAME} {BRANCH_NAME}
git push --all

# pull
git pull {GIT_URL}
```

## 파일 관리 (Stage)
```
# 파일 상태 확인 (staged 상태 확인)
git status
git status -s # 파일 상태 간단하게 표시

# 파일 비교 
git diff # unstaged 파일
git diff --staged # staged 파일

# 파일 추가 (staged)
git add {FILENAME}
git add . # 현재 디렉토리의 모든 파일 추가

# 되돌리기 (unstaged)
git reset HEAD {FILENAME}

# 파일 삭제
git rm {FILENAME}

# 커밋
git commit -m "{COMMIT_MESSAGE}"
git commit -a # git add 명령어 포함(변경한 모든 파일 commit)
git commit --amend # 이전 커밋에 add 파일 

```

## 브랜치
```
# 브랜치 조회
git branch
git branch -v # 마지막 커밋 메세지도 함께 조회

# 브랜치 생성
git branch {BRANCH_NAME}
git checkout -b {BRANCH_NAME} # 생성 후 브랜치 checkout

# 브랜치 변경
git checkout {BRANCH_NAME}

# 브랜치 삭제
git bransh -d {BRANCH_NAME}

# 브랜치 병합
git merge {BRANCH_NAME}
```

## 임시저장(Stash)
```
# stash 조회
git stash list

# stash 저장
git stash
git stash save {STASH_NAME} # stash 이름 설정

# stash 가져오기
git stash apply # 가장 최근 stash 가져오기
git stash apply {STASH} # stash 조회 시 나오는 값 ex. stash@{0}

# stash 삭제
git stash drop # 가장 최근 stash 삭제
git stash drop {STASH} # stash 조회 시 나오는 값 ex. stash@{0}
git stash clear # 모든 stash 삭제
```

**계속해서 추가 및 정리 예정**

---
<div style="font-size:14px;color:#aaa">
<p>참고</p>
<p><a href="https://git-scm.com/book/ko/v2" target="_blank">git book</a></p>
<div>
