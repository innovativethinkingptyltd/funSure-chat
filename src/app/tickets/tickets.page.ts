import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  public showMsgDrawer: Boolean = false;
  public showInfoDrawer: Boolean = false;
  user: Object;
  messages : Array<Object>;


  constructor() { 
    this.user= {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+27 8215 0120 15",
      address: "Johannesburg, South Africa",
      full_address: "134/8 South Avenue, Christopher Park Johannesburg, South Africa 254012",
      picture: "assets/images/pic1.png",
      ticket_details: {
        ticket_number: "2151 1251 12",
        created_at: "14 Sep, 10 AM",
        category: "Funeral",
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
  }

  toggleClass(){
    this.showMsgDrawer = !this.showMsgDrawer;
    if(this.showInfoDrawer){
      this.showInfoDrawer = false
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
}
