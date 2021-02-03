import express from "express";
import UserService from "./user.provider";
import Auth from "../../middleware/auth.midleware"
import {
    decode
} from 'jwt-simple';
import jwt from "../../config/jwt";
var router = express.Router();

router.post("/user/register",
    /* Guardar registro de usuario */
    async (req, res) => {
        try {
            let user = await UserService.Register(req.body)
            res.status(200).send(user)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).send(error)
        }
    });

router.post("/user/login",
    /* Login de usuario (valido para cualquier usuario) */
    async (req, res) => {
        try {
            let email = req.body.email
            let password = req.body.password
            let data = await UserService.Login(email, password)
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).send(error)
        }
    }
)
router.get('/user/loggedin',
    Auth.UserAuth,
    async (req, res) => {
        try {
            var token = req.headers.authorization.replace(/['"]+/g, '');
            const payload = await decode(token, jwt.secret);
            const id = payload.sub;
            let data = await UserService.GetUserLogin(id)
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).send(error)
        }
    }
)
router.put('/user/update',
    /* Actualiza la data de un usuario */
    async (req, res) => {
        try {
            let id = req.query.id
            let body = req.body
            let data = await UserService.Update(id, body)
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)

router.delete('/user/delete',
    /* Eliminar un usuario */
    async (req, res) => {
        try {
            let id = req.query.id
            let data = await UserService.Delete(id)
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)


router.get('/user/list',
    /* Listar todos los desarrolladores */
    async (req, res) => {
        try {
            let role = req.query.role
            let data = await UserService.ListAllUsers(role)
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)
export default router;