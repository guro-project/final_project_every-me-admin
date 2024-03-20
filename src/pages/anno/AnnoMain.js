import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AnnoMain = () => {
    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userToken = localStorage.getItem('userToken');
        // console.log(userToken)
        axios({
            method: 'GET',
            url: `http://192.168.0.64:8080/readnotice`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setData(response.data);
                console.log("데이터")
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error data456 : ' + error);
            });
    }

    const renderData = () => {
        if (!data) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

        return (
            <ul>
                {data.map(item => (
                    <li key={item.noticeNo} onClick={() => handleItemClick(item)}>
                        <label>번호 : {item.noticeNo} 제목 : {item.noticeTitle} 날짜 : {formatDate(item.noticeRegistDate)}</label>
                    </li>
                ))}
            </ul>
        );
    }

    // 밀리초로 표시된 날짜를 원하는 형식으로 변환하는 함수
    const formatDate = (milliseconds) => {
        const date = new Date(milliseconds); // 밀리초로부터 Date 객체 생성
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleItemClick = (item) => {
        console.log("Clicked item:", item);
        navigate(`/admin/notice/${item.noticeNo}`);
    }

    const uplodaNoticePage = () => {
        navigate("/admin/uploadnotice")
        console.log("공지사항 업로드페이지")
    }

    // 공지사항 메인페이지에는 공지사항등록버튼, 공지사항 리스트 번호,제목,날짜만 메인페이지 홈버튼, 뒤로가기버튼

    return (
        <div>
            <h1>공지사항 메인페이지</h1>
            <button onClick={uplodaNoticePage}>공지사항 업로드</button>
            {renderData()}
        </div>
    );
};

export default AnnoMain;