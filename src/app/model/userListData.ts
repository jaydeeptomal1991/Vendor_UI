import { UsersData } from "./userData";

export interface UserListData {
    statusCode: number;
    message: string;
    data: UsersData[];
}