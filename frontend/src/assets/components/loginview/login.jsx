import { useState } from 'react';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Register from '../register/registerview';
function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const loginuser = async () => {
    const res = await axios.post('http://localhost:8080/api/session/login/', {
      email: Email,
      password: Password,
    });
    const data = res.data;
    console.log(data);
    if (data) {
      console.log(data);
      navigate('/home');
    }
  };

  return (
    <>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
        <Form.Control
          value={Email}
          type="email"
          placeholder="name@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          value={Password}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FloatingLabel>
      <Button onClick={loginuser} variant="primary">
        Login
      </Button>
      <Link to="/register" className="btn btn-primary">
        Regístrate Aquí
      </Link>
    </>
  );
}
export default Login;
