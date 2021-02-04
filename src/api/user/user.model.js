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
        default: 'Sin definir'
    },
    pregnant: {
        type: Boolean,
        default: false
    },
    birthDate: 
        {
            day: {type:Number},
            month: {type:Number},
            year: {type:Number},
        },
    phone: 
       {
            countryCode: {type:String},
            dialCode: {type:String},
            e164Number: {type:String},
            internationalNumber: {type:String},
            nationalNumber: {type:String},
            number: {type:String}
        },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model('User', UserModel);