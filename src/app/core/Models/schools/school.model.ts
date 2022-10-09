import { CitiesEnum } from "src/app/shared/enums/cities/city.enum";
import { InstitutionEnum } from "src/app/shared/enums/institution/institution.enum";
import { SchoolTypeEnum } from "src/app/shared/enums/school/school.enum";
import { StatusEnum } from "src/app/shared/enums/status/status.enum";
import { Localization } from "../global/global.model";

export interface School{
    id: number,
    name: Localization,
    establishmentDate: Date
    email: string,
    studentCount: number,
    educationalInstitution: InstitutionEnum,
    code: number,
    number:number,
    terkhisNumber:number
    hasSpecialClasses: boolean,
    city:CitiesEnum,
    regionName: Localization,
    streetName: Localization
    latitude:number
    longitutde: number
    locationURL:string
    curriculum: Curriculum
    type: SchoolTypeEnum
    status: StatusEnum
    classification: SchoolClassification
}

export interface Curriculum{
    id: number,
    arabicName: string,
    englishName: string
}

export interface SchoolClassification{
    id: number,
    arabicName: string,
    englishName: string
}