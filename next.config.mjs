/** @type {import('next').NextConfig} */
export default {
    env: {
        host: 'localhost',
        dialect: 'mysql',
        database: 'bloger',
        username: 'root',
        password: 'root',
        TOKEN_SECRET: 'bloger'
    },

}
