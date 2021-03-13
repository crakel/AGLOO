![스몰아글루](https://user-images.githubusercontent.com/59333136/110794252-e4d9bb80-82b8-11eb-95f1-411799ea5d70.png)


**:bulb: 아주인들을 위한 동아리, 소모임 SNS APP**
> 동아리원끼리는 서로 등록해놓은 시간표를 확인하고 겹치는 공강 시간은 언제인지 계산해주는 기능과  
> 동아리 임원은 동아리에 대한 정보를 기입하고 활동내역들을 올릴 수 있고 이를 바탕으로 외부에서도 공개된 정보를 보고 동아리 홍보 또한 가능한 서비스를 가진 통합적인 플랫폼
## ❄️ Period
2021.01 ~ 2021.03
## ❄️ Members
**전소미 팀**
> '전'자공학과+'소'프트웨어학과+'미'디어학과  
> -아주대학교 정보통신대학에 재학 중인 학우분들과  다양한 아이디어를 공유하며 팀 프로젝트를 진행했습니다.
* 김기윤 (팀장, 기획, BACK-END)  
[visit github](https://github.com/ccrakel)
* 김나현 (DATABASE)  
[visit github](https://github.com/6twinsniwt9)
* 류지호 (APP FRONT-END)  
[visit github](https://github.com/ryuzho)
* 이상훈 (APP FRONT-END)  
[visit github](https://github.com/FriedEggChicken)

## ❄️ Technology used
  * React-native

        - ios, 안드로이드에서 동시개발 가능한 javascript 기반 모바일 애플리케이션 프레임워크
  * Android Studio

        - Android Virtual Device(AVD)를 통해 android 기기 테스트
  * Expo

        - Expo 어플을 통해 react-native로 구현한 app을 내 기기에서 직접 실행 가능
  * Javascript
  * Node.js + Express.js

        - 로그인, 인증, 동아리, 게시판, 시간표 등의 데이터를 처리해서 front-end로 API를 공급하는 Server   
        (in NAVER CLOUD PLATFORM)
  * MySQL  
  
        - 사용자, 동아리, 시간표, 게시판, 댓글 관련 데이터를 각각의 field에 알맞게 저장하고 새로운 데이터를 생성한다.
        - 데이터의 무결성을 유지하기에 적합하고 중복된 데이터처리를 최소화할 수 있다.
## ❄️ Directory Description
  * /app-front

         - 각 Screen 별 react-native 코드
         - react-navigation v5의 tab-navigator 와 stack-navigator을 사용해 screen 사이의 관계 설정
         
  * /back-end

        - NCP 서버에서 데몬 프로세스로 있는 node.js 코드
        - 일부 변수는 dotenv를 통해 환경변수로 등록되있음

  * /database 
  
        - putty로 할당받은 서버에 SSH 접속
        - Mysql 버전: 5.7.33-0ubuntu0.18.04.1
## ❄️ ERD design
-수정 중~
## ❄️ Development result
### [Access]
  * **Sign in & Sign up**  
  (회원 가입 및 로그인)  
  
  ------
### [Home]
  * **Home screen that shows the latest news and the clubs you've joined and upload information of the clubs when you select the club icon**  
  (가입한 동아리와 최신 게시물이 나오는 홈화면 및 동아리 선택시 소개글 업로드)  
  
   * **:zap::zap:Show vacant time between chosen members in the club:zap::zap:**  
  ***(동아리 내에서 선택한 동아리원끼리의 겹치는 공강 시간 계산)***  
  
  * **Use notice board only by executives**  
  (동아리 임원진들만의 공지사항 게시판 작성 권한)  
  
  
  * **Add any contents and comments in the boards by club memebers**  
  (동아리원들의 게시판 및 댓글 작성)  
  
  
  * **Provide a differentiated access to club memebers and non-club members for board**  
  (비동아리 회원의 한정적인 접근 권한 범위: 활동 게시판 )  
  
  * **Add image at boards**  
  (게시판에 이미지 첨부 가능)  
  
  * **All contents and comments of boards can be controlled by executives**  
  (임원진은 모든 게시판과 댓글 수정 및 삭제 가능)  
  
  
  ------
  ### [Search]
  * **Show all sorted clubs in the field and search the specific club**  
  (분과별 동아리 리스트와 동아리 찾기)  
  
   * **Create new clubs**  
  (동아리 생성)  
  
  * **Apply for the club and quit it**  
  (동아리 가입 및 탈퇴)  
  
 ------ 
 ### [Timetable]
  * **Set personal timetable and modify it**  
  (개인 시간표 등록 및 수정)  
  
  ------
  ### [Settings]
  * **sign out**  
  (로그아웃)
    
## ❄️ How to process 
* Running front-end
```bash
# intall
$ npm install -g react-native-cli
# make my project
$ react=native init myProject
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
