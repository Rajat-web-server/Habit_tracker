const {z} = require("zod");

const registerSchema = z.object({
    name:z.string().min(2).max(20),
    email:z.string().email(),
    password:z.string().min(8),
})

module.exports= registerSchema;