import React from 'react'
import { GiProgression } from 'react-icons/gi';
import { MdSecurity, MdSupport } from 'react-icons/md';
import { FaReact, FaCode, FaServer, FaMobileAlt, FaChartLine, FaUsers, FaHandshake } from 'react-icons/fa';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-[#2a9d8f] p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-2">
      <div className="text-[#e9c46a] mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-[#264653] p-6 rounded-lg shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-[#f4a261]">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default function ReactPage() {
    return (
        <>
            <div className='min-h-screen font-sans bg-[#264653] text-white'>
                {/* Hero Section */}
                <header className='relative bg-gradient-to-r from-[#264653] to-[#2a9d8f] py-20 px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-7xl mx-auto text-center'>
                        <h1 className='text-4xl md:text-6xl font-bold mb-6'>
                            Premier <span className='text-[#e9c46a]'>React.js</span> Development Company
                        </h1>
                        <p className='text-xl md:text-2xl max-w-3xl mx-auto mb-10'>
                            Building high-performance, scalable web applications with cutting-edge React technology
                        </p>
                        <button className='bg-[#e76f51] hover:bg-[#f4a261] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300'>
                            Get a Free Consultation
                        </button>
                    </div>
                </header>

                {/* Stats Section */}
                <section className='py-16 bg-[#2a9d8f]'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
                            <div className='p-6 bg-[#264653] rounded-lg shadow-lg'>
                                <div className='text-4xl font-bold text-[#e9c46a]'>150+</div>
                                <div className='mt-2'>Projects Delivered</div>
                            </div>
                            <div className='p-6 bg-[#264653] rounded-lg shadow-lg'>
                                <div className='text-4xl font-bold text-[#e9c46a]'>50+</div>
                                <div className='mt-2'>Happy Clients</div>
                            </div>
                            <div className='p-6 bg-[#264653] rounded-lg shadow-lg'>
                                <div className='text-4xl font-bold text-[#e9c46a]'>8+</div>
                                <div className='mt-2'>Years Experience</div>
                            </div>
                            <div className='p-6 bg-[#264653] rounded-lg shadow-lg'>
                                <div className='text-4xl font-bold text-[#e9c46a]'>40+</div>
                                <div className='mt-2'>Expert Developers</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className='py-20 bg-[#264653]'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
                            Our <span className='text-[#e9c46a]'>React.js</span> Development Services
                        </h2>

                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                            <ServiceCard
                                icon={<FaReact className='text-4xl' />}
                                title='Custom React Development'
                                description='Tailored React solutions designed to meet your specific business requirements and user needs.'
                            />
                            <ServiceCard
                                icon={<FaCode className='text-4xl' />}
                                title='Single Page Applications'
                                description="Fast, responsive SPAs that deliver seamless user experiences with React's powerful capabilities."
                            />
                            <ServiceCard
                                icon={<FaServer className='text-4xl' />}
                                title='Full-Stack Development'
                                description='End-to-end solutions combining React frontends with robust backend systems.'
                            />
                            <ServiceCard
                                icon={<FaMobileAlt className='text-4xl' />}
                                title='React Native Development'
                                description='Cross-platform mobile apps built with React Native for iOS and Android.'
                            />
                            <ServiceCard
                                icon={<GiProgression className='text-4xl' />}
                                title='Migration & Upgradation'
                                description='Modernize your legacy applications with React for better performance and maintainability.'
                            />
                            <ServiceCard
                                icon={<MdSecurity className='text-4xl' />}
                                title='Maintenance & Support'
                                description='Ongoing support to keep your React applications running smoothly and securely.'
                            />
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className='py-20 bg-[#2a9d8f]'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
                            Why Choose <span className='text-[#e76f51]'>Us</span>?
                        </h2>

                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            <FeatureCard
                                title='Expert Team'
                                description='Our React developers are certified experts with extensive experience in building complex applications.'
                                icon={<FaUsers className='text-3xl text-[#e9c46a]' />}
                            />
                            <FeatureCard
                                title='Performance Focused'
                                description='We optimize every component for maximum speed and efficiency in your React applications.'
                                icon={<FaChartLine className='text-3xl text-[#e9c46a]' />}
                            />
                            <FeatureCard
                                title='Agile Methodology'
                                description='We follow agile development practices to deliver incremental value with regular updates.'
                                icon={<GiProgression className='text-3xl text-[#e9c46a]' />}
                            />
                            <FeatureCard
                                title='Quality Assurance'
                                description='Rigorous testing at every stage ensures bug-free, high-quality React applications.'
                                icon={<MdSecurity className='text-3xl text-[#e9c46a]' />}
                            />
                            <FeatureCard
                                title='Dedicated Support'
                                description='Our team provides ongoing support and maintenance for your React applications.'
                                icon={<MdSupport className='text-3xl text-[#e9c46a]' />}
                            />
                            <FeatureCard
                                title='Client-Centric Approach'
                                description='We prioritize your business goals and user needs in every project we undertake.'
                                icon={<FaHandshake className='text-3xl text-[#e9c46a]' />}
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className='py-20 bg-gradient-to-r from-[#e76f51] to-[#f4a261]'>
                    <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
                        <h2 className='text-3xl md:text-4xl font-bold mb-6'>Ready to Build Your React Application?</h2>
                        <p className='text-xl mb-10'>Let's discuss how we can help you create a high-performance web application with React.js</p>
                        <button className='bg-[#264653] hover:bg-[#2a9d8f] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300'>
                            Get Started Today
                        </button>
                    </div>
                </section>
            </div>
        </>
    )
}