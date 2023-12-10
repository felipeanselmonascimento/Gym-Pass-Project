export class MaxNumberOfCheckInsError extends Error {
    //extendeu a classe do js
    constructor() {
        super('Max number of check-ins reached!')
    }
}