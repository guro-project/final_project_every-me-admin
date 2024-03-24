import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RegistQna.css"; // CSS 파일 import

const UpdateQna = () => {

    const { qnaNo } = useParams();
    const navigate = useNavigate();
    const [qnaTitle,setQnaTitle] = useState('');
    const [qnaContent,setQnaContent] = useState('');


    // console.log("넘버")
    // console.log(noticeNo);

    const onChangeTitleHandler = (event) => {
        setQnaTitle(event.target.value);
    }
    const onChangeContentHandler = (event) => {
        setQnaContent(event.target.value);
    }

    const onUpdateHandler = async () => {
        const userToken = localStorage.getItem('userToken');
        if (!qnaTitle || !qnaContent) {
            alert('제목과 내용을 입력해주세요')
            return;
        }
    
        let qnaData = {
            'qnaTitle': qnaTitle,
            'qnaContent': qnaContent
        };
        console.log(qnaData)

        const json = JSON.stringify(qnaData);
    
        try {
                await axios({
                method: 'PUT',
                url: `http://172.30.1.19:8080/updateqna/${qnaNo}`,
                data: json,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
    
    
            try {
                navigate("/admin/qnamain");
            } catch (error) {
                console.log('localStorage 저장 오류:', error);
            }
    
        } catch (error) {
            console.log(error);
        }
    }

    

    return(
        <>
            <div className="regist-qna-container">
            <label className="regist-qna-label">질문 : </label>
            <input className="regist-qna-input" type="text" name="qnaTitle" onChange={onChangeTitleHandler} />
            <br />
            <label className="regist-qna-label">답 : </label>
            <input className="regist-qna-input" type="text" name="qnaContent" onChange={onChangeContentHandler} />
            <button className="regist-qna-button" onClick={onUpdateHandler}>수정</button>
        </div>
        </>
    )
}

export default UpdateQna;