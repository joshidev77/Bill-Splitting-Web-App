import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIURL } from "../env";

interface GroupList {
    id: number
    name: string
    participants: string[]
    expenses?: Expense[];
    bgClass?: string
}
interface Expense {
    expense?: number;
    reason?: string;
}
interface User {
    id: number
    name: string
}
@Injectable({
    providedIn: 'root',
})

export class GroupService {
    constructor(private httpClient: HttpClient) { }
    getGroup(): Observable<GroupList[]> {
        return this.httpClient.get<GroupList[]>(`${APIURL}/groups`);
    }
    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${APIURL}/users`)
    }
}
