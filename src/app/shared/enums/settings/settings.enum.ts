export enum GracePeriodEnum{
    deleteStudents = 1,
    addSubjects = 2,
    transferStudents=3,
    registerStudents=4,
    raisDegreesFirstClass= 2,
    raisDegreesLastClass= 4,
    repeatStudyPhase=8
}


export enum NotificationChannels{
    System ='System',
    Email='Email',
    SMS='SMS',
    None="None"
}

[
  {
      "id": 1012,
      "code": "1",
      "name": {
          "en": "Grace period for student deletion ",
          "ar": "فترة السماح المخصصة لحذف الطلاب"
      }
  },
  {
      "id": 1013,
      "code": "2",
      "name": {
          "en": "Grace period for adding school year subjects",
          "ar": "فترة السماح المخصصة لإضافة مواد السنة الدراسيّة"
      }
  },
  {
      "id": 1014,
      "code": "3",
      "name": {
          "en": "Grace period for group transfer of students",
          "ar": "فترة السماح المخصصة لنقل الطلاب بشكل جماعي"
      }
  },
  {
      "id": 1015,
      "code": "4",
      "name": {
          "en": "Grace period for entering grades for the first semester",
          "ar": "فترة السماح المخصصة لإدخال درجات الفصل الأول"
      }
  },
  {
      "id": 1016,
      "code": "5",
      "name": {
          "en": "Grace period for entering grades of the last semester",
          "ar": "فترة السماح المخصصة لإدخال درجات الفصل الأخير"
      }
  },
  {
      "id": 1017,
      "code": "6",
      "name": {
          "en": "Grace period for student registration",
          "ar": "فترة السماح المخصصة لتسجيل الطلاب"
      }
  },
  {
      "id": 1018,
      "code": "7",
      "name": {
          "en": "Grace period for adjusting grades after accreditation",
          "ar": "فترة السماح المخصصة لتعديل الدرجات بعد الاعتماد"
      }
  },
  {
      "id": 1020,
      "code": "8",
      "name": {
          "en": "Repeating study phase",
          "ar": "اعادة مرحلة دراسية"
      }
  }
]
