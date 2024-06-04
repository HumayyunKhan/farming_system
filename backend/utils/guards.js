const httpStatus = require("http-status");
const { ROLES } = require("./roles");

const AdminAuth = async (req, res, next) => {
  if (req.roles.includes(ROLES.admin)) return next();
  return res.status(401).send({
    status: false,
    message: `Route only allowed for Admin role!`,
  });
};
const VendorAuth = async (req, res, next) => {
  if (req.role == ROLES.vendor) return next();
  return res.status(401).send({
    status: false,
    message: `Route only allowed for Vendors!`,
  });
};
const BothAuth = async (req, res, next) => {
  if (req.role == ROLES.vendor || req.role == ROLES.admin) return next();
  return res.status(401).send({
    status: false,
    message: `Route only allowed for Vendors!`,
  });
};
const UserAuth = async (req, res, next) => {
  if (req.role == ROLES.user) return next();
  return res.status(401).send({
    status: false,
    message: `Route only allowed for Users!`,
  });
};

const restrictAPI = async (req, res, next) => {
  const isRestricted = config.admin_access;

  if (!isRestricted) {
    return res.status(404).json({ error: "Not Found" });
  }

  next();
};

module.exports = { AdminAuth, restrictAPI, UserAuth, VendorAuth, BothAuth };
