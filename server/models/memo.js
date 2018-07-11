export default (sequelize, DataTypes) => {
	const Memo = sequelize.define(
		'memo',
		{
			contents: {
				type: DataTypes.STRING
			},
			isEdited: {
				type: DataTypes.BOOLEAN,
				name: 'isEdited',
				field: 'is_edited',
				defaultValue: false
			}
		},
		{
			hooks: {
				beforeUpdate: (memo, options) => {
					memo.isEdited = true;
				}
			}
		}
	);

	Memo.associate = (models) => {
		Memo.belongsTo(models.Account, {
			foreignKey: 'writer'
		});
	};

	return Memo;
};
