'use strict';

import {
    Schema,
    model
} from 'mongoose';

const UserModel = Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        default: 'u'
    },
    pregnant: {
        type: Boolean,
        default: false
    },
    birthDate: {
        type: Date,
    },
    phone: {
        type: Object,
        default: 'desconocido'
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model('User', UserModel);