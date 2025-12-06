'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ModalBookingSuccess() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const success = searchParams.get('bookingSuccess')
        if (success === 'true') {
            setIsVisible(true)
            // Remove the query parameter from URL without page reload
            setTimeout(() => {
                const url = new URL(window.location.href)
                url.searchParams.delete('bookingSuccess')
                window.history.replaceState({}, '', url.pathname)
            }, 100)
        }
    }, [searchParams])

    const handleClose = () => {
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <>
            <div 
                className={`modal fade ${isVisible ? "show d-block" : ""}`}
                style={{ display: isVisible ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ 
                        padding: '40px',
                        textAlign: 'center',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        <button 
                            type="button" 
                            className="btn-close" 
                            aria-label="Close" 
                            onClick={handleClose}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '15px',
                                zIndex: 10,
                                opacity: 1,
                                width: '20px',
                                height: '20px',
                                backgroundSize: '20px'
                            }}
                        />
                        <div style={{ 
                            fontSize: '60px',
                            color: '#28a745',
                            marginBottom: '20px'
                        }}>
                            ✓
                        </div>
                        <h3 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#0D1637',
                            marginBottom: '15px'
                        }}>
                            Booking Successful!
                        </h3>
                        <p style={{
                            fontSize: '16px',
                            color: '#666',
                            marginBottom: '30px',
                            lineHeight: '1.6'
                        }}>
                            Your car rental booking has been submitted successfully. 
                            We will contact you shortly to confirm your reservation.
                        </p>
                        <button 
                            onClick={handleClose}
                            style={{
                                padding: '12px 32px',
                                backgroundColor: '#D01818',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#0A1426'
                                e.currentTarget.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#D01818'
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
            {isVisible && (
                <div 
                    className="modal-backdrop fade show" 
                    onClick={handleClose}
                    style={{
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                    }}
                />
            )}
        </>
    )
}

