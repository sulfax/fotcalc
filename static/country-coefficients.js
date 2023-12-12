(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

let opp_ned_pil = '<span><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
let opp_ned_pil_margin = '<span class="margin"><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
let opp_ned_pil_midten = '<span><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
var eksperimentell_profil_e = "Calculate from scratch";
var eksperimentell_profil_n = "Kalkuler fra bunnen";
var din_klubbs_premi_koef_e = "your club's prize money";
var din_klubbs_premi_koef_n = "din klubbs premiepenger";
let filter_land = []
let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
if (filter_land_før == '') {
  localStorage.setItem('filter_land', JSON.stringify([]))
  filter_land_før = [];
}

let antall_MV_elem = 6;
let ranking_array = []
let land_ranking = []
let twitterDataTAB = [];

const tilgangslister = ['https://kassiesa.net/uefa/AccessList2022.html',
                        'https://kassiesa.net/uefa/AccessList2023.html',
                        'https://kassiesa.net/uefa/AccessList2024.html',
                        'https://kassiesa.net/uefa/AccessList2024.html',
                        'https://kassiesa.net/uefa/AccessList2024.html',
]

if (sessionStorage.getItem('kolonne_landskoeffisient') == 'undefined') {
  sessionStorage.setItem('kolonne_landskoeffisient', 'id_nr')
}
if (sessionStorage.getItem('rekkefølge_landskoeffisient') == 'undefined') {
  sessionStorage.setItem('rekkefølge_landskoeffisient', 'asc')
}
try {if (sessionStorage.getItem('dropdownmeny_valg_landskoeffisient').length > 10) {
  sessionStorage.setItem('dropdownmeny_valg_landskoeffisient', 2000+nåværende_sesong_periode_valg[0] + '/' + nåværende_sesong_periode_valg[2]);
}}
catch {null;}
document.getElementById("dropDownMeny").innerHTML = (sessionStorage.getItem('dropdownmeny_valg_landskoeffisient') || (2000+nåværende_sesong_periode_valg[0]) + '/' + (nåværende_sesong_periode_valg[2])) + " <div class='opp_ned_pil'>&#10094</div>";
document.getElementById("dropDownMeny2").innerHTML = (sessionStorage.getItem('dropdownmeny_valg_landskoeffisient') || (2000+nåværende_sesong_periode_valg[0]) + '/' + (nåværende_sesong_periode_valg[2])) + " <div class='opp_ned_pil'>&#10094</div>";
let aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(2,4) - 21;

// Skal legge lands-koeffisientpoengene inn her:
let landskoeffisienter_totalt = []

let flaggEmoji = [
  ["ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"],
  ["ESP", "🇪🇸"], 
  ["ITA", "🇮🇹"], 
  ["GER", "🇩🇪"], 
  ["NED", "🇳🇱"], 
  ["FRA", "🇫🇷"], 
  ["POR", "🇵🇹"], 
  ["BEL", "🇧🇪"], 
  ["TUR", "🇹🇷"], 
  ["SCO", "🏴󠁧󠁢󠁳󠁣󠁴󠁿"], 
  ["AUT", "🇦🇹"], 
  ["SUI", "🇨🇭"], 
  ["CZE", "🇨🇿"], 
  ["DEN", "🇩🇰"], 
  ["NOR", "🇳🇴"], 
  ["SRB", "🇷🇸"], 
  ["UKR", "🇺🇦"], 
  ["ISR", "🇮🇱"], 
  ["GRE", "🇬🇷"], 
  ["POL", "🇵🇱"], 
  ["CRO", "🇭🇷"], 
  ["RUS", "🇷🇺"], 
  ["CYP", "🇨🇾"], 
  ["SWE", "🇸🇪"], 
  ["ROU", "🇷🇴"], 
  ["HUN", "🇭🇺"], 
  ["SVK", "🇸🇰"], 
  ["BUL", "🇧🇬"], 
  ["AZE", "🇦🇿"], 
  ["MDA", "🇲🇩"], 
  ["SVN", "🇸🇮"], 
  ["KVX", "🇽🇰"], 
  ["KAZ", "🇰🇿"], 
  ["IRL", "🇮🇪"], 
  ["FIN", "🇫🇮"], 
  ["ARM", "🇦🇲"], 
  ["LVA", "🇱🇻"], 
  ["FRO", "🇫🇴"], 
  ["LIE", "🇱🇮"], 
  ["BIH", "🇧🇦"], 
  ["ISL", "🇮🇸"], 
  ["NIR", "#NIR"], 
  ["LUX", "🇱🇺"], 
  ["LTU", "🇱🇹"], 
  ["MLT", "🇲🇹"], 
  ["GEO", "🇬🇪"], 
  ["ALB", "🇦🇱"], 
  ["EST", "🇪🇪"], 
  ["BLR", "🇧🇾"], 
  ["MKD", "🇲🇰"], 
  ["AND", "🇦🇩"], 
  ["WAL", "🏴󠁧󠁢󠁷󠁬󠁳󠁿"], 
  ["MNE", "🇲🇪"], 
  ["GIB", "🇬🇮"], 
  ["SMR", "🇸🇲"],
]


let forrigeUkeData = [
  ["ENG", 11.750, 1, 1, 1, 1, 2],
  ["ESP", 11.437, 2, 3, 3, 4, 4],
  ["ITA", 11.714, 3, 2, 2, 2, 3],
  ["GER", 12.642, 4, 4, 4, 3, 1],
  ["NED", 8.000, 6, 5, 5, 7, 9],
  ["FRA", 9.083, 5, 6, 6, 6, 7],
  ["POR", 6.000, 7, 7, 7, 9, 14],
  ["BEL", 9.800, 8, 8, 8, 5, 5],
  ["TUR", 9.000, 9, 9, 9, 8, 8],
  ["SCO", 4.000, 10, 16, 19, 27, 18],
  ["AUT", 3.800, 13, 13, 14, 22, 24],
  ["SUI", 4.000, 12, 14, 12, 13, 18],
  ["CZE", 9.250, 11, 10, 10, 10, 6],
  ["DEN", 6.750, 15, 15, 11, 12, 11],
  ["NOR", 6.250, 14, 11, 13, 15, 12],
  ["SRB", 1.400, 17, 19, 18, 31, 46],
  ["UKR", 3.500, 18, 20, 22, 19, 26],
  ["ISR", 6.000, 16, 12, 15, 14, 14],
  ["GRE", 7.000, 19, 18, 17, 20, 10],
  ["POL", 6.125, 20, 17, 16, 11, 13],
  ["CRO", 3.875, 21, 21, 23, 28, 21],
  ["RUS", 4.333, 22, 22, 21, 23, 17],
  ["CYP", 3.750, 23, 23, 25, 21, 25],
  ["SWE", 1.875, 24, 26, 24, 24, 38],
  ["ROU", 3.250, 26, 27, 28, 18, 29],
  ["HUN", 4.000, 25, 24, 26, 17, 18],
  ["SVK", 5.000, 27, 25, 20, 16, 16],
  ["BUL", 3.375, 28, 28, 29, 26, 27],
  ["AZE", 3.875, 29, 29, 27, 25, 21],
  ["MDA", 2.000, 30, 30, 30, 33, 36],
  ["SVN", 3.375, 31, 31, 31, 34, 27],
  ["KVX", 3.000, 32, 32, 33, 32, 31],
  ["KAZ", 3.125, 33, 39, 36, 40, 30],
  ["IRL", 1.500, 35, 33, 35, 36, 43],
  ["FIN", 1.750, 34, 34, 34, 38, 39],
  ["ARM", 2.250, 36, 40, 40, 37, 33],
  ["LVA", 1.625, 37, 37, 37, 39, 42],
  ["FRO", 2.750, 38, 35, 39, 35, 32],
  ["LIE", 0.500, 39, 42, 38, 29, 52],
  ["BIH", 2.000, 40, 38, 42, 42, 36],
  ["ISL", 3.833, 41, 36, 32, 30, 23],
  ["NIR", 1.125, 42, 44, 47, 49, 49],
  ["LUX", 2.250, 43, 47, 45, 44, 33],
  ["LTU", 1.125, 44, 43, 43, 43, 49],
  ["MLT", 1.500, 45, 41, 41, 41, 43],
  ["GEO", 1.250, 46, 49, 50, 48, 48],
  ["ALB", 2.125, 47, 45, 46, 46, 35],
  ["EST", 0.125, 48, 46, 44, 53, 55],
  ["BLR", 1.750, 49, 53, 53, 47, 39],
  ["MKD", 1.500, 50, 48, 49, 45, 43],
  ["AND", 1.666, 51, 52, 48, 51, 41],
  ["WAL", 0.625, 52, 50, 51, 52, 51],
  ["MNE", 1.333, 53, 51, 52, 50, 47],
  ["GIB", 0.166, 54, 54, 54, 55, 54],
  ["SMR", 0.333, 55, 55, 55, 54, 53],  
]



oppdater_ved_refresh()
function oppdater_ved_refresh() {
  landskoeffisienter_totalt = []
  document.getElementById("dropDownMeny").innerHTML = (sessionStorage.getItem('dropdownmeny_valg_landskoeffisient') || (2000+nåværende_sesong_periode_valg[0]) + '/' + (nåværende_sesong_periode_valg[2])) + " <div class='opp_ned_pil'>&#10094</div>";
  document.getElementById("dropDownMeny2").innerHTML = (sessionStorage.getItem('dropdownmeny_valg_landskoeffisient') || (2000+nåværende_sesong_periode_valg[0]) + '/' + (nåværende_sesong_periode_valg[2])) + " <div class='opp_ned_pil'>&#10094</div>";
  aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(2,4) - 21;
  ranking_array = []
  testTabell = document.getElementById('minTest')


  var klubbers_assosiasjon = []
  let p = 17;
  let pilstatus = '';
  let pilstatus2 = '';
  for (i = 0; i < 5; i++) {
    pilstatus = (document.getElementById('sesong' + (i + 1)).innerHTML).slice(5)
    pilstatus2 = (document.getElementById('sesong' + (i + 1) + '_klubb').innerHTML).slice(5)
    document.getElementById('sesong' + (5 - i)).innerHTML = (p + aar_etter_forste_periode) + '/' + ((p + 1) + aar_etter_forste_periode) + pilstatus
    document.getElementById('sesong' + (5 - i) + '_klubb').innerHTML = (p + aar_etter_forste_periode) + '/' + ((p + 1) + aar_etter_forste_periode) + pilstatus2
    p += 1;
  }
  if (aar_etter_forste_periode >= 0) {
    for (i = 0; i < menyvalg.length; i++) {
      klubbers_assosiasjon.push(menyvalg[i][1])
    }
  }
  else {
    for (i = 0; i < klubb_koeffisienter_1112_2021.length; i++) {
      if (klubb_koeffisienter_1112_2021[i][12 + aar_etter_forste_periode] != undefined) {
        klubbers_assosiasjon.push(klubb_koeffisienter_1112_2021[i][1])
      }
    }
  }
  for (i = 0; i < landskoeffisienter.length; i++) {
    let assos_ranking_array = []
    let indeks = 0
    let indeks_klubb = []
    do {
      if (aar_etter_forste_periode >= 0) {
        indeks_klubb.push(klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks))
        indeks = klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks) + 1
      }
      else {
        indeks_klubb.push(klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks))
        indeks = klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks) + 1
      }
    }
    while (klubbers_assosiasjon.indexOf(landskoeffisienter[i][0], indeks) != -1)

    let enkelt_sesong1 = 0
    var koeff_sesong2 = 0;
    var koeff_sesong3 = 0;
    var koeff_sesong4 = 0;
    var koeff_sesong5 = 0;
    let koeff_sesong6 = 0;
    let koeff_sesong7 = 0;
    let koeff_sesong8 = 0;
    let koeff_sesong9 = 0;
    let antall_klubber1 = indeks_klubb.length;
    let antall_klubber2 = indeks_klubb.length;
    let antall_klubber3 = indeks_klubb.length;
    let antall_klubber4 = indeks_klubb.length;
    let antall_klubber5 = indeks_klubb.length;
    let antall_klubber6 = indeks_klubb.length;
    let antall_klubber7 = indeks_klubb.length;
    let antall_klubber8 = indeks_klubb.length;
    let antall_klubber9 = indeks_klubb.length;
    if (aar_etter_forste_periode <= -1) {
      enkelt_sesong1 = parseFloat(landskoeffisienter[i][11 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode + 1)))+2-antall_MV_elem] == undefined) {
          antall_klubber1 -= 1
        }
        else {
          enkelt_sesong1 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode + 1) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode + 1) * antall_MV_elem)) , aar_etter_forste_periode) || 0;
        }
      }
      enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0;
    }

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
      koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0;
    }



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
      koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0;
    }
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
      koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0;
    }
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
      koeff_sesong5 = Math.floor(koeff_sesong5 * 1000/antall_klubber5) / 1000 || 0;
    }
    if (aar_etter_forste_periode <= 4) {
      koeff_sesong6 = parseFloat(landskoeffisienter[i][6 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 4)))+2-antall_MV_elem] == undefined) {
          antall_klubber6 -= 1
        }
        else {
          koeff_sesong6 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 4) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 4) * antall_MV_elem)) , aar_etter_forste_periode - 5) || 0;
        }
      }
      koeff_sesong6 = Math.floor(koeff_sesong6 * 1000/antall_klubber6) / 1000 || 0;
    }
    if (aar_etter_forste_periode <= 4) {
      koeff_sesong7 = parseFloat(landskoeffisienter[i][5 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 5)))+2-antall_MV_elem] == undefined) {
          antall_klubber7 -= 1
        }
        else {
          koeff_sesong7 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 5) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 5) * antall_MV_elem)) , aar_etter_forste_periode - 6) || 0;
        }
      }
      koeff_sesong7 = Math.floor(koeff_sesong7 * 1000/antall_klubber7) / 1000 || 0;
    }
    if (aar_etter_forste_periode <= 4) {
      koeff_sesong8 = parseFloat(landskoeffisienter[i][4 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 6)))+2-antall_MV_elem] == undefined) {
          antall_klubber8 -= 1
        }
        else {
          koeff_sesong8 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 6) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 6) * antall_MV_elem)) , aar_etter_forste_periode - 7) || 0;
        }
      }
      koeff_sesong8 = Math.floor(koeff_sesong8 * 1000/antall_klubber8) / 1000 || 0;
    }
    if (aar_etter_forste_periode <= 4) {
      koeff_sesong9 = parseFloat(landskoeffisienter[i][3 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 7)))+2-antall_MV_elem] == undefined) {
          antall_klubber9 -= 1
        }
        else {
          koeff_sesong9 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 7) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 7) * antall_MV_elem)) , aar_etter_forste_periode - 8) || 0;
        }
      }
      koeff_sesong9 = Math.floor(koeff_sesong9 * 1000/antall_klubber9) / 1000 || 0;
    }

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
    }
    //Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng.
    // if (['NOR'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 += 1.666}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 += 1.666}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 += 1.666}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 += 1.666}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 += 1.666}}
    // if (['UKR','SRB','SCO','AUT','NED'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 0.8}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 0.8}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 0.8}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 0.8}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 0.8}}
    // if (['POR','FRA'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 1.333}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 1.333}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 1.333}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 1.333}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 1.333}}
    // if (['ENG'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 2}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2}}
    // if (['GER','ITA'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 2.285}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2.285}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2.285}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2.285}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2.285}}
    // if (['ESP'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 2.5}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2.5}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2.5}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2.5}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2.5}}
    assos_ranking_array.push(landskoeffisienter[i][0])
    assos_ranking_array.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
    landskoeffisienter_totalt.push([assos_ranking_array[1]])
    assos_ranking_array.push(enkelt_sesong1.toFixed(3))
    assos_ranking_array.push(koeff_sesong2.toFixed(3))
    assos_ranking_array.push(koeff_sesong3.toFixed(3))
    assos_ranking_array.push(koeff_sesong4.toFixed(3))
    assos_ranking_array.push(koeff_sesong5.toFixed(3))
    assos_ranking_array.push(koeff_sesong6.toFixed(3))
    assos_ranking_array.push(koeff_sesong7.toFixed(3))
    assos_ranking_array.push(koeff_sesong8.toFixed(3))
    assos_ranking_array.push(koeff_sesong9.toFixed(3))
    assos_ranking_array.push(landskoeffisienter[i][11])
    assos_ranking_array.push(landskoeffisienter[i][12])

    let klubber_igjen = antall_klubber1
    for (p = 0; p < menyvalg.length; p++) {
      if (menyvalg[p][1] == landskoeffisienter[i][0]) {
        if (menyvalg[p][(antall_MV_elem * ((aar_etter_forste_periode+1)))+(2-antall_MV_elem)] != undefined && aar_etter_forste_periode >= 0) {
          let gruppespillsplassering = menyvalg[p][(antall_MV_elem * (aar_etter_forste_periode+1))+(5-antall_MV_elem)]
          if (gruppespillsplassering == '4,,' || gruppespillsplassering == ',4,' || gruppespillsplassering == ',,3' || gruppespillsplassering == ',,4') {
            klubber_igjen -= 1
          }
          else {
            antall_knapper = (menyvalg[p][(antall_MV_elem * (aar_etter_forste_periode+1))+(2-antall_MV_elem)]).split(',')
            for (s = 0; s < antall_knapper.length; s++) {
              if (antall_knapper[s] == 'b5' || antall_knapper[s] == 'b8' || antall_knapper[s] == 'b12' || antall_knapper[s] == 'b17' || antall_knapper[s] == 'KO') {
                klubber_igjen -= 1
                break
              }
            }
          }
        } else if (aar_etter_forste_periode < 0) {klubber_igjen=0}
      }
    }
    if (aar_etter_forste_periode < 2) {
      assos_ranking_array.push(klubber_igjen + '/' + antall_klubber1);
    }
    else {
      let klubber_totalt = (totalt_antall_klubber[i][aar_etter_forste_periode-2]);
      if (!klubber_totalt && klubber_totalt != 0) {klubber_totalt = '?'}
      assos_ranking_array.push(klubber_igjen + '/' + (klubber_totalt));
    }
    // if (aar_etter_forste_periode <= 1) {
    //   assos_ranking_array.push(landskoeffisienter[i][3 + aar_etter_forste_periode].toFixed(3))
    // }
    // else {assos_ranking_array.push(landskoeffisienter[i][4].toFixed(3))}
    // if (aar_etter_forste_periode <= 2) {
    //   assos_ranking_array.push(landskoeffisienter[i][2 + aar_etter_forste_periode].toFixed(3))
    // }
    // else {assos_ranking_array.push(landskoeffisienter[i][4].toFixed(3))}
    // if (aar_etter_forste_periode <= 3) {
    //   assos_ranking_array.push(landskoeffisienter[i][1 + aar_etter_forste_periode].toFixed(3)) 
    // }
    // else {assos_ranking_array.push(landskoeffisienter[i][4].toFixed(3))}
    ranking_array.push(assos_ranking_array)
    if (ranking_array[i][2] == 0.000) {ranking_array[i][2] = "-";}
    if (ranking_array[i][3] == 0.000) {ranking_array[i][3] = "-";}
    if (ranking_array[i][4] == 0.000) {ranking_array[i][4] = "-";}
    if (ranking_array[i][5] == 0.000) {ranking_array[i][5] = "-";}
    if (ranking_array[i][6] == 0.000) {ranking_array[i][6] = "-";}
    if (ranking_array[i][7] == 0.000) {ranking_array[i][7] = "-";}
    if (ranking_array[i][8] == 0.000) {ranking_array[i][8] = "-";}
    if (ranking_array[i][9] == 0.000) {ranking_array[i][9] = "-";}
    if (ranking_array[i][10] == 0.000) {ranking_array[i][10] = "-";}
    if (ranking_array[i][2] == "-" && antall_klubber1 == 0) {ranking_array[i][2] = "";}
    if (ranking_array[i][3] == "-" && antall_klubber2 == 0) {ranking_array[i][3] = "";}
    if (ranking_array[i][4] == "-" && antall_klubber3 == 0) {ranking_array[i][4] = "";}
    if (ranking_array[i][5] == "-" && antall_klubber4 == 0) {ranking_array[i][5] = "";}
    if (ranking_array[i][6] == "-" && antall_klubber5 == 0) {ranking_array[i][6] = "";}
    if (ranking_array[i][7] == "-" && antall_klubber6 == 0) {ranking_array[i][7] = "";}
    if (ranking_array[i][8] == "-" && antall_klubber7 == 0) {ranking_array[i][8] = "";}
    if (ranking_array[i][9] == "-" && antall_klubber8 == 0) {ranking_array[i][9] = "";}
    if (ranking_array[i][10] == "-" && antall_klubber9 == 0) {ranking_array[i][10] = "";}
    if(aar_etter_forste_periode == -1) {if(ranking_array[i][0] == 'KVX') {ranking_array[i][6] = '';}}
  }

  sorter_etter_sesong(aar_etter_forste_periode)

  let spraak = localStorage.getItem("someVarKey");
  access_list(spraak)
}






$('.tabell_div_landskoeffisient th').on('click', function(){
  var column = $(this).data('column')
  var order = $(this).data('order')
  let tekst = $(this).text()
  if(order == 'desc') {
      $(this).data('order', "asc")
  }
  else {
      $(this).data('order', "desc")
  }
  let aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(2,4) - 21;
  if (column != undefined) {
    sorter(column, order, tekst, ranking_array, aar_etter_forste_periode)
  }
})

function sorter_etter_sesong(aar_etter_forste_periode) {
  let column = sessionStorage.getItem('kolonne_landskoeffisient') || 'id_nr'
  if (column == 'poeng') {column = 'id_nr'} 
  let order = sessionStorage.getItem('rekkefølge_landskoeffisient') || 'asc'
  if(order == 'desc') {
    document.getElementById(column).dataset.order = 'asc';
  }
  else {
    document.getElementById(column).dataset.order = 'desc';
  }
  if (column == 'id_nr') {
    var tekst =  '<span id="poeng_oversett">' + document.getElementById(column).innerText + '</span>'
  } else {var tekst = document.getElementById(column).innerText}
  sorter(column, order, tekst, ranking_array, aar_etter_forste_periode)
}


// Endre meta-beskrivelsene
// document.getElementById("tabell_hoved_2").classList.remove("skjul")
// var descval = document.getElementById('tabell_hoved_2').innerText;
// document.getElementById("tabell_hoved_2").classList.add("skjul")



const table = document.querySelector('table')
const arr = [...table.rows].map(r => [...r.querySelectorAll('td, th')].map(td => td.textContent))
// arr[0][1] = "Country"
// for (i = 0; i < land_ranking.length; i++) {
//   arr[i+1][1] = land_ranking[i]
// }
var link = document.createElement('meta');  link.setAttribute('name', 'description');  link.content = arr; document.getElementsByTagName('head')[0].appendChild(link);


function sorter(column, order, tekst, ranking_array, aar_etter_forste_periode) {
  for (p = 6; p > 1; p--) {
    ranking_array.sort(sortFunction_tall_1_flere_desimal_nyligste);
  }
  for (i = 0; i < ranking_array.length; i++) {
    for (p = 6; p > 1; p--) {
      if (ranking_array[i][p] === "0.000") {ranking_array[i][p] = 0.0001}
    }
  }
  i = 1
  ranking_array.sort(sortFunction_tall_1_forskjellig);

  for (i = 0; i < ranking_array.length; i++) {
    ranking_array[i].push(i+1)
    if (i > 0) {
      let poeng1 = ranking_array[i][1];
      let kolonne1_1 = ranking_array[i][2];
      let kolonne1_2 = ranking_array[i][3];
      let kolonne1_3 = ranking_array[i][4];
      let kolonne1_4 = ranking_array[i][5];
      let kolonne1_5 = ranking_array[i][6];
      let poeng0 = ranking_array[i-1][1];
      let kolonne0_1 = ranking_array[i-1][2];
      let kolonne0_2 = ranking_array[i-1][3];
      let kolonne0_3 = ranking_array[i-1][4];
      let kolonne0_4 = ranking_array[i-1][5];
      let kolonne0_5 = ranking_array[i-1][6];
      if (poeng1 == '-') {poeng0 = ''}
      if (kolonne1_1 == '-' || kolonne1_1 == "0.0001") {kolonne1_1 = ''}
      if (kolonne1_2 == '-' || kolonne1_2 == "0.0001") {kolonne1_2 = ''}
      if (kolonne1_3 == '-' || kolonne1_3 == "0.0001") {kolonne1_3 = ''}
      if (kolonne1_4 == '-' || kolonne1_4 == "0.0001") {kolonne1_4 = ''}
      if (kolonne1_5 == '-' || kolonne1_5 == "0.0001") {kolonne1_5 = ''}
      if (kolonne0_1 == '-' || kolonne0_1 == "0.0001") {kolonne0_1 = ''}
      if (kolonne0_2 == '-' || kolonne0_2 == "0.0001") {kolonne0_2 = ''}
      if (kolonne0_3 == '-' || kolonne0_3 == "0.0001") {kolonne0_3 = ''}
      if (kolonne0_4 == '-' || kolonne0_4 == "0.0001") {kolonne0_4 = ''}
      if (kolonne0_5 == '-' || kolonne0_5 == "0.0001") {kolonne0_5 = ''}
      // Gjør om linjene til kode dersom du ønsker at land uten deltagelse skal være rangert likt som land uten poeng.
      // if (kolonne1_1 == 0) {kolonne1_1 = 0.0001}
      // if (kolonne1_2 == 0) {kolonne1_2 = 0.0001}
      // if (kolonne1_3 == 0) {kolonne1_3 = 0.0001}
      // if (kolonne1_4 == 0) {kolonne1_4 = 0.0001}
      // if (kolonne1_5 == 0) {kolonne1_5 = 0.0001}
      // if (kolonne0_1 == 0) {kolonne0_1 = 0.0001}
      // if (kolonne0_2 == 0) {kolonne0_2 = 0.0001}
      // if (kolonne0_3 == 0) {kolonne0_3 = 0.0001}
      // if (kolonne0_4 == 0) {kolonne0_4 = 0.0001}
      // if (kolonne0_5 == 0) {kolonne0_5 = 0.0001}
      let poeng_lik = (poeng1 == poeng0)
      let kolonne1_lik = (kolonne1_1 == kolonne0_1)
      let kolonne2_lik = (kolonne1_2 == kolonne0_2)
      let kolonne3_lik = (kolonne1_3 == kolonne0_3)
      let kolonne4_lik = (kolonne1_4 == kolonne0_4)
      let kolonne5_lik = (kolonne1_5 == kolonne0_5)
      if (poeng_lik && kolonne1_lik && kolonne2_lik && kolonne3_lik && kolonne4_lik && kolonne5_lik) {
        ranking_array[i].splice(14,1,ranking_array[i-1][14])
      }
    }
  }
  if (column == 'id_nr') {
    i = 1
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong1') {
    i = 2
    endre_kolonne_overskrift('id_nr', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong2') {
    i = 3
    endre_kolonne_overskrift('id_nr', opp_ned_pil)
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong3') {
    i = 4
    endre_kolonne_overskrift('id_nr', opp_ned_pil)
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong4') {
    i = 5
    endre_kolonne_overskrift('id_nr', opp_ned_pil)
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong5') {
    i = 6
    endre_kolonne_overskrift('id_nr', opp_ned_pil)
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
  }
  if(order == 'desc') {
    if (column == 'id_nr') {
      for (p = 2; p <= 6; p++) {
        ranking_array.sort(sortFunction_tall_1_flere_desimal_nyligste2);
      }
      ranking_array.sort(sortFunction_tall_2_forskjellig);
    }
    else {
      let i_mål = i;
      for (i+=4; i >= i_mål; i--) {
        ranking_array.sort(sortFunction_tall_1_forskjellig);
      }
      i+=1;
    }
    tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
  }
  else {
    if (column != 'id_nr') {
      let i_mål = i;
      for (i+=4; i >= i_mål; i--) {
        ranking_array.sort(sortFunction_tall_2_forskjellig);
      }
      i+=1;
    }
    tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
  }
  if (column == 'id_nr' || column == 'sesong1' || column == 'sesong2' || column == 'sesong3' || column == 'sesong4' || column == 'sesong5') {
    sessionStorage.setItem('kolonne_landskoeffisient', column)
    sessionStorage.setItem('rekkefølge_landskoeffisient', order)
  }
  document.getElementById(column).innerHTML = tekst;
  if (order == 'desc' || column == 'id_nr') {
    for (p = 0; p < ranking_array.length; p++) {
      if (ranking_array[p][15]) {
        ranking_array[p][15] = p+1;
      } else {
        ranking_array[p].push(p+1);
      }
    }
  }
  else {
    for (p = 0; p < ranking_array.length; p++) {
      if (ranking_array[p][15]) {
        ranking_array[p][15] = ranking_array.length-p;
      } else {
        ranking_array[p].push(ranking_array.length-p);
      }
    }
  }
  if (column == 'sesong1' || column == 'sesong2' || column == 'sesong3' || column == 'sesong4' || column == 'sesong5') {
    if (order == 'desc') {
      for (p = 1; p < ranking_array.length; p++) {
        kolonne1_1 = ranking_array[p][i];
        kolonne1_2 = ranking_array[p][i+1];
        kolonne1_3 = ranking_array[p][i+2];
        kolonne1_4 = ranking_array[p][i+3];
        kolonne1_5 = ranking_array[p][i+4];
        kolonne0_1 = ranking_array[p-1][i];
        kolonne0_2 = ranking_array[p-1][i+1];
        kolonne0_3 = ranking_array[p-1][i+2];
        kolonne0_4 = ranking_array[p-1][i+3];
        kolonne0_5 = ranking_array[p-1][i+4];
        kolonne1_lik = (kolonne1_1 == kolonne0_1)
        kolonne2_lik = (kolonne1_2 == kolonne0_2)
        kolonne3_lik = (kolonne1_3 == kolonne0_3)
        kolonne4_lik = (kolonne1_4 == kolonne0_4)
        kolonne5_lik = (kolonne1_5 == kolonne0_5)
        // Gjør om linjen til kode dersom du ønsker at land uten deltagelse 1 sesong skal være rangert likt som land uten poeng 1 sesong.
        if ((kolonne1_lik && kolonne2_lik && kolonne3_lik && kolonne4_lik && kolonne5_lik) || (kolonne1_lik) /* || ([0,0.0001].includes(ranking_array[p][i]) && [0,0.0001].includes(ranking_array[p-1][i])) */) {
          ranking_array[p].splice(15,1,ranking_array[p-1][15])
        }
      }
    }
    else {
      for (p = ranking_array.length - 1; p > 0; p--) {
        kolonne1_1 = ranking_array[p][i];
        kolonne1_2 = ranking_array[p][i+1];
        kolonne1_3 = ranking_array[p][i+2];
        kolonne1_4 = ranking_array[p][i+3];
        kolonne1_5 = ranking_array[p][i+4];
        kolonne0_1 = ranking_array[p-1][i];
        kolonne0_2 = ranking_array[p-1][i+1];
        kolonne0_3 = ranking_array[p-1][i+2];
        kolonne0_4 = ranking_array[p-1][i+3];
        kolonne0_5 = ranking_array[p-1][i+4];
        kolonne1_lik = (kolonne1_1 == kolonne0_1)
        kolonne2_lik = (kolonne1_2 == kolonne0_2)
        kolonne3_lik = (kolonne1_3 == kolonne0_3)
        kolonne4_lik = (kolonne1_4 == kolonne0_4)
        kolonne5_lik = (kolonne1_5 == kolonne0_5)
        // Gjør om linjen til kode dersom du ønsker at land uten deltagelse 1 sesong skal være rangert likt som land uten poeng 1 sesong.
        if ((kolonne1_lik && kolonne2_lik && kolonne3_lik && kolonne4_lik && kolonne5_lik) || (kolonne1_lik) /* || ([0,0.0001].includes(ranking_array[p][i]) && [0,0.0001].includes(ranking_array[p+1][i])) */) {
          ranking_array[p-1].splice(15,1,ranking_array[p][15])
        }
      }
    }
  }
  for (p = 2; p < 7; p++) {
    for (i = 0; i < ranking_array.length; i++) {
      if (ranking_array[i][p] == 0.0001) {
        ranking_array[i][p] = '-';
      } else if (ranking_array[i][p] == 0.000) {
        ranking_array[i][p] = '';
      }
    }
  }
  byggTabell_test(ranking_array, aar_etter_forste_periode, column, order)
}



function endre_kolonne_overskrift(kolonne, opp_ned_pil) {
  if (kolonne == 'land2') {
    if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
      document.getElementById(kolonne).innerHTML = '<img class="jordklode" src="media/UEFA/GLOBE.svg" alt="Country">' + opp_ned_pil
    }
  }
  else if (kolonne == 'prosent_NA') {
    if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
      document.getElementById(kolonne).innerHTML = `<abbr id="NA_prosent" data_title="% of country's coefficient points coming from club">NA %</abbr>` + opp_ned_pil
    }
  }
  else if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
    document.getElementById(kolonne).innerHTML = document.getElementById(kolonne).innerText + opp_ned_pil
  }
}




function sortFunction_tall_1_flere_desimal(a, b) {
  if (a[i] == '' || a[i] == '-') {a[i] = 0.000}
  if (b[i] == '' || b[i] == '-') {b[i] = 0.000}
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) > parseFloat(b[i])) ? -1 : 1;
  }
}
function sortFunction_tall_2_flere_desimal(a, b) {
  if (a[i] == '' || a[i] == '-') {a[i] = 0.000}
  if (b[i] == '' || b[i] == '-') {b[i] = 0.000}
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) < parseFloat(b[i])) ? -1 : 1;
  }
}

function sortFunction_tall_1_forskjellig(a, b) {
  if (a[i] == '') {a[i] = 0.000}
  else if (a[i] == '-') {a[i] = 0.0001}
  if (b[i] == '') {b[i] = 0.000}
  else if (b[i] == '-') {b[i] = 0.0001}
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) > parseFloat(b[i])) ? -1 : 1;
  }
}

function sortFunction_tall_2_forskjellig(a, b) {
  if (a[i] == '') {a[i] = 0.000}
  else if (a[i] == '-') {a[i] = 0.0001}
  if (b[i] == '') {b[i] = 0.000}
  else if (b[i] == '-') {b[i] = 0.0001}
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) < parseFloat(b[i])) ? -1 : 1;
  }
}

function sortFunction_tall_1_flere_desimal_nyligste(a, b) {
  if (a[p] == '-') {a[p] = "0.000"}
  if (b[p] == '-') {b[p] = "0.000"}
  if (a[p] == '') {a[p] = 0}
  if (b[p] == '') {b[p] = 0}
  if (parseFloat(a[p]) === parseFloat(b[p])) {
    return 0;
  }
  else {
    return (parseFloat(a[p]) > parseFloat(b[p])) ? -1 : 1;
  }
}
function sortFunction_tall_1_flere_desimal_nyligste2(a, b) {
  if (a[p] == '-') {a[p] = 0.0001}
  if (b[p] == '-') {b[p] = 0.0001}
  if (a[p] == '') {a[p] = 0}
  if (b[p] == '') {b[p] = 0}
  if (parseFloat(a[p]) === parseFloat(b[p])) {
    return 0;
  }
  else {
    return (parseFloat(a[p]) < parseFloat(b[p])) ? -1 : 1;
  }
}
function sortFunction_tall_2_flere_desimal_nyligste(a, b) {
  if (parseFloat(a[p]) === parseFloat(b[p])) {
    return 0;
  }
  else {
    return (parseFloat(a[p]) < parseFloat(b[p])) ? -1 : 1;
  }
}



// Mange fine flaggikoner: https://github.com/HatScripts/circle-flags
function byggTabell_test(ranking_array, aar_etter_forste_periode, column, order) {
  let ekstremt_utydelig = "";
  let ekstremt_utydelig2 = "";
  if (column == "id_nr") {
    ekstremt_utydelig = "ekstremt_utydelig";
  }
  else {
    ekstremt_utydelig = "ganske_utydelig";
    ekstremt_utydelig2 = "ekstremt_utydelig2";
  }
  testTabell.innerHTML = '';
  var helTabellHTML = '';
  let spraak = localStorage.getItem("someVarKey");
  let twitterData = "";
  // Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng. ENDRE AARET UNDER!:
  let internt_oppgjor_aar = 2;
  let internt_oppgjør_bool = false;
  for (i = 0; i < ranking_array.length; i++) {
    for (p = 0; p < landskoeffisienter.length; p++) {
      if (landskoeffisienter[p][0] == ranking_array[i][0]) {
        landskoeffisienter_totalt[p].push(ranking_array[i][0])
        landskoeffisienter_totalt[p].push(i)
      }
    }
    let nummer = i+1
    let rangeringEndring = "";
    let ekstra_bredde = true;
    let ekstra_bredde2 = "";
    let rangeringEndring_ = "";
    let ekstra_bredde_ = true;
    let ekstra_bredde2_ = "";
    let denne_sesongen = nåværende_sesong_periode_valg[2];
    if (column == "id_nr") {
      for (let j = 0; j < forrigeUkeData.length; j++) {
        if (forrigeUkeData[j][0] == ranking_array[i][0]) {
          if (2+(aar_etter_forste_periode+22-denne_sesongen) < 2) {
            rangeringEndring = "";
          }
          else {
            let klatring = forrigeUkeData[j][2+(aar_etter_forste_periode+22-denne_sesongen)]-ranking_array[i][14] || 0;
            if (klatring == 0) {
              rangeringEndring = "";
            }
            else if (klatring < 0) {
              if (order == "desc") {
                rangeringEndring = "<span class='negKlatring'><img class='ned_pil_' src='media/trekant/trekant_opp_speil.svg' alt='arrow up'>" + klatring*(-1) + "</span>";
              }
              else {
                rangeringEndring = "<span class='negKlatring'><img class='ned_pil_' src='media/trekant/trekant_ned.svg' alt='arrow down'>" + klatring*(-1) + "</span>";
              }
              ekstra_bredde = false;
            }
            else {
              if (order == "desc") {
                rangeringEndring = "<span class='posKlatring'><img class='ned_pil_' src='media/trekant/trekant_ned_speil.svg' alt='arrow down'>" + klatring + "</span>";
              }
              else {
                rangeringEndring = "<span class='posKlatring'><img class='ned_pil_' src='media/trekant/trekant_opp.svg' alt='arrow up'>" + klatring + "</span>";
              }
              ekstra_bredde = false;
            }
          }
        }
      }
    }else {
      for (let j = 0; j < forrigeUkeData.length; j++) {
        if (forrigeUkeData[j][0] == ranking_array[i][0]) {
          if (aar_etter_forste_periode - column[6] != denne_sesongen-23) {
            rangeringEndring_ = "";
          }
          else {
            let klatring = forrigeUkeData[j][forrigeUkeData[j].length-1]-ranking_array[i][15] || 0;
            if (klatring == 0) {
              rangeringEndring_ = "";
            }
            else if (klatring < 0) {
              if (order == "asc") {
                rangeringEndring_ = "<span class='negKlatring'><img class='ned_pil' src='media/trekant/trekant_opp_utyd_speil.svg' alt='arrow up'>" + klatring*(-1) + "</span>";
              }
              else {
                rangeringEndring_ = "<span class='negKlatring'><img class='ned_pil' src='media/trekant/trekant_ned_utyd.svg' alt='arrow down'>" + klatring*(-1) + "</span>";
              }
              ekstra_bredde_ = false;
            }
            else {
              if (order == "asc") {
                rangeringEndring_ = "<span class='posKlatring'><img class='ned_pil' src='media/trekant/trekant_ned_utyd_speil.svg' alt='arrow down'>" + klatring + "</span>";
              }
              else {
                rangeringEndring_ = "<span class='posKlatring'><img class='ned_pil' src='media/trekant/trekant_opp_utyd.svg' alt='arrow up'>" + klatring + "</span>";
              }
              ekstra_bredde_ = false;
            }
          }
        }
      }
    }
    if (i == ranking_array.length-1 && ekstra_bredde) {
      ekstra_bredde2 = "ekstra_bredde2"
    }
    if (i == ranking_array.length-1 && ekstra_bredde_) {
      ekstra_bredde2_ = "ekstra_bredde2"
    }
    if (nummer <= 3) {
      nummer = '<img src="media/kolonnefjerner.png">' + ranking_array[i][15] + '<img src="media/kolonnefjerner.png">';
    } else {nummer = ranking_array[i][15]}
    land_ranking.push(ranking_array[i][11])
    let land = ""
    if (ranking_array[i][0] == 'NIR') {
      if (spraak == 'english') {
        flagg_ikon = '<div class="flagg_div flagg_mod" id="' + 'NIRe' + '_oversett"><abbr data_title="' + ranking_array[i][11] + '"><img class="flagg" id="NIR__" src="media/UEFA/' + ranking_array[i][0] + '.svg"></abbr></div>'
      } else {
        flagg_ikon = '<div class="flagg_div flagg_mod" id="' + 'NIRe' + '_oversett"><abbr data_title="' + ranking_array[i][12] + '"><img class="flagg" id="NIR__" src="media/UEFA/' + ranking_array[i][0] + '.svg"></abbr></div>'
      }
      land = "Northern Ireland";
    }
    else {
      if (spraak == 'english') {
        flagg_ikon = '<div class="flagg_div flagg_mod" id="' + ranking_array[i][0] + '_oversett"><abbr data_title="' + ranking_array[i][11] + '"><img class="flagg" src="media/UEFA/' + ranking_array[i][0] + '.svg"></abbr></div>'
      } else {
        flagg_ikon = '<div class="flagg_div flagg_mod" id="' + ranking_array[i][0] + '_oversett"><abbr data_title="' + ranking_array[i][12] + '"><img class="flagg" src="media/UEFA/' + ranking_array[i][0] + '.svg"></abbr></div>'
      }
      land = ranking_array[i][11]
    }
    let sesong1 = ranking_array[i][2]
    let sesong2 = ranking_array[i][3]
    let sesong3 = ranking_array[i][4]
    let sesong4 = ranking_array[i][5]
    let sesong5 = ranking_array[i][6]
    if (sesong1 == '-') {sesong1 = '<span class="bindestrek">-</span>'}
    if (sesong2 == '-') {sesong2 = '<span class="bindestrek">-</span>'}
    if (sesong3 == '-') {sesong3 = '<span class="bindestrek">-</span>'}
    if (sesong4 == '-') {sesong4 = '<span class="bindestrek">-</span>'}
    if (sesong5 == '-') {sesong5 = '<span class="bindestrek">-</span>'}
    let internt_oppgjør = "";
    // Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng.
    // if (['NOR'].includes(ranking_array[i][0]) && aar_etter_forste_periode >= internt_oppgjor_aar && aar_etter_forste_periode <= internt_oppgjor_aar+4) {
    //   internt_oppgjør = "&nbsp*";
    //   internt_oppgjør_bool = true;
    //   if (aar_etter_forste_periode == internt_oppgjor_aar) {
    //     ranking_array[i][13] = (ranking_array[i][13]).split('/')[0]-1 + "/" + (ranking_array[i][13]).split('/')[1];
    //   }
    // }
    
    let klubber_igjen = ""
    let tom_kolonne = `<td class='tom'>${""}</td>`
    if (i == 54) {
      tom_kolonne = `<td class='tom ingen_ramme_under'>${""}</td>`
    }
    if ((ranking_array[i][13]).split('/')[0] == '0' && ranking_array[i][13] != '0/?') {
      klubber_igjen = `<td class='premie_koeff klubb rød'>${ranking_array[i][13]}</td>`
    } else if (((ranking_array[i][13]).split('/')[0] - (ranking_array[i][13]).split('/')[1]) == 0) {
      klubber_igjen = `<td class='premie_koeff klubb grønn'>${ranking_array[i][13]}</td>`
    }
    else if (ranking_array[i][13] == '0/?') {
      klubber_igjen = `<td class='premie_koeff klubb gjennomsiktig'>${ranking_array[i][13]}</td>`
    }
    else {
      klubber_igjen = `<td class='premie_koeff klubb gul'>${ranking_array[i][13]}</td>`
    }
    if (aar_etter_forste_periode != 1 && aar_etter_forste_periode != -1 && sesong1 != "") {
      sesong1 = `<a href="../" onClick="forside_ø_koeff(${i},${3})" class="utydelig_link">${sesong1}</a>`
    }
    if (aar_etter_forste_periode >= 1 && aar_etter_forste_periode != 2) {
      if (sesong1 != "") {sesong1 = `<a href="../" onClick="forside_ø_koeff(${i},${3})" class="utydelig_link">${sesong1}</a>`}
      if (sesong2 != "") {sesong2 = `<a href="../" onClick="forside_ø_koeff(${i},${4})" class="utydelig_link">${sesong2}</a>`}}
    if (aar_etter_forste_periode >= 2 && aar_etter_forste_periode != 3) {
      if (sesong2 != "") {sesong2 = `<a href="../" onClick="forside_ø_koeff(${i},${4})" class="utydelig_link">${sesong2}</a>`}
      if (sesong3 != "") {sesong3 = `<a href="../" onClick="forside_ø_koeff(${i},${5})" class="utydelig_link">${sesong3}</a>`}}
    if (aar_etter_forste_periode >= 3 && aar_etter_forste_periode != 4) {
      if (sesong3 != "") {sesong3 = `<a href="../" onClick="forside_ø_koeff(${i},${5})" class="utydelig_link">${sesong3}</a>`}
      if (sesong4 != "") {sesong4 = `<a href="../" onClick="forside_ø_koeff(${i},${6})" class="utydelig_link">${sesong4}</a>`}}
    if (aar_etter_forste_periode >= 4 && aar_etter_forste_periode != 5) {
      if (sesong4 != "") {sesong4 = `<a href="../" onClick="forside_ø_koeff(${i},${6})" class="utydelig_link">${sesong4}</a>`}
      if (sesong5 != "") {sesong5 = `<a href="../" onClick="forside_ø_koeff(${i},${7})" class="utydelig_link">${sesong5}</a>`}}
    if (aar_etter_forste_periode >= 5 && aar_etter_forste_periode != 6 && sesong5 != "") {
      if (sesong5 != "") {sesong5 = `<a href="../" onClick="forside_ø_koeff(${i},${7})" class="utydelig_link">${sesong5}</a>`}}
      var rad_test = `
                    <td class="id_nr_klubb ${ekstremt_utydelig} ramme_hoyre"><span class="midt">${nummer}</span></td>
                    <td class="id_nr_klubb rangeringEndring_ ${ekstremt_utydelig} ramme_hoyre ${ekstra_bredde2_}">${rangeringEndring_}</td>
                    <td class="id_nr ${ekstremt_utydelig2}"><span class="midt">${ranking_array[i][14]}</span></td>
                    <td class="id_nr ${ekstremt_utydelig2} rangeringEndring ${ekstra_bredde2}">${rangeringEndring}</td>
                    <td class="grense_celle"><nobr class="flagg_hoyre">${flagg_ikon}</nobr><span class="land_ikon_asterisk">${internt_oppgjør}</span></td>
                    <td id="tom_kolonne" class="grense_celle">${land}</td>
                    <td class='premie_koeff'><b>${ranking_array[i][1]}</b></td>
                    <td class='premie_koeff'>${sesong1}</td>
                    <td class='premie_koeff'>${sesong2}</td>
                    <td class='premie_koeff'>${sesong3}</td>
                    <td class='premie_koeff'>${sesong4}</td>
                    <td class='premie_koeff'>${sesong5}</td>
                    ${tom_kolonne}
                    ${klubber_igjen}
                </tr>`
      if (column == "id_nr") {
        if (order == "asc") {
          if ((i == 4 && aar_etter_forste_periode > 0) || (i == 5 && aar_etter_forste_periode > 0) || (i == 3 && aar_etter_forste_periode <= 0) || (i == 5 && aar_etter_forste_periode <= 0) || i == 14 || i == 49) {
            rad_test = '<tr class="grense">' + rad_test
          }
          else if (i == 9 /*|| (i == 11 && aar_etter_forste_periode > 0)*/ || (i == 21 && aar_etter_forste_periode > 0) || (i == 32 && aar_etter_forste_periode > 0) || (i == 37 && aar_etter_forste_periode > 0) || (i == 28 && aar_etter_forste_periode <= 0) || (i == 50 && aar_etter_forste_periode <= 0)) {
            rad_test = '<tr class="grense2">' + rad_test
          }
          else {
            rad_test = '<tr>' + rad_test
          }
        }
        else {
          speilTall = ranking_array.length-2;
          if ((i == speilTall-4 && aar_etter_forste_periode > 0) || (i == speilTall-5 && aar_etter_forste_periode > 0) || (i == speilTall-3 && aar_etter_forste_periode <= 0) || (i == speilTall-5 && aar_etter_forste_periode <= 0) || i == speilTall-14 || i == speilTall-49) {
            rad_test = '<tr class="grense">' + rad_test
          }
          else if (i == speilTall-9 || /*(i == speilTall-11 && aar_etter_forste_periode > 0) ||*/ (i == speilTall-21 && aar_etter_forste_periode > 0) || (i == speilTall-32 && aar_etter_forste_periode > 0) || (i == speilTall-37 && aar_etter_forste_periode > 0) || (i == speilTall-28 && aar_etter_forste_periode <= 0) || (i == speilTall-50 && aar_etter_forste_periode <= 0)) {
            rad_test = '<tr class="grense2">' + rad_test
          }
          else {
            rad_test = '<tr>' + rad_test
          }
        }
      }
      else if ((i == 1 && order == "desc") || (i == 52 && order == "asc")) {
        rad_test = '<tr class="grense">' + rad_test
      }
      else {
        rad_test = '<tr>' + rad_test
      }
      helTabellHTML += rad_test
      // Tilbakestill piler
      // if (denne_sesongen-22 == aar_etter_forste_periode) {
      //   twitterDataTAB.push([ranking_array[i][0], ranking_array[i][2], ranking_array[i][14]]);
      // }
      // else {
      //   for(let p = 0; p < twitterDataTAB.length; p++) {
      //     if(twitterDataTAB[p][0] == ranking_array[i][0]) {
      //       twitterDataTAB[p].push(ranking_array[i][14]);
      //     }
      //   }
      // }
  }
  // Tilbakestill piler
  // for (let i = 0; i < flaggEmoji.length; i++) {
  //   for (let j = 0; j < twitterDataTAB.length; j++) {
  //     if (flaggEmoji[i][0] == twitterDataTAB[j][0]) {
  //       twitterData += ('["' + twitterDataTAB[j][0] + '", ' + twitterDataTAB[j][1] + ', ' + twitterDataTAB[j][2] + ', ' + twitterDataTAB[j][3] + ', ' + twitterDataTAB[j][4] + ', ' + twitterDataTAB[j][5] + ', ' + twitterDataTAB[j][6] + "],\n");
  //     }
  //   }
  // }
  // navigator.clipboard.writeText(twitterData);
  // Slutt tilbakestill piler
  testTabell.innerHTML = helTabellHTML;

  // Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng.
  if (internt_oppgjør_bool) {
    if (aar_etter_forste_periode == internt_oppgjor_aar) {
      document.getElementById("internt_oppgjør_asterisk").innerText = "*Secured coefficient points from future internal match is included for this country. Consequently, the club count is reduced to 1/4."
    }
    else {
      document.getElementById("internt_oppgjør_asterisk").innerText = "*Secured coefficient points from future internal match is included for this country."
    }
  }
  else {
    document.getElementById("internt_oppgjør_asterisk").innerText = ""
  }
}

/*Dropdown meny start*/
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleMeny(id) {
  if (id == "[object HTMLCollection]") {
    document.getElementById("myDropdown2").classList.remove("show")
    document.getElementById("myDropdown").classList.remove("show")
    nedoverpil2()
    nedoverpil()
  }
  else if (id == "dropDownMeny2") {
    if (document.getElementById("myDropdown2").classList.contains("show")) {
      document.getElementById("myDropdown2").classList.remove("show")
      nedoverpil2()
    } else {
    document.getElementById("myDropdown2").classList.add("show")
    oppoverpil2()
    document.getElementById("myDropdown").classList.remove("show")
    nedoverpil()
    document.getElementById("myDropdown_2").classList.remove("show")
    nedoverpil_2()
    }
  }
  else {
    if (document.getElementById("myDropdown").classList.contains("show")) {
      document.getElementById("myDropdown").classList.remove("show")
      nedoverpil()
    }
    else {
      if (id != '[object HTMLButtonElement]') {
        document.getElementById("myDropdown").classList.add("show")
        oppoverpil()
      }
      document.getElementById("myDropdown2").classList.remove("show")
      nedoverpil2()
      document.getElementById("myDropdown_2").classList.remove("show")
      nedoverpil_2()
      }
  }
}

function toggleMeny2() {
  if (document.getElementById("myDropdown").classList.contains("show")) {
    document.getElementById("myDropdown").classList.remove("show")
    nedoverpil()
  }
  if (document.getElementById("myDropdown2").classList.contains("show")) {
    document.getElementById("myDropdown2").classList.remove("show")
    nedoverpil2()
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

function nedoverpil2() {
  let DropdownMenyElement = (document.getElementById("dropDownMeny2").innerText).slice(0, -1)
  document.getElementById("dropDownMeny2").innerHTML = DropdownMenyElement + "<div class='opp_ned_pil'>&#10094</div>";
}
function oppoverpil2() {
  let DropdownMenyElement = (document.getElementById("dropDownMeny2").innerText).slice(0, -1)
  document.getElementById("dropDownMeny2").innerHTML = DropdownMenyElement + "<div class='opp_ned_pil'>&#10095</div>";
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
      document.getElementById("myDropdown2").classList.remove("show")
      nedoverpil()
      nedoverpil2()
  }
});

/* Lager knappene i menyen */
let btnid = "";
let valg_navn = document.getElementById('dropDownMeny').innerText.slice(0,-2);
id = "dropDownMeny";
for (i = 0; i < nyligste_poeng_rangering[0] - 20 + 5; i++) {
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
for (i = 0; i < nyligste_poeng_rangering[0] - 20 + 5; i++) {
  let btn = document.createElement("button");
  btn.innerHTML = (2000+20 + i) + '/' + (21 + i);
  if ((2000+20 + i) + '/' + (21 + i) == valg_navn) {
    btn.className = "meny_element valgt_element2";}
  else {btn.className = "meny_element";}
  btnid = "valgt" + i;
  btn.id = btnid + "_2";
  btn.setAttribute("onclick", "endreMenyTittel(innerHTML,"+id+","+btnid+")");
  document.getElementById("dropdown_elementer2").appendChild(btn);
}

function endreMenyTittel(innerHTML,id,btnid) {
  document.querySelector('.valgt_element').classList.remove("valgt_element");
  document.querySelector('.valgt_element2').classList.remove("valgt_element2");
  document.getElementById(btnid.id).classList.add("valgt_element");
  document.getElementById(btnid.id + "_2").classList.add("valgt_element2");
  document.getElementById("dropDownMeny").innerHTML = innerHTML + "<div class='opp_ned_pil'>&#10094</div>";
  toggleMeny(id);
  sessionStorage.setItem('dropdownmeny_valg_landskoeffisient', innerHTML)
  oppdater_ved_refresh()
  bygg_klubb_tabell()
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

function forside_ø_koeff(i, kolonne) {
  sessionStorage.setItem('trykte_knapper', JSON.stringify([]))
  sessionStorage.setItem('trykte_knapper_exclude', JSON.stringify([]))
  sessionStorage.setItem('kolonne', 'bidrag')
  sessionStorage.setItem('rekkefølge', 'desc')
  sessionStorage.setItem('kolonne2', 'ass_coeff_ø')
  sessionStorage.setItem('rekkefølge2', 'desc')
  sessionStorage.setItem('spoiler', 'synlig')
  // $('#tabell_overordnet td').show()
  var rows = document.getElementsByTagName("table")[0].rows;
  var last = rows[i+1];
  var cell = last.cells[4];
  let filter_land_før = [];
  let land = ''
  let str = (cell.innerHTML);
  land = (str.substring(str.indexOf('/UEFA/') + 6)).substring(0, 3)
  filter_land_før.push(land)
  localStorage.setItem('filter_land', JSON.stringify(filter_land_før))
  let aarstall = ((rows[0].cells[kolonne+2].innerText).slice(0,2) - 21)
  localStorage.setItem('sessong', aarstall)
}


let klubber = [];
$('.tabell_div_landskoeffisient_klubb th').on('click', function(){
  var column = $(this).data('column')
  var order = $(this).data('order')
  let tekst = $(this).text()
  if(order == 'desc') {
      $(this).data('order', "asc")
  }
  else {
      $(this).data('order', "desc")
  }
  if (column == 'land2') {
    tekst = '<img class="jordklode" src="media/UEFA/GLOBE.svg" alt="Country">'
  }
  if (column == 'prosent_NA') {
    tekst = `<abbr id="NA_prosent" data_title="% of country's coefficient points coming from club">NA %</abbr>`
  }
  if (column != undefined) {
    sorter_klubb(column, order, tekst)
  }
  for (p = 0; p < klubber.length; p++) {
    for (i = 0; i < 5; i++) {
      if (klubber[p][2+i] == 'NaN') {klubber[p][2+i] = '0.0001'}
      if (klubber[p][2+i].length > 1) {null}
      else {
        klubber[p][2+i] = 0;
      }
    }
  }
})

function sorter_etter_sesong2() {
  let tekst = ''
  let column = sessionStorage.getItem('kolonne_landskoeffisient2') || 'id_nr_klubb'
  let order = sessionStorage.getItem('rekkefølge_landskoeffisient2') || 'asc'
  if(order == 'desc') {
    document.getElementById(column).dataset.order = 'asc';
  }
  else {
    document.getElementById(column).dataset.order = 'desc';
  }
  if (column == 'land2') {
    tekst =  '<img class="jordklode" src="media/UEFA/GLOBE.svg" alt="Country">';
  } else if (column == 'prosent_NA') {
      tekst = `<abbr id="NA_prosent" data_title="% of country's coefficient points coming from club">NA %</abbr>`
    } else {
    tekst = document.getElementById(column).innerText
  }
  for (p = 0; p < klubber.length; p++) {
    for (i = 0; i < 5; i++) {
      if (klubber[p][2+i] == 0) {klubber[p][2+i] = '0.0001'}
      else if (!klubber[p][2+i]) {klubber[p][2+i] = 0}
      else if (length > 1) {klubber[p][2+i] = (klubber[p][2+i]).toFixed(3)}
      else {klubber[p][2+i] = '0.0001'}
    }
    klubber[p][7] = parseFloat(klubber[p][7].toFixed(6))
  }
  sorter_klubb(column, order, tekst)
}

function sorter_klubb(column, order, tekst) {

  if (column == 'id_nr_klubb' && order == "asc") {
    i = 0;
    klubber.sort(sortFunction_1);
    for (i = 2; i < 7; i++) {
      klubber.sort(sortFunction_tall_1_flere_desimal)
    }
  }

  i = 7
  klubber.sort(sortFunction_tall_1_flere_desimal)
  let rangering_tall = 0;

  for (p = 0; p < klubber.length; p++) {
    if (p == 0 || (klubber[p][7] != klubber[p-1][7])) {
      rangering_tall = p+1
    }
    klubber[p].push(rangering_tall)
  }

  if (column != 'id_nr_klubb' && order != 'asc') {
    i = 0;
    klubber.sort(sortFunction_2);
  }

  if (column == 'id_nr_klubb') {
    i = 9
    endre_kolonne_overskrift('club', opp_ned_pil) 
    endre_kolonne_overskrift('land2', opp_ned_pil_margin) 
    endre_kolonne_overskrift('prosent_NA', opp_ned_pil)    
    endre_kolonne_overskrift('sesong1_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong2_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong3_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong4_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong5_klubb', opp_ned_pil)
  }
  if (column == 'club') {
    i = 0
    endre_kolonne_overskrift('id_nr_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('land2', opp_ned_pil_margin) 
    endre_kolonne_overskrift('prosent_NA', opp_ned_pil)    
    endre_kolonne_overskrift('sesong1_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong2_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong3_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong4_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong5_klubb', opp_ned_pil)
  }
  else if (column == 'land2') {
    i = 9
    klubber.sort(sortFunction_tall_2_flere_desimal)
    i = 1
    endre_kolonne_overskrift('id_nr_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('club', opp_ned_pil) 
    endre_kolonne_overskrift('prosent_NA', opp_ned_pil)
    endre_kolonne_overskrift('sesong1_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('sesong2_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong3_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong4_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong5_klubb', opp_ned_pil)
  }
  else if (column == 'prosent_NA') {
    i = 8
    endre_kolonne_overskrift('id_nr_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('club', opp_ned_pil) 
    endre_kolonne_overskrift('land2', opp_ned_pil_margin)
    endre_kolonne_overskrift('sesong1_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('sesong2_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong3_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong4_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong5_klubb', opp_ned_pil)
  }
  else if (column == 'sesong1_klubb') {
    i = 6
    endre_kolonne_overskrift('id_nr_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('club', opp_ned_pil) 
    endre_kolonne_overskrift('land2', opp_ned_pil_margin) 
    endre_kolonne_overskrift('prosent_NA', opp_ned_pil)    
    endre_kolonne_overskrift('sesong2_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong3_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong4_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong5_klubb', opp_ned_pil)
  }
  else if (column == 'sesong2_klubb') {
    i = 5
    endre_kolonne_overskrift('id_nr_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('club', opp_ned_pil) 
    endre_kolonne_overskrift('land2', opp_ned_pil_margin) 
    endre_kolonne_overskrift('prosent_NA', opp_ned_pil)    
    endre_kolonne_overskrift('sesong1_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong3_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong4_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong5_klubb', opp_ned_pil)
  }
  else if (column == 'sesong3_klubb') {
    i = 4
    endre_kolonne_overskrift('id_nr_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('club', opp_ned_pil) 
    endre_kolonne_overskrift('land2', opp_ned_pil_margin) 
    endre_kolonne_overskrift('prosent_NA', opp_ned_pil)
    endre_kolonne_overskrift('sesong1_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong2_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong4_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong5_klubb', opp_ned_pil)
  }
  else if (column == 'sesong4_klubb') {
    i = 3
    endre_kolonne_overskrift('id_nr_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('club', opp_ned_pil) 
    endre_kolonne_overskrift('land2', opp_ned_pil_margin) 
    endre_kolonne_overskrift('prosent_NA', opp_ned_pil)    
    endre_kolonne_overskrift('sesong1_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong2_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong3_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong5_klubb', opp_ned_pil)
  }
  else if (column == 'sesong5_klubb') {
    i = 2
    endre_kolonne_overskrift('id_nr_klubb', opp_ned_pil) 
    endre_kolonne_overskrift('club', opp_ned_pil) 
    endre_kolonne_overskrift('land2', opp_ned_pil_margin)
    endre_kolonne_overskrift('prosent_NA', opp_ned_pil)    
    endre_kolonne_overskrift('sesong1_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong2_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong3_klubb', opp_ned_pil)
    endre_kolonne_overskrift('sesong4_klubb', opp_ned_pil)
  }
  filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
  let ranking_array_land_filter = []
  for (p = 0; p < klubber.length; p++) {
    if (filter_land_før.includes(klubber[p][1]) || filter_land_før == '') {
      ranking_array_land_filter.push(klubber[p])
    }
  }
  klubber = ranking_array_land_filter;
  if(order == 'desc') {
    if (column == 'id_nr_klubb') {
      for (i = 2; i < 7; i++) {
        klubber.sort(sortFunction_tall_2_flere_desimal)
      }
      i = 9
    }
    if (column != 'club' && column != 'land2') {
      tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
      klubber.sort(sortFunction_tall_1_flere_desimal);
    }
    else {
      tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
      klubber.sort(sortFunction_1);
    }
  }
  else if (column != 'id_nr_klubb') {
    if (column != 'club' && column != 'land2') {
      tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
      klubber.sort(sortFunction_tall_2_flere_desimal);
    }
    else {
      tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
      klubber.sort(sortFunction_2);
    }
  }
  else {
    tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
  }
  sessionStorage.setItem('kolonne_landskoeffisient2', column)
  sessionStorage.setItem('rekkefølge_landskoeffisient2', order)
  document.getElementById(column).innerHTML = tekst;

  if (order == 'desc' || column == 'id_nr_klubb' || column == 'club' || column == 'land2') {
    for (p = 0; p < klubber.length; p++) {
      if (klubber[p][10]) {
        klubber[p][10] = p+1;
      } else {
        klubber[p].push(p+1);
      }
    }
  }
  else {
    for (p = 0; p < klubber.length; p++) {
      if (klubber[p][10]) {
        klubber[p][10] = klubber.length-p;
      } else {
        klubber[p].push(klubber.length-p);
      }
    }
  }
  if (column == 'sesong1_klubb' || column == 'sesong2_klubb' || column == 'sesong3_klubb' || column == 'sesong4_klubb' || column == 'sesong5_klubb' || column == 'prosent_NA') {
    if (order == 'desc') {
      for (p = 0; p < klubber.length; p++) {
        if (p > 0) {
          if (klubber[p-1][i] == klubber[p][i]) {
            klubber[p].splice(10,1,klubber[p-1][10])
          }
        }
      }
    }
    else {
      for (p = klubber.length - 1; p >= 0; p--) {
        if (p < klubber.length - 1) {
          if (klubber[p+1][i] == klubber[p][i]) {
            klubber[p].splice(10,1,klubber[p+1][10])
          }
        }
      }
    }
  }

  utplasser_klubb_tabell(klubber)
}

function bygg_klubb_tabell() {
  klubber = [];
  let land = []
  for (p = 0; p < landskoeffisienter.length; p++) {
    land.push(landskoeffisienter[p][0])
  }
  let klubber_fra_land = Array(land.length).fill().map(() => Array(5).fill(0));
  let aar = 1;
  for (p = 3 + aar_etter_forste_periode; p < 8 + aar_etter_forste_periode; p++) {
    if (p <=  6) {
      for (i = 0; i < assosiasjons_koeffisienter_1617_2021.length; i++) {
        if (assosiasjons_koeffisienter_1617_2021[i][p] || assosiasjons_koeffisienter_1617_2021[i][p] == 0) {
          let legg_til_klubb = true
          for (j = 0; j < klubber.length; j++) {
            if (klubber[j][0] == assosiasjons_koeffisienter_1617_2021[i][0]) {
              klubber[j][aar+1] = assosiasjons_koeffisienter_1617_2021[i][p]
              klubber_fra_land[land.indexOf(assosiasjons_koeffisienter_1617_2021[i][1])][aar-1] += 1;
              legg_til_klubb = false
            }
          }
          if (legg_til_klubb == true) {
            klubber.push([assosiasjons_koeffisienter_1617_2021[i][0],assosiasjons_koeffisienter_1617_2021[i][1]])
            klubber[klubber.length - 1][aar+1] = assosiasjons_koeffisienter_1617_2021[i][p]
            klubber_fra_land[land.indexOf(assosiasjons_koeffisienter_1617_2021[i][1])][aar-1] += 1;
          }
        }
      }
    }
    else {
      for (i = 0; i < menyvalg.length; i++) {
        if (menyvalg[i][((p-6)*antall_MV_elem)-4]) {
          let legg_til_klubb = true
          for (j = 0; j < klubber.length; j++) {
            if (klubber[j][0] == menyvalg[i][0]) {
              klubber[j][aar+1] = regnUtAssosKoeff((menyvalg[i].slice(((p-6)*antall_MV_elem)-4, ((p-6)*antall_MV_elem)+2)) , p-7) || 0;
              if (p < 9) {
                klubber_fra_land[land.indexOf(menyvalg[i][1])][aar-1] += 1;}
              legg_til_klubb = false
            }
          }
          if (legg_til_klubb == true) {
            klubber.push([menyvalg[i][0],menyvalg[i][1]])
            klubber[klubber.length - 1][aar+1] = regnUtAssosKoeff((menyvalg[i].slice(((p-6)*antall_MV_elem)-4, ((p-6)*antall_MV_elem)+2)) , p-7) || 0;
            if (p < 9) {
              klubber_fra_land[land.indexOf(menyvalg[i][1])][aar-1] += 1;}
          }
        }
      }
    }
    if (p >= 9 && p <= 8 + totalt_antall_klubber[0].length) {
      for (l = 0; l < totalt_antall_klubber.length; l++) {
        klubber_fra_land[l][aar-1] = totalt_antall_klubber[l][p-9]
      }
    }
    for (i = 0; i < klubber.length; i++) {
      if (klubber[i][aar+1]) {
        klubber[i][aar+1] = (klubber[i][aar+1]/klubber_fra_land[land.indexOf(klubber[i][1])][aar-1]) || 0;
        // klubber[i][aar+1] = klubber[i][aar+1].toFixed(3) || 0;
      }
    }
    aar += 1;
  }
  for (i = 0; i < klubber.length; i++) {
    klubber[i].length = 7
    klubber[i].push((klubber[i][2]||0) + (klubber[i][3]||0) + (klubber[i][4]||0) + (klubber[i][5]||0) + (klubber[i][6]||0))
    klubber[i].push(parseFloat((((klubber[i][7] / (landskoeffisienter_totalt[land.indexOf(klubber[i][1])][0])) * 100) || 0).toFixed(6)))
    if (klubber[i][8] > 100) {klubber[i][8] = 100}
  }
  sorter_etter_sesong2(klubber)
}

function utplasser_klubb_tabell(klubber) {
  let helTabellHTML = '';
  let testTabell_klubb = document.getElementById('minTest_klubb')
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

    if (nåværende_sesong_periode_valg[0]-16 != aar_etter_forste_periode) {
      if (!knapper.includes('b5') && !knapper.includes('b8') && !knapper.includes('b12') && !knapper.includes('b17') && !knapper.includes('KO') && ((!plassering.includes("4") && (!plassering.includes("3") || !knapper.includes('b20')) && nåværende_sesong_periode_valg[0] < 24) || ((String(plassering).replaceAll(',', '')) <= 24 && nåværende_sesong_periode_valg[0] >= 24)) && knapper[0] != '' && (aar_etter_forste_periode + nåværende_sesong_periode_valg[0] != 22)) {
        if (!gjennværende_land.includes(menyvalg[i][1])) {
          gjennværende_land.push(menyvalg[i][1])
        }
      }
    }
  }
  for (i = 0; i < klubber.length; i++) {
    let rangering = `<td class="id_nr_klubb utydelig ramme_hoyre_tynn"><b>${klubber[i][9]}</b></td>`;
    let klubbnavn_HTML_start = '<td><nobr class="marign_venstre">';
    if (aar_etter_forste_periode == nåværende_sesong_periode_valg[0]-22 || aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21) {
      for (r = 0; r < menyvalg.length; r++) {
        if (menyvalg[r][0] == klubber[i][0]) {
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
          if (aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21 && aar_etter_forste_periode < nåværende_sesong_periode_valg[0]-16) {
            if (gjennværende_land.includes(menyvalg[r][1])) {
              klubbnavn_HTML_start = '<td class="var_med"><nobr class="marign_venstre">';
            }
          }
          if (nåværende_sesong_periode_valg[0]-16 != aar_etter_forste_periode) {
            if (!knapper.includes('b5') && !knapper.includes('b8') && !knapper.includes('b12') && !knapper.includes('b17') && !knapper.includes('KO') && ((!plassering.includes("4") && (!plassering.includes("3") || !knapper.includes('b20')) && nåværende_sesong_periode_valg[0] < 24) || ((String(plassering).replaceAll(',', '')) <= 24 && nåværende_sesong_periode_valg[0] >= 24)) && knapper[0] != '' && (nåværende_sesong_periode_valg[0] - aar_etter_forste_periode != 22)) {
              klubbnavn_HTML_start = '<td class="fortsatt_med"><nobr class="marign_venstre">';
            }
            if ((knapper).includes("b18")) {
              if ((plassering).includes("3") && nåværende_sesong_periode_valg[0] < 24) {
                rangering = `<td class="ucl_gs_uel id_nr_klubb utydelig ramme_hoyre_tynn"><b>${klubber[i][9]}</b></td>`;
              }
              else {
                rangering = `<td class="ucl_gs id_nr_klubb utydelig ramme_hoyre_tynn"><b>${klubber[i][9]}</b></td>`;
              }
            }
            else if ((knapper).includes("b19")) {
              if ((plassering).includes("3") && nåværende_sesong_periode_valg[0] < 24) {
                rangering = `<td class="uel_gs_uecl id_nr_klubb utydelig ramme_hoyre_tynn"><b>${klubber[i][9]}</b></td>`;
              }
              else {
                rangering = `<td class="uel_gs id_nr_klubb utydelig ramme_hoyre_tynn"><b>${klubber[i][9]}</b></td>`;
              }
            }
            else if ((knapper).includes("b20")) {
              rangering = `<td class="uecl_gs id_nr_klubb utydelig ramme_hoyre_tynn"><b>${klubber[i][9]}</b></td>`;
            }
          }
        }
      }
    }
    if (klubbnavn_HTML_start == '<td><nobr class="marign_venstre">') {
      if (aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21 && aar_etter_forste_periode < nåværende_sesong_periode_valg[0]-16) {
        if (gjennværende_land.includes(klubber[i][1])) {
          klubbnavn_HTML_start = '<td class="var_med"><nobr class="marign_venstre">';
        }
      }
    }
    for (r = 0; r < 5; r++) {
      if (klubber[i][r+2] == 0) {
        klubber[i][r+2] = '';
      }
      if (klubber[i][r+2] == '0.0001') {
        klubber[i][r+2] = '-';
      }
    }
    if (i == klubber.length - 1) {
      if (klubbnavn_HTML_start == '<td class="fortsatt_med"><nobr class="marign_venstre">') {
        klubbnavn_HTML_start = '<td class="fortsatt_med ramme_ikke_grønn"><nobr class="marign_venstre">'
      } else if (klubbnavn_HTML_start == '<td class="var_med"><nobr class="marign_venstre">') {
        klubbnavn_HTML_start = '<td class="var_med ramme_ikke_grønn"><nobr class="marign_venstre">'
      }
    }

    let klubbnavn = klubber[i][0]
    let klubbnavn_url = klubbnavn.replace(/\s/g, '')
    if (klubbnavn_url.includes('/')) {
      klubbnavn_url = klubbnavn_url.replace('/','')
    }

    klubbnavn = '<img class="klubb_logo" loading="lazy" data-sizes="auto" src="media/klubblogo/' + klubber[i][1] + "/" + klubbnavn_url + '2.png"' + 
      `data-srcset="
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `1.png 18w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `2.png 32w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `3.png 36w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `4.png 50w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `5.png 64w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `6.png 70w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `7.png 100w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `8.png 140w"
      data-fallback="media/klubblogo/fallback.png" sizes="20px" srcset="
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `1.png 13w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `2.png 32w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `3.png 36w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `4.png 50w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `5.png 64w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `6.png 70w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `7.png 100w,
      media/klubblogo/` + klubber[i][1] + "/" + klubbnavn_url + `8.png 140w">` + klubbnavn
    let sesong1 = klubber[i][2]
    let sesong2 = klubber[i][3]
    let sesong3 = klubber[i][4]
    let sesong4 = klubber[i][5]
    let sesong5 = klubber[i][6]
    if (aar_etter_forste_periode == 0) {
      sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${6})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong5}</a>`
    }
    if (aar_etter_forste_periode == 1) {
      sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${6})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong5}</a>`
      sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${7})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong4}</a>`}
    if (aar_etter_forste_periode == 2) {
      sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${6})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong5}</a>`
      sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${7})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong4}</a>`
      sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${8})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong3}</a>`}
    if (aar_etter_forste_periode == 3) {
      sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${6})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong5}</a>`
      sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${7})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong4}</a>`
      sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${8})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong3}</a>`
      sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${9})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong2}</a>`}
    if (aar_etter_forste_periode == 4) {
      sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${7})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong4}</a>`
      sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${8})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong3}</a>`
      sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${9})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong2}</a>`
      sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${10})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong1}</a>`}
    if (aar_etter_forste_periode == 5) {
      sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${8})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong3}</a>`
      sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${9})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong2}</a>`
      sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${10})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong1}</a>`}
    if (aar_etter_forste_periode == 6) {
      sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${9})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong2}</a>`
      sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${10})" id="link_lands_klubb" class="utydelig_link_klubb">${sesong1}</a>`}
    var rad_test = `<tr>
                    <td class="id_nr_klubb veldig_utydelig ramme_hoyre">${klubber[i][10]}</td>
                    ${rangering}
                    ${klubbnavn_HTML_start + klubbnavn}</nobr></td>
                    <td class='premie_koeff_3 ramme_hoyre'><div class='senter'><div class='premie_koeff_3 utydelig'>${klubber[i][1]}</div></div></td>
                    <td class='premie_koeff'><div class='senter_klubb_poeng'><div class='premie_koeff'><b>${(klubber[i][7]).toFixed(3)}</b></div></td>
                    <td class='premie_koeff ramme_hoyre'><div class='senter_prosent_NA'><div class='premie_koeff'><b>${klubber[i][8].toFixed(1) + '%'}</b></div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter_klubb_sesong'><div class='premie_koeff utydelig'>${sesong5}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter_klubb_sesong'><div class='premie_koeff utydelig'>${sesong4}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter_klubb_sesong'><div class='premie_koeff utydelig'>${sesong3}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter_klubb_sesong'><div class='premie_koeff utydelig'>${sesong2}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter_klubb_sesong'><div class='premie_koeff utydelig'>${sesong1}</div></div></td>
                  </tr>`
                  helTabellHTML += rad_test
  }
  testTabell_klubb.innerHTML = helTabellHTML;
  for (p = 0; p < klubber.length; p++) {
    for (i= 0; i < 5; i++) {
      if (klubber[p][2+i] == '-') {
        klubber[p][2+i] = '0.0001'
      }
    }
  }
}

function endre_klubbnavn(i, kolonne) {
  var rows = document.getElementsByTagName("table")[1].rows;
  var last = rows[i + 1];
  var cell = last.cells[2];
  let aarstall = (rows[0].cells[kolonne].innerText[0] + rows[0].cells[kolonne].innerText[1] - 21)
  localStorage.setItem('sessong', aarstall)
  var value = cell.innerText;
  localStorage.setItem('Klubbnavn', value)
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
  

    let enkelt_sesong1 = 0
    var koeff_sesong2 = 0;
    var koeff_sesong3 = 0;
    var koeff_sesong4 = 0;
    var koeff_sesong5 = 0;
    let antall_klubber1 = indeks_klubb.length;
    let antall_klubber2 = indeks_klubb.length;
    let antall_klubber3 = indeks_klubb.length;
    let antall_klubber4 = indeks_klubb.length;
    let antall_klubber5 = indeks_klubb.length;
    if (aar_etter_forste_periode <= -1) {
      enkelt_sesong1 = parseFloat(landskoeffisienter[i][11 + aar_etter_forste_periode])
    } else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode + 1)))+2-antall_MV_elem] == undefined) {
          antall_klubber1 -= 1
        } else {
          enkelt_sesong1 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode + 1) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode + 1) * antall_MV_elem)) , aar_etter_forste_periode) || 0;
        }
      }
      enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0;
    }
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
      koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0
    }
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
      koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0
    }
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
      koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0
    }
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
      koeff_sesong5 = Math.floor(koeff_sesong5 * 1000/antall_klubber5) / 1000 || 0
    }
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
    }
    //Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng.
    // if (['NOR'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 += 1.666}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 += 1.666}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 += 1.666}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 += 1.666}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 += 1.666}}
    // if (['UKR','SRB','SCO','AUT','NED'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 0.8}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 0.8}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 0.8}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 0.8}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 0.8}}
    // if (['POR','FRA'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 1.333}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 1.333}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 1.333}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 1.333}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 1.333}}
    // if (['ENG'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 2}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2}}
    // if (['GER','ITA'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 2.285}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2.285}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2.285}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2.285}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2.285}}
    // if (['ESP'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 2) {enkelt_sesong1 = 2.5}
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2.5}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2.5}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2.5}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2.5}}
    assos_ranking_array.push(landskoeffisienter[i][0])
    assos_ranking_array.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
    if (antall_klubber1 == 0) {assos_ranking_array.push(-0.0001)}
    else (assos_ranking_array.push(enkelt_sesong1.toFixed(3)))
    if (antall_klubber2 == 0) {assos_ranking_array.push(-0.0001)}
    else (assos_ranking_array.push(koeff_sesong2.toFixed(3)))
    if (antall_klubber3 == 0) {assos_ranking_array.push(-0.0001)}
    else (assos_ranking_array.push(koeff_sesong3.toFixed(3)))
    if (antall_klubber4 == 0) {assos_ranking_array.push(-0.0001)}
    else (assos_ranking_array.push(koeff_sesong4.toFixed(3)))
    if (antall_klubber5 == 0) {assos_ranking_array.push(-0.0001)}
    else (assos_ranking_array.push(koeff_sesong5.toFixed(3)))
  
    ranking_array_2.push(assos_ranking_array)
  }



  for (p = 6; p > 1; p--) {
    ranking_array_2.sort(sortFunction_tall_1_flere_desimal_nyligste_land);
  }
  ranking_array_2.sort(sortFunction_tall_1_flere_desimal_land);


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
      flagg_ikon = '<div class="flagg_divT"><img class="flagg" id="NIR_" src="media/UEFA/NIR.svg" alt="NIR"></div>'
    }
    else {
      flagg_ikon = '<div class="flagg_divT"><img class="flagg" src="media/UEFA/' + landskode[i] + '.svg" alt="' + landskode[i] + '"></div>'
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
  if (document.getElementById("dropDownMeny_2").innerHTML.includes('<img class="jordklode2" src="media/UEFA/GLOBE2.svg" alt="Globe">')) {
    document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace('<img class="jordklode2" src="media/UEFA/GLOBE2.svg" alt="Globe">','')
  }
  var id = innerHTML.slice(68, 81)
  if (id == 'NIR') {}
  else {id = innerHTML.slice(73, 76)}
  // document.getElementById(id).style.backgroundColor = 'rgb(196, 217, 255)';
  // document.getElementById(id).style.border = '1px solid rgb(164, 164, 164)';
  if (filter_land.length == 8) {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<span class="grå_knappetekst">...(1)</span>'}
  else if (filter_land.length > 8) {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace(filter_land.length - 8, filter_land.length - 7)}
  else {
    document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + innerHTML
  }
}



function endreMenyTittel_2(innerHTML) {
  if (document.getElementById("dropDownMeny_2").innerHTML.includes('<img class="jordklode2" src="media/UEFA/GLOBE2.svg" alt="Globe">')) {
    document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace('<img class="jordklode2" src="media/UEFA/GLOBE2.svg" alt="Globe">','')
  }
  var id = innerHTML.slice(69, 72)
  if (id == 'NIR') {}
  else {id = innerHTML.slice(73, 76)}
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
        if (filter_land[6] == 'NIR') {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<div class="flagg_divT"><img class="flagg" id="NIR_" src="media/UEFA/NIR.svg" alt="NIR"></div>'}
          else {document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<div class="flagg_divT"><img class="flagg" src="media/UEFA/' + filter_land[6] + '.svg" alt="' + filter_land[6] + '"></div>'}
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
    else if (filter_land.length > 8) {
      document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML.replace(filter_land.length - 8, filter_land.length - 7)}
    else {
      document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + innerHTML
    }
  }
  if (filter_land.length == 0) {
    document.getElementById("dropDownMeny_2").innerHTML = document.getElementById("dropDownMeny_2").innerHTML + '<img class="jordklode2" src="media/UEFA/GLOBE2.svg" alt="Globe">'
  }
  localStorage.setItem('filter_land', JSON.stringify(filter_land))
  bygg_klubb_tabell()
}

function resett() {
  document.getElementById('dropDownMeny_2').innerHTML = '<img class="jordklode2" src="media/UEFA/GLOBE2.svg" alt="Globe"><div class="opp_ned_pil">&#10095</div>'
  for (p = 0; p < filter_land.length; p++) {
    document.getElementById(filter_land[p]).style.backgroundColor = '';
    document.getElementById(filter_land[p]).style.border = '';
  }
  filter_land = []
  localStorage.setItem('filter_land', JSON.stringify(filter_land))
  bygg_klubb_tabell()
}
/* Dropdown meny slutt */


function sortFunction_tall_1_flere_desimal_land(a, b) {
  if (a[1] == '') {a[1] = -0.0001}
  if (b[1] == '') {b[1] = -0.0001}
  if (parseFloat(a[1]) === parseFloat(b[1])) {
    return 0;
  }
  else {
    return (parseFloat(a[1]) > parseFloat(b[1])) ? -1 : 1;
  }
}
function sortFunction_tall_1_flere_desimal_nyligste_land(a, b) {
  if (parseFloat(a[p]) === parseFloat(b[p])) {
    return 0;
  }
  else {
    return (parseFloat(a[p]) > parseFloat(b[p])) ? -1 : 1;
  }
}

window.onscroll = function() {myFunction()};
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("ad_venstre").style.top = -3*scrolled + "px";
  document.getElementById("ad_hoyre").style.top = -3*scrolled + "px";
}


function access_list(spraak) {
  if (tilgangslister[aar_etter_forste_periode+1]) {
    if (spraak == 'norsk') {
      document.getElementById('decisive_sesong').innerHTML = 'Avgjørende for <a class="graa_hover_link_decisive" href="' + tilgangslister[aar_etter_forste_periode+1] + '" target="_blank">klubb-utplassering i ' + (2000+aar_etter_forste_periode+23) + '/' + (aar_etter_forste_periode+24) + '</a>';
    }
    else {
      document.getElementById('decisive_sesong').innerHTML = 'Decisive for <a class="graa_hover_link_decisive" href="' + tilgangslister[aar_etter_forste_periode+1] + '" target="_blank">club deployment in ' + (2000+aar_etter_forste_periode+23) + '/' + (aar_etter_forste_periode+24) + '</a>';
    }
  }
  else {
    if (spraak == 'norsk') {
      document.getElementById('decisive_sesong').innerHTML = 'Avgjørende for klubb-utplassering i ' + (2000+aar_etter_forste_periode+23) + '/' + (aar_etter_forste_periode+24) + '</a>';
    }
    else {
      document.getElementById('decisive_sesong').innerHTML = 'Decisive for club deployment in ' + (2000+aar_etter_forste_periode+23) + '/' + (aar_etter_forste_periode+24) + '</a>';
    }
  }
}

var OSName="Unknown OS";
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isSafari2 = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
if (navigator.appVersion.indexOf("Mac")!=-1 && (isSafari || isSafari2)) {
  document.getElementById("container_").className += " container_Mac";
  document.getElementById("container__").className += " container__Mac";
}




// let rader = document.getElementById('tabell_hoved').rows
// let twitterLimInn = [];
// for (i = 0; i < forrigeUkeData.length; i++) {
//   for (let k = 0; k < 55; k++) {
//     let fjernSVG = rader[1+k].cells[4].innerHTML.split('.svg')[0];
//     let landskode = fjernSVG.substr(fjernSVG.length - 3);
//     if (forrigeUkeData[i][0] == landskode) {
//       for (let j = 0; j < flaggEmoji.length; j++) {
//         if (flaggEmoji[j][0] == landskode) {
//           twitterLimInn.push([flaggEmoji[j][1], parseFloat(rader[1+k].cells[7].innerText - forrigeUkeData[i][1])]);
//         }
//       }
//     }
//   }
// }

// i = 1
// twitterLimInn.sort(sortFunction_tall_1_forskjellig);
// let plasserLand = 0;

// for (i = 0; i < twitterLimInn.length-1; i++) {
//   if (twitterLimInn[plasserLand][1] == twitterLimInn[i+1][1]) {
//     twitterLimInn[plasserLand][0] += twitterLimInn[i+1][0]
//     twitterLimInn.splice(i+1, 1)
//     i--;
//   }
//   else {
//     plasserLand = i+1;
//   }
// }
// let twitterLimInn2 = "";
// for (let i = 0; i < twitterLimInn.length; i++) {
//   if (twitterLimInn[i][1] != 0) {
//     twitterLimInn2 += twitterLimInn[i][0] + " (+ " + (Math.round((twitterLimInn[i][1] + Number.EPSILON) * 1000) / 1000).toFixed(3) + ")\n";
//   }
// }

// navigator.clipboard.writeText(twitterLimInn2)