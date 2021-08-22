const express = require('express');
const router = express.Router();

const { contactSchema } = require("../../validation")
const contactsOperations = require("../../model/contacts");
const { message } = require('../../validation/contactSchema');

router.get('/', async (req, res, next) => {
  try {
    const listContacts = await contactsOperations.listContacts();
    res.json({ listContacts })


  } catch (error) {
    next(error)
  }

});


router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        "message": "Not found"
      });
    }
    res.json({ contact })
  } catch (error) {
    next(error)
  }
});


router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(400).json({
        message: error.message
      })
    }
    const newContact = await contactsOperations.add(req.body)
    res.status(201).json({
      newContact
    })

  } catch (error) {
    next(error)
  }
});


router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsOperations.removeContact(contactId);
    if (!deleteContact) {
      return res.status(404).json({
        "message": "Not found"
      });
    }
    res.json({ deleteContact })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(400).json({ "message": "missing fields" })
    }
    const { contactId } = req.params;
    const updateContact = await contactsOperations.update(contactId, req.body);
    if (!updateContact) {
      return res.status(404).json({
        "message": "Not found"
      });
    }
    res.json({
      updateContact
    })

  } catch (error) {
    next(error)
  }
})

module.exports = router
