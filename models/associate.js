const { sequelize, DataTypes } = require('../db/database');

const Role = require('./role')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Company = require('./company')(sequelize, DataTypes);
const Park = require('./park')(sequelize, DataTypes);
const Technique = require('./technique')(sequelize, DataTypes);
const Place = require('./place')(sequelize, DataTypes);
const Work = require('./work')(sequelize, DataTypes);
const ParkService = require('./parkservice')(sequelize, DataTypes);
const Schedule = require('./schedule')(sequelize, DataTypes);

User.associate({ role: Role, technique: Technique, company: Company });
Company.associate({ user: User, park: Park });
Park.associate({ company: Company });
Technique.associate({ user: User, place: Place });
Place.associate({ technique: Technique });
ParkService.associate({ work: Work, schedule: Schedule });
Schedule.associate({ parkService: ParkService });

module.exports = {
  Role, User, Company, Park, Technique, Place, Work, ParkService, Schedule,
};
