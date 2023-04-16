export enum GracePeriodEnum{
    deleteStudents = 1,
    addSubjects = 2,
    transferStudents=3,
    raisDegreesFirstClass= 4,
    raisDegreesLastClass= 5,
    registerStudents=6,
    updateDegreesAfterApproved=7,
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
      "id": 1021,
      "code": "1",
      "name": {
          "en": "Student deletion ",
          "ar": "حذف الطلاب"
      }
  },
  {
      "id": 1022,
      "code": "2",
      "name": {
          "en": "Adding school year subjects",
          "ar": "إضافة مواد السنة الدراسيّة"
      }
  },
  {
      "id": 1023,
      "code": "3",
      "name": {
          "en": "Group transfer of students",
          "ar": "نقل الطلاب بشكل جماعي"
      }
  },
  {
      "id": 1024,
      "code": "4",
      "name": {
          "en": "Entering grades for the first semester",
          "ar": "إدخال درجات الفصل الأول"
      }
  },
  {
      "id": 1025,
      "code": "5",
      "name": {
          "en": "Entering grades of the last semester",
          "ar": "إدخال درجات الفصل الأخير"
      }
  },
  {
      "id": 1026,
      "code": "6",
      "name": {
          "en": "Student registration",
          "ar": "تسجيل الطلاب"
      }
  },
  {
      "id": 1027,
      "code": "7",
      "name": {
          "en": "Adjusting grades after accreditation",
          "ar": "تعديل الدرجات بعد الاعتماد"
      }
  },
  {
      "id": 1028,
      "code": "8",
      "name": {
          "en": "Repeating study phase",
          "ar": "اعادة مرحلة دراسية"
      }
  }
]
