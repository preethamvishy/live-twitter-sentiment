webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
exports.APP_ROUTES = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: app_component_1.AppComponent },
];


/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron text-center banner\">\n  <h3>\n    <span>\n      <i class=\"glyphicon glyphicon-equalizer\" aria-hidden=\"true\"></i>\n    </span>\n    {{'Twitter Sentiment Analysis Demo' | uppercase }}\n  </h3>\n</div>\n<div class=\"container\">\n  <form (submit)=\"newTracker(searchStr)\">\n    <div class=\"input-group\">\n      <span class=\"input-group-addon\">\n        <i class=\"glyphicon glyphicon-search\"></i>\n      </span>\n      <input id=\"search\" type=\"text\" class=\"form-control\" name=\"search\" [(ngModel)]=\"searchStr\" placeholder=\"Search\">\n    </div>\n  </form>\n  <br/>\n</div>\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div *ngFor=\"let category of keys(categories)\" class=\"col-sm-4\">\n      <div class=\"row text-center score-card\">\n        <span class=\"category-icon\" [style.color]=\"styles[category].color\">\n          <i [ngClass]=\"styles[category].class\"></i>\n        </span>\n        <span class=\"category-score\">{{value(category)}}%</span>\n      </div>\n      <p>\n        <ngb-progressbar class=\"index\" type=\"success\" height=\".5rem\" [value]=\"value(category)\"></ngb-progressbar>\n      </p>\n    </div>\n  </div>\n</div>\n<div class=\"container\">\n  <div class=\"tweet-container\">\n    <div class=\"tweet-nav\">\n      <ul>\n        <li *ngFor=\"let tweet of tweets\">\n          <div class=\"tweet\">\n            <div class=\"category-icon pull-left\" [style.color]=\"styles[tweet.category].color\">\n              <i [ngClass]=\"styles[tweet.category].class\"></i>\n            </div>\n            <div class=\"text\">\n              {{tweet.text}}\n            </div>\n          </div>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = ".banner {\n  background: linear-gradient(45deg, #2cb5e8, #47cf73);\n  color: white; }\n\n.progress-bar.bg-success {\n  background-color: red; }\n\n.tweet-container {\n  background: linear-gradient(45deg, #2cb5e8, #47cf73);\n  width: 100%;\n  height: 50vh;\n  border-radius: 25px;\n  overflow-y: hidden;\n  padding-bottom: 15px; }\n\n.tweet-container .tweet-nav {\n    height: 100%;\n    overflow-y: scroll; }\n\n.tweet-container .tweet-nav ul {\n      list-style-type: none;\n      padding: 5px;\n      width: 95%;\n      margin: auto auto;\n      padding-top: 15px;\n      display: table;\n      -webkit-transition: all 0.4s ease-out;\n      transition: all 0.4s ease-out; }\n\n.tweet-container .tweet-nav ul li {\n        margin-bottom: 0.5rem; }\n\n.tweet-container .tweet-nav ul li .tweet {\n          border: solid;\n          border-radius: 15px;\n          border-width: 0 0 0 0;\n          display: table;\n          background: white;\n          margin-top: 4px;\n          min-height: 2em; }\n\n.tweet-container .tweet-nav ul li .tweet .category-icon {\n            font-size: 1.5rem;\n            width: 2rem;\n            padding: 0.25rem;\n            padding-left: 1rem;\n            display: table-cell;\n            vertical-align: middle;\n            position: relative; }\n\n.tweet-container .tweet-nav ul li .tweet .text {\n            display: table-cell;\n            width: 100%;\n            vertical-align: middle;\n            padding: 10px;\n            padding-left: 1.25rem; }\n\n.score-card {\n  font-size: 4rem; }\n\n.score-card .category-icon {\n    border-right: 1px solid #919191; }\n\n.score-card .category-score {\n    width: 3rem;\n    padding-left: 1rem; }\n\n.happy {\n  color: #47cf73; }\n\n.unhappy {\n  color: #d81858; }\n\n.neutral {\n  color: #1a94c0; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var api_service_1 = __webpack_require__("./src/services/api.service.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent(api) {
        this.api = api;
        this.keys = Object.keys;
        this.tweets = [];
        this.track = {
            track: 'Boston',
            tweet_mode: 'extended'
        };
        this.happyThreshold = 2;
        this.unhappyThreshold = -1;
        this.styles = {
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
        };
        this.searchStr = 'Boston';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resetCategories();
        this.subscriber = this.api.getTweets(this.track).subscribe(function (newTweet) {
            _this.addNewTweet(newTweet);
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscriber.unsubscribe();
    };
    AppComponent.prototype.resetCategories = function () {
        this.totalCount = 0;
        this.categories = {
            happy: 0,
            neutral: 0,
            unhappy: 0,
        };
    };
    AppComponent.prototype.addNewTweet = function (tweet) {
        console.log(tweet);
        this.tweets.splice(0, 0, this.categorizeTweet(tweet));
    };
    AppComponent.prototype.categorizeTweet = function (tweet) {
        if (tweet.nlprocessed.score >= this.happyThreshold) {
            this.categories.happy++;
            tweet.category = 'happy';
        }
        else if (tweet.nlprocessed.score <= this.unhappyThreshold) {
            this.categories.unhappy++;
            tweet.category = 'unhappy';
        }
        else {
            this.categories.neutral++;
            tweet.category = 'neutral';
        }
        this.totalCount++;
        return tweet;
    };
    AppComponent.prototype.value = function (category) {
        if (this.totalCount > 0)
            return Math.floor(this.categories[category] * 100 / this.totalCount);
        return 0;
    };
    AppComponent.prototype.newTracker = function (searchStr) {
        var _this = this;
        console.log(searchStr);
        this.resetCategories();
        this.api.stopStream();
        this.tweets = [];
        this.track = {
            track: searchStr,
            tweet_mode: 'extended'
        };
        this.subscriber = this.api.getTweets(this.track).subscribe(function (newTweet) {
            _this.addNewTweet(newTweet);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var animations_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
var app_routes_1 = __webpack_require__("./src/app/app-routes.ts");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var api_service_1 = __webpack_require__("./src/services/api.service.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var ngx_charts_1 = __webpack_require__("./node_modules/@swimlane/ngx-charts/release/index.js");
var ng_bootstrap_1 = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ngx_charts_1.NgxChartsModule,
                animations_1.BrowserAnimationsModule,
                router_1.RouterModule.forRoot(app_routes_1.APP_ROUTES),
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            providers: [api_service_1.ApiService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/services/api.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs-compat/_esm5/Observable.js");
var io = __webpack_require__("./node_modules/socket.io-client/lib/index.js");
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    ApiService.prototype.getTweets = function (track) {
        var _this = this;
        this.socket = io('/');
        this.Observer = Observable_1.Observable.create(function (observer) {
            _this.socket.emit('new-stream', track);
            _this.socket.on('tweet', function (tweet) {
                observer.next(tweet);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return this.Observer;
    };
    ApiService.prototype.stopStream = function () {
        this.socket.emit('stop-stream');
    };
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map