const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.{js}'],
  migrations: ['src/migration/**/*.{js}'],
  subscribers: ['src/subscriber/**/*.{js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
