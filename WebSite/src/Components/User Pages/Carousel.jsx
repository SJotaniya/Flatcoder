import React, { useEffect, useState, useRef } from 'react'
import 'animate.css/animate.min.css'

export default function Carousel() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const autoPlayRef = useRef(null)
    const totalSlides = 7

    const slides = [
        {
            id: 1,
            image: '/Images/web.jpg',
            title: 'Website Development',
            description: 'Wordpress ◦ Webflow ◦ SquareSpace ◦ Wix',
        },
        {
            id: 2,
            image: '/Images/img-2.jpg',
            title: 'E-Commerce Development',
            description: 'Shopify Plus ◦ Shopify ◦ BigCommerce ◦ Headless Commerce',
        },
        {
            id: 3,
            image: '/Images/img-3.jpg',
            title: 'Headless CMS Development',
            description: 'Next.js ◦ Gatsby ◦ WordPress ◦ Shopify ◦ Strapi',
        },
        {
            id: 4,
            image: '/Images/img-4.jpg',
            title: 'Support & Maintenance',
            description: 'Security & Updates ◦ Monitoring & Error Tracking ',
        },
        {
            id: 5,
            image: '/Images/img-5.jpg',
            title: 'Performance Optimization',
            description: 'Page Load Time Reduction ◦ Lazy Loading ◦ Caching & CDN Setup',
        },
        {
            id: 6,
            image: '/Images/img-6.jpg',
            title: 'Ai Solutions',
            description: 'AI-Powered Automation ◦ AI Chatbots ◦ Predictive Analytics',
        },
        {
            id: 7,
            image: '/Images/img-6.jpg',
            title: 'Accessibility',
            description: 'Accessibility Audits',
        },
    ]

    // Auto-play functionality
    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % totalSlides)
        }, 5000)

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [totalSlides])

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % totalSlides)
    }

    const previousSlide = () => {
        setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const goToSlide = (index) => {
        setCurrentSlideIndex(index)
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                previousSlide()
            } else if (e.key === 'ArrowRight') {
                nextSlide()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className='relative w-full h-screen overflow-hidden'>
            {/* Full Size Image Background */}
            <div className='absolute inset-0'>
                <img
                    key={slides[currentSlideIndex].id}
                    src={slides[currentSlideIndex].image}
                    alt={slides[currentSlideIndex].title}
                    className='w-full h-full object-cover animate-mainImage'
                />

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent'></div>
            </div>

            {/* Content Overlay */}
            <div className='relative z-10 h-full flex flex-col justify-end pb-32 pt-16'>
                <div className='text-center text-white px-4'>
                    <h2
                        key={`title-${currentSlideIndex}`}
                        className='text-4xl md:text-6xl mb-4 font-light tracking-wide animate__animated animate__fadeInUp font-primary'
                    >
                        {slides[currentSlideIndex].title}
                    </h2>
                    <p
                        key={`desc-${currentSlideIndex}`}
                        className='text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-90 animate__animated animate__fadeInUp animate__delay-200ms font-secondary'
                    >
                        {slides[currentSlideIndex].description}
                    </p>
                </div>
            </div>

            {/* Preview Slides */}
            <div
                className='hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 h-3/6 w-1/4 bg-cover bg-center bg-no-repeat opacity-70 transition-all duration-700 cursor-pointer rounded-2xl overflow-hidden hover:opacity-90 hover:scale-105 z-10 border-2 border-[#E9C46A]/40'
                style={{ backgroundImage: `url(${slides[currentSlideIndex === 0 ? totalSlides - 1 : currentSlideIndex - 1].image})` }}
                onClick={previousSlide}
            />

            <div
                className='hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 h-3/6 w-1/4 bg-cover bg-center bg-no-repeat opacity-70 transition-all duration-700 cursor-pointer rounded-2xl overflow-hidden hover:opacity-90 hover:scale-105 z-10 border-2 border-[#E9C46A]/40'
                style={{ backgroundImage: `url(${slides[currentSlideIndex === totalSlides - 1 ? 0 : currentSlideIndex + 1].image})` }}
                onClick={nextSlide}
            />

            {/* Navigation Arrows */}
            <button
                onClick={previousSlide}
                className='absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-[#264653]/60 cursor-pointer backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-full z-20 transition-all duration-300 flex items-center justify-center text-[#E9C46A] hover:bg-[#2A9D8F]/60 hover:scale-110 hover:text-[#F4A261] group border border-[#E9C46A]/30'
            >
                <svg className='w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'></path>
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className='absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-[#264653]/60 cursor-pointer backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-full z-20 transition-all duration-300 flex items-center justify-center text-[#E9C46A] hover:bg-[#2A9D8F]/60 hover:scale-110 hover:text-[#F4A261] group border border-[#E9C46A]/30'
            >
                <svg className='w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20'>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentSlideIndex
                                ? 'bg-[#E9C46A] opacity-100 scale-125 shadow-lg shadow-[#E9C46A]/50'
                                : 'bg-white/50 hover:bg-[#F4A261]/70 hover:scale-110'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
