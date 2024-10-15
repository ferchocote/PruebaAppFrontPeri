import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { BranchService } from './services/branch.service';
import { Customer, Representative } from './models/branch/branch.model';
import { HttpClientModule } from '@angular/common/http';
import { ImportsModule } from './imports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, ImportsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ BranchService ]
})
export class AppComponent implements OnInit {
  title = 'test-branch';
  customers!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  constructor(private branchService: BranchService) {}

  ngOnInit() {
      this.branchService.getCustomersLarge().then((customers) => {
          this.customers = customers;
          this.loading = false;

          this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
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

      this.statuses = [
          { label: 'Unqualified', value: 'unqualified' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'New', value: 'new' },
          { label: 'Negotiation', value: 'negotiation' },
          { label: 'Renewal', value: 'renewal' },
          { label: 'Proposal', value: 'proposal' }
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
