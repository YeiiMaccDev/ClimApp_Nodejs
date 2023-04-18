const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: '1. Buscar ciudad'
            },
            {
                value: 2,
                name: '2. Historial'
            },
            {
                value: 0,
                name: '0. Salir'
            },
        ]

    }
];

const inquirerMenu = async () => {
    console.clear();

    const title = `==============================\n   Selecionar una opción   \n============================== \n`;
    console.log(title.green);

    const { option } = await inquirer.prompt(menuOptions);

    return option;
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\n Press ${'ENTER'.green} to continue \n`
        }
    ]

    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Introduzca un valor.'
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listLocations = async( locations = [] ) => {

    const choices = locations.map( (location, i) => {
        const idx = i + 1;
        return {
            value: location.id,
            name: `${idx} ${location.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccionar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listLocations
}