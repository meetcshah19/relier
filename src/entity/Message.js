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
exports.Message = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Channel_1 = require("./Channel");
var Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
        __metadata("design:type", Number)
    ], Message.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, {
            cascade: true
        }),
        __metadata("design:type", User_1.User)
    ], Message.prototype, "sender", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Channel_1.Channel; }, {
            cascade: true
        }),
        __metadata("design:type", Channel_1.Channel)
    ], Message.prototype, "channel", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Message.prototype, "text", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Message.prototype, "is_vc", void 0);
    __decorate([
        typeorm_1.Column({ type: 'timestamp', name: 'timestamp' }),
        __metadata("design:type", Date)
    ], Message.prototype, "timestamp", void 0);
    Message = __decorate([
        typeorm_1.Entity()
    ], Message);
    return Message;
}());
exports.Message = Message;
