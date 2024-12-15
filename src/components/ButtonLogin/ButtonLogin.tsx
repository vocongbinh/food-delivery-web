import React from 'react'
import Button from '../Button/Button'
import Link from 'next/link'
const ButtonLogin = () => {

    return (
        <Link href="/login">
            <Button className="!hidden md:!flex border font-semibold border-primary-500 text-primary-500 whitespace-nowrap" pattern="white" sizeClass="px-6 py-2">
                <span>Log In</span>
            </Button>

        </Link>
    )
}

export default ButtonLogin