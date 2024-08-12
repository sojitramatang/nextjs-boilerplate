"use client"
export default function SignUp(props) {

    function onSubmit(e) {
        e.preventDefault()
        let firstname = e.target.firstname.value.trim()
        let lastname = e.target.lastname.value.trim()
        let email = e.target.email.value.trim()
        let password = e.target.password.value.trim()
        fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, email, password })
        }).then(res => res.json()).then(data => {
            console.log(data)
        }).catch(err => {
            console.error(err)
        
        })
        // console.log('Submitted', e)
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <form className="flex flex-col items-center justify-center gap-2 text-black" onSubmit={onSubmit}>
                    <input type="text" placeholder="First Name" name="firstname" />
                    <input type="text" placeholder="Last Name" name="lastname" />
                    <input type="email" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <input type="password" placeholder="Confirm Password" name="confirm_password" />
                    <button type="submit" className="bg-blue-500 p-2 rounded-md">Sign Up</button>
                </form>
            </div>
        </>
    )
}