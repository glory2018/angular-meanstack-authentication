import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './../../shared/auth.service';
import {User} from '../../shared/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: User;

  constructor(public authService: AuthService, private actRoute: ActivatedRoute, private router: Router) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUser(id).subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit() {
  }

  updateUser() {
    this.authService.updateUser(this.id, this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
    this.gotoList();
  }

  onSubmit() {
    this.updateUser();
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}
