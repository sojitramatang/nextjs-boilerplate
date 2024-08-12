"use client"

export default function VerifyEmail({ params }) {

    function verifyEmail() {
        fetch(`/api/user/verifyemail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: params.token }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className="h-screen">
            <div>My verify email token: {params.token}</div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={verifyEmail}>
                Verify Email
            </button>
        </div>
    )
  }