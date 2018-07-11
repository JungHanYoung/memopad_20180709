import formatErrors from '../utils/formatErrors';

export default {
	Query: {
		// Account API
		getLoginInfo: () => ({
			id: 1,
			username: 'jhokta',
			password: '1234',
			created: '2018/07/11'
		}),
		// Memo API
		allMemos: (_, args, { models }) =>
			models.Memo.findAll({
				order: [ [ 'updated_at', 'DESC' ] ]
			}),
		getMemosByUser: (_, args, { models }) =>
			models.Memo.findAll({
				order: [ [ 'updated_at', 'DESC' ] ]
			})
	},
	Mutation: {
		// Account API
		createUser: async (_, { username, password }, { models }) => {
			const existUser = await models.Account.findOne({ where: { username } });
			if (existUser !== null) {
				return {
					ok: false,
					error: [
						{
							path: 'username',
							message: 'This username is already exists'
						}
					]
				};
			}
			try {
				await models.Account.create({
					username,
					password
				});
				return {
					ok: true
				};
			} catch (err) {
				console.log('Error explore');
				console.log(err);
				return {
					ok: false,
					error: formatErrors(err, models)
				};
			}
		},
		login: (_, { username, password }) => ({ ok: false }),
		// Memo API
		createMemo: async (_, { contents }, { models }) => {
			try {
				await models.Memo.create({
					contents
				});
				return {
					ok: true
				};
			} catch (err) {
				return {
					ok: false
				};
			}
		},
		deleteMemo: (_, { id }) => ({ ok: false }),
		modifyMemo: (_, { id, contents }) => ({ ok: false })
	}
};
