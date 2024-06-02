require("dotenv")
    .config()

const config = {

    port: process.env.PORT,
    baseImageUrl: `http://localhost:${process.env.PORT}/uploads/`
}
module.exports = config