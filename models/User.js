const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            validate: {
                validator(email) {
                    return this.model('User')
                        .findOne({ email })
                        .then((result) => !result)
                },
                message: (props) => `Email already taken`,
            },
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            select: false,
        },
        imageUrl: {
            type: String,
            default: 'https://img.icons8.com/officel/2x/user.png',
            required: [true, 'image is required'],
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

module.exports = mongoose.model('User', userSchema)
