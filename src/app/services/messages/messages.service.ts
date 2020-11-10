import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
    constructor(
        private afs: AngularFirestore
    )   {}
    public sendMessage(message)    {
        console.log('this is the message being sent')
        console.log(message)
        const promise = new Promise((resolve , reject) =>    {
            this.afs.collection(`chats/${message.uid}/messages`).add(message).then(() => {
                resolve();
            }).catch(error => reject(error));
        })
        return promise;
    }
    public getAllMessages(uid)  {
        const promise = new Promise((resolve , reject) =>    {
            this.afs.collection(`chats/${uid}/messages`).ref.orderBy('time').get().then(messages => {
                let len =messages.docs.length;
                let i = 1;
                let allMessages = [];
                console.log(messages.docs)
                if(messages.docs.length < 1)    {
                    resolve(null)
                }
                messages.docs.forEach(message=>   {
                    console.log(message.data())
                    allMessages.push(message.data());
                    if(i==len)  {
                        console.log('last item')
                        resolve(allMessages)
                    }
                    i++;

                });
            }).catch(error =>    {
                reject(error);
            });
        });
        return promise;
    }
    public getLatestMessages(uid): Observable<any[]>   {
        const observerable = new Observable<any[]>(x =>   {
            let chatCollection = this.afs.collection(`chats/${uid}/messages`, ref => ref.orderBy('time'));
            chatCollection.valueChanges().subscribe(messages =>   {
                let len = messages.length;
                let allMessages = [];
                let i =1;
                messages.forEach(message=>  {
                    allMessages.push(message);
                    if(i==len)  {
                        x.next(allMessages)
                    }
                    i++;
                })
            })
        })
        return observerable;
    }
    public getAllMessageSenders()  {
        const promise = new Promise<string[]>((resolve, reject) =>    {
            this.afs.collection('chats/').ref.get().then((users) => {
                let len = users.docs.length;
                let allMessages = [];
                let i =1;
                users.docs.forEach(user=>  {
                    allMessages.push(user.id);
                    if(i==len)  {
                        resolve(allMessages)
                    }
                    i++;
                })
            }).catch(error =>   {
                reject(error.toString)
            })
        })
        return promise

    }
    public getUsersInfo()   {
        const promise = new Promise((resolve, reject)=> {
            this.getAllMessageSenders().then((userList) => {
                const len = userList.length;
                let allUsers = [];
                let i = 1;
                userList.forEach(uid => {
                    this.afs.collection('users').ref.doc(uid).get().then(user=> {
                        allUsers.push(user.data())
                        if(i === len)  {
                            resolve(allUsers);
                        }
                        i++;
                    }).catch(error =>   {
                        reject(error.toString());
                    })
                });
            }).catch(error =>   {
                reject(error);
            });
        });
        return promise;
    }
    public getLatestUserinfo()   {
        const observ = new Observable<any[]>(x =>   {
            let chatCollection = this.afs.collection(`chats/`);
            chatCollection.snapshotChanges().subscribe(users =>  {
                console.log('in latestUser subscription')
                console.log(users)
                let len = users.length;
                let allUsers = [];
                let i =1;
                
                users.forEach(user=>  {
                    this.afs.collection('users').ref.doc(user.payload.doc.id).get().then(user=> {
                        allUsers.push(user.data());
                        if(i==len)  {
                            x.next(allUsers);
                        }
                        i++;
                    }).catch(error =>   {
                        x.error(error);
                    });
                });
            })
        })
        return observ
    }
}