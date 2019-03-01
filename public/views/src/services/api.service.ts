import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';



@Injectable()
export class ApiService {

  private socket;
  private Observer;

  constructor() {
    
  }

  getTweets(track) {
    this.socket = io('/');
    this.Observer = Observable.create(observer => {
      this.socket.emit('new-stream', track);
      this.socket.on('tweet', tweet => {
        observer.next(tweet);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return this.Observer;
  }

  stopStream() {
    if(this.socket)
      this.socket.emit('stop-stream');
  }

}
