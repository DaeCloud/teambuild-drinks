import { NextResponse } from 'next/server';

export async function GET() {
    if(!process.env.ENABLE_JOKES_API || process.env.ENABLE_JOKES_API !== 'true') {
        return NextResponse.json({ joke: null }, { status: 403 });
    }
    try {
        const resp = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await resp.json();
        return NextResponse.json({ joke: data.joke });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 'error', message: 'Failed to fetch joke' }, { status: 500 });
    }
}