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

  categories;
  totalCount;

  styles = {
    0: {
      class: 'fas fa-smile-beam',
      color: '#47cf73'
    },
    2: {
      class: 'fas fa-angry',
      color: '#d81858',
    },
    1: {
      class: 'fas fa-frown-open',
      color: '#1a94c0'
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
    var emotions = tweet.nlprocessed.document_tone.tone_categories[0].tones;

    const dominantEmotion = emotions.reduce(function (first, second) {
      return (first.score > second.score) ? first : second
    })

    if (dominantEmotion.tone_id == 'joy') {
      this.categories[0]++;
      this.tweets[0].splice(0, 0, tweet);
    }
    else if (['anger', 'disgust'].indexOf(dominantEmotion.tone_id) > -1) {
      this.categories[2]++;
      this.tweets[2].splice(0, 0, tweet);
    }
    else {
      this.categories[1]++;
      this.tweets[1].splice(0, 0, tweet);
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