import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import './Signup.css'
import { useDispatch, useSelector } from 'react-redux'
import { signUpAsync } from './features/userSlice';
function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const message = useSelector(state => state.user.message);
    const error = useSelector(state => state.user.error);
    const authenticating = useSelector(state => state.user.authenticating);
    const handleSignUp = (e) => {
        e.preventDefault();
        if (firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || password.trim().length < 6 || confirmPassword.trim().length < 6) {
            alert("Please enter the required fields")
        } else {
            if (password.trim() !== confirmPassword.trim()) {
                alert('Password and confirm password must be the same');
            } else {
                dispatch(signUpAsync({ firstName, lastName, email, password }));
            }
        }
    }

    if (authenticating) {
        return (
            <p>Loading...</p>
        );
    }


    return (
        <div className='signup'>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error.error}</p>}
            <form >
                <div className="signup__firstRow">
                    <div className="signup__left">

                        <h5>First Name</h5>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                    </div>
                    <div className="signup__right">
                        <h5>Last Name</h5>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />

                    </div>

                </div>
                <div className="signup__bottom">

                    <h5>Email Address</h5>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' /> <br />
                    <h5>Confirm Password</h5>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' /> <br />
                    <Button type='submit' variant='outlined' onClick={handleSignUp}>Signup</Button>
                </div>
            </form>
        </div>
    )
}

export default Signup
