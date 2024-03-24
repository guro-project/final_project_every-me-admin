import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QnaMain.css"; // CSS 파일 import

const QnaMain = () => {
    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userToken = localStorage.getItem('userToken');
        axios({
            method: 'GET',
            url: `http://172.30.1.19:8080/readqna`,
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

    const formatDate = (milliseconds) => {
        const date = new Date(milliseconds);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleItemClick = (item) => {
        navigate(`/admin/qna/${item.qnaNo}`);
    }

    const uplodaQnaPage = () => {
        navigate("/admin/uploadqna")
    }

    const home = () => {
        navigate("/admin/main")
    }

    return (
        <div className="qna-container">
            <h1 className="qna-header">질문 메인페이지</h1>
            <button className="qna-button" onClick={uplodaQnaPage}>질문 업로드</button>
            <ul className="qna-list">
                {data && data.map(item => (
                    <li key={item.qnaNo} className="qna-item" onClick={() => handleItemClick(item)}>
                        <span className="qna-title">질문: {item.qnaTitle}</span>
                        {/* <span className="qna-date">날짜: {formatDate(item.qnaRegistDate)}</span> */}
                    </li>
                ))}
            </ul>
            <button className="upload-button" onClick={home}>홈</button>
        </div>
    );
};

export default QnaMain;
