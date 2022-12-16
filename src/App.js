import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import axios from "axios";
import Login from './page/auth/Login';
import Register from './page/auth/Register';
import Home from './page/home/Home';
import ProductForm from './components/product/productForm/ProductForm';
import ProductDetail from './components/product/productDetail/ProductDetail';
import EditProduct from './components/product/editProduct/EditProduct';
import Profile from './page/profile/Profile';
import EditProfile from './page/profile/EditProfile';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgot from './page/auth/Forgot';
import Reset from './page/auth/Reset';

axios.defaults.withCredentials = true;

function App() {
  return (
   <BrowserRouter>
   <ToastContainer />
    <Routes>
     <Route path='/' element={<Login />} />
     <Route path='/register' element={<Register />} />
     <Route path='/home' element={<Home />} />
     <Route path='/add-product' element={<ProductForm />} />
     <Route path='/product-detail/:id' element={<ProductDetail />} />
     <Route path='/edit-product/:id' element={<EditProduct />} />
     <Route path='/profile' element={<Profile />} />
     <Route path='/edit-profile' element={<EditProfile />} />
     <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
