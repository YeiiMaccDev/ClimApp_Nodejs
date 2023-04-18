# ClimApp.
Application to see the weather in any city.  
Search by city using MAPBOX.  
Weather search of the indicated city using OPENWEATHER.  
Displays the main data of the current weather, current temperature, minimum and maximum temperature, how the weather looks like...

## Run Locally

Clone the project

```bash
  git clone https://github.com/YeiiMaccDev/ClimApp_Nodejs.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## APIs used:
This project uses the following APIs:
- **MAPBOX:** For the search and geolocation of cities.
- **OPENWEATHER:** For the search of the weather of the indicated city.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, see .env.example file.

`MAPBOX_KEY`

`OPENWEATHER_KEY`



## Tech Stack

**Server:** Node.js