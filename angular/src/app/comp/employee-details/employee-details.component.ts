import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeId: string = '674b6adcd1825d4ec7bc0046';  // Remplacez par l'ID que vous voulez tester
  employee: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,  // Injecter ActivatedRoute
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      this.loadEmployee();
    });
  }

  // Méthode pour récupérer l'employé
  loadEmployee() {
    this.loading = true;
    this.error = '';
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (data) => {
        console.log('Données récupérées de l\'API:', data);  // Afficher les données dans la console
        this.employee = data;
        this.loading = false;
      },
      (err) => {
        console.error('Erreur lors du chargement des données:', err);  // Afficher l'erreur dans la console
        this.error = 'Erreur lors du chargement des données de l\'employé';
        this.loading = false;
      }
    );
  }

}
