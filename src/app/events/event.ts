export interface Event {
    id: string;
    type: string;
    description: string;
    date: Date;
    studentId: string;
}

// switch (event.type) {
//     case 'CC':
//         this.eventType = 'Câncer';
//         break
//     case 'DB':
//         this.eventType = 'Doenças bacterianas';
//         break
//     case 'DG':
//         this.eventType = 'Doenças genéticas';
//         break
//     case 'DP':
//         this.eventType = 'Doenças psicológicas';
//         break
//     case 'DST':
//         this.eventType = 'Doenças sexualmente transmissíveis';
//         break
//     case 'MC':
//         this.eventType = 'Micoses';
//         break
//     case 'PV':
//         this.eventType = 'Protozooses/Verminoses';
//         break
//     case 'VIR':
//         this.eventType = 'Viroses';
//         break
//     case 'GRI':
//         this.eventType = 'Gripes';
//         break
//     case 'COV':
//         this.eventType = 'Covid';
//         break
// }