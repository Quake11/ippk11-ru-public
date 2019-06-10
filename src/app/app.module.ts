import { AppRoutes } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  MetaLoader,
  MetaModule,
  MetaStaticLoader,
  PageTitlePositioning,
} from '@ngx-meta/core';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ippkApp' }),
    BrowserAnimationsModule,
    AppRoutes,
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: metaFactory,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName:
      'Сайт дистанционных курсов института ПП и ПК работников агропромышленного комплекса Республики Коми',
    defaults: {
      title:
        'Дистанционное обучение для работников агропромышленного комплекса',
      description:
        'Дистанционные курсы повышения квалификации и профессиональной переподготовки для работников агропромышленного комплекса',
      'og:image': 'https://ippk11.ru/assets/intro.jpg',
      'og:type': 'website',
      'og:locale': 'ru_RU',
    },
  });
}
