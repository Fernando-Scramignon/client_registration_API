import { IClientListing } from "../../interfaces/client.interface"

export function passwordPrunner(entityObject: any): IClientListing {
    const output = { ...entityObject }
    delete output.password
    return output
}

