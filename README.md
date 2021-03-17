![스몰아글루](https://user-images.githubusercontent.com/59333136/110794252-e4d9bb80-82b8-11eb-95f1-411799ea5d70.png)


**:bulb: 아주인들을 위한 동아리, 소모임 SNS APP**
> 동아리원끼리는 서로 등록해놓은 시간표를 통해 겹치는 공강 시간은 언제인지 계산해주는 기능과  
> 동아리 임원은 동아리에 대한 정보를 기입하고 활동내역들을 올릴 수 있고 이를 바탕으로 외부에서도 공개된 정보를 보고 동아리 홍보 또한 가능한 서비스를 가진 통합적인 플랫폼
## ❄️ Period
2021.01 ~ 2021.03
## ❄️ Members
**전소미 팀**
> '전'자공학과+'소'프트웨어학과+'미'디어학과  
> -아주대학교 정보통신대학에 재학 중인 학우분들과  다양한 아이디어를 공유하며 팀 프로젝트를 진행했습니다.
* 김기윤 (팀장, 기획, BACK-END)  
[visit github](https://github.com/crakel)
* 김나현 (DATABASE)  
[visit github](https://github.com/6twinsniwt9)
* 류지호 (APP FRONT-END)  
[visit github](https://github.com/ryuzho)
* 이상훈 (APP FRONT-END)  
[visit github](https://github.com/FriedEggChicken)

## ❄️ Technology used
  * React-native

        - ios, 안드로이드에서 동시개발 가능한 javascript 기반 모바일 애플리케이션 프레임워크
  * Node.js + Express.js

        - 로그인, 인증, 동아리, 게시판, 시간표 등의 데이터를 처리해서 front-end로 API를 공급하는 Server   
        (in NAVER CLOUD PLATFORM)
  * MySQL  
  
        - 사용자, 동아리, 시간표, 게시판, 댓글 관련 데이터를 각각의 field에 알맞게 저장하고 새로운 데이터를 생성한다.
        - 데이터의 무결성을 유지하기에 적합하고 중복된 데이터를 최소화되게 처리할 수 있다.
## ❄️ Directory Description
  * /app-front

         - 각 Screen 별 react-native 코드
         - react-navigation v5의 tab-navigator 와 stack-navigator을 사용해 screen 사이의 관계 설정
         
  * /back-end

        - NCP 서버에서 데몬 프로세스로 있는 node.js 코드
        - 일부 변수는 dotenv를 통해 환경변수로 등록되있음

  * /database 
  
        - 규정한 테이블과 테이블 간의 연관관계(외래키)를 이용해 필요한 정보를 구하는 방식인 RDBMS 사용
        - MySQL 이벤트 스케쥴러를 이용해 5년에 한 번 테이블(게시판, 댓글) 자동 데이터 삭제
## ❄️ ERD design
![image](https://user-images.githubusercontent.com/77525358/111033115-f6ef6180-8452-11eb-89f1-1c1a8bc3adbb.png)  

## ❄️ Development result
### [Access]
  * **Sign in & Sign up**  
  (회원 가입 및 로그인)  
   <img src="https://user-images.githubusercontent.com/77534983/111030419-7fff9c00-8445-11eb-874a-1d5c061cc792.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111030425-868e1380-8445-11eb-965a-e674671e1fc9.PNG" width="250" height="500" />
  

  
  ------
### [Home]
  * **Home screen that shows the latest news and the clubs you've joined and upload information of the clubs when you select the club icon**  
  (가입한 동아리와 최신 게시물이 나오는 홈화면 및 동아리 선택시 소개글 업로드)  
  <img src="https://user-images.githubusercontent.com/77534983/111030704-16808d00-8447-11eb-9cb9-95a867a3d47f.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111030726-3617b580-8447-11eb-8d68-4bd0872a2926.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111030745-492a8580-8447-11eb-805f-ae98023d4f62.PNG" width="250" height="500" />



  
   * **:zap::zap:Show vacant time between chosen members in the club:zap::zap:**  
  ***(동아리 내에서 선택한 동아리원끼리의 겹치는 공강 시간 계산)***  
  <img src="https://user-images.githubusercontent.com/77534983/111030947-6744b580-8448-11eb-8589-f4bbf8a74c33.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111030952-775c9500-8448-11eb-98e7-d1f4f4d13676.PNG" width="250" height="500" />


  
  * **Use notice board only by executives**  
  (동아리 임원진들만의 공지사항 게시판 작성 권한)  
  <img src="https://user-images.githubusercontent.com/77534983/111031676-1040df80-844c-11eb-8809-02622a4e0763.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111031689-1fc02880-844c-11eb-8069-5dc9ab054015.PNG" width="250" height="500" />


  
  
  * **Add any contents,comments and pictures in the boards by club members**  
  (자유게시판 및 사진첨부가 가능한 활동게시판)   
  <img src="https://user-images.githubusercontent.com/77534983/111031779-880f0a00-844c-11eb-9f5f-dd7b927e54ff.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111031794-9f4df780-844c-11eb-9f01-0677317d493c.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111031805-ad9c1380-844c-11eb-867a-0a272afcb5ab.PNG" width="250" height="500" />



  
  ------
  ### [Search]
  * **Show all sorted clubs in the field & Apply for the club!**   
  (분과별 동아리 리스트와 동아리 가입)  
  <img src="https://user-images.githubusercontent.com/77534983/111032151-31a2cb00-844e-11eb-825f-179801f66271.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111032223-821a2880-844e-11eb-8179-2cf50b4b2ea5.PNG" width="250" height="500" />


  
   * **Create new clubs**  
  (동아리 생성)  
  <img src="https://user-images.githubusercontent.com/77534983/111032080-fbfde200-844d-11eb-941d-682b828085fc.PNG" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77534983/111032117-16d05680-844e-11eb-8565-da66c34c6d3b.PNG" width="250" height="500" />
  
 ------ 
 ### [Timetable]
  * **Set personal timetable and modify it**  
  (개인 시간표 설정 및 수정)  
  <img src="https://user-images.githubusercontent.com/77534983/111032292-cf969580-844e-11eb-9495-8d92121a357f.PNG" width="250" height="500" />

  
  ------
  ### [Settings]
  * **sign out**  
  (로그아웃)

<img src="https://user-images.githubusercontent.com/77597604/111058511-69ebed00-84d2-11eb-8a56-ff5816c7dec1.png" width="250" height="500" /> <img src="https://user-images.githubusercontent.com/77597604/111058482-3b6e1200-84d2-11eb-899e-34edd371e174.png" width="250" height="500" />
    
## ❄️ How to process 
* Running front-end
```bash
# intall
$ npm install -g react-native-cli
# make my project
$ react-native init myProject
# start project
$ npm start

```
* Running back-end
``` bash
# go to directory
$ cd /back-end/app

# install node and npm (in ubuntu)
$ sudo apt-get update 
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ npm init
$ npm install express mysql

# start node server with auto_modifying state (nodemon)
$ npm start 
$ exit

# start node server with Daemon process (pm2)
$ pm2 start ./bin/www.js
$ exit
```

## 🌈Contact
-김기윤: crakeldev@gmail.com   
-김나현: glowring1@gmail.com  
-류지호: fbwlgh07@gmail.com  
-이상훈: sonheungminson@gmail.com
