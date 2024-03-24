import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistQna.css"; // CSS 파일 import

const RegistQna = () => {
    const navigate = useNavigate();
    const [qnaTitle, setQnaTitle] = useState('');
    const [qnaContent, setQnaContent] = useState('');

    const onChangeTitleHandler = (event) => {
        setQnaTitle(event.target.value);
    }
    const onChangeContentHandler = (event) => {
        setQnaContent(event.target.value);
    }

    const onUploadHandler = async () => {

        if (!qnaTitle || !qnaContent) {
            alert('제목과 내용을 입력해주세요')
            return;
        }

        const userToken = localStorage.getItem('userToken');
        let qnaData = {
            'qnaTitle': qnaTitle,
            'qnaContent': qnaContent
        };

        const json = JSON.stringify(qnaData);

        try {
            await axios({
                method: 'POST',
                url: 'http://172.30.1.19:8080/uploadqna',
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

    return (
        <div className="regist-qna-container">
            <label className="regist-qna-label">질문 : </label>
            <input className="regist-qna-input" type="text" name="qnaTitle" onChange={onChangeTitleHandler} />
            <br />
            <label className="regist-qna-label">답 : </label>
            <input className="regist-qna-input" type="text" name="qnaContent" onChange={onChangeContentHandler} />
            <button className="regist-qna-button" onClick={onUploadHandler}>등록</button>
        </div>
    )
}

export default RegistQna;
