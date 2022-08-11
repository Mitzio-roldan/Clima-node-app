const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
class Busquedas {
    
    patchDb = './files/data.json'
    
    historial = [];

    constructor(){
        //leer archivo db

    }

    async ciudad(lugar = ""){
        
        const instance = axios.create({
            baseURL: 'https://api.mymappi.com/v2/geocoding/direct',
            params: {
                'apikey': process.env.API_MAPS_KEY,
                'q': lugar.toString(),
                'layers': 'locality'
            }
        })
        const resp = await instance.get()
        return resp.data['data'].map(element => ({
          id: uuidv4(),
          nombre: element.display_name,
          lng: element.lon,
          lat: element.lat

        }))
    }

    async tiempo (lugar = {}) {
        
        const instance = axios.create({
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                'lat': lugar.lat,
                'lon': lugar.lng,
                'appid': process.env.API_OPENWEATHER,
                'units': 'metric',
                'lang': 'es'
            }
        })
        const resp = await instance.get()
        
        return {
            desc: resp.data['weather'][0].description,
            min: resp.data['main'].temp_min,
            max: resp.data['main'].temp_max,
            temp: resp.data['main'].temp
        }

        
    }
    agregarHistorial(lugar = ''){

    if (this.historial.includes(lugar.toLocaleLowerCase())) {
        return
    }
    
    this.historial = this.historial.splice(0,5)
    
    this.historial.unshift(lugar.toLocaleLowerCase())        

    }
     guardarDB(){

        fs.writeFileSync(this.patchDb, JSON.stringify(this.historial))

     }
     async leerDB (){    
            if(!fs.existsSync(this.patchDb)){
                return null
            }
            const info = fs.readFileSync(this.patchDb, {encoding: 'utf-8'})
            const data = JSON.parse(info)
            return data
     }


     get historialCapitalizado(){

        return this.historial.map(element => {
            let palabra = element.split(' ');
            palabra = palabra.map(p => p[0].toUpperCase() + p.substring(1))

            return palabra.join(' ')
        })

     }

}


module.exports = Busquedas