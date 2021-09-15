function valideKey(evt){// Validar que sean numeros los que ingresan
    let code = (evt.which) ? evt.which : evt.keyCode;
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      return true;
    } else{ // other keys.
      return false;
    }
}

// Fecha 1 mostrada al inicio
$(".fecha1Seleccionada").show(1);
$("#fecha1SeleccionadaTexto").animate({opacity:'1',fontSize:'2.3vh'});
$(".fecha2Seleccionada").hide(1);
$("#fecha2SeleccionadaTexto").animate({opacity:'0.7',fontSize:'2vh'});
$(".fecha3Seleccionada").hide(1);
$("#fecha3SeleccionadaTexto").animate({opacity:'0.7'});

// Cuando una fecha se selecciona, las demás se deben ocultar
$("#fecha1SeleccionadaTexto").click(function() 
    {
        $(".fecha1Seleccionada").show(1);
        $("#fecha1SeleccionadaTexto").animate({opacity:'1',fontSize:'2.3vh'});
        $(".fecha2Seleccionada").hide(1);
        $("#fecha2SeleccionadaTexto").animate({opacity:'0.7',fontSize:'2vh'});
        $(".fecha3Seleccionada").hide(1);
        $("#fecha3SeleccionadaTexto").animate({opacity:'0.7',fontSize:'2vh'});
    });

$("#fecha2SeleccionadaTexto").click(function()
    {
        $(".fecha2Seleccionada").show(1);
        $("#fecha2SeleccionadaTexto").animate({opacity:'1',fontSize:'2.3vh'});
        $(".fecha1Seleccionada").hide(1);
        $("#fecha1SeleccionadaTexto").animate({opacity:'0.7',fontSize:'2vh'});
        $(".fecha3Seleccionada").hide(1);
        $("#fecha3SeleccionadaTexto").animate({opacity:'0.7',fontSize:'2vh'});
    });

$("#fecha3SeleccionadaTexto").click(function() 
    {
        $(".fecha3Seleccionada").show(1);
        $("#fecha3SeleccionadaTexto").animate({opacity:'1',fontSize:'2.3vh'});
        $(".fecha1Seleccionada").hide(1);
        $("#fecha1SeleccionadaTexto").animate({opacity:'0.7',fontSize:'2vh'});
        $(".fecha2Seleccionada").hide(1);
        $("#fecha2SeleccionadaTexto").animate({opacity:'0.7',fontSize:'2vh'});
    });    


// Pop up de los estadios cuando hacemos click en "i"
function customAlert(option){
    if (option===1){
        swal({
            title: "CAMP NOU",
            text: "El Estadio de Barcelona es un recinto deportivo propiedad del Fútbol Club Barcelona, ubicado en el distrito de Les Corts de la ciudad de Barcelona, España. Se inauguró el 24 de septiembre de 1957 y su aforo actualmente es de 99 354 espectadores, siendo el estadio con mayor capacidad de Europa y el tercero a nivel mundial.​",
            icon:"images/barca_stadium.png"
          })
    }
    if (option===2){
        swal({
            title: "ALLIANZ ARENA",
            text: "El Allianz Arena es un estadio de fútbol ubicado en el barrio de Fröttmaning, al norte de Múnich, en el estado federado de Baviera, Alemania. Alberga los partidos como local del F. C. Bayern de Múnich de la Bundesliga de Alemania, equipo que previamente disputaba sus partidos de local en el Estadio Olímpico de Múnich. El TSV 1860 Múnich jugó de local en el estadio desde su inauguración en 2005 hasta 2017.",
            icon:"images/bayer_stadium.jpeg"
          })
    }
    if (option===3){
        swal({
            title: "ESTADIO DA LUZ",
            text: "El Estádio da Luz, denominado oficialmente Estádio do Sport Lisboa e Benfica, es un estadio de fútbol ubicado en Lisboa, Portugal. Es propiedad de Sport Lisboa e Benfica, que disputa en él sus partidos como local. El estadio, con capacidad para 64 642 espectadores, se inauguró el 25 de octubre de 2003.",
            icon:"images/benfica_stadium.jpeg"
          })
    }
    if (option===4){
        swal({
            title: "ESTADIO OLIMPICO KIEV",
            text: "El Complejo Olímpico Nacional de Deportes, es un estadio multiusos localizado en Kiev, capital de Ucrania. Con un aforo de 70.050 espectadores, es el segundo estadio más grande de Europa del Este tras el Estadio Luzhniki de Moscú, y está catalogado como estadio de élite por la UEFA.",
            icon:"images/kiev_stadium.jpeg"
          })
    }
}



// Obtengo las temperaturas con los iconos correspondientes 
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


// Inicialización de constantes
const CANTIDAD_EQUIPOS = 4;
const URLGET_EQUIPOS = ["Barcelona,es","Kiev,ukr","Lisboa,por","Munich,ale","Barcelona,es","Lisboa,por"];
const URLGET01 = "https://api.openweathermap.org/data/2.5/weather?q=";
const URLGET02 = "&APPID=5f5132a91961cf29f9cb6c151187bea3";
let FIRST_TIME_FLAG = true;
let FIRST_TIME_FLAG_2 = true;

// Funciones que hacen parpadear a los 2 equipos clasificados (los primeros 2 de la tabla)
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
}


function mostrarTabla(){//Funcion mostrar tabla con equipos
    actualizarPuntos();
    // Ordenar equipos por puntuacion, diferencia de goles y goles a favor (en ese orden)
    equipos.sort( (a, b) => 
        {
        if(a.puntos > b.puntos) {return -1;}
        if(a.puntos < b.puntos) {return 1;}
            if (a.dif_gol > b.dif_gol) {return -1;}
            if (a.dif_gol < b.dif_gol) {return 1;}
                if (a.goles_favor > b.goles_favor) {return -1;}
                if (a.goles_favor < b.goles_favor) {return 1;}
                    return 0;
        });



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
        $("#pointsTeam0" + (i+1)).animate({fontSize:'3.5vh'}, 100,function(){});
        $("#pointsTeam0" + (i+1)).animate({fontSize:'3vh'}, 400,function(){});
    }

    updateIcons();
    if (FIRST_TIME_FLAG){bounceUp();}
    if (FIRST_TIME_FLAG_2){bounceUp2();}
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
    let i_Barca = conseguirIDBARCELONA();
    let i_Bayer = conseguirIDBayer();
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
    let i_Dynamo = conseguirIDDynamo();//console.log("EL id del Dynamo es " + i_Dynamo);
    let i_Benfica = conseguirIDBenfica();
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