"use client";
import { showErrorToast, showSuccessToast } from '@/components/Toast';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
const AuthPage = () => {
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    const checkForm = (formData: {
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    }) => {
        return formData.password === formData.confirmPassword
    }

    const handleFormSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = {
            username: usernameRef.current!.value,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
            confirmPassword: confirmPasswordRef.current!.value,
        }
        if (checkForm(formData) === false) {
            showErrorToast("Password and Confirm Password should match");
            return;
        }
        try {
            // Make a POST request to your signup API
            const response = await fetch('http://localhost:8080/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.status === 201) {
                showSuccessToast(data.message);
                router.push('/auth/login');
            } else {
                showErrorToast(data.message);
            }
        } catch (error) {
            showErrorToast("Internal Server Error");
        }
    };
    return (

        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-start mt-12 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-2 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            {'Sign up for an account'}
                        </h1>
                        <form onSubmit={() => handleFormSubmit(event as SubmitEvent)} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Enter username</label>
                                <input ref={usernameRef} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="username" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter email</label>
                                <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input ref={passwordRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                <input ref={confirmPasswordRef} type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                {'Sign up'}
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                {'Already have an account?'}{' '}
                                <Link href="/auth/login" className="font-medium text-primary-600 hover:underline">
                                    {'Sign in'}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default AuthPage;
