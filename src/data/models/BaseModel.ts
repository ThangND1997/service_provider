import { Model } from "objection";

class BaseModel extends Model {
    public id?: string;
    public is_deleted?: boolean;
    public is_enable?: boolean;
    public created_date?: string;
    public updated_date?: string;

    static get idColumn() {
        return "id";
    }

    $beforeUpdate() {
        this.updated_date = new Date().toISOString();
    }
}

export default BaseModel;
