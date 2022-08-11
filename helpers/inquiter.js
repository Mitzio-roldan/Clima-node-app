const inquirer = require('inquirer');
require('colors')


const preguntas = [
    {
        type:'list',
        name:'opcion',
        message: '¿Qué desea hacer?',
        choices: [
        {
            value: '1',
            name: '1. Buscar Ciudad'
        },
        {
            value: '2',
            name: '2. Historial'
        },
        {
            value: '0',
            name: '0. Salir'
        }
        
]
    }
]



const inquirer_menu = async() =>{
    console.clear();
    console.log('======================'.blue);
    console.log('Seleccione una opcion'.green);
    console.log('======================\n'.blue); 
    
    
    const {opcion} = await inquirer.prompt(preguntas)
    return opcion
}


const mostrarListadoCheckList = async(tareas = []) =>{

    const choices = tareas.map(tarea => {
        return{
             value : tarea.id,
             name: tarea.desc,
             checked : (tarea.completadoEn) ? true : false
        }
    })
    
    let listado_de_tareas = [
        {
            type:'checkbox',
            name:'ids',
            message: 'Selecciones',
            choices
        }
    ]
    
    console.clear();
    console.log('======================'.blue);
    console.log('Seleccione una opcion'.green);
    console.log('======================\n'.blue); 

    const {ids} = await inquirer.prompt(listado_de_tareas)
    return ids
}








const listadoLugares = async(tareas = []) =>{

    const choices = tareas.map(tarea => {
        return{
             value : tarea.id,
             name: tarea.nombre
        }
    })
    

    let listado_de_tareas = [
        {
            type:'list',
            name:'opcion',
            message: 'Seleccione un lugar',
            choices
        }
    ]
    
    console.clear();
    console.log('======================'.blue);
    console.log('Seleccione una opcion'.green);
    console.log('======================\n'.blue); 

    const {opcion} = await inquirer.prompt(listado_de_tareas)
    return opcion
}
const confirmar = async(message) =>{

    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    
    }]
    const {ok} = await inquirer.prompt(question)
    return ok

}

const pausa = async() =>{

    const key_press = [{
        type: 'input',
        name: 'enter',
        message: 'Presiona ENTER',
    
    }]

    await inquirer.prompt(key_press)
}


const leer_input = async( message )=>{

const question = [
    {
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true
        }
    }
]
const {desc} = await inquirer.prompt(question)
return desc


}


module.exports = {inquirer_menu, pausa, leer_input, listadoLugares, confirmar, mostrarListadoCheckList}