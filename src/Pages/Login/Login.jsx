import { useContext } from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import Swal from "sweetalert2";

import { Link, useLocation, useNavigate, } from "react-router-dom";

import { AuthContext } from "../../Provider/AuthProvider";
import auth from "../../Firebase/Firebase.Config";
import { FaGooglePlusG } from "react-icons/fa";
import { Helmet } from "react-helmet-async";


const Login = () => {

    const { signIn, } = useContext(AuthContext);

    const navigate = useNavigate()
    const location = useLocation()

    const googleProvider = new GoogleAuthProvider;


    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)


        signIn(email, password)
            .then(result => {


                navigate(location?.state ? location.state : '/')


                console.log(result.user)
                Swal.fire({
                    title: 'Success!',
                    text: 'Login SuccessFully',
                    icon: 'Success',
                    confirmButtonText: 'ok'
                })
                navigate(location?.state ? location?.state : '/')

            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    title: 'error',
                    text: 'provide a valid email and pass',
                    icon: 'error',
                    confirmButtonText: 'ok'
                })
            })
    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault()
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: 'Success!',
                    text: 'Login SuccessFully',
                    icon: 'Success',
                    confirmButtonText: 'ok'
                })
                navigate(location?.state ? location?.state : '/')
            })
            .catch(error => {
                console.log(error)
            })

    }





    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Login || FOod KIng</title>
                <meta name="description" content="Description of my page" />
                {/* Other meta tags */}
            </Helmet>
            <div className="hero-content flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold">Login now!</h1>

                </div>

                <div className="flex md:flex-row lg:flex-row flex-col">
                    <div>
                        <img src="https://img.freepik.com/premium-vector/flat-illustration-design-cybersecurity_9206-2585.jpg" alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className="space-y-2">
                                <button onClick={handleGoogleSignIn} className="btn btn-outline w-full"> <FaGooglePlusG size={24} className="mr-5"></FaGooglePlusG> Google Sign In</button>

                            </div>
                            <p>Don't Have an Account?<Link to="/register" className="text-blue-500">Register</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login