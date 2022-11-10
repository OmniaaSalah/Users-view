export interface Localization{
    ar: string
    en: string,
}

export interface Curriculum{
    id: number,
    name:Localization,
}

export interface Grade{
    id: number,
    name:Localization,
}

export interface Track{
    id: number,
    name:Localization,
}
export interface Curriculum{
    id: number,
    name:Localization,
}

export interface Division{
    id: number,
    name:Localization,
    hasTrack?: boolean
    isAcceptStudent?:boolean
}


export interface OptionalSubjects{
    id: number,
    name:Localization,
}

export interface GenericResponse<T>{
    data: T
    total:number
    totalAllData:number
}