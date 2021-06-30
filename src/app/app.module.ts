import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { PromiseExampleComponent } from './promise-example/promise-example.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, MatTabsModule],
  declarations: [AppComponent, HelloComponent, PromiseExampleComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
