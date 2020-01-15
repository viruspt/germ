import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less'],
})
export class DetailsComponent implements OnInit {

  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }
}
