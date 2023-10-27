import { UsersDto } from "../../data/dtos";
import ProductsCategoryDto from "../../data/dtos/ProductsCategory";
import ProductsWarehouseDto from "../../data/dtos/ProductsWarehouseDto";
interface IProductsWarehouseService {
    create(params: any): Promise<any>;
    search(params: any): Promise<ProductsWarehouseDto[]>;
    update(id: string, data: ProductsWarehouseDto): Promise<string>;
    findAllCategory(): Promise<ProductsCategoryDto[]>;
    addCategory(data: ProductsCategoryDto): Promise<string>;
    release(ctx: any, id: string, numb: number): Promise<any>;
    delete(id: string): Promise<boolean>;
    // login(account: string, password: string): Promise<any>;
}

export default IProductsWarehouseService;