import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistAnno = () => {
    const navigate = useNavigate();
    const [noticeTitle,setNoticeTitle] = useState('');
    const [noticeContent,setNoticeContent] = useState('');

    const onChangeTitleHandler = (event) => {
        setNoticeTitle(event.target.value);
    }
    const onChangeContentHandler = (event) => {
        setNoticeContent(event.target.value);
    }

    const onUploadHandler = async () => {
        
        if (!noticeTitle || !noticeContent) {
            alert('제목과 내용을 입력해주세요')
            return;
        }
    
        const userToken = localStorage.getItem('userToken');
        let noticeData = {
            'noticeTitle': noticeTitle,
            'noticeContent': noticeContent
        };
        console.log(noticeData)

        const json = JSON.stringify(noticeData);
    
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://192.168.0.64:8080/uploadnotice',
                data: json,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
    
    
            try {
                console.log("토큰")
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
            <div>
                <label>제목 : </label>
                <input type="text" name="noticeTitle" onChange={onChangeTitleHandler} />
                <br />
                <label>내용 : </label>
                <input type="text" name="noticeContent" onChange={onChangeContentHandler} />
                <button onClick={onUploadHandler}>등록</button>
                
            </div>
        </>
    )

}

export default RegistAnno;