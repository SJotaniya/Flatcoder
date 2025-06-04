import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BlogPage() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/blogs')
            .then((res) => res.json())
            .then(setBlogs)
    }, [])

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow'>
            <h2 className='text-2xl font-bold mb-6'>All Blogs</h2>
            <table className='min-w-full table-auto border'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-4 py-2 border'>Title</th>
                        <th className='px-4 py-2 border'>Description</th>
                        <th className='px-4 py-2 border'>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog._id}>
                            <td className='px-4 py-2 border'>{blog.title}</td>
                            <td className='px-4 py-2 border'>{blog.description}</td>
                            <td className='px-4 py-2 border'>
                                {blog.image && <img src={`http://localhost:27017${blog.image}`} alt={blog.title} className='h-16 w-16 object-cover' />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BlogPage
