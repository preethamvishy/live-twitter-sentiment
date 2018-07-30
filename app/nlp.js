var Sentiment = require('sentiment');
var sentiment = new Sentiment();

export default function (obj) {
    let text = obj.text;
    return sentiment.analyze(text)
}
