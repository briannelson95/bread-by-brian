import Link from 'next/link'
import React from 'react'

export default function AdminNav() {
    return (
        <nav className={`sticky top-0 left-0 h-screen bg-gray-300 w-48`}>
            <ul>
                <li>
                    <Link href={'/admin'}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={'/admin/products'}>
                        Products
                    </Link>
                </li>
                <li>
                    <Link href={'/admin/inventory'}>
                        Inventory
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
