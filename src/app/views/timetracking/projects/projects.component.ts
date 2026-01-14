import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../shared/timesheet/project.service';
import { ClientService } from 'src/app/shared/sales/client.service';
import { CompanyService } from 'src/app/shared/company/company.service';
import { MessageService } from 'primeng/api';
import { Client } from '../../models/Client';
import { Project } from '../../models/Project';
import { Company } from '../../models/Company';  // Assuming you have a Company model

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  companies: Company[] = [];
  clients: Client[] = [];
  selectedProject: Project = {} as Project;  // For editing or creating a project
  displayDialog: boolean = false;
  statusProject: string[] = ['PENDING', 'DONE', 'REFUSED'];

  constructor(
    private projectService: ProjectService,
    private clientService: ClientService,
    private companyService: CompanyService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadCompanies();
    this.loadClients();
  }

  // Load all projects
  loadProjects() {
    this.projectService.getProjects().subscribe(
      (data: Project[]) => {
        console.log('Projects loaded:', data);
        this.projects = data;
      },
      (error) => {
        console.error('Error loading projects', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading projects' });
      }
    );
  }

  // Load all companies
  loadCompanies() {
    this.companyService.getAllCompanies().subscribe(
      (data: Company[]) => {
        console.log('Companies loaded:', data);
        this.companies = data;
      },
      (error) => {
        console.error('Error loading companies', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading companies' });
      }
    );
  }

  // Load all clients
  loadClients() {
    this.clientService.getClients().subscribe(
      (data: Client[]) => {
        console.log('Clients loaded:', data);
        this.clients = data;
      },
      (error) => {
        console.error('Error loading clients', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading clients' });
      }
    );
  }

  // Open dialog for creating a new project
  openCreateProjectDialog() {
    this.selectedProject = {} as Project;  // Reset the form
    this.displayDialog = true;
  }

  // Open dialog for editing an existing project
  openEditProjectDialog(project: Project) {
    this.selectedProject = { ...project };  // Clone project for editing
    this.displayDialog = true;
  }

 // Create or update project based on the context
saveProject() {
  // Prepare the project object to send
  const projectToSend = this.prepareProjectData(this.selectedProject);

  // Check if we're creating or updating
  const projectAction = this.selectedProject.projetID ? this.updateProject : this.createProject;

  projectAction.call(this, projectToSend);
}

// Method to prepare the project data to send (with clientID and companyID)
prepareProjectData(project: any) {
  return {
    ...project,
 
  };
}

// Create a new project
createProject(projectToSend: any) {
  this.projectService.createProject(projectToSend).subscribe(
    (response) => {
      console.log('Project created successfully', response);
      this.handleSuccess('Project created successfully');
      console.log('emchi barka',projectToSend)
    },
    (error) => {
      console.error('Error creating project', error);
      this.handleError('Error creating project');
      console.log('emchi barka',projectToSend)
    }
  );
}

// Update an existing project
updateProject(projectToSend: any) {
  this.projectService.updateProject(this.selectedProject.projetID, projectToSend).subscribe(
    (response) => {
      console.log('Project updated successfully', response);
      this.handleSuccess('Project updated successfully');
    },
    (error) => {
      console.error('Error updating project', error);
      this.handleError('Error updating project');
    }
  );
}

// Handle success
handleSuccess(message: string) {
  console.log('Project action successful');
  this.loadProjects();  
  this.displayDialog = false;  // close the dialog
  this.messageService.add({
    severity: 'success',
    summary: 'Success',
    detail: message
  });
}

// Handle error
handleError(message: string) {
  console.error(message);
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: message
  });
}

  // Delete a project
  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe(
      (response) => {
        console.log('Project deleted successfully', response);
        this.loadProjects();  
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project deleted successfully' });
      },
      (error) => {
        console.error('Error deleting project', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting project' });
      }
    );
  }

  // Close the dialog without saving
  closeDialog() {
    this.displayDialog = false;
  }
}
