import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

export default function AddBlog() {
    return (
        <>
            <div class='loader'></div>
            <div id='app'>
                <div className='main-wrapper main-wrapper-1'>
                    <Navbar />
                    <Sidebar />
                    <div className='main-content'>
                        <section className='section'>
                            <div className='section-body'>
                                <div className='row'>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <div className='card'>
                                            <div className='card-header'>
                                                <h4>Create New Blog</h4>
                                            </div>
                                            <div className='card-body'>
                                                <div className='form-group'>
                                                    <label>Blog Title</label>
                                                    <input type='text' className='form-control' />
                                                </div>
                                                <div class='form-group'>
                                                    <label>Blog Description</label>
                                                    <textarea class='form-control'></textarea>
                                                </div>
                                                <div className='section-title'>Image</div>
                                                <div className='custom-file'>
                                                    <input type='file' className='custom-file-input' id='customFile' />
                                                    <label className='custom-file-label' htmlFor='customFile'>
                                                        Select Image
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='card-footer text-right'>
                                                <button className='btn btn-primary mr-1' type='submit'>
                                                    Submit
                                                </button>
                                                <button className='btn btn-secondary' type='reset'>
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
