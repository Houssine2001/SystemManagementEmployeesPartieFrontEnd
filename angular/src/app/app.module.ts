// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './demo/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailsComponent } from './comp/employee-details/employee-details.component';
import { EmployeeService } from './services/employee.service';

@NgModule({
  declarations: [AppComponent,EmployeeDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule,HttpClientModule 
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
