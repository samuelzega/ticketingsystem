const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const orderkScheme = new mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'Movie',
        required: [true, 'Movie id is required!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner id is required!'],
    },

    // OERDER STATUS
    // 1 -> order created/ waiting for payment
    // 2 ->  payment failed
    // 3 ->  payment success
    status: {
        type: Number,
        required: [true, 'status is required'],
        default: 1,
    },
    seatCount: {
        type: Number,
        required: [true, 'seat count is required'],
    },
})

orderkScheme.plugin(mongoosePaginate)

module.exports = mongoose.model('Order', orderkScheme)
