const fs = require('fs');
const axios = require('axios');

//API Url Routes
var SummonerByName = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
var MasteryListById = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/';
var TotalMasteryById = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/';





var headers = {
    "Origin": null,
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-c34cf4a7-4fdf-42ce-85e0-2ecd17fbe076",
    "Accept-Language": "en-US,en;q=0.5",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0"
    
}

//Load API KEY from local file
let APIKEY = '';
fs.readFile('./server/API_KEY.txt', (err, data) => {
    if(err){
        throw err; //Most likely that file doesn't exist
    }
    APIKEY = data.toString();
});

//Setup exports for creation
var exports = module.exports = {}

//Called when /api/GetSummoner is posted to
exports.GetSummoner = function(name, cb){
    GetSummoner(name, (player) => {
        player = player.data;
        GetMastery(player, 3, (mastery) => {
            var summoner = {
                SummonerName: player.name,
                IconID: player.profileIconId,
                Level: player.summonerLevel,
                ID: player.id,
                champions: mastery.champions
            };
            cb(summoner);
        });
    });
}


function GetSummoner(name, cb){
    axios.get(SummonerByName + name, {headers:headers})
    .then(res => {
        cb(res);
    })
    .catch(err => {
        console.log(err);
    });
}


function GetMastery(summoner, count, cb){
    axios.get(MasteryListById + summoner.id, {headers:headers})
    .then(res => {
        var championList = res.data.slice(0, count);
        cb({champions: championList});
    })
    .catch(err => {
        console.log(err);
    });
}