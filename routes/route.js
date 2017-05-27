const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models').User;

const router = new express.Router();

router.post('/signup', function(req, res) {
	const username = req.body.username;
    const password = req.body.password;
    const confirmation = req.body.confirmation;

	User.findOne({ where: { username: username } }).then(function(user) {

		if (password !== confirmation) {
            req.flash('signUpMessage', 'Passwords do not match.');
	        return res.redirect('/');
	    }

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

				User.create({
		username: username,
		password: hashedPassword,
		salt: salt
}).then(function() {
		req.flash('signUpMessage', 'Signed up successfully!');
		return res.redirect('/');
});
    });
});


router.get('/signout', function(req, res) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
