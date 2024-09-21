import { User } from '../models/User';
import { Op } from 'sequelize';

import { Messages } from '../enums/MessagesEnum';
import { Profile } from '../models/Profile';

const FIVE_MINUTES = 5 * 60 * 1000;

const usersOnline = async (userData: { username?: string; }) => {
    try {
        const { username } = userData;

        const fiveMinutesAgo = new Date(Date.now() - FIVE_MINUTES);
        const now = new Date();

        const userResult = await User.findAll({
            where: {
                updatedAt: {
                    [Op.between]: [fiveMinutesAgo, now]
                }
            },
            order: [['updatedAt', 'ASC']]
        });

        if (userResult.length === 0) {
            const error = new Error(Messages.NO_USERS_ONLINE);
            (error as any).statusCode = 404;
            throw error;
        }

        await updateUserTimestamp({ username: String(username) });

        return { message: Messages.EMAIL_VALID, usersOnline: userResult };
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const updateUserTimestamp = async (userData: { username?: string; }) => {
    try {
        const { username } = userData;

        const userResult = await User.findOne({ where: { username } });

        if (!userResult) {
            const error = new Error(Messages.USER_NOT_AUTENTICATED);
            (error as any).statusCode = 404;
            throw error;
        }

        await userResult.update({ updatedAt: new Date() });

        return { message: Messages.UPDATED_SUCCESSFULLY };
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const findUserByUsername = async (username: string) => {
    try {
        const user = await User.findOne({
            where: { username },
            include: [{ model: Profile, where: { id: 1 } }],
        });

        if (!user) {
            throw new Error(Messages.USER_NOT_FOUND);
        }

        return user;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    usersOnline,
    updateUserTimestamp,
    findUserByUsername,
};