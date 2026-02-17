import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { tap } from "rxjs";

export interface ApiResponseDto {
    [key: string]: any;
}

@Injectable()
export class DataService {
    private readonly http = inject(HttpClient);
    public dogData = signal<ApiResponseDto[]>([]);

    public getDogBreeds(page = 1) {
        const headers = new HttpHeaders().append("accept", ["application/json"]);
        const params = new HttpParams().append(`page[size]`,"10").append(`page[number]`, page.toString());
        return this.http
            .get<ApiResponseDto>(`https://dogapi.dog/api/v2/breeds`, {headers, params})
            .pipe(
                tap((res) => {
                    if(res['data'].length > 0) {
                        this.dogData.set(res['data']);
                    }
                })
            );
    }
}
