/* Deffinerer variablene for solgte på stadion og json data fra seksjonene */
let solgte = 0;
let kapasitet = 0;
let data = '';
let f = 0;

/* Deffinerer variablene for print-dataen (oversikt) */
let oversikt = [];
let iterasjoner = 0;
const kamper = [
    ['Bodø/Glimt',188269,188271,188273,188274,188275,188276,188277,188279,188280,188281,188282,188283,188286,188287,188288],
    ['FKH',193639,193640],
    ['Jerv',224198,226166,226167],
    ['KBK',219441],
    ['LSK',194409,194410],
    ['Molde',222592,172438,172439,225245,222593,224278],
    ['Odd',190208],
    ['RBK',224388,219041,220406,220997,221065],
    ['Sandefjord',175224],
    ['Sarpsborg',174890,174891,174893],
    ['Strømsgodset',225217],
    ['Tromsø',190898,190899],
    ['Viking',223382,215906],
    ['Vålerenga',194301,194302,194303],

    ['RBK Kvinner',222885],
    ['Stabæk Kvinner',223569,214348],

    ['Brann',193994,193995,193996],
    ['Bryne',222417,222418,222419],
    ['Kongsvinger',225092],
    ['KFUM Oslo',225179],
    ['Mjøndalen',224400],
    ['Ranheim',222795,222796,222797],
    ['Sandnes Ulf',212077,212078],
    ['Stabæk',193941,193942,193944],
    ['Start',224985],
    
    ['Arendal',181000,181001],
    
    ['Viking Kvinner',225699],
    
    ['Strømsgodset Kvinner',209538],

    ['Kilmarnock',217917,217918,223829]
]
const bortefelt = [
    ['Felt-C'],
    ['J','K','L'],
    ['Felt-G'],
    ['KBBL-B-BORTE','KBBL-A-BORTE','KBBL-C','KBBL-D','KBBL-E','KBBL-STÅPLASSER'], /* C,D,E og ståplass kun mot RBK */
    ['Felt-W','Felt-V','Felt-U'],
    ['ISTAD - K Nedre','ISTAD - K Øvre'],
    ['Felt-R1','Felt-R2','Felt-S1','Felt-S2'],
    ['FELT-SB'],
    ['N','M'],
    ['Felt-D','HCP-D'],
    ['Felt-S Ståplasser','Felt-S Sitteplass'],
    ['TRIBUNE VEST Felt H - Bortesupport','TRIBUNE SØR'],
    ['E-Away'],
    ['201/202'],

    ['Felt-5',],
    ['201'],

    ['FJORDKRAFT Felt A','FJORDKRAFT Felt B'],
    ['Felt T'],
    ['STÅPLASSER BORTESUPPORTER'],
    [],
    ['Felt-E','Felt-F','Felt-G'],
    ['EA'],
    ['Bortesupporterfelt','Felt-I','Felt-H'],
    ['307','308','309','309-HC'],
    ['Felt-I1'],
    
    ['Felt R-STÅPLASSER'],
    
    [],
    
    [],

    ['Chadwick Stand - Block 2','Chadwick Stand - Block 3','Chadwick Stand - Block 4','Chadwick Stand - Block 5']
]

for (i = 0; i < kamper.length; i++) {
    if (i == 14 || i == 16 || i == 25 || i == 26 || i == 27 || i == 28) {
        document.getElementById('knapper').innerHTML += '<br><br>';
    }
    let btn = document.createElement("button");
    btn.innerHTML = kamper[i][0];
    btn.id = kamper[i][0];
    btn.class = "kamper";
    btn.setAttribute("onClick", " generer_kalender(this.id)");
    document.getElementById('knapper').appendChild(btn);
}

function generer_kalender(klubb) {
    document.getElementById('innhold').innerHTML = "";
    document.getElementById('knapper').innerHTML = "";
    document.getElementById('knapper').innerHTML += '<h3 style="backgroundcolor:red;">Verdiene er ikke nødvendigvis korrekt. Stol derfor ikke blindt på tallene.</h3>';
    if (klubb == 'Molde') {
        document.getElementById('knapper').innerHTML += '<p style="backgroundcolor:red;">Moldes billettsalg til Eliteseriekamper er omtrent 1350 billetter for høyt på denne nettsiden i forhold til det faktiske tallet. Trekk derfor fra.</p>';
    } else {
        document.getElementById('knapper').innerHTML += '<p style="backgroundcolor:red;">Har du oppdaget at en klubbs totalt antall solgte billetter avviker fra det faktiske antallet til en kamp?<br>I så fall vil avviket sannsynligvis ikke forandre seg til neste kamp.</p>';
    }
    document.getElementById('knapper').innerHTML += '<p style="backgroundcolor:red;">Mangler en kamp eller to? Kontakt meg på <a class="twitter_link" href="https://twitter.com/fotcalc" target="_blank">twitter</a></p>';
    for (h = 0; h < kamper.length; h++) {
        if (kamper[h][0] == klubb) {
            let btn = document.createElement("button");
            btn.innerHTML = 'Tilbake';
            btn.id = 'tilbake';
            btn.setAttribute("onClick", " location.reload();");
            document.getElementById('knapper').appendChild(btn);
            document.getElementById('knapper').innerHTML += '<br><br>'
            /* Loopen må være der av en merkelig grunn */
            for (p = 0; p < 1; p++) {}
            var request = makeHttpObject();
            request.open("GET", 'https://ticketco.events/no/nb/events/' + kamper[h][p] + '/seating_arrangement/', true);
            request.send(null);
            var kamptittel = "";
            f = h;
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    kamptittel = (request.responseText)
                    kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                    lagKampProgram1(kamptittel,(kamper[f][p]),(kamper[f][p+1]),(kamper[f][p+2]),(kamper[f][p+3]),(kamper[f][p+4]),(kamper[f][p+5]),(kamper[f][p+6]),(kamper[f][p+7]),(kamper[f][p+8]),(kamper[f][p+9]),(kamper[f][p+10]),(kamper[f][p+11]),(kamper[f][p+12]),(kamper[f][p+13]),(kamper[f][p+14]),f)
                }
            };
        }
    }
}


function lagKampProgram1(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15,f) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id;
    btn.className = "kamper";
    btn.setAttribute("onClick", " hentHTML(this.id,this.innerHTML)");
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_2) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_2 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram2(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram2(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_2;
    btn.className = "kamper";
    btn.setAttribute("onClick", " hentHTML(this.id,this.innerHTML)");
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_3) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_3 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram3(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram3(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_3;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_4) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_4 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram4(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram4(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_4;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_5) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_5 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram5(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram5(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_5;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_6) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_6 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram6(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram6(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_6;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_7) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_7 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram7(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram7(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_7;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_8) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_8 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram8(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram8(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_8;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_9) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_9 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram9(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram9(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_9;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_10) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_10 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram10(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram10(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_10;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_11) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_11 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram11(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram11(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_11;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_12) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_12 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram12(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram12(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_12;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_13) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_13 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram13(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram13(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_13;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_14) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_14 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram14(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram14(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_14;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
    if (kamp_id_15) {
        var request = makeHttpObject();
        request.open("GET", 'https://ticketco.events/no/nb/events/' + kamp_id_15 + '/seating_arrangement/', true);
        request.send(null);
        var kamptittel = "";
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                kamptittel = (request.responseText)
                kamptittel = (kamptittel.substring((getPosition(kamptittel, '<h1>', 1)+4),(getPosition(kamptittel, '</h1>', 1)-0)));
                lagKampProgram15(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15)
            }
        };
    }
}
function lagKampProgram15(kamptittel,kamp_id,kamp_id_2,kamp_id_3,kamp_id_4,kamp_id_5,kamp_id_6,kamp_id_7,kamp_id_8,kamp_id_9,kamp_id_10,kamp_id_11,kamp_id_12,kamp_id_13,kamp_id_14,kamp_id_15) {
    btn = document.createElement("button");
    btn.innerHTML = kamptittel;
    btn.id = kamp_id_15;
    btn.className = "kamper";
    btn.setAttribute("onClick", ' hentHTML(this.id,this.innerHTML)');
    document.getElementById('knapper').appendChild(btn);
}

    
let seksjoner_navn = [];
let seksjoner      = [];
let totalt_stadion = 0;

let iterasjoner_oversikt = 0;

/* Funksjon som henter HTML-en fra billettsiden til klubben */
function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}
  
    throw new Error("Could not create HTTP request object.");
}
  
/* Henter HTML-en fra billettsiden til klubben */

function hentHTML(event,kamptittel) {
    kapasitet = 0;
    let elements = document.getElementsByClassName("kamper");
    for(let i = 0; i < elements.length; i++) {
        document.getElementById(elements[i].id).disabled = true;
    }

    document.getElementById('innhold').innerHTML = "";
    var request = makeHttpObject();
    request.open("GET", 'https://ticketco.events/no/nb/events/' + event + '/seating_arrangement/', true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            /* Tar kun vare på den delen av HTML-en som er relevant */
            seksjoner_json = (request.responseText).split('<g id="text">')[0];
            seksjoner_json = seksjoner_json.substring(seksjoner_json.indexOf('sections')-10);
            if (seksjoner_json.includes('xlink:title="lawn"> <g id="BANE"')) {
                seksjoner_json = seksjoner_json.substring(seksjoner_json.indexOf('<a xlink:href="sections')-10);
            }
            let seksjon_n = 0;
            seksjoner = [];
            seksjoner_navn = [];
            /* Tar vare på seksjonsnavn og id */
            while ((seksjoner_json.substring((getPosition(seksjoner_json, 'section', seksjon_n+1)+9),(getPosition(seksjoner_json, 'section', seksjon_n+1)+15))) != "") {
                let seksjon_json = (seksjoner_json.substring((getPosition(seksjoner_json, 'section', seksjon_n+1)+9),(getPosition(seksjoner_json, 'section', seksjon_n+1)+15)));
                let seksjon_navn_json = ""
                /*==================================================================================*/
                /* Vålerenga har en spesiell rekkefølge på sine atributter. Derav "if-setningen" */
                if (seksjoner_json.includes('tc:role="Section" fill') || seksjoner_json.includes('" xlink:title="s - hovedtribune"> <path tc:name="S')) {
                    seksjon_navn_json = (seksjoner_json.substring((getPosition(seksjoner_json, 'tc:name="', seksjon_n+1)+9),(getPosition(seksjoner_json, '" tc:role=', seksjon_n+1))));
                } else if (seksjoner_json.includes('KJERNEN" fill="')) {
                    seksjon_navn_json = (seksjoner_json.substring((getPosition(seksjoner_json, 'xlink:title="', seksjon_n+1)+13),(getPosition(seksjoner_json, '"> <', seksjon_n+1)))).toUpperCase();
                } else if (seksjoner_json.includes('Felt-S-Sitteplass') || seksjoner_json.includes('xlink:title="felt g-ståplasser"')) {
                    seksjon_navn_json = (seksjoner_json.substring((getPosition(seksjoner_json, 'tc:name="', seksjon_n+1)+9),(getPosition(seksjoner_json, '" tc:role=', seksjon_n+1))));
                } else {
                    seksjon_navn_json = (seksjoner_json.substring((getPosition(seksjoner_json, 'tc:name="', seksjon_n+1)+9),(getPosition(seksjoner_json, '" fill=', seksjon_n+1))));
                }
                /* Lillestrøm og Sarpsborg fiks HCP felt */
                if (seksjon_navn_json.includes('<path fill="') || seksjon_navn_json.includes('" fill="#')) {
                    if (!seksjon_navn_json.includes('FJORDKRAFT') && !seksjon_navn_json.includes('SPV') && !seksjon_navn_json.includes('BOB') && !seksjon_navn_json.includes('FRYDENBØ') && !seksjon_navn_json.includes('STORE STÅ') && !seksjon_navn_json.includes('VIP') && !seksjon_navn_json.includes('brannstuen') && !seksjon_navn_json.includes('brannbørsen')) {
                        if (seksjon_navn_json.substring(0,5) == 'HCP">') {
                            seksjon_navn_json = (seksjon_navn_json.substring(0,3));
                        } else {
                            seksjon_navn_json = (seksjon_navn_json.substring(0,5));
                        }
                    } else if (seksjon_navn_json.substring(0,17) == ('FJORDKRAFT Felt A')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,17));
                    } else if (seksjon_navn_json.substring(0,19) == ('SPV F - Brannbørsen')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,19));
                    } else if (seksjon_navn_json.substring(0,21) == ('FRYDENBØ Felt A Nedre')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,21));
                    } else if (seksjon_navn_json.substring(0,20) == ('FRYDENBØ Felt D Øvre')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,20));
                    } else if (seksjon_navn_json.substring(0,21) == ('FRYDENBØ D - Bataljon')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,23));
                    } else if (seksjon_navn_json.substring(0,19) == ('SPV E - Brannbørsen')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,19));
                    } else if (seksjon_navn_json.substring(0,18) == ('SPV D - Brannstuen')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,18));
                    } else if (seksjon_navn_json.substring(0,10) == ('BOB B - Kr')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,20));
                    } else if (seksjon_navn_json.includes('BOB Felt B') || seksjon_navn_json.includes('BOB Felt D')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,10));
                    } else if (seksjon_navn_json.includes('SPV Brannstuen Pre')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,20));
                    } else if (seksjon_navn_json.includes('SPV A - Br') || seksjon_navn_json.includes('SPV B - Br') || seksjon_navn_json.includes('SPV D - Br')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,18));
                    } else if (seksjon_navn_json.includes('SPV F - Br')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,19));
                    } else if (seksjon_navn_json.includes('BOB - Rull')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,15));
                    } else if (seksjon_navn_json.includes('SPV Brannstuen')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,20));
                    } else if (seksjon_navn_json.includes('SPV')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,10));
                    } else if (seksjon_navn_json.includes('FJORDKRAFT - Rull')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,22));
                    } else if (seksjon_navn_json.includes('BOB F')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,10));
                    } else if (seksjon_navn_json.includes('BOB B')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,20));
                    } else if (seksjon_navn_json.includes('VIP')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,5));
                    } else if (seksjon_navn_json.includes('STORE STÅ')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,9));
                    } else if (seksjon_navn_json.includes('FJORDKRAFT Felt')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,17));
                    } else if (seksjon_navn_json.includes('Brannbørsen')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,19));
                    } else if (seksjon_navn_json.includes('brannstuen')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,18));
                    } else if (seksjon_navn_json.includes('FRYDENBØ Felt') && seksjon_navn_json.includes('Nedre')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,21));
                    } else if (seksjon_navn_json.includes('FRYDENBØ Felt') && seksjon_navn_json.includes('Øvre')) {
                        seksjon_navn_json = (seksjon_navn_json.substring(0,20));
                    }
                }
                /*=================================================================================*/
                seksjoner_navn.push(seksjon_navn_json)
                seksjoner.push(seksjon_json)
                seksjon_n += 1;
            }
            /* Laster inn json-filen til seksjonene */
            lastInnSeksjoner(event,kamptittel)
        }
    };
}


/* Laster inn json-filen til seksjonene */
function lastInnSeksjoner(event,kamptittel) {
    for (let l = 0; l < 1; l++) {
        oversikt = [];
        /* Gjør oversikts-matrisen stor nok */
        for (let i = 0; i < seksjoner.length; i++) {
            oversikt.push([])
        }
        for (let i = 0; i < seksjoner.length; i++) {
            fetch('https://ticketco.events/no/nb/events/' + event + '/seating_arrangement/sections/' + seksjoner[i]).then(res => res.json()).then((data) => {enkeltSeksjon(data,seksjoner_navn[i],i,kamptittel)})
        }
    }
}


function enkeltSeksjon(data,seksjon_navn,i,kamptittel) {
    /* Gjør om json-filen til en tekststreng */
    data = JSON.stringify(data)
    data = data.toString()

    /* Henter ut antall ledige billetter */
    let ledige_seksjon = data.split(',"seats')[0];
    ledige_seksjon = ledige_seksjon.substring(ledige_seksjon.indexOf('"section_remaining_amount":'));
    ledige_seksjon = ledige_seksjon.replace('"section_remaining_amount":','');

    /* Henter ut kapasitet på felt */
    let totalt_seksjon = data.split(',"section_remaining_amount')[0];
    totalt_seksjon = totalt_seksjon.substring(totalt_seksjon.indexOf('"section_amount":'));
    totalt_seksjon = totalt_seksjon.replace('"section_amount":','');
    /* Finner ut antall solgte på seksjon */
    let solgte_seksjon = totalt_seksjon - ledige_seksjon;
    /* Finner etter hvert ut totalt solgte på stadion */
    /* Legger seksjonsnavn, solgte på seksjon og kapasitet på seksjon inn i et array */
    let duplikat = false;
    for (j = 0; j < oversikt.length; j++) {
        if (oversikt[j][0] == seksjon_navn) {
            duplikat = true;
            if (solgte_seksjon <= oversikt[j][1]) {
            } else {
                solgte -= oversikt[j][1];
                solgte += solgte_seksjon;
                oversikt[j][1] = solgte_seksjon;
            }
        }
    }
    if (duplikat == false) {
        kapasitet += parseInt(totalt_seksjon);
        solgte += solgte_seksjon;
        oversikt[i].push(seksjon_navn)
        oversikt[i].push(solgte_seksjon)
        oversikt[i].push(totalt_seksjon)
    }
    /*  */
    iterasjoner_oversikt += 1;
    iterasjoner += 1;
    if (iterasjoner == seksjoner.length) {
        iterasjoner = 0;
        skrivUt(kamptittel)
        oversikt = [];
        totalt_stadion = 0;
        iterasjoner_oversikt = 0;
        solgte = 0;
    }
}

/* Funksjon for å skrive ut infomasjonen til HTML-siden */
function skrivUt(kamptittel) {
    document.getElementById('innhold').innerHTML += '<br>';
    for (j = 0; j < seksjoner.length; j++) {
        if (kamptittel == 'UEFA Conference League MD5 Molde FK vs Djurgården IF' && oversikt[j][0] == 'ISTAD - K Nedre') {
            oversikt[j][1] -= 282;
            solgte -= 282;
        }
        if (oversikt[j][0] == 'FJORDKRAFT Felt A' || (oversikt[j][0] == '307') && kamptittel == 'OBOS-Ligaen: Stabæk Fotball - Åsane') {
            oversikt[j][1] -= 34;
            solgte -= 34
        }
        if (kamptittel.includes('SANDNES ULF -') && oversikt[j][0] == 'Bortesupporterfelt') {
            oversikt[j][1] -= 8;
            solgte -= 8
        }
        if (kamptittel.includes('SANDNES ULF -') && oversikt[j][0] == 'Felt-H') {
            oversikt[j][1] -= 1;
            solgte -= 1
        }
    }
    oversikt.sort(sortFunction);
    document.getElementById('innhold').innerHTML += '<h2>' + kamptittel + '</h2>'
    if (solgte >= kapasitet) {
        document.getElementById('innhold').innerHTML += '<p><span style="background-color:LightGreen;"><b>' + solgte + '/' + kapasitet + '</b><span></p>'
    } else {
        document.getElementById('innhold').innerHTML += '<p><b>' + solgte + '/' + kapasitet + '</b></p>'
    }
    for (j = 0; j < seksjoner.length; j++) {
        if (oversikt[j][0] != undefined) {
            if (oversikt[j][1] >= oversikt[j][2] && bortefelt[f].includes(oversikt[j][0])) {
                document.getElementById('innhold').innerHTML += '<p style="color:red;"><span style="background-color:LightGreen;">' + oversikt[j][0] + ': ' + oversikt[j][1] + '/' + oversikt[j][2] + '</span></p>'
            }
            else if (bortefelt[f].includes(oversikt[j][0])) {
                document.getElementById('innhold').innerHTML += '<p style="color:red;">' + oversikt[j][0] + ': ' + oversikt[j][1] + '/' + oversikt[j][2] + '</p>'
            }
            else if (oversikt[j][1] >= oversikt[j][2]) {
                document.getElementById('innhold').innerHTML += '<p><span style="background-color:LightGreen;">' + oversikt[j][0] + ': ' + oversikt[j][1] + '/' + oversikt[j][2] + '</span></p>'
            }
            else {
                document.getElementById('innhold').innerHTML += '<p>' + oversikt[j][0] + ': ' + oversikt[j][1] + '/' + oversikt[j][2] + '</p>'
            }
        }
    }
    document.getElementById('innhold').innerHTML += '<br><br>'
    let elements = document.getElementsByClassName("kamper");
    for(let i = 0; i < elements.length; i++) {
        document.getElementById(elements[i].id).disabled = false;
    }
}

/*=========================================================================================*/

/* Sorteringsfunksjon */
function sortFunction(a, b) {
    if (b[1] == undefined) {b[1] = -1} 
    if (a[1] == undefined) {a[1] = -1} 
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

/* Funksjon for å finne en understrengs indeks i en streng */
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
