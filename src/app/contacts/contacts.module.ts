import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  exports: [ContactsComponent]
})
export class ContactsModule {}
