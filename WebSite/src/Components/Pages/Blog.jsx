import React from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'
import { useState } from 'react'
import { Calendar, User, ArrowRight, Heart } from 'lucide-react'

export default function Blog() {
    const [likedPosts, setLikedPosts] = useState(new Set())

    const toggleLike = (postId) => {
        const newLikedPosts = new Set(likedPosts)
        if (newLikedPosts.has(postId)) {
            newLikedPosts.delete(postId)
        } else {
            newLikedPosts.add(postId)
        }
        setLikedPosts(newLikedPosts)
    }

    const blogPosts = [
        {
            id: 1,
            title: 'The Art of Minimalist Design in 2025',
            excerpt: 'Exploring how less can truly be more in modern digital experiences, and why simplicity continues to drive user engagement.',
            author: 'Sarah Chen',
            date: 'June 2, 2025',
            readTime: '5 min read',
            category: 'Design',
            image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
            likes: 42,
        },
        {
            id: 2,
            title: 'Building Sustainable Tech Communities',
            excerpt: 'How to foster inclusive environments that support long-term growth and innovation in the technology sector.',
            author: 'Marcus Johnson',
            date: 'May 30, 2025',
            readTime: '8 min read',
            category: 'Community',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
            likes: 67,
        },
        {
            id: 3,
            title: 'The Future of Remote Work Culture',
            excerpt: 'Examining emerging trends and tools that are reshaping how we collaborate and maintain productivity across distributed teams.',
            author: 'Elena Rodriguez',
            date: 'May 28, 2025',
            readTime: '6 min read',
            category: 'Work',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop',
            likes: 89,
        },
    ]

    return (
        <>
            <NavBar />
            <div className='min-h-screen bg-gradient-to-br from-slate-50 to-stone-100'>
                {/* Hero Section */}
                <section className='relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-r from-green-800/10 to-teal-600/10'></div>
                    <div className='relative max-w-4xl mx-auto text-center'>
                        <h1 className='text-4xl md:text-6xl font-bold pt-5 mb-6 bg-gradient-to-r from-green-800 via-teal-600 to-yellow-500 bg-clip-text text-transparent leading-tight'>
                            Stories That Shape Tomorrow
                        </h1>
                        <p className='text-xl text-stone-600 mb-8 leading-relaxed'>
                            Discover insights, innovations, and ideas from thought leaders across design, technology, and culture.
                        </p>
                    </div>
                </section>

                {/* Blog Posts */}
                <section className='py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='grid gap-8 md:gap-12'>
                            {blogPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } flex flex-col md:flex`}
                                >
                                    <div className='md:w-1/2 relative overflow-hidden'>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className='w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                        />
                                        <div className='absolute top-4 left-4'>
                                            <span className='bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium'>
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='md:w-1/2 p-8 flex flex-col justify-between'>
                                        <div>
                                            <h2 className='text-2xl md:text-3xl font-bold text-green-800 mb-4 group-hover:text-teal-600 transition-colors'>
                                                {post.title}
                                            </h2>
                                            <p className='text-stone-600 mb-6 leading-relaxed text-lg'>{post.excerpt}</p>
                                        </div>

                                        <div className='space-y-4'>
                                            <div className='flex items-center justify-between text-sm text-stone-500'>
                                                <div className='flex items-center space-x-4'>
                                                    <div className='flex items-center space-x-2'>
                                                        <User className='h-4 w-4' />
                                                        <span>{post.author}</span>
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        <Calendar className='h-4 w-4' />
                                                        <span>{post.date}</span>
                                                    </div>
                                                </div>
                                                <span className='bg-stone-100 px-3 py-1 rounded-full'>{post.readTime}</span>
                                            </div>

                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center space-x-6 text-stone-500'>
                                                    <button
                                                        onClick={() => toggleLike(post.id)}
                                                        className={`flex items-center space-x-1 transition-colors ${
                                                            likedPosts.has(post.id) ? 'text-red-500' : 'hover:text-red-500'
                                                        }`}
                                                    >
                                                        <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                                        <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                                                    </button>
                                                </div>

                                                <button className='flex items-center space-x-2 text-teal-600 hover:text-green-700 transition-colors font-medium group'>
                                                    <span>Read More</span>
                                                    <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}
