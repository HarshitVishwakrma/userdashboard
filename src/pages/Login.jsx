// src/pages/Login.jsx
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();


  useEffect(()=>{
    console.log(user)
    if(user){
        navigate('/home');
      }
  })
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://userdashboardbackend.vercel.app/api/auth/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials : 'include',
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      login(data); // Save user in context and localStorage
      navigate('/home'); // Redirect to Home Page
    } else {
    //   alert('Invalid login!');
      setLoginError('Invalid credentials, Username or password must be wrong!!!')
    }
  };

  return (
    <div className="form-container mt-20 border">
      <h2 className="text-2xl font-semibold mb-6 text-center ">Login</h2>
      {loginError && <h3 className='font-semibold text-red-700'>{loginError}</h3>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="input-field mb-8"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field mb-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <p >Don&apos;t have an account? <a className='text-blue-500' href="/register">Register here!</a></p>
    </div>
  );
};

export default Login;
