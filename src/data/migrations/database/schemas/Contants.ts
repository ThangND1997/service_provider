export const USERS_TABLE_SCHEMA = {
    TABLE_NAME: "users",
    FIELDS: {
        ID: "id",
        IS_ENABLE: "is_enable",
        IS_DELETED: "is_deleted",
        CREATED_DATE: "created_date",
        UPDATED_DATE: "updated_date",

        NAME: "name",
        EMAIL: "email",
        PHONE_NUMBER: "phone_number",
        ADDRESS: "address",
        EXPIRY_DATE: "expiry_date",
        AVATAR_URL: "avatar_url",
        NOTE: "note",
        STATUS: "status",
        ROLE: "role",
        PASSWORD: "password",
        ACCOUNT: "account"
    }
};

export const PRODUCTS_WAREHOUSE_TABLE_SCHEMA = {
    TABLE_NAME: "products_warehouse",
    FIELDS: {
        ID: "id",
        IS_ENABLE: "is_enable",
        IS_DELETED: "is_deleted",
        CREATED_DATE: "created_date",
        UPDATED_DATE: "updated_date",

        NAME: "name",
        DESCRIPTION: "description",
        USER_ID: "user_id",
        CATEGORY_ID: "category_id",
        PRICE_DISPLAY: "price_display",
        PRICE_ORIGINAL: "price_original",
        PICTURE: "picture",
        IMAGES: "images",
        TOTAL: "total",
        MONETARY_UNIT: "monetary_unit"
    }
};

export const PRODUCTS_CATEGORY_TABLE_SCHEMA = {
    TABLE_NAME: "products_category",
    FIELDS: {
        ID: "id",
        IS_ENABLE: "is_enable",
        IS_DELETED: "is_deleted",
        CREATED_DATE: "created_date",
        UPDATED_DATE: "updated_date",
        NAME: "name",
    }
};

export const TRANSACTION_HISTORY_TABLE_SCHEMA = {
    TABLE_NAME: "transaction_history",
    FIELDS: {
        ID: "id",
        IS_ENABLE: "is_enable",
        IS_DELETED: "is_deleted",
        CREATED_DATE: "created_date",
        UPDATED_DATE: "updated_date",

        PRODUCTS_WAREHOUSE_ID: "products_warehouse_id",
        IMPLEMENTER_ID: "implementer_id",
        IMPLEMENT_DATE: "implement_date",
        PRICE_CHARGE: "price_charge",
        NUMBER_OF_PRODUCTS: "number_of_products",
    }
}

export const SESSIONS_TABLE_SCHEMA = {
    TABLE_NAME: "sessions",
    FIELDS: {
        ID: "id",
        IS_ENABLE: "is_enable",
        IS_DELETED: "is_deleted",
        CREATED_DATE: "created_date",
        UPDATED_DATE: "updated_date",

        TOKEN: "token",
        EXPIRE: "expire",
        USER_ID: "user_id",
        HASH: "hash"
    }
};
