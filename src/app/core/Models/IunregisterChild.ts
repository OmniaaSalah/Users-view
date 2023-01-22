import { Localization } from "./global/global.model"

export interface IunregisterChild {
    id: number
    name: Localization
    surname: Localization
    relativeRelation: Localization
    nationality: Localization
    emiratesIdPath: string
    gender: string
    passportNumber: number
    emiratesIdNumber: any
    age: number
    birthDate: string
    imagePath: string
  }
  
  