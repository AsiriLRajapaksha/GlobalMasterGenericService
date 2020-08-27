// export interface ApiRequest{
//     path: string;
//     version: string;
//     httpRequest: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
//     operationId: string;
// }


export interface ApiRequest {
    operationId?: string;
    version?: string;
    httpRequest?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    requestTypeList?: Array<RequestType>;
    responseType?: string;
    path?: string;
}

export interface RequestType {
    name: string;
    in: 'path' | 'body' | 'query' | 'formData';
    required: boolean;
    type: string;
}

