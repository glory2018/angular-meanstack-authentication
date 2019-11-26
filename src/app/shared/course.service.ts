import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  endpoint = 'http://localhost:9000/api1/course';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  getCoursesList(course: object): Observable<any> {
    return this.http.post(`${this.endpoint}/getCoursesList`, course);
  }
}
