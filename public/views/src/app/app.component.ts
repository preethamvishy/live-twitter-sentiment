import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
declare var $;

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
  mostPositive = {
    dominantEmotion: {
      score: 0
    },
    text: ''
  };
  mostNegative = {
    dominantEmotion: {
      score: 0
    },
    text: ''
  };
  influentialPositive = {
    retweet_count: -1,
    favorite_count: -1,
    text: ''
  };
  influentialNegative = {
    retweet_count: -1,
    favorite_count: -1,
    text: ''
  };

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.resetCategories();
    this.newTracker(this.searchStr);
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
    var incomingTweet = tweet;
    while (incomingTweet.retweeted_status != null && incomingTweet.retweeted_status != undefined)
      incomingTweet = incomingTweet.retweeted_status;

    if (incomingTweet.extended_tweet != null && incomingTweet.extended_tweet != undefined)
      incomingTweet.text = incomingTweet.extended_tweet.full_text;

    var emotions = tweet.nlprocessed.document_tone.tone_categories[0].tones;
    const dominantEmotion = emotions.reduce(function (first, second) {
      return (first.score > second.score) ? first : second
    })

    if (dominantEmotion.tone_id == 'joy') {
      this.categories[0]++;
      this.tweets[0].splice(0, 0, tweet);
      if (this.mostPositive.dominantEmotion.score < dominantEmotion.score) {
        this.mostPositive = incomingTweet;
        this.mostPositive.dominantEmotion = dominantEmotion;
      }
      if (this.influentialPositive.retweet_count + this.influentialPositive.favorite_count < incomingTweet.retweet_count + incomingTweet.favorite_count) {
        this.influentialPositive = incomingTweet;
      }
    }
    else {
      if (['anger', 'disgust'].indexOf(dominantEmotion.tone_id) > -1) {
        this.categories[2]++;
        this.tweets[2].splice(0, 0, tweet);
      }
      else {
        this.categories[1]++;
        this.tweets[1].splice(0, 0, tweet);
      }

      if (this.mostNegative.dominantEmotion.score < dominantEmotion.score) {
        this.mostNegative = incomingTweet;
        this.mostNegative.dominantEmotion = dominantEmotion;
      }

      if (this.influentialNegative.retweet_count + this.influentialNegative.favorite_count < incomingTweet.retweet_count + incomingTweet.favorite_count) {
        this.influentialNegative = incomingTweet;
      }
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
    this.resetCategories();
    this.api.stopStream();
    this.tweets = [[], [], []];
    this.track = {
      track: searchStr,
      tweet_mode: 'extended'
    };
    this.subscriber = this.api.getTweets(this.track).subscribe(newTweet => {
      if (newTweet.watsonError) {
        $("#error").modal("toggle");
        this.api.stopStream();
        this.subscriber.unsubscribe();
      }
      else
        this.addNewTweet(newTweet);
    });

  }

  getImageUrl(tweet) {
    return (tweet.user.profile_image_url_https).replace('_normal', '');
  }
}