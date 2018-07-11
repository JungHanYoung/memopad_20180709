import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
	const Account = sequelize.define(
		'account',
		{
			username: {
				type: DataTypes.STRING,
				unique: {
					args: true,
					message: 'Username must be unique.',
					fields: [ sequelize.fn('lower', sequelize.col('username')) ]
				},
				validate: {
					isAlphanumeric: {
						args: true,
						msg: 'The username can only contain letters and numbers'
					},
					len: {
						args: [ 3, 25 ],
						msg: 'The username needs to be between 3 to 25 characters long'
					}
				}
			},
			password: {
				type: DataTypes.STRING
			}
		},
		{
			hooks: {
				beforeCreate: (account, options) => {
					const hashedPassword = bcrypt.hashSync(account.password, 12);
					account.password = hashedPassword;
				}
			}
		}
	);

	return Account;
};
