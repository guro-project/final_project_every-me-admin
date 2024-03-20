import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UpdateAnno from "./UpdateAnno";
import DeleteAnno from "./DeleteAnno";

const AnnoDetail = () => {
    const { noticeNo } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        detailData();
    }, [noticeNo]); // noticeNo가 변경될 때마다 detailData 함수를 다시 호출

    // console.log("넘버")
    // console.log(noticeNo);

    const detailData = async () => {
        // const userToken = localStorage.getItem('userToken');
        // console.log(userToken)
        axios({
            method: 'GET',
            url: `http://192.168.0.64:8080/readnotice/${noticeNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJkYXRlIjoxNzEwODAxNDYzNDEzLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiQURNSU4iLCJzdWIiOiJFdmVyeU1lIHRva2VuIDogNCIsImV4cCI6MTcxMTY2NTQ2MywidXNlcklkIjoiYWRtaW5AYWRtaW4uY29tIn0.bBr6hosXPYl7NpHYZfYDhDU5AegsRvjOVaUeuqiiRh8`
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
        navigate(`/admin/update/${noticeNo}`);
        console.log(noticeNo)
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
                번호 : {data.noticeNo}
                제목 : {data.noticeTitle}
                날짜 : {formatDate(data.noticeRegistDate)}<br />
                내용 : {data.noticeContent}
            </div>
            <button onClick={handleItemClick}>수정</button>
            <DeleteAnno />
        </>
    )
}

export default AnnoDetail;
