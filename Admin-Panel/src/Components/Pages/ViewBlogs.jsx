import React, { useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import feather from 'feather-icons'

const blogs = [
    {
        id: 1,
        title: 'Create a mobile app',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab quae iure est perferendis commodi suscipit, iusto ad et delectus animi vitae distinctio? Temporibus facere, tempore quaerat omnis quasi deleniti vitae.',
        image: '/assets/img/users/user-5.png',
        date: '2018-01-20',
        time: '9:45 PM',
    },
]

export default function ViewBlogs() {
    const [modalData, setModalData] = useState(null)

    const handleViewMore = (blog) => {
        setModalData(blog)
    }

    const closeModal = () => {
        setModalData(null)
    }

    const FeatherIcon = ({ name, size = 24, className = '' }) => {
        const icon = feather.icons[name]
        if (!icon) return null

        const svg = icon.toSvg({
            width: size,
            height: size,
            class: className,
        })

        return <span dangerouslySetInnerHTML={{ __html: svg }} />
    }

    return (
        <>
            <div className='loader'></div>
            <div id='app'>
                <div className='main-wrapper main-wrapper-1'>
                    <Navbar />
                    <Sidebar />
                    {/* Main Content */}
                    <div className='main-content'>
                        <section className='section'>
                            <div className='section-body'>
                                <div className='flex flex-wrap -mx-2'>
                                    <div className='w-full px-2'>
                                        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                                            <div className='px-6 py-4 border-b border-gray-200'>
                                                <h4 className='text-lg font-semibold text-gray-800'>Published Blogs</h4>
                                            </div>
                                            <div className='p-6'>
                                                <div className='overflow-x-auto'>
                                                    <table className='min-w-full table-auto' id='table-1'>
                                                        <thead>
                                                            <tr className='bg-gray-50'>
                                                                <th className='w-12 px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                                    #
                                                                </th>
                                                                <th className='w-49 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                                    Blog Title
                                                                </th>
                                                                <th className='w-95 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                                    Description
                                                                </th>
                                                                <th className='w-30 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                                    Image
                                                                </th>
                                                                <th className='w-35 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                                    Upload Date
                                                                </th>
                                                                <th className='w-35 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                                    Upload Time
                                                                </th>
                                                                <th
                                                                    className='w-32 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                    colSpan={2}
                                                                >
                                                                    Actions
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='bg-white divide-y divide-gray-200'>
                                                            {blogs.map((blog, idx) => (
                                                                <tr key={blog.id} className='hover:bg-gray-50'>
                                                                    <td className='px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
                                                                        {idx + 1}
                                                                    </td>
                                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{blog.title}</td>
                                                                    <td className='px-6 py-4 text-sm text-gray-900'>
                                                                        {blog.description.length > 50 ? (
                                                                            <>
                                                                                <span className='block'>{blog.description.slice(0, 50)}...</span>
                                                                                <button
                                                                                    className='text-blue-600 hover:text-blue-800 text-xs mt-1 p-0 bg-transparent border-none cursor-pointer'
                                                                                    onClick={() => handleViewMore(blog)}
                                                                                >
                                                                                    View More
                                                                                </button>
                                                                            </>
                                                                        ) : (
                                                                            blog.description
                                                                        )}
                                                                    </td>
                                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                                        <img alt='blog' src={blog.image} className='w-15 h-15 rounded object-cover' />
                                                                    </td>
                                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{blog.date}</td>
                                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{blog.time}</td>
                                                                    <td className='whitespace-nowrap text-gray-900 text-center'>
                                                                        <button className='text-blue-600 rounded transition-colors flex justify-center items-center w-10 h-10 mx-auto'>
                                                                            <FeatherIcon name="edit-2" size={26} className="text-blue-600" />
                                                                        </button>
                                                                    </td>
                                                                    <td className='whitespace-nowrap text-gray-900 text-center'>
                                                                        <button className='text-red-600 rounded transition-colors flex justify-center items-center w-10 h-10 mx-auto'>
                                                                            <FeatherIcon name="trash-2" size={26} className="text-red-600" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Card */}
            {modalData && (
                <div className='fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-lg max-w-lg w-full max-h-96 overflow-y-auto shadow-xl relative'>
                        <button
                            onClick={closeModal}
                            className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-4xl font-bold bg-transparent border-none cursor-pointer w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100'
                        >
                            <FeatherIcon name="x" size={26} className="text-gray-400 hover:text-gray-600" />
                        </button>
                        <div className='p-6'>
                            <h4 className='text-lg font-semibold text-gray-900 mb-4 pr-8'>{modalData.title}</h4>
                            <img src={modalData.image} alt='blog' className='w-20 h-20 rounded object-cover mb-4' />
                            <p className='text-gray-700 leading-relaxed'>{modalData.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}