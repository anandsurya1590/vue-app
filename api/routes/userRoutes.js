const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const checkJwt = require("../auth/auth");

router.get('/', async (req, res) => {
 const users = await UserService.getAllUsers();
  if (!users) {
    return res.status(404).send({message: 'No users found'});
  }
  res.send({message: 'User list retrieved successfully', users});
});

router.get('/:id', (req, res) => {
  res.send({message: `User ID: ${req.params.id}`});
});


router.post('/sync-user', checkJwt, async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.body.email);
    if (!user) {
      // Add new user if not exists
      const newUser = await UserService.addUser(req.body);
      return res.status(201).send({message: 'User synced successfully', user: newUser});

    } else {
      // Update existing user
      return res.send({message: 'User synced successfully', user: user});
    }

  } catch (error) {
    console.error('Error syncing user:', error);
    return res.status(500).send({message: 'Error syncing user', error: error.message});
  }
  
});

module.exports = router;