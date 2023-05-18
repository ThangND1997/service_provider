const TYPES = {
    // converter types:
    USERS_CONVERTER: Symbol.for("UsersConverter"),
    SESSIONS_CONVERTER: Symbol.for("SessionsConverter"),
    // mapper types:

    // reposiory types:
    USERS_REPOSITORY: Symbol.for("UsersRepository"),
    LOGIN_REPOSITORY: Symbol.for("LoginRepository"),
    SESSIONS_REPOSITORY: Symbol.for("SessionsRepository"),

    // service types:
    USERS_SERVICE: Symbol.for("UsersService"),
    LOGIN_SERVICE: Symbol.for("LoginService"),

    // controller types:
    USERS_CONTROLLER: Symbol.for("UsersController"),
    LOGIN_CONTROLLER: Symbol.for("LoginController"),

    // handler types:
};

export { TYPES };
