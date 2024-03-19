import { Link } from "react-router-dom"

const Main = () => {

    return( 
        <>
        <div>
            <h1>어드민 메인페이지</h1>
            <Link to="/admin/annomain">공지사항 페이지</Link><br/>
            <Link to="/admin/qnamain">자주 묻는 질문 페이지</Link><br/> 
            <Link to="/admin/managemain">유저관리 페이지</Link>
        </div>
        </>
    )
}

export default Main;