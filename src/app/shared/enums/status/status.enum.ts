export enum StatusEnum {
    Active = 'Active',
    Inactive = 'Inactive',

    Available = 'Available',
    Unavailable = 'Unavailable',

    // NOTE:------ Student Registration Status------
    // Registered= 'Registered',
    // Unregestered= 'Unregestered',
    // WithdrawnRejected = 'WithdrawnRejected',
    Deleted ='Deleted',
    // Withdrawn = 'Withdrawn',
    // Transferd="Transferd",
    // Withdrawal="Withdrawal",
    // //اعادة قيد
    // ReEnrolment="ReEnrolment",

    SonsOfArabs="SonsOfArabs",
    SonsOfNonArabs="SonsOfNonArabs",
    IsChildOfAMartyr="IsChildOfAMartyr",
    ChildOfCitizens="ChildOfCitizens",
    Citizens="Citizens",
    SonsOfTheFirstLineOfDefens="SonsOfTheFirstLineOfDefens",
    EmiratesCitizens="EmiratesCitizens",
    GCCNational="GCCNational",
    IsSpecialAbilities="IsSpecialAbilities",
    Arabs="Arabs",
    NonArab= 'NonArab',
    //----------------------------------------------

    Pending = 'Pending',
    TentativeAccepted = 'TentativeAccepted',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Sent = 'Sent',
    Draft = 'Draft',
    Closed = 'Closed',
    Apparent= 'Apparent',


    Passed = 'Passed',
    Failed = 'Failed',
    Incomplete='Incomplete',
    NotCompleteSchoolYear='NotCompleteSchoolYear',
    FinalFaild='FinalFaild',
    RetakeExam='RetakeExam', //'اعاده امتحان' in case the student failed in some subjects

    Flexible='Flexible',
    NotFlexible='NotFlexible',

    true='true',
    false='false',


    TentativelyAccepted = "TentativelyAccepted",
    Returned = "Returned",
    Canceled = "Canceled",
    Approved = "Approved",


    Completed="Completed",
    Mandatory='Mandatory',
    Optional='Optional'
}



export enum RegistrationStatus{
    Unregistered='Unregistered',
    Registered="Registered",
    Transferd="Transferd",
    Deleted="Deleted",
    Withdrawal="Withdrawal",
    //اعادة قيد
    ReEnrolment='ReEnrolment'
}

export enum ReEnrollmentType{
    TransferredWithinTheEmirate='TransferredWithinTheEmirate',
    TransferredFromOutsideTheEmirate='TransferredFromOutsideTheEmirate',
    TransferredFromOutsideTheCountry='TransferredFromOutsideTheCountry',
    //مستجد
    Newbie='Newbie',
    //تحديد مستوي
    LevelSetting='LevelSetting',
    ReEnrolment='ReEnrolment'
}

export enum UserRequestsStatus{
    Pending = "Pending",
    TentativelyAccepted = "TentativelyAccepted",
    Accepted = "Accepted",
    Rejected = "Rejected",
    Returned = "Returned",
    ModificationRequest ="ModificationRequest",
    Canceled = "Canceled",
    //معتمد
    Approved = "Approved",
    SentForApproval  ="SentForApproval"
}

export enum TransportaionType{
    SchoolBus="SchoolBus",
    PrivateCar="PrivateCar"
}

export enum MessageStatus{
  Pending = "Pending",
  Read = "Read",
  Answered = "Answered",
}


export enum ProhabitionType{
    CertificateFromSPEA = "CertificateFromSPEA",
    CertificateFromSchool = "CertificateFromSchool",
    WithdrawingFromSchool = "WithdrawingFromSchool",
    WithdrawingFromSPEA = "WithdrawingFromSPEA"
  }