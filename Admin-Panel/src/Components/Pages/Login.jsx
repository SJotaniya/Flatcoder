import React from 'react'

export default function Login() {
    return (
        <>
            <div className='loader'></div>
            <div id='app'>
                <section className='section'>
                    <div className='container mt-5'>
                        <div className='row'>
                            <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4'>
                                <div className='card card-primary'>
                                    <div className='card-header justify-content-center'>
                                        <h4>Login</h4>
                                    </div>
                                    <div className='card-body'>
                                        <form method='POST' action='#' className='needs-validation' noValidate=''>
                                            <div className='form-group'>
                                                <label htmlFor='email'>Email</label>
                                                <input id='email' type='email' className='form-control' name='email' tabIndex='1' required autoFocus />
                                                <div className='invalid-feedback'>Please fill in your email</div>
                                            </div>
                                            <div className='form-group'>
                                                <div className='d-block'>
                                                    <label htmlFor='password' className='control-label'>
                                                        Password
                                                    </label>
                                                    <div className='float-right'>
                                                        <a href='auth-forgot-password.html' className='text-small'>
                                                            Forgot Password?
                                                        </a>
                                                    </div>
                                                </div>
                                                <input id='password' type='password' className='form-control' name='password' tabIndex='2' required />
                                                <div className='invalid-feedback'>please fill in your password</div>
                                            </div>
                                            <div className='form-group'>
                                                <div className='custom-control custom-checkbox'>
                                                    <input type='checkbox' name='remember' className='custom-control-input' tabIndex='3' id='remember-me' />
                                                    <label className='custom-control-label' htmlFor='remember-me'>
                                                        Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='form-group'>
                                                <button type='submit' className='btn btn-primary btn-lg btn-block' tabIndex='4'>
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='mt-5 text-muted text-center'>
                                    Don't have an account? <a href='/register'>Create One</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
