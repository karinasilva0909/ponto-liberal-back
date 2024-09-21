import { Messages } from '../enums/MessagesEnum';
import { Gender } from '../models/Gender';
import UserService from './UserService';

const createGender = async (genderData: { username?: string, name?: string }) => {
    try {
        const { username, name } = genderData;

        const user = await UserService.findUserByUsername(username!);

        if (!user.profiles.some(profile => profile.id === 1)) {
            throw new Error(Messages.INSUFFICIENT_PERMISSIONS);
        }

        const genderResult = await Gender.findOne({ where: { name } });

        if (genderResult) {
            throw new Error(Messages.GENDER_ALREADY_EXISTS);
        }

        await Gender.create({
            name,
        });

        await UserService.updateUserTimestamp({ username: String(username) });

        return Messages.CREATE_PROFILE;

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const findAllGenders = async () => {
    try {

        const genders = await Gender.findAll({
            order: [['id', 'ASC']],
        });

        return genders;

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    createGender,
    findAllGenders,
};