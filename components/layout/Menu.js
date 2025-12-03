import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Menu() {
    const pathname = usePathname()

    return (
        <>
            <ul className="navigation clearfix">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/car-list">Cars</Link>
                </li>
                {/* <li className="dropdown2">
                    <Link href="/#">Page</Link>
                    <ul>
                        <li className={pathname == "/dashboard" ? "current" : ""}><Link href="/dashboard">Dashboard</Link></li>
                        <li className={pathname == "/my-inventory" ? "current" : ""}><Link href="/my-inventory">My Inventory</Link></li>
                        <li className={pathname == "/addcart" ? "current" : ""}><Link href="/addcart">Add car</Link></li>
                        <li className={pathname == "/seller-profile" ? "current" : ""}><Link href="/seller-profile">Seller Profile</Link></li>
                        <li className={pathname == "/dealer-details" ? "current" : ""}><Link href="/dealer-details">Dealer Detail</Link></li>
                        <li className={pathname == "/404" ? "current" : ""}><Link href="/404">404</Link></li>
                    </ul>
                </li> */}
                <li><Link href="/blog">News </Link>
                </li>
                <li className={pathname == "/contact-us" ? "current" : ""}><Link href="/contact-us">Contact us </Link>
                </li>
            </ul>
        </>
    )
}
