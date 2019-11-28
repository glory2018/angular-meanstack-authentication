import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CourseService} from '../../shared/course.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Course} from '../../shared/course';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Observable<Course[]>;
  formModel: FormGroup;

  constructor(public fb: FormBuilder, public courseService: CourseService) {
    this.formModel = this.fb.group({
      name: [''],
    });
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.courseService.getCoursesList(this.formModel.value).subscribe((res) => {
      if (res.success) {
        this.courses = res.data;
      }
    });
  }
}
