export interface IUserRoles {
    id?:number;
    jobRoleName:string;
    creatorName?:string;
    roleUsers?:number;
    status:boolean;
    createdDate?:string;
    description:string;
    rolePowers:string[];
    dataRestrictionLevel?:string;
}
