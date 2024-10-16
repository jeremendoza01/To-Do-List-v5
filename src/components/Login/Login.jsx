import './stylesLogin.css';
import { useState } from 'react';
import { useAuth } from "../../auth/AuthProvider";
const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            setError('');
        } catch (err) {
            setError('Error al iniciar sesión. Por favor verifica tus credenciales.');
        }
    };

    return (

        <div className='div-login' >
            <form className="form" onSubmit={handleSubmit}>
                <h1>Iniciar Sesion</h1>

                {error && <p className='error'>{error}</p>}

                <label >Username</label>
                <input
                    className='input'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}

                />

                <label >Password</label>
                <input
                    className='input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />

                <button className='button-submit' type='submit' >
                    Iniciar sesion
                </button>
            </form>

        </div>
    );

};

export default Login;

// return (
//     <div className='div-login'>
//         <h2>Login</h2>
//         {error && <p>{error}</p>}
//         <form className='form' onSubmit={handleSubmit}>
//             <div>
//                 <input
//                     className='input'
//                     type="text"
//                     placeholder='Usuario'
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <input
//                     className='input'
//                     type="password"
//                     placeholder='Contraseña'
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <button className='button-submit' type='submit'>Ingresa</button>
//         </form>
//     </div>
// );