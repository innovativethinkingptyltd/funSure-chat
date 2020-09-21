import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.page.html',
  styleUrls: ['./all-tickets.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllTicketsPage implements OnInit {
  public columns: any;
  public data : Array<Object>;

  constructor() { 
    this.columns = [
      { name: 'Name', width: "200"},
      { name: 'Message' },
      { name: 'Time' },
      { name: 'Agents'}
    ];
    this.data = [
      {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed",
        time: "3:00 PM 14 Sep 2020",
        profile_pic: "assets/images/pic1.png",
        agents:[
          {
            name:"agent1",
            profile_pic: "assets/images/pic1.png"
          }, 
          {
            name:"agent2",
            profile_pic: "assets/images/pic2.png"
          }, 
          {
            name:"agent3",
            profile_pic: "assets/images/pic3.png"
          }, 
        ]
      },
      {
        name: "Autri Taheri",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed",
        time: "3:00 PM 14 Sep 2020",
        profile_pic: "assets/images/pic1.png",
        agents:[
          {
            name:"agent1",
            profile_pic: "assets/images/pic5.png"
          }, 
        ]
      },
      {
        name: "Ali Pazani",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed",
        time: "3:00 PM 14 Sep 2020",
        profile_pic: "assets/images/pic1.png",
        agents:[
          {
            name:"agent2",
            profile_pic: "assets/images/pic2.png"
          }, 
          {
            name:"agent3",
            profile_pic: "assets/images/pic3.png"
          }, 
        ]
      },
      {
        name: "Guilla Bouldec",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed",
        time: "3:00 PM 14 Sep 2020",
        profile_pic: "assets/images/pic1.png",
        agents:[
          {
            name:"agent1",
            profile_pic: "assets/images/pic1.png"
          }, 
          {
            name:"agent2",
            profile_pic: "assets/images/pic2.png"
          }, 
          {
            name:"agent3",
            profile_pic: "assets/images/pic3.png"
          }, 
        ]
      },
      {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed",
        time: "3:00 PM 14 Sep 2020",
        agents:[
          {
            name:"agent1",
            profile_pic: "assets/images/pic1.png"
          }, 
          {
            name:"agent2",
            profile_pic: "assets/images/pic2.png"
          }, 
          {
            name:"agent3",
            profile_pic: "assets/images/pic3.png"
          }, 
        ]
      },
      {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed",
        time: "3:00 PM 14 Sep 2020",
        agents:[
          {
            name:"agent1",
            profile_pic: "assets/images/pic1.png"
          }, 
          {
            name:"agent2",
            profile_pic: "assets/images/pic2.png"
          }, 
          {
            name:"agent3",
            profile_pic: "assets/images/pic3.png"
          }, 
        ]
      },
      {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed",
        time: "3:00 PM 14 Sep 2020",
        agents:[
          {
            name:"agent1",
            profile_pic: "assets/images/pic1.png"
          }, 
          {
            name:"agent2",
            profile_pic: "assets/images/pic2.png"
          }, 
          {
            name:"agent3",
            profile_pic: "assets/images/pic3.png"
          }, 
        ]
      },
  ]
  }

  ngOnInit() {
  }

}
