import { NextResponse } from 'next/server';

export async function GET() {
    try {

        return NextResponse.json({ deployment: process.env.DEPLOYMENT || 'undefined', version: process.env.APP_VERSION || 'undefined' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 'error', message: 'Database error' }, { status: 500 });
    }
}
