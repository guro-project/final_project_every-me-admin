import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteQna = () => {
    const { qnaNo } = useParams();
    const navigate = useNavigate();

    const handleDelete = async() => {
        const userToken = localStorage.getItem('userToken');
        axios({
            method: 'DELETE',
            url: `http://172.30.1.19:8080/removeqna/${qnaNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            console.log("삭제성공");
            navigate("/admin/qnamain")
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <button onClick={handleDelete} style={{backgroundColor:'red', color:'white', borderRadius:'5px',border:'none',cursor: 'pointer'}}> 
            <h3>삭제</h3>
        </button>
    );
}

export default DeleteQna;