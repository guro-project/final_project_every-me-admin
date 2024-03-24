import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RegistAnno.css";

const UpdateAnno = () => {

    const { noticeNo } = useParams();
    const navigate = useNavigate();
    const [noticeTitle,setNoticeTitle] = useState('');
    const [noticeContent,setNoticeContent] = useState('');


    // console.log("넘버")
    // console.log(noticeNo);

    const onChangeTitleHandler = (event) => {
        setNoticeTitle(event.target.value);
    }
    const onChangeContentHandler = (event) => {
        setNoticeContent(event.target.value);
    }

    const onUpdateHandler = async () => {
        const userToken = localStorage.getItem('userToken');
        if (!noticeTitle || !noticeContent) {
            alert('제목과 내용을 입력해주세요')
            return;
        }
    
        let noticeData = {
            'noticeTitle': noticeTitle,
            'noticeContent': noticeContent
        };
        console.log(noticeData)

        const json = JSON.stringify(noticeData);
    
        try {
                await axios({
                method: 'PUT',
                url: `http://172.30.1.19:8080/updatenotice/${noticeNo}`,
                data: json,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
    
    
            try {
                navigate("/admin/annomain");
            } catch (error) {
                console.log('localStorage 저장 오류:', error);
            }
    
        } catch (error) {
            console.log(error);
        }
    }

    

    return(
        <>
            <div className="container">
                <h2>공지사항</h2>
                <label>제목 : </label>
                <input type="text" name="noticeTitle" onChange={onChangeTitleHandler} />
                <br />
                <label>내용 : </label>
                <textarea name="noticeContent" onChange={onChangeContentHandler} />
                <button className="btn" onClick={onUpdateHandler}>수정</button>
            </div>
        </>
    )
}

export default UpdateAnno;