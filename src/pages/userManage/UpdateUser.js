import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUser = ({ userNo }) => {
    const navigate = useNavigate();
    const [userState, setUserState] = useState('');
    const [role, setRole] = useState('');

    const handleStatusChange = async () => {
        const userToken = localStorage.getItem('userToken');
        console.log(userNo);
        console.log(userState)
        console.log(role)
        const manageData = {
            'userState': userState,
            'role': role
        };

        try {
            await axios({
                method: 'PUT',
                url: `http://172.30.1.19:8080/updateuser/${userNo}`,
                data: manageData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
            navigate("/admin/managemain");
        } catch (error) {
            console.error('수정 에러 : ' + error);
        }
    };

    const stateOption = [
        { value: "Y", name: "Y" },
        { value: "N", name: "N" }
    ]

    const roleOption = [
        { value: "USER", name: "USER" },
        { value: "ADMIN", name: "ADMIN" }
    ]

    const StateCheck = (props) => {
        const { options, value, onChange } = props;

        const handleChange = (event) => {
            onChange(event.target.value); // 선택된 값을 전달하여 업데이트
        };

        return (
        <select value={value} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
    }

    // 사용자 상태 변경 처리 함수
    const handleStateChange = (newValue) => {
        console.log("상태 : " + newValue)
        setUserState(newValue); // 새로운 상태로 업데이트
    }

    // 사용자 권한 변경 처리 함수
    const handleRoleChange = (newValue) => {
        console.log("권한 : " + newValue)
        setRole(newValue); // 새로운 권한으로 업데이트
    }

    return (
        <>
            상태변경 : <StateCheck options={stateOption} value={userState} onChange={handleStateChange} />
            권한변경 : <StateCheck options={roleOption} value={role} onChange={handleRoleChange} />
            <button onClick={handleStatusChange} style={{borderRadius:'5px', color:'blue', backgroundColor:'white'}}>수정</button>
        </>
    );
}

export default UpdateUser;
