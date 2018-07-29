import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriber;
  value: number = 0;

  tweets = [];
  track = {
    track: 'boston',
    tweet_mode: 'extended'
  };

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.subscriber = this.api.getTweets(this.track).subscribe(newTweet => {
      this.tweets.splice(0, 0, newTweet);
      this.value = this.tweets.length;
    });
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
