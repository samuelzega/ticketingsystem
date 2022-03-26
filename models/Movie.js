const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
        },
        price: {
            type: Number,
            required: [true, 'price is required'],
        },
        date: {
            type: String,
            required: [true, 'date is required'],
        },
        desc: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)

movieSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Movie', movieSchema)
