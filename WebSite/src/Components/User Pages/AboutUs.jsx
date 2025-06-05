import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

export default function AboutUs() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <h1>Services</h1>
                <p>We offer a wide range of services to meet your needs.</p>
                <ul>
                    <li>Web Development</li>
                    <li>Mobile App Development</li>
                    <li>UI/UX Design</li>
                    <li>Digital Marketing</li>
                </ul>
            </div>
            <Footer />
        </>
    )
}
