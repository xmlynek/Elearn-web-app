const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const logger = require('./config/logger');

process.on('uncaughtException', (err) => {
  logger.error(
    `UNCAUGHT EXCEPTION:  ${err.name} - ${err.message} - ${err.stack}`
  );
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

// start server
const server = app.listen(port, () =>
  logger.info(`Server listening on port ${port}`)
);

// connect to database
prisma
  .$connect()
  .then(async () => {
    logger.info('Connected to MySQL via Prisma');
    try {
      const users = await prisma.user.findMany({});
      if (!users || users.length === 0) {
        await prisma.user.create({
          data: {
            firstname: 'Administrátor',
            lastname: 'Admin',
            email: 'admin@random.sk',
            password: await bcryptjs.hash('password1', 12),
            role: 'ADMIN',
          },
        });
      }
    } catch (err) {
      logger.error(err.message);
    }
  })
  .catch((err) => {
    logger.error(
      `DATABASE CONNECTION ERROR! ${err.name} - ${err.message} - ${err.stack}`
    );
    server.close(() => {
      process.exit(1);
    });
  });

process.on('unhandledRejection', (err) => {
  logger.error(
    `UNHANDLED REJECTION: ${err.name} - ${err.message} - ${err.stack}`
  );
  server.close(() => {
    process.exit(1);
  });
});
