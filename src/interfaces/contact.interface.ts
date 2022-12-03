export interface IContactCreation {
    name: string,
    emailAddress: string,
    phoneNumber: string
}

export interface IContactUpdate {
    name: string
}

export interface IContactEmailCreation {
    emailAddress: string,
    isMain?: boolean
}

export interface IContactPhoneNumberCreation {
    phoneNumber: string,
    isMain?: boolean
}