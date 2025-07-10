import { IPAddress } from '../types';

export const mockIPAddresses: IPAddress[] = [
    // SIT Environment (10.252.3.0/24)
    {
        id: 1,
        ip: '10.252.3.1',
        hostname: 'sit-router1',
        description: 'SIT',
        subnet: '10.252.3.0/24',
        owner: 'Network Team',
        note: 'Primary router for SIT environment'
    },
    {
        id: 2,
        ip: '10.252.3.2',
        hostname: 'sit-app1',
        description: 'SIT',
        subnet: '10.252.3.0/24',
        owner: 'Dev Team',
        note: 'Application server for SIT environment'
    },
    {
        id: 3,
        ip: '10.252.3.3',
        hostname: 'sit-db1',
        description: 'SIT',
        subnet: '10.252.3.0/24',
        owner: 'DB Team',
        note: 'Database server for SIT environment'
    },

    // UAT Environment (10.252.3.0/24)
    {
        id: 4,
        ip: '10.252.3.101',
        hostname: 'uat-router1',
        description: 'UAT',
        subnet: '10.252.3.0/24',
        owner: 'Network Team',
        note: 'Primary router for UAT environment'
    },
    {
        id: 5,
        ip: '10.252.3.102',
        hostname: 'uat-app1',
        description: 'UAT',
        subnet: '10.252.3.0/24',
        owner: 'Dev Team',
        note: 'Application server for UAT environment'
    },
    {
        id: 6,
        ip: '10.252.3.103',
        hostname: 'uat-db1',
        description: 'UAT',
        subnet: '10.252.3.0/24',
        owner: 'DB Team',
        note: 'Database server for UAT environment'
    },

    // PreProd Environment (10.252.3.0/24)
    {
        id: 7,
        ip: '10.252.3.201',
        hostname: 'preprod-router1',
        description: 'PreProd',
        subnet: '10.252.3.0/24',
        owner: 'Network Team',
        note: 'Primary router for PreProd environment'
    },
    {
        id: 8,
        ip: '10.252.3.202',
        hostname: 'preprod-app1',
        description: 'PreProd',
        subnet: '10.252.3.0/24',
        owner: 'Dev Team',
        note: 'Application server for PreProd environment'
    },
    {
        id: 9,
        ip: '10.252.3.203',
        hostname: 'preprod-db1',
        description: 'PreProd',
        subnet: '10.252.3.0/24',
        owner: 'DB Team',
        note: 'Database server for PreProd environment'
    },

    // Prod Environment (10.252.7.0/24)
    {
        id: 10,
        ip: '10.252.7.1',
        hostname: 'prod-router1',
        description: 'Prod',
        subnet: '10.252.7.0/24',
        owner: 'Network Team',
        note: 'Primary router for Production environment'
    },
    {
        id: 11,
        ip: '10.252.7.2',
        hostname: 'prod-app1',
        description: 'Prod',
        subnet: '10.252.7.0/24',
        owner: 'Dev Team',
        note: 'Application server for Production environment'
    },
    {
        id: 12,
        ip: '10.252.7.3',
        hostname: 'prod-db1',
        description: 'Prod',
        subnet: '10.252.7.0/24',
        owner: 'DB Team',
        note: 'Database server for Production environment'
    },

    // DR Environment (10.252.129.0/24)
    {
        id: 13,
        ip: '10.252.129.1',
        hostname: 'dr-router1',
        description: 'DR',
        subnet: '10.252.129.0/24',
        owner: 'Network Team',
        note: 'Primary router for DR environment'
    },
    {
        id: 14,
        ip: '10.252.129.2',
        hostname: 'dr-app1',
        description: 'DR',
        subnet: '10.252.129.0/24',
        owner: 'Dev Team',
        note: 'Application server for DR environment'
    },
    {
        id: 15,
        ip: '10.252.129.3',
        hostname: 'dr-db1',
        description: 'DR',
        subnet: '10.252.129.0/24',
        owner: 'DB Team',
        note: 'Database server for DR environment'
    }
];

export const getMockIPAddresses = (): Promise<{ data: IPAddress[] }> => {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve({ data: mockIPAddresses });
        }, 500);
    });
}; 