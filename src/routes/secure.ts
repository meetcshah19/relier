import * as express from "express";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import checkjwt = require("../middlewares/jwtMiddleware");
let router = express.Router();
import * as jwt from "express-jwt";
const secret = "bitchlasagnaisapewdslang";

router.get("/users/:id", jwt({ secret: secret, algorithms: ['HS256'] }), checkjwt, async function (req: any, res: Response) {
    const conn = getConnection();
    const userRepository = conn.getRepository(User);
    const results = await userRepository.findOne(req.user.id);
    return res.send(results);
});

router.put("/users/:id", jwt({ secret: secret, algorithms: ['HS256'] }), checkjwt, async function (req: any, res: Response) {
    const conn = getConnection();
    const userRepository = conn.getRepository(User);
    const user = await userRepository.findOne(req.user.id);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
});

router.delete("/users/:id", async function (req: any, res: Response) {
    const conn = getConnection();
    const userRepository = conn.getRepository(User);
    const results = await userRepository.delete(req.user.id);
    return res.send(results);
});

export = router