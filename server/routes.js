const lookup = require('./leagueAPI.js');

module.exports.registerPaths = function(app){

    //Summoner lookup
    app.post('/api/GetSummoner', (req, res) => {
        lookup.GetSummoner(req.body.SummonerName, (data) => {
            console.log(data);
        });
    });

    //Mastery Only Lookup
    app.post('/api/GetMastery', (req, res) => {
        console.log(req.body);
    });
    


}