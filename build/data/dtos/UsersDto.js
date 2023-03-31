"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const _1 = require(".");
const momentTz = require("moment-timezone");
class UsersDto extends _1.BaseDto {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "email", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "role", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "avatarUrl", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "password", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], UsersDto.prototype, "isAdmin", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "phone", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "note", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "status", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UsersDto.prototype, "address", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Object)
], UsersDto.prototype, "expiryDate", void 0);
exports.default = UsersDto;
//# sourceMappingURL=UsersDto.js.map