import React, { useState, useEffect, useRef } from 'react'

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [currentPath, setCurrentPath] = useState('/')
    const [activeDropdown, setActiveDropdown] = useState(null)
    const dropdownTimeoutRef = useRef(null)
    const navRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false)
                setActiveDropdown(null)
            }
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false)
                setActiveDropdown(null)
            }
        }

        window.addEventListener('scroll', handleScroll)
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
        
        // Set initial path
        setCurrentPath(window.location.pathname)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current)
            }
        }
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        setActiveDropdown(null)
    }

    const isActivePage = (href) => {
        if (href === '/' && currentPath === '/') return true
        if (href !== '/' && currentPath.startsWith(href)) return true
        return false
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
        setActiveDropdown(null)
    }

    const handleDropdownEnter = (name) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current)
        }
        setActiveDropdown(name)
    }

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null)
        }, 150) // Small delay to prevent flickering
    }

    const toggleMobileDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name)
    }

    // Dropdown content data
    const dropdownContent = {
        services: {
            title: 'Services',
            items: [
                'Website Development',
                'E-Commerce Development',
                'Headless CMS Development',
                'Support & Maintenance',
                'Performance & Optimization',
                'AI Solutions',
                'Accessibility',
            ],
        },
        technologies: {
            title: 'Technologies',
            columns: [
                {
                    title: 'Front-End',
                    items: ['React JS', 'Angular JS', 'Vue JS', 'Next JS', 'Gatsby JS', 'Mentor JS'],
                },
                {
                    title: 'CMS',
                    items: ['WordPress', 'Shopify', 'BigCommerce', 'Craft CMS'],
                },
                {
                    title: 'Headless',
                    items: ['Strapi', 'Builder.io'],
                },
                {
                    title: 'Back-End',
                    items: ['PHP', 'Laravel', 'Node.js'],
                },
                {
                    title: 'No-Code',
                    items: ['Webflow', 'Squarespace', 'Wix'],
                },
            ],
        },
        work: {
            title: 'Work',
            items: [
                'A11yPro',
                'Instasync Pro',
                'Shopify Schema Builder',
            ],
        },
        about: {
            title: 'About',
            items: [
                'Career',
                'Company Profile',
                'Life At Encircle',
                'How We Work',
            ],
        },
    }

    const navigationItems = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services', dropdown: 'services' },
        { name: 'Technologies', href: '/technologies', dropdown: 'technologies' },
        { name: 'Work', href: '/work', dropdown: 'work' },
        { name: 'About Us', href: '/about', dropdown: 'about' },
        { name: 'Blog', href: '/blog' },
    ]

    return (
        <nav
            ref={navRef}
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-black/95 shadow-lg backdrop-blur-md border-b border-white/10' 
                    : 'bg-black/50 backdrop-blur-sm'
            }`}
            role="navigation"
            aria-label="Main navigation"
        >
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16 md:h-20'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <a 
                            href='/' 
                            className='flex items-center space-x-2 transition-all duration-200 hover:scale-105'
                            aria-label="Encircle - Home"
                        >
                            <img src="/public/Images/logo.svg" className='h-19' alt="" />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center justify-center flex-1'>
                        <div className='flex items-center space-x-1'>
                            {navigationItems.map((item) => {
                                const isActive = isActivePage(item.href)
                                return (
                                    <div key={item.name} className='relative group'>
                                        <a
                                            href={item.href}
                                            className={`relative px-4 py-2 text-md font-medium transition-all duration-200 rounded-lg ${
                                                isActive 
                                                    ? 'text-[#EDA800] bg-[#EDA800]/10' 
                                                    : 'text-white hover:text-[#EDA800] hover:bg-white/10'
                                            }`}
                                            onMouseEnter={() => item.dropdown && handleDropdownEnter(item.dropdown)}
                                            onMouseLeave={item.dropdown ? handleDropdownLeave : undefined}
                                            aria-haspopup={item.dropdown ? "true" : "false"}
                                            aria-expanded={item.dropdown && activeDropdown === item.dropdown ? "true" : "false"}
                                        >
                                            {item.name}
                                            {item.dropdown && (
                                                <svg 
                                                    className={`ml-1 inline-block w-4 h-4 transition-transform duration-200 ${
                                                        activeDropdown === item.dropdown ? 'rotate-180' : ''
                                                    }`} 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                            {isActive && (
                                                <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#EDA800] rounded-full'></div>
                                            )}
                                        </a>

                                        {/* Desktop Dropdown Menu */}
                                        {item.dropdown && activeDropdown === item.dropdown && (
                                            <div
                                                className={`absolute left-0 mt-2 bg-black/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-800/50 z-50 animate-in slide-in-from-top-2 duration-200 ${
                                                    item.dropdown === 'technologies' ? 'w-[52rem] p-6' : 'w-80 p-4'
                                                }`}
                                                onMouseEnter={() => {
                                                    if (dropdownTimeoutRef.current) {
                                                        clearTimeout(dropdownTimeoutRef.current)
                                                    }
                                                }}
                                                onMouseLeave={handleDropdownLeave}
                                            >
                                                {/* Technologies Dropdown */}
                                                {item.dropdown === 'technologies' && (
                                                    <div>
                                                        {/* <h3 className='text-xl font-bold text-[#EDA800] mb-6 text-center'>
                                                            {dropdownContent.technologies.title}
                                                        </h3> */}
                                                        <div className='grid grid-cols-5 gap-6'>
                                                            {dropdownContent.technologies.columns.map((column, colIndex) => (
                                                                <div key={colIndex} className='space-y-3'>
                                                                    <h4 className='font-semibold text-white text-base mb-3'>{column.title}</h4>
                                                                    <ul className='space-y-2'>
                                                                        {column.items.map((tech, techIndex) => (
                                                                            <li key={techIndex}>
                                                                                <a
                                                                                    href={`/technologies/${tech.toLowerCase().replace(/ /g, '-').replace('.', '')}`}
                                                                                    className='block text-base text-gray-300 hover:text-[#EDA800] transition-colors duration-200 hover:translate-x-1 transform'
                                                                                >
                                                                                    {tech}
                                                                                </a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Other Dropdowns */}
                                                {item.dropdown !== 'technologies' && (
                                                    <div>
                                                        {/* <h3 className='text-xl font-bold text-[#EDA800] mb-4 text-left'>
                                                            {dropdownContent[item.dropdown].title}
                                                        </h3> */}
                                                        <ul className='space-y-2'>
                                                            {dropdownContent[item.dropdown].items.map((option, index) => (
                                                                <li key={index}>
                                                                    <a
                                                                        href={`/${item.dropdown}/${option.toLowerCase().replace(/ /g, '-')}`}
                                                                        className='block p-3 text-base text-white hover:text-[#EDA800] hover:bg-white/10 transition-all duration-200 rounded-lg text-left'
                                                                    >
                                                                        {option}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
              
                    {/* Contact Us Button - Enhanced */}
                    <div className="hidden lg:block">
                        <a
                            href='/contact'
                            className='relative inline-flex items-center px-6 py-2.5 border-2 border-teal-400 text-teal-300 font-semibold rounded-full transition-all duration-300 hover:border-teal-300 hover:text-white hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/25 transform hover:scale-105 backdrop-blur-sm overflow-hidden group'
                        >
                            <span className="relative z-10">Contact Us</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleMenu} 
                        className='lg:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EDA800]/50' 
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                    >
                        <div className='w-6 h-6 flex flex-col justify-center items-center'>
                            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></div>
                            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></div>
                            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className='py-4 space-y-1 border-t border-white/20'>
                        {[...navigationItems, { name: 'Contact Us', href: '/contact' }].map((item) => {
                            const isActive = isActivePage(item.href)
                            const hasDropdown = item.dropdown && dropdownContent[item.dropdown]
                            const isDropdownOpen = activeDropdown === item.dropdown
                            
                            return (
                                <div key={item.name}>
                                    <div className="flex items-center">
                                        <a
                                            href={item.href}
                                            onClick={hasDropdown ? (e) => e.preventDefault() : closeMenu}
                                            className={`flex-1 block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg mx-2 ${
                                                isActive 
                                                    ? 'text-[#EDA800] bg-[#EDA800]/10' 
                                                    : 'text-white hover:text-[#EDA800] hover:bg-white/10'
                                            }`}
                                        >
                                            {item.name}
                                        </a>
                                        {hasDropdown && (
                                            <button
                                                onClick={() => toggleMobileDropdown(item.dropdown)}
                                                className="p-3 mr-2 text-white hover:text-[#EDA800] transition-colors"
                                                aria-label={`Toggle ${item.name} submenu`}
                                            >
                                                <svg 
                                                    className={`w-4 h-4 transition-transform duration-200 ${
                                                        isDropdownOpen ? 'rotate-180' : ''
                                                    }`} 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {/* Mobile Dropdown Content */}
                                    {hasDropdown && isDropdownOpen && (
                                        <div className='pl-6 pr-2 py-2 mx-2 bg-white/5 rounded-lg mt-1'>
                                            {item.dropdown === 'technologies' ? (
                                                <div className='space-y-4'>
                                                    {dropdownContent.technologies.columns.map((column, colIndex) => (
                                                        <div key={colIndex} className='space-y-2'>
                                                            <h4 className='font-semibold text-white text-sm'>{column.title}</h4>
                                                            <ul className='space-y-1 pl-6'>
                                                                {column.items.map((tech, techIndex) => (
                                                                    <li key={techIndex}>
                                                                        <a
                                                                            href={`/technologies/${tech.toLowerCase().replace(/ /g, '-').replace('.', '')}`}
                                                                            onClick={closeMenu}
                                                                            className='block py-1 text-sm text-gray-300 hover:text-[#EDA800] transition-colors'
                                                                        >
                                                                            {tech}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <ul className='space-y-2'>
                                                    {dropdownContent[item.dropdown].items.map((option, index) => (
                                                        <li key={index}>
                                                            <a
                                                                href={`/${item.dropdown}/${option.toLowerCase().replace(/ /g, '-')}`}
                                                                onClick={closeMenu}
                                                                className='block p-2 text-gray-300 hover:text-[#EDA800] rounded transition-colors'
                                                            >
                                                                {option}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] animate-in fade-in duration-200' 
                    onClick={closeMenu} 
                    aria-hidden='true'
                />
            )}
        </nav>
    )
}