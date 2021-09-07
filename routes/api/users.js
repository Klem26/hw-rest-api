const express = require("express");
const router = express.Router();

const { validation ,controllerWrapper,authenticate} = require("../../middlewares");
const { joiUserSchema } = require("../../models/user")
const validationMiddleware = validation(joiUserSchema );
const ctrl = require("../../controllers/users");

router.post("/signup",validationMiddleware,controllerWrapper(ctrl.signup));
router.post("/login",validationMiddleware, controllerWrapper(ctrl.login));
router.get("/logout",controllerWrapper(authenticate), controllerWrapper(ctrl.logout));

module.exports = router;

