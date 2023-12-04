

export class UserAlreadyExists extends Error {
    //extendeu a classe do js
    constructor() {
        super('Email Already Exists')
    }
}