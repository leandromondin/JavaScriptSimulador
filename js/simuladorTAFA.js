const PARTIDO_GANADO = 3;
const PARTIDO_EMPATADO = 1;
const PARTIDO_PERDIDO = 0;
const CANTIDAD_EQUIPOS = 3;
const MESSAGE = "Simularemos el torneo apertura nacional con 3 equipos argentinos.";



//Objeto Equipo - Va hacer referencia a cada equipo que juegue el torneo de fútbol.
class Equipo{
    constructor (){
        this.nombre = "";
        this.partidos_ganados = 0;
        this.partidos_empatados = 0;
        this.partidos_perdidos = 0;
        this.goles_favor = 0;
        this.goles_contra = 0;
        this.puntos = 0;
    }

    actualizacion_puntos(){//Esta función nos permitirá actualizar los puntos que tenga cada equipo en cualquier momento que necesitemos.
        this.puntos = (this.partidos_ganados*PARTIDO_GANADO) + (this.partidos_empatados*PARTIDO_EMPATADO) + (this.partidos_perdidos*PARTIDO_PERDIDO);
    }
    gano_partido(){//Este metodo nos permitirá sumar un partido ganado.
        this.partidos_ganados++;
        actualizacion_puntos()
    }   
    empato_partido(){//Este metodo nos permitirá sumar un partido empatado.
        this.partidos_empatados++;
        actualizacion_puntos()
    }

}

function validar_nombre_equipo(i){//Para validar que solo sean los nombres de equipos argentinos
    let flag=0;
    while(flag==0){
        let nombre_equipo = prompt('Ingrese equipo numero ' + i +".\n (opciones disponibles > Racing | Boca | River)");
        if(isNaN(nombre_equipo) && nombre_equipo != null && nombre_equipo != "" && (nombre_equipo.toLowerCase() =='racing'||nombre_equipo.toLowerCase() =='boca'||nombre_equipo.toLowerCase() =='river')){
            return nombre_equipo;
            }
        else{
            alert('Equipo ingresado invalido.');
            continue;
        }
    }
}



function mostrarTabla(){//Funcion mostrar tabla con equipos
    equipos.sort((a, b) => b.puntos - a.puntos);
    tabla = tabla = "|      Equipo      |      Puntos      \n\n" 
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        tabla = tabla + "|      " + equipos[i].nombre + "      |      " + equipos[i].puntos + "\n";
    }
    alert(tabla);
}


//Ingreso victorias, empates y derrotas de todos los equipos.
function ingresarVictorias() {
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        equipos[i].partidos_ganados = prompt("Ingresar victorias del equipo " + equipos[i].nombre + ": ");
   }
}

function ingresarEmpates() {
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        equipos[i].partidos_empatados = prompt("Ingresar partidos empatados del equipo " + equipos[i].nombre + ": ");
   }
}

function ingresarPerdidos(teams) {
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        equipos[i].partidos_perdidos = prompt("Ingresar partidos perdidos del equipo " + equipos[i].nombre + ": ");
   }
}


function actualizarPuntos(){
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        equipos[i].actualizacion_puntos()
   }
}

//Ordena el array y decide el campeon
function decidirCampeon(){
    equipos.sort((a, b) => b.puntos - a.puntos);
    alert("El equipo campeon es: " + equipos[0].nombre);
 }



function ingreso_equipo(){
    alert(MESSAGE);
    for (let i = 1; i <= CANTIDAD_EQUIPOS; i++) {
        let nombre_equipo = validar_nombre_equipo(i)
        equipos[i-1].nombre=nombre_equipo;//Agrego un equipo al array de equipos del torneo.
    }
}



const equipos = []; //Instancio y creo todos los equipos que necesito como array de equipos (variable global)
for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
    const equipo = new Equipo(); 
    equipos.push(equipo);//Agrego un equipo al array de equipos del torneo.
}

