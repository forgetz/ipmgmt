import axios from 'axios';
import { PHPIPAMConfig } from '../types';
import { getMockIPAddresses } from './mockData';

export class PHPIPAMService {
    private config: PHPIPAMConfig;
    private token: string | null = null;
    private useMockData: boolean;

    constructor(config: PHPIPAMConfig, useMockData: boolean = false) {
        this.config = config;
        this.useMockData = useMockData;
    }

    private async getAuthToken(): Promise<string> {
        if (this.token !== null) return this.token;

        try {
            const response = await axios.post(`${this.config.url}/api/${this.config.appId}/user/`, {
                username: this.config.username,
                password: this.config.password
            });
            const newToken = response.data.data.token;
            if (typeof newToken !== 'string') {
                throw new Error('Invalid token received from API');
            }
            this.token = newToken;
            return newToken;
        } catch (error) {
            console.error('Error getting auth token:', error);
            throw error;
        }
    }

    async getIPAddresses() {
        if (this.useMockData) {
            console.log('Using mock data');
            return getMockIPAddresses();
        }

        try {
            const token = await this.getAuthToken();
            const response = await axios.get(`${this.config.url}/api/${this.config.appId}/addresses/`, {
                headers: {
                    'token': token
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching IP addresses, falling back to mock data:', error);
            return getMockIPAddresses();
        }
    }
} 