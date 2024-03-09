export interface AccountReq {
    email: string | null;
    username: string;
    city: string;
    country: string;
    password: string;
    birthday: Date | null;
    accountStatus: number | null;
    fullname: string | null;
    role: AccountReqRole;
}

export enum AccountReqRole {
    Staff,
    User
}
