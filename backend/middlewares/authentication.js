const jwtHelper=require("../utils/jwt")


const checkToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    const { access_token } = req.query

    if (access_token) {
      token = "Bearer " + access_token;
    }
    console.log(req.params)
    if (!token) {
      res.status(400);
      return res.json({
        success: false,
        message: 'Protected route!, Please provide authorization token.',
      });
    }
    token = token.replace("Bearer ", "");
    console.log(token)
    const isVerified = jwtHelper.verifyUnEncrypted(token);
    if (!isVerified)
      return res.status(401).json({
        success: false,
        message: 'Token is not valid.',
      });

    console.log(isVerified)
    req.userId = isVerified.id;
    req.role = isVerified.role;
    // if (isVerified.roles?.includes(ROLES.ADMIN)) {
    //   next();
    //   return

    // }
    // let validUserSession = await db.Session.findOne({ where: { token: token, deleted: null } })
    // if (!validUserSession) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Token is not valid.',
    //   });
    // }
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token is not valid..',
    });
  }
}

module.exports = { checkToken };
