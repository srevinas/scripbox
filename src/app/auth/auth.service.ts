import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Auth } from "./auth.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = "http://localhost:3000/signin";
  user = new Subject<Auth>();
  p: boolean;

  constructor(public http: HttpClient) {}

  fetchSigninDetails() {
    return this.http.get<Auth[]>(this.url);
  }

  postsignDetails(body: Auth) {
    return this.http.post<Auth>(this.url, body);
  }
  getUserAction(p: boolean) {
    this.p = p;
  }
  setAction() {
    return this.p;
  }
}
