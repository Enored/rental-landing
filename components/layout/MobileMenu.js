'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from 'react'

export default function MobileMenu() {
    const pathname = usePathname()
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleClick = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            <ul className="navigation clearfix">
                <li onClick={() => handleClick(1)}>
                    <Link href="/">Home</Link>
                </li>
                <li className={isActive.key == 2 ? "dropdown2 current" : "dropdown2"} onClick={() => handleClick(2)}>
                    <Link href="/car-list">Cars</Link>
                </li>
                {/* <li className={isActive.key == 3 ? "dropdown2 current" : "dropdown2"} onClick={() => handleClick(3)}>
                    <Link href="/#">Page</Link>
                    <ul style={{ display: `${isActive.key == 3 ? "block" : "none"}` }}>
                        <li className={pathname == "/dashboard" ? "current" : ""}><Link href="/dashboard">Dashboard</Link></li>
                        <li className={pathname == "/my-inventory" ? "current" : ""}><Link href="/my-inventory">My Inventory</Link></li>
                        <li className={pathname == "/addcart" ? "current" : ""}><Link href="/addcart">Add car</Link></li>
                        <li className={pathname == "/seller-profile" ? "current" : ""}><Link href="/seller-profile">Seller Profile</Link></li>
                        <li className={pathname == "/dealer-details" ? "current" : ""}><Link href="/dealer-details">Dealer Detail</Link></li>
                        <li className={pathname == "/404" ? "current" : ""}><Link href="/404">404</Link></li>
                    </ul>
                    <div className="dropdown2-btn" />
                </li> */}
                {/* <li className={isActive.key == 4 ? "dropdown2 current" : "dropdown2"} onClick={() => handleClick(4)}>
                    <Link href="/#">News </Link>
                    <ul style={{ display: `${isActive.key == 4 ? "block" : "none"}` }}>
                        <li className={pathname == "/blog" ? "current" : ""}><Link href="/blog">Blog List</Link></li>
                        <li className={pathname == "/blog-single" ? "current" : ""}><Link href="/blog-single">Blog Detail</Link></li>
                    </ul>
                    <div className="dropdown2-btn" />
                </li> */}
                <li className={pathname == "/contact-us" ? "current" : ""}><Link href="/contact-us">Contact us </Link>
                </li>
            </ul>
        </>
    )
}
