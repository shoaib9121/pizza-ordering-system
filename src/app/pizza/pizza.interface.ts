import { ITopping } from '../topping/topping.interface';

export interface IPizza {
    price: any,
    size: string,
    toppings?: ITopping[],
    getPrice?(): number
}
