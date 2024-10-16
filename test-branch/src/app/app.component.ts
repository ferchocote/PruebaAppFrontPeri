import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BranchService } from './services/branch.service';
import { HttpClientModule } from '@angular/common/http';
import { ImportsModule } from './imports';
import { CommonModule } from '@angular/common';
import { BranchComponent } from './pages/branch/branch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ImportsModule, CommonModule, BranchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ BranchService ]
})
export class AppComponent {
  title = 'test-branch';

  

  constructor() {}

  
}
