# Database

## MySQL 선택한 이유  
* MySQL은 오랫동안 전세계적으로 가장 널리 사용되고 있는 오픈 소스 데이터베이스이다. 무료로 사용가능하면서도 처리되는 속도 또한 상당히 빠르고 용이하며, 대용량의 데이터를 처리할 수 있는 장점과 보안에도 뛰어난 특성을 지닌다.  
 
* 표준 데이터베이스 언어 SQL(Structured Query Language)을 사용해 유연하며 사용하기 쉬운 특징이 있다. 다중 사용자, 다중 thread를 지원하며C,C++,JAVA,PHP,Python 스크립트 등을 위한 인터페이스(API)를 제공한다. 유닉스니 리눅스, Windows 운영체제 등에서 사용가능하다. 다양한 용도로 사용(범용성)이 가능하며 데이터의 일관성을 보장한다.
  
## MySQL의 특징  
* 데이터 간의 관계성을 기반으로 어떤 데이터가 테이블에 들어가고 어떤 데이터가 들어가지 않을지 정의해주는 필드가 필요하다. 각 데이터는 필드에 맞춰 테이블의 레코드로 저장된다.  
  데이터들을 여러 개의 테이블에 나누어서, 데이터들의 중복을 피할 수 있다. 이러한 특징 덕분에 하나의 테이블에서 하나의 데이터를 관리하게 되고 다른 테이블에서 부정확한 데이터를 다룰 위험이 없어진다.
  
* ***수직적 확장 (단순히 데이터베이스 서버의 성능 향상) vs 수평적 확장 (더 많은 서버가 추가되고 데이터베이스가 전체적으로 분산, 하나의 데이터베이스에 여러 호스트에서 작동)***  
  데이터가 저장되는 방식 때문에 SQL데이터 베이스는 일반적으로 수직적 확장만을 지원한다. 수평적 확장은 NoSQL 데이터베이스에서만 가능하다.
  
## 프로젝트를 하면서 느낀 RDBMS와 DBMS의 차이점
* mongoDB는 mysql처럼 자동으로 데이터 번호를 순서대로 달아주는 기능(auto_increment)이 없다. 따라서 글번호와 같이 데이터를 특정할 수 있는 지표가 필요하다면 다른 DB에 저장을하거나 새로운 collection을 만들어야 한다.  
  
* NoSQL DB의 가장 큰 특징은 MySQL과는 다르게 배열을 저장할 수 있다는 점이다. SQL DB라면 게시글과 댓글은 테이블을 따로 빼서 만드는 수 밖에 없지만, NoSQL DB는 댓글을 그냥 게시글 데이터에 넣어버릴 수 있다. 물론 상황에 따라 collection을 따로 만들어도 되긴 하다.  
[참고](http://blog.naver.com/PostView.nhn?blogId=azure0777&logNo=220764784580&categoryNo=18&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView)

## ER diagram
 ![image](https://user-images.githubusercontent.com/77525358/111061122-11721b00-84e5-11eb-9159-a2d3dfe75cc8.png)
* **마름모**: 관계 타입
* **동그라미(실선)**: 애트리뷰트 (엔티티를 기술하는 속성)  
           복합 애트리뷰트는 더 작은 구성요소로 나눌 수 있고 독립적인 의미를 가지는 애트리뷰트이고,  
           단순 애트리뷰트는 더 이상 나눌 수 없는 애트리뷰트  
* **동그라미(점선)**: 유도된 애트리뷰트
* **직사각형**: 엔티티 타입 (실세계에서 독립적으로 존재하는 실체)  
           엔티티 타입에 속하는 엔티티들에 대한 중요한 제약 조건은 애트리뷰트들에 대한 키(Key) 또는 유일함의 제약 조건이다. 키 제약 조건은 두 개 이상의 엔티티가 동시에 키 애트리뷰트에 대해 동일한            값을 가질 수 없도록 해주는 역할을 한다.
           
          - 일반적으로 데이터베이스의 요구사항들을 명시한 기술문에서 명사는 엔티티 타입 이름으로, 동사는 관계 타입 이름으로 되는 경향이 있다.
          - 애트리뷰트 이름은 엔티티 타입에 대응하는 명사를 설명하는 부가적인 명사들로부터 얻어진다.
           
 * **단일선과 이중선**: 참여 제약 조건  
                  이중선은 전체 참여(또는 존재 종속성)인 경우 엔터티 타입에 사용되고  
                  단일선은 부분 참여인 경우에 사용된다.  
 * **1,N,M**: 관계차수 1:1, 1:N, N:M (카디날리티)  
               예시)  
               **1:1 관계 타입**은 두 개의 엔티티는 서로 최대한 한 개의 관계 인스턴트에만 참여할 수 있는 관계이다. (한 사원(엔티티)이 한 부서(엔티티)만 관리할 수 있는 경우)  
               **1:N 관계 타입**은 두 개의 엔티티 중 하나의 엔티티만이 여러 개의 관계 인스턴트에 참여할 수 있는 관계이다. (한 사원만이 여러개의 프로젝트를 참여할 수 있는 경우)  
               **M:N 관계 타입**은 두 개의 엔티티 중 모두 여러 개의 관계 인스턴트에 참여할 수 있는 관계이다. (여러 명의 사원들이 여러 개의 프로젝트에 참여할 수 있는 경우)  
         
 * 참고문헌
 -[Designing an ER Diagram](https://www.youtube.com/watch?v=8JFaaD1vzSY&t=376s)
## Schema
* schema
  ![image](https://user-images.githubusercontent.com/77525358/111060522-d5d55200-84e0-11eb-99bc-eacee3e06e32.png)
   **:heavy_check_mark: schema에서 카디날리티가 가장 핵심!!!:heavy_check_mark:**  
   1:1 혹은 1:N 관계 타입은 참여하고 있는 엔티티 타입들 중의 하나로 통합될 수 있다. 다만 1:N 관계 타입에서는 관계 애트리뷰트가 관계의 N측 엔티티 타입으로만 이동할 수 있다는 점을  
    꼭 유의해야 한다. 
    위와 반대로 M:N 관계 타입에서는 관계 인스턴스에 참여하는 엔티티들의 조합에 의해서 결정되는 일부 애트리뷰들이 있어 반드시 관계 애트리뷰트로 명시되어야 한다.  
      
     
 * 참고문헌
      -[How to convert an ER diagram to the Relational Data Model](https://www.youtube.com/watch?v=CZTkgMoqVss)
      
* Schema diagram (spread sheet 사용)
  ![image](https://user-images.githubusercontent.com/77525358/111061852-b04c4680-84e8-11eb-88d8-e8821ae209c0.png)
  ![image](https://user-images.githubusercontent.com/77525358/111061827-8b57d380-84e8-11eb-85b0-2bbcccd45f4b.png)
  ![image](https://user-images.githubusercontent.com/77525358/111061875-d245c900-84e8-11eb-9b9e-be9472ac3c5a.png)
  **:heavy_check_mark: FOREIGN KEY!!!(데이터 무결성 보장) :heavy_check_mark:**  
  외래키가 되기 위해서는 두 릴레이션 스키마 R1과 R2 사이의 참조 무결성 제약 조건이 만족되어야 한다. 릴레이션 스키마 R1   의 어떤 애트리뷰트들의 집합 FK가 다음의 규칙을 만족하면 FK는 릴레이션 R2를 참조하는 R1의 외래키이다.
  1. FK의 애트리뷰트는 R2의 기본키 PK의 애트리뷰트와 동일한 도메인을 가진다.
  2. 현재 상태 r1(R1)의 한 투플 t1 내의 FK값은 현재 상태 r2 (R2)의 어떤 투플 t2 내의 PK값과 일치하거나 널 값을 가져야 한다.  
    
    
  * 참고문헌
 -[Converting ER Diagrams to Schemas](https://www.youtube.com/watch?v=xQRRf5fOAt8&t=557s)
## 유용하다고 생각한 SQL문
* ROWNUM  
```SQL
select @rownum:=@rownum+1 as no,테이블명.컬럼명,테이블명.컬럼명,...,테이블명.컬럼명 from 테이블명 where 테이블명.컬럼명=1;
```
select문을 실행할 때마다 rownum을 0으로 초기화하고 싶다면 where절에 '(@rownum:=0)=0 and'를 추가해주면 된다. [참고](https://needjarvis.tistory.com/259)  
![image](https://user-images.githubusercontent.com/77525358/110389589-1596d680-80a8-11eb-9761-2d14afe33457.png)

* TRIGGER  
```SQL
CREATE TRIGGER [트리거이름] [BEFORE|AFTER] [INSERT|UPDATE|DELETE] ON [테이블이름] FOR EACH ROW [실행문]

```
트리거란 특정 DB 테이블을 감시하고 있다가 변화가 감지되면 별도로 정해놓은 프로그램을 실행 시키는 기술이다.
[참고](https://blog.work6.kr/154)

* IF/ ELSEIF/ ELSE ... END IF  
```SQL
IF [expression] THEN
   [statements];
ELSEIF [elseif-expression] THEN
   [elseif-statements];
...
ELSE
   [else-statements];
END IF;
```
END ELSEIF 나 END ELSE 문을 쓰지 않아도 된다. END문은 END IF로 한 번만 써주면 된다.
[참고](https://blog.duveen.me/16)

* delimiter
```SQL
delimiter //
delimiter ;
```
쿼리문을 실행시키는 ;(세미콜론)을 delimiter 선언 후 문자(ex. //)로 바꿔 procedure를 수행한다. procedure에서 ;(세미콜론)은 문장 종결 여부 정도의 역할만 수행하고 //는 위 쿼리문을 문장 단위로 분석해 실행시키는 역할을 수행한다.  
다시 ;(세미콜론)으로 바꿔줄려면 delimiter ;문을 이용하면 된다. 뛰어쓰기를 꼭 주의하도록 하자.

:pushpin: **특정 컬럼만 수정되었을 때 특정 컬럼 변경(TRIGGER+IF문)**  
ex) title 이나 content 컬럼 수정 시에만 updated 컬럼을 현재 시간으로 수정해주는 SQL 문  
```SQL
delimiter //
create trigger_upd_free_board before update on free_board
for each row
begin
   if !(NEW.content<=>OLD.content) then
      set NEW.updated=current_timestamp;
   elseif !(NEW.title<=>OLD.title) then
      set NEW.updated=current_timestamp;
   end if;
end //
delimiter ;
```
-before update 대신 after update 를 썼더니 오류가 발생했다.  
-if문 안에 OR 연산자를 사용해 ELSEIF문을 IF문 안에서 구현할려고 했는데 오류가 발생했다.  

  * 참고문헌-
[Fire a trigger after the update of specific columns in MySQL](https://stackoverflow.com/questions/19152974/fire-a-trigger-after-the-update-of-specific-columns-in-mysql)  
-[on update CURRENT_TIMESTAMP” for only one column in mysql](https://stackoverflow.com/questions/37856582/on-update-current-timestamp-for-only-one-column-in-mysql)
( 링크는 이전 버전이라 그런지 틀린 문법이긴 하지만 방향성을 잡을 수 있었다.)

* LIMIT  
```SQL
limit 10,10
```
limit을 값을 하나만 넣으면 출력할 개수가 지정되고 값을 2개 넣으면 첫번째 값은 offset, 두번째 값은 출력할 개수가 지정이 된다.  
위의 예시는 11번부터 20번까지의 id값을 갖는 데이터를 페이징 처리해준다.


* CHARSET 변경 (latin->utf8: 한글 쓰기 위함)
```SQL
alter table 테이블명 convert to character set utf8;
```

* 이벤트 스케쥴러
```SQL
CREATE EVENT IF NOT EXISTS [이벤트 이름]
    ON SCHEDULE
        [수행, 반복 할 시간]
    ON COMPLETION NOT PRESERVE
    ENABLE
    COMMENT [코멘트]
    DO 
    [수행할 명령]
END
```
특정 이벤트를 자동으로 정기적으로 수행시켜준다.  
😰STARTS CURRENT_TIMESTAMP로 지정해주면 STARTS 시점에 [수행할 명령]이 바로 실행된다...자칫하다가 데이터를 다 날려버릴 수 있다. 주의하자!  
~> AT CURRENT_TIMESTAMP+INTERVAL 5 YEARS로 하면 위 문제점을 방지할 수 있을 것이다.
[참고](https://soccerda.tistory.com/101)

* ☑️ 데이터베이스 백업 및 복사
  * 데이베이스 백업
  ```
  mysqldump -u[user] -p[pass] [복사 DBname] > [결과 DBname].sql
  ```
  * 데이터베이스 복사
  ```
  mysql -u[user] -p[pass] [DBname] < [DBname].sql
  ```

* Foreign Key 제약조건
```SQL
ALTER TABLE 테이블이름

ADD [CONSTRAINT 제약조건이름]

FOREIGN KEY (필드이름)

REFERENCES 테이블이름 (필드이름) ON UPDATE CASCADE ON DELETE CASCADE
```
-**ON UPDATE CASCADE**: 부모테이블에서 PRIMARY 값이 수정될 경우 옵션 CASCADE로 정의되면 하위테이블의 REFERENCE 값은 변경된 상위테이블의 수정된 값을 가지면서 참조 무결성을 유지한다.  
-**ON DELETE CASCADE**: 부모테이블에서 PRIMARY 값이 삭제될 경우 옵션 CASCADE로 정의되면 하위테이블의 REFERENCE 값은 삭제되면서 참조 무결성을 유지한다.
[참고](https://wrkbr.tistory.com/691)

* INNER JOIN vs OUTER JOIN(대표: LEFT JOIN)  
  
*-INNER JOIN* : Table A와 Table B의 교집합을 조회  
*-OUTER JOIN* : Table A와 Table B의 합집합을 조회  

    -경우에 따라 다르겠지만 LEFT JOIN보다 INNER JOIN을 사용할 경우 추가적으로 JOIN 또는 연산해야 하는 target data 수가 확연히 줄기 
    때문에 습관적으로 LEFT JOIN보다는 query의 성능을 위해서 INNER JOIN을 사용하는 것이 좋다. 
 [참고](https://jaenjoy.tistory.com/7)
         
 * 서브 쿼리 vs JOIN  
   
 -MySQL 5.5까지는 서브쿼리 최적화가 대부분이 되어있지 않으므로 웬만하면 Join으로 전환하도록 하자. (메인테이블의 row수 만큼 서브 쿼리를 수행한다.)  
 MySQL 5.6에서 서브 쿼리가 대폭 최적화 되긴 했다. (하지만 최적화가 적용 안되는 조건들이 다수 존재한다.)  
 따라서 버전과 조건에 관계 없이 좋은 성능을 내려면 최대한 JOIN을 사용하도록 한다. [참고](https://jojoldu.tistory.com/520)  
 
## 자주 쓰이는 SQL문 정리
* 컬럼 관련
  * 컬럼명 바꾸기
  ```SQL
  ALTER TABLE [테이블병] CHANGE [기존컬럼명] [변경할 컬럼명] [컬럼타입];
  ```
  * 컬럼 순서 바꾸기
  ```SQL
  ALTER TABLE [테이블명] MODIFY [순서변경할컬럼명] [컬럼타입] AFTER [앞에오는컬럼명];
  ```
  * 컬럼 디폴트값 바꾸기
  ```SQL
  ALTER TABLE [테이블명] ALTER COLUMN [변경할컬럼명] SET DEFAULT [디폴트값];
  ```
  * 컬럼 타입 바꾸기
  ```SQL
  ALTER TABLE [테이블명] MODIFY [컬럼명] [변경할컬럼타입];
  ```
  * 컬럼 추가하기
  ```SQL
  ALTER TABLE [테이블명] ADD [추가할컬럼명] [컬럼타입] DEFAULT [디폴트값];
  ALTER TABLE [테이블명] ADD COLUMN [추가할컬럼명] [컬럼타입] DEFAULT [디폴트값] [컬럼명;
  ```
  -두번째 SQL문으로 컬럼 추가 뿐만이 아니라 컬럼의 위치도 동시에 변경해 줄 수 있다.  
  (맨 위로 컬럼을 옮기고 싶다면 FIRST를 넣어주면 된다.)  
  * 컬럼 삭제하기
  ```SQL
  ALTER TABLE [테이블명] DROP COLUMN [컬럼명];
  ```
* 데이터 관련
  * 데이터 추가하기
  ```SQL
  INSERT INTO [테이블명] [컬럼1, 컬럼2,...] VALUES (값1, 값2,...);
  ```
  * 데이터 수정하기
  ```SQL
  UPDATE [테이블명] SET [컬럼1]=[수정값1], [컬럼2]=[수정값2],... WHERE [조건];
  ```
  * 데이터 삭제하기
  ```SQL
  DELETE FROM [테이블명] WHERE [조건];
  ```
* 기타
  * 테이블 구조 복사하기
  ```SQL
  CREATE TABLE IF NOT EXISTS [복사할 테이블명] LIKE [원본테이블명];
  ```
  -주의해야 할 점은 기본키(Primary Key)와 인덱스(Index), Auto Increment는 제외하고 복사한다!  
  (말 그대로 테이블의 구조 정도만 복사한다.)  
  * 테이블 데이터 복사하기
  ```SQL
  INSERT INTO [복사할 테이블명] SELECT * FROM [원본테이블명];
  ```
  * 테이블 데이터 부분 복사
  ```SQL
  INSERT INTO [복사할 테이블명] ([컬럼 1], [컬럼 2],...) SELECT [컬럼 1], [컬럼 2],... FROM [원본 테이블명];
  ```
  * 테이블 생성 쿼리 가져오기
  ```SQL
  SHOW CREATE TABLE [테이블명];
  ```
  * 특정 컬럼을 NOT NULL로 바꾸기
  ```SQL
  ALTER TABLE [테이블명] MODIFY [컬럼명] [컬럼타입] NOT NULL;
  ```
  * AUTO_INCREMENT 값 초기화하기
  ```SQL
  ALTER TABLE [테이블명] AUTO_INCREMENT=[시작할려는 순서-1];
  
  ```
  * AUTO_INCREMENT가 적용된 컬럼값 재정렬하기
  ```SQL
  SET @COUNT=0;
  UPDATE [테이블명] SET [컬럼명]=@COUNT:=@COUNT+1;
  ```
  * 변경 사항 취소하기 (트랜젝션으로 인한 하나의 묶음 처리가 시작되기 이전의 상태로 되돌린다.:COMMIT)
  ```SQL
  ROLLBACK;
  ```

