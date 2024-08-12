import bcrypt from "bcrypt"
import { DataTypes } from "sequelize"
import sequelize from "@/database"

const saltRounds = 10; // Define the number of salt rounds for hashing

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isVerfied: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        forgotPasswordToken: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        forgotPasswordTokenExpiry: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        verifyToken: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        verifyTokenExpiry: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    },
    {
        hooks: {
            beforeCreate: async function (user, options) {
                user.password = await bcrypt.hashSync(user.password, saltRounds);
            },
        },
    }
)

export default User