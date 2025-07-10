import { NextResponse } from 'next/server';
import { PHPIPAMService } from '@/lib/phpipam';

export async function GET() {
    try {
        const phpipamService = new PHPIPAMService({
            url: process.env.NEXT_PUBLIC_PHPIPAM_URL || '',
            appId: process.env.NEXT_PUBLIC_PHPIPAM_APP_ID || '',
            username: process.env.NEXT_PUBLIC_PHPIPAM_USERNAME || '',
            password: process.env.NEXT_PUBLIC_PHPIPAM_PASSWORD || ''
        });

        const data = await phpipamService.getIPAddresses();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching IP addresses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch IP addresses' },
            { status: 500 }
        );
    }
} 