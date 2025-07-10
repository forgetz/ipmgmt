import { useState, useEffect } from 'react';
import { IPAddress } from '@/types';

export function useIPAddresses() {
    const [ipAddresses, setIPAddresses] = useState<IPAddress[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [usingMockData, setUsingMockData] = useState(false);

    useEffect(() => {
        const fetchIPAddresses = async () => {
            try {
                const response = await fetch('/api/ip-addresses');
                if (!response.ok) {
                    throw new Error('Failed to fetch IP addresses');
                }
                const data = await response.json();
                setIPAddresses(data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching IP addresses:', err);
                setError('Failed to fetch IP addresses');
                setLoading(false);
            }
        };

        fetchIPAddresses();
    }, []);

    return { ipAddresses, loading, error, usingMockData };
} 