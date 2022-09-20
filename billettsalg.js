let solgte = 0
let data = '';

const event = 193640;

const a = 223517;
const b = 223518;
const c = 223504;
const d = 223499;
const e = 223506;

const j = 223520;
const k = 223510;
const l = 223511;

const o = 223516;
const p = 223501;
const q = 223507;
const r = 223508;
const s = 223503;
const t = 223505;
const maakeberget = 223502;

let seksjoner_navn = ['a','b','c','d','e','o','p','q','r','s','t','maakeberget','j','k','l'];
let seksjoner      = [ a,  b,  c,  d,  e,  o,  p,  q,  r,  s,  t,  maakeberget,  j,  k,  l ];

for (let i = 0; i < seksjoner.length; i++) {
    fetch('https://ticketco.events/no/nb/events/' + event + '/seating_arrangement/sections/' + seksjoner[i]).then(res => res.json()).then((data) => {enkeltSeksjon(data,seksjoner_navn[i],i)})
}


let iterasjoner = 0;
function enkeltSeksjon(data,seksjon_navn,i) {
    data = JSON.stringify(data)
    data = data.toString()

    let ledige_seksjon = data.split(',"seats')[0];
    ledige_seksjon = ledige_seksjon.substring(ledige_seksjon.indexOf('"section_remaining_amount":'));
    ledige_seksjon = ledige_seksjon.replace('"section_remaining_amount":','');

    let totalt_seksjon = data.split(',"section_remaining_amount')[0];
    totalt_seksjon = totalt_seksjon.substring(totalt_seksjon.indexOf('"section_amount":'));
    totalt_seksjon = totalt_seksjon.replace('"section_amount":','');

    let solgte_seksjon = totalt_seksjon - ledige_seksjon;

    solgte += solgte_seksjon;
    oversikt[i].push(seksjon_navn)
    oversikt[i].push(solgte_seksjon)
    iterasjoner += 1;
    if (iterasjoner == seksjoner.length) {
        skrivUt()
    }
}

let oversikt = [];
for (let i = 0; i < seksjoner.length; i++) {
    oversikt.push([])
}

function skrivUt() {
    oversikt.sort(sortFunction);
    document.body.innerHTML += '<p><b>' + solgte + '</b></p>'
    for (i = 0; i < seksjoner.length; i++) {
        if (seksjoner[i] == j || seksjoner[i] == k || seksjoner[i] == l) {
            document.body.innerHTML += '<p style="color:red;">' + oversikt[i][0] + ': ' + oversikt[i][1] + '</p>'
        }
        else {
            document.body.innerHTML += '<p>' + oversikt[i][0] + ': ' + oversikt[i][1] + '</p>'
        }
    }
}

function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}