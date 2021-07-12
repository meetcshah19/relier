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
exports.Team = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Channel_1 = require("./Channel");
var Team = /** @class */ (function () {
    function Team() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
        __metadata("design:type", Number)
    ], Team.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'name' }),
        __metadata("design:type", String)
    ], Team.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }),
        __metadata("design:type", User_1.User)
    ], Team.prototype, "owner", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return User_1.User; }, function (User) { return User.teams; }, {
            cascade: true
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Team.prototype, "members", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Channel_1.Channel; }, function (Channel) { return Channel.teams; }),
        __metadata("design:type", Array)
    ], Team.prototype, "channels", void 0);
    __decorate([
        typeorm_1.Column({ name: 'secret' }),
        __metadata("design:type", String)
    ], Team.prototype, "secret", void 0);
    Team = __decorate([
        typeorm_1.Entity()
    ], Team);
    return Team;
}());
exports.Team = Team;
