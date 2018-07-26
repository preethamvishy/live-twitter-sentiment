export default function (app) {

    app.post('/api/live', function (req, res) {
        res.json({data : 'hi'})
    });

};