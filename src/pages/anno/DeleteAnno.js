import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteAnno = () => {
    const { noticeNo } = useParams();
    const navigate = useNavigate();

    const handleDelete = async() => {
        axios({
            method: 'DELETE',
            url: `http://192.168.0.64:8080/removenotice/${noticeNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJkYXRlIjoxNzEwODAxNDYzNDEzLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiQURNSU4iLCJzdWIiOiJFdmVyeU1lIHRva2VuIDogNCIsImV4cCI6MTcxMTY2NTQ2MywidXNlcklkIjoiYWRtaW5AYWRtaW4uY29tIn0.bBr6hosXPYl7NpHYZfYDhDU5AegsRvjOVaUeuqiiRh8`
            }
        })
        .then(response => {
            console.log("삭제성공");
            navigate("/admin/annomain")
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <button onClick={handleDelete}>
            <h3 style={{color:'red'}}>삭제</h3>
        </button>
    );
}

export default DeleteAnno;