export interface ITopping {
    price: any,
    name: string,
    type: string,
    getPrice?(): number
}
