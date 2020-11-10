import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('user').then((user) => {
      if (user) {
        this.authState.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  reset(email) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(email).then(() => {
        resolve();
      }),
        err => reject(err)
    });
  }

  login(email, password, remember) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.afAuth.authState.pipe(take(1)).subscribe(auth => {
            if (auth && auth.uid) {
              this.afs.collection('users').doc(auth.uid).ref.get().then(user => {
                this.storage.set('user', user.data()).then(() => {
                  resolve(user.data());
                })
              }).catch(err => {
                console.log(err)
                reject(err)
              })
            }
          })
        }).catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }

  logout() {
    this.storage.remove('user').then(() => {
      this.navCtrl.navigateRoot(['/welcome']).then(() => {
        return this.afAuth.signOut()
      }).catch((error) => {
        console.log(error)
      })
    })
  }

}