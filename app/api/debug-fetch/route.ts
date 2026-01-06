import { NextResponse } from 'next/server';
import { getAllNewsletters } from '@/app/lib/server-data';

export async function GET() {
    try {
        const data = await getAllNewsletters();
        return NextResponse.json({
            count: data.length,
            data: data,
            timestamp: new Date().toISOString()
        });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
