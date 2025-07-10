const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// PHPIPAM API configuration
const PHPIPAM_API = {
    url: process.env.PHPIPAM_URL,
    appId: process.env.PHPIPAM_APP_ID,
    username: process.env.PHPIPAM_USERNAME,
    password: process.env.PHPIPAM_PASSWORD
};

// Function to get authentication token
async function getAuthToken() {
    try {
        const response = await axios.post(`${PHPIPAM_API.url}/api/${PHPIPAM_API.appId}/user/`, {
            username: PHPIPAM_API.username,
            password: PHPIPAM_API.password
        });
        return response.data.data.token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        throw error;
    }
}

// API endpoint to get IP addresses
app.get('/api/ip-addresses', async (req, res) => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${PHPIPAM_API.url}/api/${PHPIPAM_API.appId}/addresses/`, {
            headers: {
                'token': token
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching IP addresses:', error);
        res.status(500).json({ error: 'Failed to fetch IP addresses' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>IP Address Management</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50">
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-6">IP Address Management</h1>
                
                <div class="mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Filter by Environment
                            </label>
                            <select id="environmentFilter" class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option value="">All Environments</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Filter by Owner
                            </label>
                            <select id="ownerFilter" class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option value="">All Owners</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Search
                            </label>
                            <input type="text" id="searchInput" placeholder="Search..." 
                                class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        </div>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    IP Address
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hostname
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Environment
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subnet
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Owner
                                </th>
                            </tr>
                        </thead>
                        <tbody id="ipTableBody" class="bg-white divide-y divide-gray-200">
                        </tbody>
                    </table>
                </div>
            </div>

            <script>
                let allIPs = [];
                let uniqueOwners = new Set();
                let uniqueEnvironments = new Set();

                async function fetchIPAddresses() {
                    try {
                        const response = await fetch('/api/ip-addresses');
                        const data = await response.json();
                        allIPs = data.data;
                        
                        // Extract unique owners and environments
                        uniqueOwners = new Set(allIPs.map(ip => ip.owner || 'Unknown'));
                        uniqueEnvironments = new Set(allIPs.map(ip => ip.description || 'Unknown'));
                        
                        // Populate owner filter dropdown
                        const ownerFilter = document.getElementById('ownerFilter');
                        ownerFilter.innerHTML = '<option value="">All Owners</option>';
                        uniqueOwners.forEach(owner => {
                            ownerFilter.innerHTML += \`<option value="\${owner}">\${owner}</option>\`;
                        });

                        // Populate environment filter dropdown
                        const environmentFilter = document.getElementById('environmentFilter');
                        environmentFilter.innerHTML = '<option value="">All Environments</option>';
                        uniqueEnvironments.forEach(env => {
                            environmentFilter.innerHTML += \`<option value="\${env}">\${env}</option>\`;
                        });

                        // Initial render
                        renderTable(allIPs);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }

                function renderTable(ips) {
                    const tableBody = document.getElementById('ipTableBody');
                    tableBody.innerHTML = '';
                    
                    ips.forEach(ip => {
                        const row = document.createElement('tr');
                        row.innerHTML = \`
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${ip.ip}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${ip.hostname || '-'}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${ip.description || '-'}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${ip.subnet || '-'}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${ip.owner || '-'}</td>
                        \`;
                        tableBody.appendChild(row);
                    });
                }

                function filterTable() {
                    const selectedOwner = document.getElementById('ownerFilter').value;
                    const selectedEnvironment = document.getElementById('environmentFilter').value;
                    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
                    
                    let filteredIPs = allIPs;
                    
                    // Filter by owner
                    if (selectedOwner) {
                        filteredIPs = filteredIPs.filter(ip => (ip.owner || 'Unknown') === selectedOwner);
                    }
                    
                    // Filter by environment
                    if (selectedEnvironment) {
                        filteredIPs = filteredIPs.filter(ip => ip.description === selectedEnvironment);
                    }
                    
                    // Filter by search term
                    if (searchTerm) {
                        filteredIPs = filteredIPs.filter(ip => 
                            (ip.ip && ip.ip.toLowerCase().includes(searchTerm)) ||
                            (ip.hostname && ip.hostname.toLowerCase().includes(searchTerm)) ||
                            (ip.description && ip.description.toLowerCase().includes(searchTerm)) ||
                            (ip.owner && ip.owner.toLowerCase().includes(searchTerm)) ||
                            (ip.subnet && ip.subnet.toLowerCase().includes(searchTerm))
                        );
                    }
                    
                    renderTable(filteredIPs);
                }

                // Event listeners
                document.getElementById('ownerFilter').addEventListener('change', filterTable);
                document.getElementById('environmentFilter').addEventListener('change', filterTable);
                document.getElementById('searchInput').addEventListener('input', filterTable);

                // Fetch IP addresses when page loads
                document.addEventListener('DOMContentLoaded', fetchIPAddresses);
            </script>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
