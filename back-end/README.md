# back-end
개발 및 공부 과정

Node.js 기반 API Server 

초기 개발 단계에서 테스트용으로 웹 views 연동
-> 현재 React Native 사용한 app-front에서 테스트

사용한 모듈
express.js
nodemon
pm2

## MySQL 쿼리 변수담기
```javascript
var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ['users', 'id', userId];
sql = mysql.format(sql, inserts);
```
?? 로 테이블, ?로 필드를 변수 매핑할 수 있다.