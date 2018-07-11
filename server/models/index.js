import Sequelize from 'sequelize';
import path from 'path';

const sequelize = new Sequelize('todo_memo', 'root', '1234', {
	dialect: 'mysql',
	host: 'localhost',
	define: {
		underscored: true
	},
	operatorsAliases: Sequelize.Op
});

const models = {
	Account: sequelize.import(path.join(__dirname, 'account')),
	Memo: sequelize.import(path.join(__dirname, 'memo'))
};

Object.keys(models).forEach((modelName) => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
