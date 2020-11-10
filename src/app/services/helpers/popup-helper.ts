
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular'; 

@Injectable({
    providedIn: 'root',
})
export class PopupHelper {
    constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {

    }

    loader: any;

    async showLoading(message: string) {
        console.log('in show loading')
        this.loader = await this.loadingCtrl.create({
            message: message,
            translucent: true
        }).catch(err=> console.log(err));

        return await this.loader.present();
    }

    async dismissLoading() {
        if (this.loader) {
            return await this.loader.dismiss();
        }
        else {
            console.log("popup-helper: dismissLoading called with no loader!");
        }
    }

    showAlert(title: string, subTitle: string): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
            const alert = await this.alertCtrl.create({
                header: title,
                subHeader: subTitle,
                buttons: ['OK'],
                translucent: false,
                backdropDismiss:false
            });

            alert.onDidDismiss().then(() => {
                resolve(true);
            });
            await alert.present();
        });
    }

    showError(subTitle: string): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
            const alert = await this.alertCtrl.create({
                header: "There was a problem",
                subHeader: subTitle,
                buttons: ['OK'],
                translucent: false
            });

            alert.onDidDismiss().then(() => {
                resolve(true);
            });
            await alert.present();
        });
    }

    async showToast(message: string) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 4500,
            translucent: false,
        });
        await toast.present();
    }

    async showAlertWithCallback(title: string, subTitle: string, callback: () => void) {
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: subTitle,
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        callback();
                    }
                }]
        });
        await alert.present();
    }

    async showConfirm(title: string, subTitle: string, buttonConfirm: string, callbackConfirm: () => void, buttonCancel: string, callbackCancel: () => void) {
        let alert = await this.alertCtrl.create({
            header: title,
            subHeader: subTitle,
            buttons: [
                {
                    text: buttonConfirm,
                    handler: () => {
                        if (callbackConfirm)
                            callbackConfirm();
                    }
                },
                {
                    text: buttonCancel,
                    role: 'cancel',
                    handler: () => {
                        if (callbackCancel)
                            callbackCancel();
                    }
                }
            ]

        });
        await alert.present();
    }
}