# 숨하 (Soomha) - Frontend
## 📃 포로젝트 개요
이 프로젝트는 __예측 모델__ 을 개발, 활용하여 __미세먼지 관련 사이트__ 를 개발하는 프로젝트입니다.<br>
미세먼지 취약계층인 어린이와 그의 학부모, 보육시설 종사자들을 타겟으로 미세먼지에 관한 정보들과 미세먼지에 따른 놀이시설 정보를 제공합니다.<br>
해당 프로젝트는 __React__ 와 __Flask__ 를 사용하여 프론트엔드와 백엔드를 구현합니다.<br>
__백엔드 레포지토리__ : https://github.com/haaayeong/soomha-backend

## ⏳ 작업 기간 및 내용
- __작업 기간__ : 3주
- __내용__ :
  - 전국에 있는 다양한 놀이시설 정보 제공
  - 미세먼지 농도를 예측해 다음주에 갈만 한 놀이시설 추천(미구현)
  - 사용자 위치의 미세먼지 농도를 기반으로 예측되는 건강에 대한 정보 제공
  - 지역별 미세먼지 현황 제공
  - 어린이들을 위한 미세먼지 퀴즈
  - 미세먼지와 관련된 행동요령 정보 제공

## 💡 기능 소개
- __놀이시설 정보 제공__ : 해당 놀이시설의 위치, 그 위치의 날씨와 미세먼지 정보 제공, 미세먼지 농도가 좋음인 놀이시설 추천 등 다양한 정보들을 확인할 수 있습니다.
- __건강 예측__ : 미세먼지와 밀접한 병의 과거 환자 수 데이터, 미세먼지 관련 데이터들을 바탕으로 해당 병들에 대한 오늘의 예측 환자 수, 성별 / 나이별 예측 환자 수 정보 등을 확인할 수 있습니다.
- __퀴즈__ : 어린이를 대상으로 미세먼지 퀴즈를 제공합니다. 문제의 난이도는 레벨에 따라 달라질 수 있도록 구현하였습니다.

## 🛠 기술 스택
- __프론트엔드__ : __React__, Axios, React Router Dom, React Query, React Leaflet, React Infinite Scroll Component, Font Awsome
  - __API__ : kakao API, 단기예보조회 API, 놀이시설 API<br>

- __백엔드__ : __Flask__, Flask JWT extended, Flask WTF, WTForms, Werkzeug, SMTPlib, Email, dotenv, os, Flask cors, Flask migrate, Flask sqlalchemy, Flask session, Flask mail, Mysql connector python
  - __API__ : naver image API<br>

- __데이터베이스__ : MySQL

## 👩‍💻 팀구성
이 프로젝트는 총 3명이 참여한 팀 프로젝트입니다.
- __최하영__
- __이영찬__
- __권민수__

## 💻 설치 및 실행 방법
### 1. 프로젝트 클론
먼저, GitHub에서 프론트엔드 프로젝트를 클론합니다.
```
git clone https://github.com/haaayeong/soomha-frontend.git
```
### 2. 필수 패키지 설치
```
npm install
```
### 3. 환경 변수 설정(.env.local)
```
VITE_SERVER_URL=http://localhost:5000
```
### 4. 애플리케이션 실행
```
npm run dev
```