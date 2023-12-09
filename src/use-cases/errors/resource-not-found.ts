export class ResourceNotFound extends Error {
    //extendeu a classe do js
    constructor() {
        super('Resource was not found!')
    }
}