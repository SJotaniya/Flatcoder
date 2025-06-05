import React from 'react'

export default function Navbar() {
    return (
        <>
            <div className='navbar-bg'></div>
            <nav className='navbar navbar-expand-lg main-navbar sticky '>
                <div className='form-inline mr-auto'>
                    <ul className='navbar-nav mr-3'>
                        <li>
                            <a href='#' data-toggle='sidebar' className='nav-link nav-link-lg collapse-btn'>
                                <i data-feather='align-justify'></i>
                            </a>
                        </li>
                        <li>
                            <a href='#' className='nav-link nav-link-lg fullscreen-btn'>
                                <i data-feather='maximize'></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <ul className='navbar-nav navbar-right'>
                    <li className='dropdown'>
                        <form className='form-inline mr-auto'>
                            <div className='search-element'>
                                <input className='form-control' type='search' placeholder='Search' aria-label='Search' data-width='200' />
                                <button className='btn' type='submit'>
                                    <i className='fas fa-search'></i>
                                </button>
                            </div>
                        </form>
                    </li>
                </ul>
            </nav>
        </>
    )
}
