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

export const PRODUCTS_TABLE_SCHEMA = {
    TABLE_NAME: "products",
    FIELDS: {
        ID: "id",
        IS_ENABLE: "is_enable",
        IS_DELETED: "is_deleted",
        CREATED_DATE: "created_date",
        UPDATED_DATE: "updated_date",

        TITLE: "title",
        DESCRIPTION: "description",
        PRICE: "price",
        IMAGE_URL: "image_url",
        SUB_IMAGES_URL: "sub_images_url",
        IS_BEST_SELLER: "is_best_seller"
    }
};

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
