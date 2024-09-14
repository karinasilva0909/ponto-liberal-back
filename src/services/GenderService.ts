import { Messages } from '../enums/MessagesEnum';
import { Gender } from '../models/Gender';

const createGender = async (genderData: { name?: string }) => {
    try {
        const { name } = genderData;
        const genderResult = await Gender.findOne({ where: { name } });

        if (genderResult) {
            throw new Error(Messages.USER_NULL);
        }

        await Gender.create({
            name,
        });

        return Messages.CREATE_PROFILE;

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    createGender,
};