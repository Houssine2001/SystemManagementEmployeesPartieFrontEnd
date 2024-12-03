import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ChartDB } from 'src/app/fake-data/chartDB';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HistoryEmployeeService } from 'src/app/services/history-employee.service'; // Import the service
import { EmployeeService } from 'src/app/services/employee.service'; // Import the EmployeeService

import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexLegend,
  ApexResponsive
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  colors: string[];
  stroke: ApexStroke;
  grid: ApexGrid;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  earningChart: Partial<ChartOptions>;
  pageViewChart: Partial<ChartOptions>;
  totalTaskChart: Partial<ChartOptions>;
  downloadChart: Partial<ChartOptions>;
  monthlyRevenueChart: Partial<ChartOptions>;
  totalTasksChart: Partial<ChartOptions>;
  pendingTasksChart: Partial<ChartOptions>;
  totalIncomeChart: Partial<ChartOptions> = {
    series: [],
    chart: {
      type: 'pie',
      height: 350
    },
    labels: [],
    plotOptions: {
      pie: {
        donut: {
          size: '50%'
        }
      }
    },
    fill: {
      type: 'gradient'
    },
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true
    },
    responsive: []
  };
  preset = ['#4680FF'];
  monthlyColor = ['#4680FF', '#8996a4'];
  incomeColors = ['#2CA87F', '#E58A00', '#FF5733', '#b5ccff', '#C70039', '#900C3F', '#3498DB'];

  income_card: any[] = [];
  employees: any[] = []; // Ajouter une propriété pour stocker les employés
  project = [
    {
      title: 'Invoice Generator'
    },
    {
      title: 'Package Upgrades'
    },
    {
      title: 'Figma Auto Layout'
    }
  ];

  chartDB: any;

  constructor(private historyEmployeeService: HistoryEmployeeService, private employeeService: EmployeeService) {
    this.chartDB = ChartDB;
    const {
      earningChart,
      totalTaskChart,
      downloadChart,
      totalTasksChart,
      pageViewChart,
      monthlyRevenueChart,
      pendingTasksChart,
      totalIncomeChart
    } = this.chartDB;
    this.earningChart = earningChart;
    this.pageViewChart = pageViewChart;
    this.totalTaskChart = totalTaskChart;
    this.downloadChart = downloadChart;
    this.monthlyRevenueChart = monthlyRevenueChart;
    this.totalTasksChart = totalTasksChart;
    this.pendingTasksChart = pendingTasksChart;
    this.totalIncomeChart = totalIncomeChart;
  }

  ngOnInit(): void {
    this.loadEmotionData();
    this.loadEmployees(); // Charger les employés lors de l'initialisation
  }

  loadEmotionData(): void {
    this.historyEmployeeService.getAllHistoryEmployees().subscribe((data: any[]) => {
      const emotionCounts = this.countEmotions(data);
      this.updateChart(emotionCounts);
      this.updateIncomeCard(emotionCounts);
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((data: any[]) => {
      this.employees = data.map(employee => {
        // Vérifiez que l'image est correctement formatée en base64
        if (!employee.image.startsWith('data:image')) {
          employee.image = `data:image/png;base64,${employee.image}`;
        }
        return employee;
      });
    });
  }

  countEmotions(data: any[]): { [key: string]: number } {
    const emotionCounts: { [key: string]: number } = {
      happy: 0,
      angry: 0,
      sad: 0,
      neutral: 0,
      disgust: 0,
      fear: 0,
      surprise: 0
    };

    data.forEach((item) => {
      if (item.emotion === 'heureux') {
        emotionCounts['happy']++;
      } else if (item.emotion === 'colere') {
        emotionCounts['angry']++;
      } else if (item.emotion === 'triste') {
        emotionCounts['sad']++;
      } else if (item.emotion === 'neutre') {
        emotionCounts['neutral']++;
      } else if (item.emotion === 'dégout') {
        emotionCounts['disgust']++;
      } else if (item.emotion === 'peur') {
        emotionCounts['fear']++;
      } else if (item.emotion === 'surpris') {
        emotionCounts['surprise']++;
      }
    });

    return emotionCounts;
  }

  updateChart(emotionCounts: { [key: string]: number }): void {
    this.totalIncomeChart.series = [
      emotionCounts['happy'],
      emotionCounts['angry'],
      emotionCounts['sad'],
      emotionCounts['neutral'],
      emotionCounts['disgust'],
      emotionCounts['fear'],
      emotionCounts['surprise']
    ];
    this.totalIncomeChart.labels = ['Heureux', 'Colère', 'Triste', 'Neutre', 'Dégout', 'Peur', 'Surpris'];
  }

  updateIncomeCard(emotionCounts: { [key: string]: number }): void {
    this.income_card = [
      {
        background: 'bg-success-500',
        item: 'Heureux',
        value: emotionCounts['happy'],
        number: ''
      },
      {
        background: 'bg-warning-500',
        item: 'Colère',
        value: emotionCounts['angry'],
        number: ''
      },
      {
        background: 'bg-danger-500',
        item: 'Triste',
        value: emotionCounts['sad'],
        number: ''
      },
      {
        background: 'bg-primary-500',
        item: 'Neutre',
        value: emotionCounts['neutral'],
        number: ''
      },
      {
        background: 'bg-secondary-500',
        item: 'Dégout',
        value: emotionCounts['disgust'],
        number: ''
      },
      {
        background: 'bg-dark-500',
        item: 'Peur',
        value: emotionCounts['fear'],
        number: ''
      },
      {
        background: 'bg-info-500',
        item: 'Surpris',
        value: emotionCounts['surprise'],
        number: ''
      }
    ];
  }
}