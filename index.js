require('dotenv').config()

const { readInput, inquirerMenu, pause, listLocations } = require("./helpers/inquirer");
const Search = require("./models/search");


const main = async () => {

    const searches = new Search();
    let option;

    do {

        option = await inquirerMenu();

        switch (option) {
            case 1:
                // Show message
                const location = await readInput('Ciudad: ');

                // search the location
                const arrayLocations = await searches.getCity(location);
                // console.log(arrayLocations);

                // select location
                const id = await listLocations(arrayLocations);
                if ( id === '0' ) continue;
                
                const selectedLocation = arrayLocations.find( location => location.id === id);
                const { name, lat, lng } = selectedLocation; 
                
                
                // Save in DB
                searches.addToSearchHistory( name );

                // Weather
                const weather = await searches.getWeatherOfLocation(lat, lng);
                const { temp, min, max, description } = weather;

                // show results 
                console.clear();               
                console.log('\n Información \n'.green);
                console.log('Ciudad: ', name.green);
                console.log('Lat: ', lat);
                console.log('Lng: ', lng );
                console.log('Temperatura: ', temp);
                console.log('Mínima: ', min);
                console.log('Máxima: ', max);
                console.log('Como está el clima: ', description);

                break;
            case 2:
                searches.historyCapitalized.forEach( (location, index) => {
                    const idx = `${ index + 1}.`.green;
                    console.log(`${idx} ${location}`);
                });
                break;
        }

        if (option != 0) await pause();

    } while (option != 0)
}


main();