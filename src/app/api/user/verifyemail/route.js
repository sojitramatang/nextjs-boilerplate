import uuid4 from "uuid4";
import { NextResponse } from "next/server";
import { Op } from 'sequelize'

import User from '@/modal/user'

export async function POST(request) {

    try {
        const reqBody = await request.json()
        const { token } = reqBody

        const user = await User.findOne({
            where: {
                verifyToken: token, 
                verifyTokenExpiry: { [Op.gt]: Date.now() }

            } 
        });
        
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        user.isVerfied = true;
        user.verifyToken = null;
        user.verifyTokenExpiry = null;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}