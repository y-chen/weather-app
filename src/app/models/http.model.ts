import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpOptions {
	headers?: Header[];
	params?: Param[];
}

export type Header = KeyValuePair;
export type Param = KeyValuePair;

export interface KeyValuePair {
	key: string;
	value: any;
}

export type HttpOption = HttpHeaders | HttpParams;
