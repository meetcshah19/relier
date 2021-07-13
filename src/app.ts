// import * as express from "express";
// import {Request, Response} from "express";

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
import { createConnection } from "typeorm";
import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as indexRouter from "./routes/index";
import * as secureRouter from "./routes/secure";
import * as callrouter from "./routes/call";
import * as vcrouter from "./routes/video-call-api";
import * as cors from "cors";
const { Server } = require("socket.io");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

createConnection().then(() => {
    const app = express();
    const port = 3000;
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'relier-front/build')));
    app.use('/api', indexRouter);
    app.use('/api/secure', secureRouter);
    app.use('/api/video', vcrouter);
    app.use('/api/vc', callrouter);
    app.set('port', port);
    app.get('/:any', function (req, res) {
        res.sendFile(path.join(__dirname, 'relier-front/build', 'index.html'));
    });
    app.get('/home/:teamSecret', function (req, res) {
        res.sendFile(path.join(__dirname, 'relier-front/build', 'index.html'));
    });
    app.get('/vc/:sid', function (req, res) {
        res.sendFile(path.join(__dirname, 'relier-front/build', 'index.html'));
    });
    app.get('/team/:secret', function (req, res) {
        res.sendFile(path.join(__dirname, 'relier-front/build', 'index.html'));
    });
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });
    server.listen(port);
    io.on("connection", (socket) => {
        console.log("connect");
        socket.on("subscribe", function (room) {
            console.log("joining room", room);
            socket.join(room);
        });

        socket.on("unsubscribe", function (room) {
            console.log("leaving room", room);
            socket.leave(room);
        });

        socket.on("send", function (data) {
            console.log("sending message");
            console.log(data.room);
            io.sockets.in(data.room).emit("message", data);
        });
    });
});
