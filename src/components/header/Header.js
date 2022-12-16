import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";

import { AiOutlineAppstore} from 'react-icons/ai';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/");
  };

  return (
  <div className="nav-body">
    <div className="nav-list">
      <div className="btn-list">
      <Link to='/home' ><li><AiOutlineAppstore size={45} color='rgb(255, 204, 65)' /></li></Link>
      <li><span>Welcome To {name}</span></li>
      </div>
      <div className="btn-list">
      <li><Link to='/add-product'><button >Add Product </button></Link></li>
      <li><Link to='/profile'><button >Profile </button></Link></li>
      <li><button onClick={logout}>Logout</button></li>
      </div>
    </div>
  </div>
  );
};

export default Header;
