import React, { useState } from 'react'
import './Signin.css'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { loginAsync } from './features/userSlice';
function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const handleSignin = (e) => {
        e.preventDefault();
        if (email.trim().length > 0 && password.trim().length >= 6) {
            dispatch(loginAsync({ email: email, password: password }))
        } else {
            if (email.trim().length === 0)
                alert('Email cannot be empty!!')
            else {
                alert('Password must be at least 6 characters long')
            }
        }
    }





    return (
        <div className='signin'>
            <form >
                <h5>Email Address</h5>
                <input type="text" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <p>We'll never share your email with anyone else</p>
                <h5>Password</h5>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <Button type='submit' variant='outlined' onClick={handleSignin}>Signin</Button>
            </form>
        </div>
    )
}

export default Signin
