import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  keys = Object.keys;

  subscriber;
  tweets = [[], [], []];

  track = {
    track: 'Boston',
    tweet_mode: 'extended'
  };

  happyThreshold = 2;
  unhappyThreshold = -1;
  categories;
  totalCount;

  styles = {
    0: {
      class: 'fas fa-smile-beam',
      color: '#47cf73'
    },
    1: {
      class: 'fas fa-meh',
      color: '#1a94c0',
    },
    2: {
      class: 'fas fa-frown-open',
      color: '#d81858'
    }
  }

  searchStr = 'Boston';

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.resetCategories();
    this.subscriber = this.api.getTweets(this.track).subscribe(newTweet => {
      this.addNewTweet(newTweet);
    });
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  resetCategories() {
    this.totalCount = 0;
    this.categories = {
      0: 0,
      1: 0,
      2: 0,
    };
  }

  addNewTweet(tweet) {
    this.categorizeTweet(tweet);
  }
  categorizeTweet(tweet) {
    if (tweet.nlprocessed.score >= this.happyThreshold) {
      this.categories[0]++;
      this.tweets[0].splice(0, 0, tweet);
    }
    else if (tweet.nlprocessed.score <= this.unhappyThreshold) {
      this.categories[1]++;
      this.tweets[1].splice(0, 0, tweet);
    }
    else {
      this.categories[2]++;
      tweet.category = 'neutral';
      this.tweets[2].splice(0, 0, tweet);
    }
    this.totalCount++;
  }

  value(category) {
    if (this.totalCount > 0) {
      return Math.floor(this.categories[category] * 100 / this.totalCount);
    }
    return 0;
  }

  newTracker(searchStr) {
    console.log(searchStr);
    this.resetCategories();
    this.api.stopStream();
    this.tweets = [[], [], []];
    this.track = {
      track: searchStr,
      tweet_mode: 'extended'
    };
    this.subscriber = this.api.getTweets(this.track).subscribe(newTweet => {
      this.addNewTweet(newTweet);
    });
  }
}