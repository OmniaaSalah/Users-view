import { CustomFile } from "src/app/shared/components/file-upload/file-upload.component"
import { CertificatesEnum } from "src/app/shared/enums/certficates/certificate.enum"
import { DegreesCertificatesEnum } from "src/app/shared/enums/certficates/degrees-certificates"
import { GenderEnum } from "src/app/shared/enums/global/global.enum"
import { RegistrationStatus, StatusEnum, UserRequestsStatus } from "src/app/shared/enums/status/status.enum"
import { requestTypeEnum } from "src/app/shared/enums/system-requests/requests.enum"
import { Localization, BaseEntity } from "../global/global.model"



export interface WorkflowOptions{
    
    id: number,
    title: Localization
    label: Localization
    isCommentRequired: boolean,
    commentTitle: string,
    isAttachmentRequired: boolean,
    type: string,
    isActionVisibleExternally: boolean,
    buttonTag: buttonStyle
    isLoading?:boolean
}


type buttonStyle = 'primary' | 'outline-none' | 'secondary' | 'danger'



export interface UserRequest{
    // NOTE :- ----Common Data -------
    id: number,
    requestNumber:number,
    requestStatus: UserRequestsStatus,
    certificateStatus:UserRequestsStatus
    createdBy: Localization,
    guardian: { id: number,name: Localization },
    createdDate: string,
    requestType: requestTypeEnum,
    cause: string,
    requestAttachments: CustomFile[],
   
    commonRequestId:number
    requestComments:any[]

    student:{
        id:number
        parsonalImagePath:string,
        isChildOfAMartyr:boolean
        isTalented:boolean
        age: number
        grade:BaseEntity
        identityNum: number
        name:Localization,
        surname:Localization,
        gender: GenderEnum, 
        birthDate:Date,
        nationality:BaseEntity,
        relativeRelation: BaseEntity,
        passportNum:string,
        religion: BaseEntity,
        attachments: CustomFile[]
        status:RegistrationStatus
    },

    // NOTE:- Certificate Requests ------
    certificateType:CertificatesEnum,
    //----- شهاده التسلسل الدراسى------
    schoolYears:SchoolYear[]
    //----- شهاده الدرجات------
    SchoolYear :Localization,
    gradeCertificateType : DegreesCertificatesEnum,

    // NOTE:- Flexable Holiday Request ------
    dateFrom:Date,
    dateTo:Date,
    annualCalendarName :Localization
    schoolYear:Localization
    holidayName: Localization
    reason:string

    // NOTE:- Update Identity Number Request ------
    newIdentityNumber:Number,

    // NOTE:- Withdrawal Request ------
    WithdrawalType:Localization

    // NOTE:- Register Child Request ------
    childId:number
    isChildOfAMartyr: boolean,
    isSpecialAbilities: boolean,
    isSpecialClass:boolean,
    isInFusionClass:boolean,
    specialClass:BaseEntity,
    isSpecialEducation: boolean,
    specialEducation:BaseEntity,
    grade: BaseEntity,
    school:BaseEntity,

    // NOTE:- Flexable Holiday Request ------
    schoolFrom : Localization
    schoolTo :Localization
    gradeTo : Localization
    divisionTo : Localization
    studentNumber:number

    // NOTE:- Update Identity info Request ------
    name: Localization,
    nickName: Localization,
    birthDate:Date,
    gender: GenderEnum,
    religionName: Localization,
    nationalityName: Localization,

    // NOTE:- Relink child with new Guardian Request ------
    
    // NOTE:- Flexable Holiday Request ------

}



export interface SchoolYear{
    schoolYear:Localization
    schoolName:Localization
    gradeName:Localization
}