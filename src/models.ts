export interface Company {
    company: string;
    role: string;
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
    skills: {
        design: string[],
        development: string[]
    };
    links: { [key: string]: Link };
    oss: { [key: string]: Link };
    projects: { [key: string]: Link };
}