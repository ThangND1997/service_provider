import { Service } from "typedi";
import { UsersDto } from "../../data/dtos";
import IBaseRepository from "./IBaseRepository";
import ProductsCategoryDto from "../../data/dtos/ProductsCategory";
interface IProductsCategoryRepository extends IBaseRepository<ProductsCategoryDto> {
    // create(params: any): Promise<any>;
    // search(params: any): Promise<ProductsWarehouseDto[]>;
    // getById(id: string): Promise<UsersDto>
    // findUserByEmail(email: string): Promise<UsersDto>;
    // findUserAccount(account: string): Promise<UsersDto>;
}

export default IProductsCategoryRepository;