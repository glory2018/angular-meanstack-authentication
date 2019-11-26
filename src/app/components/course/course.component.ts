import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './../../shared/auth.service';
import {User} from '../../shared/user';
import {Observable} from 'rxjs';
import {CourseService} from '../../shared/course.service';
import {FormGroup} from '@angular/forms';
import {Course} from '../../shared/course';

@Component({
  selector: 'app-user-list',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Observable<Course[]>;
  form: FormGroup;
  constructor(public courseService: CourseService, private actRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.courses = this.courseService.getCoursesList(this.form.value);
  }
}
