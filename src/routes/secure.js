"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require("express");
var jwt = require("express-jwt");
var crypto = require("crypto");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var Team_1 = require("../entity/Team");
var Channel_1 = require("../entity/Channel");
var Message_1 = require("../entity/Message");
var moment = require("moment");
var data = require('../../projectconfig.json');
var router = express.Router();
var secret = data["jwt-secret"];
router.get("/users/", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, userRepository, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findOne(req.user.id)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
router.put("/users/", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, userRepository, user, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findOne(req.user.id)];
                case 1:
                    user = _a.sent();
                    userRepository.merge(user, req.body);
                    return [4 /*yield*/, userRepository.save(user)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
router.delete("/users/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, userRepository, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.delete(req.user.id)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
router.put("/teams/", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, teamRepository, team, userRepository, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    teamRepository = conn.getRepository(Team_1.Team);
                    team = new Team_1.Team();
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findOne(req.user.id)];
                case 1:
                    user = _a.sent();
                    console.log(req.body.name + " " + user);
                    if (req.body.name && user) {
                        team.name = req.body.name;
                        team.secret = crypto.randomBytes(20).toString('hex');
                        team.owner = user;
                        team.members = [user];
                        teamRepository.save(team);
                        return [2 /*return*/, res.status(200).send("Team created")];
                    }
                    else {
                        return [2 /*return*/, res.status(500).send("Invalid")];
                    }
                    return [2 /*return*/];
            }
        });
    });
});
router.get("/teams/", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, userRepository, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findOne(req.user.id, { relations: ["teams"] })];
                case 1:
                    user = _a.sent();
                    res.statusCode = 200;
                    return [2 /*return*/, res.send(user.teams)];
            }
        });
    });
});
router.delete("/teams/:id", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, teamRepository, team;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    teamRepository = conn.getRepository(Team_1.Team);
                    return [4 /*yield*/, teamRepository.findOne(req.params.id, { relations: ["owner"] })];
                case 1:
                    team = _a.sent();
                    if (team.owner.id == req.user.id) {
                        teamRepository.delete(req.params.id);
                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(500);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
router.post("/teams/:secret", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, teamRepository, team, userRepository, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    teamRepository = conn.getRepository(Team_1.Team);
                    return [4 /*yield*/, teamRepository.findOne({ where: { secret: req.params.secret }, relations: ["members"] })];
                case 1:
                    team = _a.sent();
                    if (!team) return [3 /*break*/, 3];
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findOne(req.user.id)];
                case 2:
                    user = _a.sent();
                    team.members.push(user);
                    teamRepository.save(team);
                    res.sendStatus(200);
                    return [3 /*break*/, 4];
                case 3:
                    res.sendStatus(500);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
router.put("/channels/:teamSecret", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, channelRepository, channel, teamRepository, team, userRepository, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    channelRepository = conn.getRepository(Channel_1.Channel);
                    channel = new Channel_1.Channel();
                    teamRepository = conn.getRepository(Team_1.Team);
                    return [4 /*yield*/, teamRepository.findOne({ where: { secret: req.params.teamSecret }, relations: ["channels"] })];
                case 1:
                    team = _a.sent();
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findOne(req.user.id)];
                case 2:
                    user = _a.sent();
                    if (team && req.body.name && user) {
                        channel.name = req.body.name;
                        channel.secret = crypto.randomBytes(20).toString('hex');
                        channel.members = [user];
                        channel.teams = [team];
                        channelRepository.save(channel);
                        // team.channels.push(channel);
                        // console.log(team.channels)
                        // teamRepository.save(team);
                        return [2 /*return*/, res.status(200).send("Channel Created")];
                    }
                    else {
                        return [2 /*return*/, res.status(500).send("Invalid")];
                    }
                    return [2 /*return*/];
            }
        });
    });
});
router.get("/channels/:teamSecret", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, teamRepository, team;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    teamRepository = conn.getRepository(Team_1.Team);
                    return [4 /*yield*/, teamRepository.findOne({ where: { secret: req.params.teamSecret }, relations: ["channels"] })];
                case 1:
                    team = _a.sent();
                    if (team) {
                        return [2 /*return*/, res.status(200).send(team.channels)];
                    }
                    else {
                        return [2 /*return*/, res.status(500).send("Invalid")];
                    }
                    return [2 /*return*/];
            }
        });
    });
});
router.delete("/channels/:secret", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, channelRepository, channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    channelRepository = conn.getRepository(Channel_1.Channel);
                    return [4 /*yield*/, channelRepository.findOne({ where: { secret: req.params.secret } })];
                case 1:
                    channel = _a.sent();
                    if (channel) {
                        channelRepository.delete(channel);
                        return [2 /*return*/, res.sendStatus(200)];
                    }
                    return [2 /*return*/, res.sendStatus(500)];
            }
        });
    });
});
router.post("/channels/:secret", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, channelRepository, channel, userRepository, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    channelRepository = conn.getRepository(Channel_1.Channel);
                    return [4 /*yield*/, channelRepository.findOne({ where: { secret: req.params.secret }, relations: ["members"] })];
                case 1:
                    channel = _a.sent();
                    if (!channel) return [3 /*break*/, 3];
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findOne(req.user.id)];
                case 2:
                    user = _a.sent();
                    channel.members.push(user);
                    channelRepository.save(channel);
                    res.sendStatus(200);
                    return [3 /*break*/, 4];
                case 3:
                    res.sendStatus(500);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
router.put("/messages/:secret", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, channelRepository, channel, userRepository, user, message, messageRepository;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    channelRepository = conn.getRepository(Channel_1.Channel);
                    return [4 /*yield*/, channelRepository.findOne({ where: { secret: req.params.secret } })];
                case 1:
                    channel = _a.sent();
                    if (!(channel && req.body.text)) return [3 /*break*/, 3];
                    userRepository = conn.getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findOne(req.user.id)];
                case 2:
                    user = _a.sent();
                    message = new Message_1.Message();
                    message.sender = user;
                    message.channel = channel;
                    message.is_vc = req.body.is_vc;
                    message.text = req.body.text;
                    message.timestamp = moment(Date.now() + 5.5 * 60 * 60 * 1000).toDate();
                    messageRepository = conn.getRepository(Message_1.Message);
                    messageRepository.save(message);
                    res.sendStatus(200);
                    return [3 /*break*/, 4];
                case 3:
                    res.sendStatus(500);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
router.get("/messages/:secret", jwt({ secret: secret, algorithms: ['HS256'] }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, messageRepository, channelRepository, channel, messages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = typeorm_1.getConnection();
                    messageRepository = conn.getRepository(Message_1.Message);
                    channelRepository = conn.getRepository(Channel_1.Channel);
                    return [4 /*yield*/, channelRepository.findOne({ where: { secret: req.params.secret } })];
                case 1:
                    channel = _a.sent();
                    return [4 /*yield*/, messageRepository.find({ where: { channel: channel }, relations: ["sender"] })];
                case 2:
                    messages = _a.sent();
                    messages.forEach(function (element) {
                        element.sender.email = "";
                        element.sender.password = "";
                    });
                    res.status(200).send(JSON.stringify(messages));
                    return [2 /*return*/];
            }
        });
    });
});
module.exports = router;
