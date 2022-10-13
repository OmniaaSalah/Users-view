export interface IAccountAddOrEdit {
  id: number
  fullName: string
  phoneNumber: string
  email: string
  emiratesIdNumber: string
  arabicSurname: string
  englishSurname: string
  jobTitle: string
  gender: number
  birthDate: string
  emiratesIdPath: string
  employeeIdNumber: string
  permissionToEnterScore: boolean
  status:number 
  nationalityId: number
  relativeRelationId: number
  password: string
  nickName: string
  isActive: boolean
  scope: string
  roles: number[]
}