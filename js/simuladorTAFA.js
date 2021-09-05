const PARTIDO_GANADO = 3;
const PARTIDO_EMPATADO = 1;
const PARTIDO_PERDIDO = 0;
const CANTIDAD_EQUIPOS = 3;
const MESSAGE = "Simularemos el torneo apertura nacional con 3 equipos argentinos.";



const URLGET_EQUIPOS = ["Barcelona,es","Londres,eng","Munich,ale"];
const URLGET01 = "https://api.openweathermap.org/data/2.5/weather?q=";
const URLGET02 = "&APPID=5f5132a91961cf29f9cb6c151187bea3";
let FIRST_TIME_FLAG = true;





// Obtengo las temperaturas (con los iconos) correspondientes 

$(document).ready(function() {
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        URLGET = URLGET01 + URLGET_EQUIPOS[i] + URLGET02;
        $.get(URLGET, function (respuesta, estado) {
            // console.log(estado)
            if(estado === "success"){    
                let response = respuesta;
                // console.log("Porcentaje de nubes:" + response.clouds.all);
                let temperatura= response.main.temp;
                let new_temperatura =  Math.round(temperatura - 273.1);
                // console.log("Temperatura actual:" + new_temperatura);
                let id = "#tempFecha0" + (i + 1);
                let id_icon = "#tempIconFecha0" + (i + 1);
                
                $(id).append(new_temperatura);
           

                if (response.clouds.all >= 80){
                    $(id_icon).append("<img class='club_icon' src='images/rain.png' alt='Lluvioso'>");
                }

                if (response.clouds.all > 30 && response.clouds.all < 80){
                    $(id_icon).append("<img class='club_icon' src='images/cloudy.png' alt='Nublado'></img>");
                }
                if (response.clouds.all <= 30){
                    $(id_icon).append("<img class='club_icon' src='images/sunny.png' alt='Soleado'></img>");
                }
            
            }
            
        })
    }           
})   


function bounceUp(){
    FIRST_TIME_FLAG = false;
    $('#Team01').animate({opacity:'1',fontColor:'red'}, 500, bounceDown);
    var opa = document.getElementById("Team01");
    opa.style.backgroundColor = "rgba(31, 180, 123, 0.781)";
}
function bounceDown(){
    $('#Team01').animate({opacity:'0.4',fontColor:'red'}, 500, bounceUp);
}






//Objeto Equipo - Va hacer referencia a cada equipo que juegue el torneo de fútbol.
class Equipo{
    constructor (){
        this.nombre = "";
        this.partidos_ganados = 0;
        this.partidos_empatados = 0;
        this.partidos_perdidos = 0;
        this.partidos_jugados_fixture = [0,0,0];
        this.partidos_jugados = 0;
        this.goles_favor_fixture = [0,0,0];
        this.goles_favor = 0;
        this.goles_contra_fixture = [0,0,0];
        this.goles_contra = 0;
        this.puntos = 0;
        this.fixture = [0,0,0];
    }

    actualizacion_puntos(){//Esta función nos permitirá actualizar los puntos que tenga cada equipo en cualquier momento que necesitemos.
        this.puntos = this.fixture[0] + this.fixture[1] + this.fixture[2];
        this.goles_favor = this.goles_favor_fixture[0] + this.goles_favor_fixture[1] + this.goles_favor_fixture[2];
        this.goles_contra = this.goles_contra_fixture[0] + this.goles_contra_fixture[1] + this.goles_contra_fixture[2];
        this.partidos_jugados = this.partidos_jugados_fixture[0] + this.partidos_jugados_fixture[1] + this.partidos_jugados_fixture[2];

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
    console.log("Equipos sin ordenar y puntaje anterior");
    console.log(equipos);
    actualizarPuntos();
    
    equipos.sort((a, b) => b.puntos - a.puntos);

    console.log("Equipos ordenados");
    console.log(equipos);

    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        let elementTable = document.getElementById ("pointsTeam0" + (i+1));

        $("#GFTeam0" + (i+1)).first().empty();
        $("#GFTeam0" + (i+1)).append(equipos[i].goles_favor);

        $("#GCTeam0" + (i+1)).first().empty();
        $("#GCTeam0" + (i+1)).append(equipos[i].goles_contra);

        $("#matchsTeam0" + (i+1)).first().empty();
        $("#matchsTeam0" + (i+1)).append(equipos[i].partidos_jugados);
        
        $("#nameTeam0" + (i+1)).first().empty();
        $("#nameTeam0" + (i+1)).append(equipos[i].nombre);

        while (elementTable.firstChild) {
            elementTable.removeChild(elementTable.firstChild);
        }
        let nodoPuntosEquipo = document.createTextNode(equipos[i].puntos);
        elementTable.appendChild(nodoPuntosEquipo);
        // console.log("pointsTeam0" + (i+1));

        $("#pointsTeam0" + (i+1)).animate({  
            opacity:'1',
            fontSize:'4.5vh'
        }, 
        100,            
            function(){       
            });

        $("#pointsTeam0" + (i+1)).animate({  
            opacity:'0.5',
            fontSize:'4vh'
        }, 
            400,            
            function(){       
            });
        
    }  
    
    updateIcons();

    if (FIRST_TIME_FLAG){
        bounceUp();
    }
    
}


let equiposIniciales = {"Barcelona":"<img  class='club_icon' src='images/club_icons/barca.png' alt='Logo del club FC Barcelona'>",
"Bayer Munich":"<img class='club_icon' src='images/club_icons/bayer.png' alt='Logo del club FC Bayer Munich'>",
"Chelsea":"<img class='club_icon' src='images/club_icons/chelsea.png' alt='Logo del club Chelsea'>"};


function updateIcons(){
    $(club_icon01).first().empty();
    $(club_icon01).append(equiposIniciales[equipos[0].nombre]);
    
    $(club_icon02).first().empty();
    $(club_icon02).append(equiposIniciales[equipos[1].nombre]);
  
    $(club_icon03).first().empty();
    $(club_icon03).append(equiposIniciales[equipos[2].nombre]);
    

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

equipos[0].nombre = "Barcelona";
equipos[1].nombre = "Bayer Munich";
equipos[2].nombre = "Chelsea";


// Logica de comparacion Fecha 1 del Fixture
const gfBarcaP1  = document.getElementById("P1-BARCA-GF");
const gfBayerP1  = document.getElementById("P1-BAYER-GF");
gfBarcaP1.addEventListener('change', fecha1Update)
gfBayerP1.addEventListener('change', fecha1Update)


function conseguirIDBarcelona(){
    console.log("que carajos")
    console.log(equipos);
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        console.log(equipos[i].nombre)
        if (equipos[i].nombre==="Barcelona")
        {
            return i;
        }
    }
    }
function conseguirIDBayer(){
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        if (equipos[i].nombre==="Bayer Munich")
        {
            return i;
        }
    }
    }

function conseguirIDChelsea(){
    console.log("que carajos")
    console.log(equipos);
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        if (equipos[i].nombre==="Chelsea")
        {
            return i;
        }
    }
    }


console.log("kakaroto");
console.log(equipos);

function fecha1Update(event){
    console.log(equipos);
    let i_Barca = conseguirIDBarcelona();
    console.log("EL id del barca es " + i_Barca);
    let i_Bayer = conseguirIDBayer();
    console.log("EL id del bayer es " + i_Bayer);

    if (gfBarcaP1.value && gfBayerP1.value){
        if (gfBarcaP1.value>gfBayerP1.value){
            console.log("Gano el barca");
            equipos[i_Barca].fixture[0] = 3;
            equipos[i_Bayer].fixture[0] = 0;
        }
        if (gfBarcaP1.value===gfBayerP1.value){
            console.log("Empataron");
            equipos[i_Barca].fixture[0] = 1;
            equipos[i_Bayer].fixture[0] = 1;
        }
        
        if (gfBarcaP1.value<gfBayerP1.value){
            console.log("Gano el bayer");
            equipos[i_Barca].fixture[0] = 0;
            equipos[i_Bayer].fixture[0] = 3;
        }
        
        equipos[i_Barca].partidos_jugados_fixture[0] = 1;
        equipos[i_Bayer].partidos_jugados_fixture[0] = 1;

        equipos[i_Barca].goles_favor_fixture[0] = parseInt(gfBarcaP1.value);
        equipos[i_Bayer].goles_favor_fixture[0] = parseInt(gfBayerP1.value);
        equipos[i_Barca].goles_contra_fixture[0] = parseInt(gfBayerP1.value);
        equipos[i_Bayer].goles_contra_fixture[0] = parseInt(gfBarcaP1.value);

        mostrarTabla();
        guardarFecha();
    }
}



// Logica de comparacion Fecha 2 del Fixture
const gfChelseaP1  = document.getElementById("P1-CHELSEA-GF");
const gfBarcaP2  = document.getElementById("P2-BARCA-GF");
gfChelseaP1.addEventListener('change', fecha2Update)
gfBarcaP2.addEventListener('change', fecha2Update)

function fecha2Update(event){
    let i_Barca = conseguirIDBarcelona();
    console.log("EL id del barca es " + i_Barca);
    let i_Chelsea = conseguirIDChelsea();
    console.log("EL id del chelsea es " + i_Chelsea);

    if (gfChelseaP1.value && gfBarcaP2.value){
        if (gfChelseaP1.value>gfBarcaP2.value){
            console.log("Gano el chelsea");
            equipos[i_Chelsea].fixture[1] = 3;
            equipos[i_Barca].fixture[1] = 0;
        }
        if (gfChelseaP1.value===gfBarcaP2.value){
            console.log("Empataron");
            equipos[i_Chelsea].fixture[1] = 1;
            equipos[i_Barca].fixture[1] = 1;
        }
        
        if (gfChelseaP1.value<gfBarcaP2.value){
            console.log("Gano el barca");
            equipos[i_Chelsea].fixture[1] = 0;
            equipos[i_Barca].fixture[1] = 3;
        }

        equipos[i_Chelsea].partidos_jugados_fixture[1] = 1;
        equipos[i_Barca].partidos_jugados_fixture[1] = 1;

        equipos[i_Chelsea].goles_favor_fixture[1] = parseInt(gfChelseaP1.value);
        equipos[i_Barca].goles_favor_fixture[1] = parseInt(gfBarcaP2.value);
        equipos[i_Chelsea].goles_contra_fixture[1] = parseInt(gfBarcaP2.value);
        equipos[i_Barca].goles_contra_fixture[1] = parseInt(gfChelseaP1.value);

        mostrarTabla();
        guardarFecha();
    }
}

// Logica de comparacion Fecha 3 del Fixture
const gfBayerP2  = document.getElementById("P2-BAYER-GF");
const gfChelseaP2  = document.getElementById("P2-CHELSEA-GF");
gfBayerP2.addEventListener('change', fecha3Update)
gfChelseaP2.addEventListener('change', fecha3Update)

function fecha3Update(event){
    let i_Bayer = conseguirIDBayer();
    let i_Chelsea = conseguirIDChelsea();
    // Validamos que los 2 valores se hayan completado
    if (gfBayerP2.value && gfChelseaP2.value){

        if (gfBayerP2.value>gfChelseaP2.value){
            console.log("Gano el bayer");
            console.log(equipos[1])
            equipos[i_Bayer].fixture[2] = 3;
            equipos[i_Chelsea].fixture[2] = 0;
            console.log(equipos[1])
        }
        if (gfBayerP2.value===gfChelseaP2.value){
            console.log("Empataron");
            equipos[i_Bayer].fixture[2] = 1;
            equipos[i_Chelsea].fixture[2] = 1;
        }
        
        if (gfBayerP2.value<gfChelseaP2.value){
            console.log("Gano el chelsea");
            equipos[i_Bayer].fixture[2] = 0;
            equipos[i_Chelsea].fixture[2] = 3;
        }
        equipos[i_Bayer].partidos_jugados_fixture[2] = 1;
        equipos[i_Chelsea].partidos_jugados_fixture[2] = 1;

        equipos[i_Bayer].goles_favor_fixture[2] = parseInt(gfBayerP2.value);
        equipos[i_Chelsea].goles_favor_fixture[2] = parseInt(gfChelseaP2.value);

        equipos[i_Bayer].goles_contra_fixture[2] = parseInt(gfChelseaP2.value);
        equipos[i_Chelsea].goles_contra_fixture[2] = parseInt(gfBayerP2.value);

        mostrarTabla();
        guardarFecha();
    }
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
    // console.log(diccionario)

}
