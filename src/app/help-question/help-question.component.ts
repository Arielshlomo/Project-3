import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-help-question',
  standalone: true,
  imports: [HeaderComponent, MatToolbarModule],
  templateUrl: './help-question.component.html',
  styleUrl: './help-question.component.css'
})
export class HelpQuestionComponent {

}
