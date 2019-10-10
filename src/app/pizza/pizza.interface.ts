import { ITopping } from '../topping/topping.interface';

export interface IPizza {
    price: any,
    size: string,
    topping?: ITopping[],
    getPrice?(): number
}
