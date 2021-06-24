import * as express from "express";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
const saltRounds = 5;
let router = express.Router();
const secret = "bitchlasagnaisapewdslang";

router.post("/users", async function (req: Request, res: Response) {
        const conn = getConnection();
        const userRepository = conn.getRepository(User);

        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                try {
                        req.body.password = hash;
                        const user = userRepository.create(req.body);
                        var results = await userRepository.save(user);
                        var token = jwt.sign({ id: results["id"] }, secret);
                        return res.status(200).send(token);
                } catch (err) {
                        return res.send(400);
                }
        });

});

router.post("/login", async function (req: Request, res: Response) {
        const conn = getConnection();
        const userRepository = conn.getRepository(User);
        const user = await userRepository.findOne({ email: req.body.email });
        if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if (result == true) {
                                var token = jwt.sign({ id: user.id }, secret);
                                return res.status(200).send(token);
                        } else {
                                return res.status(401).send("Invalid Password");
                        }
                });
        } else {
                return res.status(401).send("Invalid Email");
        }
});


export = router