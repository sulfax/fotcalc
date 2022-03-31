var eksperimentell_profil_e = "Calculate from scratch";
var eksperimentell_profil_n = "Kalkuler fra bunnen";

var overskrift_forside_finnes = document.getElementById('overskrift_forside');
var overskrift_finnes = document.getElementById('overskrift_premiepenger');
var overskrift_koeff_finnes = document.getElementById('overskrift_koeffisient');
var overskrift_koeff_deff_finnes = document.getElementById('overskrift_koeffisient_dokumentasjon');

if (overskrift_koeff_finnes) {
  var din_klubbs_premi_koef_e = "your club’s prize money";
  var din_klubbs_premi_koef_n = "din klubb’s premiepenger";
}
else if (overskrift_finnes) {
  var din_klubbs_premi_koef_e = "your club’s coefficient points";
  var din_klubbs_premi_koef_n = "din klubb’s koeffisientpoeng";
}

function language(clicked_id) {
  language_koeffisient(clicked_id);
  language_standard(clicked_id);
  aarstall = localStorage.getItem('sessong');
  if (overskrift_koeff_deff_finnes) {}
  else {
    oppdater_sessong(aarstall)
  }
}

function language_standard(clicked_id) {
  var kolonne_lengde = sprak_id.length;
  var flint = "";
  if (clicked_id == "norsk") {
    for (x=0;x<kolonne_lengde;x++) {
      try {
        document.getElementById(sprak_id[x]).innerHTML = norsk[x];
      }
      catch {
        null;
      }
    }
    ja_språk = ja_nei[0][0];
    nei_språk = ja_nei[0][1];
    seier_språk = ja_nei[0][2];
    uavgjort_språk = ja_nei[0][3];
    tap_språk = ja_nei[0][4];
    eliminert_språk = ja_nei[0][5];
    spilt_språk = ja_nei[0][6];
    for (x=0;x<68;x++) {
      try {
        var klasse = (document.getElementById("b" + (x + 1)).className);
        var id = document.getElementById("b" + (x + 1));
        if (klasse == "btn btn-danger r0" || klasse == "btn btn-danger de0_UCL ele" || klasse == "btn btn-danger de0_UEL ele" || klasse == "btn btn-danger de0_UECL ele" || klasse == "btn btn-danger de0_UCL del" || klasse == "btn btn-danger de0_UEL del" || klasse == "btn btn-danger de0_UECL del") {
          id.innerText = '';
        }
        if (klasse == "btn btn-danger r1") {
          id.innerText = 'Seier';
        }
        if (klasse == "btn btn-danger r2") {
          id.innerText = 'Uavgjort';
        }
        if (klasse == "btn btn-danger r3") {
          id.innerText = 'Tap';
        }
        if (klasse == "btn btn-danger de1_UCL ele" || klasse == "btn btn-danger de1_UEL ele" || klasse == "btn btn-danger de1_UECL ele") {
          id.innerText = 'Eliminert';
        }
        if (klasse == "btn btn-danger de1_UCL del" || klasse == "btn btn-danger de1_UEL del" || klasse == "btn btn-danger de1_UECL del") {
          id.innerText = 'Spilt';
        }
      }
      catch {
        null;
      }
    }
    try {
      if (overskrift_koeff_finnes) {
        for (x=0;x<6;x++) {
          document.getElementsByName(x + 1)[0].placeholder = 'Antall';
        }
        for (x=0;x<3;x++) {
          document.getElementsByName(x + 7)[0].placeholder = 'Plassering';
        }
      }
      else if (overskrift_finnes) {
        for (x=0;x<3;x++) {
          document.getElementsByName(x + 1)[0].placeholder = 'Rangering';
        }
        for (x=0;x<6;x++) {
          document.getElementsByName(x + 4)[0].placeholder = 'Antall';
        }
        for (x=0;x<3;x++) {
          document.getElementsByName(x + 13)[0].placeholder = 'Plassering';
        }
      }
    }
    finally {
      flint = "norsk";
      localStorage.setItem("someVarKey", flint);
      let Klubbnavn = localStorage.getItem("Klubbnavn");
      if (Klubbnavn == "Calculate from scratch") {
        Klubbnavn = "Kalkuler fra bunnen";
        localStorage.setItem("Klubbnavn", Klubbnavn);
      }
      else if (Klubbnavn == null || Klubbnavn == "null" || Klubbnavn == "Choose club") {
        Klubbnavn = "Velg klubb";
        localStorage.setItem("Klubbnavn", Klubbnavn);
      }
      if (Klubbnavn == "Velg klubb" && overskrift_finnes) {
        document.getElementById("klubb_link").innerHTML = "din klubb’s";
      }
      if (overskrift_forside_finnes || overskrift_koeff_deff_finnes) {}
      else {
        document.getElementById("dropDownMeny").innerHTML = Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
      }
      if (Klubbnavn.slice(-1) == "s" && overskrift_finnes) {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + " koeffisientpoeng";
      }
      else if (overskrift_finnes) {
          document.getElementById("klubb_link").innerHTML = Klubbnavn + "s koeffisientpoeng";
      }
      else if (Klubbnavn.slice(-1) == "s" && overskrift_koeff_finnes) {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + " premiepenger";
      }
      else if (overskrift_koeff_finnes) {
          document.getElementById("klubb_link").innerHTML = Klubbnavn + "s premiepenger";
      }
    }
  }

  
  else {
    for (x=0;x<kolonne_lengde;x++) {
      try {
        document.getElementById(sprak_id[x]).innerHTML = english[x];
      }
      catch {
        null;
      }
    }
    ja_språk = ja_nei[1][0];
    nei_språk = ja_nei[1][1];
    seier_språk = ja_nei[1][2];
    uavgjort_språk = ja_nei[1][3];
    tap_språk = ja_nei[1][4];
    eliminert_språk = ja_nei[1][5];
    spilt_språk = ja_nei[1][6];
    for (x=0;x<68;x++) {
      try {
        let klasse = (document.getElementById("b" + (x + 1)).className);
        let id = document.getElementById("b" + (x + 1));
        if (klasse == "btn btn-danger r0" || klasse == "btn btn-danger de0_UECL ele" || klasse == "btn btn-danger de0_UECL del") {
          id.innerText = '';
        }
        if (klasse == "btn btn-danger r1") {
          id.innerText = 'Victory';
        }
        if (klasse == "btn btn-danger r2") {
          id.innerText = 'Draw';
        }
        if (klasse == "btn btn-danger r3") {
          id.innerText = 'Loss';
        }
        if (klasse == "btn btn-danger de1_UCL ele" || klasse == "btn btn-danger de1_UEL ele" || klasse == "btn btn-danger de1_UECL ele") {
          id.innerText = 'Eliminated';
        }
        if (klasse == "btn btn-danger de1_UCL del" || klasse == "btn btn-danger de1_UEL del" || klasse == "btn btn-danger de1_UECL del") {
          id.innerText = 'Played';
        }
      }
      catch {
        null;
      }
    }
    try {
      if (overskrift_koeff_finnes) {
        for (x=0;x<6;x++) {
          document.getElementsByName(x + 1)[0].placeholder = 'Amount';
        }
        for (x=0;x<3;x++) {
          document.getElementsByName(x + 7)[0].placeholder = 'Placement';
        }
      }
      else if (overskrift_finnes) {
        for (x=0;x<3;x++) {
          document.getElementsByName(x + 1)[0].placeholder = 'Ranking';
        }
        for (x=0;x<6;x++) {
          document.getElementsByName(x + 4)[0].placeholder = 'Amount';
        }
        for (x=0;x<3;x++) {
          document.getElementsByName(x + 13)[0].placeholder = 'Placement';
        }
      }
    }
    finally {
      flint = "english";
      localStorage.setItem("someVarKey", flint);
      let Klubbnavn = localStorage.getItem("Klubbnavn");
      if (Klubbnavn == "Kalkuler fra bunnen") {
        Klubbnavn = "Calculate from scratch";
        localStorage.setItem("Klubbnavn", Klubbnavn);
      }
      else if (Klubbnavn == null || Klubbnavn == "null" || Klubbnavn == "Velg klubb") {
        Klubbnavn = "Choose club";
        localStorage.setItem("Klubbnavn", Klubbnavn);
      }
      if (Klubbnavn == "Choose club" && overskrift_finnes) {
        document.getElementById("klubb_link").innerHTML = "your club’s";
      }
      if (overskrift_forside_finnes || overskrift_koeff_deff_finnes) {}
      else {
        document.getElementById("dropDownMeny").innerHTML = Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
      }
      if (Klubbnavn.slice(-1) == "s" && overskrift_finnes) {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "’ coefficient points";
      }
      else if (overskrift_finnes) {
          document.getElementById("klubb_link").innerHTML = Klubbnavn + "’s coefficient points";
      }
      else if (Klubbnavn.slice(-1) == "s" && overskrift_koeff_finnes) {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "’ prize money";
      }
      else if (overskrift_koeff_finnes) {
          document.getElementById("klubb_link").innerHTML = Klubbnavn + "’s prize money";
      }
    }
  }
  
  if (overskrift_koeff_deff_finnes || overskrift_forside_finnes) {}
  else {
    Klubbnavn = localStorage.getItem("Klubbnavn")
    if (Klubbnavn == "Choose club" || Klubbnavn == eksperimentell_profil_e) {
      document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_e;
    }
    else if (Klubbnavn == "Velg klubb" || Klubbnavn == eksperimentell_profil_n) {
      document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_n;
    }
  
    if (overskrift_finnes) {
      for (x=0;x<39;x++) {
        var knapp_id_nei = document.getElementById('b' + (x + 1));
        var knapp_id_ja = document.getElementById('b' + (-(x + 1)));
        try {
          if (knapp_id_nei) {
            knapp_id_nei.innerText = "" /*nei_språk*/;
          }
          else {
            y = (x + 1);
            if (y == 2 || y == 3 || y == 4 || y == 6 || y == 7 || y == 9 || y == 10 || y == 11 || y == 13 || y == 14 || y == 15 || (y >= 21 && y <= 32) || (y >= 36 && y <= 37)) {
              knapp_id_ja.innerText = spilt_språk;
            }
            else {
              knapp_id_ja.innerText = ja_språk;
            }
          }        
        }
        catch {
          null;
        }
      } 
    }
  }
}

const sprak_id = [
  'hjem',
  'premiepenger_kalkulator',
  'koeffisient_kalkulator',
  'eksperimentell_profil_meny_element',
  'søk',
  'tilbakestill',
  'laget_av_Johannes',
  'kontakt_meg'
];

const sprak_id_forside = [
  'title',
  'overskrift_forside',
  'beskrivelse_forside',
  'klubb_navn',
  'premiepenger_navn',
  'ass_koeff_navn',
  'klubb_koeff_navn'
];

const sprak_id_kalkulator = [
  'title_premiepenger',
  'overskrift_premiepenger',
  'beskrivelse_premiepenger',
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
  'inntjening',
  'marketPool_id',
  'koeff_reklame'
];

const sprak_id_koeffisient = [
  'title_koeffisient',
  'overskrift_koeffisient',
  'beskrivelse_koeffisient',
  'progresjon',
  'prelim_semifinale',
  'prelim_finale',
  'q1_kamp1',
  'q1_kamp2',
  'q1_elim',
  'q2_kamp1',
  'q2_kamp2',
  'q2_elim',
  'q3_kamp1',
  'q3_kamp2',
  'q3_elim',
  'po_kamp1',
  'po_kamp2',
  'po_elim',
  'gruppespill_del',
  'seiere_antall',
  'uavgjort_antall',
  'gruppeplassering',
  'knock_po_kamp1',
  'knock_po_kamp2',
  'åtten',
  'åtten_kamp1',
  'åtten_kamp2',
  'kvart',
  'kvart_kamp1',
  'kvart_kamp2',
  'semi',
  'semi_kamp1',
  'semi_kamp2',
  'finale',
  'finale_kamp1',
  'koeffisienter_turnering',
  'koeffisienter',
  'assosiasjons_poeng_link',
  'klubb_poeng',
  'kilde_koeff_id',
  'koeff_reklame',
];

const sprak_id_koeffisient_dokumentasjon = [
  'title_koeffisient_dokumentasjon',
  'overskrift_koeffisient_dokumentasjon',
  'what_is_coeff',
  'what_are_coeff_beskrivelse_1',
  'association',
  'what_are_association_coeff_beskrivelse_1',
  'what_are_association_coeff_kopi',
  'what_are_association_tabell_1',
  'what_are_association_coeff_beskrivelse_2',
  'what_are_association_coeff_beskrivelse_3',
  'what_are_association_tabell_2',
  'what_are_association_coeff_beskrivelse_4',
  'what_are_association_tabell_3',
  'what_are_association_coeff_beskrivelse_5',
  'what_are_association_coeff_beskrivelse_6',
  'what_are_association_tabell_4',
  'club',
  'what_are_club_coeff_beskrivelse_1',
  'what_are_club_coeff_tabell_1',
  'what_are_club_coeff_beskrivelse_2',
  'what_are_club_coeff_beskrivelse_3',
  'what_are_club_coeff_beskrivelse_4',
  'what_are_club_coeff_tabell_2',
  'what_are_club_coeff_beskrivelse_5',
  'what_are_club_coeff_tabell_3',
  'what_are_club_coeff_beskrivelse_6',
  'what_are_club_coeff_beskrivelse_7',
  'what_are_club_coeff_beskrivelse_8'
];

function language_koeffisient(clicked_id) {
  if (overskrift_koeff_finnes) {
    var koeffisient_antall_oversett = sprak_id_koeffisient.length;
    if (clicked_id == "norsk") {
      for (x=0;x<koeffisient_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_koeffisient[x]).innerHTML = norsk_koeffisient[x];
        }
        catch {
          null;
        }
      }
    }
    else {
      for (x=0;x<koeffisient_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_koeffisient[x]).innerHTML = english_koeffisient[x];
        }
        catch {
          null;
        }
      }
    }
  }
  else if (document.getElementById('overskrift_koeffisient_dokumentasjon')) {
    var koeffisient_dokumentasjon_antall_oversett = sprak_id_koeffisient_dokumentasjon.length;
    if (clicked_id == "norsk") {
      for (x=0;x<koeffisient_dokumentasjon_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_koeffisient_dokumentasjon[x]).innerHTML = norsk_koeffisient_dokumentasjon[x];
        }
        catch {
          null;
        }
      }
    }
    else {
      for (x=0;x<koeffisient_dokumentasjon_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_koeffisient_dokumentasjon[x]).innerHTML = english_koeffisient_dokumentasjon[x];
        }
        catch {
          null;
        }
      }
    }
  }
  else if (document.getElementById('overskrift_premiepenger')) {
    var kalkulator_antall_oversett = sprak_id_kalkulator.length;
    if (clicked_id == "norsk") {
      for (x=0;x<kalkulator_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_kalkulator[x]).innerHTML = norsk_kalkulator[x];
        }
        catch {
          null;
        }
      }
    }
    else {
      for (x=0;x<kalkulator_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_kalkulator[x]).innerHTML = english_kalkulator[x];
        }
        catch {
          null;
        }
      }
    }
  }
  else {
    var forside_antall_oversett = sprak_id_forside.length;
    if (clicked_id == "norsk") {
      for (x=0;x<forside_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_forside[x]).innerHTML = norsk_forside[x];
        }
        catch {
          null;
        }
      }
    }
    else {
      for (x=0;x<forside_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_forside[x]).innerHTML = english_forside[x];
        }
        catch {
          null;
        }
      }
    }
  }
}
var flint_2 = localStorage.getItem("someVarKey");
language_koeffisient(flint_2);
language_standard(flint_2);


if (overskrift_koeff_finnes) {
  oppdater_ved_refresh_koeff_1();
}