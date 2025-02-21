import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { FpNavbarComponent } from '../fp-navbar/fp-navbar.component';
import { HttpClient } from '@angular/common/http';
import { ApexTitleSubtitle, ApexAxisChartSeries, ApexDataLabels, ApexTooltip, ApexStroke, ApexLegend, ApexChart, ApexXAxis, ApexYAxis, ApexGrid, ApexFill, NgApexchartsModule, ApexPlotOptions } from 'ng-apexcharts';
import { GroupService } from '../../../service/groups.service';
import { UserLoginDetail } from '../../../modals/modal';
import { GroupList } from '../../../modals/modal';
import { APIURL } from '../../../env';
type ChartOptions = {
    plotOptions: ApexPlotOptions;
    subtitle: ApexTitleSubtitle;
    series: ApexAxisChartSeries;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    labels: string[];
        chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    colors: string[];
    grid: ApexGrid;
    fill: ApexFill;
};
@Component({
    selector: 'app-fp-cta',
    standalone: true,
    imports: [FpNavbarComponent, NgApexchartsModule],
    templateUrl: './fp-cta.component.html',
    styleUrl: './fp-cta.component.scss'
})
export class FpCtaComponent implements OnInit {

    // isToggled
    isToggled = false;
    groupDetail: GroupList[]
    chartOptions: Partial<ChartOptions>;
    constructor(
        public themeService: CustomizerSettingsService,
        private httpClient: HttpClient,
        private getGroupsService: GroupService
    ) {
        this.getGroupsService.getGroup().subscribe(
            (res) => {
                this.groupDetail = res
            }
        )
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.chartOptions = {
            series: [
                {
                    name: "Completed",
                    data: [80, 55, 60, 55, 80]
                },
                {
                    name: "Pending",
                    data: [50, 85, 60, 70, 60]
                }
            ],
            chart: {
                type: "bar",
                height: 99,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#1F64F1", "#C2CDFF"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "85%"
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                show: true,
                colors: ["transparent"]
            },
            grid: {
                show: true,
                borderColor: "#ffffff"
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    width: 9,
                    height: 9,
                    offsetX: -2,
                    offsetY: -.5
                }
            }
        };
    }

    greeting: string = '';

    ngOnInit(): void {
        this.greeting = this.getGreeting();
        this.userLoggedInDetail()
        this.storeOfExpense()
        this.calculatePercentage()
    }

    storeExpense: (number | undefined)[] = [];
    totalExpense: number = 0;
    totalPaidCount: number = 0;
    sumOfPaidAmount: number = 0;
    pendingPaidAmount: number = 0;
    storeOfExpense() {
        this.getGroupsService.getGroup().subscribe(
            (res) => {
                this.groupDetail?.forEach((group: GroupList) => {
                    group.expenses?.find(expense => {
                        //storing total expenses
                        if (expense !== undefined) {
                            this.storeExpense.push(Number(expense.expense))
                        }
                        //storing total paid Amount
                        expense.perHead?.find((person) => {
                            if (person.isPaid === true) {
                                this.sumOfPaidAmount += person.amount ?? 0;
                            }
                            if (person.isPaid === false) {
                                this.pendingPaidAmount += person.amount ?? 0
                            }
                        })
                    })
                })
                //adding total Expenses
                this.totalExpense = 0;
                this.storeExpense.forEach((ele) => {
                    this.totalExpense += ele || 0
                })
                console.log('total Expense', this.totalExpense);
                console.log('total Paid Count', this.totalPaidCount);
                console.log('total Paid Amount', this.sumOfPaidAmount);
                console.log('remaining amount', this.pendingPaidAmount);
            }
        )

    }

    calculatePercentage() {
        const paidAmount = ((this.sumOfPaidAmount / this.totalExpense) * 100).toFixed(2)
        const unPaidAmount = ((this.pendingPaidAmount / this.totalExpense) * 100).toFixed(2)
        console.log('Paid Percentage:', paidAmount);
        console.log('Unpaid Percentage:', unPaidAmount);
    }


    details: UserLoginDetail | null | undefined = null;
    userLoggedInDetail() {
        const url = `${APIURL}/me`
        this.httpClient.get<{ user: UserLoginDetail }>(url).subscribe(
            (res) => {
                this.details = res.user
            }
        )
    }
    getGreeting(): string {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return 'Good Morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Night';
        }
    }
    isCardHeaderOpen = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }

}
