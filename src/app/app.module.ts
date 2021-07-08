import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { PromiseExampleComponent } from './promise-example/promise-example.component';
import { ObservableExampleComponent } from './observable-example/observable-example.component';
import { OperatorExampleComponent } from './operator-example/operator-example.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    PromiseExampleComponent,
    ObservableExampleComponent,
    OperatorExampleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
