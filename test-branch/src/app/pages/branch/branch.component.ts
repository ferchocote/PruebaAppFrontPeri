import { Component } from '@angular/core';
import { Branch } from '../../models/branch/branch.model';
import { BranchService } from '../../services/branch.service';
import { Table } from 'primeng/table';
import { ImportsModule } from '../../imports';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css',
  providers: [ConfirmationService, MessageService]
})
export class BranchComponent {
  
  branches!: Branch[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  constructor(private branchService: BranchService, 
              private confirmationService: ConfirmationService, 
              private messageService: MessageService) {}

  ngOnInit() {
    this.getBranches();
  }

  getBranches(){
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
  }

  clear(table: Table) {
      table.clear();
      this.searchValue = ''
  }

  confirm1(event: Event, id: string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Esta seguro de eliminar esta sucursal?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.deleteBranch(id);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Sucursal eliminada' });
        },
        reject: () => {
            //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

  deleteBranch(id: string){
    this.branchService.DeleteBranch(id).subscribe({
      next: (branches) => {
        this.getBranches();
      },
      error: (error) => {
          console.error('Error al obtener ramas:', error);
          this.loading = false; // Cambia el estado de carga incluso si hay un error
      }
  });
  }

  handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);
    return inputElement.value;
  }
}
