'use client';

import { useIPAddresses } from '@/hooks/useIPAddresses';
import IPTable from '@/components/IPTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import MockDataWarning from '@/components/MockDataWarning';

export default function Home() {
    const { ipAddresses, loading, error, usingMockData } = useIPAddresses();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">IP Address Management</h1>
                        {usingMockData && <MockDataWarning />}
                    </div>
                    <IPTable ipAddresses={ipAddresses} />
                </div>
            </div>
        </main>
    );
} 