import React from 'react';
import './Logi.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = React.useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleChang = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (input.name === "TechLambdas" && input.password === "Password@1") {
      navigate("/employee");
    }
    else(alert("Your Email or Password Is InCorrect"))
  };

  let val = "Log In";
  return (
    <div className="container">
      <div className='login-row'>
        <div className="left-column">
          <div className='tech-tit'>
            {/* <img
              src="https://media.licdn.com/dms/image/v2/C560BAQGO2T7rLW733A/company-logo_200_200/company-logo_200_200/0/1672813348242/techlambdas_private_limited_logo?e=2147483647&v=beta&t=waNCLZSpDaP9QVHLLjS796OmVRhfrUv5YDUlmbcYlBg"
              alt="TechLambdas Logo"
              className='logo-img'
            /> */}
            <h1>
              <span className='wh-coo'>Welcome To</span> <span className='ch-colour'>TechLambdas</span>
            </h1>
            <h1 className='ch-colour'>PVT Ltd</h1>
          </div>
        </div>
        <div className="right-column">
          <form onSubmit={formSubmit}>
            <h2 className='sign-head'>Welcome Back!</h2>
            <h1 className='sign-title'>Sign In</h1>

            <label className='form-head-name'>User Name:</label>
            <input type="text" id="name" name="name" className='user-name' autoComplete='off' required placeholder='Enter Your User Name' onChange={handleChang} maxLength={15}/>

            <label className='form-head-name'>Password:</label>
            <input type="password" id="password" name="password" autoComplete='off' className='user-name' required placeholder='Enter Your Password' onChange={handleChang} maxLength={15}/>

            <input type="submit" value={val} className='sub-btn' id='fullbtn'/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
