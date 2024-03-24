import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteAnno from "./DeleteAnno";
import "./AnnoDetail.css";

const AnnoDetail = () => {
    const { noticeNo } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        detailData();
    }, [noticeNo]); // noticeNo가 변경될 때마다 detailData 함수를 다시 호출

    const detailData = async () => {
        const userToken = localStorage.getItem('userToken');
        axios({
            method: 'GET',
            url: `http://172.30.1.19:8080/readnotice/${noticeNo}`,
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
        navigate(`/admin/update/${noticeNo}`);
    }

    // 밀리초로 표시된 날짜를 원하는 형식으로 변환하는 함수
    const formatDate = (milliseconds) => {
        const date = new Date(milliseconds); // 밀리초로부터 Date 객체 생성
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div className="container">
            <div className="item">
                <span className="title">번호 :</span> {data.noticeNo}
            </div>
            <div className="item">
                <span className="title">제목 :</span> {data.noticeTitle}
            </div>
            <div className="item">
                <span className="title">날짜 :</span> {formatDate(data.noticeRegistDate)}
            </div>
            <div className="item">
                <span className="title">내용 :</span>
                <div className="content">{data.noticeContent}</div>
            </div>
            <button className="btn" onClick={handleItemClick}>수정</button>
            <DeleteAnno />
        </div>
    )
}

export default AnnoDetail;
