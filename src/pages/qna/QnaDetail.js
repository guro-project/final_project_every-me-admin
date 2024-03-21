import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteQna from "./DeleteQna";

const QnaDetail = () => {
    const { qnaNo } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        detailData();
    }, [qnaNo]); // noticeNo가 변경될 때마다 detailData 함수를 다시 호출

    // console.log("넘버")
    // console.log(noticeNo);

    const detailData = async () => {
        const userToken = localStorage.getItem('userToken');
        // console.log(userToken)
        axios({
            method: 'GET',
            url: `http://192.168.0.64:8080/readqna/${qnaNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error data : ' + error);
            });
    }

    const handleItemClick = () => {
        navigate(`/admin/updateqna/${qnaNo}`);
        console.log(qnaNo)
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
        <>
            <div>
                제목 : {data.qnaTitle}
                날짜 : {formatDate(data.qnaRegistDate)}<br />
                내용 : {data.qnaContent}
            </div>
            <button onClick={handleItemClick}>수정</button>
            <DeleteQna />
        </>
    )
}

export default QnaDetail;