export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name: { type: DataTypes.STRING },
    public: { type: DataTypes.BOOLEAN }
  });

  Channel.associate = models => {
    Channel.belongsTo(models.Channel, {
      foreignKey: 'teamId'
    });
  };

  return Channel;
};
