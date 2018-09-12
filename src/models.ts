interface Link {
    text: string;
    url: string;
}

export interface About {
    name: string,
    links: {
        twitter: Link;
        github: Link;
        npm: Link;
    }
}