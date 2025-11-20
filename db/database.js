const models = require('../models/index.js');
module.exports = async function (eventEmitter) {
    try {
        await models.sequelize.authenticate();
        if(_config.node_env === 'development')
                await models.sequelize.sync({ alter: true });
        // eslint-disable-next-line no-undef
        console.log('Connected to SQL database:', _config[_config.node_env].database);
        if (_config.app === 'dev') {
            models.sequelize.sync(); //creates table if they do not already exist
            // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
        } 
        eventEmitter.emit('db-connection-established');
    } catch (err) {
        // eslint-disable-next-line no-undef
         console.error('Unable to connect to SQL database:', _config[_config.node_env].database, err);
    }
};
