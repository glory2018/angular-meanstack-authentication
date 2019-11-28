import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint = 'http://localhost:9000/api3/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/createUser`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['users']);
        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        // });
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    const api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  getUser(id): Observable<any> {
    return this.http.get(`${this.endpoint}/getUserById/${id}`);
  }

  createUser(user: object): Observable<object> {
    return this.http.post(`${this.endpoint}`, user);
  }

  updateUser(id: number, value: any): Observable<object> {
    return this.http.put(`${this.endpoint}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/deleteUser/${id}`, {responseType: 'text'});
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.endpoint}/getAllUsers`);
  }
}
