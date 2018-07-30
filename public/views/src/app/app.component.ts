import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  categories = function(categories){
    return Object.keys(categories).filter(category => category !== 'total');
  }
  
  subscriber;
  tweets = [];
  track = {
    track: 'mufc',
    tweet_mode: 'extended'
  };
  happyThreshold = 2;
  unhappyThreshold = -1;
  count = {
    happy: 0,
    neutral: 0,
    unhappy: 0,
    total: 0
  };

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.subscriber = this.api.getTweets(this.track).subscribe(newTweet => {
      this.addNewTweet(newTweet);
    });
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  addNewTweet(tweet) {
    console.log(tweet);
    this.tweets.splice(0, 0, this.categorizeTweet(tweet));
  }
  categorizeTweet(tweet) {
    if(tweet.nlprocessed.score >= this.happyThreshold) 
    {
      this.count.happy++;
      tweet.category = 'happy';
    }
    else if(tweet.nlprocessed.score <= this.unhappyThreshold) 
    {
      this.count.unhappy++;
      tweet.category = 'unhappy';
    }
    else
    {
      this.count.neutral++;
      tweet.category = 'neutral';
    }
    this.count.total++;
    return tweet;
  }
  value(category) {
    return Math.round(this.count[category] * 100 / this.count.total);

  }
}