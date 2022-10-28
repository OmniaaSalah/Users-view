import { Injectable } from '@angular/core';
import { IUserRoles } from 'src/app/core/Models/iuser-role';

import { BehaviorSubject, finalize, take } from 'rxjs';

import { Filter } from 'src/app/core/models/filter/filter';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';




@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  userRolesListApi: IUserRoles[] = [];
  public userListForSpecificRoleApi: string[] = [];
  public userListForSpecificRole= new BehaviorSubject<string[]>([]);
  public userRolesList= new BehaviorSubject<IUserRoles[]>([]);
  cities: string[];
  rolePowersList:string[];
  datarestrictionLevelList:string[];
  constructor(
    private loaderService:LoaderService,
    private http :HttpHandlerService
    ) {

    this.userRolesListApi = [
      {id:0, 'roleUsers': 10, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مدرس', 'status': 'فعال', 'userName': 'محمد علي' },
      { id:1,'roleUsers': 0, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مدير', 'status': 'غير فعال', 'userName': 'محمد علي' },
      { id:2,'roleUsers': 4, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مهندس كمبيوتر', 'status': 'فعال', 'userName': 'محمد علي' },
      { id:3,'roleUsers': 6, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'فعال', 'userName': 'محمد علي' },
      { id:4,'roleUsers': 10, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مدرس', 'status': 'فعال', 'userName':'محمد علي'},
      {id:5, 'roleUsers': 6, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'فعال', 'userName': 'محمد علي' },
      { id:6,'roleUsers': 10, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مدرس', 'status': 'فعال', 'userName': 'محمد علي' },
      { id:7,'roleUsers': 10, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مدرس', 'status': 'فعال', 'userName':'محمد علي' },
      { id:8,'roleUsers': 9, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مدرس', 'status': 'فعال', 'userName':'محمد علي' },
      {id:9, 'roleUsers': 4, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مهندس كمبيوتر', 'status': 'فعال', 'userName': 'محمد علي'},
      { id:10,'roleUsers': 11, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مدرس', 'status': 'فعال', 'userName': 'محمد علي' },
      { id:11,'roleUsers': 4, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مهندس كمبيوتر', 'status': 'فعال', 'userName':'محمد علي' },
      { id:12,'roleUsers': 13, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'فعال', 'userName': 'محمد علي' },
      {id:13, 'roleUsers': 0, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'غير فعال', 'userName': 'محمد علي' },
      {id:14, 'roleUsers': 15, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'فعال', 'userName': 'محمد علي' },
      { id:15,'roleUsers': 16, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'فعال', 'userName': 'محمد علي' },
      {id:16, 'roleUsers': 0, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'غير فعال', 'userName': 'محمد علي'},
      { id:17,'roleUsers': 0, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'غير فعال', 'userName': 'محمد علي' },
      { id:18,'roleUsers': 19, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'فعال', 'userName':'محمد علي' },
      { id:19,'roleUsers': 20, 'description': 'مهمة هذا الدور الرئيسية هي في مساعدة مدير النظام في ادارة النظام بشكل كامل واعطائه معظم الصلاحيات التي تساعده في الادارة', 'rolePowers': ['الصلاحية1','الصلاحية2','الصلاحية3'], 'dataRestrictionLevel': 'إمكانية وصول المستخدم إلى كافة معلومات المدارس', 'createdDate': '24/01/2022', 'jobRoleName': 'مساعد مدير', 'status': 'فعال', 'userName': 'محمد علي' }
    ];
    this.userRolesList.next(this.userRolesListApi);

    this.cities = [
      "New York",
      "Rome",
      "London",
      "Istanbul"

    ];
    this.datarestrictionLevelList=["إمكانية وصول المستخدم إلى كافة معلومات المدارس","إمكانية وصول المستخدم إلى المعلومات التابعة لمنهج محدد أو أكثر","إمكانية وصول المستخدم إلى المعلومات التابعة لمدرسة معينة أو أكثر"]
    this.rolePowersList= ['الصلاحية1','الصلاحية2','الصلاحية3','الصلاحية4','الصلاحية5','الصلاحية6'];
  }

  getAllRoles(filter?:Filter){

    this.loaderService.isLoading$.next(true);
    return this.http.post('/role-details',{},filter).pipe(take(1),finalize(()=> {
        this.loaderService.isLoading$.next(false)
    }));
  }



}
