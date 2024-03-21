import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserManage.css"
import UpdateUser from "./UpdateUser";

const UserManage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [userState, setUserState] = useState('');
    const [role,setRole] = useState('');
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userToken = localStorage.getItem('userToken');
        axios({
            method: 'GET',
            url: `http://192.168.0.64:8080/viewusers`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('조회 에러 : ' + error);
            });
    }

    const renderData = () => {
        if (!data) return null;
        console.log(data)

        return (
            <ul>
                {data.map(item => (
                    <li key={item.userNo}>
                        <label>{item.userNo} {item.userId} 상태 : {item.userState} 권한 : {item.role}  </label>
                        <UpdateUser userNo={item.userNo}/>
                    </li>
                ))}
            </ul>
        );
    }




    return (
        <>
            <div>
                <h1>유저관리 메인페이지</h1>
                {renderData()}
            </div>
            
        </>
    );
};

export default UserManage;
