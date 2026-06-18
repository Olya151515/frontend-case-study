export const baseUrl= 'https://nfctron-frontend-seating-case-study-2024.vercel.app';

export const urls = {
    event:{
        allEvent: baseUrl + '/event',
        byId: (id:string):string => urls.event.allEvent + '-tickets?eventId=' + id,
    },
}
