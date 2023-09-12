import react from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adminlogin from "./component/adminlogin";
import PostPage from './component/post.jsx'
import Home from "./home";
import Store from "./component/store";
import Dashboard from "./component/dashboard";
import Navcomponent from "./component/navbar";
import Footercomponent from "./component/footer";
function App(){

  return(
    <Router>
     <Navcomponent />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/post/:postid' element={<PostPage />} />
        <Route exact path='/Store' element={<Store />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
     <Footercomponent />
    </Router>
  )
}
export default App