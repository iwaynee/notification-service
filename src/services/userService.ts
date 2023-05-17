import {Service} from "typedi";
import {getDataSource} from "../util/databaseConnection";
import {User} from "../entities/User";
import {randomUUID} from "crypto";
import {IUser} from "../types/IUser";

const userRepo = getDataSource().getMongoRepository(User);



@Service()
export class UserService {

    constructor() {

    }

    createUser(data: any){
        const user = new User();
        user.uid = randomUUID();
        if ( data.name ) { user.name = data.name; }
        if ( data.email ) { user.email = data.email; }
        if ( data.phone ) { user.phone = data.phone; }
        return user.save()
    }

    async getUser(uid: string){
        return userRepo.findOne({where: { uid: uid}})
    }

    async updateUser(data: IUser): Promise<User | null>{

        // Get User
        const user = await this.getUser(data.uid);

        if (user) {
            // update entity
            if ( data.name ) { user.name = data.name; }
            if ( data.email ) { user.email = data.email; }
            if ( data.phone ) { user.phone = data.phone; }
            await user.save()
        }

        return user
    }


    async deleteUser(uid: string) {
        return (await userRepo.deleteOne({uid: uid})).deletedCount
    }
}
