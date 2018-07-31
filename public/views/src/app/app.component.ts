import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  keys = Object.keys;
  
  subscriber;
  tweets = [];
  track = {
    track: 'mufc',
    tweet_mode: 'extended'
  };
  happyThreshold = 2;
  unhappyThreshold = -1;
  categories = {
    happy: 0,
    neutral: 0,
    unhappy: 0,
  };
  totalCount = 0;
  styles = {
    happy: {
      class: 'fas fa-smile-beam',
      color: '#47cf73'
    },
    neutral: {
      class: 'fas fa-meh',
      color: '#1a94c0',
    },
    unhappy: {
      class: 'fas fa-frown-open',
      color: '#d81858'
    }
  }

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
      this.categories.happy++;
      tweet.category = 'happy';
    }
    else if(tweet.nlprocessed.score <= this.unhappyThreshold) 
    {
      this.categories.unhappy++;
      tweet.category = 'unhappy';
    }
    else
    {
      this.categories.neutral++;
      tweet.category = 'neutral';
    }
    this.totalCount++;
    return tweet;
  }
  value(category) {
    if(this.totalCount > 0)
      return Math.round(this.categories[category] * 100 / this.totalCount);
    return 0;

  }
}