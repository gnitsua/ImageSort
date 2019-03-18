import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {ImageSortComponent} from './image-sort/image-sort.component';
import {IntroScreenComponent} from './intro-screen/intro-screen.component';

const routes: Routes = [
  {path: '', component: IntroScreenComponent},
  // {path: 'groups', component: DashboardComponent},
  // {path: 'detail/:id', component: HeroDetailComponent},
  // {path: 'heroes', component: HeroesComponent},
  {path: 'sort', component: ImageSortComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
