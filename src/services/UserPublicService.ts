import { Mesages } from '../enums/MessagesEnum';
import { Roles } from '../enums/RolesEnum';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createUser = async (userData: { username?: string; password?: string; email?: string; }) => {
    try {
        const { username, email, password } = userData;

        console.log(userData);

        // Verifica se o username ou email já existem
        const userResult = await User.findOne({ where: { username } });
        const emailResult = await User.findOne({ where: { email } });

        if (userResult !== null) {
            throw new Error(Mesages.USERNAME_ALREADY_EXISTS);
        }

        if (emailResult !== null) {
            throw new Error(Mesages.EMAIL_ALREADY_EXISTS);
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password!, saltRounds);

        await User.create({
            username,
            email,
            password: hashedPassword,
            roleId: Roles.BASIC
        });

        return Mesages.SUCCESS;

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const login = async (userData: { username?: string; password?: string; }) => {
    try {
        const { username, password } = userData;

        if (!username || !password) {
            throw new Error(Mesages.USER_NULL);
        }

        const userResult = await User.findOne({ where: { username } });

        if (!userResult) {
            throw new Error(Mesages.INVALID_CREDENTIALS);
        }

        const storedPassword = userResult.password;
        if (!storedPassword) {
            throw new Error(Mesages.INVALID_CREDENTIALS);
        }

        const passwordIsValid = await bcrypt.compare(password, storedPassword);

        if (!passwordIsValid) {
            throw new Error(Mesages.INVALID_CREDENTIALS);
        }

        await userResult.update({ updatedAt: new Date() });

        const token = jwt.sign(
            { userId: userResult.id, username: userResult.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return {
            message: Mesages.LOGIN_SUCESS,
            token,
        };

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    createUser,
    login
};
