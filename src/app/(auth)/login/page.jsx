"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    function onLogin(event) {
        event.preventDefault();
        fetch(`/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: event.currentTarget.email.value,
                password: event.currentTarget.password.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.success) {
                    // router.push('/dashboard');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <hr />
            <form onSubmit={onLogin}>
                <label htmlFor="email">email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    placeholder="email"
                />
                <label htmlFor="password">password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    placeholder="password"
                />
                <button

                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            </form>

            <Link href="/signup">Visit Signup page</Link>
        </div>
    )

}