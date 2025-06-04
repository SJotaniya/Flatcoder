import { useState, useEffect, useRef } from 'react'
import NavBar from '../NavBar'
import Slider from '../Carousel'
import FooTer from '../Footer'
import ReactPage from '../Technologies/ReactPage'
import 'animate.css'
import { FaCode, FaUsers, FaRocket, FaGlobe } from 'react-icons/fa'

const useInView = (options = {}) => {
    const [inView, setInView] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    if (options.triggerOnce) {
                        observer.unobserve(element)
                    }
                } else if (!options.triggerOnce) {
                    setInView(false)
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px',
            }
        )

        observer.observe(element)

        return () => observer.unobserve(element)
    }, [options.threshold, options.rootMargin, options.triggerOnce])

    return [ref, inView]
}

export default function Home() {
    const [refCard1, inViewCard1] = useInView({ threshold: 0.1, triggerOnce: true })
    const [refCard2, inViewCard2] = useInView({ threshold: 0.1, triggerOnce: true })
    const [refSmallCards, inViewSmallCards] = useInView({ threshold: 0.1, triggerOnce: true })

    // counter implementation
    const [counters, setCounters] = useState({
        experience: 0,
        projects: 0,
        professionals: 0,
        countries: 0,
    })
    const [counterRef, counterInView] = useInView({ triggerOnce: true, threshold: 0.3 })
    const [hasStarted, setHasStarted] = useState(false)

    // Counter animation function
    useEffect(() => {
        if (counterInView && !hasStarted) {
            setHasStarted(true)

            const targetValues = {
                experience: 9,
                projects: 1000,
                professionals: 55,
                countries: 10,
            }

            const animateCounters = () => {
                const duration = 2000
                const startTime = Date.now()

                const updateCounters = () => {
                    const elapsed = Date.now() - startTime
                    const progress = Math.min(elapsed / duration, 1)

                    // for smooth animation
                    const easeOutCubic = 1 - Math.pow(1 - progress, 3)

                    setCounters({
                        experience: Math.floor(targetValues.experience * easeOutCubic),
                        projects: Math.floor(targetValues.projects * easeOutCubic),
                        professionals: Math.floor(targetValues.professionals * easeOutCubic),
                        countries: Math.floor(targetValues.countries * easeOutCubic),
                    })

                    if (progress < 1) {
                        requestAnimationFrame(updateCounters)
                    } else {
                        setCounters(targetValues)
                    }
                }

                requestAnimationFrame(updateCounters)
            }

            animateCounters()
        }
    }, [counterInView, hasStarted])

    // Counter Data
    const statsData = [
        {
            number: counters.experience,
            suffix: '+',
            label: 'Years of Experience',
            icon: FaCode,
            color: '#2A9D8F',
        },
        {
            number: counters.projects,
            suffix: '+',
            label: 'Successful Projects',
            icon: FaRocket,
            color: '#E76F51',
        },
        {
            number: counters.professionals,
            suffix: '+',
            label: 'Talented Professionals',
            icon: FaUsers,
            color: '#E9C46A',
        },
        {
            number: counters.countries,
            suffix: '+',
            label: 'Countries Served',
            icon: FaGlobe,
            color: '#F4A261',
        },
    ]

    // Company Cards Data
    const aboutCards = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            title: '9 years of experience',
            description:
                ' Web development experts since 2016, we craft powerful, custom experiences that transform visitors into customers. Over 55 strong, our team delivers tailored solutions from sophisticated web applications to high-converting e-commerce platforms, all designed for business growth',
            link: '#',
            reverse: false,
            category: 'EXPERIENCE',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            title: 'Why Choose Us?',
            description:
                'Our team holds knowledge in completing the projected goals and makes it possible to mold the ideas as per the market demands. We make websites & apps, we build tools to take your business to another level. We blend the experience, innovation & technology and make a masterpiece for you.',
            link: '#',
            reverse: true,
            category: 'EXCELLENCE',
        },
    ]

    // Small Cards Section Data
    const smallCards = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Website Development',
            description: 'We craft tailored websites by aligning technology with your brand, audience, and business goals.',
            link: '#',
            category: 'AI/ML',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Ai Development',
            description: 'Harness AI to streamline operations, improve decisions, and boost customer engagement and growth.',
            link: '#',
            category: 'CLOUD',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'E-commerce Solutions',
            description: 'We deliver scalable, customizable e-commerce platforms to maximize your online revenue.',
            link: '#',
            category: 'MOBILE',
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Support & Maintenance',
            description: 'We offer continuous updates, fixes, and support to keep all your digital solutions running at their best.',
            link: '#',
            category: 'SECURITY',
        },
    ]

    const aboutRefs = aboutCards.map(() => useInView({ threshold: 0.1, triggerOnce: true }))

    return (
        <>
            <NavBar />
            <Slider />

            {/* Project Statistics */}
            <div
                ref={counterRef}
                className='relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden font-primary'
                style={{
                    background: 'linear-gradient(135deg, #264653 0%, #2a9d8f 50%, #264653 100%)',
                }}
            >
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse'></div>
                    <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000'></div>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse delay-500'></div>
                </div>

                {/* Counter */}
                <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                    <div className='text-center mb-16'>
                        <h2 className='font-display text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-shadow-lg font-feature-settings tracking-tight'>
                            9 YEARS OF EXPERIENCE
                        </h2>
                        <p className='font-secondary text-2xl text-gray-200 max-w-2xl mx-auto mb-8 font-medium'>Web Development experts since 2015</p>
                        <div className='w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto'></div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20'>
                        {statsData.map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                                <div
                                    key={index}
                                    className={`counter-card group relative ${counterInView ? 'opacity-100 animate-fadeInUp' : 'opacity-0'}`}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className='relative text-center'>
                                        {/* Floating circles */}
                                        <div className='relative inline-block'>
                                            <div className='w-58 h-58 bg-gradient-to-br from-[#264653] to-[#2A9D8F] rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-[#2A9D8F]/30 group-hover:rotate-3'>
                                                <div className='w-50 h-50 bg-white rounded-full flex items-center justify-center relative overflow-hidden'>
                                                    {/* Icon background with color */}
                                                    <div className='absolute inset-0 opacity-10 rounded-full' style={{ backgroundColor: stat.color }}></div>

                                                    <div className='text-center z-10 relative'>
                                                        {/* Icon */}
                                                        <div className='mb-2 flex justify-center'>
                                                            <IconComponent
                                                                className='text-6xl transform group-hover:scale-110 transition-transform duration-300'
                                                                style={{ color: stat.color }}
                                                            />
                                                        </div>

                                                        {/* Number */}
                                                        <div className='text-5xl font-black text-[#264653] mb-1'>
                                                            {stat.number}
                                                            {stat.suffix}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decorative smaller circles with pulsing animation */}
                                            <div className='absolute -top-2 -right-2 w-8 h-8 bg-[#E9C46A] rounded-full opacity-80 animate-pulse'></div>
                                            <div
                                                className='absolute -bottom-2 -left-2 w-6 h-6 bg-[#E76F51] rounded-full opacity-60 animate-pulse'
                                                style={{ animationDelay: '1s' }}
                                            ></div>

                                            {/* Glowing effect on hover */}
                                            <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#2A9D8F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl'></div>
                                        </div>

                                        <div className='mt-6'>
                                            <p className='text-xl font-semibold text-white group-hover:text-gray-100 transition-colors duration-300'>
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* About Company Section */}
            <div className='bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 py-20 font-primary'>
                <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    {aboutCards.map((card, index) => {
                        const [ref, inView] = aboutRefs[index]
                        return (
                            <div
                                key={card.id}
                                ref={ref}
                                className={`relative flex flex-col ${
                                    card.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                } w-full mb-16 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-3xl transition-all duration-1000 overflow-hidden group hover:shadow-2xl hover:bg-white/80 ${
                                    inView ? 'animate__fadeInUp' : 'opacity-0 translate-y-10'
                                }`}
                            >
                                <div className='relative lg:w-1/2 shrink-0 overflow-hidden'>
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className='h-64 sm:h-80 lg:h-full w-full object-cover group-hover:scale-110 transition-transform duration-700'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                                </div>
                                <div className='flex flex-col justify-center p-8 lg:p-12'>
                                    <div className='mb-6 rounded-full bg-gradient-to-r from-orange-400 to-red-400 py-2 px-4 text-sm font-bold text-white w-fit shadow-lg font-primary tracking-wide'>
                                        {card.category}
                                    </div>
                                    <h4 className='mb-6 text-gray-800 text-2xl lg:text-4xl font-display font-black leading-tight tracking-tight'>
                                        {card.title}
                                    </h4>
                                    <p className='mb-8 text-gray-600 leading-relaxed text-lg font-secondary'>{card.description}</p>
                                    <div>
                                        <a
                                            href={card.link}
                                            className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-full hover:from-teal-400 hover:to-teal-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-primary tracking-wide'
                                        >
                                            Discover More
                                            <svg
                                                className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                            >
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Sticky Section */}
            <div
                className='relative bg-fixed bg-cover bg-center h-96 lg:h-screen flex items-center justify-center text-white overflow-hidden font-primary'
                style={{
                    backgroundImage: 'url("/Images/desk-1.jpg")',
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className='absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-800/80 to-slate-700/60'></div>

                <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center'>
                        <div className='mb-6 flex justify-center items-center space-x-8 opacity-90'>
                            <div className='flex items-center space-x-2 bg-teal-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-teal-400/30'>
                                <svg className='w-5 h-5 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                                <span className='text-sm font-medium text-teal-100'>4.2/5 Google Reviews</span>
                            </div>
                            <div className='flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-400/30'>
                                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                                <span className='text-sm font-medium text-orange-100'>5.0/5 Clutch Rating</span>
                            </div>
                        </div>

                        <div className='space-y-6'>
                            <p className='font-secondary text-xl lg:text-3xl text-gray-200 max-w-3xl mx-auto font-medium animate-fade-in-up'>
                                We Offer Comprehensive
                            </p>

                            <h3 className='font-display text-4xl lg:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 text-shadow-lg tracking-tight animate-fade-in-up animation-delay-200'>
                                Support, Solutions, and Services
                            </h3>

                            <div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-10'>
                                <button className='border-2 border-teal-400 hover:border-teal-300 text-teal-300 hover:text-white hover:bg-teal-500 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm'>
                                    <a href='https://maps.app.goo.gl/Sf4P6prDRs22XgDG8' target='_blank'>
                                        Learn More
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Small Cards Section */}
            <div className='bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 py-20 font-primary'>
                <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center mb-16'>
                        <h3 className='font-display text-3xl lg:text-4xl font-black text-gray-800 mb-4 tracking-tight'>Our Core Services</h3>
                        <p className='font-secondary text-lg text-gray-600 max-w-2xl mx-auto font-medium'>
                            Comprehensive technology solutions designed to accelerate your business growth
                        </p>
                        <div className='w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto mt-6'></div>
                    </div>

                    <div
                        ref={refSmallCards}
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
                            inViewSmallCards ? 'animate__fadeInUp' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        {smallCards.map((card, index) => (
                            <div key={card.id} className='group'>
                                <div className='bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:border-teal-300 hover:bg-white transition-all duration-500 overflow-hidden group-hover:scale-105 group-hover:-translate-y-2'>
                                    <a href={card.link} className='block'>
                                        <div className='aspect-video overflow-hidden relative'>
                                            <img
                                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                                src={card.image}
                                                alt={card.title}
                                            />
                                            <div className='absolute top-4 left-4'>
                                                <span className='bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-xs font-bold font-primary tracking-wide'>
                                                    {card.category}
                                                </span>
                                            </div>
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent'></div>
                                        </div>
                                    </a>
                                    <div className='p-6'>
                                        <a href={card.link}>
                                            <h5 className='mb-3 text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300 font-display tracking-tight'>
                                                {card.title}
                                            </h5>
                                        </a>
                                        <p className='mb-4 text-gray-600 leading-relaxed font-secondary'>{card.description}</p>
                                        <a
                                            href={card.link}
                                            className='inline-flex items-center px-4 py-2 text-sm font-bold text-teal-600 border border-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 group-hover:shadow-lg font-primary tracking-wide'
                                        >
                                            Learn More
                                            <svg className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' fill='none' viewBox='0 0 14 10'>
                                                <path
                                                    stroke='currentColor'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M1 5h12m0 0L9 1m4 4L9 9'
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <FooTer />

            {/* <ReactPage /> */}
        </>
    )
}
