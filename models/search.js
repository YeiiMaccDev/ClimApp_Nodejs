const fs = require('fs');

const axios = require("axios");

class Search {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get historyCapitalized() {
        return this.history.map( location => {
            let words = location.split(' ');
            words = words.map( word => word[0].toUpperCase() + word.substring(1) );
            return words.join(' ');
        });
    }

    async getCity(location = '') {
        try {
            // peticion http         

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ location }.json`,
                params: {
                    'limit': 5,
                    'proximity': 'ip',
                    'language': 'es',
                    'access_token': process.env.MAPBOX_KEY
                }
            });
             
            const resp = await instance.get();
            return resp.data.features.map( location => ({
                id: location.id,
                name: location.place_name,
                lng: location.center[0],
                lat: location.center[1]
            })); // return array locations the city

            

        } catch (error) {
            return []; // return array empty
        }
    }

    async getWeatherOfLocation (lat, lon){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    appid: process.env.OPENWEATHER_KEY,
                    units: 'metric',
                    lang: 'es'
                }
            });

            const resp = await instance.get();
            const {weather, main} = resp.data;

            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp : main.temp
            }

        } catch (error) {
            console.log("Erro consultar clima: ", error)            
        }
    }

    addToSearchHistory (location = '') {
        
        if ( this.history.includes( location.toLocaleLowerCase()) ) {
            return;
        }

        // cut to 6 last searches
        this.history = this.history.splice(0,5); 

        this.history.unshift( location.toLocaleLowerCase() );

        // save in DB
        this.saveDB();
    }

    saveDB() {
        const payload= {
            history: this.history
        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ));
    }

    readDB() {
        if ( !fs.existsSync( this.dbPath )) return;   
        
        const info = fs.readFileSync( this.dbPath, {encoding: 'utf-8'} );

        const data = JSON.parse( info );

        this.history = data.history;

    }

}

module.exports = Search;