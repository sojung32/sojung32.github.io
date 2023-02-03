---
title: '[Docker💻] Jenkins에서 Docker로 띄운 Tomcat 연동하기'
categories: devops docker
tags: [ Docker, Jenkins, Tomcat ]
toc: true
date: 2023-02-03
excerpt: 'GitLab에 올라간 Maven Project를 Jenkins로 연동해서 Docker 서버의 Tomcat으로 배포하기'
---
# GitLab에 올라간 Maven Project를 Jenkins로 연동해서 Docker 서버의 Tomcat으로 배포하기
서버에 Docker 설치 후 Docker 위에서 Tomcat을 사용하여 Project를 배포할 수 있도록 구성 중에 있다.  
프로젝트는 Maven Project이고, 소스관리는 GitLab으로, 배포 연동은 Jenkins로 하고 있는데 새로 구성 중인 Docker에 자동 배포 가능한 환경을 구성해보려고 한다.  
Docker에 프로젝트가 이미 배포되고 있다는 가정하에 Jenkins 연동을 하는 방법을 정리하였다.

## 0. 사전 설정
### 0-1. Git Credential 생성
> **Jenkins관리 > Manage Credentials**

![image](https://user-images.githubusercontent.com/56745491/216494799-f328c97e-8186-41a1-abe3-63797d967c24.png)  
Manage Credentials 메뉴에서 'Stores scoped to Jenkins'의 '(global)'을 클릭한다.  

![image](https://user-images.githubusercontent.com/56745491/216495053-ec974595-e046-4604-8fb4-96e965880050.png)  
'Add Credentials' 클릭 후 원하는 계정 생성 방법을 선택하여 연동하려는 Git에 접근 가능한 계정을 만든다.
(편하게 'Username with password'로 생성해도 되고 API나 secret key를 이용한 방법을 사용해도 된다.)  


### 0-2. Maven 버전 추가
> **Jenkins관리 > Global Tool Configuration > Maven**

![image](https://user-images.githubusercontent.com/56745491/216510556-0ecb7631-c174-45c0-aa7f-a7886dd02999.png)  
프로젝트의 Maven에 맞게 내용을 입력한다.
* Name : 설정하고 싶은 이름 입력
* Version : 프로젝트의 Maven Version 선택


### 0-3. SSH Server 추가
> **Jenkins관리 > 시스템 설정 > Publish over SSH**

![image](https://user-images.githubusercontent.com/56745491/216495962-bb9c8246-d2df-49ff-921a-2867c2bbea91.png)  
추가를 눌러 SSH Server를 하나 생성하고 내용을 입력한다.  
내용 작성 후 'Test Configuration'을 눌러 접속 테스트를 했을 때 'Success'가 뜨면 성공이다.
* Name : 설정하고 싶은 이름 입력
* Hostname : 서버 IP (ex. `127.0.0.1`)
* Username : 서버 접속 시 사용할 username (ex. `root`)
* Remote Directory : 기본 디렉토리 경로 (작성안할 경우 `/root`)
* 고급
  *  'Use password authentication, or use a different key' 체크
  *  Passphrase / Password : 서버 접속 시 사용할 비밀번호
  *  Port : 서버 접속 포트

## 1. Item 생성
> **New Item**

![image](https://user-images.githubusercontent.com/56745491/216490209-e36a848d-eb7c-47b0-90b2-bf9e5882abe4.png)  
메인 화면이나 Item을 만들고 싶은 폴더에서 'New Item' 혹은 '새로운 Item'을 클릭한다.  
원하는 이름을 작성하고 'Freestyle project'를 클릭 후 'OK'를 눌러 새 프로젝트를 생성한다.


## 2. GitLab 연동
> **Item > 구성 > 소스 코드 관리**

![image](https://user-images.githubusercontent.com/56745491/216491506-a40fc4a5-ba1a-4ce8-a001-731d5df40525.png)  
소스 코드 관리를 'Git'으로 선택 후 내용을 입력한다.  
(GitLab으로 연동을 했으나 GitHub도 동일하다.)
* Repository URL : Git 레파지토리 URL
* Credentials : 사전에 생성한 Git Credential
* Branch Speficier : 배포 시에 연동하고 싶은 브랜치가 있다면 브랜치명 작성

## 3. Maven Build
> **Item > 구성 > Build Steps**

![image](https://user-images.githubusercontent.com/56745491/216492788-370acda1-c986-4ada-b03a-5878d9997ff7.png)  
'Add build step'을 눌러 'Invoke top-level Maven targets'을 추가한다.  

![image](https://user-images.githubusercontent.com/56745491/216493613-ca3da9bc-bff3-4b44-9fd2-8efe76b49f54.png)  
내용을 입력한다.
* Maven Version : 프로젝트의 환경에 맞는 메이븐 버전 선택
* Goals : 메이븐 명령어 작성

## 4. Docker Server에 빌드
> **Item > 구성 > 빌드 후 조치**

![image](https://user-images.githubusercontent.com/56745491/216494499-7d6255ef-3cff-4d0e-bc4e-0eddd61fc6a3.png)  
'Send build artifacts over SSH'를 선택하고 내용을 입력한다.  

![image](https://user-images.githubusercontent.com/56745491/216513004-fde0bb99-e207-40b7-b9ec-5a71641b1f35.png)  
* SSH Server > Name : 배포하려는 서버 선택
* Transfers
  * Source files : 배포하려는 war 이름
  * Remove prefix : 제거할 경로 (ex.`target/`)
  * Remote directory : 배포하려는 war가 이동할 디렉터리
  * Exec command : 실행시킬 명령어 (ex. `docker restart 컨테이너_이름`)

## Build 하기
> **Item > 지금 빌드**

![image](https://user-images.githubusercontent.com/56745491/216515179-5ba25ca9-ddd7-49a8-bcd7-23d70799cb12.png)  
'지금 빌드'를 클릭하면 하단에 빌드가 되는 것을 볼 수 있다.  
실행 중인 빌드를 클릭하고 'Console Output' 메뉴를 들어가면 실행 중인 내용을 확인할 수 있다.  
![image](https://user-images.githubusercontent.com/56745491/216515470-016a1945-2f00-448c-9ff0-e0ff58c572ee.png)  
war 파일 생성 후 SSH 서버로 배포가 성공적으로 완료된 것을 확인할 수 있다.
