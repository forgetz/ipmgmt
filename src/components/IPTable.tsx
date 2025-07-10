import { IPAddress } from '@/types';
import { useState, useMemo } from 'react';

interface IPTableProps {
    ipAddresses: IPAddress[];
}

export default function IPTable({ ipAddresses }: IPTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedOwner, setSelectedOwner] = useState('');

    // Get unique descriptions and owners for filter dropdowns
    const uniqueDescriptions = useMemo(() => 
        Array.from(new Set(ipAddresses.map(ip => ip.description))), 
        [ipAddresses]
    );
    
    const uniqueOwners = useMemo(() => 
        Array.from(new Set(ipAddresses.map(ip => ip.owner))), 
        [ipAddresses]
    );

    // Filter IP addresses based on search term and selected filters
    const filteredIPs = useMemo(() => {
        return ipAddresses.filter(ip => {
            const matchesSearch = searchTerm === '' || 
                ip.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ip.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ip.subnet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ip.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ip.note.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDescription = selectedDescription === '' || 
                ip.description === selectedDescription;

            const matchesOwner = selectedOwner === '' || 
                ip.owner === selectedOwner;

            return matchesSearch && matchesDescription && matchesOwner;
        });
    }, [ipAddresses, searchTerm, selectedDescription, selectedOwner]);

    return (
        <div className="space-y-4">
            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search
                    </label>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Description
                    </label>
                    <select
                        value={selectedDescription}
                        onChange={(e) => setSelectedDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Descriptions</option>
                        {uniqueDescriptions.map(desc => (
                            <option key={desc} value={desc}>{desc}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Owner
                    </label>
                    <select
                        value={selectedOwner}
                        onChange={(e) => setSelectedOwner(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Owners</option>
                        {uniqueOwners.map(owner => (
                            <option key={owner} value={owner}>{owner}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-500">
                Showing {filteredIPs.length} of {ipAddresses.length} IP addresses
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                IP Address
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hostname
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subnet
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Owner
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Note
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredIPs.map((ip) => (
                            <tr key={ip.id.toString()} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {ip.ip}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ip.hostname}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ip.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ip.subnet}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ip.owner}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ip.note}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 