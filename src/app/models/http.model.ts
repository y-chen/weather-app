import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpRequestOptions {
	headers?: Header[];
	params?: Param[];
	withCredentials?: boolean;
}

export type Header = KeyValuePair;
export type Param = KeyValuePair;

export interface KeyValuePair {
	key: string;
	value: any;
}

export type HttpOption = HttpHeaders | HttpParams;
