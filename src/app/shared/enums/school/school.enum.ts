export enum SchoolTypeEnum{
    Primary = 'Primary',
    Preparatory = 'Preparatory',
    Secondary= 'Secondary'
}

export enum TransferType{
    TransferOutOfTheCountry ='TransferOutOfTheCountry',
    TransferOutsideTheEmirate = 'TransferOutsideTheEmirate',
    TransferWithinTheEmirate = 'TransferWithinTheEmirate'
  }



export enum FirstGradeCodeEnum{
  P0 = 'P0',//FoundationStage
  FS1 = 'FS1', //FoundationStage المرحله التمهيديه
  KG1 =  'KG1',//رياض الاطفال
  KG2 =  'KG1',//رياض الاطفال
  FS2  =  'FS2',//رياض الاطفال
  Y1 ='Y1',//رياض الاطفال
  Y2 ='Y2', //رياض الاطفال
}

export const FoundationStage =['P0', 'FS1'] //المراحل التمهيديه
export const preschools = ['KG1', 'KG2',"1", 'FS2', 'Y1', 'Y2'] //مراحل رياض الاطفال

export enum CurriculumCodeEnum{
    English = "EnCurr",
    French = "FrCurr",
    Australian = "AuCurr",
    Philippine = "PhCurr",
    British = "BrCurr",

}


export enum GradeCodeEnum{
    one =  1,
    two = 2,
    three=3,
    four =4,
    five= 5,
    six = 6,
    seven=7,
    eight =8,
    nine = 9,
    ten = 10,
    eleven = 11,
    twelve =12,
    thirteen = 13,
    Kindergarten='Kindergarten',
    PRE_KG = 'PRE-KG',
    Preschool = 'Pre-Kindergarten/Preschool'

}


