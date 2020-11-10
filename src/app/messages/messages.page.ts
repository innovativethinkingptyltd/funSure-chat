import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import {MessagesService} from 'src/app/services/messages/messages.service'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  msgList: Array<Object>;
  user: Object;
  messages: Array<Object>;
  public showMsgDrawer: Boolean = false;
  public showInfoDrawer: Boolean = false;

  @ViewChild('IonContent') content: IonContent;

  user_input: string = "";
  User: string = "Me";
  toUser: string = "HealthBot";
  start_typing: any;
  loader: boolean;
  chats: any = [];
  selectedChat: any = {};
  constructor(
    private messageService: MessagesService
  ) { 

    this.msgList = [
      {
        userId: "Me",
        userName: "Me",
        userAvatar: "../../assets/images/pic1.png",
        time: "3:00 PM 14 Sep 2020",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
        id: 1,
      },
      {
        userId: "HealthBot",
        userName: "HealthBot",
        userAvatar: "../../assets/images/pic2.png",
        time: "3:00 PM 14 Sep 2020",
        message: "Lorem ipsum dolor sit amet, consetetur ",
        id: 3
      },
      {
        userId: "Me",
        userName: "Me",
        userAvatar: "../../assets/images/pic1.png",
        time: "3:00 PM 14 Sep 2020",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ",
        id: 4
      },
      {
        userId: "HealthBot",
        userName: "HealthBot",
        userAvatar: "../../assets/images/pic2.png",
        time: "3:00 PM 14 Sep 2020",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ",
        id: 5
      }
    ];

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

    this.messages= [
      {
        user: "John Doe",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
        time: "3:00 PM",
        profile_pic: "assets/images/pic1.png"
      },
      {
        user: "Christina",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
        time: "3:00 PM",
        profile_pic: "assets/images/pic2.png"
      },
      {
        user: "Caleb George",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
        time: "3:00 PM",
        profile_pic: "assets/images/pic3.png"
      },
      {
        user: "David Hurley",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
        time: "3:00 PM",
        profile_pic: "assets/images/pic4.png"
      },
      {
        user: "Joel Barwick",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
        time: "3:00 PM",
        profile_pic: "assets/images/pic5.png"
      },
      {
        user: "Christina",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
        time: "3:00 PM",
        profile_pic: "assets/images/pic2.png"
      },
      
    ] 
  }

  ngOnInit() {
    this.closeInfoDrawer()
    this.selectedChat = this.messages[0];
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
  selectChat(chat)  {
    console.log(chat)
    this.selectedChat = chat;
  }
}
