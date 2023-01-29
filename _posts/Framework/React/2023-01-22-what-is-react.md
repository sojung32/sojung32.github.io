---
title: '[React📒] React 알아보기 (Feat. Angular, Vue.js와의 차이점)'
categories: framework react
tags: [ react ]
toc: true
date: 2023-01-22
excerpt: 'React란? 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리. 그렇다면 Angular, Vue.js와의 차이점은 무엇일까'
---

# React?
리액트 홈페이지를 접속하거나 구글에 **리액트**를 검색하면 **사용자 인터페이스를 만들기 위한 JavaScript 라이브러리**라는 설명이 나온다.  

해당 설명을 이해하기 쉽게 풀어보자.

비교적 화면 전환이 빠르고 쉽게 일어나는 모바일 앱과 달리 기존 웹사이트들은 사용자가 어떠한 동작을 취했을 때 그 요청을 서버에 전송하고 새로운 html 페이지를 받아서 화면에 보여주기 때문에 무겁고 화면에 완전히 뜰 때까지 시간이 꽤 걸린다.

**사용자의 요청에 빠르게 응답하기 위해서는?**

브라우저에서 어떤 요청을 서버에 보낼 때마다 html을 다시 호출하지 않고 요청에 해당하는 요소들만 변경을 해주면 로딩 시간을 줄일 수 있다.  
이를 위해 사용하는 것이 바로 자바스크립트이다.

# "JavsScript 라이브러리" React의 장점
* 선언형 컴포넌트 중심의 방식으로 코드를 작성하기 때문에 간단한 설계로 효율적인 렌더링이 가능하다.
* React는 이름답게 Reactive한 UI, 다시말해 반응형 사용자 인터페이스 구축하는 것에 도움을 준다.

# React, Angular 그리고 Vue.js
[자바스크립트 현황 2022](https://2022.stateofjs.com/ko-KR/libraries/front-end-frameworks/)의 프론트엔드 프레임워크 부문에 따르면 최근 Solid, Svelte, Qwik의 만족도와 관심도가 리액트를 앞질렀으나 사용량과 인지도면에서는 리액트가 여전히 상위권을 지키고 있으며 앵귤러와 뷰가 그 뒤를 따르고 있다.

현재 사용량 측면에서 꾸준히 상위권을 나란히 달리고 있는 세 프레임워크를 비교해보자.

## React
* 리액트는 앞서 말했듯이 가장 많이 사용하고 널리 알려져 있는 프론트엔드 프레임워크이다.
* 리액트는 컴포넌트에 초점을 맞춘 UI 프레임워크로 내장된 기능은 많지 않다.
* 리액트로 다양한 기능을 개발하기 위해서는 리액트가 아닌 서드 파티 라이브러리가 필요하다.

## Angular
* 리액트에 이어 두번째로 가장 많이 사용하는 프론트엔드 프레임워크로는 앵귤러가 있다.
* 앵귤러 역시 완전한 컴포넌트 기반의 UI 프레임워크이며 리액트와는 다르게 다양한 기능을 내장하고 있다.
* 많은 기능을 내장하고 있기 때문에 작은 프로젝트에서 사용하기에는 적합하지 않을 수 있다.

## Vue.js
* 리액트와 앵귤러의 뒤를 있는 뷰는 두 프레임워크의 중간이라고 볼 수 있다.
* 뷰 또한 완전한 컴포넌트 기반의 UI 프레임워크로 라우터 등의 핵심 주요 기능을 내장하고 있다.
* 내장된 기능은 앵귤러보다는 적지만 리액트보다는 많다.
<br/>
<br/>
<br/>

---  

<p style="font-size:12px;color:#777;">
본 내용은 Udemy의 "React 완벽 가이드 with Redux, Next.js, TypeScript" 강의를 들으며 공부한 내용을 바탕으로 작성하였습니다.
</p>
<br/>
<div style="font-size:14px;color:#aaa">
<p>참고</p>
<p><a href="https://ko.reactjs.org/" target="_blank">https://ko.reactjs.org/</a></p>
<p><a href="https://2022.stateofjs.com/" target="_blank">https://2022.stateofjs.com/</a></p>
<p><a href="https://www.udemy.com/course/best-react/" target="_blank">https://www.udemy.com/course/best-react/</a></p>
</div>
