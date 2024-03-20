import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QnaMain = () => {
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
            url: `http://192.168.0.64:8080/readqna`,
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
                console.error('조회 에러 : ' + error);
            });
    }

    const renderData = () => {
        if (!data) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

        return (
            <ul>
                {data.map(item => (
                    <li key={item.qnaNo} onClick={() => handleItemClick(item)}>
                        <label>제목 : {item.qnaTitle} 날짜 : {formatDate(item.qnaRegistDate)}</label>
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
        navigate(`/admin/qna/${item.qnaNo}`);
    }

    const uplodaQnaPage = () => {
        navigate("/admin/uploadqna")
    }


    return (
        <div>
            <h1>질문 메인페이지</h1>
            <button onClick={uplodaQnaPage}>질문 업로드</button>
            {renderData()}
        </div>
    );
};

export default QnaMain;