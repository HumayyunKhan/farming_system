require("dotenv")
    .config()

const config = {

    port: process.env.PORT,
    baseImageUrl: `http://localhost:${process.env.PORT || 1783}/uploads/`
}
module.exports = config