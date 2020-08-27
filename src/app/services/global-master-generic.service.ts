import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { ApiRequest } from '../models/api-request.model';
import { RequestType } from '../models/api-request.model';
import { Parameter } from '../models/parameter.model';

import json from '../../assets/global-service-configs.json';
import { AppResponse } from '../app-response/app-response';

@Injectable({
  providedIn: 'root'
})
export class GlobalMasterGenericService {

  private defaultVersion = 'v1';
  private baseUrl = "http://etf.qa.inova.lk/bu";

  constructor(private httpClient: HttpClient) { }

  public getMetaData<T>(urlCode: string, parameterList: Array<Parameter>, version?: string): Observable<AppResponse<T>> {

      let complexObject = {};
      let urlInfo = json.urlInfo;
      let name: string;
      let value: string;
      let parameterValidation: Parameter;

      const complexObjectList = parameterList
          .filter(complexObject => typeof complexObject.value !== "number" && typeof complexObject.value !== "string") as Array<Parameter>;

      if (complexObjectList.length > 1) {
          return null;
      }
  
      complexObject = complexObjectList.length === 1 ? complexObjectList[0].value : {};

      version = version ?? this.defaultVersion;
      let urlDetails = urlInfo.find(urlInfo => urlInfo.operationId === urlCode && urlInfo.version === version) as ApiRequest;
      let url = urlDetails.path;
      let httpRequest = urlDetails.httpRequest;

      const primitiveTypeParameterList = parameterList
          .filter(primitiveParameter => typeof primitiveParameter.value === "number" || typeof primitiveParameter.value === "string") as Array<Parameter>;

      if (this.propertiesValidation(urlDetails.requestTypeList, parameterList)) {

          urlDetails.requestTypeList.forEach(requestType => {
              debugger
              
              if (requestType.required) {
                  parameterValidation = parameterList
                      .find(primitiveParameter => primitiveParameter.name === requestType.name) as Parameter;

                  if(!parameterValidation){
                      window.alert(`Parameter ${parameterValidation.name} is required!`);
                  }
              }

          });
          debugger

          primitiveTypeParameterList.forEach(parameter => {
              name = parameter.name;
              value = parameter.value;
              url = url.replace(`{${name}}`, value);
          });

          url = `${this.baseUrl}/${version}${url}`;

          return this.httpClient.request(httpRequest, url, { body: complexObject, responseType: 'json' }) as Observable<AppResponse<T>>;
      } else {
          window.alert(`Parameters you entered are not valid!, Try again with correct input`);
      }
  }

  private propertiesValidation(requestType: Array<RequestType>, parameterList: Array<Parameter>): boolean {
      let request_type = [];
      let parameter_name = [];
      requestType.forEach(rType => {
          request_type.push(rType.name);
      });

      parameterList.forEach(parameterName => {
          parameter_name.push(parameterName.name);
      });

      const result = parameter_name.every(val => request_type.includes(val));

      return result;
  }

}
