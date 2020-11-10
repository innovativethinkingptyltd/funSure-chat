
import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable()
export class Helpers {
  alert: HTMLIonAlertElement;
  constructor(private alertController: AlertController,private angularFireStorage:AngularFireStorage) { }


  async uploadDocument(docInformation) {
    if (docInformation == undefined)
      return false;
    var name = 'supplier-logos/' + docInformation.name;
    const fileRef = await this.angularFireStorage.ref(name);
    return new Promise<any>((resolve, reject) => {
      this.angularFireStorage.upload(name, docInformation.data).snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => { 
              resolve({url:url});
            })
          })
        ).subscribe(res => {
        }, err => {
          reject(false)
        });
    });

  }

  private setAll(obj, val) {
    Object.keys(obj).forEach(function (index) {
      obj[index] = val
    });
  }
  setObjectKeysNull(obj) {
    this.setAll(obj, null);
  }

  dateFormat(date?: any) {
    return moment().format('DD-MM-YYYY')
  }
  timeFormat(date) {
    return moment(date).format("hh:mm")
  }
  getAge(birthDate) {
    var now = new Date();

    function isLeap(year) {
      return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    // days since the birthdate    
    var days = Math.floor((now.getTime() - birthDate.getTime()) / 1000 / 60 / 60 / 24);
    var age = 0;
    // iterate the years
    for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++) {
      var daysInYear = isLeap(y) ? 366 : 365;
      if (days >= daysInYear) {
        days -= daysInYear;
        age++;
        // increment the age only if there are available enough days for the year.
      }
    }
    return age;
  }

  bin2String(array) {
    return String.fromCharCode.apply(String, array);
  }
  async reauthenticateUser(callbackConfirm, title) {
    this.alert = await this.alertController.create({
      header: title,
      backdropDismiss: false,
      inputs: [
        {
          label: 'Password',
          name: 'password',
          type: 'password',
          placeholder: 'Password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            if (callbackConfirm)
              callbackConfirm(data);
          }
        }
      ]
    });
    await this.alert.present();
  }

}

/**
 * @field medicinePurpose = General/Vaccination/Deworming/Parasite
 */

export interface IReminder {
  title: string;
  medicinePurpose: string;
  medicineName: string;
  startTime: string;
  endTime: string;
  fromDate: string;
  toDate: string;
  petName?: string;
  uid: string;
  repeatForm: string;
  reminderCategory: string;
}