import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadersInterceptor } from '@interceptors/headers/headers.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { GeneratedListComponent } from './random-integer-generator/generated-list/generated-list.component';
import { GeneratorComponent } from './random-integer-generator/generator/generator.component';
import { StatsComponent } from './random-integer-generator/stats/stats.component';
import { DialogService } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GeneratedListComponent,
    GeneratorComponent,
    StatsComponent,
    TabViewModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    DialogService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
