import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table } from 'primeng/table';
import { BranchService } from './services/branch.service';
import { Branch, Customer, Representative } from './models/branch/branch.model';
import { HttpClientModule } from '@angular/common/http';
import { ImportsModule } from './imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ImportsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ BranchService ]
})
export class AppComponent implements OnInit {
  title = 'test-branch';
  customers!: Customer[];

  branches!: Branch[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  constructor(private branchService: BranchService) {}

  ngOnInit() {
    this.branchService.GetBranches().subscribe({
      next: (branches) => {
          this.branches = branches; // Asigna las ramas obtenidas
          this.loading = false; // Cambia el estado de carga
      },
      error: (error) => {
          console.error('Error al obtener ramas:', error);
          this.loading = false; // Cambia el estado de carga incluso si hay un error
      }
  });

      this.representatives = [
          { name: 'Amy Elsner', image: 'amyelsner.png' },
          { name: 'Anna Fali', image: 'annafali.png' },
          { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
          { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
          { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
          { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
          { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
          { name: 'Onyama Limba', image: 'onyamalimba.png' },
          { name: 'Stephen Shaw', image: 'stephenshaw.png' },
          { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
      ];
  }

  clear(table: Table) {
      table.clear();
      this.searchValue = ''
  }

  getSeverity(status: string) {
      switch (status.toLowerCase()) {
          case 'unqualified':
              return 'danger';

          case 'qualified':
              return 'success';

          case 'new':
              return 'info';

          case 'negotiation':
              return 'warning';

          case 'renewal':
              return undefined;
          default:
               return undefined;
      }
  }

  handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);
    return inputElement.value;
  }
}
