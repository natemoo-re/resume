export interface Company {
    company: string;
    role: string;
    time: string;
    description: string;
}
export interface Education {
    name: string;
    time: string;
}

export interface Link {
    text: string;
    url: string;
}

export interface About {
    name: string;
    status: string;
    about: string;
    email: string;
    companies: Company[];
    education: Education[];
    skills: {
        design: { [key: string]: string[] },
        development: { [key: string]: string[] },
        personal: string[]
    };
    links: { [key: string]: Link };
    oss: { [key: string]: Link };
    projects: { [key: string]: Link };
}