"use strict";
// import * as express from "express";
// import {Request, Response} from "express";
Object.defineProperty(exports, "__esModule", { value: true });
// import {User} from "./entity/User";
// // create typeorm connection
// createConnection().then(connection => {
//     const userRepository = connection.getRepository(User);
//     // create and setup express app
//     const app = express();
//     app.use(express.json());
//     // register routes
//     app.get("/users", async function(req: Request, res: Response) {
//         const users = await userRepository.find();
//         res.json(users);
//     });
//     app.get("/users/:id", async function(req: Request, res: Response) {
//         const results = await userRepository.findOne(req.params.id);
//         return res.send(results);
//     });
// app.post("/users", async function (req: Request, res: Response) {
//     const user = await userRepository.create(req.body);
//     const results = await userRepository.save(user);
//     return res.send(results);
// });
//     app.put("/users/:id", async function(req: Request, res: Response) {
//         const user = await userRepository.findOne(req.params.id);
//         userRepository.merge(user, req.body);
//         const results = await userRepository.save(user);
//         return res.send(results);
//     });
//     app.delete("/users/:id", async function(req: Request, res: Response) {
//         const results = await userRepository.delete(req.params.id);
//         return res.send(results);
//     });
//     // start express server
//     app.listen(3000);
// });
var typeorm_1 = require("typeorm");
var express = require("express");
var path = require("path");
var http = require("http");
var indexRouter = require("./routes/index");
var secureRouter = require("./routes/secure");
var callrouter = require("./routes/call");
var vcrouter = require("./routes/video-call-api");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
typeorm_1.createConnection().then(function () {
    var app = express();
    var port = 3000;
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/api', indexRouter);
    app.use('/api/secure', secureRouter);
    app.use('/api/video', vcrouter);
    app.use('/api/vc', callrouter);
    app.set('port', port);
    var server = http.createServer(app);
    server.listen(port);
});
