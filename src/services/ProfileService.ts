import { Mesages } from '../enums/MessagesEnum';
import { User } from '../models/User';
import { Profile } from '../models/Profile';

const createProfile = async (profileData: { username?: string; firstName?: string; lastName?: string; bio?: string; }) => {
    try {
        const { username, firstName, lastName, bio } = profileData;
        const userResult = await User.findOne({ where: { username } });

        if (!userResult) {
            throw new Error(Mesages.USER_NOT_FOUND);
        }

        await Profile.create({
            firstName,
            lastName,
            bio,
            userId: userResult.id
        });

        return Mesages.CREATE_PROFILE;

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    createProfile,
};
