import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GlobalMasterGenericService } from './services/global-master-generic.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [GlobalMasterGenericService],
  bootstrap: [AppComponent],
  // exports: [GlobalMasterGenericService]
})
export class AppModuleGlobal { }
