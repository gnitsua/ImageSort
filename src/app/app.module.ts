import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {GridsterModule} from 'angular-gridster2';
import {ImageComponent} from './image/image.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {GroupComponent} from './group/group.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {GroupModalComponent} from './group-modal/group-modal.component';

import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule, MatCardModule, MatGridListModule} from '@angular/material';
import {IntroScreenComponent} from './intro-screen/intro-screen.component';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi';
import { FolderSelectComponent } from './folder-select/folder-select.component';
import { GapiSession } from '../infrastructure/sessions/gapi.session';
import {AppSession} from '../infrastructure/sessions/app.session';
import {FileSession} from '../infrastructure/sessions/file.session';
import {UserSession} from '../infrastructure/sessions/user.session';
import {AppRepository} from '../infrastructure/repositories/app.repository';
import {BreadCrumbSession} from '../infrastructure/sessions/breadcrumb.session';
import {FileRepository} from '../infrastructure/repositories/file.repository';
import {UserRepository} from '../infrastructure/repositories/user.repository';
import {AppContext} from '../infrastructure/app.context';
import {LoggedInGuard} from '../infrastructure/sessions/loggedInGuard';
import { SignInComponent } from './signin/signin.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

let gapiClientConfig: NgGapiClientConfig = {
  client_id: '981904059013-est0r4fo4t62311kqffdek072rkaokge.apps.googleusercontent.com',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v2/rest'],
  scope: [
    'https://www.googleapis.com/auth/drive',
  ].join(' ')
};

export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

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
    ScrollingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
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
    GroupModalComponent,
    IntroScreenComponent,
    FolderSelectComponent,
    SignInComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true },
    AppContext,
    AppSession,
    FileSession,
    GapiSession,
    UserSession,

    AppRepository,
    BreadCrumbSession,
    FileRepository,
    UserRepository,
    LoggedInGuard
  ],
  entryComponents: [GroupModalComponent,FolderSelectComponent]
})
export class AppModule {
}
