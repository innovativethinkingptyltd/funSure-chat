import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Ticket} from 'src/app/models/ticket.model';
@Injectable({
  providedIn: 'root'
})
export class TickesService {
    constructor(
        private afs: AngularFirestore
    )   {}
    public getAlltickets(): Promise<any[]> {
        const promise = new Promise<any[]>((resolve, reject)=> {
            let allTickets = [];
            this.afs.collection('tickets').ref.get().then(tickets =>    {
                let len =tickets.docs.length;
                let i = 1;
                tickets.docs.forEach(ticket=>   {
                    console.log(ticket.data())
                    allTickets.push(ticket.data());
                    if(i==len)  {
                        console.log('last item')
                        resolve(allTickets)
                    }
                    i++;

                })

            }).catch(error=>    {
                console.log(error)
                reject([error])
            })
        })
        return promise;
    }
    public getLatestTickets(): Observable<Ticket[]>   {
        const observable = new Observable<Ticket[]>(s => {
            this.afs.collection('tickets').valueChanges().subscribe(newTickets =>    {
                let len = newTickets.length;
                let tickets = [];
                let i =1;
                newTickets.forEach(newTicket=>   {
                    tickets.push(newTicket)
                    if (i === len)   {
                        s.next(tickets)
                    }
                    i++;

                })
            })
        })
        return observable;
    }
    public getUser(uid) {
        const promise = new Promise((resolve, reject)=> {
            this.afs.collection('users').ref.doc(uid).get().then(user=> {
                resolve(user.data())
            }).catch(error =>   {
                reject(error.toString())
            })
        })
        return promise;
    }
}