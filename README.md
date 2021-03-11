![스몰아글루](https://user-images.githubusercontent.com/59333136/110794252-e4d9bb80-82b8-11eb-95f1-411799ea5d70.png)


**:bulb: 아주인들을 위한 동아리, 소모임 SNS APP**
> 동아리원끼리는 서로 등록해놓은 시간표를 확인하고 겹치는 공강 시간은 언제인지 계산해주는 기능과  
> 동아리 임원은 동아리에 대한 정보를 기입하고 활동내역들을 올릴 수 있고 이를 바탕으로 외부에서도 공개된 정보를 보고 동아리 홍보 또한 가능한 서비스를 가진 통합적인 플랫폼
## ❄️ Period
2021.01~2021.03
## ❄️ Member
**전소미 팀**
> '전'자공학과+'소'프트웨어학과+'미'디어학과  
> 아주대학교 정보통신대학에 재학 중인 학우분들이 모여 팀 프로젝트를 진행했습니다.
* 김기윤 (팀장, 기획, BACK-END)  
[visit github](https://github.com/ccrakel)
* 김나현 (DATABASE)  
[visit github](https://github.com/6twinsniwt9)
* 류지호 (APP FRONT-END)  
[contact](https://github.com/ryuzho)
* 이상훈 (APP FRONT-END)  
[visit github](https://github.com/FriedEggChicken)

## ❄️ Technology used
  * React-native
  * Node.js + Express.js

        - 로그인, 인증, 동아리, 게시판, 시간표 등의 데이터를 처리해서    front-end로 API를 공급하는 Server   
        (in NAVER CLOUD PLATFORM)
  * MySQL  
  
        - 사용자, 동아리, 시간표, 게시판, 댓글 관련 데이터를 각각의 field에 저장하고 새로운 데이터를 생성한다.
        - 데이터의 무결성을 유지하기에 적합하고 중복된 데이터처리를 최소화할 수 있다.
## ❄️ Directory Description
  * /front-end
  * /back-end

        - NCP 서버에서 데몬 프로세스로 있는 node.js 코드
        - 일부 변수는 dotenv를 통해 환경변수로 등록되있음
  * /database 
        
        -putty로 할당받은 서버에 SSH 접속
        -Mysql 버전: 5.7.33-0ubuntu0.18.04.1
## ❄️ ERD design
-수정 중~
## ❄️ Development result
  * **Sign in & Sign up**  (회원 가입 및 로그인) 
  <img src="https://user-images.githubusercontent.com/77534983/110496386-c482f300-8138-11eb-97a7-48c1c0875698.gif" width="300" height="500" />  
  
  * **Show the latest news, clubs you have joined and information of the club**  (최신 게시물와 가입된 동아리가 나오는 홈화면과 동아리 소개글)
  <img src="https://user-images.githubusercontent.com/77534983/110771603-07121000-829e-11eb-99a6-128c7f0d0034.gif" width="300" height="500" />  
  
  * **Set personal timetable**  (개인 시간표 등록)  
  
  * **Show all sorted clubs in the field of interest**  (분과마다 나누어진 동아리 리스트)
  
  * **Apply for clubs**  (동아리 가입신청)
  
  * **Register new clubs**  (동아리 생성)
  
  * **Show vacant time between chosen members in the club**  (동아리 내에서 선택한 동아리원끼리의 겹치는 공강시간 계산)
  
  * **Add any contents in the notice board only by executives**  (동아리 임원진들만의 공지사항 작성)
  
  * **Add any contents in the boards by club memebers**  (동아리원들의 게시판 작성)
  
  * **sign out** (로그아웃)
    
## ❄️ How to process 
* Running front-end
```bash

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

## ❄️ I felt that...

## 🌈Contact
