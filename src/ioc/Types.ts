const TYPES = {
    // converter types:
    USERS_CONVERTER: Symbol.for("UsersConverter"),
    // mapper types:

    // reposiory types:
    USERS_REPOSITORY: Symbol.for("UsersRepository"),

    // service types:
    USERS_SERVICE: Symbol.for("UsersService"),

    // controller types:
    USERS_CONTROLLER: Symbol.for("UsersController"),

    // handler types:
    TAP_STATISTIC_HANDLER: Symbol.for("TapStatisticHandler"),
    TAP_STATISTIC_SUBJECT_CHANGED_HANDLER: Symbol.for("TapStatisticSubjectChangedHandler"),
};

export { TYPES };
