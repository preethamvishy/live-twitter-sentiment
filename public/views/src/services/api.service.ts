import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';



@Injectable()
export class ApiService {

  private socket;

  constructor() { 
    
  }
  
  getTweets() {
    this.socket = io('/');
    return Observable.create(observer => {
      this.socket.on('tweet', tweet => {
        observer.next(tweet);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
  }

}
