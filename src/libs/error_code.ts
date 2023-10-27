/**
 * Created by kiettv on 10/2/16.
 */
class Code {
    public readonly CODE;
    public readonly MESSAGE;

    constructor(code, message) {
        this.CODE = code;
        this.MESSAGE = message;
    }
}

export const ErrorCode = {
    UNKNOWN: {
        TYPE: "Unknown.",
        GENERIC: new Code(0, "Internal Server Error."),
        NOT_IMPLEMENT: new Code(1, "Not Implement ExceptionModel"),
        UPGRADE_NEEDED: new Code(2, "Please update new version"),
        MAINTENANCE_PERIOD: new Code(3, "Maintenance period"),
        APOCALYPSE: new Code(13, "The world is end"),
        INVALID_QUANTITY: new Code(13, "Số lượng mặt hàng nhập không được phép."),
    },
    RESOURCE: {
        TYPE: "Resource.",
        NOT_FOUND: new Code(10001, "item is deleted."),
        VALIDATE_PASSWORD_FAILD: new Code(10002, "Password không chính xác. Vui lòng thử lại"),
        MISSING_FIELD: new Code(10003, "Thiếu field bắt buộc."),
        INVALID_ACCOUNT: new Code(10003, "Tài khoản không tồn tại."),
        EXISTED_ACCOUNT: new Code(10003, "Dữ liệu tài khoản đã tồn tại trong hệ thống."),
        NOT_EXIST_DATA: new Code(10003, "Dữ liệu không tồn tại trong hệ thống."),        
    },
    AUTHENTICATION: {
        TYPE: "Authentication.",
        GENERIC: new Code(1100, "unknown authentication's error."),
        VIOLATE_RFC6750: new Code(1101, "RFC6750 states the access_token MUST NOT be provided in more than one place in a single request."),
        TOKEN_NOT_FOUND: new Code(1102, "token not found."),
        INVALID_AUTHORIZATION_HEADER: new Code(1103, "invalid authorization header."),
        ACCOUNT_NOT_FOUND: new Code(1104, "could it be a spelling error?\n\nif you are looking to create a new iCondo account, kindly go back to the main page and tap on the create new iCondo account link\n\ncontact login@icondo.asia if you require further assistance"),
        WRONG_USER_NAME_OR_PASSWORD: new Code(1105, "the user name or password combination you have entered does not match our records\n\nif you have forgotten your password, kindly tap on the forgot password link on the main screen"),
        WRONG_PASSWORD: new Code(1105, "you have entered the wrong password."),
        INVALID_TOKEN: new Code(1106, "invalid token."),
        TOKEN_EXPIRE: new Code(1107, "token expired."),
        NEED_ACCESS_CODE: new Code(1108, "access code is needed."),
        INVALID_CODE: new Code(1109, "invalid access code."),
        ALREADY_ACTIVE: new Code(1110, "account has already activated."),
        NEED_ACTIVE: new Code(1112, "account has not activated."),
        ALREADY_VERIFY_PHONE: new Code(1113, "your phone code already verified. Pls resend new pin code"),
        INVALID_VERIFY_PHONE_CODE: new Code(1114, "the sms verification code you have entered is invalid"),
        VERIFY_PHONE_CODE_EXPIRE: new Code(1115, "the verification code you entered has expired \n\nkindly request for a new code."),
        LIMIT_QUOTA: new Code(1116, "you have reached the maximum number of verification attempts\n\nplease try again in 15 minutes"),
        WAITING_APPROVE: new Code(1118, "your request is waiting approve"),
        SINGLE_LOGGED_IN: new Code(1106, "your user account is currently logged on to another device\n\nto provide better security, each iCondo user account can only be logged on to one device at a time\n\nwe encourage you to change your iCondo password from time to time\n\nif you would like to use this device kindly log in with your username and password"),
        SINGLE_DEVICE_LOGGED_IN: new Code(1119, "This account belong to another device \n Please try another device"),
        NEED_CHANGE_INFO: new Code(1120, "account has not changed info."),
        OLD_PASSWORD_NOT_MATCH: new Code(1121, "the passwords you have entered does not match\n\nyour password must be at least 6 digit long containing at least 1 alphabet and 1 number."),
        INVALID_UNIT_ACCESS: new Code(1122, "Invalid request unit access"),
        INVALID_SIGNATURE: new Code(1123, "invalid signature"),
    },
    PRIVILEGE: {
        TYPE: "Privilege",
        GENERIC: new Code(1200, "unknown privilege's error."),
        NOT_ALLOW: new Code(1201, "you do not have permission to access."),
        MISSING_TOKEN_VERIFY: new Code(1202, "missing token. You do not to access."),
        SUPPORT_ONLY_FOR_RESIDENT_USER: new Code(1203, "the management has disabled your access to book facilities\nplease contact the management office for more information\nthank you"),
        INVALID_VERSION: new Code(1204, "invalid version format"),
        VERSION_NOT_FOUND: new Code(1205, "version not found"),
        FORCE_UPDATE: new Code(1206, "please update to the latest version")
    },
    STRIPE: {
        TYPE: "STRIPE",
        GENERIC: new Code(3000, "There was an unexpected error"),
        CARD_DECLINED: new Code(3001, "the card transaction has been declined, please check your card details, use another card or contact the card issuer"),
        EXPIRED_CARD: new Code(3002, "the card expiration year you have entered is invalid"),
        INVALID_CVC: new Code(3003, "the security code you have entered is invalid"),
        INCORRECT_CVC: new Code(3003, "the security code you have entered is incorrect"),
        INVALID_EXPIRY_YEAR: new Code(3004, "the card expiration year you have entered is invalid"),
        INVALID_EXPIRY_MONTH: new Code(3004, "the card expiration month you have entered is invalid"),
        INVALID_NUMBER: new Code(3005, "the card number you have entered is invalid"),
        API_CONNECTION: new Code(3006, "there was an unexpected error, please try again in a few seconds")
    },
    OPEATION: {
        TYPE: "OPEATION",
        GENERIC: new Code(1400, "Unknown error."),
        FIREBASE_DISABLE: new Code(1401, "Firebase was disable"),
        PAYMENT_DISABLE: new Code(1402, "Payment was disable"),
        JOB_ALREADY_COMPLETED: new Code(1403, "Job already completed")
    },
    WEBHOOK: {
        TYPE: "WEBHOOK",
        GENERIC: new Code(2000, "Unknown error."),
        MISSING_PAYMENT_INTENT_ID: new Code(1401, "Missing Payment Intent ID")
    },
    SMS: {
        TYPE: "SMS",
        GENERIC: new Code(2100, "Twillo unknown error."),
    }
};
export default ErrorCode;
