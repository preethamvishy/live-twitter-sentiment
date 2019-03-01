require('dotenv').config();
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
    version: process.env.version,
    iam_apikey: process.env.iam_apikey,
    url: process.env.url
});

export default async function (obj) {
    return new Promise(function (resolve, reject) {
        var toneParams = {
            tone_input: { 'text': obj.text },
            content_type: 'application/json',
            sentences: false
        };
        toneAnalyzer.tone(toneParams, function (err, toneAnalysis) {
            if (err) {
                reject(err);
            }
            else
                resolve(toneAnalysis);
        });
    });
}