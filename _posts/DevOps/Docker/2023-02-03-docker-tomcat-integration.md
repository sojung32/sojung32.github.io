---
title: '[Docker๐ป] Jenkins์์ Docker๋ก ๋์ด Tomcat ์ฐ๋ํ๊ธฐ'
categories: devops docker
tags: [ Docker, Jenkins, Tomcat ]
toc: true
date: 2023-02-03
excerpt: 'GitLab์ ์ฌ๋ผ๊ฐ Maven Project๋ฅผ Jenkins๋ก ์ฐ๋ํด์ Docker ์๋ฒ์ Tomcat์ผ๋ก ๋ฐฐํฌํ๊ธฐ'
---
# GitLab์ ์ฌ๋ผ๊ฐ Maven Project๋ฅผ Jenkins๋ก ์ฐ๋ํด์ Docker ์๋ฒ์ Tomcat์ผ๋ก ๋ฐฐํฌํ๊ธฐ
์๋ฒ์ Docker ์ค์น ํ Docker ์์์ Tomcat์ ์ฌ์ฉํ์ฌ Project๋ฅผ ๋ฐฐํฌํ  ์ ์๋๋ก ๊ตฌ์ฑ ์ค์ ์๋ค.  
ํ๋ก์ ํธ๋ Maven Project์ด๊ณ , ์์ค๊ด๋ฆฌ๋ GitLab์ผ๋ก, ๋ฐฐํฌ ์ฐ๋์ Jenkins๋ก ํ๊ณ  ์๋๋ฐ ์๋ก ๊ตฌ์ฑ ์ค์ธ Docker์ ์๋ ๋ฐฐํฌ ๊ฐ๋ฅํ ํ๊ฒฝ์ ๊ตฌ์ฑํด๋ณด๋ ค๊ณ  ํ๋ค.  
Docker์ ํ๋ก์ ํธ๊ฐ ์ด๋ฏธ ๋ฐฐํฌ๋๊ณ  ์๋ค๋ ๊ฐ์ ํ์ Jenkins ์ฐ๋์ ํ๋ ๋ฐฉ๋ฒ์ ์ ๋ฆฌํ์๋ค.

## 0. ์ฌ์  ์ค์ 
### 0-1. Git Credential ์์ฑ
> **Jenkins๊ด๋ฆฌ > Manage Credentials**

![image](https://user-images.githubusercontent.com/56745491/216494799-f328c97e-8186-41a1-abe3-63797d967c24.png)  
Manage Credentials ๋ฉ๋ด์์ 'Stores scoped to Jenkins'์ '(global)'์ ํด๋ฆญํ๋ค.  

![image](https://user-images.githubusercontent.com/56745491/216495053-ec974595-e046-4604-8fb4-96e965880050.png)  
'Add Credentials' ํด๋ฆญ ํ ์ํ๋ ๊ณ์  ์์ฑ ๋ฐฉ๋ฒ์ ์ ํํ์ฌ ์ฐ๋ํ๋ ค๋ Git์ ์ ๊ทผ ๊ฐ๋ฅํ ๊ณ์ ์ ๋ง๋ ๋ค.
(ํธํ๊ฒ 'Username with password'๋ก ์์ฑํด๋ ๋๊ณ  API๋ secret key๋ฅผ ์ด์ฉํ ๋ฐฉ๋ฒ์ ์ฌ์ฉํด๋ ๋๋ค.)  


### 0-2. Maven ๋ฒ์  ์ถ๊ฐ
> **Jenkins๊ด๋ฆฌ > Global Tool Configuration > Maven**

![image](https://user-images.githubusercontent.com/56745491/216510556-0ecb7631-c174-45c0-aa7f-a7886dd02999.png)  
ํ๋ก์ ํธ์ Maven์ ๋ง๊ฒ ๋ด์ฉ์ ์๋ ฅํ๋ค.
* Name : ์ค์ ํ๊ณ  ์ถ์ ์ด๋ฆ ์๋ ฅ
* Version : ํ๋ก์ ํธ์ Maven Version ์ ํ


### 0-3. SSH Server ์ถ๊ฐ
> **Jenkins๊ด๋ฆฌ > ์์คํ ์ค์  > Publish over SSH**

![image](https://user-images.githubusercontent.com/56745491/216495962-bb9c8246-d2df-49ff-921a-2867c2bbea91.png)  
์ถ๊ฐ๋ฅผ ๋๋ฌ SSH Server๋ฅผ ํ๋ ์์ฑํ๊ณ  ๋ด์ฉ์ ์๋ ฅํ๋ค.  
๋ด์ฉ ์์ฑ ํ 'Test Configuration'์ ๋๋ฌ ์ ์ ํ์คํธ๋ฅผ ํ์ ๋ 'Success'๊ฐ ๋จ๋ฉด ์ฑ๊ณต์ด๋ค.
* Name : ์ค์ ํ๊ณ  ์ถ์ ์ด๋ฆ ์๋ ฅ
* Hostname : ์๋ฒ IP (ex. `127.0.0.1`)
* Username : ์๋ฒ ์ ์ ์ ์ฌ์ฉํ  username (ex. `root`)
* Remote Directory : ๊ธฐ๋ณธ ๋๋ ํ ๋ฆฌ ๊ฒฝ๋ก (์์ฑ์ํ  ๊ฒฝ์ฐ `/root`)
* ๊ณ ๊ธ
  *  'Use password authentication, or use a different key' ์ฒดํฌ
  *  Passphrase / Password : ์๋ฒ ์ ์ ์ ์ฌ์ฉํ  ๋น๋ฐ๋ฒํธ
  *  Port : ์๋ฒ ์ ์ ํฌํธ

## 1. Item ์์ฑ
> **New Item**

![image](https://user-images.githubusercontent.com/56745491/216490209-e36a848d-eb7c-47b0-90b2-bf9e5882abe4.png)  
๋ฉ์ธ ํ๋ฉด์ด๋ Item์ ๋ง๋ค๊ณ  ์ถ์ ํด๋์์ 'New Item' ํน์ '์๋ก์ด Item'์ ํด๋ฆญํ๋ค.  
์ํ๋ ์ด๋ฆ์ ์์ฑํ๊ณ  'Freestyle project'๋ฅผ ํด๋ฆญ ํ 'OK'๋ฅผ ๋๋ฌ ์ ํ๋ก์ ํธ๋ฅผ ์์ฑํ๋ค.


## 2. GitLab ์ฐ๋
> **Item > ๊ตฌ์ฑ > ์์ค ์ฝ๋ ๊ด๋ฆฌ**

![image](https://user-images.githubusercontent.com/56745491/216491506-a40fc4a5-ba1a-4ce8-a001-731d5df40525.png)  
์์ค ์ฝ๋ ๊ด๋ฆฌ๋ฅผ 'Git'์ผ๋ก ์ ํ ํ ๋ด์ฉ์ ์๋ ฅํ๋ค.  
(GitLab์ผ๋ก ์ฐ๋์ ํ์ผ๋ GitHub๋ ๋์ผํ๋ค.)
* Repository URL : Git ๋ ํ์งํ ๋ฆฌ URL
* Credentials : ์ฌ์ ์ ์์ฑํ Git Credential
* Branch Speficier : ๋ฐฐํฌ ์์ ์ฐ๋ํ๊ณ  ์ถ์ ๋ธ๋์น๊ฐ ์๋ค๋ฉด ๋ธ๋์น๋ช ์์ฑ

## 3. Maven Build
> **Item > ๊ตฌ์ฑ > Build Steps**

![image](https://user-images.githubusercontent.com/56745491/216492788-370acda1-c986-4ada-b03a-5878d9997ff7.png)  
'Add build step'์ ๋๋ฌ 'Invoke top-level Maven targets'์ ์ถ๊ฐํ๋ค.  

![image](https://user-images.githubusercontent.com/56745491/216493613-ca3da9bc-bff3-4b44-9fd2-8efe76b49f54.png)  
๋ด์ฉ์ ์๋ ฅํ๋ค.
* Maven Version : ํ๋ก์ ํธ์ ํ๊ฒฝ์ ๋ง๋ ๋ฉ์ด๋ธ ๋ฒ์  ์ ํ
* Goals : ๋ฉ์ด๋ธ ๋ช๋ น์ด ์์ฑ

## 4. Docker Server์ ๋น๋
> **Item > ๊ตฌ์ฑ > ๋น๋ ํ ์กฐ์น**

![image](https://user-images.githubusercontent.com/56745491/216494499-7d6255ef-3cff-4d0e-bc4e-0eddd61fc6a3.png)  
'Send build artifacts over SSH'๋ฅผ ์ ํํ๊ณ  ๋ด์ฉ์ ์๋ ฅํ๋ค.  

![image](https://user-images.githubusercontent.com/56745491/216513004-fde0bb99-e207-40b7-b9ec-5a71641b1f35.png)  
* SSH Server > Name : ๋ฐฐํฌํ๋ ค๋ ์๋ฒ ์ ํ
* Transfers
  * Source files : ๋ฐฐํฌํ๋ ค๋ war ์ด๋ฆ
  * Remove prefix : ์ ๊ฑฐํ  ๊ฒฝ๋ก (ex.`target/`)
  * Remote directory : ๋ฐฐํฌํ๋ ค๋ war๊ฐ ์ด๋ํ  ๋๋ ํฐ๋ฆฌ
  * Exec command : ์คํ์ํฌ ๋ช๋ น์ด (ex. `docker restart ์ปจํ์ด๋_์ด๋ฆ`)

## Build ํ๊ธฐ
> **Item > ์ง๊ธ ๋น๋**

![image](https://user-images.githubusercontent.com/56745491/216515179-5ba25ca9-ddd7-49a8-bcd7-23d70799cb12.png)  
'์ง๊ธ ๋น๋'๋ฅผ ํด๋ฆญํ๋ฉด ํ๋จ์ ๋น๋๊ฐ ๋๋ ๊ฒ์ ๋ณผ ์ ์๋ค.  
์คํ ์ค์ธ ๋น๋๋ฅผ ํด๋ฆญํ๊ณ  'Console Output' ๋ฉ๋ด๋ฅผ ๋ค์ด๊ฐ๋ฉด ์คํ ์ค์ธ ๋ด์ฉ์ ํ์ธํ  ์ ์๋ค.  
![image](https://user-images.githubusercontent.com/56745491/216515470-016a1945-2f00-448c-9ff0-e0ff58c572ee.png)  
war ํ์ผ ์์ฑ ํ SSH ์๋ฒ๋ก ๋ฐฐํฌ๊ฐ ์ฑ๊ณต์ ์ผ๋ก ์๋ฃ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.
