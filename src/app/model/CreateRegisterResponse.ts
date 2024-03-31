import { UserResponse } from "./UserResponse";

export class CreateRegisterResponse {
    statusCode: number | undefined;
    message: string | undefined;
    user: UserResponse | undefined;
}