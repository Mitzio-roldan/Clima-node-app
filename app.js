const {inquirer_menu, leer_input, pausa, listadoLugares} = require('./helpers/inquiter')
const Busquedas = require('./models/busquedas')
require('dotenv').config()
require('Colors')

const main = async () => {
    
    const busquedas = new Busquedas()
    const data = await busquedas.leerDB()
    
    if(data){
        data.forEach(Element =>{
            console.log(Element);
            busquedas.historial.push(Element)
        })
    }

    let opt
    do{
        opt = await inquirer_menu()
        
        switch (opt) {
            case '1':
            // Mostrar mensaje
            const termino = await leer_input('Ciudad') 
            const lugar = await busquedas.ciudad(termino);
            const id =  await listadoLugares(lugar)
            const lugarSelect = lugar.find(e => e.id === id);
            const tiempo = await busquedas.tiempo(lugarSelect)
            
            // Buscar lugar
            console.log('Informacion de la ciudad:');
            console.log('Ciudad:', lugarSelect.nombre);
            console.log('Lat:', lugarSelect.lat);
            console.log('Lnt:', lugarSelect.lng);
            console.log('Temperatura:', tiempo.temp);
            console.log('Minima:', tiempo.min);
            console.log('Maxima:', tiempo.max);
            console.log('Descripcion:', tiempo.desc);
            // Seleccionar Lugar

            //clima
            
            // resultados
            await busquedas.agregarHistorial(lugarSelect.nombre)
            await busquedas.guardarDB()
            break;
            
            
            
            
            case '2':
                
                busquedas.historialCapitalizado.forEach(Element =>{
                    console.log(Element);
                })
            
                break;
            
            
        }
        await pausa()
        
    }while(opt !== '0')


}
main()