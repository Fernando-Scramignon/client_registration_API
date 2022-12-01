export function passwordPrunner(entityObject: any): object {
    const output = { ...entityObject }
    delete output.password
    return output
}

