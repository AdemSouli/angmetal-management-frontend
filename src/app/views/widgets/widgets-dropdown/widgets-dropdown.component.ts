import { Component, OnInit } from '@angular/core';

import { Chart, ChartOptions } from 'chart.js';
import {KpiDashboardService} from '../../../shared/dashboard/kpi-dashboard.service'

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
 
})
export class WidgetsDropdownComponent implements OnInit {
  constructor(private kpiService: KpiDashboardService) {}
  kpiData :any= [];

  pieData = {
    labels: ['Sales', 'Purchases'],  // Pie chart segments
    datasets: [
      {
        label: 'Sales vs Purchases',
        data: [600, 400],  // Sales and Purchases data (can be dynamic)
        backgroundColor: ['#FF6347', '#4682B4'],  // Red for Sales, Blue for Purchases
        hoverOffset: 4,  // Hover effect
      },
    ],
  };
 

  data: any[] = [];
  options: any[] = [];


  optionsDefault = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };

  getKpi(): void {
    this.kpiService.getKpis().subscribe(
      kpi => {
        console.log('KPI data fetched:', kpi);
        this.kpiData = kpi;
        this.initializeCharts();
      },
      error => {
        console.error('Error fetching KPI data', error);
      }
    );
  }

  ngOnInit(): void {
    this.getKpi();
   
  }
     // Method to initialize charts after the data is available
     initializeCharts(): void {
      if (this.kpiData) {
        const data = {
          totalSales: this.kpiData.totalSales,
          totalPurchases: this.kpiData.totalPurchases,
          totalTransactions: this.kpiData.totalTransactions,
          debitCount: this.kpiData.debitCount,
          creditCount: this.kpiData.creditCount
        };
  

        // Define the bar chart for product purchases
new Chart('productPurchaseBarChart', {
  type: 'bar',
  data: {
    // Labels will be the product names
    labels: Object.keys(this.kpiData.supplierPurchases), 
    datasets: [{
      label: 'Purchase Revenue per Supplier', // Label for the dataset
      data: Object.values(this.kpiData.supplierPurchases), // Purchase revenue for each product
      backgroundColor: '#FF6384', // Bar color for purchases
      borderColor: '#FF6384', // Border color for bars
      borderWidth: 1,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true, // Ensures the X-axis starts at zero
      },
      y: {
        beginAtZero: true, // Ensures the Y-axis starts at zero
      },
    },
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
      },
    },
  },
});

        // Sales vs Purchases Chart (Pie Chart)
        new Chart('salesPurchasesChart', {
          type: 'pie',
          data: {
            labels: ['Total Sales', 'Total Purchases'],
            datasets: [{
              data: [data.totalSales, data.totalPurchases],
              backgroundColor: ['#321FDB', '#3399FF']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }
        });
  
        // Debit vs Credit Count Chart (Pie Chart)
        new Chart('debitCreditChart', {
          type: 'pie',
          data: {
            labels: ['Debit', 'Credit'],
            datasets: [{
              data: [data.debitCount, data.creditCount],
              backgroundColor: ['#f8d7da', '#c3e6cb']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }
        });

        
        
        new Chart('transactionDistributionRadarChart', {
          type: 'radar',
          data: {
            labels: ['Total Sales', 'Total Purchases', 'Debit Count', 'Credit Count'],
            datasets: [{
              label: 'Transaction Distribution',
              data: [
                this.kpiData.totalSales,
                this.kpiData.totalPurchases,
                this.kpiData.debitCount,
                this.kpiData.creditCount
              ],
              backgroundColor: 'rgba(77, 189, 116, 0.2)', // Light green
              borderColor: '#4dbd74',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: { // Change 'scale' to 'scales'
              r: {
                ticks: {
               //   beginAtZero: true // Ensures that the radar chart starts at zero
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              }
            }
          }
        });

        

        

// Define the bar chart product sales data
new Chart('productSalesBarChart', {
  type: 'bar',
  data: {
    // Labels will be the product names
    labels: Object.keys(this.kpiData.clientSales), 
    datasets: [{
      label: 'Sales Revenue per Client', // Label for the dataset
      data: Object.values(this.kpiData.clientSales), // Sales revenue for each product
      backgroundColor: '#36A2EB', // Bar color
      borderColor: '#36A2EB', // Border color for bars
      borderWidth: 1,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true, // Ensures the X-axis starts at zero
      },
      y: {
        beginAtZero: true, // Ensures the Y-axis starts at zero
      },
    },
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
      },
    },
  },
});

        new Chart('transactionPieChart', {
          type: 'pie',
          data: {
            labels: ['Debits (Sales)', 'Credits (Purchases)'],
            datasets: [{
              data: [this.kpiData.debitCount, this.kpiData.creditCount],
              backgroundColor: ['#36A2EB', '#FF6384'],
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            }
          }
        });

      }

    }





}
