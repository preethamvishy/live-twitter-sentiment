export default function (app) {

    app.get('/api/live', function (req, res) {
        res.json({data : 'hi'})
    });

    app.get('*', (req, res) => {
        res.sendFile('./public/dist/index.html')
    });

};