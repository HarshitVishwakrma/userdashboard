// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://chatappbackend-foxvyvww0-harshits-projects-548ba978.vercel.app/api/auth/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName ,username, email, password }),
    });
    if (response.ok) {
      alert('Registration successful!');
      navigate('/login'); // Redirect to Login Page
    } else {
        const data = await response.json()
    //   alert('Registration failed!');
        if(response.status == 400){
            setRegisterError(data.message)
        }else{
            setRegisterError('something went wrong! Please try again later.')
        }
    }
  };

  return (
    <div className="form-container mt-20 border-b-blue-500 border">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      {registerError && <h3 className='text-red-700 font-semibold mb-4' >{registerError}</h3>}
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row'>
        <input
          type="text"
          placeholder="First Name"
          className="input-field mb-4 flex-1 mr-1"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          />
        <input
          type="text"
          placeholder="Last Name"
          className="input-field mb-4 flex-1 ml-1"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          />
        </div>
        <input
          type="text"
          placeholder="Username"
          className="input-field mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
