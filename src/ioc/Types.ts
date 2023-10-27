const TYPES = {
    // converter types:
    USERS_CONVERTER: Symbol.for("UsersConverter"),
    PRODUCTS_WAREHOUSE_CONVERTER: Symbol.for("ProductsWarehouseConverter"),
    PRODUCTS_CATEGORY_CONVERTER: Symbol.for("ProductsCategoryConverter"),
    TRANSACTION_HISTORY_CONVERTER: Symbol.for("TransactionHistoryConverter"),
    SESSIONS_CONVERTER: Symbol.for("SessionsConverter"),
    // mapper types:

    // repository types:
    USERS_REPOSITORY: Symbol.for("UsersRepository"),
    PRODUCTS_WAREHOUSE_REPOSITORY: Symbol.for("ProductsWarehouseRepository"),
    PRODUCTS_CATEGORY_REPOSITORY: Symbol.for("ProductsCategoryRepository"),
    TRANSACTION_HISTORY_REPOSITORY: Symbol.for("TransactionHistoryRepository"),
    LOGIN_REPOSITORY: Symbol.for("LoginRepository"),
    SESSIONS_REPOSITORY: Symbol.for("SessionsRepository"),

    // service types:
    USERS_SERVICE: Symbol.for("UsersService"),
    PRODUCTS_WAREHOUSE_SERVICE: Symbol.for("ProductsWarehouseService"),
    LOGIN_SERVICE: Symbol.for("LoginService"),

    // controller types:
    USERS_CONTROLLER: Symbol.for("UsersController"),
    PRODUCTS_WAREHOUSE_CONTROLLER: Symbol.for("ProductsWarehouseController"),
    LOGIN_CONTROLLER: Symbol.for("LoginController"),

    // handler types:
};

export { TYPES };
