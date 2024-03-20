import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistQna = () => {
    const navigate = useNavigate();
    const [qnaTitle,setQnaTitle] = useState('');
    const [qnaContent,setQnaContent] = useState('');

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
        console.log(qnaData)

        const json = JSON.stringify(qnaData);
    
        try {
            await axios({
                method: 'POST',
                url: 'http://192.168.0.64:8080/uploadqna',
                data: json,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
    
    
            try {
                console.log("토큰")
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
            <div>
                <label>제목 : </label>
                <input type="text" name="qnaTitle" onChange={onChangeTitleHandler} />
                <br />
                <label>내용 : </label>
                <input type="text" name="qnaContent" onChange={onChangeContentHandler} />
                <button onClick={onUploadHandler}>등록</button>
                
            </div>
        </>
    )

}

export default RegistQna;