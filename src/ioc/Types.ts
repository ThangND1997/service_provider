const TYPES = {
    // converter types:
    USERS_CONVERTER: Symbol.for("UsersConverter"),
    // mapper types:

    // reposiory types:
    USERS_REPOSITORY: Symbol.for("UsersRepository"),
    LOGIN_REPOSITORY: Symbol.for("LoginRepository"),

    // service types:
    USERS_SERVICE: Symbol.for("UsersService"),
    LOGIN_SERVICE: Symbol.for("LoginService"),

    // controller types:
    USERS_CONTROLLER: Symbol.for("UsersController"),
    LOGIN_CONTROLLER: Symbol.for("LoginController"),

    // handler types:
};

export { TYPES };
