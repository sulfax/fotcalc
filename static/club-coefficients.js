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
var din_klubbs_premi_koef_e = "your club’s prize money";
var din_klubbs_premi_koef_n = "din klubb’s premiepenger";
let antall_MV_elem = 8;
let filter_land = []
let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];

let ranking_array = []


if (sessionStorage.getItem('kolonne_klubbkoeffisient') == 'undefined') {
  sessionStorage.setItem('kolonne_klubbkoeffisient', 'id_nr')
}
if (sessionStorage.getItem('rekkefølge_klubbkoeffisient') == 'undefined') {
  sessionStorage.setItem('rekkefølge_klubbkoeffisient', 'asc')
}


let aar_etter_forste_periode = "";

oppdater_ved_refresh()
function oppdater_ved_refresh() {
  let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || []
  ranking_array = []
  testTabell = document.getElementById('minTest')
  document.getElementById("dropDownMeny").innerHTML = (sessionStorage.getItem('dropdownmeny_valg_klubbkoeffisient') || (nåværende_sesong_periode_valg[0] - 4) + '/' + (nåværende_sesong_periode_valg[2] - 4) + ' - ' + (nåværende_sesong_periode_valg[0]) + '/' + (nåværende_sesong_periode_valg[2])) + " <div class='opp_ned_pil'>&#10094</div>";
  var klubbers_assosiasjon = []
  aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(8,10) - 21;
  let p = 17;
  let pilstatus = ''
  for (i = 0; i < 5; i++) {
    pilstatus = (document.getElementById('sesong' + (i + 1)).innerHTML).slice(5)
    document.getElementById('sesong' + (5 - i)).innerHTML = (p + aar_etter_forste_periode) + '/' + ((p + 1) + aar_etter_forste_periode) + pilstatus
    p += 1;
  }
  document.getElementById('decisive_sesong').innerText = (p + aar_etter_forste_periode) + '/' + ((p + 1) + aar_etter_forste_periode)
  for (i = 0; i < menyvalg.length; i++) {
    klubbers_assosiasjon.push(menyvalg[i][1])
  }


  let klubber_med_i_ranking_menyvalg = [];
  for (i = 0; i < menyvalg.length; i++) {
    let er_i_periode_menyvalg_aar_0 = (menyvalg[i][9 + (aar_etter_forste_periode * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_1 = (menyvalg[i][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_2 = (menyvalg[i][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_3 = (menyvalg[i][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_4 = (menyvalg[i][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)])
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
    else {
      if (er_i_periode_menyvalg_aar_0 != undefined || er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined || er_i_periode_menyvalg_aar_4 != undefined) {er_i_periode_menyvalg = true}
      else  {er_i_periode_menyvalg = false}}
    if (er_i_periode_menyvalg) {
      klubber_med_i_ranking_menyvalg.push(menyvalg[i][0])
    }
  }
  let klubber_allerede_lagt_til = []
  let NA_poeng_og_assosiasjon = regn_ut_NA_poeng()
  let klubb_i_ranking_periode = "";
  if (aar_etter_forste_periode <= 3) {
    for (i = 0; i < klubb_koeffisienter_1112_2021.length; i++) {
      if (aar_etter_forste_periode == -1) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][7] || klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 0) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][8] || klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 1) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][9] || klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 2) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][10] || klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 3) {klubb_i_ranking_periode = (klubb_koeffisienter_1112_2021[i][11])}
      else if (aar_etter_forste_periode == 4) {klubb_i_ranking_periode = true}
      if (klubb_i_ranking_periode) {
        let assos_ranking_array = [];
        let klubbnavn = (klubb_koeffisienter_1112_2021[i][0]);
  
        assos_ranking_array.push(klubbnavn)
  
        let sesong5 = (klubb_koeffisienter_1112_2021[i][12 + aar_etter_forste_periode] || "");
        let sesong4 = (klubb_koeffisienter_1112_2021[i][11 + aar_etter_forste_periode] || "");
        let sesong3 = (klubb_koeffisienter_1112_2021[i][10 + aar_etter_forste_periode] || "");
        let sesong2 = (klubb_koeffisienter_1112_2021[i][9 + aar_etter_forste_periode] || "");
        let sesong1 = (klubb_koeffisienter_1112_2021[i][8 + aar_etter_forste_periode] || "");
        let knapper = ""
        let plassering = ""
        if (klubber_med_i_ranking_menyvalg.includes(klubb_koeffisienter_1112_2021[i][0])) {
          for (p = 0; p < menyvalg.length; p++) {
            if (menyvalg[p][0] == klubb_koeffisienter_1112_2021[i][0]) {
              if (aar_etter_forste_periode == -1) {
              } else {
                sesong5 = menyvalg[p][9 + ((aar_etter_forste_periode) * antall_MV_elem)]
              }
              if (aar_etter_forste_periode >= 1) {sesong4 = menyvalg[p][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)]}
              if (aar_etter_forste_periode >= 2) {sesong3 = menyvalg[p][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)]}
              if (aar_etter_forste_periode >= 3) {sesong2 = menyvalg[p][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)]}
              if (aar_etter_forste_periode >= 4) {sesong1 = menyvalg[p][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)]}
            }
          }
        }
        let poeng = (((sesong5||0)+(sesong4||0)+(sesong3||0)+(sesong2||0)+(sesong1||0)).toFixed(3))
        assos_ranking_array.push(poeng)
        for (p = 0; p < landskoeffisienter.length; p++) {
          if (landskoeffisienter[p][0] == klubb_koeffisienter_1112_2021[i][1]) {
            assos_ranking_array.push(NA_poeng_og_assosiasjon[p][0])
            assos_ranking_array.push((Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/5))/1000).toFixed(3))
          }
        }
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
      let sesong5 = ""
      let sesong4 = ""
      let sesong3 = ""
      let sesong2 = ""
      let sesong1 = ""
      if (aar_etter_forste_periode >= 0) {
        sesong5 = menyvalg[i][9 + ((aar_etter_forste_periode) * antall_MV_elem)] || ""}
        if (menyvalg[i][9 + ((aar_etter_forste_periode) * antall_MV_elem)] == 0) {sesong5 = 0}
      if (aar_etter_forste_periode >= 1) {
        sesong4 = menyvalg[i][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)] || ""}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)] == 0) {sesong4 = 0}
      if (aar_etter_forste_periode >= 2) {
        sesong3 = menyvalg[i][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)] || ""}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)] == 0) {sesong3 = 0}
      if (aar_etter_forste_periode >= 3) {
        sesong2 = menyvalg[i][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)] || ""}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)] == 0) {sesong2 = 0}
      if (aar_etter_forste_periode >= 4) {
        sesong1 = menyvalg[i][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)] || ""}
        if (menyvalg[i][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)] == 0) {sesong1 = 0}
        if (sesong1 !== false || sesong2 !== false || sesong3 !== false || sesong4 !== false || sesong5 !== false) {
        assos_ranking_array.push(((sesong5||0)+(sesong4||0)+(sesong3||0)+(sesong2||0)+(sesong1||0)).toFixed(3))
        for (p = 0; p < landskoeffisienter.length; p++) {
          if (landskoeffisienter[p][0] == menyvalg[i][1]) {
            assos_ranking_array.push(NA_poeng_og_assosiasjon[p][0])
            assos_ranking_array.push((Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/5))/1000).toFixed(3))
          }
        }
        if (sesong5 !== "" || sesong4 !== "" || sesong3 !== "" || sesong2 !== "" || sesong1 !== "") {
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
          assos_ranking_array.push(sesong5);
          assos_ranking_array.push(sesong4);
          assos_ranking_array.push(sesong3);
          assos_ranking_array.push(sesong2);
          assos_ranking_array.push(sesong1);
          ranking_array.push(assos_ranking_array)
          // if (filter_land_før.includes(assos_ranking_array[2]) || filter_land_før == '') {
          // }
        }
      }
    }
  }
  i = 0
  ranking_array.sort(sortFunction_2);
  for (x = 8; x >= 4; x--) {
    ranking_array.sort(sortFunction_tall_1_flere_desimal_nyligste);
  }
  ranking_array.sort(sortFunction_tall_1_flere_desimal_original);
  for (p = 0; p < ranking_array.length; p++) {
    let rangering = p
    ranking_array[p].push(rangering)
    if (p > 0) {
      let poeng_lik = ((Math.max(ranking_array[p][1], ranking_array[p][3])) == (Math.max(ranking_array[p-1][1], ranking_array[p-1][3])))
      let kolonne1_lik1 = (ranking_array[p][4] == ranking_array[p-1][4])
      let kolonne1_lik2 = (ranking_array[p][5] == ranking_array[p-1][5])
      let kolonne1_lik3 = (ranking_array[p][6] == ranking_array[p-1][6])
      let kolonne1_lik4 = (ranking_array[p][7] == ranking_array[p-1][7])
      let kolonne1_lik5 = (ranking_array[p][8] == ranking_array[p-1][8])
      if (poeng_lik && kolonne1_lik1 && kolonne1_lik2 && kolonne1_lik3 && kolonne1_lik4 && kolonne1_lik5) {
        ranking_array[p].splice(9,1,ranking_array[p-1][9])
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
arr[0][6] = arr[0][6].slice(0, -1)
arr[0][7] = arr[0][7].slice(0, -1)
arr[0][8] = arr[0][8].slice(0, -1)
arr[0][9] = arr[0][9].slice(0, -1)
arr[0][10] = arr[0][10].slice(0, -1)
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
  for (o = 0; o < ranking_array.length; o++) {
    ranking_array[o][0] = (ranking_array[o][0]).substring(ranking_array[o][0].indexOf(">") + 1);
  }
  if (column != undefined) {
    sorter(column, order, tekst, ranking_array)
  }
})


function sorter_etter_sesong() {
  let column = sessionStorage.getItem('kolonne_klubbkoeffisient') || 'id_nr'
  let order = sessionStorage.getItem('rekkefølge_klubbkoeffisient') || 'asc'
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
  }else {var tekst = document.getElementById(column).innerText}
  sorter(column, order, tekst, ranking_array)
}



function sorter(column, order, tekst, ranking_array) {
  if (column == 'id_nr') {
    i = 9
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  if (column == 'klubb') {
    i = 0
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  if (column == 'land') {
    i = 2
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  if (column == 'poeng') {
    i = 1
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  if (column == 'na_poeng') {
    i = 3
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  else if (column == 'sesong1') {
    i = 4
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  else if (column == 'sesong2') {
    i = 5
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  else if (column == 'sesong3') {
    i = 6
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  else if (column == 'sesong4') {
    i = 7
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong5', opp_ned_pil_midten)
  }
  else if (column == 'sesong5') {
    i = 8
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
  }
  if(order == 'desc') {
    if (column != 'klubb' && column != 'land') {
      tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
      ranking_array.sort(sortFunction_tall_1_flere_desimal);
    }
    else {
      tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
      ranking_array.sort(sortFunction_1);
    }
  }
  else {
    if (column != 'klubb' && column != 'land') {
      tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
      ranking_array.sort(sortFunction_tall_2_flere_desimal);
    }
    else {
      tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
      ranking_array.sort(sortFunction_2);
    }
  }
  sessionStorage.setItem('kolonne_klubbkoeffisient', column)
  sessionStorage.setItem('rekkefølge_klubbkoeffisient', order)
  document.getElementById(column).innerHTML = tekst;
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
  let sum_a2 = a[3]
  let sum_a = (Math.max(sum_a1, sum_a2))
  let sum_b1 = b[1]
  let sum_b2 = b[3]
  let sum_b = (Math.max(sum_b1, sum_b2))

  if (sum_a === '' || !sum_a && sum_a !== 0) {sum_a = "0.0"}
  if (sum_b === '' || !sum_b && sum_b !== 0) {sum_b = "0.0"}
  if (parseFloat(sum_a) === parseFloat(sum_b)) {
    return 0;
  }
  else {
    return (parseFloat(sum_a) > parseFloat(sum_b)) ? -1 : 1;
  }
}
function sortFunction_tall_2_flere_desimal(a, b) {
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
  if (((a[x] === '' || !a[x])) && a[x] !== 0) {a[x] = "0.0"}
  if (((b[x] === '' || !b[x])) && b[x] !== 0) {b[x] = "0.0"}
  if (parseFloat(a[x]) === parseFloat(b[x])) {
    return 0;
  }
  else {
    return (parseFloat(a[x]) > parseFloat(b[x])) ? -1 : 1;
  }
}



// Mange fine flaggikoner: https://github.com/HatScripts/circle-flags
function byggTabell_test(ranking_array, column, order) {
  let poeng = ""
  let na_poeng = ""
  testTabell.innerHTML = '';
  var helTabellHTML = '';
  for (i = 0; i < ranking_array.length; i++) {
    poeng =  ranking_array[i][1];
    na_poeng =  ranking_array[i][3];
    if (parseFloat(poeng) > parseFloat(na_poeng)) {
      poeng = "<b>" + ranking_array[i][1] + "</b>"
    }
    else if (parseFloat(poeng) < parseFloat(na_poeng)){
      na_poeng = "<b>" + ranking_array[i][3] + "</b>"
    }
    else {
      poeng = "<b>" + ranking_array[i][1] + "</b>"
      na_poeng = "<b>" + ranking_array[i][3] + "</b>"
    }
    let sesong5 = ranking_array[i][4]
    let sesong4 = ranking_array[i][5]
    let sesong3 = ranking_array[i][6]
    let sesong2 = ranking_array[i][7]
    let sesong1 = ranking_array[i][8]
    if (sesong5 === "0.0") {sesong5 = ''}
    if (sesong4 === "0.0") {sesong4 = ''}
    if (sesong3 === "0.0") {sesong3 = ''}
    if (sesong2 === "0.0") {sesong2 = ''}
    if (sesong1 === "0.0") {sesong1 = ''}

    let nummer = i+1;
    if (nummer <= 3) {
      nummer = '<img src="media/kolonnefjerner.png">' + nummer + '<img src="media/kolonnefjerner.png">';
    }
    let rangering = `<td class="id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;

    let klubbnavn_HTML_start = '<td><nobr class="marign_venstre">';
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
          if (aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21 && aar_etter_forste_periode < nåværende_sesong_periode_valg[0]-16) {
            if (knapper[0] != '') {
              klubbnavn_HTML_start = '<td class="var_med"><nobr class="marign_venstre">';
            }
          }
          // if (nåværende_sesong_periode_valg[0]-16 != aar_etter_forste_periode && !(knapper).includes("KO")) {
          //   if ((knapper).includes("b18")) {
          //     if ((plassering).includes("3")) {
          //       rangering = `<td class="ucl_gs_uel id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
          //     }
          //     else if (!(plassering).includes("4")) {
          //       rangering = `<td class="ucl_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
          //     }
          //   }
          //   else if ((knapper).includes("b19")) {
          //     if ((plassering).includes("3")) {
          //       rangering = `<td class="uel_gs_uecl id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
          //     }
          //     else if (!(plassering).includes("4")) {
          //       rangering = `<td class="uel_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
          //     }
          //   }
          //   else if ((knapper).includes("b20") && !(plassering).includes("3") && !(plassering).includes("4")) {
          //     rangering = `<td class="uecl_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
          //   }
          // }
          if (nåværende_sesong_periode_valg[0]-16 != aar_etter_forste_periode) {
            if (!knapper.includes('b5') && !knapper.includes('b8') && !knapper.includes('b12') && !knapper.includes('b17') && !knapper.includes('KO') && ((!plassering.includes("4") && (!plassering.includes("3") || !knapper.includes('b20')) && nåværende_sesong_periode_valg[0] < 24) || ((String(plassering).replaceAll(',', '')) <= 24 && nåværende_sesong_periode_valg[0] >= 24)) && knapper[0] != '' && (aar_etter_forste_periode + nåværende_sesong_periode_valg[0] != 22)) {
              klubbnavn_HTML_start = '<td class="fortsatt_med"><nobr class="marign_venstre">';
            }
            if ((knapper).includes("b18")) {
              if ((plassering).includes("3") && nåværende_sesong_periode_valg[0] < 24) {
                rangering = `<td class="ucl_gs_uel id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
              }
              else {
                rangering = `<td class="ucl_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
              }
            }
            else if ((knapper).includes("b19")) {
              if ((plassering).includes("3") && nåværende_sesong_periode_valg[0] < 24) {
                rangering = `<td class="uel_gs_uecl id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
              }
              else {
                rangering = `<td class="uel_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
              }
            }
            else if ((knapper).includes("b20")) {
              rangering = `<td class="uecl_gs id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
            }
          }
        }
      }
    }
    let klubbnavn = ranking_array[i][0]
    let klubbnavn_url = klubbnavn.replace(/\s/g, '')
    if (klubbnavn_url.includes('/')) {
      klubbnavn_url = klubbnavn_url.replace('/','')
    }
    ranking_array[i][0] = '<img class="klubb_logo" loading="lazy" data-sizes="auto" src="media/klubblogo/' + ranking_array[i][2] + "/" + klubbnavn_url + '2.png"' + 
    `data-srcset="
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `1.png 18w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `2.png 32w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `3.png 36w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `4.png 50w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `5.png 64w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `6.png 70w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `7.png 100w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `8.png 140w"
    data-fallback="media/klubblogo/fallback.png" sizes="19px" srcset="
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `1.png 13w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `2.png 32w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `3.png 36w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `4.png 50w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `5.png 64w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `6.png 70w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `7.png 100w,
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `8.png 140w">` + ranking_array[i][0];
    if (aar_etter_forste_periode == 0) {
      sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${7})" class="utydelig_link">${sesong5}</a>`
    }
    if (aar_etter_forste_periode == 1) {
      sesong5 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${7})" class="utydelig_link">${sesong5}</a>`
      sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${8})" class="utydelig_link">${sesong4}</a>`}
    if (aar_etter_forste_periode == 2) {
      sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${8})" class="utydelig_link">${sesong4}</a>`
      sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${9})" class="utydelig_link">${sesong3}</a>`}
    if (aar_etter_forste_periode == 3) {
      sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${9})" class="utydelig_link">${sesong3}</a>`
      sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${10})" class="utydelig_link">${sesong2}</a>`}
    if (aar_etter_forste_periode == 4) {
      sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${10})" class="utydelig_link">${sesong2}</a>`
      sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${11})" class="utydelig_link">${sesong1}</a>`}
    if (aar_etter_forste_periode == 5) {
      sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${11})" class="utydelig_link">${sesong1}</a>`}
    var rad_test = `<tr>
                    <td class="id_nr veldig_utydelig ramme_hoyre">${nummer}</td>
                    ${rangering}
                    ${klubbnavn_HTML_start + ranking_array[i][0]}</nobr></td>
                    <td id="tom_kolonne">${klubbnavn}</td>
                    <td class='premie_koeff_3 ramme_hoyre'><div class='senter'><div class='premie_koeff_3 utydelig'>${ranking_array[i][2]}</div></div></td>
                    <td class='premie_koeff_2'><div class='senter'><div class='premie_koeff_2'>${poeng}</div></div></td>
                    <td class='premie_koeff ramme_hoyre'><div class='senter'><div class='premie_koeff'><a href="country-coefficients" onclick="trykker_na_poeng()">${na_poeng}</a></div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong5}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong4}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong3}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong2}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong1}</div></div></td>
                </tr>`
                helTabellHTML += rad_test
  }
  testTabell.innerHTML = helTabellHTML;
}

function endre_klubbnavn(i, kolonne) {
  var rows = document.getElementsByTagName("table")[0].rows;
  var last = rows[i + 1];
  var cell = last.cells[2];
  let aarstall = (rows[0].cells[kolonne].innerText[0] + rows[0].cells[kolonne].innerText[1] - 21)
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
for (i = -1; i < nyligste_poeng_rangering[0] - 21 + 5; i++) {
  let btn = document.createElement("button");
  btn.innerHTML = (21 + i - 4) + '/' + (22 + i - 4) + ' - ' + (21 + i) + '/' + (22 + i);
  btn.className = "meny_element"
  btn.setAttribute("onClick", "endreMenyTittel(innerHTML)");
  document.getElementById("dropdown_elementer").appendChild(btn);
}

function endreMenyTittel(innerHTML) {
  document.getElementById("dropDownMeny").innerHTML = innerHTML + "<div class='opp_ned_pil'>&#10094</div>";
  toggleMeny();
  sessionStorage.setItem('dropdownmeny_valg_klubbkoeffisient', innerHTML)
  oppdater_ved_refresh()
}





function sortFunction_tall_1_flere_desimal_land(a, b) {
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
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))] == undefined) {
          antall_klubber1 -= 1
        } else {
          enkelt_sesong1 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))]) || 0;
        }
      }
      enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0;
    }
    if (aar_etter_forste_periode <= 0) {
      koeff_sesong2 = parseFloat(landskoeffisienter[i][10 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode)))] == undefined) {
          antall_klubber2 -= 1
        } else {
          koeff_sesong2 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode)))]) || 0
        }
      }
      koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0}
    if (aar_etter_forste_periode <= 1) {
      koeff_sesong3 = parseFloat(landskoeffisienter[i][9 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 1)))] == undefined) {
          antall_klubber3 -= 1
        } else {
          koeff_sesong3 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 1)))]) || 0;
        }
      }
      koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0}
    if (aar_etter_forste_periode <= 2) {
      koeff_sesong4 = parseFloat(landskoeffisienter[i][8 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 2)))] == undefined) {
          antall_klubber4 -= 1
        } else {
          koeff_sesong4 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 2)))]) || 0
        }
      }
      koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0}
    if (aar_etter_forste_periode <= 3) {
      koeff_sesong5 = parseFloat(landskoeffisienter[i][7 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 3)))] == undefined) {
          antall_klubber5 -= 1
        } else {
          koeff_sesong5 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 3)))]) || 0
        }
      }
      koeff_sesong5 = Math.floor(koeff_sesong5 * 1000/antall_klubber5) / 1000 || 0}
    if (landskoeffisienter[i][0] == 'RUS') {
      if (aar_etter_forste_periode == 1) {
        enkelt_sesong1 = 4.333
      }
      if (aar_etter_forste_periode == 2) {
        koeff_sesong2 = 4.333
      }
      if (aar_etter_forste_periode == 3) {
        koeff_sesong3 = 4.333
      }
      if (aar_etter_forste_periode == 4) {
        koeff_sesong4 = 4.333
      }
      if (aar_etter_forste_periode == 5) {
        koeff_sesong5 = 4.333
      }
    }
    assos_ranking_array.push(landskoeffisienter[i][0])
    assos_ranking_array.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
    assos_ranking_array.push(enkelt_sesong1.toFixed(3))
    assos_ranking_array.push(koeff_sesong2.toFixed(3))
    assos_ranking_array.push(koeff_sesong3.toFixed(3))
    assos_ranking_array.push(koeff_sesong4.toFixed(3))
    assos_ranking_array.push(koeff_sesong5.toFixed(3))
  
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
  if (localStorage.getItem('kolonne') == 'prize_money') {
    localStorage.setItem('kolonne', 'ass_coeff')
    localStorage.setItem('rekkefølge', 'desc')
    localStorage.setItem('kolonne2', 'ass_coeff_total')
    localStorage.setItem('rekkefølge2', 'desc')
  }
  if (localStorage.getItem('kolonne2') == 'prize_money_total') {
      localStorage.setItem('kolonne', 'ass_coeff')
      localStorage.setItem('rekkefølge', 'desc')
      localStorage.setItem('kolonne2', 'ass_coeff_total')
      localStorage.setItem('rekkefølge2', 'desc')
  }
  if (localStorage.getItem('kolonne')) {}
  else {
      localStorage.setItem('kolonne', 'ass_coeff')
      localStorage.setItem('rekkefølge', 'desc')
      localStorage.setItem('kolonne2', 'ass_coeff_total')
      localStorage.setItem('rekkefølge2', 'desc')
  }
  localStorage.setItem('filter_land', JSON.stringify([]))
  localStorage.setItem('spoiler', 'synlig')
}



function regn_ut_NA_poeng() {
  let klubbers_assosiasjon = []
  for (i = 0; i < menyvalg.length; i++) {
    klubbers_assosiasjon.push(menyvalg[i][1])
  }
  let aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(8,10) - 21;
  let NA_poeng_og_assosiasjon = [];
  for (i = 0; i < landskoeffisienter.length; i++) {
    let indeks = 0
    let indeks_klubb = []
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
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))] == undefined) {
          antall_klubber1 -= 1
        }
        else {
          enkelt_sesong1 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))]) || 0
        }
      }
      enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0}
  
    if (aar_etter_forste_periode <= 0) {
      koeff_sesong2 = parseFloat(landskoeffisienter[i][10 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode)))] == undefined) {
          antall_klubber2 -= 1
        }
        else {
          koeff_sesong2 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode)))]) || 0
        }
      }
      koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0}
  
  
  
    if (aar_etter_forste_periode <= 1) {
      koeff_sesong3 = parseFloat(landskoeffisienter[i][9 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 1)))] == undefined) {
          antall_klubber3 -= 1
        }
        else {
          koeff_sesong3 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 1)))]) || 0
        }
      }
      koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0}
    if (aar_etter_forste_periode <= 2) {
      koeff_sesong4 = parseFloat(landskoeffisienter[i][8 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 2)))] == undefined) {
          antall_klubber4 -= 1
        }
        else {
          koeff_sesong4 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 2)))]) || 0
        }
      }
      koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0}
    if (aar_etter_forste_periode <= 3) {
      koeff_sesong5 = parseFloat(landskoeffisienter[i][7 + aar_etter_forste_periode])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 3)))] == undefined) {
          antall_klubber5 -= 1
        }
        else {
          koeff_sesong5 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 3)))]) || 0
        }
      }
      koeff_sesong5 = Math.floor(koeff_sesong5 * 1000/antall_klubber5) / 1000 || 0}
    
    let denne_NA_poeng_og_assos = []

    denne_NA_poeng_og_assos.push(landskoeffisienter[i][0])
    denne_NA_poeng_og_assos.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
    NA_poeng_og_assosiasjon.push(denne_NA_poeng_og_assos)
  }
  return NA_poeng_og_assosiasjon
}

window.onscroll = function() {myFunction()};
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("ad_venstre").style.top = -3*scrolled + "px";
  document.getElementById("ad_hoyre").style.top = -3*scrolled + "px";
}


function trykker_na_poeng() {
  localStorage.setItem('dropdownmeny_valg_landskoeffisient', (document.getElementById("dropDownMeny").innerText).substring(0, (document.getElementById("dropDownMeny").innerText).length - 2))
  localStorage.setItem('kolonne_landskoeffisient', 'poeng')
  localStorage.setItem('rekkefølge_landskoeffisient', 'desc')
}

/*var schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": []
}
var Lag_premiepenger = {
  "@type": "Question",
  "name": "How much prize money has earned so far?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "€ ",
  }
}
var Lag_koeff = {
  "@type": "Question",
  "name": "How many coefficient points has earned in 22/23?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": " association coefficient ",
  }
}
schema.mainEntity.push(Lag_premiepenger)
schema.mainEntity.push(Lag_koeff)

const script = document.createElement('script');
script.setAttribute('type', 'application/ld+json');
script.textContent = JSON.stringify(schema);
document.head.appendChild(script);*/
