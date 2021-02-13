///나중에 토큰으로 id 뽑아낼 때 필요한것
//시간표에서 로그인 
const jwt = requrire('jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;


const get_ID_fromToken = {/// get post 의 콜백 내부에서 사용
    Get_ID_fromToken = async (req)=>{
       var token = req.header.token;

       if(!token){
           console.log("not token");
       }
       const certified = await jwt.verify(token);

       if (certified == TOKEN_EXPIRED){
           console.log("token is expired");
       }
       if (certified == TOKEN_INVALID){
        console.log("token is Invalid");
       }
       if(certified != TOKEN_EXPIRED || certified != TOKEN_INVALID || token ){
           return certified; ///certified 가 id 값이됨(decode) ->jwt 스크립트참조
       }

    }
}
