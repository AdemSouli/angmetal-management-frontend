import { Component, OnInit } from '@angular/core';
import { BanqueService } from '../../shared/banks/banque.service';
import { Banque } from '../models/Banque';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss'],
})
export class BanqueComponent implements OnInit {
  banques: Banque[] = [];
  display: boolean = false;
  selectedBanque: Banque = { compteID: 0, name: '', soldeInitial: 0, soldeActuel: 0 };

  constructor(
    private banqueService: BanqueService,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.loadBanques();
  }

  loadBanques(): void {
    this.banqueService.getBanques().subscribe((data) => {
      console.log("banque from backend is :", data);
      this.banques = data;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load banques' }); 
    });
  }

  goToAddBanque(): void {
    this.selectedBanque = { compteID: 0, name: '', soldeInitial: 0, soldeActuel: 0 };
    this.display = true;
  }

  goToEditBanque(banque: Banque): void {
    this.selectedBanque = { ...banque };
    this.display = true;
  }

  saveBanque(): void {
    if (this.selectedBanque.compteID) {
      this.banqueService.updateBanque(this.selectedBanque).subscribe(() => {
        this.loadBanques();
        this.closeDialog();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Banque updated successfully' }); 
      }, _error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update banque' }); 
      });
    } else {
      this.banqueService.addBanque(this.selectedBanque).subscribe(() => {
        this.loadBanques();
        this.closeDialog();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Banque added successfully' }); 
      }, _error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add banque' }); 
      });
    }
  }

  deleteBanque(compteID: number): void {
    this.banqueService.deleteBanque(compteID).subscribe(() => {
      this.loadBanques();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Banque deleted successfully' }); 
    }, _error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete banque' }); 
    });
  }

  closeDialog(): void {
    this.display = false;
  }
}
