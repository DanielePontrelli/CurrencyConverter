const select = document.querySelectorAll(".currency"); //assegno la costante select a tutti gli elementi con classe di currency
const number = document.getElementById("number");      //assegno la costante number all'input che dovra' dare l'utente
const output = document.getElementById("output");      //assegno la costante output al risultato (input disabilitato in html)

fetch('https://api.frankfurter.app/currencies') //con fetch mi collego direttamente all'api e prendo in considerazione tutte le monete(/curriencies)
.then((data) => data.json())   //importo le monete in data.json per fare in modo che il programma li rilevi come oggetto
.then((data) => {
    display(data); //assegno la funzione display per mostrarle all'utente
});

function display(data) {
    const entries = Object.entries(data);  //prendo tutte le valute e col ciclo for le inserisco nei due select
    for (var i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]} : ${entries[i][1]}</option>`; //option value"(mostra all'utente la prima moneta rilevata nel fetch)" 
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]} : ${entries[i][1]}</option>`;//nell'option si elencano tutte le altre monete grazie al for (contatore)
    }
}

document.querySelector('button').addEventListener('click', updateValue) //assegno l'evento click alla funzione updateValue e con onchange(in html) faccio selezionare all'utente le valute che vuole convertire
    function updateValue(e) {
        let moneta1 = select[0].value; //prendo il valore della prima selezione e la assegno a moneta1
        let moneta2 = select[1].value; //prendo il valore della seconda selezione e la assegno a moneta 2
        let valore = number.value; //prendo l'input numerico dell'utente e la assegno a valore
        if (moneta1 != moneta2) { //se moneta1 e' diversa da moneta 2 esegui la funzione converti
           converti(moneta1, moneta2, valore);
        } else {
           alert("Scegli una moneta diversa!"); //se no appare l'alert 
        }

       e.preventDefault(); 
    }
    


    function converti(moneta1, moneta2, valore) {
        const host = "api.frankfurter.app";
        fetch(`https://${host}/latest?amount=${valore}&from=${moneta1}&to=${moneta2}`) //con il fetch e le nostre variabili inseriti faccio fare la conversione all'api
        .then((res) => res.json()) //il risultato lo inserisco in res.json per averlo come oggetto
        .then((res) => {
            // console.log(Object.values(res.rates)[0]);
            output.value = Object.values(res.rates)[0]; //e lo mostro come valore dell'input disabilitato
        });
    }
