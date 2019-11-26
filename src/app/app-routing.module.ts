import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

import {AuthGuard} from './shared/auth.guard';
import {UserListComponent} from './components/user-list/user-list.component';
import {UpdateUserComponent} from './components/update-user/update-user.component';
import {CourseComponent} from './components/course/course.component';


const routes: Routes = [
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: 'log-in', component: SigninComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'details/:id', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'updateUser/:id', component: UpdateUserComponent, canActivate: [AuthGuard]},
  {path: 'course', component: CourseComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
