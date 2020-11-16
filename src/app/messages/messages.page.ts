import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {MessagesService} from 'src/app/services/messages/messages.service'
import { PopupHelper } from '../services/helpers/popup-helper';
import { LoadingService } from '../services/loading-service/loading.service';
import {CheckMenu} from '../services/check-menu/check-menu.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  msgList : Array<Object>;
  user: any = {};
  messages : Array<Object>;

  public showMsgDrawer: Boolean = false;
  public showInfoDrawer: Boolean = false;

  @ViewChild('IonContent') content: IonContent;

  user_input: string = "";
  User: string = "Me";
  toUser: string = "HealthBot";
  start_typing: any;
  loader: boolean;
  listOfUsers: any = [];
  selectedUser: any = {};
  selectedUserInfo: any = {};
  selectedMessageCollection: any = []
  messSubsciption: Subscription;

  constructor(
    private messageService: MessagesService,
    private popUp: PopupHelper,
    private loading: LoadingService,
    private checkMenu: CheckMenu
  ) { 

    this.msgList = [];

    this.user= {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+27 8215 0120 15",
      address: "Johannesburg, South Africa",
      full_address: "134/8 South Avenue, Christopher Park Johannesburg, South Africa 254012",
      picture: "assets/images/pic1.png",
      policy_details: {
        policy_number: "2151 1251 12",
        tenure: "48 Months",
        premium: "R 50 P/M",
      }
    }
  }

  ngOnInit() {
    this.checkMenu.showMenu();
    this.closeInfoDrawer();
    this.getUsers();
    this.subscribeToLatestUser();
  }

  toggleClass(){
    this.showMsgDrawer = !this.showMsgDrawer;
    if(this.showInfoDrawer){
      this.showInfoDrawer = false;
    }
  }
  toggleInfoClass(){
    setTimeout(()=>{
      this.showInfoDrawer = !this.showInfoDrawer;

    },100)
    if(this.showMsgDrawer){
      this.showMsgDrawer = false
    }
  }

  closeInfoDrawer(){
    var drawer = document.getElementById('info-drawer');
    document.addEventListener('click', function(event) {
      var isInside = drawer.contains(event.target);
      if(!isInside){
        if(this.showInfoDrawer){
          this.showInfoDrawer = false
        }
      }

    }.bind(this), false)
  }
  getAllChats() {
    this.messageService.getAllMessageSenders().then((users)=>  {
      console.log('these are the users');
      console.log(users)
    })
  }

  getUsers()  {
    this.messageService.getUsersInfo().then(userList=>  {
      console.log('supposed to have user list')
      console.log(userList)
      this.listOfUsers = userList;
    }).catch(error =>  {
      this.popUp.showError(error.toString());
    })
  }
  subscribeToLatestUser() {
    this.messageService.getLatestUserinfo().subscribe(newUsers=>  {
      this.listOfUsers = newUsers;
    }, (error: any)=> {
      this.popUp.showError(error.toString())
    })
  }
  composeMessage()  {
    const promise = new Promise((resolve, reject)=> {
      const mess = {
        message: this.user_input,
        uid: this.selectedUser.uid,
        userName: 'Support',
        time: new Date().toUTCString()
      }
      resolve(mess);
    })
    return promise;
  }
  select(user) {
    this.selectedUser = user;
    this.User = user.name;
    if(this.messSubsciption)  {
      this.messSubsciption.unsubscribe();
    }
    this.loading.present('loading...').then(() =>  {
      this.messageService.getAllMessages(user.uid).then(messages => {
        console.log('these are all messages...')
        console.log(messages)
        this.messageService.getUser(user.uid).then(currentUser => {
          if(currentUser) {
            this.selectedUserInfo = currentUser;
            this.loading.dismiss().then(() =>  {
              this.selectedMessageCollection = messages;
              this.messSubsciption = this.messageService.getLatestMessages(user.uid).subscribe( messages => {
                this.selectedMessageCollection  =messages;
              });
            });
          }
          else{
            this.loading.dismiss().then(() => {
              this.popUp.showError('there is something wrong with this users information').then(()=>  {
              
              })
            })
          }
        })
      }).catch(error => {
        this.loading.dismiss().then(() =>  {
          this.popUp.showError(error.toString());
        });
      });
    });
  }
  sendMessage() {
    this.composeMessage().then(mess =>  {
      this.messageService.sendMessage(mess).then(()=>  {
        this.popUp.showToast('message sent').then(()=>  {
          this.user_input =  '';
        })
      }).catch((error)=> {
        this.popUp.showError(error.toString())
      })
    })
  }
}
