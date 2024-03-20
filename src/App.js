import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./Login";
import AnnoMain from "./pages/anno/AnnoMain";
import QnaMain from "./pages/qna/QnaMain";
import UserManage from "./pages/userManage/UserManage";
import AnnoDetail from "./pages/anno/AnnoDetail";
import RegistAnno from "./pages/anno/RegistAnno";
import UpdateAnno from "./pages/anno/UpdateAnno";
import QnaDetail from "./pages/qna/QnaDetail";
import UpdateQna from "./pages/qna/UpdateQna";
import RegistQna from "./pages/qna/RegistQna";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}>
        </Route>
        
        <Route path="/admin">
          <Route path="main" element={<Main />} />

          {/* 공지사항 */}
          <Route path="annomain" element={<AnnoMain />} />
          <Route path="notice">
            <Route path=":noticeNo" element={<AnnoDetail />}/>
          </Route>
          <Route path="update">
            <Route path=":noticeNo" element={<UpdateAnno/>}/>
          </Route>
          <Route path="uploadnotice" element={<RegistAnno />} />

          {/* qna */}
          <Route path="qnamain" element={<QnaMain />} />
          <Route path="qna">
            <Route path=":qnaNo" element={<QnaDetail />}/>
          </Route>
          <Route path="updateqna">
            <Route path=":qnaNo" element={<UpdateQna/>}/>
          </Route>
          <Route path="uploadqna" element={<RegistQna />} />

          {/* 유저관리 */}
          <Route path="managemain" element={<UserManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
