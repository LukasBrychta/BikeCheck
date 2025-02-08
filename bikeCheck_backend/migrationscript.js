const {Sequelize} = require('sequelize');
const path = require('path');
const fs = require('fs');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

async function  runMigrations() {
    try{
        const migrationsFolder = path.resolve(__dirname, 'migrations');
        const migrationsFiles = fs.readdirSync(migrationsFolder).filter(file => file.endsWith('.js'));

        for (const file of migrationsFiles) {
            const migration = require(path.join(migrationsFolder, file));
            console.log(`Running migration: ${file}`);
            await migration.up(sequelize.getQueryInterface(), Sequelize);
        }

        console.log('Migrations complete!');
    }
    catch (err) {
        console.error('Error running migrations:', err);
    } finally {
        await sequelize.close();
    }
}

runMigrations();