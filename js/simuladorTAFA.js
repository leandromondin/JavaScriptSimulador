// Inicialización de constantes
const CANTIDAD_EQUIPOS = 4;
const URLGET_EQUIPOS = ["Barcelona,es","Kiev,ukr","Lisboa,por","Munich,ale","Barcelona,es","Lisboa,por"];
const URLGET01 = "https://api.openweathermap.org/data/2.5/weather?q=";
const URLGET02 = "&APPID=5f5132a91961cf29f9cb6c151187bea3";
let FIRST_TIME_FLAG = true;
let FIRST_TIME_FLAG_2 = true;


// Obtengo las temperaturas (con los iconos) correspondientes 
$(document).ready(function() {
    for (let i = 0; i < 6; i++) {
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
    opa.style.backgroundColor = "rgba(31, 180, 123, 0.900)";
}
function bounceDown(){
    $('#Team01').animate({opacity:'0.4',fontColor:'red'}, 500, bounceUp);
}

function bounceUp2(){
    FIRST_TIME_FLAG_2 = false;
    $('#Team02').animate({opacity:'1',fontColor:'red'}, 500, bounceDown2);
    var opa2 = document.getElementById("Team02");
    opa2.style.backgroundColor = "rgba(31, 180, 123, 0.400)";
}
function bounceDown2(){
    $('#Team02').animate({opacity:'0.4',fontColor:'red'}, 500, bounceUp2);
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
        this.dif_gol = 0;
    }

    actualizacion_puntos(){//Esta función nos permitirá actualizar los puntos que tenga cada equipo en cualquier momento que necesitemos.
        this.puntos = this.fixture[0] + this.fixture[1] + this.fixture[2];
        this.goles_favor = this.goles_favor_fixture[0] + this.goles_favor_fixture[1] + this.goles_favor_fixture[2];
        this.goles_contra = this.goles_contra_fixture[0] + this.goles_contra_fixture[1] + this.goles_contra_fixture[2];
        this.partidos_jugados = this.partidos_jugados_fixture[0] + this.partidos_jugados_fixture[1] + this.partidos_jugados_fixture[2];
        this.dif_gol = this.goles_favor - this.goles_contra;

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

        $("#DGTeam0" + (i+1)).first().empty();
        $("#DGTeam0" + (i+1)).append(equipos[i].dif_gol);

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
            fontSize:'3.5vh'
        }, 
        100,            
            function(){       
            });

        $("#pointsTeam0" + (i+1)).animate({  
            opacity:'0.5',
            fontSize:'3vh'
        }, 
            400,            
            function(){       
            });
        
    }  
    
    updateIcons();

    if (FIRST_TIME_FLAG){
        bounceUp();
    }

    if (FIRST_TIME_FLAG_2){
        bounceUp2();
    }
    
}


let equiposIniciales = {"BARCELONA":"<img  class='club_icon' src='images/club_icons/barca.png' alt='Logo del club FC BARCELONA'>",
"BAYER MUNICH":"<img class='club_icon' src='images/club_icons/bayer.png' alt='Logo del club FC BAYER MUNICH'>",
"BENFICA":"<img class='club_icon' src='images/club_icons/benfica.png' alt='Logo del club Benfica'>",
"DYNAMO KYIV":"<img class='club_icon' src='images/club_icons/dynamo.png' alt='Logo del club dynamo'>"};


function updateIcons(){
    $(club_icon01).first().empty();
    $(club_icon01).append(equiposIniciales[equipos[0].nombre]);
    
    $(club_icon02).first().empty();
    $(club_icon02).append(equiposIniciales[equipos[1].nombre]);
  
    $(club_icon03).first().empty();
    $(club_icon03).append(equiposIniciales[equipos[2].nombre]);
    
    $(club_icon04).first().empty();
    $(club_icon04).append(equiposIniciales[equipos[3].nombre]);

}



function actualizarPuntos(){
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        equipos[i].actualizacion_puntos()
   }
}




const equipos = []; //Instancio y creo todos los equipos que necesito como array de equipos (variable global)
for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
    const equipo = new Equipo(); 
    equipos.push(equipo);//Agrego un equipo al array de equipos del torneo.
}

equipos[0].nombre = "BARCELONA";
equipos[1].nombre = "BAYER MUNICH";
equipos[2].nombre = "BENFICA";
equipos[3].nombre = "DYNAMO KYIV";


function conseguirIDBARCELONA(){
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        console.log(equipos[i].nombre)
        if (equipos[i].nombre==="BARCELONA")
        {return i;}}
    }

function conseguirIDBayer(){
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        if (equipos[i].nombre==="BAYER MUNICH")
        {return i;}}
    }

function conseguirIDDynamo(){
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        if (equipos[i].nombre==="DYNAMO KYIV")
        {return i;}}
    }

function conseguirIDBenfica(){
    for (let i = 0; i < CANTIDAD_EQUIPOS; i++) {
        if (equipos[i].nombre==="BENFICA")
        {return i;}}
    }

// Logica de comparacion Fecha 1 -Partido 1 del Fixture
const gfBarcaP1  = document.getElementById("P1-BARCA-GF");
const gfBayerP1  = document.getElementById("P1-BAYER-GF");
gfBarcaP1.addEventListener('change', fecha11Update)
gfBayerP1.addEventListener('change', fecha11Update)
function fecha11Update(event){
    console.log(equipos);
    let i_Barca = conseguirIDBARCELONA();
    console.log("EL id del barca es " + i_Barca);
    let i_Bayer = conseguirIDBayer();
    console.log("EL id del bayer es " + i_Bayer);

    if (gfBarcaP1.value && gfBayerP1.value){
        if (gfBarcaP1.value>gfBayerP1.value){// console.log("Gano el barca");
            equipos[i_Barca].fixture[0] = 3;
            equipos[i_Bayer].fixture[0] = 0;
        }
        if (gfBarcaP1.value===gfBayerP1.value){// console.log("Empataron");
            equipos[i_Barca].fixture[0] = 1;
            equipos[i_Bayer].fixture[0] = 1;
        }
        if (gfBarcaP1.value<gfBayerP1.value){// console.log("Gano el bayer");
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


// Logica de comparacion Fecha 1 -Partido 2 del Fixture
const gfDynamoP1  = document.getElementById("P1-DYNAMO-GF");
const gfBenficaP1  = document.getElementById("P1-BENFICA-GF");
gfDynamoP1.addEventListener('change', fecha12Update)
gfBenficaP1.addEventListener('change', fecha12Update)
function fecha12Update(event){
    let i_Dynamo = conseguirIDDynamo();
    console.log("EL id del Dynamo es " + i_Dynamo);
    let i_Benfica = conseguirIDBenfica();
    console.log("EL id del benfica es " + i_Benfica);

    if (gfDynamoP1.value && gfBenficaP1.value){
        if (gfDynamoP1.value>gfBenficaP1.value){// console.log("Gano el barca");
            equipos[i_Dynamo].fixture[0] = 3;
            equipos[i_Benfica].fixture[0] = 0;
        }
        if (gfDynamoP1.value===gfBenficaP1.value){// console.log("Empataron");
            equipos[i_Dynamo].fixture[0] = 1;
            equipos[i_Benfica].fixture[0] = 1;
        }
        if (gfDynamoP1.value<gfBenficaP1.value){// console.log("Gano el bayer");
            equipos[i_Dynamo].fixture[0] = 0;
            equipos[i_Benfica].fixture[0] = 3;
        }
        equipos[i_Dynamo].partidos_jugados_fixture[0] = 1;
        equipos[i_Benfica].partidos_jugados_fixture[0] = 1;
        equipos[i_Dynamo].goles_favor_fixture[0] = parseInt(gfDynamoP1.value);
        equipos[i_Benfica].goles_favor_fixture[0] = parseInt(gfBenficaP1.value);
        equipos[i_Dynamo].goles_contra_fixture[0] = parseInt(gfBenficaP1.value);
        equipos[i_Benfica].goles_contra_fixture[0] = parseInt(gfDynamoP1.value);
        mostrarTabla();
        guardarFecha();
    }
}



// Logica de comparacion Fecha 2 -Partido 1 del Fixture
const gfBenficaP2  = document.getElementById("P2-BENFICA-GF");
const gfBarcaP2  = document.getElementById("P2-BARCA-GF");
gfBenficaP2.addEventListener('change', fecha21Update)
gfBarcaP2.addEventListener('change', fecha21Update)

function fecha21Update(event){
    let i_Barca = conseguirIDBARCELONA();
    let i_Benfica = conseguirIDBenfica();

    if (gfBenficaP2.value && gfBarcaP2.value){
        if (gfBenficaP2.value>gfBarcaP2.value){
            equipos[i_Benfica].fixture[1] = 3;
            equipos[i_Barca].fixture[1] = 0;
        }
        if (gfBenficaP2.value===gfBarcaP2.value){
            equipos[i_Benfica].fixture[1] = 1;
            equipos[i_Barca].fixture[1] = 1;
        }
        
        if (gfBenficaP2.value<gfBarcaP2.value){
            equipos[i_Benfica].fixture[1] = 0;
            equipos[i_Barca].fixture[1] = 3;
        }
        equipos[i_Benfica].partidos_jugados_fixture[1] = 1;
        equipos[i_Barca].partidos_jugados_fixture[1] = 1;
        equipos[i_Benfica].goles_favor_fixture[1] = parseInt(gfBenficaP2.value);
        equipos[i_Barca].goles_favor_fixture[1] = parseInt(gfBarcaP2.value);
        equipos[i_Benfica].goles_contra_fixture[1] = parseInt(gfBarcaP2.value);
        equipos[i_Barca].goles_contra_fixture[1] = parseInt(gfBenficaP2.value);
        mostrarTabla();
        guardarFecha();
    }
}


// Logica de comparacion Fecha 2 -Partido 2 del Fixture
const gfBayerP2  = document.getElementById("P2-BAYER-GF");
const gfDynamoP2  = document.getElementById("P2-DYNAMO-GF");
gfBayerP2.addEventListener('change', fecha22Update)
gfDynamoP2.addEventListener('change', fecha22Update)

function fecha22Update(event){
    let i_Bayer = conseguirIDBayer();
    let i_Dynamo = conseguirIDDynamo();

    if (gfBayerP2.value && gfDynamoP2.value){
        if (gfBayerP2.value>gfDynamoP2.value){
            equipos[i_Bayer].fixture[1] = 3;
            equipos[i_Dynamo].fixture[1] = 0;
        }
        if (gfBayerP2.value===gfDynamoP2.value){
            equipos[i_Bayer].fixture[1] = 1;
            equipos[i_Dynamo].fixture[1] = 1;
        }
        
        if (gfBayerP2.value<gfDynamoP2.value){
            equipos[i_Bayer].fixture[1] = 0;
            equipos[i_Dynamo].fixture[1] = 3;
        }
        equipos[i_Bayer].partidos_jugados_fixture[1] = 1;
        equipos[i_Dynamo].partidos_jugados_fixture[1] = 1;
        equipos[i_Bayer].goles_favor_fixture[1] = parseInt(gfBayerP2.value);
        equipos[i_Dynamo].goles_favor_fixture[1] = parseInt(gfDynamoP2.value);
        equipos[i_Bayer].goles_contra_fixture[1] = parseInt(gfDynamoP2.value);
        equipos[i_Dynamo].goles_contra_fixture[1] = parseInt(gfBayerP2.value);
        mostrarTabla();
        guardarFecha();
    }
}


// Logica de comparacion Fecha 3 -Partido 1 del Fixture
const gfBarcaP3  = document.getElementById("P3-BARCA-GF");
const gfDynamoP3  = document.getElementById("P3-DYNAMO-GF");
gfBarcaP3.addEventListener('change', fecha31Update)
gfDynamoP3.addEventListener('change', fecha31Update)

function fecha31Update(event){
    let i_Barca = conseguirIDBARCELONA();
    let i_Dynamo = conseguirIDDynamo();
    // Validamos que los 2 valores se hayan completado
    if (gfBarcaP3.value && gfDynamoP3.value){

        if (gfBarcaP3.value>gfDynamoP3.value){
            equipos[i_Barca].fixture[2] = 3;
            equipos[i_Dynamo].fixture[2] = 0;
        }
        if (gfBarcaP3.value===gfDynamoP3.value){
            equipos[i_Barca].fixture[2] = 1;
            equipos[i_Dynamo].fixture[2] = 1;
        }
        
        if (gfBarcaP3.value<gfDynamoP3.value){
            equipos[i_Barca].fixture[2] = 0;
            equipos[i_Dynamo].fixture[2] = 3;
        }
        equipos[i_Barca].partidos_jugados_fixture[2] = 1;
        equipos[i_Dynamo].partidos_jugados_fixture[2] = 1;
        console.log(equipos);

        equipos[i_Barca].goles_favor_fixture[2] = parseInt(gfBarcaP3.value);
        equipos[i_Dynamo].goles_favor_fixture[2] = parseInt(gfDynamoP3.value);

        equipos[i_Barca].goles_contra_fixture[2] = parseInt(gfDynamoP3.value);
        equipos[i_Dynamo].goles_contra_fixture[2] = parseInt(gfBarcaP3.value);

        mostrarTabla();
        guardarFecha();
    }
}

// Logica de comparacion Fecha 3 -Partido 2 del Fixture
const gfBenficaP3  = document.getElementById("P3-BENFICA-GF");
const gfBayerP3  = document.getElementById("P3-BAYER-GF");
gfBenficaP3.addEventListener('change', fecha32Update)
gfBayerP3.addEventListener('change', fecha32Update)

function fecha32Update(event){
    let i_Benfica = conseguirIDBenfica();
    let i_Bayer = conseguirIDBayer();
    // Validamos que los 2 valores se hayan completado
    if (gfBenficaP3.value && gfBayerP3.value){

        if (gfBenficaP3.value>gfBayerP3.value){
            equipos[i_Benfica].fixture[2] = 3;
            equipos[i_Bayer].fixture[2] = 0;
        }
        if (gfBenficaP3.value===gfBayerP3.value){
            equipos[i_Benfica].fixture[2] = 1;
            equipos[i_Bayer].fixture[2] = 1;
        }
        
        if (gfBenficaP3.value<gfBayerP3.value){
            equipos[i_Benfica].fixture[2] = 0;
            equipos[i_Bayer].fixture[2] = 3;
        }
        equipos[i_Benfica].partidos_jugados_fixture[2] = 1;
        equipos[i_Bayer].partidos_jugados_fixture[2] = 1;

        equipos[i_Benfica].goles_favor_fixture[2] = parseInt(gfBenficaP3.value);
        equipos[i_Bayer].goles_favor_fixture[2] = parseInt(gfBayerP3.value);

        equipos[i_Benfica].goles_contra_fixture[2] = parseInt(gfBayerP3.value);
        equipos[i_Bayer].goles_contra_fixture[2] = parseInt(gfBenficaP3.value);

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
    let ahora = Date.now();
    let now = (new Date(ahora)).toUTCString();

    let fechaEnPantalla = document.getElementById ("ultimaModifPantalla");
    
    while (fechaEnPantalla.firstChild) {
        fechaEnPantalla.removeChild(fechaEnPantalla.firstChild);
    }
    let nodofechaEnPantalla = document.createTextNode(now);
    fechaEnPantalla.appendChild(nodofechaEnPantalla);
 

}