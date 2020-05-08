import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {Page404Component} from '../share/page404/page404.component';
import {AppRoutingModule} from './app-routing.module';
import {ShareModule} from '../share/share.module';
import {AuthGuardService} from '../service/auth.guard.service';
import {IndexGuardService} from '../service/index.guard.service';
import {MarkdownModule} from 'ngx-markdown';
import {UnsavedGuard} from '../service/unsaved.guard.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    Page404Component,
  ],
  imports: [
    ShareModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MarkdownModule.forRoot(),
  ],
  exports: [
    AppRoutingModule,
    Page404Component,
  ],
  providers: [AuthGuardService, IndexGuardService, UnsavedGuard,
    {
      provide: NZ_I18N,
      useValue: zh_CN
    },
    {
      provide: 'BASE_CONFIG',
      useValue: {
        // baseUrl: 'http://localhost:11111/virus',
        baseUrl: 'http://zzyitj.xyz:7290/virus'
      }
    }
  ],
})
export class CoreModule {
}
