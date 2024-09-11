import { PeronsService } from '../../services/perons.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Person } from '../../shared/model/person';
import { Router } from '@angular/router';
import { PhoneNumber } from '../../shared/model/phone-number';
import { PhoneType } from '../../shared/model/phone-type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,       
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent implements OnInit { 
  currentPerson: Person = new Person(0,'','','');
  @ViewChild('phoneGroup') phoneGroup? : NgModelGroup;

  @Input()
  id? : string;

  constructor(private personService: PeronsService, private router: Router) {}

  ngOnInit(): void {
    if (this.id) {
      let personFromService = this.personService.get(parseInt(this.id));

      if (personFromService) {
        this.currentPerson = personFromService;
      }
    }
  }

  onSubmitRegistration() {
    if (this.id) {
      this.personService.update(this.currentPerson);
    } else {
      this.personService.add(this.currentPerson)
    }
    this.router.navigate(['']);
  }

  addPhoneNumber() {
    this.currentPerson.phones.push(new PhoneNumber("", PhoneType.Mobile));
  }

  removePhoneNumber(index : number) {
    this.currentPerson.phones.splice(index, 1);
    this.phoneGroup?.control.markAsDirty();
  }
 } 
