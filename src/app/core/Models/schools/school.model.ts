import { CalendarEvent } from "angular-calendar";
import { CitiesEnum } from "src/app/shared/enums/cities/city.enum";
import { InstitutionEnum } from "src/app/shared/enums/institution/institution.enum";
import { SchoolTypeEnum } from "src/app/shared/enums/school/school.enum";
import { StatusEnum } from "src/app/shared/enums/status/status.enum";
import { State, Street } from "../cities/citiy.model";
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
    address:{
        id: number,
        city: CitiesEnum,
        latitude: number,
        longitutde: number,
        locationURL: string,
        state: State
        street: Street
    }
    state:Localization
    curriculum: Localization
    type: SchoolTypeEnum
    status: StatusEnum
    classification: SchoolClassification,
    schoolLogoPath:string
    diplomaLogoPath:string
}


export interface SchoolClassification{
    id: number,
    arabicName: string,
    englishName: string
}


export interface SchoolEmployee{
    id:number
	name: Localization,
	schoolName?: Localization,
	jobTitle: {
        id:number,
        name:Localization
    },
	email: string,
	discription: string,
	phoneNumber: string
  }




  export interface SchoolGrade{
    id: number
    name: Localization,
    hasTracks: boolean,
    hasDescription: boolean,
    addDegreesAndDescriptionPosiblity: boolean,
    tracks: GradeTrack[],
    subjects: SchoolSubject[]
}


export interface GradeTrack{
    id: number,
    name: Localization,
    // subjectCount: number,
    subjects: SchoolSubject[]
}

export interface SchoolSubject{
    id: number,
    name: Localization,
    studyHour: {ticks : number},
    isOptional : boolean,
    haveGpa : boolean,
    isAddToFinalScore : boolean,
    weekClassRoomNumber : number,
    maxGpa:number,
    gradeSubjectId?:number,
    trackSubjectId?:number
}

export interface GradeCalenderEvent extends CalendarEvent{
    id?:number,
    weekDayId?:number
    lectureId?:number
  }