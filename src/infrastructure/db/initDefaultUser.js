const bcrypt = require('bcrypt');
const User = require('./models/userModel');


const hashingStrategies = {
    bcrypt: async (password) => await bcrypt.hash(password, 10)
};


async function initDefaultUser(strategy = 'bcrypt') {
    const userName = process.env.DEFAULT_ADMIN_USERNAME;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!userName || !password) {
        console.error(`❌ Missing environment variables: Please set DEFAULT_ADMIN_USERNAME and DEFAULT_ADMIN_PASSWORD in your .env file.
        Examples are provided in the .env.example file.`);
        process.exit(1);
    }

    const existing = await User.findOne({ userName });
    if (existing) {
        return;
    }

    // Usamos la estrategia seleccionada
    const hashFunction = hashingStrategies[strategy];
    if (!hashFunction) throw new Error(`Invalid hashing strategy: ${strategy}`);

    const passwordHash = await hashFunction(password);
    await User.create({ userName, passwordHash });

    console.log(`✅ Default admin user created successfully (using ${strategy} strategy):`);
}

module.exports = {
    initDefaultUser,
    hashingStrategies 
};