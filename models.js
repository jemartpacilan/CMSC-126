const Sequelize = require('sequelize');
const database = require('./database');


const User = database.define('users', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	timestamps: true
});

const Topics = database.define('topics', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	headline: {
		type: Sequelize.STRING,
		allowNull : false
	},
	user_id: {
			type: Sequelize.INTEGER,
			references: {
					model: 'users',
					key: 'id'
			},
			allowNull : false
	},
	votes: {
			type: Sequelize.INTEGER,
			allowNull: false
	}
}, {
	timestamps: true
});

const Messages = database.define('messages', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	topic_id: {
			type: Sequelize.INTEGER,
			references: {
					model: 'topics',
					key: 'id'
			},
			allowNull: false
	},
	sender: {
			type: Sequelize.STRING,
			references: {
					model: 'users',
					key: 'username'
			},
			allowNull: false
	},
	votes: {
			type: Sequelize.INTEGER,
			allowNull: false
	}
}, {
	timestamps: true
});



module.exports.User = User;
module.exports.Topics = Topics;
module.exports.Messages = Messages;

database.sync();
