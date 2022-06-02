import { VaccineTaken } from './../vaccines/vaccine-taken';
import { Observable, Subscription, take } from 'rxjs';
import { StudentsService } from './../students/students.service';
import { VaccinesTakenService } from './../vaccines/vaccines-taken.service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
// import { Chart } from 'chart.js';
import { Student } from '../students/student';
import { Event } from '../events/event';
import { EventsService } from '../events/events.service';
import { EventTypesEnum } from '../events/event-types.enum';

import { Chart, registerables } from 'chart.js';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    @ViewChild('eventsChart', { static: true }) eventChart: ElementRef = new ElementRef({});

    // date: Date[] = [];

    months: string[] = ['Dezembro', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
        'Outubro', 'Novembro'];

    students: Student[] = [];
    vaccines: VaccineTaken[] = [];
    events: Event[] = [];
    max: number = 0;

    subscriptions: Subscription = new Subscription();
    studentsSubscription: Subscription = new Subscription();
    vaccinesSubscription: Subscription = new Subscription();
    eventsSubscription: Subscription = new Subscription();

    constructor(
        private VaccinesTakenService: VaccinesTakenService,
        private studentsService: StudentsService,
        private eventsService: EventsService
    ) { }

    ngOnInit(): void {
        Chart.register(...registerables);

        this.onSubscriptions().then(() => {
            this.createEventChart();
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onSubscriptions(): Promise<any> {
        var promise = new Promise<void>((resolve, reject) => {

            var studentPromise = new Promise<void>((resolveStudent, rejectStudent) => {
                this.studentsSubscription = this.studentsService.getStudents().pipe(take(1)).subscribe({
                    next: students => {
                        this.students = students as Student[];
                        console.log('students subscription');
                        resolveStudent();
                    },
                    error: error => {
                        console.log('erro dentro da promise. studentService ', error);
                        rejectStudent();
                    }
                });
            });

            var vaccinePromise = new Promise<void>((resolveVaccine, rejectVaccine) => {
                this.vaccinesSubscription = this.VaccinesTakenService.getVaccineTakens().pipe(take(1)).subscribe({
                    next: vaccines => {
                        this.vaccines = vaccines as VaccineTaken[];
                        console.log('vaccine subscription');
                        resolveVaccine();
                    },
                    error: error => {
                        console.log('erro dentro da promise. vaccineTakenService ', error);
                        rejectVaccine();
                    }
                });
            });

            var eventPromise = new Promise<void>((resolveEvent, rejectEvent) => {
                this.eventsSubscription = this.eventsService.getEvents().pipe(take(1)).subscribe({
                    next: events => {
                        this.events = events as Event[];
                        console.log('events subscription');
                        resolveEvent();
                    },
                    error: error => {
                        console.log('erro dentro da promise. eventsService ', error);
                        rejectEvent();
                    }
                });
            });

            Promise.all([studentPromise, vaccinePromise, eventPromise]).then(() => {
                this.subscriptions.add(this.vaccinesSubscription);
                this.subscriptions.add(this.eventsSubscription);
                resolve();
            });
        });

        return promise;
    }

    createEventChart() {
        const covid: string = EventTypesEnum.COV;
        const dg: string = EventTypesEnum.DG;
        const donc: string = EventTypesEnum.DO;
        const others: string = EventTypesEnum.OT;
        const virus: string = EventTypesEnum.VIR;

        const dataCovid = this.dataPointsEventChart(covid);
        const dataDg = this.dataPointsEventChart(dg);
        const dataDonc = this.dataPointsEventChart(donc);
        const dataOthers = this.dataPointsEventChart(others);
        const dataVirus = this.dataPointsEventChart(virus);

        console.log(dataCovid);

        new Chart(this.eventChart.nativeElement, {
            // configs
            type: 'bar',
            data: {
                labels: this.months,
                datasets: [
                    {
                        label: covid,
                        data: dataCovid,
                        borderColor: '#F70c0c', // Red

                        // BAR
                        backgroundColor: '#ec2323',
                        borderWidth: 2,
                        borderRadius: 10,
                        borderSkipped: 'bottom',
                    
                        // LINE
                        // fill: false,
                        // cubicInterpolationMode: 'monotone',
                        // tension: 0.4
                    },
                    {
                        label: dg,
                        data: dataDg,
                        borderColor: '#D08611', // Meteor

                        // BAR
                        backgroundColor: '#eaaa44',
                        borderWidth: 2,
                        borderRadius: 10,
                        borderSkipped: 'bottom',

                        // fill: false,
                        // cubicInterpolationMode: 'monotone',
                        // tension: 0.4
                    },
                    {
                        label: donc,
                        data: dataDonc,
                        borderColor: '#807a74', // Bright green

                        // BAR
                        backgroundColor: '#b8b0a7',
                        borderWidth: 2,
                        borderRadius: 10,
                        borderSkipped: 'bottom',

                        // fill: false,
                        // cubicInterpolationMode: 'monotone',
                        // tension: 0.4
                    },
                    {
                        label: others,
                        data: dataOthers,
                        borderColor: '#4bb1e8', // Picton Blue

                        // BAR
                        backgroundColor: '#6bc2f1',
                        borderWidth: 2,
                        borderRadius: 10,
                        borderSkipped: 'bottom',

                        // fill: false,
                        // cubicInterpolationMode: 'monotone',
                        // tension: 0.4
                    },
                    {
                        label: virus,
                        data: dataVirus,
                        borderColor: '#4e4be8', // Picton Blue

                        // BAR
                        backgroundColor: '#7573ec',
                        borderWidth: 2,
                        borderRadius: 10,
                        borderSkipped: 'bottom',

                        // fill: false,
                        // cubicInterpolationMode: 'monotone',
                        // tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    // legend: {
                    //     position: 'top',
                    // },
                    title: {
                        display: true,
                        text: 'Eventos x Mês'
                    }
                },
                interaction: {
                    intersect: false
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'ocorrências'
                        },
                        suggestedMin: 0,
                        suggestedMax: Math.ceil(this.max * 1.1)
                    }
                }
            }
        });
    }

    // defineMonths() {
    //     const today = new Date;
    //     for (let i = 12; i > 0; i--) {
    //         const aux = new Date;
    //         aux.setMonth(today.getMonth() + i)
    //         switch (aux.getMonth()) {
    //             case 1: {
    //                 this.monthsEventsChart.push('Janeiro');
    //                 console.log('Janeiro');
    //                 break;
    //             }
    //             case 2: {
    //                 this.monthsEventsChart.push('Fevereiro');
    //                 console.log('Fevereiro');
    //                 break;
    //             }
    //             case 3: {
    //                 this.monthsEventsChart.push('Março');
    //                 console.log('Março');
    //                 break;
    //             }
    //             case 4: {
    //                 this.monthsEventsChart.push('Abril');
    //                 console.log('Abril');
    //                 break;
    //             }
    //             case 5: {
    //                 this.monthsEventsChart.push('Maio');
    //                 console.log('Maio');
    //                 break;
    //             }
    //             case 6: {
    //                 this.monthsEventsChart.push('Junho');
    //                 console.log('Junho');
    //                 break;
    //             }
    //             case 7: {
    //                 this.monthsEventsChart.push('Julho');
    //                 console.log('Julho');
    //                 break;
    //             }
    //             case 8: {
    //                 this.monthsEventsChart.push('Agosto');
    //                 console.log('Agosto');
    //                 break;
    //             }
    //             case 9: {
    //                 this.monthsEventsChart.push('Setembro');
    //                 console.log('Setembro');
    //                 break;
    //             }
    //             case 10: {
    //                 this.monthsEventsChart.push('Outubro');
    //                 console.log('Outubro');
    //                 break;
    //             }
    //             case 11: {
    //                 this.monthsEventsChart.push('Novembro');
    //                 console.log('Novembro');
    //                 break;
    //             }
    //             case 12: {
    //                 this.monthsEventsChart.push('Dezembro');
    //                 console.log('Dezembro');
    //                 break;
    //             }
    //             default: {
    //                 this.monthsEventsChart.push('Dezembro');
    //                 console.log('Dezembro', aux.getMonth());
    //                 break;
    //             }
    //         }
    //     }
    // }

    // createEventChart() {
    //     const config = {
    //         // configs
    //         type: 'line',
    //         data: this.dataEventChart(),
    //         options: {
    //             responsive: true,
    //             plugins: {
    //                 // legend: {
    //                 //     position: 'top',
    //                 // },
    //                 title: {
    //                     display: true,
    //                     text: 'Eventos x Mês'
    //                 }
    //             },
    //             interaction: {
    //                 intersect: false
    //             },
    //             scales: {
    //                 x: {
    //                     display: true,
    //                     title: {
    //                         display: true
    //                     }
    //                 },
    //                 y: {
    //                     display: true,
    //                     title: {
    //                         display: true,
    //                         text: 'valor'
    //                     },
    //                     suggestedMin: 0,
    //                     suggestedMax: 100
    //                 }
    //             }
    //         }
    //     };

    //     new Chart(this.eventChart.nativeElement, config);
    // }

    dataPointsEventChart(type: string): number[] {
        const events: Event[] = this.events.filter(e => e.type == type);
        const data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        console.log('tipo do evento passado: ', type);

        for (let i = 0; i < events.length; i++) {
            let month = new Date(events[i].date).getMonth();
            data[month]++;
            if (data[month] > this.max) {
                this.max = data[month];
            }

            // switch (month) {
            //     case 1: {
            //         data[1]++;
            //         break;
            //     }
            //     case 2: {
            //         data[2]++;
            //         break;
            //     }
            //     case 3: {
            //         data[3]++;
            //         break;
            //     }
            //     case 4: {
            //         data[4]++;
            //         break;
            //     }
            //     case 5: {
            //         data[5]++;
            //         break;
            //     }
            //     case 6: {
            //         data[6]++;
            //         break;
            //     }
            //     case 7: {
            //         data[7]++;
            //         break;
            //     }
            //     case 8: {
            //         data[8]++;
            //         break;
            //     }
            //     case 9: {
            //         data[9]++;
            //         break;
            //     }
            //     case 10: {
            //         data[10]++;
            //         break;
            //     }
            //     case 11: {
            //         data[11]++;
            //         break;
            //     }
            //     case 12: {
            //         data[0]++;
            //         break;
            //     }
            //     default: {
            //         data[0]++;
            //         break;
            //     }
            // }
        }

        return data;
    }

    // onSubscriptions(): Promise<any> {

    //     var promise = new Promise<void>((resolve, reject) => {
    //         this.subscriptions = this.studentsService.getStudents().pipe(take(1))
    //             .subscribe({
    //                 next: students => {
    //                     this.students = students as Student[];
    //                 },
    //                 error: error => {
    //                     console.log('erro dentro da promise. studentService ', error);
    //                     reject();
    //                 }
    //             });
    //         this.subscriptions.add(
    //             this.VaccinesTakenService.getVaccineTakens().pipe(take(1))
    //                 .subscribe({
    //                     next: vaccines => {
    //                         this.vaccines = vaccines as VaccineTaken[];
    //                     },
    //                     error: error => {
    //                         console.log('erro dentro da promise. vaccineTakenService ', error);
    //                         reject();
    //                     }
    //                 })
    //         );
    //         this.subscriptions.add(
    //             this.eventsService.getEvents().pipe(take(1))
    //                 .subscribe({
    //                     next: events => {
    //                         this.events = events as Event[];
    //                     },
    //                     error: error => {
    //                         console.log('erro dentro da promise. eventsService ', error);
    //                         reject();
    //                     }
    //                 })
    //         );
    //         resolve();
    //     });

    //     return promise;
    // }


}

