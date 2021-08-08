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
        this.fixture = [0,0,0];
    }

    actualizacion_puntos(){//Esta función nos permitirá actualizar los puntos que tenga cada equipo en cualquier momento que necesitemos.
        this.puntos = this.fixture[0] + this.fixture[1] + this.fixture[2];
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
    actualizarPuntos()
    // equipos.sort((a, b) => b.puntos - a.puntos);
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        let elementTable = document.getElementById ("pointsTeam0" + (i+1));

        while (elementTable.firstChild) {
            elementTable.removeChild(elementTable.firstChild);
        }
        let nodoPuntosEquipo = document.createTextNode(equipos[i].puntos)
        elementTable.appendChild(nodoPuntosEquipo)
        
        
    }  
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
        let elementTable = document.getElementById ("nameTeam0" + i);
        let NodoNombreEquipo = document.createTextNode(nombre_equipo)
        elementTable.appendChild(NodoNombreEquipo)
    }
}


const equipos = []; //Instancio y creo todos los equipos que necesito como array de equipos (variable global)
for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
    const equipo = new Equipo(); 
    equipos.push(equipo);//Agrego un equipo al array de equipos del torneo.
}


// Logica de comparacion Fecha 1 del Fixture
const gfBarcaP1  = document.getElementById("P1-BARCA-GF");
const gfBayerP1  = document.getElementById("P1-BAYER-GF");
gfBarcaP1.addEventListener('change', fecha1Update)
gfBayerP1.addEventListener('change', fecha1Update)

function fecha1Update(event){
    if (gfBarcaP1.value>gfBayerP1.value){
        console.log("Gano el barca");
        equipos[0].fixture[0] = 3;
        equipos[1].fixture[0] = 0;
    }
    if (gfBarcaP1.value===gfBayerP1.value){
        console.log("Empataron");
        equipos[0].fixture[0] = 1;
        equipos[1].fixture[0] = 1;
    }
    
    if (gfBarcaP1.value<gfBayerP1.value){
        console.log("Gano el bayer");
        equipos[0].fixture[0] = 0;
        equipos[1].fixture[0] = 3;
    }
    actualizarPuntos()
    mostrarTabla();
    guardarFecha();
}



// Logica de comparacion Fecha 2 del Fixture
const gfChelseaP1  = document.getElementById("P1-CHELSEA-GF");
const gfBarcaP2  = document.getElementById("P2-BARCA-GF");
gfChelseaP1.addEventListener('change', fecha2Update)
gfBarcaP2.addEventListener('change', fecha2Update)

function fecha2Update(event){
    if (gfChelseaP1.value>gfBarcaP2.value){
        console.log("Gano el chelsea");
        equipos[2].fixture[1] = 3;
        equipos[0].fixture[1] = 0;
    }
    if (gfChelseaP1.value===gfBarcaP2.value){
        console.log("Empataron");
        equipos[2].fixture[1] = 1;
        equipos[0].fixture[1] = 1;
    }
    
    if (gfChelseaP1.value<gfBarcaP2.value){
        console.log("Gano el barca");
        equipos[2].fixture[1] = 0;
        equipos[0].fixture[1] = 3;
    }
    actualizarPuntos()
    mostrarTabla();
    guardarFecha();
}

// Logica de comparacion Fecha 3 del Fixture
const gfBayerP2  = document.getElementById("P2-BAYER-GF");
const gfChelseaP2  = document.getElementById("P2-CHELSEA-GF");
gfBayerP2.addEventListener('change', fecha3Update)
gfChelseaP2.addEventListener('change', fecha3Update)

function fecha3Update(event){
    if (gfBayerP2.value>gfChelseaP2.value){
        console.log("Gano el bayer");
        console.log(equipos[1])
        equipos[1].fixture[2] = 3;
        equipos[2].fixture[2] = 0;
        console.log(equipos[1])
    }
    if (gfBayerP2.value===gfChelseaP2.value){
        console.log("Empataron");
        equipos[1].fixture[2] = 1;
        equipos[2].fixture[2] = 1;
    }
    
    if (gfBayerP2.value<gfChelseaP2.value){
        console.log("Gano el chelsea");
        equipos[1].fixture[2] = 0;
        equipos[2].fixture[2] = 3;
    }
    actualizarPuntos()
    mostrarTabla();
    guardarFecha();
}



function mostrarUltimaModificacionEnPantalla(){
    let aux = JSON.parse(localStorage.getItem("Administrador"))["hora"];
    let fechaEnPantalla = document.getElementById ("ultimaModifPantalla");
    while (fechaEnPantalla.firstChild) {
        fechaEnPantalla.removeChild(fechaEnPantalla.firstChild);
    }
    let nodofechaEnPantalla = document.createTextNode(aux);
    fechaEnPantalla.appendChild(nodofechaEnPantalla);
}



function guardarFecha(){
    const tiempoTranscurrido = Date.now();
    const hoy = (new Date(tiempoTranscurrido)).toUTCString();
    diccionario= {"usuario":"Administrador","hora":hoy};
    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    guardarLocal(diccionario.usuario, JSON.stringify(diccionario));
    console.log(diccionario)

}