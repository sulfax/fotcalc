var eksperimentell_profil_e = "Calculate from scratch";
var eksperimentell_profil_n = "Kalkuler fra bunnen";

var overskrift_forside_finnes = document.getElementById('overskrift_forside');
var overskrift_landskoeffisient_finnes = document.getElementById('overskrift_landskoeffisient');
var overskrift_klubbkoeffisient_finnes = document.getElementById('overskrift_klubbkoeffisient');
var overskrift_ti_års_finnes = document.getElementById('overskrift_ti_års');
var overskrift_finnes = document.getElementById('overskrift_premiepenger');
var overskrift_koeff_finnes = document.getElementById('overskrift_koeffisient');
var overskrift_koeff_deff_finnes = document.getElementById('overskrift_koeffisient_dokumentasjon');

if (overskrift_koeff_finnes) {
  var din_klubbs_premi_koef_e = "your club’s prize money";
  var din_klubbs_premi_koef_n = "din klubbs premiepenger";
}
else if (overskrift_finnes) {
  var din_klubbs_premi_koef_e = "your club’s coefficient points";
  var din_klubbs_premi_koef_n = "din klubbs koeffisientpoeng";
}
function language(clicked_id) {
  language_koeffisient(clicked_id);
  language_standard(clicked_id);
  aarstall = parseInt(localStorage.getItem('sessong')) || 1;
  if (aarstall > 7) {aarstall = 1}
  if (overskrift_koeff_deff_finnes || overskrift_landskoeffisient_finnes) {}
  else {
    try {
      oppdater_sessong(aarstall)
    } catch {null}
  }
}

function language_standard(clicked_id) {
  var kolonne_lengde = sprak_id.length;
  var flint = "";
  if (clicked_id == "norsk") {
    if (document.getElementById('CL-PO')) {
      document.getElementById('CL-PO').innerText = 'Spilt'
    }
    endre_link_landskoeff()
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
        document.getElementById("klubb_link").innerHTML = "din klubbs";
      }
      if (overskrift_forside_finnes || overskrift_koeff_deff_finnes || overskrift_landskoeffisient_finnes || overskrift_klubbkoeffisient_finnes || overskrift_ti_års_finnes) {}
      else {
        if (Klubbnavn == "Calculate from scratch" || Klubbnavn == "Kalkuler fra bunnen") {
          document.getElementById("dropDownMeny").innerHTML = Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
        }
        else if (Klubbnavn == "Velg klubb") {
          document.getElementById("dropDownMeny").innerHTML = ((document.getElementById("dropDownMeny").innerHTML).slice(0, 964)) + Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
        }
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
    if (document.getElementById('CL-PO')) {
      document.getElementById('CL-PO').innerText = 'Played'
    }
    endre_link_landskoeff()
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
      if (overskrift_forside_finnes || overskrift_koeff_deff_finnes || overskrift_landskoeffisient_finnes || overskrift_klubbkoeffisient_finnes || overskrift_ti_års_finnes) {}
      else {
        if (Klubbnavn == "Calculate from scratch" || Klubbnavn == "Kalkuler fra bunnen") {
          document.getElementById("dropDownMeny").innerHTML = Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
        }
        else if (Klubbnavn == "Choose club") {
          document.getElementById("dropDownMeny").innerHTML = ((document.getElementById("dropDownMeny").innerHTML).slice(0, 964)) + Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
        }
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
            if (y == 2 || y == 3 || y == 4 || y == 6 || y == 7 || y == 9 || y == 10 || y == 11 || y == 13 || y == 14 || y == 15 || y == 36 || (y >= 21 && y <= 32)) {
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
  'landskoeff_rangering',
  'klubbkoeff_rangering',
  'ti_års_rangering',
  'premiepenger_kalkulator',
  'koeffisient_kalkulator',
  'billettsalg',
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
  'bidrag_navn',
  'klubb_koeff_navn',
  'premiepenger_bidrag_beskrivelse',
  'premiepenger_land_beskrivelse',
  'premiepenger_land_navn',
  'ass_koeff_land_navn',
  'bidrag_land_navn',
  'klubb_koeff_land_navn',
  'forklaring',
  'forklaring_2',
  'knappetekst',
  'b1', 'b2', 'b3', 'b5', 'b6', 'b8', 'b9', 'b12', 'CLPO', 'b16', 'b18', 'i13', 'b21', 'b24', 'b27', 'b30', 'b33', 'b36', 'b37',
  'reset',
  'ENG_oversett',
  'ESP_oversett',
  'ITA_oversett',
  'GER_oversett',
  'FRA_oversett',
  'POR_oversett',
  'NED_oversett',
  'AUT_oversett',
  'SCO_oversett',
  'RUS_oversett',
  'SRB_oversett',
  'UKR_oversett',
  'BEL_oversett',
  'SUI_oversett',
  'GRE_oversett',
  'CZE_oversett',
  'NOR_oversett',
  'DEN_oversett',
  'CRO_oversett',
  'TUR_oversett',
  'CYP_oversett',
  'ISR_oversett',
  'SWE_oversett',
  'BUL_oversett',
  'ROU_oversett',
  'AZE_oversett',
  'HUN_oversett',
  'POL_oversett',
  'KAZ_oversett',
  'SVK_oversett',
  'SVN_oversett',
  'BLR_oversett',
  'MDA_oversett',
  'LTU_oversett',
  'BIH_oversett',
  'FIN_oversett',
  'LUX_oversett',
  'LVA_oversett',
  'KVX_oversett',
  'IRL_oversett',
  'ARM_oversett',
  'NIR_oversett',
  'ALB_oversett',
  'FRO_oversett',
  'EST_oversett',
  'MLT_oversett',
  'GEO_oversett',
  'MKD_oversett',
  'LIE_oversett',
  'WAL_oversett',
  'GIB_oversett',
  'ISL_oversett',
  'MNE_oversett',
  'AND_oversett',
  'SMR_oversett'
];

const sprak_id_landskoeffisient = [
  'title',
  'overskrift_landskoeffisient',
  'beskrivelse_landskoeffisient',
  'beskrivelse_landskoeffisient_klubb',
  'decisive_oversett',
  'premiepenger_reklame',
  'oversikt_reklame',
  'ENG_oversett',
  'ESP_oversett',
  'ITA_oversett',
  'GER_oversett',
  'FRA_oversett',
  'POR_oversett',
  'NED_oversett',
  'AUT_oversett',
  'SCO_oversett',
  'RUS_oversett',
  'SRB_oversett',
  'UKR_oversett',
  'BEL_oversett',
  'SUI_oversett',
  'GRE_oversett',
  'CZE_oversett',
  'NOR_oversett',
  'DEN_oversett',
  'CRO_oversett',
  'TUR_oversett',
  'CYP_oversett',
  'ISR_oversett',
  'SWE_oversett',
  'BUL_oversett',
  'ROU_oversett',
  'AZE_oversett',
  'HUN_oversett',
  'POL_oversett',
  'KAZ_oversett',
  'SVK_oversett',
  'SVN_oversett',
  'BLR_oversett',
  'MDA_oversett',
  'LTU_oversett',
  'BIH_oversett',
  'FIN_oversett',
  'LUX_oversett',
  'LVA_oversett',
  'KVX_oversett',
  'IRL_oversett',
  'ARM_oversett',
  'NIR_oversett',
  'ALB_oversett',
  'FRO_oversett',
  'EST_oversett',
  'MLT_oversett',
  'GEO_oversett',
  'MKD_oversett',
  'LIE_oversett',
  'WAL_oversett',
  'GIB_oversett',
  'ISL_oversett',
  'MNE_oversett',
  'AND_oversett',
  'SMR_oversett'
];

const sprak_id_klubbkoeffisient = [
  'title_klubbkoeffisient',
  'overskrift_klubbkoeffisient',
  'beskrivelse_klubbkoeffisient',
  'decisive_oversett',
  'premiepenger_reklame',
  'oversikt_reklame',
];

const sprak_id_ti_års = [
  'title_ti_års',
  'overskrift_ti_års',
  'beskrivelse_ti_års',
  'decisive_oversett',
  'premiepenger_reklame',
  'oversikt_reklame'
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
  'marketPool_id2',
  'koeff_reklame',
  'oversikt_reklame'
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
  'oversikt_reklame',
  'landskoeff_reklame'
];

const sprak_id_koeffisient_dokumentasjon = [
  'title_koeffisient_dokumentasjon',
  'overskrift_koeffisient_dokumentasjon',
  'beskrivelse_koeffisient_dokumentasjon',
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
  else if (overskrift_forside_finnes) {
    var forside_antall_oversett = sprak_id_forside.length;
    if (clicked_id == "norsk") {
      document.getElementById("dropdown_elementer_turnering").innerHTML = '';
      const knapplabel_turneringer = ['<img src=media/UEFA/UCL.svg class=turnering_ikon>', '<img src=media/UEFA/UEL.svg class=turnering_ikon>', '<img src=media/UEFA/UECL.svg class=turnering_ikon>']
      for (i = 0; i < knapplabel_turneringer.length; i++) {
        let btn = "<abbr data_title='Alle stadier'><button onClick='adva_filtrer(this.id)' class='btn btn-danger " + knapp_filter_turneringer[i] + "' id=" + knapp_filter_turneringer[i] + ">" + knapplabel_turneringer[i] + "</button></abbr>"
        document.getElementById("dropdown_elementer_turnering").innerHTML += btn;
      }
      fargelegg_etter_reset()
      for (x=0;x<forside_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_forside[x]).innerHTML = norsk_forside[x];
        }
        catch {
          null;
        }
      }
      if (document.getElementById('filter_på').innerText != '') {
        document.getElementById('filter_på').innerText = '(på)'
      }
    }
    else {
      document.getElementById("dropdown_elementer_turnering").innerHTML = '';
      const knapplabel_turneringer = ['<img src=media/UEFA/UCL.svg class=turnering_ikon>', '<img src=media/UEFA/UEL.svg class=turnering_ikon>', '<img src=media/UEFA/UECL.svg class=turnering_ikon>']
      for (i = 0; i < knapplabel_turneringer.length; i++) {
        let btn = "<abbr data_title='All stages'><button onClick='adva_filtrer(this.id)' class='btn btn-danger " + knapp_filter_turneringer[i] + "' id=" + knapp_filter_turneringer[i] + ">" + knapplabel_turneringer[i] + "</button></abbr>"
        document.getElementById("dropdown_elementer_turnering").innerHTML += btn;
      }
      fargelegg_etter_reset()
      for (x=0;x<forside_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_forside[x]).innerHTML = english_forside[x];
        }
        catch {
          null;
        }
      }
      if (document.getElementById('filter_på').innerText != '') {
        document.getElementById('filter_på').innerText = '(on)'
      }
    }
  }
  else if (overskrift_landskoeffisient_finnes) {
    var landskoeffisient_antall_oversett = sprak_id_landskoeffisient.length;
    if (clicked_id == "norsk") {
      for (x=0;x<landskoeffisient_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_landskoeffisient[x]).innerHTML = norsk_landskoeffisient[x];
        }
        catch {
          null;
        }
      }
    }
    else {
      for (x=0;x<landskoeffisient_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_landskoeffisient[x]).innerHTML = english_landskoeffisient[x];
        }
        catch {
          null;
        }
      }
    }
  }
  else if (overskrift_klubbkoeffisient_finnes) {
    var klubbkoeffisient_antall_oversett = sprak_id_klubbkoeffisient.length;
    if (clicked_id == "norsk") {
      for (x=0;x<klubbkoeffisient_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_klubbkoeffisient[x]).innerHTML = norsk_klubbkoeffisient[x];
        }
        catch {
          null;
        }
      }
    }
    else {
      for (x=0;x<klubbkoeffisient_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_klubbkoeffisient[x]).innerHTML = english_klubbkoeffisient[x];
        }
        catch {
          null;
        }
      }
    }
  }
  else {
    var ti_års_antall_oversett = sprak_id_ti_års.length;
    if (clicked_id == "norsk") {
      for (x=0;x<ti_års_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_ti_års[x]).innerHTML = norsk_ti_års[x];
        }
        catch {
          null;
        }
      }
    }
    else {
      for (x=0;x<ti_års_antall_oversett;x++) {
        try {
          document.getElementById(sprak_id_ti_års[x]).innerHTML = english_ti_års[x];
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


if (overskrift_forside_finnes) {
  const menyvalg_lengde = JSON.parse(localStorage.getItem('menyvalg_edit')).length
  var menyvalg_edit_2 = JSON.parse(localStorage.getItem('menyvalg_edit'))

  var schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  }
  for (let i = 0; i < menyvalg_lengde; i++) {
    menyvalg_edit_2[i][0] = (menyvalg_edit_2[i][0]).slice(0,-3)
    var Lag_premiepenger = {
        "@type": "Question",
        "name": "How much prize money has " + menyvalg_edit_2[i][0] + " earned so far?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "€ " + menyvalg_edit_2[i][6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        }
    }
    var poeng1 = "points"
    var poeng2 = "points"
    if (menyvalg_edit_2[i][7] == 1) {
      poeng1 = "point"
    }
    if (menyvalg_edit_2[i][8] == 1) {
      poeng2 = "point"
    }
    var Lag_koeff = {
      "@type": "Question",
      "name": "How many coefficient points has " + menyvalg_edit_2[i][0] + " earned in 22/23?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": menyvalg_edit_2[i][7] + " association coefficient " + poeng1 + " and " + menyvalg_edit_2[i][8] + " club coefficient " + poeng2,
      }
  }
    schema.mainEntity.push(Lag_premiepenger)
    schema.mainEntity.push(Lag_koeff)
  }
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

endre_link_landskoeff()
function endre_link_landskoeff() {
  if (overskrift_landskoeffisient_finnes) {
    let siste_ord_linktekst = document.getElementById('overskrift_landskoeffisient').innerText;
    if (siste_ord_linktekst == "Country coefficient ranking") {
        siste_ord_linktekst = "prize money"
    }
    else {
      siste_ord_linktekst = "premiepenger"
    }
    var Klubbnavn = localStorage.getItem('Klubbnavn') || 'Choose club';
    if (Klubbnavn.slice(-1) == "s") {
      document.getElementById("klubb_link").innerHTML = Klubbnavn + "’ " + siste_ord_linktekst;
    }
    else {
      if (siste_ord_linktekst == "premiepenger") {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "s " + siste_ord_linktekst;
      }
      else {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "’s " + siste_ord_linktekst;
      }
    }
    if (Klubbnavn == "Choose club" || Klubbnavn == eksperimentell_profil_e) {
      document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_e;
    }
    else if (Klubbnavn == "Velg klubb" || Klubbnavn == eksperimentell_profil_n) {
      document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_n;
    }
  }
  else if (overskrift_klubbkoeffisient_finnes) {
    let siste_ord_linktekst = document.getElementById('overskrift_klubbkoeffisient').innerText;
    if (siste_ord_linktekst == "5-year coefficient ranking") {
        siste_ord_linktekst = "prize money"
    }
    else {
      siste_ord_linktekst = "premiepenger"
    }
    var Klubbnavn = localStorage.getItem('Klubbnavn') || 'Choose club';
    if (Klubbnavn.slice(-1) == "s") {
      document.getElementById("klubb_link").innerHTML = Klubbnavn + "’ " + siste_ord_linktekst;
    }
    else {
      if (siste_ord_linktekst == "premiepenger") {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "s " + siste_ord_linktekst;
      }
      else {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "’s " + siste_ord_linktekst;
      }
    }
    if (Klubbnavn == "Choose club" || Klubbnavn == eksperimentell_profil_e) {
      document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_e;
    }
    else if (Klubbnavn == "Velg klubb" || Klubbnavn == eksperimentell_profil_n) {
      document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_n;
    }
  }
  else if (overskrift_ti_års_finnes) {
    let siste_ord_linktekst = document.getElementById('overskrift_ti_års').innerText;
    if (siste_ord_linktekst == "10-year coefficient ranking") {
        siste_ord_linktekst = "prize money"
    }
    else {
      siste_ord_linktekst = "premiepenger"
    }
    var Klubbnavn = localStorage.getItem('Klubbnavn') || 'Choose club';
    if (Klubbnavn.slice(-1) == "s") {
      document.getElementById("klubb_link").innerHTML = Klubbnavn + "’ " + siste_ord_linktekst;
    }
    else {
      if (siste_ord_linktekst == "premiepenger") {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "s " + siste_ord_linktekst;
      }
      else {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "’s " + siste_ord_linktekst;
      }
    }
    if (Klubbnavn == "Choose club" || Klubbnavn == eksperimentell_profil_e) {
      document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_e;
    }
    else if (Klubbnavn == "Velg klubb" || Klubbnavn == eksperimentell_profil_n) {
      document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_n;
    }
  }
}

// Koeffisient deffinisjon.
// Når Landskoeffisient-rangerings lenken trykkes:

function trykker_lands_rank_deffinisjon() {
  sessionStorage.setItem('kolonne_landskoeffisient', 'poeng')
  sessionStorage.setItem('rekkefølge_landskoeffisient', 'desc')
  sessionStorage.setItem('kolonne_landskoeffisient2', 'id_nr_klubb')
  sessionStorage.setItem('rekkefølge_landskoeffisient2', 'asc')
}

// Når forside-lenken trykkes:
function trykker_forside_deffinisjon() {
  sessionStorage.setItem('kolonne', 'prize_money')
  sessionStorage.setItem('rekkefølge', 'desc')
  sessionStorage.setItem('kolonne2', 'prize_money_total')
  sessionStorage.setItem('rekkefølge2', 'desc')
  localStorage.setItem('filter_land', JSON.stringify([]))
  sessionStorage.setItem('trykte_knapper', JSON.stringify([]))
  sessionStorage.setItem('trykte_knapper_exclude', JSON.stringify([]))
  sessionStorage.setItem('spoiler', 'synlig')
}