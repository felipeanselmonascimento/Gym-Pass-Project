export class InvalidCredentialErrors extends Error {
    //extendeu a classe do js
    constructor() {
        super('Account or Password Incorrect!')
    }
}