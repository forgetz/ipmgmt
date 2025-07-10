export interface IPAddress {
    ip: string;
    hostname?: string;
    description?: string;
    subnet?: string;
    owner?: string;
    type?: string;
}

export interface PHPIPAMConfig {
    url: string;
    appId: string;
    username: string;
    password: string;
} 