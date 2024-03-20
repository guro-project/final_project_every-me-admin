import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const result = useSelector(state => state.userReducer);
    // const loginStatus = !!localStorage.getItem("isLogin");
    const [userId,setUserId] = useState('');
    const [userPass,setUserPass] = useState('');
    
    // const [loginInfo,setLoginInfo] = useState({
    //     userId: "",
    //     userPass: ""
    // });

    const onChangeIdHandler = (event) => {
        setUserId(event.target.value);
    }
    const onChangePassHandler = (event) => {
        setUserPass(event.target.value);
    }

    const onLoginHandler = async () => {
        if (!userId || !userPass) {
            alert('아이디와 비밀번호를 입력해주세요')
            return;
        }
    
        let loginData = {
            'id': userId,
            'pass': userPass
        };
        console.log(loginData)

        const json = JSON.stringify(loginData);
    
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://192.168.0.64:8080/login',
                data: json,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
    
            try {
                localStorage.setItem('userToken', response.data.userToken);
                console.log(response.data.message)
                if(response.data.message==="로그인 성공!"){
                    navigate("/admin/main");
                }else{
                    alert("권한이 없습니다.")
                    navigate("/")
                    
                }
                
            } catch (error) {
                console.log('localStorage 저장 오류:', error);
            }

            // onLoginHandler();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div>
                <label>id : </label>
                <input type="text" name="userId" onChange={onChangeIdHandler} />
                <br />
                <label>password : </label>
                <input type="password" name="userPass" onChange={onChangePassHandler} />
                <button onClick={onLoginHandler}>로그인</button>
            </div>
        </>
    )
}


export default Login;
