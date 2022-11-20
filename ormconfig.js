var dbConfig = {
  synchronize: true,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      migrationsRun: false,
      ssl: {
        rejectUnauthorized: false,
      },
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: ['**/*.entity.js'],
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
