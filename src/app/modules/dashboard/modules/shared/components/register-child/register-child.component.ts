import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit {
  // @Input('student') student
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @Output() onEdit = new EventEmitter()

  step=7
  editStudentinfoMode =false

  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];


    // << DATA PLACEHOLDER >> //
    student=
    {
      name:'محمد على',
      age: 15,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school:'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation:'ابن الاخ',
      src:'assets/images/avatar.png'
    }

  schoolClasses: any[] = [

    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Blue Band",
      "description": "Product Description",
      "image": "blue-band.jpg",
      "price": 79,
      "category": "Fitness",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },

  ]

  studentFormm = this.fb.group({
    id: [] ,
    arabicName: [],
    englishName: [],
    surName: [],
    guardianId: [],
    schoolId: [],
    gradeId: [],
    classRoomId: [] ,
    schoolYearId: [] ,
    genderId: [] ,
    religionId: [] ,
    curriculumId: [] ,
    trackId: [] ,
    nationalityId: [] ,
    expireDate:[], //missing
    nationalId:[], //missing
    birthDate: [],
    daleelId: [] ,
    ministerialId: [] ,
    schoolCode: [] ,
    isSpecialAbilities: [] ,
    isSpecialClass: [] ,
    isChildOfAMartyr : [],
    isPassed : [],
    isGifted: [] ,
    emiratesIdPath: [],
    addressId: [] ,
    behaviorId: [],
    city:[], //missing
    emara:[], //missing
    state:[], //missing
    requiredAmount:[], //missing
    paidAmount:[], //missing
    restAmount:[], //missing
    accountantComment:[], //missing
  })
  

    // << FORMS >> //
    medicalFileForm= this.fb.group({
      id:[],
      chronicDiseases: [[{name:'أمراض القلب'},{name:'السكرى'}]],
      allergicDiseases: [['سيلان الأنف التحسسي ']],
      disabilities: [],
      isTheSonOfDetermination: [],
      fats: [],
      iq:[],
      intelligencePercentage:[],
      bloc:[],
      increase: [],
      decrease: [],
      dietFollowed: [],
      isAthletic: [],
      weight: [],
      height:[],
      otherNotes: []
    })
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  onEditmode(){
    this.onEdit.emit(this.student)
  }

}
