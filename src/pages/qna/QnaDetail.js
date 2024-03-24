import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteQna from "./DeleteQna";
import "./QnaDetail.css"; // CSS 파일 import

const QnaDetail = () => {
    const { qnaNo } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        detailData();
    }, [qnaNo]); // qnaNo가 변경될 때마다 detailData 함수를 다시 호출

    const detailData = async () => {
        const userToken = localStorage.getItem('userToken');
        axios({
            method: 'GET',
            url: `http://172.30.1.19:8080/readqna/${qnaNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('Error data : ' + error);
        });
    }

    const handleItemClick = () => {
        navigate(`/admin/updateqna/${qnaNo}`);
    }

    return (
        <div className="qna-detail-container">
            <div className="qna-detail-title">질문: {data.qnaTitle}</div>
            <div className="qna-detail-content">답: {data.qnaContent}</div>
            <button className="qna-detail-button" onClick={handleItemClick}>수정</button>
            <DeleteQna />
        </div>
    )
}

export default QnaDetail;
