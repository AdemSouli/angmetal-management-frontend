import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client'
import { ClientService } from '../../../shared/sales/client.service'
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: any = {};
  displayDialog: boolean = false;

  clientOptions = ["PARTICULIER", "ENTREPRISE"]

  constructor(private clientService: ClientService) {

  }
  ngOnInit(): void {
    this.loadClients();
  }
  openCreateClientDialog() {
    this.selectedClient = {};
    this.displayDialog = true;
  }
  goToAddClient() {
    this.displayDialog = true;
    this.selectedClient = {};
  }

  closeDialog() {
    this.displayDialog = false;
  }

  saveClient() {
    if (this.selectedClient.clientID) {
      this.updateExistingClient();
    } else {
      this.createClient();
    }
    this.resetDialog();
  }

  loadClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        console.log('client from backend ::',data)
        this.clients = data;
      },
      (error) => {
        console.error('Error loading clients', error);
      }
    );
  }
  editClient(client: any) {
    this.selectedClient = { ...client };
    this.displayDialog = true;
  }

  createClient() {
    console.log('object to create for clients', this.selectedClient);
    this.clientService.addClient(this.selectedClient).subscribe(
      (response) => {

        console.log('Client created successfully', response);
        this.loadClients();
        this.displayDialog = false;
      },
      (error) => {
        console.log('object to create for clients', this.selectedClient);
        console.error('Error creating Client', error);
      }
    );
  }

  updateExistingClient() {
    this.clientService.updateClient(this.selectedClient.clientID, this.selectedClient).subscribe(
      (response) => {
        console.log('Client updated successfully', response);
        this.loadClients();
        this.displayDialog = false;
      },
      (error) => {
        console.error('Error updating project', error);
      }
    );
  }

  deleteClient(clientID: number) {
    this.clientService.deleteClient(clientID).subscribe(
      (response) => {
        console.log('Client deleted successfully', response);
        this.loadClients();
      },
      (error) => {
        console.error('Error deleting project', error);
      }
    );
  }

  private resetDialog() {
    this.displayDialog = false;
    this.selectedClient = {};
  }
}


