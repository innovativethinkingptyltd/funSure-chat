import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { PopupHelper } from 'src/app/services/helpers/popup-helper';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastService } from '../services/toast/toast.service';
import { WindowService } from '../services/window-service/window-service.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  number: string;
  otpCode: string;
  ownCode: string;
  remember: boolean = false;
  typing = false;
  uid: string;
  prefix: string;
  verificationCode: string;
  showOtpCode = false;
  showOwnCode = false;
  user: any = {};
  windowRef:any;

  constructor(public loading: LoadingService,
              private afs: AngularFirestore,
              private auth: AuthenticationService,
              public navCtrl: NavController,
              private popUp: PopupHelper,
              private storage: Storage,
              public afAuth: AngularFireAuth,
              private router: Router,
              private toast: ToastService,
              private windowService: WindowService
              ) { }

  ngOnInit() {

  }
  async ionViewWillEnter(){
    this.windowRef=await this.windowService.windowRef;
    this.windowRef.recaptchaVerifier=await new firebase.default.auth.RecaptchaVerifier('recaptcha-container');
    await this.windowRef.recaptchaVerifier.render();
  }

  verifyNumber() {

    if(this.number.toString().trim().length < 9) {
      return this.popUp.showError('invalid number')
    }
    this.sendLoginCode().then(() => {
      this.showOtpCode = true;
    }).catch(error => {
      console.log(error)
      this.popUp.showError(error)
    })
  }

  sendLoginCode(){
    this.prefix = ' +27' + this.number.toString();
    let promise =new Promise<any>((resolve, reject) => {
      console.log(this.prefix);
      const num = this.prefix.toString();
      const appVerifier = this.windowRef.recaptchaVerifier;
      firebase.default.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
        resolve();
      }).catch(err => reject(err))
    });
    return promise;
  }
  submitVerif(){
    if(!this.otpCode) {
      return this.popUp.showError('please add the otp code that was sent to you')
    }
    if(this.otpCode.trim().length != 6) {
      return this.popUp.showError('the code you have added is in the wrong format')
    }
    this.windowRef.confirmationResult.confirm(this.otpCode).then(async result=>
      {
      console.log(result)
      this.popUp.showAlert('success',result).then(() => 
      {
        this.loading.present('loading...').then(() => {
          this.setUser(result.user.uid);
        })
      })
     })
     .catch(err=>{
      console.log('err2',err)
      this.popUp.showError(err.toString())
     });
}

  setUser(uid)  {
    this.afs.collection('users').ref.doc(uid).get().then(user => {
      this.loading.dismiss().then(()=>  {
        this.storage.set('user', user.data()).then(() =>  {
          this.toast.show('your information has been retrieved').then(() => {
            this.showOwnCode = true;
          });
        });
      });
    }).catch(error =>{
      this.popUp.showError(error)
    })
   }
  checkOwnCode()  {
    this.storage.get('user').then(user => {
      if(user)  {
        if(this.ownCode == user.ownCode)  {
          this.toast.show('login successful :)').then(() => {
            this.loading.present('loggin in').then(() =>  {
              this.navCtrl.navigateForward('messages').then(() =>  {
                this.loading.dismiss();
              });
            });
          });
        }
      }else {
        this.popUp.showError('you have added the incorrect personal code').then(() => {
          console.log('now whats')
        })
      }
    })
  }

  async alert(name) {
    this.popUp.showAlert('somethings wrong ', 'please add ' + name);
  }
  facebookSignIn()  {
    this.popUp.showAlert('coming soon', 'this feature is still under development');
  }
  signInUsingGoogle() {
    this.popUp.showAlert('coming soon', 'this feature is still under development');
  }
}
