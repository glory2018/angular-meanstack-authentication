import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from './../../shared/auth.service';
import {User} from '../../shared/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  user: User;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUser(id).subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit() {
  }
}
