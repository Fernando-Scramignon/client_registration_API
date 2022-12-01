export interface IClientCreation {
    name: string,
    username: string,
    password: string
}

export interface IClientListing {
    name: string,
    username: string,
    password: string,
    emails: Array<string>,
    phoneNumbers: Array<string>
}

export interface IClientLogin {
    username: string,
    password: string
}

export interface IClientToken {
    token: string
}