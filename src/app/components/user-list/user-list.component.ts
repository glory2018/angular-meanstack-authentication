import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './../../shared/auth.service';
import {User} from '../../shared/user';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  formModel: FormGroup;

  constructor(public fb: FormBuilder, public authService: AuthService, private actRoute: ActivatedRoute, private router: Router) {
    this.formModel = this.fb.group({
      username: [''],
    });
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.authService.getUsersList();
  }

  deleteUser(id: number) {
    this.authService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  updateUser(id: number) {
    this.router.navigate(['updateUser', id]);
  }
}
