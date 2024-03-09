import { HttpStatusCode } from "axios";
import { PagingResponse } from "./pagingResponse";

export interface ApiResponse<T> {
    statusCode: HttpStatusCode;
    message: string | null;
    data: T | null;
}

export interface PagingApiResponse<T> {
    statusCode: HttpStatusCode;
    message: string | null;
    data: PagingResponse<T> | null;
}