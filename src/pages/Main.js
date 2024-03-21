import { Link } from "react-router-dom"
import "./Main.css";

const Main = () => {

    return (
        <>
            <div>
                <div className="title-container">
                    <h1>EveryMe ADMINPAGE</h1>
                </div>
                <div className="button-container">
                    <Link to="/admin/annomain">공지사항 페이지</Link><br />
                    <Link to="/admin/qnamain">자주 묻는 질문 페이지</Link><br />
                    <Link to="/admin/managemain">유저관리 페이지</Link>
                </div>
            </div>
        </>
    )
}

export default Main;