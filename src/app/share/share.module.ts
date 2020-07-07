import {NgModule} from '@angular/core';
import {
  NzAlertModule,
  NzAvatarModule,
  NzButtonModule,
  NzCheckboxModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzMessageModule,
  NzMessageServiceModule,
  NzModalModule,
  NzPageHeaderModule,
  NzRadioModule,
  NzResultModule,
  NzSkeletonModule,
  NzSpinModule,
  NzTypographyModule,
  NzGridModule,
  NzCardModule,
  NzSwitchModule,
  NzToolTipModule,
  NzTagModule,
  NzCollapseModule,
  NzEmptyModule,
  NzCarouselModule,
  NzAnchorModule,
  NzTableModule, NzSelectModule, NzStepsModule, NzUploadModule, NzInputNumberModule, NzDividerModule, NzTabsModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './logo/logo.component';
import {BytePipe} from '../pipe/byte.pipe';
import {RatePipePipe} from '../pipe/rate.pipe';
import {DatetimePipe} from '../pipe/datetime.pipe';
import {MarkdownModule} from 'ngx-markdown';
import {TagColorPipe} from '../pipe/tag-color.pipe';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {TextLenPipe} from '../pipe/text-len.pipe';
import {NumberToArrayPipe} from '../pipe/number-to-array.pipe';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MarkdownModule,
    RouterModule,
    // ant.design
    NzSkeletonModule,
    NzResultModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    NzSpinModule,
    NzRadioModule,
    NzAlertModule,
    NzTypographyModule,
    NzModalModule,
    NzMessageModule,
    NzMessageServiceModule,
    NzAvatarModule,
    NzGridModule,
    NzCardModule,
    NzSwitchModule,
    NzToolTipModule,
    NzTagModule,
    NzCollapseModule,
    NzEmptyModule,
    NzCarouselModule,
    NzAnchorModule,
    NzTableModule,
    NzSelectModule,
    NzStepsModule,
    NzUploadModule,
    NzInputNumberModule,
    NzDividerModule,
    NzTabsModule
  ],
  exports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MarkdownModule,
    // component
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    // pipes
    BytePipe,
    RatePipePipe,
    DatetimePipe,
    TagColorPipe,
    TextLenPipe,
    NumberToArrayPipe,
    // ant.design
    NzSkeletonModule,
    NzResultModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    NzSpinModule,
    NzRadioModule,
    NzAlertModule,
    NzTypographyModule,
    NzModalModule,
    NzMessageModule,
    NzMessageServiceModule,
    NzAvatarModule,
    NzGridModule,
    NzCardModule,
    NzSwitchModule,
    NzToolTipModule,
    NzTagModule,
    NzCollapseModule,
    NzEmptyModule,
    NzCarouselModule,
    NzAnchorModule,
    NzTableModule,
    NzSelectModule,
    NzStepsModule,
    NzUploadModule,
    NzInputNumberModule,
    NzDividerModule,
    NzTabsModule
  ],
  declarations: [
    // component
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    // pipes
    BytePipe,
    RatePipePipe,
    DatetimePipe,
    TagColorPipe,
    TextLenPipe,
    NumberToArrayPipe
  ]
})

export class ShareModule {
}
