import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor} from '@angular/common/http';
import { LoggedUser, LoginDto, RegisterDto } from './models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  register(user: RegisterDto): Observable<LoggedUser>{
    // TODO: enviroments
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "register", user);
  }

  login(user: LoginDto): Observable<LoggedUser>{
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "login", user);
  }

  setLoggedUser(user: LoggedUser){
    //salva use in Local Storage
    localStorage.setItem("user", JSON.stringify(user));
  }

  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem("user");

    if(userStorage) {
      let u: LoggedUser = JSON.parse(userStorage);
      return u;
    } else {
      return null
    }
  }
}
