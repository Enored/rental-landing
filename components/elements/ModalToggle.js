'use client'
import { useState } from 'react'
import { useUserContext } from '../../lib/UserContext'

export default function ModalToggle({ isToggled1, handleToggle1, isToggled2, handleToggle2, isToggled3, handleToggle3 }) {
    const { login } = useUserContext()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        // Create user object
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            userName: formData.userName,
            email: formData.email,
            password: formData.password, // In production, this should be hashed
            isLoggedIn: true
        }

        // Save user and login
        login(userData)
        
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        
        handleToggle1()
        alert('Registration successful! You are now logged in.')
    }

    return (
        <>
            <div className={`modal fade ${isToggled1 ? "show d-block" : ""}`}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="content-re-lo">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleToggle1} />
                            <div className="title">Register</div>
                            <div className="register-form">
                                <div className="respond-register-form">
                                    <form method="post" className="comment-form form-submit" onSubmit={handleSubmit} acceptCharset="utf-8" noValidate="novalidate">
                                        {error && <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
                                        <fieldset>
                                            <label>First Name</label>
                                            <input 
                                                type="text" 
                                                className="tb-my-input" 
                                                name="firstName" 
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label>Last Name</label>
                                            <input 
                                                type="text" 
                                                className="tb-my-input" 
                                                name="lastName" 
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label>User name</label>
                                            <input 
                                                type="text" 
                                                className="tb-my-input" 
                                                name="userName" 
                                                placeholder="User name"
                                                value={formData.userName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label>Email</label>
                                            <input 
                                                type="email" 
                                                className="tb-my-input" 
                                                name="email" 
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label>Password</label>
                                            <input 
                                                type="password" 
                                                className="input-form password-input" 
                                                placeholder="Your password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                minLength={6}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label>Confirm password</label>
                                            <input 
                                                type="password" 
                                                className="input-form password-input" 
                                                placeholder="Confirm password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>
                                        <button className="sc-button" name="submit" type="submit">
                                            <span>Sign Up</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="text-box text-center mt-30">Allready have an account? <a className="color-popup " data-bs-target="#exampleModalToggle2"  onClick={() => { handleToggle1(); handleToggle2();}}>Login</a></div>
                        </div>
                    </div>
                </div>
            </div>
            {isToggled1 && <div className="modal-backdrop fade show" onClick={handleToggle1} />}
        </>
    )
}
