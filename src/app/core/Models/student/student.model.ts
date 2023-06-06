import { RegistrationStatus } from "src/app/shared/enums/status/status.enum"
import { City } from "../cities/citiy.model"
import { Curriculum, Division, Grade, Localization, Track } from "../global/global.model"

export interface Student{

        id: number
        studentGuid:string
        name: Localization
        surname: Localization
        parsonalImagePath :string
        gender: number
        birthDate: Date
        age: number
        daleelId: number
        ministerialId: number
        schoolCode: number
        studentNumber: number
        emiratesId: number
        emiratesIdExpirationDate: string
        reasonForNotHavingEmiratesId: string
        passportId: number
        passportIdExpirationDate: Date
        manhalNumber: number
        isSpecialAbilities: boolean
        isRegistered: boolean
        isSpecialClass: boolean
        isInFusionClass: boolean
        isChildOfAMartyr: boolean
        isPassed: boolean
        isGifted: boolean
        emiratesIdPath: string
        fullAmountToBePaid: number
        paidAmount: number
        remainingAmount: number
        accountantComment: string
        isExemptFromStudyingArabic: boolean
        isExemptFromStudyingIslamic: boolean
        dateOfAcceptance: string

        guardianId:number
        // registrationStatus: string
        studentStatus: RegistrationStatus,
        isOwnsLaptop: boolean
        isHasInternet: boolean
        isUsePublicTransportation: boolean
        isSpecialEducation: boolean
        transferred: boolean
        motherLanguage: {
            id: number
            name: Localization
        }
        languageAtHome: {
            id: number
            name: Localization
        }
        mostUsedLanguage: {
            id: number
            name: Localization
        }
        birthdateCertificatePath: string
        amendFamilyBookPath: string
        isActive: boolean
        school: {
            id: number
            name: Localization
        }
        grade: Grade
        division: Division
        curriculum: Curriculum
        track: Track
        nationality: {
            id: number
            name: Localization
        }
        address: {
            id: number
            city: City
            latitude: number
            longitutde: number
            locationURL: string
            state: {
                id: number
                name: Localization
            }
            street: {
                id: number
                name: Localization
            }
        }
        schoolYear: {
            id: number
            name: Localization
        }
        religion: {
            id: number
            name: Localization
        }
        studentProhibited: {
            id:number
            rCertificateFromSPEA  : boolean
            certificateFromSchool : boolean
            withdrawingFromSPEA  : boolean
            withdrawingFromSchool : boolean
        },
        studentPayments:{}

}
