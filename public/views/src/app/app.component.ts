import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriber;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.subscriber = this.api.getTweets().subscribe(data => console.log(data));
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
