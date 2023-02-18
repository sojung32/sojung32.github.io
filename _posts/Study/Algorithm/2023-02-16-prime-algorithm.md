---
title: '소수 구하는 알고리즘 2가지(Java)'
categories: study algorithm
tags: [ algorithm, java ]
toc: true
date: 2023-02-16
---

# 소수 알고리즘
> **소수**는 1보다 큰 자연수 중 1과 자기 자신만을 약수로 가지는 수이다. 


## 1. 2부터 √N까지의 수 중 N의 약수가 있는지 확인하기
N까지 확인하는게 아닌 √N까지 확인하는 이유는 간단하다.  
어떤 두 수의 곱으로 N을 만든다고 했을때 두 수의 차이가 가장 적은 경우는 `√N X √N`이기 때문이다.


### 1-1. 소수 판별
√N번의 연산이 수행되므로 시간복잡도는 O(√N)이다.  
```java
int N; // N의 값이 주어졌다고 가정
boolean prime = true; // 소수 여부

for(int i=2;i<=Math.sqrt(N);i++){
    if(N % i == 0){
        prime = false;
        break;
    }
}

if(prime){
    System.out.println("소수");
} else {
    System.out.println("합성수")
}
```

### 1-2. 소수 구하기
√N번의 연산을 N번 수행하므로 시간복잡도는 O(√N)이다.
```java
int N; // N의 값이 주어졌다고 가정 (N > 1)
boolean prime; // 소수 여부
List<Integer> primeList = new ArrayList<>();

for(int i=2;i<=N;i++){
    prime = true;
    for(int j=2;j<=Math.sqrt(N);j++){
        if(i % j == 0){
            prime = false;
            break;
        }
    }
    if(prime){
        primeList.add(i);
    }
}
```

## 2. 에라토스테네스의 체
> 2부터 소수를 구하고자 하는 구간의 모든 수를 나열한 후 2부터 시작하여 **n이 소수일 때 n의 배수를 모두 지우는 과정을 반복**하면 남는 수가 모두 소수가 된다.  
N의 소수를 구하는 경우 2부터 √N까지의 수 중 소수인 수를 n으로 하여 n의 배수를 지우면 남는 수가 모두 소수이다.  
![219283193-26dc4a84-35aa-455f-a137-427d4f48c7db](https://user-images.githubusercontent.com/56745491/219848580-7918dc22-e014-4b14-9b79-8aa809ff7576.gif)


에라토스테네스의 체 시간복잡도는 O(Nlog(logN))이다.
```java
int N; // N의 값이 주어졌다고 가정 (N > 1)
boolean[] composite = new boolean[N+1]; // 합성수 여부
List<Integer> primeList = new ArrayList<>();

composite[0] = composite[1] = true;

for(int i=2;i<=Math.sqrt(N);i++){
    if(!composite[i]){
        for(int j=i*i;j<=N;j+=i){
            composite[j] = true;
        }
    }
}

for(int i=2;i<=N;i++){
    if(!composite){
        primeList.add(i);
    }
}
```
# 시간복잡도 비교
위에서 언급한 시간복잡도를 비교해봤을 때 √N까지 연산을 하여 소수 판별을 하는 경우는 O(√N), 소수를 구하는 경우는 O(N√N), 에라토스테네스의 체를 이용하는 경우는 O(Nlog(logN))의 시간복잡도를 갖는다.

시간복잡도를 그래프로 나타내어 비교하면 다음과 같다.  
![219282090-eb5a023a-c87d-42e6-a99c-17cbb83dd396](https://user-images.githubusercontent.com/56745491/219848571-79431ab9-fc29-4fa2-a1c2-d194170e536b.jpg)


그래프로 미루어 보았을 때 소수를 구해야하는 경우 √N까지의 연산을 하는 것보다 에라토스테네스의 체를 이용하는 경우가 월등히 빠르다고 할 수 있다.  
하지만 소수의 여부만 판별하는 경우 숫자가 클수록 에라토스테네스의 체를 이용하는 것보다 √N까지 연산을 하는 것이 빠르다고 할 수 있다.  
또한 에라토스테네스의 체를 사용하는 경우 N의 크기를 갖는 배열이 필요하므로 숫자가 클수록 사용하는 메모리 역시 증가하게 된다.  

그러므로 어떤 알고리즘을 사용하여 문제를 해결할 지는 잘 판단해야 한다.


---
<div style="font-size:14px;color:#aaa">
<p>참고</p>
<p><a href="https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4" target="_blank">https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4</a></p>
<div>
