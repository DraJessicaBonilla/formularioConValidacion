export function valida (input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);

    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "Este campo contrasena no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },

    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes ser mayor de edad",
    },

    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros",
    },

    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 y 40 caracteres",
    },

    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres",
    },

    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres",
    }

}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError (tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach( (error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}


function validarNacimiento(input){
const fechaCliente = new Date(input.value);
let mensaje = "";
if (!mayorDeEdad(fechaCliente)){
    mensaje = "Debes ser mayor de edad";
}

input.setCustomValidity(mensaje);

}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate() 
        );
    return diferenciaFechas<= fechaActual
}