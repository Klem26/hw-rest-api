const express = require('express');
const router = express.Router();

const { joiContactSchema } = require("../../models/contacts")
const { validation ,controllerWrapper, authenticate} = require("../../middlewares")
const ctrl = require("../../controllers/contacts")
const validationMiddleware = validation(joiContactSchema);

router.get("/", controllerWrapper(authenticate),  ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", controllerWrapper(authenticate), validationMiddleware, controllerWrapper(ctrl.addContact));

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validationMiddleware, ctrl.update);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
