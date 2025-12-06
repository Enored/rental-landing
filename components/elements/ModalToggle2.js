'use client'
import { useState } from 'react'
import { useUserContext } from '../../lib/UserContext'

export default function ModalToggle2({ isToggled1, handleToggle1, isToggled2, handleToggle2, isToggled3, handleToggle3 }) {
    const { login } = useUserContext()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        
        // Check if user exists in localStorage
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser)
                // Simple check - in production, this would be done on the backend
                if (user.email === formData.email && user.password === formData.password) {
                    // Login successful
                    login(user)
                    setFormData({ email: '', password: '' })
                    handleToggle2()
                    alert('Login successful!')
                } else {
                    setError('Invalid email or password')
                }
            } catch (error) {
                setError('Error logging in. Please try again.')
            }
        } else {
            setError('No account found. Please register first.')
        }
    }

    return (
        <>
            <div className={`modal fade ${isToggled2 ? "show d-block" : ""}`}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="content-re-lo">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleToggle2} />
                            <div className="title">Login</div>
                            <div className="register-form">
                                <div className="respond-register-form">
                                    <form method="post" className="comment-form form-submit" onSubmit={handleSubmit} acceptCharset="utf-8">
                                        {error && <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
                                        <fieldset>
                                            <label>Account</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="tb-my-input" 
                                                name="email" 
                                                placeholder="Email or user name"
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
                                            />
                                        </fieldset>
                                        <div className="title-forgot t-al-right mb-20"><a className="t-al-right" data-bs-target="#exampleModalToggle3"  onClick={() => { handleToggle2(); handleToggle3();}}>Forgot password</a>
                                        </div>
                                        <button className="sc-button" name="submit" type="submit">
                                            <span>Login</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="text-box text-center mt-30">Don't you have an account? <a className="color-popup" data-bs-target="#exampleModalToggle" onClick={() => { handleToggle1(); handleToggle2();}}>Register</a></div>
                        </div>
                    </div>
                </div>
            </div>
            {isToggled2 && <div className="modal-backdrop fade show" onClick={handleToggle2} />}
        </>
    )
}
