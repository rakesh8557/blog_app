const { Schema, default: mongoose } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })


userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashPass = createHmac('sha256', salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashPass;
    
    next();
})


module.exports = mongoose.model('User', userSchema);