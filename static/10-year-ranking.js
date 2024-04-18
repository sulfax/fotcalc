(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

let opp_ned_pil_margin = '<span class="margin"><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
let opp_ned_pil = '<span class="høyrestill"><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
let opp_ned_pil_midten = '<span><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
var eksperimentell_profil_e = "Calculate from scratch";
var eksperimentell_profil_n = "Kalkuler fra bunnen";
var din_klubbs_premi_koef_e = "your club's prize money";
var din_klubbs_premi_koef_n = "din klubbs premiepenger";
let antall_MV_elem = 6;
let filter_land = []
let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
if (filter_land_før == '') {
  localStorage.setItem('filter_land', JSON.stringify([]))
  filter_land_før = [];
}

let ranking_array = []

if (sessionStorage.getItem('kolonne_ti_års') == 'undefined') {
  sessionStorage.setItem('kolonne_ti_års', 'id_nr')
}
if (sessionStorage.getItem('rekkefølge_ti_års') == 'undefined') {
  sessionStorage.setItem('rekkefølge_ti_års', 'asc')
}


let aar_etter_forste_periode = "";

let egentligRangeringKlubb = [];
let egentligRangering = [];


try {if (sessionStorage.getItem('dropdownmeny_valg_ti_års').length > 10) {
	sessionStorage.setItem('dropdownmeny_valg_ti_års', 2000+nåværende_sesong_periode_valg[0] + '/' + nåværende_sesong_periode_valg[2]);
}} catch {null;}
if (localStorage.getItem('dropdownmeny_valg_ti_års_midlertidig')) {
	sessionStorage.setItem('dropdownmeny_valg_ti_års', localStorage.getItem('dropdownmeny_valg_ti_års_midlertidig'))
	localStorage.removeItem('dropdownmeny_valg_ti_års_midlertidig');
}
document.getElementById("dropDownMeny").innerHTML = (sessionStorage.getItem('dropdownmeny_valg_ti_års') || (2000+nåværende_sesong_periode_valg[0]) + '/' + (nåværende_sesong_periode_valg[2])) + " <div class='opp_ned_pil'>&#10094</div>";
aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(2,4) - 21;
if (aar_etter_forste_periode < 2) {
    location.href = '/10-year-ranking-historic-titles';
}


oppdater_ved_refresh()
function oppdater_ved_refresh() {
  let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || []
  ranking_array = []
  testTabell = document.getElementById('minTest')
  try {if (sessionStorage.getItem('dropdownmeny_valg_ti_års').length > 10) {
    sessionStorage.setItem('dropdownmeny_valg_ti_års', 2000+nåværende_sesong_periode_valg[0] + '/' + nåværende_sesong_periode_valg[2]);
  }} catch {null;}
  if (localStorage.getItem('dropdownmeny_valg_ti_års_midlertidig')) {
    sessionStorage.setItem('dropdownmeny_valg_ti_års', localStorage.getItem('dropdownmeny_valg_ti_års_midlertidig'))
    localStorage.removeItem('dropdownmeny_valg_ti_års_midlertidig');
  }
  document.getElementById("dropDownMeny").innerHTML = (sessionStorage.getItem('dropdownmeny_valg_ti_års') || (2000+nåværende_sesong_periode_valg[0]) + '/' + (nåværende_sesong_periode_valg[2])) + " <div class='opp_ned_pil'>&#10094</div>";
  var klubbers_assosiasjon = []
  aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(2,4) - 21;
  let p = 12;
  let pilstatus = ''
  for (i = 0; i < 10; i++) {
    pilstatus = (document.getElementById('sesong' + (i + 1)).innerHTML).slice(5)
    document.getElementById('sesong' + (10 - i)).innerHTML = (p + aar_etter_forste_periode) + '/' + ((p + 1) + aar_etter_forste_periode) + pilstatus
    p += 1;
  }
  document.getElementById('decisive_sesong').innerText = (2000+p + aar_etter_forste_periode) + '/' + ((p + 1) + aar_etter_forste_periode)
  for (i = 0; i < menyvalg.length; i++) {
    klubbers_assosiasjon.push(menyvalg[i][1])
  }

  let klubber_med_i_ranking_menyvalg = [];
  for (i = 0; i < menyvalg.length; i++) {
    let er_i_periode_menyvalg_aar_0 = (menyvalg[i][antall_MV_elem+1 + (aar_etter_forste_periode * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_1 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 1) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_2 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 2) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_3 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 3) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_4 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 4) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_5 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 5) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_6 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 6) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_7 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 7) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_8 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 8) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_9 = (menyvalg[i][antall_MV_elem+1 + ((aar_etter_forste_periode - 9) * antall_MV_elem)])
  if (aar_etter_forste_periode == -1) {
    er_i_periode_menyvalg = false}
    if (aar_etter_forste_periode == 0) {
      if (er_i_periode_menyvalg_aar_0 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode == 1) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode == 2) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode == 3) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode == 4) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined || er_i_periode_menyvalg_aar_4 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode == 5) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined || er_i_periode_menyvalg_aar_4 != undefined || er_i_periode_menyvalg_aar_5 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode == 6) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined || er_i_periode_menyvalg_aar_4 != undefined || er_i_periode_menyvalg_aar_5 != undefined || er_i_periode_menyvalg_aar_6 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode == 7) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined || er_i_periode_menyvalg_aar_4 != undefined || er_i_periode_menyvalg_aar_5 != undefined || er_i_periode_menyvalg_aar_6 != undefined || er_i_periode_menyvalg_aar_7 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode == 8) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined || er_i_periode_menyvalg_aar_4 != undefined || er_i_periode_menyvalg_aar_5 != undefined || er_i_periode_menyvalg_aar_6 != undefined || er_i_periode_menyvalg_aar_7 != undefined || er_i_periode_menyvalg_aar_8 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    else if (aar_etter_forste_periode >= 9) {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined || er_i_periode_menyvalg_aar_4 != undefined || er_i_periode_menyvalg_aar_5 != undefined || er_i_periode_menyvalg_aar_6 != undefined || er_i_periode_menyvalg_aar_7 != undefined || er_i_periode_menyvalg_aar_8 != undefined || er_i_periode_menyvalg_aar_9 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    if (er_i_periode_menyvalg) {
      klubber_med_i_ranking_menyvalg.push(menyvalg[i][0])
    }
  }
  let klubber_allerede_lagt_til = []
  let NA_poeng_og_assosiasjon = regn_ut_NA_poeng()
  let klubb_i_ranking_periode = "";
  if (aar_etter_forste_periode <= 8) {
    for (i = 0; i < klubb_koeffisienter_1112_2021.length; i++) {
      if (aar_etter_forste_periode == -1) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][2] || klubb_koeffisienter_1112_2021[i][3] || klubb_koeffisienter_1112_2021[i][4] || klubb_koeffisienter_1112_2021[i][5] || klubb_koeffisienter_1112_2021[i][6] || klubb_koeffisienter_1112_2021[i][7] || klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 0) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][3] || klubb_koeffisienter_1112_2021[i][4] || klubb_koeffisienter_1112_2021[i][5] || klubb_koeffisienter_1112_2021[i][6] || klubb_koeffisienter_1112_2021[i][7] || klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 1) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][4] || klubb_koeffisienter_1112_2021[i][5] || klubb_koeffisienter_1112_2021[i][6] || klubb_koeffisienter_1112_2021[i][7] || klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 2) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][5] || klubb_koeffisienter_1112_2021[i][6] || klubb_koeffisienter_1112_2021[i][7] || klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 3) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][6] || klubb_koeffisienter_1112_2021[i][7] || klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 4) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][7] || klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 5) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 6) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 7) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 8) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 9) {klubb_i_ranking_periode = true}
      if (klubb_i_ranking_periode) {
        let assos_ranking_array = [];
        let klubbnavn = (klubb_koeffisienter_1112_2021[i][0]);
  
        assos_ranking_array.push(klubbnavn)
  

        let sesong10 = "";
        if (aar_etter_forste_periode == -1) {sesong10 = klubb_koeffisienter_1112_2021[i][11]}
        let sesong9 = (klubb_koeffisienter_1112_2021[i][11 + aar_etter_forste_periode] || "");
        let sesong8 = (klubb_koeffisienter_1112_2021[i][10 + aar_etter_forste_periode] || "");
        let sesong7 = (klubb_koeffisienter_1112_2021[i][9 + aar_etter_forste_periode] || "");
        let sesong6 = (klubb_koeffisienter_1112_2021[i][8 + aar_etter_forste_periode] || "");
        let sesong5 = (klubb_koeffisienter_1112_2021[i][7 + aar_etter_forste_periode] || "");
        let sesong4 = (klubb_koeffisienter_1112_2021[i][6 + aar_etter_forste_periode] || "");
        let sesong3 = (klubb_koeffisienter_1112_2021[i][5 + aar_etter_forste_periode] || "");
        let sesong2 = (klubb_koeffisienter_1112_2021[i][4 + aar_etter_forste_periode] || "");
        let sesong1 = (klubb_koeffisienter_1112_2021[i][3 + aar_etter_forste_periode] || "");
        if (klubber_med_i_ranking_menyvalg.includes(klubb_koeffisienter_1112_2021[i][0])) {
          for (p = 0; p < menyvalg.length; p++) {
            if (menyvalg[p][0] == klubb_koeffisienter_1112_2021[i][0]) {
              // sesong10 = menyvalg[p][9 + ((aar_etter_forste_periode) * antall_MV_elem)]
              // if (aar_etter_forste_periode >= 1) {sesong9 = menyvalg[p][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)]}
              // if (aar_etter_forste_periode >= 2) {sesong8 = menyvalg[p][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)]}
              // if (aar_etter_forste_periode >= 3) {sesong7 = menyvalg[p][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)]}
              // if (aar_etter_forste_periode >= 4) {sesong6 = menyvalg[p][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)]}
              // if (aar_etter_forste_periode >= 5) {sesong5 = menyvalg[p][9 + ((aar_etter_forste_periode - 5) * antall_MV_elem)]}
              // if (aar_etter_forste_periode >= 6) {sesong4 = menyvalg[p][9 + ((aar_etter_forste_periode - 6) * antall_MV_elem)]}
              // if (aar_etter_forste_periode >= 7) {sesong3 = menyvalg[p][9 + ((aar_etter_forste_periode - 7) * antall_MV_elem)]}
              // if (aar_etter_forste_periode >= 8) {sesong2 = menyvalg[p][9 + ((aar_etter_forste_periode - 8) * antall_MV_elem)]}
              // if (aar_etter_forste_periode >= 9) {sesong1 = menyvalg[p][9 + ((aar_etter_forste_periode - 9) * antall_MV_elem)]}
              sesong10 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode) * antall_MV_elem), 7 + ((aar_etter_forste_periode) * antall_MV_elem)) , aar_etter_forste_periode);
              if (aar_etter_forste_periode >= 1) {sesong9 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 1) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 1) * antall_MV_elem)) , aar_etter_forste_periode - 1);}
              if (aar_etter_forste_periode >= 2) {sesong8 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 2) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 2) * antall_MV_elem)) , aar_etter_forste_periode - 2);}
              if (aar_etter_forste_periode >= 3) {sesong7 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 3) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 3) * antall_MV_elem)) , aar_etter_forste_periode - 3);}
              if (aar_etter_forste_periode >= 4) {sesong6 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 4) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 4) * antall_MV_elem)) , aar_etter_forste_periode - 4);}
              if (aar_etter_forste_periode >= 5) {sesong5 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 5) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 5) * antall_MV_elem)) , aar_etter_forste_periode - 5);}
              if (aar_etter_forste_periode >= 6) {sesong4 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 6) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 6) * antall_MV_elem)) , aar_etter_forste_periode - 6);}
              if (aar_etter_forste_periode >= 7) {sesong3 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 7) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 7) * antall_MV_elem)) , aar_etter_forste_periode - 7);}
              if (aar_etter_forste_periode >= 8) {sesong2 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 8) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 8) * antall_MV_elem)) , aar_etter_forste_periode - 8);}
              if (aar_etter_forste_periode >= 9) {sesong1 = regnUtKlubbKoeff(menyvalg[p].slice(2 + ((aar_etter_forste_periode - 9) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 9) * antall_MV_elem)) , aar_etter_forste_periode - 9);}
            }
          }
        }
        let tittel_poeng = 0;
        aar_etter_forste_periode = parseInt(aar_etter_forste_periode)
        for (p = 0; p < menyvalg.length; p++) {
          if (assos_ranking_array == menyvalg[p][0]) {
            for (b = 0; b < (menyvalg[p].length - 2)/antall_MV_elem; b++) {
              if (menyvalg[p][2 + antall_MV_elem*b]) {
                if (menyvalg[p][2 + antall_MV_elem*b].split(',').includes('b33') && ((-b+aar_etter_forste_periode) >= 0)) {
                  if (-b+aar_etter_forste_periode > aar_etter_forste_periode-5) {
                    tittel_poeng += 12
                  }
                  else if (-b+aar_etter_forste_periode+2022 >= 1993) {
                    tittel_poeng += 8
                  }
                  else {
                    tittel_poeng += 4
                  }
                }
                else if (menyvalg[p][2 + antall_MV_elem*b].split(',').includes('b34') && ((-b+aar_etter_forste_periode) >= 0)) {
                  if (-b+aar_etter_forste_periode > aar_etter_forste_periode-5) {
                    tittel_poeng += 3
                  }
                  else if (-b+aar_etter_forste_periode+2022 >= 1993) {
                    tittel_poeng += 2
                  }
                  else {
                    tittel_poeng += 1
                  }
                }
              }
            }
          }
        }
        for (p = 0; p < ucl_mestere.length; p++) {
          if (ucl_mestere[p][1] == assos_ranking_array) {
            if (ucl_mestere[p][0] >= (aar_etter_forste_periode+2018)) {
              tittel_poeng += 12
            }
            else if (ucl_mestere[p][0] >= (1993)) {
              tittel_poeng += 8
            }
            else {
              tittel_poeng += 4
            }
          }
        }
        for (p = 0; p < uel_mestere.length; p++) {
          if (uel_mestere[p][1] == assos_ranking_array) {
            if (uel_mestere[p][0] >= (aar_etter_forste_periode+2018)) {
              tittel_poeng += 3
            }
            else if (uel_mestere[p][0] >= (1993)) {
              tittel_poeng += 2
            }
            else {
              tittel_poeng += 1
            }
          }
        }
        for (p = 0; p < cup_vinner_cup_mestere.length; p++) {
          if (cup_vinner_cup_mestere[p][1] == assos_ranking_array) {
            if (cup_vinner_cup_mestere[p][0] >= (1993)) {
              tittel_poeng += 2
            }
            else {
              tittel_poeng += 1
            }
          }
        }



        let poeng = (((sesong10||0)+(sesong9||0)+(sesong8||0)+(sesong7||0)+(sesong6||0)+(sesong5||0)+(sesong4||0)+(sesong3||0)+(sesong2||0)+(sesong1||0) /*+ tittel_poeng*/).toFixed(3))
        assos_ranking_array.push(poeng)
        for (p = 0; p < landskoeffisienter.length; p++) {
          if (landskoeffisienter[p][0] == klubb_koeffisienter_1112_2021[i][1]) {
            assos_ranking_array.push(NA_poeng_og_assosiasjon[p][0])
            assos_ranking_array.push(NA_poeng_og_assosiasjon[p][2])
            assos_ranking_array.push((Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/5))/1000).toFixed(3))  
          }
        }
        if (typeof(sesong10) == 'number') {
          assos_ranking_array.push(parseFloat(sesong10).toFixed(3))} else {
          assos_ranking_array.push(sesong10)}
        if (typeof(sesong9) == 'number') {
          assos_ranking_array.push(parseFloat(sesong9).toFixed(3))} else {
          assos_ranking_array.push(sesong9)}
        if (typeof(sesong8) == 'number') {
          assos_ranking_array.push(parseFloat(sesong8).toFixed(3))} else {
          assos_ranking_array.push(sesong8)}
        if (typeof(sesong7) == 'number') {
          assos_ranking_array.push(parseFloat(sesong7).toFixed(3))} else {
          assos_ranking_array.push(sesong7)}
        if (typeof(sesong6) == 'number') {
          assos_ranking_array.push(parseFloat(sesong6).toFixed(3))} else {
          assos_ranking_array.push(sesong6)}
        if (typeof(sesong5) == 'number') {
          assos_ranking_array.push(parseFloat(sesong5).toFixed(3))} else {
          assos_ranking_array.push(sesong5)}
        if (typeof(sesong4) == 'number') {
          assos_ranking_array.push(parseFloat(sesong4).toFixed(3))} else {
          assos_ranking_array.push(sesong4)}
        if (typeof(sesong3) == 'number') {
          assos_ranking_array.push(parseFloat(sesong3).toFixed(3))} else {
          assos_ranking_array.push(sesong3)}
        if (typeof(sesong2) == 'number') {
          assos_ranking_array.push(parseFloat(sesong2).toFixed(3))} else {
          assos_ranking_array.push(sesong2)}
        if (typeof(sesong1) == 'number') {
          assos_ranking_array.push(parseFloat(sesong1).toFixed(3))} else {
          assos_ranking_array.push(sesong1)}
        assos_ranking_array.push(tittel_poeng)

        ranking_array.push(assos_ranking_array)
        klubber_allerede_lagt_til.push(klubb_koeffisienter_1112_2021[i][0])
      }
    }
  }
  for (i = 0; i < menyvalg.length; i++) {
    if (klubber_allerede_lagt_til.includes(menyvalg[i][0])) {}
    else {
      let assos_ranking_array = [];
      assos_ranking_array.push(menyvalg[i][0])
      let sesong10 = ""
      let sesong10_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode) * antall_MV_elem), 7 + ((aar_etter_forste_periode) * antall_MV_elem));
      let sesong9 = ""
      let sesong9_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 1) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 1) * antall_MV_elem));
      let sesong8 = ""
      let sesong8_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 2) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 2) * antall_MV_elem));
      let sesong7 = ""
      let sesong7_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 3) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 3) * antall_MV_elem));
      let sesong6 = ""
      let sesong6_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 4) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 4) * antall_MV_elem));
      let sesong5 = ""
      let sesong5_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 5) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 5) * antall_MV_elem));
      let sesong4 = ""
      let sesong4_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 6) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 6) * antall_MV_elem));
      let sesong3 = ""
      let sesong3_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 7) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 7) * antall_MV_elem));
      let sesong2 = ""
      let sesong2_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 8) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 8) * antall_MV_elem));
      let sesong1 = ""
      let sesong1_data = menyvalg[i].slice(2 + ((aar_etter_forste_periode - 9) * antall_MV_elem), 7 + ((aar_etter_forste_periode - 9) * antall_MV_elem));
      if (aar_etter_forste_periode >= 0 && sesong10_data.length != 0 && sesong10_data != [,,,,] && sesong10_data != ",,,,") {
        sesong10 = regnUtKlubbKoeff(sesong10_data, aar_etter_forste_periode)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode) * antall_MV_elem)] == 0) {sesong10 = 0}
      if (aar_etter_forste_periode >= 1 && sesong9_data.length != 0 && sesong9_data != [,,,,] && sesong9_data != ",,,,") {
        sesong9 = regnUtKlubbKoeff(sesong9_data, aar_etter_forste_periode - 1)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)] == 0) {sesong9 = 0}
      if (aar_etter_forste_periode >= 2 && sesong8_data.length != 0 && sesong8_data != [,,,,] && sesong8_data != ",,,,") {
        sesong8 = regnUtKlubbKoeff(sesong8_data, aar_etter_forste_periode - 2)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)] == 0) {sesong8 = 0}
      if (aar_etter_forste_periode >= 3 && sesong7_data.length != 0 && sesong7_data != [,,,,] && sesong7_data != ",,,,") {
        sesong7 = regnUtKlubbKoeff(sesong7_data, aar_etter_forste_periode - 3)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)] == 0) {sesong7 = 0}
      if (aar_etter_forste_periode >= 4 && sesong6_data.length != 0 && sesong6_data != [,,,,] && sesong6_data != ",,,,") {
        sesong6 = regnUtKlubbKoeff(sesong6_data, aar_etter_forste_periode - 4)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)] == 0) {sesong6 = 0}
      if (aar_etter_forste_periode >= 5 && sesong5_data.length != 0 && sesong5_data != [,,,,] && sesong5_data != ",,,,") {
        sesong5 = regnUtKlubbKoeff(sesong5_data, aar_etter_forste_periode - 5)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 5) * antall_MV_elem)] == 0) {sesong5 = 0}
      if (aar_etter_forste_periode >= 6 && sesong4_data.length != 0 && sesong4_data != [,,,,] && sesong4_data != ",,,,") {
        sesong4 = regnUtKlubbKoeff(sesong4_data, aar_etter_forste_periode - 6)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 6) * antall_MV_elem)] == 0) {sesong4 = 0}
      if (aar_etter_forste_periode >= 7 && sesong3_data.length != 0 && sesong3_data != [,,,,] && sesong3_data != ",,,,") {
        sesong3 = regnUtKlubbKoeff(sesong3_data, aar_etter_forste_periode - 7)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 7) * antall_MV_elem)] == 0) {sesong3 = 0}
      if (aar_etter_forste_periode >= 8 && sesong2_data.length != 0 && sesong2_data != [,,,,] && sesong2_data != ",,,,") {
        sesong2 = regnUtKlubbKoeff(sesong2_data, aar_etter_forste_periode - 8)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 8) * antall_MV_elem)] == 0) {sesong2 = 0}
      if (aar_etter_forste_periode >= 9 && sesong1_data.length != 0 && sesong1_data != [,,,,] && sesong1_data != ",,,,") {
        sesong1 = regnUtKlubbKoeff(sesong1_data, aar_etter_forste_periode - 9)}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 9) * antall_MV_elem)] == 0) {sesong1 = 0}
        if (sesong1 !== false || sesong2 !== false || sesong3 !== false || sesong4 !== false || sesong5 !== false || sesong6 !== false || sesong7 !== false || sesong8 !== false || sesong9 !== false || sesong10 !== false) {

          let tittel_poeng = 0;

          for (p = 0; p < menyvalg.length; p++) {
            if (assos_ranking_array == menyvalg[p][0]) {
              for (b = 0; b < (menyvalg[p].length - 2)/antall_MV_elem; b++) {
                if (menyvalg[p][2 + antall_MV_elem*b]) {
                  if (menyvalg[p][2 + antall_MV_elem*b].split(',').includes('b33') && ((-b+aar_etter_forste_periode) >= 0)) {
                    if (-b+aar_etter_forste_periode > aar_etter_forste_periode-5) {
                      tittel_poeng += 12
                    }
                    else if (-b+aar_etter_forste_periode+2022 >= 1993) {
                      tittel_poeng += 8
                    }
                    else {
                      tittel_poeng += 4
                    }
                  }
                  else if (menyvalg[p][2 + antall_MV_elem*b].split(',').includes('b34') && ((-b+aar_etter_forste_periode) >= 0)) {
                    if (-b+aar_etter_forste_periode > aar_etter_forste_periode-5) {
                      tittel_poeng += 3
                    }
                    else if (-b+aar_etter_forste_periode+2022 >= 1993) {
                      tittel_poeng += 2
                    }
                    else {
                      tittel_poeng += 1
                    }
                  }
                }
              }
            }
          }
          for (p = 0; p < ucl_mestere.length; p++) {
            if (ucl_mestere[p][1] == assos_ranking_array) {
              if (ucl_mestere[p][0] >= (aar_etter_forste_periode+2018)) {
                tittel_poeng += 12
              }
              else if (ucl_mestere[p][0] >= (1993)) {
                tittel_poeng += 8
              }
              else {
                tittel_poeng += 4
              }
            }
          }
          for (p = 0; p < uel_mestere.length; p++) {
            if (uel_mestere[p][1] == assos_ranking_array) {
              if (uel_mestere[p][0] >= (aar_etter_forste_periode+2018)) {
                tittel_poeng += 3
              }
              else if (uel_mestere[p][0] >= (1993)) {
                tittel_poeng += 2
              }
              else {
                tittel_poeng += 1
              }
            }
          }
          for (p = 0; p < cup_vinner_cup_mestere.length; p++) {
            if (cup_vinner_cup_mestere[p][1] == assos_ranking_array) {
              if (cup_vinner_cup_mestere[p][0] >= (1993)) {
                tittel_poeng += 2
              }
              else {
                tittel_poeng += 1
              }
            }
          }
          let kpoeng = ((sesong10||0)+(sesong9||0)+(sesong8||0)+(sesong7||0)+(sesong6||0)+(sesong5||0)+(sesong4||0)+(sesong3||0)+(sesong2||0)+(sesong1||0) /*+ tittel_poeng*/);
          if (kpoeng == 0) {
            assos_ranking_array.push(0.0001)}
          else {assos_ranking_array.push(kpoeng.toFixed(3))}
          for (p = 0; p < landskoeffisienter.length; p++) {
            if (landskoeffisienter[p][0] == menyvalg[i][1]) {
              assos_ranking_array.push(NA_poeng_og_assosiasjon[p][0])
              assos_ranking_array.push(NA_poeng_og_assosiasjon[p][2])
              assos_ranking_array.push((Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/5))/1000).toFixed(3))
            }
          }
          if (sesong10 !== "" || sesong9 !== "" || sesong8 !== "" || sesong7 !== "" || sesong6 !== "" || sesong5 !== "" || sesong4 !== "" || sesong3 !== "" || sesong2 !== "" || sesong1 !== ""/* || tittel_poeng != 0*/) {
            if (sesong10 !== "") {
              sesong10 = sesong10.toFixed(3)}
            if (sesong9 !== "") {
              sesong9 = sesong9.toFixed(3)}
            if (sesong8 !== "") {
              sesong8 = sesong8.toFixed(3)}
            if (sesong7 !== "") {
              sesong7 = sesong7.toFixed(3)}
            if (sesong6 !== "") {
              sesong6 = sesong6.toFixed(3)}
            if (sesong5 !== "") {
              sesong5 = sesong5.toFixed(3)}
            if (sesong4 !== "") {
              sesong4 = sesong4.toFixed(3)}
            if (sesong3 !== "") {
              sesong3 = sesong3.toFixed(3)}
            if (sesong2 !== "") {
              sesong2 = sesong2.toFixed(3)}
            if (sesong1 !== "") {
              sesong1 = sesong1.toFixed(3)}
            assos_ranking_array.push(sesong10);
            assos_ranking_array.push(sesong9);
            assos_ranking_array.push(sesong8);
            assos_ranking_array.push(sesong7);
            assos_ranking_array.push(sesong6);
            assos_ranking_array.push(sesong5);
            assos_ranking_array.push(sesong4);
            assos_ranking_array.push(sesong3);
            assos_ranking_array.push(sesong2);
            assos_ranking_array.push(sesong1);
            assos_ranking_array.push(tittel_poeng)
            ranking_array.push(assos_ranking_array)
            klubber_allerede_lagt_til.push(menyvalg[i][0])
            // if (filter_land_før.includes(assos_ranking_array[2]) || filter_land_før == '') {
            // }
          }
        }
    }
  }
  for (i = 0; i < ucl_mestere.length; i++) {
    if (!klubber_allerede_lagt_til.includes(ucl_mestere[i][1])) {
      tittel_poeng = 0;
      for (p = 0; p < landskoeffisienter.length; p++) {
        if (landskoeffisienter[p][0] == ucl_mestere[i][2]) {
          break;
        }
      }
      if (ucl_mestere[i][0] >= (aar_etter_forste_periode+2018)) {
        tittel_poeng += 12
      }
      else if (ucl_mestere[i][0] >= (1993)) {
        tittel_poeng += 8
      }
      else {
        tittel_poeng += 4
      }
      let registr_før = false;
      for (j = 0; j < ranking_array.length; j++) {
        if (ranking_array[j][0] == ucl_mestere[i][1]) {
          registr_før = true;
          // ranking_array[j][1] += tittel_poeng;
          // ranking_array[j][15] += tittel_poeng;
          break
        }
      }
      // if (!registr_før) {
      //   ranking_array.push([ucl_mestere[i][1],tittel_poeng,NA_poeng_og_assosiasjon[p][0],NA_poeng_og_assosiasjon[p][2],(Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/5))/1000).toFixed(3),"","","","","","","","","","",/*tittel_poeng*/0])
      // }
    }
  }
  for (i = 0; i < uel_mestere.length; i++) {
    if (!klubber_allerede_lagt_til.includes(uel_mestere[i][1])) {
      tittel_poeng = 0;
      for (p = 0; p < landskoeffisienter.length; p++) {
        if (landskoeffisienter[p][0] == uel_mestere[i][2]) {
          break;
        }
      }
      if (uel_mestere[i][0] >= (aar_etter_forste_periode+2018)) {
        tittel_poeng += 3
      }
      else if (uel_mestere[i][0] >= (1993)) {
        tittel_poeng += 2
      }
      else {
        tittel_poeng += 1
      }
      let registr_før = false;
      for (j = 0; j < ranking_array.length; j++) {
        if (ranking_array[j][0] == uel_mestere[i][1]) {
          registr_før = true;
          // ranking_array[j][1] += tittel_poeng;
          // ranking_array[j][15] += tittel_poeng;
          break
        }
      }
      // if (!registr_før) {
      //   ranking_array.push([uel_mestere[i][1],tittel_poeng,NA_poeng_og_assosiasjon[p][0],NA_poeng_og_assosiasjon[p][2],(Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/5))/1000).toFixed(3),"","","","","","","","","","",/*tittel_poeng*/0])
      // }
    }
  }
  for (i = 0; i < cup_vinner_cup_mestere.length; i++) {
    if (!klubber_allerede_lagt_til.includes(cup_vinner_cup_mestere[i][1])) {
      tittel_poeng = 0;
      for (p = 0; p < landskoeffisienter.length; p++) {
        if (landskoeffisienter[p][0] == cup_vinner_cup_mestere[i][2]) {
          break;
        }
      }
      if (cup_vinner_cup_mestere[i][0] >= (1993)) {
        tittel_poeng += 2
      }
      else {
        tittel_poeng += 1
      }
      let registr_før = false;
      for (j = 0; j < ranking_array.length; j++) {
        if (ranking_array[j][0] == cup_vinner_cup_mestere[i][1]) {
          registr_før = true;
          // ranking_array[j][1] += tittel_poeng;
          // ranking_array[j][15] += tittel_poeng;
          break
        }
      }
      // if (!registr_før) {
			// ranking_array.push([cup_vinner_cup_mestere[i][1],tittel_poeng,NA_poeng_og_assosiasjon[p][0],NA_poeng_og_assosiasjon[p][2],(Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/5))/1000).toFixed(3),"","","","","","","","","","",/*tittel_poeng*/0])
      // }
    }
  }
  for (i = 0; i < ranking_array.length; i++) {
    if (!klubber_allerede_lagt_til.includes(ranking_array[i][0])) {
      tittel_poeng = 0;
      for (p = 0; p < menyvalg.length; p++) {
        if (ranking_array[i][0] == menyvalg[p][0]) {
          for (b = 0; b < (menyvalg[p].length - 2)/antall_MV_elem; b++) {
            if (menyvalg[p][2 + antall_MV_elem*b]) {
              if (menyvalg[p][2 + antall_MV_elem*b].split(',').includes('b33')) {
                if (-b+aar_etter_forste_periode > aar_etter_forste_periode-5) {
                  tittel_poeng += 12
                }
                else if (-b+aar_etter_forste_periode+2022 >= 1993) {
                  tittel_poeng += 8
                }
                else {
                  tittel_poeng += 4
                }
              }
              else if (menyvalg[p][2 + antall_MV_elem*b].split(',').includes('b34')) {
                if (-b+aar_etter_forste_periode > aar_etter_forste_periode-5) {
                  tittel_poeng += 3
                }
                else if (-b+aar_etter_forste_periode+2022 >= 1993) {
                  tittel_poeng += 2
                }
                else {
                  tittel_poeng += 1
                }
              }
            }
          }
          // if (tittel_poeng > 0) {
          //   ranking_array[i][1] += tittel_poeng;
          //   ranking_array[i][15] += tittel_poeng;
          // }
        }
      }

      // if (ranking_array[i][1] <= ranking_array[i][4]) {
      //   ranking_array.splice(i, 1);
      //   i--;
      // }
    }
  }
  for (p = 0; p < landskoeffisienter.length; p++) {
    ranking_array.push(["","",NA_poeng_og_assosiasjon[p][0],NA_poeng_og_assosiasjon[p][2],(Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/5))/1000).toFixed(3),"","","","","","","","","","",0])
  }
	for (let x = 0; x < ranking_array.length; x++) {
		for (let y = 5; y <= 14; y++) {
			if (((ranking_array[x][y] === '' || !ranking_array[x][y])) && ranking_array[x][y] !== 0) {ranking_array[x][y] = "0.0"}
		}
	}
	for (p = 0; p < ranking_array.length; p++) {
    if (ranking_array[p][1] == "0.000") {
      ranking_array[p][1] = 0.0001}
  }
  ranking_array.sort(sortFunction_tall_1_flere_desimal_original);
  let rangering = 0;
  for (p = 0; p < ranking_array.length; p++) {
    let inaktiv_klubb = (ranking_array[p][5] == "0.0" && ranking_array[p][6] == "0.0" && ranking_array[p][7] == "0.0" && ranking_array[p][8] == "0.0" && ranking_array[p][9] == "0.0" && ranking_array[p][10] == "0.0" && ranking_array[p][11] == "0.0" && ranking_array[p][12] == "0.0" && ranking_array[p][13] == "0.0" && ranking_array[p][14] == "0.0")
    /* Kommenter ut " || parseFloat(ranking_array[p][1]) > parseFloat(ranking_array[p][4])" dersom du ønsker at urangerte klubber med nok tittelpoeng IKKE skal være rangert */
    if (ranking_array[p][1] != "" && (!inaktiv_klubb || parseFloat(ranking_array[p][1]) > parseFloat(ranking_array[p][4]))) {
      rangering += 1;
    }
    ranking_array[p].push(p+1)
    ranking_array[p].push(rangering)
    if (p > 0) {
      let poeng_lik = ((Math.max(ranking_array[p][1], ranking_array[p][4])) == (Math.max(ranking_array[p-1][1], ranking_array[p-1][4])))
      let kolonne1_lik1 = (ranking_array[p][5] == ranking_array[p-1][5] || (ranking_array[p][5] == "0.0" && ranking_array[p-1][5] == "0.000") || (ranking_array[p][5] == "0.000" && ranking_array[p-1][5] == "0.0"))
      let kolonne1_lik2 = (ranking_array[p][6] == ranking_array[p-1][6] || (ranking_array[p][6] == "0.0" && ranking_array[p-1][6] == "0.000") || (ranking_array[p][6] == "0.000" && ranking_array[p-1][6] == "0.0"))
      let kolonne1_lik3 = (ranking_array[p][7] == ranking_array[p-1][7] || (ranking_array[p][7] == "0.0" && ranking_array[p-1][7] == "0.000") || (ranking_array[p][7] == "0.000" && ranking_array[p-1][7] == "0.0"))
      let kolonne1_lik4 = (ranking_array[p][8] == ranking_array[p-1][8] || (ranking_array[p][8] == "0.0" && ranking_array[p-1][8] == "0.000") || (ranking_array[p][8] == "0.000" && ranking_array[p-1][8] == "0.0"))
      let kolonne1_lik5 = (ranking_array[p][9] == ranking_array[p-1][9] || (ranking_array[p][9] == "0.0" && ranking_array[p-1][9] == "0.000") || (ranking_array[p][9] == "0.000" && ranking_array[p-1][9] == "0.0"))
      let kolonne1_lik6 = (ranking_array[p][10] == ranking_array[p-1][10] || (ranking_array[p][10] == "0.0" && ranking_array[p-1][10] == "0.000") || (ranking_array[p][10] == "0.000" && ranking_array[p-1][10] == "0.0"))
      let kolonne1_lik7 = (ranking_array[p][11] == ranking_array[p-1][11] || (ranking_array[p][11] == "0.0" && ranking_array[p-1][11] == "0.000") || (ranking_array[p][11] == "0.000" && ranking_array[p-1][11] == "0.0"))
      let kolonne1_lik8 = (ranking_array[p][12] == ranking_array[p-1][12] || (ranking_array[p][12] == "0.0" && ranking_array[p-1][12] == "0.000") || (ranking_array[p][12] == "0.000" && ranking_array[p-1][12] == "0.0"))
      let kolonne1_lik9 = (ranking_array[p][13] == ranking_array[p-1][13] || (ranking_array[p][13] == "0.0" && ranking_array[p-1][13] == "0.000") || (ranking_array[p][13] == "0.000" && ranking_array[p-1][13] == "0.0"))
      let kolonne1_lik10 = (ranking_array[p][14] == ranking_array[p-1][14] || (ranking_array[p][14] == "0.0" && ranking_array[p-1][14] == "0.000") || (ranking_array[p][14] == "0.000" && ranking_array[p-1][14] == "0.0"))
      let na_lik = ((ranking_array[p][3] == ranking_array[p-1][3]));
      let na_større = (Math.max(ranking_array[p][1], ranking_array[p][4]) == ranking_array[p][4]) && (Math.max(ranking_array[p-1][1], ranking_array[p-1][4]) == ranking_array[p-1][4]);
			// Gjør om " && !na_større" til kommentar hvis lag med eksakt lik klubb-rangering, men fra ulikt rangerte land skal være likt rangert.
      if (((poeng_lik && !na_større) || (na_lik && na_større)) && kolonne1_lik1 && kolonne1_lik2 && kolonne1_lik3 && kolonne1_lik4 && kolonne1_lik5 && kolonne1_lik6 && kolonne1_lik7 && kolonne1_lik8 && kolonne1_lik9 && kolonne1_lik10) {
				// Fjern if-setningen under, og gjør alt under her om til kode hvis lag med eksakt lik klubb-rangering, men fra ulikt rangerte land skal være likt rangert.
				if (na_lik) {
					ranking_array[p].splice(16,1,ranking_array[p-1][16])
					ranking_array[p].splice(17,1,ranking_array[p-1][17])
				}
				// if ((poeng_lik && !na_større) || (na_lik && na_større)) {
				// 	if(egentligRangeringKlubb.includes(ranking_array[p-1][0])) {
				// 		egentligRangeringKlubb.push(ranking_array[p][0]);
				// 		egentligRangering.push(egentligRangering[egentligRangering.length-1]);
				// 	}
				// 	ranking_array[p].splice(16,1,ranking_array[p-1][16])
				// 	ranking_array[p].splice(17,1,ranking_array[p-1][17])
				// }
				// else if (ranking_array[p][0] && ranking_array[p-1][0]){
				// 	if(egentligRangeringKlubb.includes(ranking_array[p-1][0])) {
				// 		egentligRangeringKlubb.push(ranking_array[p][0]);
				// 		egentligRangering.push(egentligRangering[egentligRangering.length-1]);
				// 	} else {
				// 		egentligRangeringKlubb.push(ranking_array[p][0]);
				// 		egentligRangering.push(ranking_array[p-1][17]);
				// 	}
				// }
      }
    }
  }
  let ranking_array_land_filter = []
  for (p = 0; p < ranking_array.length; p++) {
    if (filter_land_før.includes(ranking_array[p][2]) || filter_land_før == '') {
      ranking_array_land_filter.push(ranking_array[p])
    }
  }
  ranking_array = ranking_array_land_filter
  sorter_etter_sesong(ranking_array)
}


// Endre meta-beskrivelsene
// var descval = document.getElementById('tabell_hoved').innerText;

const table = document.querySelector('table')
const arr = [...table.rows].map(r => [...r.querySelectorAll('td, th')].map(td => td.textContent))
arr[0][3] = 'Country'
arr[0][7] = arr[0][7].slice(0, -1)
arr[0][8] = arr[0][8].slice(0, -1)
arr[0][9] = arr[0][9].slice(0, -1)
arr[0][10] = arr[0][10].slice(0, -1)
arr[0][11] = arr[0][11].slice(0, -1)
arr[0][12] = arr[0][12].slice(0, -1)
arr[0][13] = arr[0][13].slice(0, -1)
arr[0][14] = arr[0][14].slice(0, -1)
arr[0][15] = arr[0][15].slice(0, -1)
arr[0][16] = arr[0][16].slice(0, -1)
for (i = 0; i < arr.length; i++) {
  arr[i].splice(0,1)
}
var link = document.createElement('meta');  link.setAttribute('name', 'description');  link.content = arr; document.getElementsByTagName('head')[0].appendChild(link);







$('th').on('click', function(){
  var column = $(this).data('column')
  var order = $(this).data('order')
  let tekst = $(this).text()
  if(order == 'desc') {
      $(this).data('order', "asc")
  }
  else {
      $(this).data('order', "desc")
  }
  if (column == 'land') {
    tekst = '<img class="jordklode" src="media/UEFA/GLOBE.svg" alt="Country">'
  }
  if (column == 'na_poeng') {
    tekst = '<abbr data_title="20% of country coefficient points for this period">NA</abbr>'
  }
  if (column == 'tittel_poeng') {
    tekst = '<abbr data_title="Historic title points">Title</abbr>'
  }
  if (column != undefined) {
    sorter(column, order, tekst, ranking_array)
  }
})


function sorter_etter_sesong() {
  let column = sessionStorage.getItem('kolonne_ti_års') || 'id_nr'
  let order = sessionStorage.getItem('rekkefølge_ti_års') || 'asc'
	if (column == 'tittel_poeng') {
		column = 'id_nr';
		order = 'asc';
		sessionStorage.setItem('kolonne_ti_års', column)
		sessionStorage.setItem('rekkefølge_ti_års', order)
	}
  if(order == 'desc') {
    document.getElementById(column).dataset.order = 'asc';
  }
  else {
    document.getElementById(column).dataset.order = 'desc';
  }
  if (column == 'land') {
    var tekst = '<img class="jordklode" src="media/UEFA/GLOBE.svg" alt="Country">'
  } else if (column == 'na_poeng') {
    var tekst = '<abbr data_title="20% of country coefficient points for this period">NA</abbr>'
  } else if (column == 'tittel_poeng') {
    var tekst = '<abbr data_title="Historic title points">Title</abbr>'
  }else {var tekst = document.getElementById(column).innerText}
  sorter(column, order, tekst, ranking_array)
}



function sorter(column, order, tekst, ranking_array) {
  if (column == 'id_nr') {
    i = 16
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  if (column == 'klubb') {
    i = 0
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  if (column == 'land') {
    i = 16
    ranking_array.sort(sortFunction_tall_2_flere_desimal)
    i = 2
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  if (column == 'poeng') {
    i = 1
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  if (column == 'na_poeng') {
    i = 16
    if (order == "desc") {ranking_array.sort(sortFunction_tall_2_flere_desimal);}
    else {ranking_array.sort(sortFunction_tall_1_flere_desimal);}
    i = 3
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'tittel_poeng') {
    i = 15
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong1') {
    i = 5
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong2') {
    i = 6
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong3') {
    i = 7
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong4') {
    i = 8
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong5') {
    i = 9
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong6') {
    i = 10
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong7') {
    i = 11
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong8') {
    i = 12
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong9') {
    i = 13
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong10', opp_ned_pil_midten)
  }
  else if (column == 'sesong10') {
    i = 14
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('tittel_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong6', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong7', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong8', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong9', opp_ned_pil_midten)
  }
  if(order == 'desc') {
    if (column != 'klubb' && column != 'land') {
      tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
      if (column == 'poeng') {
				ranking_array.sort(sortFunction_tall_1_flere_desimal_nyligste);
        i = 1;
				ranking_array.sort(sortFunction_tall_1_flere_desimal_land);
      }
			else if (column == 'na_poeng') {ranking_array.sort(sortFunction_tall_2_flere_desimal);}
      else {ranking_array.sort(sortFunction_tall_1_flere_desimal);}
    }
    else {
      tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
      if (column != 'id_nr') {ranking_array.sort(sortFunction_1);}
    }
  }
  else {
    if (column != 'klubb' && column != 'land') {
      tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
      if (column == 'poeng') {
				ranking_array.sort(sortFunction_tall_2_flere_desimal_nyligste);
        i = 1;
				ranking_array.sort(sortFunction_tall_2_flere_desimal_land);
      }
      else if (column == 'na_poeng') {ranking_array.sort(sortFunction_tall_1_flere_desimal);}
      else {ranking_array.sort(sortFunction_tall_2_flere_desimal);}
    }
    else {
      tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
      ranking_array.sort(sortFunction_2);
    }
  }
  for (k = 0; k < ranking_array.length; k++) {
    for (j = 5; j <= 14; j++) {
      if (ranking_array[k][j] == "0.0001") {ranking_array[k][j] = "0.000"}
    }
  }
  let fortsett = true;
  if  (order == "asc" && i == 16) {
    while (fortsett) {
      fortsett = false;
      for (k = 0; k < ranking_array.length-1; k++) {
        if (ranking_array[k+1][0] == "" && ranking_array[k][0] != "" && Math.max(ranking_array[k][1], ranking_array[k][4]) == Math.max(ranking_array[k+1][1], ranking_array[k+1][4]) && ranking_array[k+1][3] < ranking_array[k][3]) {
          let klubb = ranking_array[k];
          ranking_array[k] = ranking_array[k+1]
          ranking_array[k+1] = klubb
          fortsett = true;
        }
      }
    }
  }
  else if (order == "desc" && i == 16) {
    while (fortsett) {
      fortsett = false;
      for (k = 0; k < ranking_array.length-1; k++) {
        if (ranking_array[k][0] == "" && ranking_array[k+1][0] != "" && Math.max(ranking_array[k+1][1], ranking_array[k+1][4]) == Math.max(ranking_array[k][1], ranking_array[k][4]) && ranking_array[k][3] < ranking_array[k+1][3]) {
          let klubb = ranking_array[k+1];
          ranking_array[k+1] = ranking_array[k]
          ranking_array[k] = klubb
          fortsett = true;
        }
      }
    }
  }
  sessionStorage.setItem('kolonne_ti_års', column)
  sessionStorage.setItem('rekkefølge_ti_års', order)
  document.getElementById(column).innerHTML = tekst;
  if (order == 'desc' || column == 'id_nr' || column == 'land' || column == 'klubb') {
    let land_over = 0;
    for (p = 0; p < ranking_array.length; p++) {
      let inaktiv_klubb = (ranking_array[p][5] == "0.0" && ranking_array[p][6] == "0.0" && ranking_array[p][7] == "0.0" && ranking_array[p][8] == "0.0" && ranking_array[p][9] == "0.0" && ranking_array[p][10] == "0.0" && ranking_array[p][11] == "0.0" && ranking_array[p][12] == "0.0" && ranking_array[p][13] == "0.0" && ranking_array[p][14] == "0.0")
      /* Kommenter ut " && parseFloat(ranking_array[p][1]) <= parseFloat(ranking_array[p][4])" dersom du ønsker at urangerte klubber med nok tittelpoeng IKKE skal være rangert */
      if (ranking_array[p][1] == "" || ranking_array[p][1] == "0.0" || (inaktiv_klubb && parseFloat(ranking_array[p][1]) <= parseFloat(ranking_array[p][4]))) {
        land_over += 1;
        if (ranking_array[p][18] || ranking_array[p][18] == 0) {
          ranking_array[p][18] = "";
        } else {
          ranking_array[p].push("");
        }
      }
      else {
        if (ranking_array[p][18] || ranking_array[p][18] == 0) {
          ranking_array[p][18] = (p+1-land_over);
        } else {
          ranking_array[p].push(p+1-land_over);
        }
      }
    }
  }
  else {
    filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
    let land_over = filter_land_før.length
    if (land_over == 0) {land_over = landskoeffisienter.length}
    for (p = 0; p < ranking_array.length; p++) {
      if (ranking_array[p][1] == "" || ranking_array[p][1] == "0.0") {
        land_over -= 1;
      }
      if (ranking_array[p][18] || ranking_array[p][18] == 0) {
        ranking_array[p][18] = ranking_array.length-p-land_over;
      } else {
        ranking_array[p].push(ranking_array.length-p-land_over);
      }
    }
  }
  if (column == 'sesong1' || column == 'sesong2' || column == 'sesong3' || column == 'sesong4' || column == 'sesong5' || column == 'sesong6' || column == 'sesong7' || column == 'sesong8' || column == 'sesong9' || column == 'sesong10' || column == 'na_poeng' || column == 'poeng' || column == 'tittel_poeng') {
    if (order == 'desc') {
      for (p = 0; p < ranking_array.length; p++) {
        if (p > 0) {
          if (ranking_array[p-1][18] == "" && ranking_array[p][1] != "" && ranking_array[p][1] != "0.0") {
            ranking_array[p-1][18] = p;
          }
          let sesong_koeff1 = ranking_array[p-1][i];
          let sesong_koeff2 = ranking_array[p][i];
          if (sesong_koeff1 == "0.000") {sesong_koeff1 = "0.0"}
          if (sesong_koeff2 == "0.000") {sesong_koeff2 = "0.0"}
          if (sesong_koeff1 == sesong_koeff2) {
            ranking_array[p].splice(18,1,ranking_array[p-1][18])
          }
        }
      }
    }
    else {
      for (p = ranking_array.length - 1; p >= 0; p--) {
        if (p < ranking_array.length - 1) {
          let sesong_koeff1 = ranking_array[p+1][i];
          let sesong_koeff2 = ranking_array[p][i];
          if (sesong_koeff1 == "0.000") {sesong_koeff1 = "0.0"}
          if (sesong_koeff2 == "0.000") {sesong_koeff2 = "0.0"}
          if (sesong_koeff1 == sesong_koeff2) {
            ranking_array[p].splice(18,1,ranking_array[p+1][18])
          }
        }
      }
    }
  }


  byggTabell_test(ranking_array, column, order)
}



function endre_kolonne_overskrift(kolonne, opp_ned_pil) {
  if (kolonne == 'land') {
    if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
      document.getElementById(kolonne).innerHTML = '<img class="jordklode" src="media/UEFA/GLOBE.svg" alt="Country">' + opp_ned_pil
    }
  }
  else if (kolonne == 'na_poeng') {
    if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
      document.getElementById(kolonne).innerHTML = '<abbr data_title="20% of country coefficient points for this period">NA</abbr>' + opp_ned_pil
    }
  }
  else if (kolonne == 'tittel_poeng') {
    if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
      document.getElementById(kolonne).innerHTML = '<abbr data_title="Historic title points">Title</abbr>' + opp_ned_pil
    }
  }
  else if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
    document.getElementById(kolonne).innerHTML = document.getElementById(kolonne).innerText + opp_ned_pil
  }
}



function sortFunction_1(a, b) {
  if (a[i].toLowerCase() === b[i].toLowerCase()) {
    return 0;
  }
  else {
    return (a[i].toLowerCase() > b[i].toLowerCase()) ? -1 : 1;
  }
}
function sortFunction_2(a, b) {
  if (a[i].toLowerCase() === b[i].toLowerCase()) {
    return 0;
  }
  else {
    return (a[i].toLowerCase() < b[i].toLowerCase()) ? -1 : 1;
  }
}
function sortFunction_tall_1_flere_desimal(a, b) {
  let sum_a1 = a[1]
  let sum_a2 = a[4]
  let sum_a = (Math.max(sum_a1, sum_a2))
  let sum_b1 = b[1]
  let sum_b2 = b[4]
  let sum_b = (Math.max(sum_b1, sum_b2))
  if (i >= 5 && i <= 14) {
    if (a[i] == "0.000") {a[i] = 0.0001}
    if (b[i] == "0.000") {b[i] = 0.0001}
  }
  else if (i != 15) {
    if (a[0] == '' && b[0] != '' && b[3] >= a[3] && sum_a == sum_b) {return -1}
    if (b[0] == '' && a[0] != '' && a[3] >= b[3] && sum_b == sum_a) {return 1}
    if (a[5] == "0.0" && a[6] == "0.0" && a[7] == "0.0" && a[8] == "0.0" && a[9] == "0.0" && a[10] == "0.0" && a[11] == "0.0" && a[12] == "0.0" && a[13] == "0.0" && a[14] == "0.0" && b[5] == "0.0" && b[6] == "0.0" && b[7] == "0.0" && b[8] == "0.0" && b[9] == "0.0" && b[10] == "0.0" && b[11] == "0.0" && b[12] == "0.0" && b[13] == "0.0" && b[14] == "0.0" && a[0] != "" && b[0] != "" && a[1] > b[1] && a[3] <= b[3]) {return 1}
    if (a[5] == "0.0" && a[6] == "0.0" && a[7] == "0.0" && a[8] == "0.0" && a[9] == "0.0" && a[10] == "0.0" && a[11] == "0.0" && a[12] == "0.0" && a[13] == "0.0" && a[14] == "0.0" && b[5] == "0.0" && b[6] == "0.0" && b[7] == "0.0" && b[8] == "0.0" && b[9] == "0.0" && b[10] == "0.0" && b[11] == "0.0" && b[12] == "0.0" && b[13] == "0.0" && b[14] == "0.0" && a[0] != "" && b[0] != "" && b[1] > a[1] && b[3] <= a[3]) {return -1}
  }
  // if (a[i] == b[i] && ((a[i] == "0.000" && b[i] == 0)) && a[3] <= b[3]) {a[i] += 0.0001}
  // else if (a[i] == b[i] && ((a[i] == 0 && b[i] == "0.0001")) && a[3] >= b[3]) {b[i] += 0.0001}
  if (a[i] == '' || !a[i]) {
    a[i] = 0
  }
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) > parseFloat(b[i])) ? -1 : 1;
  }
}
function sortFunction_tall_1_flere_desimal_original(a, b) {
  let sum_a1 = a[1]
  let sum_a2 = a[4]
  let sum_a = (Math.max(sum_a1, sum_a2))
  let sum_b1 = b[1]
  let sum_b2 = b[4]
  let sum_b = (Math.max(sum_b1, sum_b2))
  if (sum_a == sum_b && ((sum_a1 == "0.0001" && sum_b1 == 0)) && a[3] <= b[3]) {sum_a += 0.0001}
  else if (sum_a == sum_b && ((sum_a1 == 0 && sum_b1 == "0.0001")) && a[3] >= b[3]) {sum_b += 0.0001}
  if (a[0] == '' && b[0] != '' && b[3] >= a[3] && sum_a == sum_b) {return 1}
  if (b[0] == '' && a[0] != '' && a[3] >= b[3] && sum_b == sum_a) {return -1}
  if (a[5] == "0.0" && a[6] == "0.0" && a[7] == "0.0" && a[8] == "0.0" && a[9] == "0.0" && a[10] == "0.0" && a[11] == "0.0" && a[12] == "0.0" && a[13] == "0.0" && a[14] == "0.0" && b[5] == "0.0" && b[6] == "0.0" && b[7] == "0.0" && b[8] == "0.0" && b[9] == "0.0" && b[10] == "0.0" && b[11] == "0.0" && b[12] == "0.0" && b[13] == "0.0" && b[14] == "0.0" && a[0] != "" && b[0] != "" && a[1] > b[1] && a[3] <= b[3]) {return -1}
  if (a[5] == "0.0" && a[6] == "0.0" && a[7] == "0.0" && a[8] == "0.0" && a[9] == "0.0" && a[10] == "0.0" && a[11] == "0.0" && a[12] == "0.0" && a[13] == "0.0" && a[14] == "0.0" && b[5] == "0.0" && b[6] == "0.0" && b[7] == "0.0" && b[8] == "0.0" && b[9] == "0.0" && b[10] == "0.0" && b[11] == "0.0" && b[12] == "0.0" && b[13] == "0.0" && b[14] == "0.0" && a[0] != "" && b[0] != "" && b[1] > a[1] && b[3] <= a[3]) {return 1}
  if (sum_a === '' || !sum_a && sum_a !== 0) {sum_a = "0.0"}
  if (sum_b === '' || !sum_b && sum_b !== 0) {sum_b = "0.0"}
  if (parseFloat(sum_a) === parseFloat(sum_b)) {
		for (x = 5; x <= 14; x++) {
			if (parseFloat(a[x]) === parseFloat(b[x])) {
				if (x == 14) {
					i = 3
					let sum_a1 = a[1]
					let sum_a2 = a[4]
					let sum_a = (Math.max(sum_a1, sum_a2))
					let sum_b1 = b[1]
					let sum_b2 = b[4]
					let sum_b = (Math.max(sum_b1, sum_b2))
					if (i >= 5 && i <= 14) {
						if (a[i] == "0.000") {a[i] = 0.0001}
						if (b[i] == "0.000") {b[i] = 0.0001}
					}
					else {
						if (a[0] == '' && b[0] != '' && b[3] >= a[3] && sum_a == sum_b) {return 1}
						if (b[0] == '' && a[0] != '' && a[3] >= b[3] && sum_b == sum_a) {return -1}
						if (a[5] == "0.0" && a[6] == "0.0" && a[7] == "0.0" && a[8] == "0.0" && a[9] == "0.0" && a[10] == "0.0" && a[11] == "0.0" && a[12] == "0.0" && a[13] == "0.0" && a[14] == "0.0" && b[5] == "0.0" && b[6] == "0.0" && b[7] == "0.0" && b[8] == "0.0" && b[9] == "0.0" && b[10] == "0.0" && b[11] == "0.0" && b[12] == "0.0" && b[13] == "0.0" && b[14] == "0.0" && a[0] != "" && b[0] != "" && a[1] > b[1] && a[3] <= b[3]) {return -1}
						if (a[5] == "0.0" && a[6] == "0.0" && a[7] == "0.0" && a[8] == "0.0" && a[9] == "0.0" && a[10] == "0.0" && a[11] == "0.0" && a[12] == "0.0" && a[13] == "0.0" && a[14] == "0.0" && b[5] == "0.0" && b[6] == "0.0" && b[7] == "0.0" && b[8] == "0.0" && b[9] == "0.0" && b[10] == "0.0" && b[11] == "0.0" && b[12] == "0.0" && b[13] == "0.0" && b[14] == "0.0" && a[0] != "" && b[0] != "" && b[1] > a[1] && b[3] <= a[3]) {return 1}
					}
					if (a[i] === '' || !a[i] && a[i] !== 0) {    a[i] = "0.0"}
					if (b[i] === '' || !b[i] && b[i] !== 0) {    b[i] = "0.0"}
					if (parseFloat(a[i]) === parseFloat(b[i])) {
						if (a[0].toLowerCase() === b[0].toLowerCase()) {
							return 0;
						}
						else {
							return (a[0].toLowerCase() < b[0].toLowerCase()) ? -1 : 1;
						}
					}
					else {
						return (parseFloat(a[i]) < parseFloat(b[i])) ? -1 : 1;
					}
				}
			}
			else {
				return (parseFloat(a[x]) > parseFloat(b[x])) ? -1 : 1;
			}
		}
  }
  else {
    return (parseFloat(sum_a) > parseFloat(sum_b)) ? -1 : 1;
  }
}
function sortFunction_tall_2_flere_desimal(a, b) {
  let sum_a1 = a[1]
  let sum_a2 = a[4]
  let sum_a = (Math.max(sum_a1, sum_a2))
  let sum_b1 = b[1]
  let sum_b2 = b[4]
  let sum_b = (Math.max(sum_b1, sum_b2))
  if (i >= 5 && i <= 14) {
    if (a[i] == "0.000") {a[i] = 0.0001}
    if (b[i] == "0.000") {b[i] = 0.0001}
  }
  else {
    if (a[0] == '' && b[0] != '' && b[3] >= a[3] && sum_a == sum_b) {return 1}
    if (b[0] == '' && a[0] != '' && a[3] >= b[3] && sum_b == sum_a) {return -1}
    if (a[5] == "0.0" && a[6] == "0.0" && a[7] == "0.0" && a[8] == "0.0" && a[9] == "0.0" && a[10] == "0.0" && a[11] == "0.0" && a[12] == "0.0" && a[13] == "0.0" && a[14] == "0.0" && b[5] == "0.0" && b[6] == "0.0" && b[7] == "0.0" && b[8] == "0.0" && b[9] == "0.0" && b[10] == "0.0" && b[11] == "0.0" && b[12] == "0.0" && b[13] == "0.0" && b[14] == "0.0" && a[0] != "" && b[0] != "" && a[1] > b[1] && a[3] <= b[3]) {return -1}
    if (a[5] == "0.0" && a[6] == "0.0" && a[7] == "0.0" && a[8] == "0.0" && a[9] == "0.0" && a[10] == "0.0" && a[11] == "0.0" && a[12] == "0.0" && a[13] == "0.0" && a[14] == "0.0" && b[5] == "0.0" && b[6] == "0.0" && b[7] == "0.0" && b[8] == "0.0" && b[9] == "0.0" && b[10] == "0.0" && b[11] == "0.0" && b[12] == "0.0" && b[13] == "0.0" && b[14] == "0.0" && a[0] != "" && b[0] != "" && b[1] > a[1] && b[3] <= a[3]) {return 1}
  }
  if (a[i] === '' || !a[i] && a[i] !== 0) {    a[i] = "0.0"}
  if (b[i] === '' || !b[i] && b[i] !== 0) {    b[i] = "0.0"}
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) < parseFloat(b[i])) ? -1 : 1;
  }
}

function sortFunction_tall_1_flere_desimal_nyligste(a, b) {
	for (x = 5; x <= 14; x++) {
		if (parseFloat(a[x]) === parseFloat(b[x])) {
			if (x == 14) {
				return 0;
			}
		}
		else {
			return (parseFloat(a[x]) > parseFloat(b[x])) ? -1 : 1;
		}
	}
}
function sortFunction_tall_2_flere_desimal_nyligste(a, b) {
	for (x = 5; x <= 14; x++) {
		if (parseFloat(a[x]) === parseFloat(b[x])) {
			if (x == 14) {
				return 0;
			}
		}
		else {
			return (parseFloat(a[x]) < parseFloat(b[x])) ? -1 : 1;
		}
	}
}



// Mange fine flaggikoner: https://github.com/HatScripts/circle-flags
function byggTabell_test(ranking_array, column, order) {
  let poeng = ""
  let na_poeng = ""
  testTabell.innerHTML = '';
  var helTabellHTML = '';
  let gjennværende_land = [];
  for (i = 0; i < menyvalg.length; i++) {
    let knapper = "";
    let plassering = "";
    if (aar_etter_forste_periode == nåværende_sesong_periode_valg[0]-22) {
      knapper = ((menyvalg[i][2 + ((aar_etter_forste_periode+1) * antall_MV_elem)])) || "";
      plassering = ((menyvalg[i][5 + ((aar_etter_forste_periode+1) * antall_MV_elem)])) || "";
    }
    if (aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21) {
      knapper = ((menyvalg[i][2 + ((nåværende_sesong_periode_valg[0]-21) * antall_MV_elem)])) || "";
      plassering = ((menyvalg[i][5 + ((nåværende_sesong_periode_valg[0]-21) * antall_MV_elem)])) || "";
    }
    knapper = knapper.split(",")
    plassering = plassering.split(",")

    if (nåværende_sesong_periode_valg[0]-11 != aar_etter_forste_periode) {
      if (!knapper.includes('b5') && !knapper.includes('b8') && !knapper.includes('b12') && !knapper.includes('b17') && !knapper.includes('KO') && ((!plassering.includes("4") && (!plassering.includes("3") || !knapper.includes('b20')) && nåværende_sesong_periode_valg[0] < 24) || (!knapper.includes("KO") && nåværende_sesong_periode_valg[0] >= 24)) && knapper[0] != '' && (aar_etter_forste_periode + nåværende_sesong_periode_valg[0] != 22)) {
        if (!gjennværende_land.includes(menyvalg[i][1])) {
          gjennværende_land.push(menyvalg[i][1])
        }
      }
    }
  }
  let spraak = localStorage.getItem("someVarKey");
  for (i = 0; i < ranking_array.length; i++) {
		// Gjør om til kode hvis lag med eksakt lik klubb-rangering, men fra ulikt rangerte land skal være likt rangert.
		// if (egentligRangeringKlubb.includes(ranking_array[i][0])) {
		// 	ranking_array[i][17] = egentligRangering[egentligRangeringKlubb.indexOf(ranking_array[i][0])]
		// }
    let gaa = true;
    if (column == "klubb" || column == "poeng" || column == "tittel_poeng" || column == "sesong1" || column == "sesong2" || column == "sesong3" || column == "sesong4" || column == "sesong5" || column == "sesong6" || column == "sesong7" || column == "sesong8" || column == "sesong9" || column == "sesong10") {
      if (ranking_array[i][1] == "" || ranking_array[i][1] == "0.0") {
        gaa = false;
      }
    }
    if (gaa == true) {
      if (ranking_array[i][1]) {ranking_array[i][1] = parseFloat(ranking_array[i][1]).toFixed(3)}
      poeng = ranking_array[i][1];
      na_poeng =  ranking_array[i][4];
      if (parseFloat(poeng) > parseFloat(na_poeng)) {
        poeng = "<b>" + ranking_array[i][1] + "</b>"
      }
      else if (parseFloat(poeng) < parseFloat(na_poeng)){
        na_poeng = "<b>" + ranking_array[i][4] + "</b>"
      }
      else {
        poeng = "<b>" + ranking_array[i][1] + "</b>"
        na_poeng = "<b>" + ranking_array[i][4] + "</b>"
      }
      let sesong10 = ranking_array[i][5]
      let sesong9 = ranking_array[i][6]
      let sesong8 = ranking_array[i][7]
      let sesong7 = ranking_array[i][8]
      let sesong6 = ranking_array[i][9]
      let sesong5 = ranking_array[i][10]
      let sesong4 = ranking_array[i][11]
      let sesong3 = ranking_array[i][12]
      let sesong2 = ranking_array[i][13]
      let sesong1 = ranking_array[i][14]
      if (sesong10 === "0.0") {sesong10 = ''}
      if (sesong9 === "0.0") {sesong9 = ''}
      if (sesong8 === "0.0") {sesong8 = ''}
      if (sesong7 === "0.0") {sesong7 = ''}
      if (sesong6 === "0.0") {sesong6 = ''}
      if (sesong5 === "0.0") {sesong5 = ''}
      if (sesong4 === "0.0") {sesong4 = ''}
      if (sesong3 === "0.0") {sesong3 = ''}
      if (sesong2 === "0.0") {sesong2 = ''}
      if (sesong1 === "0.0") {sesong1 = ''}
      let tr = '<tr>'
      let inaktiv_klubb = (ranking_array[i][5] == "0.0" && ranking_array[i][6] == "0.0" && ranking_array[i][7] == "0.0" && ranking_array[i][8] == "0.0" && ranking_array[i][9] == "0.0" && ranking_array[i][10] == "0.0" && ranking_array[i][11] == "0.0" && ranking_array[i][12] == "0.0" && ranking_array[i][13] == "0.0" && ranking_array[i][14] == "0.0")
      if (ranking_array[i][1] == "" || ranking_array[i][1] == "0.0") {
        ranking_array[i][18] = " "
        tr = '<tr class = "land_klubb_rank">'
      }
      /* Kommenter ut " && parseFloat(ranking_array[i][1]) <= parseFloat(ranking_array[i][4])" dersom du ønsker at urangerte klubber med nok tittelpoeng IKKE skal være rangert */
      else if (inaktiv_klubb && parseFloat(ranking_array[i][1]) <= parseFloat(ranking_array[i][4])) {
        ranking_array[i][18] = " "
        tr = '<tr class = "inaktiv_klubb">'
      }
      let nummer = i+1
      if (nummer <= 3) {
        nummer = '<span data-nosnippet>' + ranking_array[i][18] + '</span>';
      } else {nummer = ranking_array[i][18]}
      let rangering = "";
      /* Kommenter ut " || parseFloat(ranking_array[i][1]) > parseFloat(ranking_array[i][4])" dersom du ønsker at urangerte klubber med nok tittelpoeng IKKE skal være rangert */
      if(ranking_array[i][1] != "" && ranking_array[i][1] != "0.0" && (!inaktiv_klubb || parseFloat(ranking_array[i][1]) > parseFloat(ranking_array[i][4]))) {
        rangering = `<td class="id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][17]}</b></td>`;}
      else {rangering = `<td class="id_nr utydelig ramme_hoyre_tynn"><b>${""}</b></td>`;}
      let klubbnavn_HTML_start = '<td class="klubbene"><nobr class="marign_venstre">';
      if (aar_etter_forste_periode == nåværende_sesong_periode_valg[0]-22 || aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21) {
        for (r = 0; r < menyvalg.length; r++) {
          if (menyvalg[r][0] == ranking_array[i][0]) {
            let knapper = "";
            let plassering = "";
            if (aar_etter_forste_periode == nåværende_sesong_periode_valg[0]-22) {
              knapper = ((menyvalg[r][2 + ((aar_etter_forste_periode+1) * antall_MV_elem)])) || "";
              plassering = ((menyvalg[r][5 + ((aar_etter_forste_periode+1) * antall_MV_elem)])) || "";
            }
            if (aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21) {
              knapper = ((menyvalg[r][2 + ((nåværende_sesong_periode_valg[0]-21) * antall_MV_elem)])) || "";
              plassering = ((menyvalg[r][5 + ((nåværende_sesong_periode_valg[0]-21) * antall_MV_elem)])) || "";
            }
            knapper = knapper.split(",")
            plassering = plassering.split(",")
            if (aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21 && aar_etter_forste_periode < nåværende_sesong_periode_valg[0]-11) {
              if (gjennværende_land.includes(menyvalg[r][1])) {
                klubbnavn_HTML_start = '<td class="klubbene var_med"><nobr class="marign_venstre">';
              }
            }
            // if (nåværende_sesong_periode_valg[0]-11 != aar_etter_forste_periode && !(knapper).includes("KO")) {
            //   if ((knapper).includes("b18")) {
            //     if ((plassering).includes("3")) {
            //       rangering = `<td class="ucl_gs_uel id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][15] + 1}</b></td>`;
            //     }
            //     else if (!(plassering).includes("4")) {
            //       rangering = `<td class="ucl_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][15] + 1}</b></td>`;
            //     }
            //   }
            //   else if ((knapper).includes("b19")) {
            //     if ((plassering).includes("3")) {
            //       rangering = `<td class="uel_gs_uecl id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][15] + 1}</b></td>`;
            //     }
            //     else if (!(plassering).includes("4")) {
            //       rangering = `<td class="uel_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][15] + 1}</b></td>`;
            //     }
            //   }
            //   else if ((knapper).includes("b20") && !(plassering).includes("3") && !(plassering).includes("4")) {
            //     rangering = `<td class="uecl_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][15] + 1}</b></td>`;
            //   }
            // }
            let rangering_tall = ranking_array[i][17];
            if (rangering.includes("<b></b>")) {
              rangering_tall = "";
            }
            if (nåværende_sesong_periode_valg[0]-11 != aar_etter_forste_periode) {
              if (!knapper.includes('b5') && !knapper.includes('b8') && !knapper.includes('b12') && !knapper.includes('b17') && !knapper.includes('KO') && ((!plassering.includes("4") && (!plassering.includes("3") || !knapper.includes('b20')) && nåværende_sesong_periode_valg[0] < 24) || (!knapper.includes("KO") && nåværende_sesong_periode_valg[0] >= 24)) && knapper[0] != '' && (nåværende_sesong_periode_valg[0] - aar_etter_forste_periode != 22)) {
                klubbnavn_HTML_start = '<td class="klubbene fortsatt_med"><nobr class="marign_venstre">';
              }
              if ((knapper).includes("b18")) {
                if ((plassering).includes("3") && nåværende_sesong_periode_valg[0] < 24) {
                  rangering = `<td class="ucl_gs_uel id_nr utydelig ramme_hoyre_tynn"><b>${rangering_tall}</b></td>`;
                }
                else {
                  rangering = `<td class="ucl_gs id_nr utydelig ramme_hoyre_tynn"><b>${rangering_tall}</b></td>`;
                }
              }
              else if ((knapper).includes("b19")) {
                if ((plassering).includes("3") && nåværende_sesong_periode_valg[0] < 24) {
                  rangering = `<td class="uel_gs_uecl id_nr utydelig ramme_hoyre_tynn"><b>${rangering_tall}</b></td>`;
                }
                else {
                  rangering = `<td class="uel_gs id_nr utydelig ramme_hoyre_tynn"><b>${rangering_tall}</b></td>`;
                }
              }
              else if ((knapper).includes("b20")) {
                rangering = `<td class="uecl_gs id_nr utydelig ramme_hoyre_tynn"><b>${rangering_tall}</b></td>`;
              }
            }
          }
        }
      }
      if (klubbnavn_HTML_start == '<td class="klubbene"><nobr class="marign_venstre">') {
        if (aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21 && aar_etter_forste_periode < nåværende_sesong_periode_valg[0]-11) {
          if (gjennværende_land.includes(ranking_array[i][2])) {
            klubbnavn_HTML_start = '<td class="klubbene var_med"><nobr class="marign_venstre">';
          }
        }
      }
      if (i == ranking_array.length - 1) {
        if (klubbnavn_HTML_start == '<td class="klubbene fortsatt_med"><nobr class="marign_venstre">') {
          klubbnavn_HTML_start = '<td class="klubbene fortsatt_med ramme_ikke_grønn"><nobr class="marign_venstre">'
        } else if (klubbnavn_HTML_start == '<td class="klubbene var_med"><nobr class="marign_venstre">') {
          klubbnavn_HTML_start = '<td class="klubbene var_med ramme_ikke_grønn"><nobr class="marign_venstre">'
        }
      }
      let klubbnavn = ranking_array[i][0]
      let klubbnavn_url = klubbnavn.replace(/\s/g, '')
      if (klubbnavn_url.includes('/')) {
        klubbnavn_url = klubbnavn_url.replace('/','')
      }
      let klubb_med_logo = "";
      if (ranking_array[i][1] != "" && ranking_array[i][1] != "0.0") {
        klubb_med_logo = '<img class="klubb_logo" loading="lazy" data-sizes="auto" src="media/klubblogo/' + ranking_array[i][2] + "/" + klubbnavn_url + '2.png"' + 
        `data-srcset="
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `1.png 18w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `2.png 32w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `3.png 36w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `4.png 50w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `5.png 64w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `6.png 70w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `7.png 100w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `8.png 140w"
        data-fallback="media/klubblogo/fallback.png" sizes="20px" srcset="
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `1.png 13w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `2.png 32w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `3.png 36w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `4.png 50w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `5.png 64w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `6.png 70w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `7.png 100w,
        media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `8.png 140w">` + ranking_array[i][0]
      }
      else {
        poeng = "";
        let land_norsk = "";
        let land_engelsk = "";
        for (p = 0; p < landskoeffisienter.length; p++) {
          if (landskoeffisienter[p][0] == ranking_array[i][2]) {
            land_norsk = landskoeffisienter[p][11];
            land_engelsk = landskoeffisienter[p][12];
            break;
          }
        }
        if (ranking_array[i][2] == 'NIR') {
          if (spraak == 'english') {
            klubb_med_logo = '<div class="flagg_div2" id="' + 'NIR' + '_oversett"><abbr data_title="' + land_norsk + '"><img class="flagg" id="NIR__" src="media/UEFA/' + ranking_array[i][2] + '.svg"></abbr></div>'
          } else {
            klubb_med_logo = '<div class="flagg_div2" id="' + 'NIR' + '_oversett"><abbr data_title="' + land_engelsk + '"><img class="flagg" id="NIR__" src="media/UEFA/' + ranking_array[i][2] + '.svg"></abbr></div>'
          }
        }
        else {
          if (spraak == 'english') {
            klubb_med_logo = '<div class="flagg_div2" id="' + ranking_array[i][2] + '_oversett"><abbr data_title="' + land_norsk + '"><img class="flagg" src="media/UEFA/' + ranking_array[i][2] + '.svg"></abbr></div>'
          } else {
            klubb_med_logo = '<div class="flagg_div2" id="' + ranking_array[i][2] + '_oversett"><abbr data_title="' + land_engelsk + '"><img class="flagg" src="media/UEFA/' + ranking_array[i][2] + '.svg"></abbr></div>'
          }
        }
      }
      let tittel_poeng = ''
      if (ranking_array[i][15] != 0) {
        tittel_poeng = ranking_array[i][15].toFixed(3)
      }
      if (aar_etter_forste_periode == 0) {
        sesong10 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong10}</a>`
      }
      else if (aar_etter_forste_periode == 1) {
        sesong10 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong10}</a>`
        sesong9 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong9}</a>`}
      else if (aar_etter_forste_periode == 2) {
        sesong10 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong10}</a>`
        sesong9 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong9}</a>`
        sesong8 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong8}</a>`}
      else if (aar_etter_forste_periode == 3) {
        sesong10 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong10}</a>`
        sesong9 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong9}</a>`
        sesong8 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong8}</a>`
        sesong7 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong7}</a>`}
      else if (aar_etter_forste_periode == 4) {
        sesong9 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong9}</a>`
        sesong8 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong8}</a>`
        sesong7 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong7}</a>`
        sesong6 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong6}</a>`}
      else if (aar_etter_forste_periode == 5) {
        sesong8 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong8}</a>`
        sesong7 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong7}</a>`
        sesong6 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong6}</a>`
        sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong5}</a>`}
      else if (aar_etter_forste_periode == 6) {
        sesong7 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong7}</a>`
        sesong6 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong6}</a>`
        sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong5}</a>`
        sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong4}</a>`}
      else if (aar_etter_forste_periode == 7) {
        sesong6 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong6}</a>`
        sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong5}</a>`
        sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong4}</a>`
        sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong3}</a>`}
      else if (aar_etter_forste_periode == 8) {
        sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong5}</a>`
        sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong4}</a>`
        sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong3}</a>`
        sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong2}</a>`}
      else if (aar_etter_forste_periode == 9) {
        sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong4}</a>`
        sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong3}</a>`
        sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong2}</a>`
        sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+6})" class="utydelig_link">${sesong1}</a>`}
      else if (aar_etter_forste_periode == 10) {
        sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong3}</a>`
        sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong2}</a>`
        sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+5})" class="utydelig_link">${sesong1}</a>`}
      else if (aar_etter_forste_periode == 11) {
        sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong2}</a>`
        sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+4})" class="utydelig_link">${sesong1}</a>`}
      else if (aar_etter_forste_periode == 12) {
        sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${aar_etter_forste_periode+3})" class="utydelig_link">${sesong1}</a>`}
      var rad_test = `${tr}
                      <td class="id_nr veldig_utydelig ramme_hoyre">${nummer}</td>
                      ${rangering}
                      ${klubbnavn_HTML_start + klubb_med_logo}</nobr></td>
                      <td id="tom_kolonne">${klubbnavn}</td>
                      <td class='premie_koeff_3 ramme_hoyre'><div class='senter'><div class='premie_koeff_3 utydelig'>${ranking_array[i][2]}</div></div></td>
                      <td class='premie_koeff_2'><div class='senter'><div class='premie_koeff_2'>${poeng}</div></div></td>
                      <td class='premie_koeff ramme_hoyre'><div class='senter'><div class='premie_koeff'>${na_poeng}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong10}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong9}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong8}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong7}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong6}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong5}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong4}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong3}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong2}</div></div></td>
                      <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong1}</div></div></td>
                  </tr>`
                  helTabellHTML += rad_test
    }
  }
  testTabell.innerHTML = helTabellHTML;
}

function endre_klubbnavn(i, kolonne) {
  var rows = document.getElementsByTagName("table")[0].rows;
  var last = rows[i + 1];
  var cell = last.cells[2];
  let aarstall = (rows[0].cells[kolonne+2].innerText[0] + rows[0].cells[kolonne+2].innerText[1] - 21)
  localStorage.setItem('sessong', aarstall)
  var value = cell.innerText;
  localStorage.setItem('Klubbnavn', value)
}


/*Dropdown meny start*/
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleMeny() {
  if (document.getElementById("myDropdown_2").classList.contains("show")) {
    document.getElementById("myDropdown_2").classList.remove("show")
    nedoverpil_2()
  }
  if (document.getElementById("myDropdown").classList.contains("show")) {
      document.getElementById("myDropdown").classList.remove("show")
      nedoverpil()
  }
  else {
      document.getElementById("myDropdown").classList.add("show")
      oppoverpil()
  }
}

function toggleMeny2() {
  if (document.getElementById("myDropdown").classList.contains("show")) {
    document.getElementById("myDropdown").classList.remove("show")
    nedoverpil()
  }
  if (document.getElementById("myDropdown_2").classList.contains("show")) {
    document.getElementById("myDropdown_2").classList.remove("show")
    nedoverpil_2()
  }
  else {
    if (document.getElementById("myDropdown_2").classList.contains("show")) {}
    else {
      document.getElementById("myDropdown_2").classList.add("show")
      oppoverpil_2()
    }
  }
  generer_lands_knapper()
}

function nedoverpil() {
  let DropdownMenyElement = (document.getElementById("dropDownMeny").innerText).slice(0, -1)
  document.getElementById("dropDownMeny").innerHTML = DropdownMenyElement + "<div class='opp_ned_pil'>&#10094</div>";
}

function oppoverpil() {
  let DropdownMenyElement = (document.getElementById("dropDownMeny").innerText).slice(0, -1)
  document.getElementById("dropDownMeny").innerHTML = DropdownMenyElement + "<div class='opp_ned_pil'>&#10095</div>";
}

function nedoverpil_2() {
  document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace('❯','❮');
}

function oppoverpil_2() {
  document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace('❮','❯');
}


/* Lukker menyen om musepeker klikker utenfor boksen */
const $menu = $('.dropdown');

$(document).mouseup(e => {
  if (!$menu.is(e.target) // if the target of the click isn't the container...
  && $menu.has(e.target).length === 0) // ... nor a descendant of the container
  {
      document.getElementById("myDropdown").classList.remove("show")
      nedoverpil()
  }
});


/* Lukker menyen om musepeker klikker utenfor boksen */
const $menu2 = $('.dropdown_land');

$(document).mouseup(e => {
  if (!$menu.is(e.target) // if the target of the click isn't the container...
  && $menu.has(e.target).length === 0) // ... nor a descendant of the container
  {
    if(document.getElementById("myDropdown_2").classList.contains('show')) {
      document.getElementById("myDropdown_2").classList.remove("show")
      nedoverpil_2()
    }
  }
});

/* Lager knappene i menyen */
let btnid = "";
let valg_navn = document.getElementById('dropDownMeny').innerText.slice(0,-2);
id = "dropDownMeny";
for (i = 0; i < nyligste_poeng_rangering[0] - 20 + 10; i++) {
  let btn = document.createElement("button");
  btn.innerHTML = (2000+20 + i) + '/' + (21 + i);
  if ((2000+20 + i) + '/' + (21 + i) == valg_navn) {
    btn.className = "meny_element valgt_element";}
  else {btn.className = "meny_element";}
  btnid = "valgt" + i;
  btn.id = btnid;
  btn.setAttribute("onclick", "endreMenyTittel(innerHTML,"+id+","+btnid+")");
  document.getElementById("dropdown_elementer").appendChild(btn);
}

function endreMenyTittel(innerHTML,id,btnid) {
  document.querySelector('.valgt_element').classList.remove("valgt_element");
  document.getElementById(btnid.id).classList.add("valgt_element");
  document.getElementById("dropDownMeny").innerHTML = innerHTML + "<div class='opp_ned_pil'>&#10094</div>";
  toggleMeny();
  sessionStorage.setItem('dropdownmeny_valg_ti_års', innerHTML)
	if (btnid.id.replace('valgt','') < 3) {
		location.href = '/10-year-ranking-historic-titles';
	}
  oppdater_ved_refresh()
}





function sortFunction_tall_1_flere_desimal_land(a, b) {
	if (a[1] == "") {a[1] = 0}
	if (b[1] == "") {b[1] = 0}
  if (parseFloat(a[1]) === parseFloat(b[1])) {
    return 0;
  }
  else {
    return (parseFloat(a[1]) > parseFloat(b[1])) ? -1 : 1;
  }
}
function sortFunction_tall_2_flere_desimal_land(a, b) {
	if (a[1] == "") {a[1] = 0}
	if (b[1] == "") {b[1] = 0}
  if (parseFloat(a[1]) === parseFloat(b[1])) {
    return 0;
  }
  else {
    return (parseFloat(a[1]) < parseFloat(b[1])) ? -1 : 1;
  }
}
function sortFunction_tall_1_flere_desimal_nyligste_land(a, b) {
	for (p = 1; p <= 11; p++) {
		if (parseFloat(a[p]) === parseFloat(b[p])) {
			if (p == 11) {return 0};
		}
		else {
			return (parseFloat(a[p]) > parseFloat(b[p])) ? -1 : 1;
		}
  }
}

generer_lands_knapper()
function generer_lands_knapper() {
  var klubbers_assosiasjon = []
  let ranking_array_2 = []
  for (i = 0; i < menyvalg.length; i++) {
    klubbers_assosiasjon.push(menyvalg[i][1])
  }
  let assos_ranking_array = []
  for (i = 0; i < landskoeffisienter.length; i++) {
    let indeks = 0
    let indeks_klubb = []
    assos_ranking_array = []
    do {
      indeks_klubb.push(klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks))
      indeks = klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks) + 1
    }
    while (klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks) != -1)
  
  
    let enkelt_sesong1 = 0;
    var koeff_sesong2 = 0;
    var koeff_sesong3 = 0;
    var koeff_sesong4 = 0;
    var koeff_sesong5 = 0;
    var koeff_sesong6 = 0;
    var koeff_sesong7 = 0;
    var koeff_sesong8 = 0;
    var koeff_sesong9 = 0;
    var koeff_sesong10 = 0;
    let antall_klubber1 = indeks_klubb.length;
    let antall_klubber2 = indeks_klubb.length;
    let antall_klubber3 = indeks_klubb.length;
    let antall_klubber4 = indeks_klubb.length;
    let antall_klubber5 = indeks_klubb.length;
    let antall_klubber6 = indeks_klubb.length;
    let antall_klubber7 = indeks_klubb.length;
    let antall_klubber8 = indeks_klubb.length;
    let antall_klubber9 = indeks_klubb.length;
    let antall_klubber10 = indeks_klubb.length;
    if (aar_etter_forste_periode <= -1) {
      enkelt_sesong1 = parseFloat(landskoeffisienter[i][11 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode + 1)))+2-antall_MV_elem] == undefined) {
          antall_klubber1 -= 1
        } else {
          enkelt_sesong1 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode + 1) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode + 1) * antall_MV_elem)) , aar_etter_forste_periode) || 0;
        }
      }
      enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0}
    if (aar_etter_forste_periode <= 0) {
      koeff_sesong2 = parseFloat(landskoeffisienter[i][10 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode)))+2-antall_MV_elem] == undefined) {
          antall_klubber2 -= 1
        } else {
          koeff_sesong2 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode) * antall_MV_elem)) , aar_etter_forste_periode - 1) || 0;
        }
      }
      koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0}
    if (aar_etter_forste_periode <= 1) {
      koeff_sesong3 = parseFloat(landskoeffisienter[i][9 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 1)))+2-antall_MV_elem] == undefined) {
          antall_klubber3 -= 1
        } else {
          koeff_sesong3 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 1) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 1) * antall_MV_elem)) , aar_etter_forste_periode - 2) || 0;
        }
      }
      koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0}
    if (aar_etter_forste_periode <= 2) {
      koeff_sesong4 = parseFloat(landskoeffisienter[i][8 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 2)))+2-antall_MV_elem] == undefined) {
          antall_klubber4 -= 1
        } else {
          koeff_sesong4 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 2) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 2) * antall_MV_elem)) , aar_etter_forste_periode - 3) || 0;
        }
      }
      koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0}
    if (aar_etter_forste_periode <= 3) {
      koeff_sesong5 = parseFloat(landskoeffisienter[i][7 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 3)))+2-antall_MV_elem] == undefined) {
          antall_klubber5 -= 1
        } else {
          koeff_sesong5 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 3) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 3) * antall_MV_elem)) , aar_etter_forste_periode - 4) || 0;
        }
      }
      koeff_sesong5 = Math.floor(koeff_sesong5 * 1000/antall_klubber5) / 1000 || 0}
    if (aar_etter_forste_periode <= 4) {
      koeff_sesong6 = parseFloat(landskoeffisienter[i][6 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 4)))+2-antall_MV_elem] == undefined) {
          antall_klubber6 -= 1
        } else {
          koeff_sesong6 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 4) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 4) * antall_MV_elem)) , aar_etter_forste_periode - 5) || 0;
        }
      }
      koeff_sesong6 = Math.floor(koeff_sesong6 * 1000/antall_klubber6) / 1000 || 0}
    if (aar_etter_forste_periode <= 5) {
      koeff_sesong7 = parseFloat(landskoeffisienter[i][5 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 5)))+2-antall_MV_elem] == undefined) {
          antall_klubber7 -= 1
        } else {
          koeff_sesong7 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 5) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 5) * antall_MV_elem)) , aar_etter_forste_periode - 6) || 0;
        }
      }
      koeff_sesong7 = Math.floor(koeff_sesong7 * 1000/antall_klubber7) / 1000 || 0}
    if (aar_etter_forste_periode <= 6) {
      koeff_sesong8 = parseFloat(landskoeffisienter[i][4 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 6)))+2-antall_MV_elem] == undefined) {
          antall_klubber8 -= 1
        } else {
          koeff_sesong8 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 6) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 6) * antall_MV_elem)) , aar_etter_forste_periode - 7) || 0;
        }
      }
      koeff_sesong8 = Math.floor(koeff_sesong8 * 1000/antall_klubber8) / 1000 || 0}
    if (aar_etter_forste_periode <= 7) {
      koeff_sesong9 = parseFloat(landskoeffisienter[i][3 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 7)))+2-antall_MV_elem] == undefined) {
          antall_klubber9 -= 1
        } else {
          koeff_sesong9 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 7) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 7) * antall_MV_elem)) , aar_etter_forste_periode - 8) || 0;
        }
      }
      koeff_sesong9 = Math.floor(koeff_sesong9 * 1000/antall_klubber9) / 1000 || 0}
    if (aar_etter_forste_periode <= 8) {
      koeff_sesong10 = parseFloat(landskoeffisienter[i][2 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 8)))+2-antall_MV_elem] == undefined) {
          antall_klubber10 -= 1
        } else {
          koeff_sesong10 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 8) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 8) * antall_MV_elem)) , aar_etter_forste_periode - 9) || 0;
        }
      }
      koeff_sesong10 = Math.floor(koeff_sesong10 * 1000/antall_klubber10) / 1000 || 0}

    if (landskoeffisienter[i][0] == 'RUS') {
      if ([1,2].includes(aar_etter_forste_periode)) {
        enkelt_sesong1 = 4.333
      }
      if ([2,3].includes(aar_etter_forste_periode)) {
        koeff_sesong2 = 4.333
      }
      if ([3,4].includes(aar_etter_forste_periode)) {
        koeff_sesong3 = 4.333
      }
      if ([4,5].includes(aar_etter_forste_periode)) {
        koeff_sesong4 = 4.333
      }
      if ([5,6].includes(aar_etter_forste_periode)) {
        koeff_sesong5 = 4.333
      }
      if ([6,7].includes(aar_etter_forste_periode)) {
        koeff_sesong6 = 4.333
      }
      if ([7,8].includes(aar_etter_forste_periode)) {
        koeff_sesong7 = 4.333
      }
      if ([8,9].includes(aar_etter_forste_periode)) {
        koeff_sesong8 = 4.333
      }
      if ([9,10].includes(aar_etter_forste_periode)) {
        koeff_sesong9 = 4.333
      }
      if ([10, 11].includes(aar_etter_forste_periode)) {
        koeff_sesong10 = 4.333
      }
    }
    //Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng.
		// if (['ENG'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 += 0.625}
    //   else if (aar_etter_forste_periode == 3) {koeff_sesong2 += 0.625}
    //   else if (aar_etter_forste_periode == 4) {koeff_sesong3 += 0.625}
    //   else if (aar_etter_forste_periode == 5) {koeff_sesong4 += 0.625}
    //   else if (aar_etter_forste_periode == 6) {koeff_sesong5 += 0.625}
    //   else if (aar_etter_forste_periode == 7) {koeff_sesong6 += 0.625}
    //   else if (aar_etter_forste_periode == 8) {koeff_sesong7 += 0.625}
    //   else if (aar_etter_forste_periode == 9) {koeff_sesong8 += 0.625}
    //   else if (aar_etter_forste_periode == 10) {koeff_sesong9 += 0.625}
    //   else if (aar_etter_forste_periode == 11) {koeff_sesong10 += 0.625}}
		// if (['ITA'].includes(landskoeffisienter[i][0])) {
		// 	if (aar_etter_forste_periode == 2) {enkelt_sesong1 += 0.429}
		// 	else if (aar_etter_forste_periode == 3) {koeff_sesong2 += 0.429}
		// 	else if (aar_etter_forste_periode == 4) {koeff_sesong3 += 0.429}
		// 	else if (aar_etter_forste_periode == 5) {koeff_sesong4 += 0.429}
		// 	else if (aar_etter_forste_periode == 6) {koeff_sesong5 += 0.429}
		// 	else if (aar_etter_forste_periode == 7) {koeff_sesong6 += 0.429}
		// 	else if (aar_etter_forste_periode == 8) {koeff_sesong7 += 0.429}
		// 	else if (aar_etter_forste_periode == 9) {koeff_sesong8 += 0.429}
		// 	else if (aar_etter_forste_periode == 10) {koeff_sesong9 += 0.429}
		// 	else if (aar_etter_forste_periode == 11) {koeff_sesong10 += 0.429}}
		// else if (['GRE'].includes(landskoeffisienter[i][0])) {
		// 	if (aar_etter_forste_periode == 2) {enkelt_sesong1 += 1.000}
		// 	else if (aar_etter_forste_periode == 3) {koeff_sesong2 += 1.000}
		// 	else if (aar_etter_forste_periode == 4) {koeff_sesong3 += 1.000}
		// 	else if (aar_etter_forste_periode == 5) {koeff_sesong4 += 1.000}
		// 	else if (aar_etter_forste_periode == 6) {koeff_sesong5 += 1.000}
		// 	else if (aar_etter_forste_periode == 7) {koeff_sesong6 += 1.000}
		// 	else if (aar_etter_forste_periode == 8) {koeff_sesong7 += 1.000}
		// 	else if (aar_etter_forste_periode == 9) {koeff_sesong8 += 1.000}
		// 	else if (aar_etter_forste_periode == 10) {koeff_sesong9 += 1.000}
		// 	else if (aar_etter_forste_periode == 11) {koeff_sesong10 += 1.000}}
		// Brukes når vi vet antallet UCL-klubber fra land, men hvilke klubber det er snakk om er ukjent.
    if (['AUT','SCO','BEL','POR'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 3) {enkelt_sesong1 = 1.200}
      else if (aar_etter_forste_periode == 4) {koeff_sesong2 = 1.200}
      else if (aar_etter_forste_periode == 5) {koeff_sesong3 = 1.200}
      else if (aar_etter_forste_periode == 6) {koeff_sesong4 = 1.200}
      else if (aar_etter_forste_periode == 7) {koeff_sesong5 = 1.200}
      else if (aar_etter_forste_periode == 8) {koeff_sesong6 = 1.200}
      else if (aar_etter_forste_periode == 9) {koeff_sesong7 = 1.200}
      else if (aar_etter_forste_periode == 10) {koeff_sesong8 = 1.200}
      else if (aar_etter_forste_periode == 11) {koeff_sesong9 = 1.200}
      else if (aar_etter_forste_periode == 12) {koeff_sesong10 = 1.200}}
    else if (['NED'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 3) {enkelt_sesong1 = 2.000}
      else if (aar_etter_forste_periode == 4) {koeff_sesong2 = 2.000}
      else if (aar_etter_forste_periode == 5) {koeff_sesong3 = 2.000}
      else if (aar_etter_forste_periode == 6) {koeff_sesong4 = 2.000}
      else if (aar_etter_forste_periode == 7) {koeff_sesong5 = 2.000}
      else if (aar_etter_forste_periode == 8) {koeff_sesong6 = 2.000}
      else if (aar_etter_forste_periode == 9) {koeff_sesong7 = 2.000}
      else if (aar_etter_forste_periode == 10) {koeff_sesong8 = 2.000}
      else if (aar_etter_forste_periode == 11) {koeff_sesong9 = 2.000}
      else if (aar_etter_forste_periode == 12) {koeff_sesong10 = 2.000}}
    else if (['FRA'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 3) {enkelt_sesong1 = 2.571}
      else if (aar_etter_forste_periode == 4) {koeff_sesong2 = 2.571}
      else if (aar_etter_forste_periode == 5) {koeff_sesong3 = 2.571}
      else if (aar_etter_forste_periode == 6) {koeff_sesong4 = 2.571}
      else if (aar_etter_forste_periode == 7) {koeff_sesong5 = 2.571}
      else if (aar_etter_forste_periode == 8) {koeff_sesong6 = 2.571}
      else if (aar_etter_forste_periode == 9) {koeff_sesong7 = 2.571}
      else if (aar_etter_forste_periode == 10) {koeff_sesong8 = 2.571}
      else if (aar_etter_forste_periode == 11) {koeff_sesong9 = 2.571}
      else if (aar_etter_forste_periode == 12) {koeff_sesong10 = 2.571}}
    else if (['GER','ESP','ENG'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 3) {enkelt_sesong1 = 3.428}
      else if (aar_etter_forste_periode == 4) {koeff_sesong2 = 3.428}
      else if (aar_etter_forste_periode == 5) {koeff_sesong3 = 3.428}
      else if (aar_etter_forste_periode == 6) {koeff_sesong4 = 3.428}
      else if (aar_etter_forste_periode == 7) {koeff_sesong5 = 3.428}
      else if (aar_etter_forste_periode == 8) {koeff_sesong6 = 3.428}
      else if (aar_etter_forste_periode == 9) {koeff_sesong7 = 3.428}
      else if (aar_etter_forste_periode == 10) {koeff_sesong8 = 3.428}
      else if (aar_etter_forste_periode == 11) {koeff_sesong9 = 3.428}
      else if (aar_etter_forste_periode == 12) {koeff_sesong10 = 3.428}}
		else if (['ITA'].includes(landskoeffisienter[i][0])) {
			if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 3.750}
			else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 3.750}
			else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 3.750}
			else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 3.750}
			else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 3.750}
			else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 3.750}
			else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 3.750}
			else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 3.750}
			else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 3.750}
			else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 3.750}}
		// Sesongen etter.
		if (['CZE','TUR','BEL','POR'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 1.200}
      else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 1.200}
      else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 1.200}
      else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 1.200}
      else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 1.200}
      else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 1.200}
      else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 1.200}
      else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 1.200}
      else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 1.200}
      else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 1.200}}
    else if (['NED'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 2.000}
      else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 2.000}
      else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 2.000}
      else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 2.000}
      else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 2.000}
      else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 2.000}
      else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 2.000}
      else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 2.000}
      else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 2.000}
      else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 2.000}}
    else if (['FRA'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 2.571}
      else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 2.571}
      else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 2.571}
      else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 2.571}
      else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 2.571}
      else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 2.571}
      else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 2.571}
      else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 2.571}
      else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 2.571}
      else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 2.571}}
    else if (['GER','ITA','ESP','ENG'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 3.428}
      else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 3.428}
      else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 3.428}
      else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 3.428}
      else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 3.428}
      else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 3.428}
      else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 3.428}
      else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 3.428}
      else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 3.428}
      else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 3.428}}
    assos_ranking_array.push(landskoeffisienter[i][0])
    assos_ranking_array.push((koeff_sesong10 + koeff_sesong9 + koeff_sesong8 + koeff_sesong7 + koeff_sesong6 + koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
    assos_ranking_array.push(enkelt_sesong1.toFixed(3))
    assos_ranking_array.push(koeff_sesong2.toFixed(3))
    assos_ranking_array.push(koeff_sesong3.toFixed(3))
    assos_ranking_array.push(koeff_sesong4.toFixed(3))
    assos_ranking_array.push(koeff_sesong5.toFixed(3))
    assos_ranking_array.push(koeff_sesong6.toFixed(3))
    assos_ranking_array.push(koeff_sesong7.toFixed(3))
    assos_ranking_array.push(koeff_sesong8.toFixed(3))
    assos_ranking_array.push(koeff_sesong9.toFixed(3))
    assos_ranking_array.push(koeff_sesong10.toFixed(3))

    ranking_array_2.push(assos_ranking_array)
  }
	ranking_array_2.sort(sortFunction_tall_1_flere_desimal_nyligste_land);

  var landskode = []
  for (i = 0; i < ranking_array_2.length; i++) {
    landskode.push(ranking_array_2[i][0])
  }
  var flagg_ikon = '';
  /* Lager knappene i menyen */
  document.getElementById("dropdown_elementer_2").innerHTML = '';
  for (i = 0; i < landskode.length; i++) {
    let btn = document.createElement("button");
    if (landskode[i] == 'NIR') {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" id="NIR_" src="media/UEFA/NIR.svg" alt="NIR"></div>'
    }
    else {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" src="media/UEFA/' + landskode[i] + '.svg" alt="' + landskode[i] + '"></div>'
    }
    btn.id = landskode[i]
    btn.innerHTML = flagg_ikon;
    btn.className = "meny_element_2"
    btn.setAttribute("onClick", "endreMenyTittel_2(innerHTML)");
    document.getElementById("dropdown_elementer_2").appendChild(btn);
  }
  btn = document.createElement("button");
  btn.innerHTML = '<img class="roter" src="media/UEFA/GLOBE2_element.svg" alt="Globe">';
  btn.className = "meny_element_2 ekstra_meny_element"
  btn.setAttribute("onClick", "resett()")
  document.getElementById("dropdown_elementer_2").appendChild(btn);
  filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
  for (i = 0; i < landskoeffisienter.length; i++) {
    document.getElementById(landskoeffisienter[i][0]).style.backgroundColor = '';
    document.getElementById(landskoeffisienter[i][0]).style.border = '';
  }
  for (i = 0; i < filter_land_før.length; i++) {
    document.getElementById(filter_land_før[i]).style.backgroundColor = 'rgb(196, 217, 255)';
    document.getElementById(filter_land_før[i]).style.border = '1px solid rgb(164, 164, 164)';
  }
  localStorage.setItem('filter_land', JSON.stringify(filter_land_før))
}

for (p = 0; p < filter_land_før.length; p++) {
  filter_land.push(filter_land_før[p])
  innerHTML = document.getElementById(filter_land[p]).innerHTML;
  if (document.getElementById("dropDownMeny_2").innerHTML.includes('<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">')) {
    document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace('<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">','')
  }
  var id = innerHTML.slice(68, 71)
  if (id == 'NIR') {}
  else {id = innerHTML.slice(72, 75)}
  // document.getElementById(id).style.backgroundColor = 'rgb(196, 217, 255)';
  // document.getElementById(id).style.border = '1px solid rgb(164, 164, 164)';
  if (filter_land.length == 8) {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<span class="grå_knappetekst">...(1)</span>'}
  else if (filter_land.length > 8) {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace(filter_land.length - 8, filter_land.length - 7)}
  else {
    document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + innerHTML
  }
}



function endreMenyTittel_2(innerHTML) {
  if (document.getElementById("dropDownMeny_2").innerHTML.includes('<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">')) {
    document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace('<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">','')
  }
  var id = innerHTML.slice(68, 71)
  if (id == 'NIR') {}
  else {id = innerHTML.slice(72, 75)}
  if (filter_land.includes(id)) {
    const index = filter_land.indexOf(id);
    if (index > -1) {
      filter_land.splice(index, 1); // 2nd parameter means remove one item only
    }
    document.getElementById(id).style.backgroundColor = '';
    document.getElementById(id).style.border = '';
    if (filter_land.length == 7) {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace('...(1)','')}
    if (document.getElementById("dropDownMeny_2").innerHTML.includes(innerHTML)) {
      if (filter_land.length > 6) {
        if (filter_land[6] == 'NIR') {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<div class="flagg_div"><img class="flagg" id="NIR_" src="media/UEFA/NIR.svg" alt="NIR"></div>'}
          else {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<div class="flagg_div"><img class="flagg" src="media/UEFA/' + filter_land[6] + '.svg" alt="' + filter_land[6] + '"></div>'}
      }
      document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace(innerHTML,'')
    }
    if (filter_land.length > 7) {
      document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace(filter_land.length - 6,filter_land.length - 7)
    }
  }
  else {
    filter_land.push(id)
    document.getElementById(id).style.backgroundColor = 'rgb(196, 217, 255)';
    document.getElementById(id).style.border = '1px solid rgb(164, 164, 164)';
    if (filter_land.length == 8) {
      document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<span class="grå_knappetekst">...(1)</span>'}
    else if (filter_land.length > 8) {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace(filter_land.length - 8, filter_land.length - 7)}
    else {
      document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + innerHTML
    }
  }
  if (filter_land.length == 0) {
    document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">'
  }
  localStorage.setItem('filter_land', JSON.stringify(filter_land))
  oppdater_ved_refresh()
}


function resett() {
  document.getElementById('dropDownMeny_2').innerHTML = '<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe"><div class="opp_ned_pil">&#10095</div>'
  for (p = 0; p < filter_land.length; p++) {
    document.getElementById(filter_land[p]).style.backgroundColor = '';
    document.getElementById(filter_land[p]).style.border = '';
  }
  filter_land = []
  localStorage.setItem('filter_land', JSON.stringify(filter_land))
  oppdater_ved_refresh()
}
/* Dropdown meny slutt */




function endre_sort_kolonne() {
  if (sessionStorage.getItem('kolonne') == 'prize_money') {
    sessionStorage.setItem('kolonne', 'ass_coeff')
    sessionStorage.setItem('rekkefølge', 'desc')
    sessionStorage.setItem('kolonne2', 'ass_coeff_total')
    sessionStorage.setItem('rekkefølge2', 'desc')
  }
  if (sessionStorage.getItem('kolonne2') == 'prize_money_total') {
      sessionStorage.setItem('kolonne', 'ass_coeff')
      sessionStorage.setItem('rekkefølge', 'desc')
      sessionStorage.setItem('kolonne2', 'ass_coeff_total')
      sessionStorage.setItem('rekkefølge2', 'desc')
  }
  if (sessionStorage.getItem('kolonne')) {}
  else {
      sessionStorage.setItem('kolonne', 'ass_coeff')
      sessionStorage.setItem('rekkefølge', 'desc')
      sessionStorage.setItem('kolonne2', 'ass_coeff_total')
      sessionStorage.setItem('rekkefølge2', 'desc')
  }
  sessionStorage.setItem('trykte_knapper', JSON.stringify([]))
  sessionStorage.setItem('trykte_knapper_exclude', JSON.stringify([]))
  localStorage.setItem('filter_land', JSON.stringify([]))
  sessionStorage.setItem('spoiler', 'synlig')
}



function regn_ut_NA_poeng() {
  let klubbers_assosiasjon = []
  for (i = 0; i < menyvalg.length; i++) {
    klubbers_assosiasjon.push(menyvalg[i][1])
  }
  let aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(2,4) - 21;
  let NA_poeng_og_assosiasjon = [];
  // Kanskje fjern
  let denne_NA_poeng_og_assos_skygge = [];
  let denne_NA_poeng_og_assos_skygge2 = [];
  // -------------------
  for (i = 0; i < landskoeffisienter.length; i++) {
    // Kanskje fjern
    denne_NA_poeng_og_assos_skygge = [];
    // -------------------
    let indeks = 0
    let indeks_klubb = []
    do {
      indeks_klubb.push(klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks))
      indeks = klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks) + 1
    }
    while (klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks) != -1)
  
  
  
    let enkelt_sesong1 = 0;
    var koeff_sesong2 = 0;
    var koeff_sesong3 = 0;
    var koeff_sesong4 = 0;
    var koeff_sesong5 = 0;
    var koeff_sesong6 = 0;
    var koeff_sesong7 = 0;
    var koeff_sesong8 = 0;
    var koeff_sesong9 = 0;
    var koeff_sesong10 = 0;
    let antall_klubber1 = indeks_klubb.length;
    let antall_klubber2 = indeks_klubb.length;
    let antall_klubber3 = indeks_klubb.length;
    let antall_klubber4 = indeks_klubb.length;
    let antall_klubber5 = indeks_klubb.length;
    let antall_klubber6 = indeks_klubb.length;
    let antall_klubber7 = indeks_klubb.length;
    let antall_klubber8 = indeks_klubb.length;
    let antall_klubber9 = indeks_klubb.length;
    let antall_klubber10 = indeks_klubb.length;
    if (aar_etter_forste_periode <= -1) {
      enkelt_sesong1 = parseFloat(landskoeffisienter[i][11 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode + 1)))+2-antall_MV_elem] == undefined) {
          antall_klubber1 -= 1
        } else {
          enkelt_sesong1 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode + 1) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode + 1) * antall_MV_elem)) , aar_etter_forste_periode) || 0;
        }
      }
      enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0}
    if (aar_etter_forste_periode <= 0) {
      koeff_sesong2 = parseFloat(landskoeffisienter[i][10 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode)))+2-antall_MV_elem] == undefined) {
          antall_klubber2 -= 1
        }
        else {
          koeff_sesong2 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode) * antall_MV_elem)) , aar_etter_forste_periode - 1) || 0;
        }
      }
      koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0}
  
  
  
    if (aar_etter_forste_periode <= 1) {
      koeff_sesong3 = parseFloat(landskoeffisienter[i][9 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 1)))+2-antall_MV_elem] == undefined) {
          antall_klubber3 -= 1
        }
        else {
          koeff_sesong3 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 1) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 1) * antall_MV_elem)) , aar_etter_forste_periode - 2) || 0;
        }
      }
      koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0}
    if (aar_etter_forste_periode <= 2) {
      koeff_sesong4 = parseFloat(landskoeffisienter[i][8 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 2)))+2-antall_MV_elem] == undefined) {
          antall_klubber4 -= 1
        }
        else {
          koeff_sesong4 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 2) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 2) * antall_MV_elem)) , aar_etter_forste_periode - 3) || 0;
        }
      }
      koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0}
    if (aar_etter_forste_periode <= 3) {
      koeff_sesong5 = parseFloat(landskoeffisienter[i][7 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 3)))+2-antall_MV_elem] == undefined) {
          antall_klubber5 -= 1
        }
        else {
          koeff_sesong5 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 3) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 3) * antall_MV_elem)) , aar_etter_forste_periode - 4) || 0;
        }
      }
      koeff_sesong5 = Math.floor(koeff_sesong5 * 1000/antall_klubber5) / 1000 || 0}
    if (aar_etter_forste_periode <= 4) {
      koeff_sesong6 = parseFloat(landskoeffisienter[i][6 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 4)))+2-antall_MV_elem] == undefined) {
          antall_klubber6 -= 1
        } else {
          koeff_sesong6 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 4) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 4) * antall_MV_elem)) , aar_etter_forste_periode - 5) || 0;
        }
      }
      koeff_sesong6 = Math.floor(koeff_sesong6 * 1000/antall_klubber6) / 1000 || 0}
    if (aar_etter_forste_periode <= 5) {
      koeff_sesong7 = parseFloat(landskoeffisienter[i][5 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 5)))+2-antall_MV_elem] == undefined) {
          antall_klubber7 -= 1
        } else {
          koeff_sesong7 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 5) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 5) * antall_MV_elem)) , aar_etter_forste_periode - 6) || 0;
        }
      }
      koeff_sesong7 = Math.floor(koeff_sesong7 * 1000/antall_klubber7) / 1000 || 0}
    if (aar_etter_forste_periode <= 6) {
      koeff_sesong8 = parseFloat(landskoeffisienter[i][4 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 6)))+2-antall_MV_elem] == undefined) {
          antall_klubber8 -= 1
        } else {
          koeff_sesong8 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 6) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 6) * antall_MV_elem)) , aar_etter_forste_periode - 7) || 0;
        }
      }
      koeff_sesong8 = Math.floor(koeff_sesong8 * 1000/antall_klubber8) / 1000 || 0}
    if (aar_etter_forste_periode <= 7) {
      koeff_sesong9 = parseFloat(landskoeffisienter[i][3 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 7)))+2-antall_MV_elem] == undefined) {
          antall_klubber9 -= 1
        } else {
          koeff_sesong9 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 7) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 7) * antall_MV_elem)) , aar_etter_forste_periode - 8) || 0;
        }
      }
      koeff_sesong9 = Math.floor(koeff_sesong9 * 1000/antall_klubber9) / 1000 || 0}
    if (aar_etter_forste_periode <= 8) {
      koeff_sesong10 = parseFloat(landskoeffisienter[i][2 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 8)))+2-antall_MV_elem] == undefined) {
          antall_klubber10 -= 1
        } else {
          koeff_sesong10 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 8) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 8) * antall_MV_elem)) , aar_etter_forste_periode - 9) || 0;
        }
      }
      koeff_sesong10 = Math.floor(koeff_sesong10 * 1000/antall_klubber10) / 1000 || 0}


    if (landskoeffisienter[i][0] == 'RUS') {
      if ([1,2].includes(aar_etter_forste_periode)) {
        enkelt_sesong1 = 4.333
      }
      if ([2,3].includes(aar_etter_forste_periode)) {
        koeff_sesong2 = 4.333
      }
      if ([3,4].includes(aar_etter_forste_periode)) {
        koeff_sesong3 = 4.333
      }
      if ([4,5].includes(aar_etter_forste_periode)) {
        koeff_sesong4 = 4.333
      }
      if ([5,6].includes(aar_etter_forste_periode)) {
        koeff_sesong5 = 4.333
      }
      if ([6,7].includes(aar_etter_forste_periode)) {
        koeff_sesong6 = 4.333
      }
      if ([7,8].includes(aar_etter_forste_periode)) {
        koeff_sesong7 = 4.333
      }
      if ([8,9].includes(aar_etter_forste_periode)) {
        koeff_sesong8 = 4.333
      }
      if ([9,10].includes(aar_etter_forste_periode)) {
        koeff_sesong9 = 4.333
      }
      if ([10, 11].includes(aar_etter_forste_periode)) {
        koeff_sesong10 = 4.333
      }
    }
    //Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng.
		// if (['ENG'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 += 0.625}
    //   else if (aar_etter_forste_periode == 3) {koeff_sesong2 += 0.625}
    //   else if (aar_etter_forste_periode == 4) {koeff_sesong3 += 0.625}
    //   else if (aar_etter_forste_periode == 5) {koeff_sesong4 += 0.625}
    //   else if (aar_etter_forste_periode == 6) {koeff_sesong5 += 0.625}
    //   else if (aar_etter_forste_periode == 7) {koeff_sesong6 += 0.625}
    //   else if (aar_etter_forste_periode == 8) {koeff_sesong7 += 0.625}
    //   else if (aar_etter_forste_periode == 9) {koeff_sesong8 += 0.625}
    //   else if (aar_etter_forste_periode == 10) {koeff_sesong9 += 0.625}
    //   else if (aar_etter_forste_periode == 11) {koeff_sesong10 += 0.625}}
		// if (['ITA'].includes(landskoeffisienter[i][0])) {
		// 	if (aar_etter_forste_periode == 2) {enkelt_sesong1 += 0.429}
		// 	else if (aar_etter_forste_periode == 3) {koeff_sesong2 += 0.429}
		// 	else if (aar_etter_forste_periode == 4) {koeff_sesong3 += 0.429}
		// 	else if (aar_etter_forste_periode == 5) {koeff_sesong4 += 0.429}
		// 	else if (aar_etter_forste_periode == 6) {koeff_sesong5 += 0.429}
		// 	else if (aar_etter_forste_periode == 7) {koeff_sesong6 += 0.429}
		// 	else if (aar_etter_forste_periode == 8) {koeff_sesong7 += 0.429}
		// 	else if (aar_etter_forste_periode == 9) {koeff_sesong8 += 0.429}
		// 	else if (aar_etter_forste_periode == 10) {koeff_sesong9 += 0.429}
		// 	else if (aar_etter_forste_periode == 11) {koeff_sesong10 += 0.429}}
		// else if (['GRE'].includes(landskoeffisienter[i][0])) {
		// 	if (aar_etter_forste_periode == 2) {enkelt_sesong1 += 1.000}
		// 	else if (aar_etter_forste_periode == 3) {koeff_sesong2 += 1.000}
		// 	else if (aar_etter_forste_periode == 4) {koeff_sesong3 += 1.000}
		// 	else if (aar_etter_forste_periode == 5) {koeff_sesong4 += 1.000}
		// 	else if (aar_etter_forste_periode == 6) {koeff_sesong5 += 1.000}
		// 	else if (aar_etter_forste_periode == 7) {koeff_sesong6 += 1.000}
		// 	else if (aar_etter_forste_periode == 8) {koeff_sesong7 += 1.000}
		// 	else if (aar_etter_forste_periode == 9) {koeff_sesong8 += 1.000}
		// 	else if (aar_etter_forste_periode == 10) {koeff_sesong9 += 1.000}
		// 	else if (aar_etter_forste_periode == 11) {koeff_sesong10 += 1.000}}
		// Brukes når vi vet antallet UCL-klubber fra land, men hvilke klubber det er snakk om er ukjent.
    if (['AUT','SCO','BEL','POR'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 3) {enkelt_sesong1 = 1.200}
      else if (aar_etter_forste_periode == 4) {koeff_sesong2 = 1.200}
      else if (aar_etter_forste_periode == 5) {koeff_sesong3 = 1.200}
      else if (aar_etter_forste_periode == 6) {koeff_sesong4 = 1.200}
      else if (aar_etter_forste_periode == 7) {koeff_sesong5 = 1.200}
      else if (aar_etter_forste_periode == 8) {koeff_sesong6 = 1.200}
      else if (aar_etter_forste_periode == 9) {koeff_sesong7 = 1.200}
      else if (aar_etter_forste_periode == 10) {koeff_sesong8 = 1.200}
      else if (aar_etter_forste_periode == 11) {koeff_sesong9 = 1.200}
      else if (aar_etter_forste_periode == 12) {koeff_sesong10 = 1.200}}
    else if (['NED'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 3) {enkelt_sesong1 = 2.000}
      else if (aar_etter_forste_periode == 4) {koeff_sesong2 = 2.000}
      else if (aar_etter_forste_periode == 5) {koeff_sesong3 = 2.000}
      else if (aar_etter_forste_periode == 6) {koeff_sesong4 = 2.000}
      else if (aar_etter_forste_periode == 7) {koeff_sesong5 = 2.000}
      else if (aar_etter_forste_periode == 8) {koeff_sesong6 = 2.000}
      else if (aar_etter_forste_periode == 9) {koeff_sesong7 = 2.000}
      else if (aar_etter_forste_periode == 10) {koeff_sesong8 = 2.000}
      else if (aar_etter_forste_periode == 11) {koeff_sesong9 = 2.000}
      else if (aar_etter_forste_periode == 12) {koeff_sesong10 = 2.000}}
    else if (['FRA'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 3) {enkelt_sesong1 = 2.571}
      else if (aar_etter_forste_periode == 4) {koeff_sesong2 = 2.571}
      else if (aar_etter_forste_periode == 5) {koeff_sesong3 = 2.571}
      else if (aar_etter_forste_periode == 6) {koeff_sesong4 = 2.571}
      else if (aar_etter_forste_periode == 7) {koeff_sesong5 = 2.571}
      else if (aar_etter_forste_periode == 8) {koeff_sesong6 = 2.571}
      else if (aar_etter_forste_periode == 9) {koeff_sesong7 = 2.571}
      else if (aar_etter_forste_periode == 10) {koeff_sesong8 = 2.571}
      else if (aar_etter_forste_periode == 11) {koeff_sesong9 = 2.571}
      else if (aar_etter_forste_periode == 12) {koeff_sesong10 = 2.571}}
    else if (['GER','ESP','ENG'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 3) {enkelt_sesong1 = 3.428}
      else if (aar_etter_forste_periode == 4) {koeff_sesong2 = 3.428}
      else if (aar_etter_forste_periode == 5) {koeff_sesong3 = 3.428}
      else if (aar_etter_forste_periode == 6) {koeff_sesong4 = 3.428}
      else if (aar_etter_forste_periode == 7) {koeff_sesong5 = 3.428}
      else if (aar_etter_forste_periode == 8) {koeff_sesong6 = 3.428}
      else if (aar_etter_forste_periode == 9) {koeff_sesong7 = 3.428}
      else if (aar_etter_forste_periode == 10) {koeff_sesong8 = 3.428}
      else if (aar_etter_forste_periode == 11) {koeff_sesong9 = 3.428}
      else if (aar_etter_forste_periode == 12) {koeff_sesong10 = 3.428}}
		else if (['ITA'].includes(landskoeffisienter[i][0])) {
			if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 3.750}
			else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 3.750}
			else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 3.750}
			else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 3.750}
			else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 3.750}
			else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 3.750}
			else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 3.750}
			else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 3.750}
			else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 3.750}
			else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 3.750}}
		// Sesongen etter.
		if (['CZE','TUR','BEL','POR'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 1.200}
      else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 1.200}
      else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 1.200}
      else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 1.200}
      else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 1.200}
      else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 1.200}
      else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 1.200}
      else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 1.200}
      else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 1.200}
      else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 1.200}}
    else if (['NED'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 2.000}
      else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 2.000}
      else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 2.000}
      else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 2.000}
      else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 2.000}
      else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 2.000}
      else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 2.000}
      else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 2.000}
      else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 2.000}
      else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 2.000}}
    else if (['FRA'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 2.571}
      else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 2.571}
      else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 2.571}
      else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 2.571}
      else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 2.571}
      else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 2.571}
      else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 2.571}
      else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 2.571}
      else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 2.571}
      else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 2.571}}
    else if (['GER','ITA','ESP','ENG'].includes(landskoeffisienter[i][0])) {
      if (aar_etter_forste_periode == 4) {enkelt_sesong1 = 3.428}
      else if (aar_etter_forste_periode == 5) {koeff_sesong2 = 3.428}
      else if (aar_etter_forste_periode == 6) {koeff_sesong3 = 3.428}
      else if (aar_etter_forste_periode == 7) {koeff_sesong4 = 3.428}
      else if (aar_etter_forste_periode == 8) {koeff_sesong5 = 3.428}
      else if (aar_etter_forste_periode == 9) {koeff_sesong6 = 3.428}
      else if (aar_etter_forste_periode == 10) {koeff_sesong7 = 3.428}
      else if (aar_etter_forste_periode == 11) {koeff_sesong8 = 3.428}
      else if (aar_etter_forste_periode == 12) {koeff_sesong9 = 3.428}
      else if (aar_etter_forste_periode == 13) {koeff_sesong10 = 3.428}}

    
    let denne_NA_poeng_og_assos = []

    denne_NA_poeng_og_assos.push(landskoeffisienter[i][0])
    denne_NA_poeng_og_assos.push((koeff_sesong10 + koeff_sesong9 + koeff_sesong8 + koeff_sesong7 + koeff_sesong6 + koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
    // Kanskje fjern
    denne_NA_poeng_og_assos_skygge.push(landskoeffisienter[i][0])
    denne_NA_poeng_og_assos_skygge.push((koeff_sesong10 + koeff_sesong9 + koeff_sesong8 + koeff_sesong7 + koeff_sesong6 + koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
    denne_NA_poeng_og_assos_skygge.push(enkelt_sesong1)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong2)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong3)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong4)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong5)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong6)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong7)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong8)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong9)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong10)
    // -------------------
    NA_poeng_og_assosiasjon.push(denne_NA_poeng_og_assos)
    // Kanskje fjern
    denne_NA_poeng_og_assos_skygge2.push(denne_NA_poeng_og_assos_skygge)
    // -------------------
  }
  // Kanskje fjern
	denne_NA_poeng_og_assos_skygge2.sort(sortFunction_tall_1_flere_desimal_nyligste_land);

  for (i = 0; i < denne_NA_poeng_og_assos_skygge2.length; i++) {
    denne_NA_poeng_og_assos_skygge2[i].push(i+1);
    if (i > 0) {
      let poeng_lik = (denne_NA_poeng_og_assos_skygge2[i][1] == denne_NA_poeng_og_assos_skygge2[i-1][1])
      let kolonne1_lik = (denne_NA_poeng_og_assos_skygge2[i][2] == denne_NA_poeng_og_assos_skygge2[i-1][2])
      let kolonne2_lik = (denne_NA_poeng_og_assos_skygge2[i][3] == denne_NA_poeng_og_assos_skygge2[i-1][3])
      let kolonne3_lik = (denne_NA_poeng_og_assos_skygge2[i][4] == denne_NA_poeng_og_assos_skygge2[i-1][4])
      let kolonne4_lik = (denne_NA_poeng_og_assos_skygge2[i][5] == denne_NA_poeng_og_assos_skygge2[i-1][5])
      let kolonne5_lik = (denne_NA_poeng_og_assos_skygge2[i][6] == denne_NA_poeng_og_assos_skygge2[i-1][6])
      let kolonne6_lik = (denne_NA_poeng_og_assos_skygge2[i][7] == denne_NA_poeng_og_assos_skygge2[i-1][7])
      let kolonne7_lik = (denne_NA_poeng_og_assos_skygge2[i][8] == denne_NA_poeng_og_assos_skygge2[i-1][8])
      let kolonne8_lik = (denne_NA_poeng_og_assos_skygge2[i][9] == denne_NA_poeng_og_assos_skygge2[i-1][9])
      let kolonne9_lik = (denne_NA_poeng_og_assos_skygge2[i][10] == denne_NA_poeng_og_assos_skygge2[i-1][10])
      let kolonne10_lik = (denne_NA_poeng_og_assos_skygge2[i][11] == denne_NA_poeng_og_assos_skygge2[i-1][11])
      if (poeng_lik && kolonne1_lik && kolonne2_lik && kolonne3_lik && kolonne4_lik && kolonne5_lik && kolonne6_lik && kolonne7_lik && kolonne8_lik && kolonne9_lik && kolonne10_lik) {
        denne_NA_poeng_og_assos_skygge2[i].splice(12,1,denne_NA_poeng_og_assos_skygge2[i-1][12])
      }
    }
    for (p = 0; p < NA_poeng_og_assosiasjon.length; p++) {
      if (NA_poeng_og_assosiasjon[p][0] == denne_NA_poeng_og_assos_skygge2[i][0])
      
      NA_poeng_og_assosiasjon[p].push(denne_NA_poeng_og_assos_skygge2[i][12]);
    }
  }
  // -------------------
  return NA_poeng_og_assosiasjon
}

// window.onscroll = function() {myFunction()};
// function myFunction() {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//   var scrolled = (winScroll / height) * 100;
//   document.getElementById("ad_venstre").style.top = -1.5*scrolled + "px";
//   document.getElementById("ad_hoyre").style.top = -1.5*scrolled + "px";
// }

let vinduBredde = (window.innerWidth > 0) ? window.innerWidth : screen.width;
$(window).resize(function() {
  if (vinduBredde >= 2035) {
    if (((window.innerWidth > 0) ? window.innerWidth : screen.width) < 2035) {
      for (let i = 0; i < document.getElementsByClassName("reaklame_sidene").length; i++) {
        document.getElementsByClassName("reaklame_sidene")[i].style.display = "none";
      }
    }
    else {
      for (let i = 0; i < document.getElementsByClassName("reaklame_sidene").length; i++) {
        document.getElementsByClassName("reaklame_sidene")[i].style.display = "block";
      }
    }
  }
  else if (vinduBredde >= 1830) {
    if (((window.innerWidth > 0) ? window.innerWidth : screen.width) < 1830) {
      for (let i = 0; i < document.getElementsByClassName("reaklame_sidene").length; i++) {
        document.getElementsByClassName("reaklame_sidene")[i].style.display = "none";
      }
    }
    else {
      for (let i = 0; i < document.getElementsByClassName("reaklame_sidene").length; i++) {
        document.getElementsByClassName("reaklame_sidene")[i].style.display = "block";
      }
    }
  }
  else if (vinduBredde >= 1728) {
    if (((window.innerWidth > 0) ? window.innerWidth : screen.width) < 1728) {
      for (let i = 0; i < document.getElementsByClassName("reaklame_sidene").length; i++) {
        document.getElementsByClassName("reaklame_sidene")[i].style.display = "none";
      }
    }
    else {
      for (let i = 0; i < document.getElementsByClassName("reaklame_sidene").length; i++) {
        document.getElementsByClassName("reaklame_sidene")[i].style.display = "block";
      }
    }
  }
})