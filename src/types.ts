export interface IPAddress {
    id: Number;
    ip: string;
    hostname: string;
    description: string;
    subnet: string;
    owner: string;
    note: string;
}

export interface PHPIPAMConfig {
    url: string;
    appId: string;
    username: string;
    password: string;
} 