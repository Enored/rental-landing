'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../../lib/UserContext'

export default function ModalBooking({ isToggled, handleToggle, pickupDate, returnDate }) {
    const router = useRouter()
    const { user, isLoggedIn } = useUserContext()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    })

    // Pre-fill form when modal opens and user is logged in
    useEffect(() => {
        if (isToggled && isLoggedIn && user) {
            // Modal is opening and user is logged in - pre-fill name fields
            setFormData(prev => ({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phoneNumber: prev.phoneNumber || '' // Keep phone number if already entered
            }))
        } else if (isToggled && !isLoggedIn) {
            // Modal is opening but user is not logged in - reset all
            setFormData({
                firstName: '',
                lastName: '',
                phoneNumber: ''
            })
        }
    }, [isToggled, isLoggedIn, user])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log('Booking submitted:', {
            ...formData,
            pickupDate,
            returnDate
        })
        
        // Close modal first
        handleToggle()
        
        // Reset phone number, but keep name if user is logged in
        if (isLoggedIn && user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phoneNumber: ''
            })
        } else {
            setFormData({ firstName: '', lastName: '', phoneNumber: '' })
        }
        
        // Navigate to home page with success parameter
        router.push('/?bookingSuccess=true')
    }

    return (
        <>
            <div 
                className={`modal fade ${isToggled ? "show d-block" : ""}`} 
                id="booking-modal"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ padding: '30px' }}>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close" 
                            onClick={() => {
                                handleToggle()
                                // Reset form on close
                                if (isLoggedIn && user) {
                                    setFormData({
                                        firstName: user.firstName || '',
                                        lastName: user.lastName || '',
                                        phoneNumber: ''
                                    })
                                } else {
                                    setFormData({ firstName: '', lastName: '', phoneNumber: '' })
                                }
                            }}
                             style={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                                zIndex: 10,
                                opacity: 1,
                                width: '10px',
                                height: '10px',
                                backgroundSize: '20px',
                            }}
                        />

     

                        <h4 className="title-form" style={{ paddingRight: '50px', marginTop: 0 }}>Book This Car</h4>
                        {isLoggedIn && user && (
                            <p style={{ 
                                fontSize: '14px', 
                                color: '#666', 
                                marginBottom: '15px',
                                fontStyle: 'italic'
                            }}>
                                Welcome back, {user.firstName} {user.lastName}!
                            </p>
                        )}
                        {pickupDate && returnDate && (
                            <div 
                                className="booking-dates-info"
                                style={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginBottom: '35px',
                                    padding: '30px 25px',
                                    background: 'linear-gradient(135deg, #F8F9FA 0%, #F2F5FB 100%)',
                                    borderRadius: '12px',
                                    border: '1px solid #E0E5EF'
                                }}
                            >
                                <div 
                                    className="date-item"
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}
                                >
                                    <span 
                                        className="date-label"
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            color: '#D01818'
                                        }}
                                    >
                                        Pickup Date
                                    </span>
                                    <span 
                                        className="date-value"
                                        style={{
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            color: '#0D1637',
                                            lineHeight: '1.5'
                                        }}
                                    >
                                        {new Date(pickupDate).toLocaleDateString('en-US', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </span>
                                </div>
                                <div 
                                    className="date-item"
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}
                                >
                                    <span 
                                        className="date-label"
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            color: '#D01818'
                                        }}
                                    >
                                        Return Date
                                    </span>
                                    <span 
                                        className="date-value"
                                        style={{
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            color: '#0D1637',
                                            lineHeight: '1.5'
                                        }}
                                    >
                                        {new Date(returnDate).toLocaleDateString('en-US', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </span>
                                </div>
                            </div>
                        )}
                        <form 
                            action="/" 
                            method="post" 
                            className="booking-form" 
                            aria-label="Booking form" 
                            onSubmit={handleSubmit}
                        >
                            <div className="group-form">
                                <input 
                                    className="booking-input" 
                                    placeholder="First Name *" 
                                    type="text" 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="group-form">
                                <input 
                                    className="booking-input" 
                                    placeholder="Last Name *" 
                                    type="text" 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="group-form">
                                <input 
                                    className="booking-input" 
                                    placeholder="Your Phone *" 
                                    type="tel" 
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button 
                                className="booking-submit-btn" 
                                type="submit"
                                style={{
                                    width: '90%',
                                    padding: '10px 20px',
                                    backgroundColor: '#D01818',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    textTransform: 'capitalize',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 15px rgba(208, 24, 24, 0.25)',
                                    transition: 'all 0.3s ease',
                                    alignSelf: 'center',
                                    margin: '20px auto',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#0A1426'
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(208, 24, 24, 0.35)'
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#D01818'
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(208, 24, 24, 0.25)'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}
                            >
                                <span>Submit Booking</span>
                                <i className="icon-arrow-right2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {isToggled && (
                <div 
                    className="modal-backdrop fade show" 
                    onClick={() => {
                        handleToggle()
                        // Reset form on close
                        if (isLoggedIn && user) {
                            setFormData({
                                firstName: user.firstName || '',
                                lastName: user.lastName || '',
                                phoneNumber: ''
                            })
                        } else {
                            setFormData({ firstName: '', lastName: '', phoneNumber: '' })
                        }
                    }}
                    style={{
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                    }}
                />
            )}
        </>
    )
}

