import { computed, inject, Injectable } from "@angular/core";
import { DataService } from "../shared";

@Injectable({ providedIn: 'root' })
export class DataModService {
    private readonly dataService = inject(DataService);
    public dogSignal = computed(() => this.dataService.dogData());

    public getDogNames(): string[] {
        return this.dogSignal().map((dg) => dg['attributes']['name']);
    }
}