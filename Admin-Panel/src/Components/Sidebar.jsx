import React, { useEffect } from 'react'
import feather from 'feather-icons'
import { useLocation } from 'react-router-dom'

export default function Sidebar() {
    const location = useLocation()
    const path = location.pathname

    useEffect(() => {
        feather.replace()
    }, [path])

    return (
        <>
            <div className='main-sidebar sidebar-style-2'>
                <aside id='sidebar-wrapper'>
                    <div className='sidebar-brand bg-[#264653] d-flex justify-content-center align-items-center'>
                        <a href='/dashboard'>
                            <img src='/public/logo.svg' alt='' />
                        </a>
                    </div>
                    <ul className='sidebar-menu'>
                        <li className='menu-header'>Main</li>
                        <li className={`dropdown${path === '/dashboard' ? ' active' : ''}`}>
                            <a href='/dashboard' className='nav-link'>
                                <i data-feather='monitor'></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className={path === '/addBlog' ? 'active' : ''}>
                            <a className='nav-link' href='/addBlog'>
                                <i data-feather='layout'></i>
                                <span>Add Blog</span>
                            </a>
                        </li>
                        <li className={path === '/viewBlogs' ? 'active' : ''}>
                            <a className='nav-link' href='/viewBlogs'>
                                <i data-feather='grid'></i>
                                <span>Blogs List</span>
                            </a>
                        </li>
                    </ul>
                    <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                        <a
                            href='/login'
                            className='nav-link d-flex align-items-center justify-content-center py-3'
                            style={{ borderTop: '1px solid #eee', color: '#264653' }}
                        >
                            <i data-feather='log-out' style={{ marginRight: 8 }}></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </aside>
            </div>
        </>
    )
}