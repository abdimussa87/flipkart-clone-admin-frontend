import { Button } from '@material-ui/core'
import React from 'react'
import './Signup.css'
function Signup() {
    return (
        <div className='signup'>
            <form >
                <div className="signup__firstRow">
                    <div className="signup__left">

                        <h5>First Name</h5>
                        <input type="text" placeholder='First Name' />
                    </div>
                    <div className="signup__right">
                        <h5>Last Name</h5>
                        <input type="text" placeholder='Last Name' />

                    </div>

                </div>
                <div className="signup__bottom">

                    <h5>Email Address</h5>
                    <input type="text" placeholder='Enter email' />
                    <h5>Password</h5>
                    <input type="password" placeholder='Password' /> <br />
                    <h5>Confirm Password</h5>
                    <input type="password" placeholder='Password' /> <br />
                    <Button type='submit' variant='outlined'>Signup</Button>
                </div>
            </form>
        </div>
    )
}

export default Signup
