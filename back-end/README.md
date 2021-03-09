# AGLOO / Back-End

## 개발 및 공부 과정

Node.js 기반 API Server    
DB : MySQL

초기 개발 단계에서 테스트용으로 웹 views 연동   
-> 현재 React Native 사용한 app-front에서 테스트

사용한 모듈
  - express.js     
  - nodemon
  - pm2
  - dotenv
  - bcrypt
  - jwt
  - multer

<br>

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