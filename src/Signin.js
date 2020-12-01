import React from 'react'
import './Signin.css'
import { Button } from '@material-ui/core'
function Signin() {
    return (
        <div className='signin'>
            <form >
                <h5>Email Address</h5>
                <input type="text" placeholder='Enter email' />
                <p>We'll never share your email with anyone else</p>
                <h5>Password</h5>
                <input type="password" placeholder='Password' /> <br />
                <Button type='submit' variant='outlined'>Signin</Button>
            </form>
        </div>
    )
}

export default Signin
