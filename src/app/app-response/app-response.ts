import { Meta } from './meta';
import { Error } from './error';
import { Paging } from './paging';

export interface AppResponse<T> {
    data: T;
    meta: Meta;
    error: Error;
    paging: Paging;
}
