import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import User from '@/modal/user'


export async function GET(request) {
    try {
        let userId = null
        try {
            const token = request.cookies.get("token")?.value || '';
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            userId = decodedToken.id;
        } catch (error) {
            throw new Error(error.message);
        }

        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } })
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}