import uuid4 from "uuid4";
import { NextResponse } from "next/server";

import User from '@/modal/user'



export async function POST(request){
    try {
        const reqBody = await request.json()
        const {firstname, lastname, email, password} = reqBody


        //check if user already exists
        const user = await User.findOne({where:{email}})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //create user verification email token
        const verifyToken = uuid4();

        const verifyTokenExpiry = Date.now() + 3600000 //1 hour

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password,
            verifyToken,
            verifyTokenExpiry
        })


        //send verification email
        // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})



        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser,
            verifyemail: `http://localhost:3000/verifyemail/${verifyToken}`
        })
        
        


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
