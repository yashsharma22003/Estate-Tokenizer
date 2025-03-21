import { NextResponse} from 'next/server';
import { SiweMessage } from 'siwe';
import jwt from 'jsonwebtoken';

const JWT_SERCRET = "secret-key";

export async function POST(req) {

    try {
        const body = await req.json();
        const { message, signature } = body;

        const siweMessage = new SiweMessage(message);
        const verified  = await siweMessage.verify( { signature });

        if (!verified.success) {
            throw new Error('SIWE verification failed');
          }

        const payload = {
            address: siweMessage.address,
            cahinid: siweMessage.chainId,
        }

        const token = jwt.sign(payload, JWT_SERCRET, { expiresIn: '1h'});

        const response = NextResponse.json({ ok: true });
        response.cookies.set('session-token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60,
        });

        console.log(response)

        return response;

    } 
    catch (error) {
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 400});
    }

}