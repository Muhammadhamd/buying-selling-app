import react from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adminlogin from "./component/adminlogin";
import PostPage from './component/post.jsx'
import Home from "./home";
import Store from "./component/store";
import Dashboard from "./component/dashboard";
import Navcomponent from "./component/navbar";
import Footercomponent from "./component/footer";
import CartComponent from "./component/cart";
function App(){

  return(
    <Router>
     <Navcomponent />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/cart' element={<CartComponent />} />
        <Route exact path='/Store' element={<Store />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/Product/:productid' element={<PostPage />} />
      </Routes>
     <Footercomponent />
    </Router>
  )
}
export default App