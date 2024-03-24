import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPass, setUserPass] = useState('');

    const onChangeIdHandler = (event) => {
        setUserId(event.target.value);
    }
    const onChangePassHandler = (event) => {
        setUserPass(event.target.value);
    }

    let loginCounter = 0;

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
                url: 'http://172.30.1.79:8080/login',
                data: json,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            loginCounter++;

            console.log(response.data.userInfo.userToken);

            try {
                localStorage.setItem('userToken', response.data.userInfo.userToken);
            } catch (error) {
                console.log('AsyncStorage 저장 오류:', error);
            }

            if (loginCounter === 2) {
                if (response.data.message === "로그인 성공!") {
                    navigate('/admin/main');
                } else {
                    navigate('/');
                }
                return; // 함수 종료
            }


            onLoginHandler();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <h1>EveryMe</h1>
            <input type="text" name="userId" placeholder="id" onChange={onChangeIdHandler} />
            <br />
            <input type="password" name="userPass" placeholder="password" onChange={onChangePassHandler} />
            <button onClick={onLoginHandler}>로그인</button>
        </div>
    )
}


export default Login;
