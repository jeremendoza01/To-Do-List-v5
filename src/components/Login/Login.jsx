
import './stylesLogin.css';
import { useState } from 'react';
const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { username, password } = formData;

        if (!username || !password) {
            setError('Usuario y contraseña invalidos');
            return;
        }

        console.log('Ingresando con:', formData);

        setError('');
        setFormData({
            username: '',
            password: '',
        });
    };

    return (
        <>
            <div className='div-login'>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit} className='form'>
                    <div>
                        <input
                            className='input'
                            type="text"
                            name="username"
                            placeholder='Usuario'
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="password"
                            name="password"
                            placeholder='Contraseña'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='button-submit' type="submit">Ingresa</button>
                </form>
            </div>
        </>
    );
};

export default Login;
