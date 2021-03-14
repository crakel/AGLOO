![스몰아글루](https://user-images.githubusercontent.com/59333136/110794252-e4d9bb80-82b8-11eb-95f1-411799ea5d70.png)
# AGLOO / Back-End (2021.01 ~ 2021.03)

## ❄️ Node.js API Server

초기 개발 단계에서 테스트용으로 웹 views 연동   

-> 현재 React Native app-front에서 구동

## ❄️ Used Modules
  * Express.js
  
        - Node.js의 핵심 모듈인 http와 Connect 컴포넌트를 기반으로 쉽게 서버를 구성할 수 있게 만든 가장 큰 웹 프레임워크.
  * nodemon

        - 개발 중 코드 수정사항이 발생할 때 자동으로 서버를 재시작 시켜주는 모듈로 개발과정에서 사용.
  * pm2

        - 실제 서버를 구동할 때 Background에서 Demon process로 서버를 두기 위하여 사용.
  * dotenv

        - 서버, DB ID, PW 연동정보와 JWT Secret Key와 같은 보안에 중요한 정보등을 직접적으로 보여주지 않을 수 있다.
  * bcrypt
  
        - 유저의 비밀번호를 저장할 때 사용하여 해쉬 암호화 된 상태로 DB에 저장되고, 로그인 시 compare 하여 비밀번호를 검증한다. (단방향 암호화)
  * jwt
  
        - 로그인시 사용자의 id값이 담긴 token 발급하고 프론트는 이를 저장하여 현재 로그인한 사용자가 누구인지 authentication하는 과정을 구현하는 데에 사용.
  * multer
        
        - 프론트로부터 이미지 파일과 정보들을 formData형태로 받고 이를 서버에서 업로드 처리해주기 위하여 사용.

<br>

## ❄️ API Documentation

![agloo api](https://user-images.githubusercontent.com/59333136/111058391-bbe04300-84d1-11eb-9475-93e8fadde5a2.png)

### [More in Postman](https://documenter.getpostman.com/view/14449875/Tz5qaHTg)

<br>
<br>

# 개발 및 공부 과정 메모

## MySQL 쿼리 변수담기
```javascript
var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ['users', 'id', userId];
sql = mysql.format(sql, inserts);
```
?? 로 테이블, ?로 필드를 변수 매핑할 수 있다.   
참고 : <https://github.com/mysqljs/mysql>

<br>

## SQL 결과 값 RowDataPacket을 변환하는 방법들
```javascript
JSON.stringify() // JSON 객체를 String 객체로 변환
JSON.parse() // String 객체를 JSON 객체로 변환
```
참고 : <https://stackoverflow.com/questions/31221980/how-to-access-a-rowdatapacket-object>

<br>

## Multer 저장경로, 파일명 설정
multer 모듈을 통해서 post로 전송된 파일의 저장경로와 파일명 등을 처리하기 위해서는 DiskStorage 엔진이 필요하다.   
참고 : <https://github.com/expressjs/multer#storage>
```javascript
var multer = require('multer'); // multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  }
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({ storage: storage })
```
이후 미들웨어로
```javascript
upload.single("img")
```
 혹은 여러개 일 경우
 ```javascript
upload.array("img', 3)
``` 
와 같은 식으로 적용해준다.
