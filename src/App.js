import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./Login";
import AnnoMain from "./pages/anno/AnnoMain";
import QnaMain from "./pages/qna/QnaMain";
import UserManage from "./pages/userManage/UserManage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}>
        </Route>
        <Route path="/admin">
          <Route path="main" element={<Main/>}/>
          <Route path="annomain" element={<AnnoMain/>}/>
          <Route path="qnamain" element={<QnaMain/>}/>
          <Route path="managemain" element={<UserManage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
