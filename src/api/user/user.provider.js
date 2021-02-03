'use strict';

import UserModel from './user.model';
import jwt from '../../config/jwt';
import bcrypt from 'bcryptjs';

const GetRefererKey = (firstname, lastname) => {
    let first = firstname.split('')
    first = first[0] + first[1] + first[2]
    first = first.toUpperCase()
    let last = lastname.split('')
    last = last[0] + last[1] + last[2]
    last = last.toUpperCase()

    return first + Math.floor(Math.random() * 1000) + last
}
export default {

    async Register(body) {
        try {
            let findUser = await UserModel.findOne({
                email: body.email
            }).exec()
            if (!findUser) {
                body.password = bcrypt.hashSync(body.password, 10);
                body.referer_id = await GetRefererKey(body.firstname, body.lastname)
                let user = new UserModel(body);
                user.save()
                return {
                    token: jwt.createToken(user),
                    role: user.role
                };
            } else throw {
                code: 403,
                error: 'Email already used'
            }
        } catch (error) {
            throw error;
        }
    },

    async Login(email, password) {
        try {
            const user = await UserModel.findOne({
                email
            }).exec();
            if (user) {
                if (!bcrypt.compareSync(password, user.password))
                    throw {
                        code: 400,
                        error: 'password invalid'
                    };
                else return {
                    token: jwt.createToken(user),
                    role: user.role
                };
            } else throw {
                code: 404,
                error: 'email invalid'
            };
        } catch (error) {
            throw error;
        }
    },
    async GetUserLogin(id) {
        try {
            return UserModel.findById(id).exec();
        } catch (error) {
            throw error;
        }
    },
    async Update(id, body) {
        try {
            return UserModel.findByIdAndUpdate(id, body).exec();
        } catch (error) {
            throw error;
        }
    },

    async Delete(id) {
        try {
            return UserModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw error;
        }
    },

    async ListAllUsers(role) {
        try {
            return UserModel.find({
                role: role
            }).exec();
        } catch (error) {
            throw error;
        }
    }
};