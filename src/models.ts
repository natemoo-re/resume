export interface Link {
    text: string;
    url: string;
}

export interface About {
    name: string;
    links: { [key: string]: Link };
    oss: { [key: string]: Link };
    projects: { [key: string]: Link };
}