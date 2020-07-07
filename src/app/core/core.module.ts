import {BrowserModule} from '@angular/platform-browser';
import {NgModule, SecurityContext} from '@angular/core';

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
import {MarkdownModule, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {UnsavedGuard} from '../service/unsaved.guard.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
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
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
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
