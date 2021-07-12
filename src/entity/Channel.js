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
exports.Channel = void 0;
var typeorm_1 = require("typeorm");
var Team_1 = require("./Team");
var User_1 = require("./User");
var Channel = /** @class */ (function () {
    function Channel() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
        __metadata("design:type", Number)
    ], Channel.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'name' }),
        __metadata("design:type", String)
    ], Channel.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return User_1.User; }, {
            cascade: true
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Channel.prototype, "members", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Team_1.Team; }, function (Team) { return Team.channels; }, {
            cascade: true
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Channel.prototype, "teams", void 0);
    __decorate([
        typeorm_1.Column({ name: 'secret' }),
        __metadata("design:type", String)
    ], Channel.prototype, "secret", void 0);
    Channel = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['secret'])
    ], Channel);
    return Channel;
}());
exports.Channel = Channel;
