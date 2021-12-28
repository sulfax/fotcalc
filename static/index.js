/*
document.getElementById(sprak_id[1][0]).setAttribute("data_title", english[1][0]);   
*/

function language(clicked_id) {
  var kolonne_lengde = sprak_id.length;
  var flint = "";

  if (clicked_id == "norsk") {
    for (x=0;x<kolonne_lengde;x++) {
      try {
        document.getElementById(sprak_id[x]).innerHTML = norsk[x];
        document.getElementById("ytre_tabell_div_id").style.width = "123px";
      }
      catch {
        null;
      }
    }
    ja_språk = ja_nei[0][0];
    nei_språk = ja_nei[0][1];
    for (x=0;x<39;x++) {
      var knapp_id_nei = document.getElementById("b" + (x + 1));
      var knapp_id_ja = document.getElementById("b" + (-(x + 1)));
      try {
        if (knapp_id_nei) {
          knapp_id_nei.innerText = 'Nei';
        }
        else {
          knapp_id_ja.innerText = 'Ja';
        }
      }
      catch {
        null;
      }
    }
    try {
      for (x=0;x<3;x++) {
        document.getElementsByName(x + 1)[0].placeholder = 'Rangering';
      }
      for (x=0;x<9;x++) {
        document.getElementsByName(x + 4)[0].placeholder = 'Antall';
      }
      for (x=0;x<3;x++) {
        document.getElementsByName(x + 13)[0].placeholder = 'Plassering';
      }
    }
    catch {
      null;
    }
    flint = "norsk";
    localStorage.setItem("someVarKey", flint);
  }

  
  else {
    for (x=0;x<kolonne_lengde;x++) {
      try {
        document.getElementById(sprak_id[x]).innerHTML = english[x];
        document.getElementById("ytre_tabell_div_id").style.width = "90px";
      }
      catch {
        null;
      }
    }
    ja_språk = ja_nei[1][0];
    nei_språk = ja_nei[1][1];
    for (x=0;x<39;x++) {
      var knapp_id_nei = document.getElementById('b' + (x + 1));
      var knapp_id_ja = document.getElementById('b' + (-(x + 1)));
      try {
        if (knapp_id_nei) {
          knapp_id_nei.innerText = 'No';
        }
        else {
          knapp_id_ja.innerText = 'Yes';
        }        
      }
      catch {
        null;
      }
    }
    try {
      for (x=0;x<3;x++) {
        document.getElementsByName(x + 1)[0].placeholder = 'Ranking';
      }
      for (x=0;x<9;x++) {
        document.getElementsByName(x + 4)[0].placeholder = 'Amount';
      }
      for (x=0;x<3;x++) {
        document.getElementsByName(x + 13)[0].placeholder = 'Placement';
      }
    }
    catch {
      null;
    }
    flint = "english";
    localStorage.setItem("someVarKey", flint);
  }
};


const sprak_id = [
  'title',
  'beskrivelse',
  'home',
  'logout',
  'kalkulator',
  'laget_av_Johannes',
  'kontakt_meg',
  'overskrift',
  'tilbakestill',
  'progresjon',
  'hjemlig_seriemester', 
  'spilt_preliminary', 
  'spilt_q1', 
  'røk_ut_q1',
  'spilt_q2',
  'røk_ut_q2',
  'spilt_q3',
  'røk_ut_q3',
  'spilt_q3_lp',
  'spilt_playoff',
  'røk_ut_playoff',
  'gruppespill',
  'ti_års_koeff',
  'seiere',
  'uavgjort',
  'uavgjort_hele',
  'ufordelte_ressurser',
  'tabellplassering',
  'spilt_utslagsrunde_playoff',
  'spilt_åttendelsfinale',
  'spilt_kvartfinale',
  'spilt_semifinale',
  'spilt_finale',
  'vunnet_finale',
  'spilt_scup',
  'vunnet_scup',
  'inntjening_turnering',
  'inntjening'
];

var flint_2 = localStorage.getItem("someVarKey");
language(flint_2);