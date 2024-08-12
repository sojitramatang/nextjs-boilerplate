import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import User from '@/modal/user'



export async function POST(request){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        
        //create token data
        const tokenData = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
        })
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}