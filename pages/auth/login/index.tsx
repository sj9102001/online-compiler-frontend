"use client";
import Link from 'next/link';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showErrorToast, showSuccessToast } from '@/components/Toast';

type LoginPageProps = {
    showError: boolean;
    errorMessage: string;
}

const LoginPage = (props: LoginPageProps) => {

    const router = useRouter();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);


    const handleFormSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = {
            email: emailRef.current!.value,
            password: passwordRef.current!.value
        }
        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem("jwtToken", data.token);
                router.push('/dashboard');
            } else {
                showErrorToast(data.message);
            }
        } catch (error) {
            showErrorToast('An error occurred during login');
        }
    };
    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-start mt-12 px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            {'Sign in'}
                        </h1>
                        <form onSubmit={() => handleFormSubmit(event as SubmitEvent)} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input ref={passwordRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
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
                                {'Sign in'}
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                {'Don’t have an account yet?'}{' '}
                                <Link href="/auth/signup" className="font-medium text-primary-600 hover:underline">
                                    {'Sign up'}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default LoginPage;
