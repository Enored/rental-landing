'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useDateContext } from "../../lib/DateContext"

export default function CarListV2({ h5 }) {
    const router = useRouter()
    const [activeIndex, setActiveIndex] = useState(1)
    const { pickupDate, returnDate, datesSelected } = useDateContext()
    
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    
    // Helper function to build URL with date params
    const buildListingUrl = (baseUrl) => {
        if (!datesSelected) return '#'
        const params = new URLSearchParams({
            pickupDate,
            returnDate
        })
        return `${baseUrl}?${params.toString()}`
    }
    
    // Mock function to check car availability
    // In a real app, this would check against actual booking data
    const isCarAvailable = (carId) => {
        if (!datesSelected) return false
        
        // Mock: Some cars are unavailable on certain dates
        // In production, this would query a database
        const unavailableCars = [2, 4] // Example: cars with ID 2 and 4 are unavailable
        return !unavailableCars.includes(carId)
    }
    
    // Handle navigation - only navigate if dates are selected
    const handleNavigation = (e, url) => {
        // Always prevent default first
        e.preventDefault()
        e.stopPropagation()
        
        if (!datesSelected) {
            showDateToast();
            return false;
        }
        
        // Only navigate if dates are selected
        if (datesSelected && url && url !== '#') {
            router.push(url)
        }
        
        return false
    }
    
    // Helper function to render a car card
    const renderCarCard = (carId, imageSrc, title, subtitle, price, priceSale) => {
        const available = isCarAvailable(carId)
        const listingUrl = buildListingUrl("/listing-details")
        const canNavigate = datesSelected && available
        
        const handleClick = (e) => {
            if (!datesSelected) {
                e.preventDefault();
                e.stopPropagation();
                showDateToast();
                return false;
            }
        }
        
        return (
            <div className="col-12 col-sm-6 col-md-6 col-xl-6" key={carId}>
                <div className="tf-car-service-v2" style={{ 
                    opacity: datesSelected && !available ? 0.5 : 1,
                    position: 'relative'
                }}>
                    {canNavigate ? (
                        <Link 
                            href={listingUrl} 
                            className="image"
                        >
                            <div className="stm-badge-top">
                                <div className="feature-group">
                                    <span className="featured">Featured</span>
                                    <span className="year">2023</span>
                                </div>
                            </div>
                            <div className="thumb">
                                <img src={imageSrc} className="img-responsive" alt="Image Car Service" />
                            </div>
                        </Link>
                    ) : (
                        <div 
                            className="image"
                            onClick={handleClick}
                            onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}
                            style={{ 
                                cursor: 'not-allowed'
                            }}
                        >
                            <div className="stm-badge-top">
                                <div className="feature-group">
                                    <span className="featured">Featured</span>
                                    <span className="year">2023</span>
                                </div>
                                {datesSelected && !available && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        zIndex: 10,
                                        fontWeight: 'bold'
                                    }}>Unavailable</div>
                                )}
                                {/* Removed yellow badge for missing dates */}
                            </div>
                            <div className="thumb">
                                <img src={imageSrc} className="img-responsive" alt="Image Car Service" />
                            </div>
                        </div>
                    )}
                    <div className="content">
                        <span className="sub-title">{subtitle}</span>
                        <h6 className="title">
                            {canNavigate ? (
                                <Link href={listingUrl}>
                                    {title}
                                </Link>
                            ) : (
                                <span 
                                    onClick={handleClick}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    style={{ 
                                        cursor: 'not-allowed',
                                        color: '#999'
                                    }}
                                >
                                    {title}
                                </span>
                            )}
                        </h6>
                        <div className="description">
                            <ul>
                                <li className="listing-information fuel">
                                    <i className="icon-gasoline-pump-1" />
                                    <div className="inner">
                                        <span>Fuel type</span>
                                        <p>Petrol</p>
                                    </div>
                                </li>
                                <li className="listing-information size-engine">
                                    <i className="icon-Group1" />
                                    <div className="inner">
                                        <span>Mileage</span>
                                        <p>90 k.m</p>
                                    </div>
                                </li>
                                <li className="listing-information transmission">
                                    <i className="icon-gearbox-1" />
                                    <div className="inner">
                                        <span>Transmission</span>
                                        <p>Auto</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom-btn-wrap">
                            <div className="price-group">
                                <span className="price-sale">{priceSale}</span>
                                <span className="price">{price}</span>
                            </div>
                            <div className="btn-group">
                                <Link href="/#" className="icon-service">
                                    <i className="icon-heart-1-1" />
                                </Link>
                                <Link href="/#" className="icon-service">
                                    <i className="icon-shuffle-2-11" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    // Toast notification for missing date range
    const showDateToast = () => {
        const container = document.getElementById('date-toast-container');
        if (!container) return;
        // Remove any existing toast
        container.innerHTML = '';
        const toast = document.createElement('div');
        toast.style.background = '#222';
        toast.style.color = '#fff';
        toast.style.padding = '16px 28px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
        toast.style.fontSize = '16px';
        toast.style.fontWeight = 'bold';
        toast.style.marginBottom = '10px';
        toast.style.pointerEvents = 'auto';
        toast.textContent = '⚠️ Please select pickup and return dates to view car details.';
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => container.innerHTML = '', 400);
        }, 3000);
    };

    return (
        <>
            <div className={`${h5 ? "widget-car-list-v2-h5" : "widget-car-list-v2"} `}>
                <div className="themesflat-container">
                    <div className="header-tab mb-46">
                        <div className="heading-section">
                            {!h5 && <span className="sub-title mb-10 wow fadeInUp">Trusted Car Delaer Service</span>}
                            <h2 className={`${h5 ? "title-section-main" : "title"} wow fadeInUp`}>{`${!h5 ? "Popular Makes by" : "Explore All Cars"}`}</h2>
                        </div>
                        {/* Side alert notification for missing date range */}
                        <div id="date-toast-container" style={{
                            position: 'fixed',
                            top: '30px',
                            right: '30px',
                            zIndex: 9999,
                            pointerEvents: 'none'
                        }} />
                        <ul className="nav nav-pills tab-car-service-v2 justify-content-end" id="c" role="tablist">
                            <li className="nav-item" onClick={() => handleOnClick(1)}>
                                <button className={activeIndex == 1 ? "nav-link active" : "nav-link"}> Cadilliac</button>
                            </li>
                            <li className="nav-item" onClick={() => handleOnClick(2)}>
                                <button className={activeIndex == 2 ? "nav-link active" : "nav-link"}>Audi</button>
                            </li>
                            <li className="nav-item" onClick={() => handleOnClick(3)}>
                                <button className={activeIndex == 3 ? "nav-link active" : "nav-link"}>Bmw</button>
                            </li>
                            <li className="nav-item" onClick={() => handleOnClick(4)}>
                                <button className={activeIndex == 4 ? "nav-link active" : "nav-link"}>Mercedez</button>
                            </li>
                            <li className="nav-item" onClick={() => handleOnClick(5)}>
                                <button className={activeIndex == 5 ? "nav-link active" : "nav-link"}>Haundai </button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent-v2">
                        <div className={activeIndex == 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {/* Widget Car Service */}
                            <div className="row">
                                {renderCarCard(1, "/assets/images/car-list/car.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                                {renderCarCard(2, "/assets/images/car-list/car.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                            </div>
                            {/* Widget Car Service */}
                        </div>
                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {/* Widget Car Service */}
                            <div className="row">
                                {renderCarCard(3, "/assets/images/car-list/car.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                                {renderCarCard(4, "/assets/images/cart-service/2.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                            </div>
                            {/* Widget Car Service */}
                        </div>
                        <div className={activeIndex == 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {/* Widget Car Service */}
                            <div className="row">
                                {renderCarCard(5, "/assets/images/cart-service/1.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                                {renderCarCard(6, "/assets/images/cart-service/2.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                            </div>
                            {/* Widget Car Service */}
                        </div>
                        <div className={activeIndex == 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {/* Widget Car Service */}
                            <div className="row">
                                {renderCarCard(7, "/assets/images/cart-service/1.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                                {renderCarCard(8, "/assets/images/cart-service/2.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                            </div>
                            {/* Widget Car Service */}
                        </div>
                        <div className={activeIndex == 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {/* Widget Car Service */}
                            <div className="row">
                                {renderCarCard(9, "/assets/images/cart-service/1.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                                {renderCarCard(10, "/assets/images/cart-service/2.jpg", "Chevrolet Suburban 2021 mo", "Mini Cooper 3 Similar", "$7894", "$3958")}
                            </div>
                            {/* Widget Car Service */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
