import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {MessagesComponent} from './messages/messages.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ImageSortComponent} from './image-sort/image-sort.component';
import {ImageSliderComponent} from './image-slider/image-slider.component';

import {GroupContainerComponent} from './group-container/group-container.component';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GridsterModule } from 'angular-gridster2';
import { ImageComponent } from './image/image.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {GroupComponent} from './group/group.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { GroupModalComponent } from './group-modal/group-modal.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    PerfectScrollbarModule,
    DragDropModule,
    GridsterModule,
    AngularFontAwesomeModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    GroupContainerComponent,
    ImageSortComponent,
    ImageSliderComponent,
    ImageComponent,
    GroupComponent,
    TopBarComponent,
    GroupModalComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [GroupModalComponent]
})
export class AppModule {
}
