import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {ImageSortComponent} from './image-sort/image-sort.component';
import {IntroScreenComponent} from './intro-screen/intro-screen.component';
import {SignInComponent} from './signin/signin.component';
import {LoggedInGuard} from '../infrastructure/sessions/loggedInGuard';

const routes: Routes = [
  {path: '', component: IntroScreenComponent},
  { path: 'signin', component: SignInComponent },
  { path: 'sort', component: ImageSortComponent,canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
