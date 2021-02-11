"use strict";

// DOM -> Document Object Model

const id = document.querySelector("#id"), // # -> id 가져옴
    pw = document.querySelector("#pw"),
    loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        pw: pw.value,
    }
    // const res = await fetch('http://115.85.183.157/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(req),
    // });
    // alert(res);

    // const commits = await res.json();
    // alert(commits)

    // if(commits.success) {
    //     location.href = '/';
    // } else {
    //     alert(commits.msg);
    // }

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req), // JSON형태로 문자열로 감싸짐 body로 데이터 전달 
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            if (res.success) {
                location.href = "/";
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("로그인 중 에러 발생");
        });
    //then메서드로 다시 응답데이터 가져오기 가능
}

// res.json()의 반환 값은 Promise
// 기본 res의 반환값은 Response 스트림
// .json() 메서드를 통해 Response 스트림을 읽을 수 있다
// Response는 데이터가 모두 받아진 상태가 아님
// .json() 으로 Response 스트림을 가져와 완료될 때 까지 읽는다.
// 다 읽은 body의 텍스트를 Promise 형태로 반환