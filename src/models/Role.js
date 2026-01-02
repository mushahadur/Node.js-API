const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String
        },
        status: {
            type: Boolean,
            default: true
        },
        permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission', default: null }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);
