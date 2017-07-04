import { AuthGuard } from './shared/auth.guard';
import { PagerService } from './shared/page.service';
import { DataService } from './shared/data.service';
import { Config } from './shared/config';
import { AppRoutingModule, routedComponents } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
//Third-party
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AdsenseModule } from 'ng2-adsense';
import { MomentModule } from 'angular2-moment';
import { CommentComponent } from './pages/comment/comment.component';
import { LikeComponent } from './pages/like/like.component';



@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    HeaderComponent,
    CommentComponent,
    LikeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(Config.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppRoutingModule,
     AdsenseModule.forRoot(Config.adsense),
     MomentModule,
  ],
  providers: [DataService, PagerService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
