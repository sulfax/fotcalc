let opp_ned_pil = '<span class="høyrestill"><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
var eksperimentell_profil_e = "Calculate from scratch";
var eksperimentell_profil_n = "Kalkuler fra bunnen";
var din_klubbs_premi_koef_e = "your club’s prize money";
var din_klubbs_premi_koef_n = "din klubb’s premiepenger";

let ranking_array = []
let land_ranking = []

if (localStorage.getItem('kolonne_landskoeffisient') == 'undefined') {
  localStorage.setItem('kolonne_landskoeffisient', 'poeng')
}
if (localStorage.getItem('rekkefølge_landskoeffisient') == 'undefined') {
  localStorage.setItem('rekkefølge_landskoeffisient', 'desc')
}

oppdater_ved_refresh()
function oppdater_ved_refresh() {
  ranking_array = []
  testTabell = document.getElementById('minTest')
  document.getElementById("dropDownMeny").innerHTML = (localStorage.getItem('dropdownmeny_valg_landskoeffisient') || (nåværende_sesong_periode_valg[0] - 4) + '/' + (nåværende_sesong_periode_valg[2] - 4) + ' - ' + (nåværende_sesong_periode_valg[0]) + '/' + (nåværende_sesong_periode_valg[2])) + " <div class='opp_ned_pil'>&#10094</div>";
  
  var klubbers_assosiasjon = []
  let aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(8,10) - 21;
  let p = 17;
  let pilstatus = ''
  for (i = 0; i < 5; i++) {
    pilstatus = (document.getElementById('sesong' + (i + 1)).innerHTML).slice(5)
    document.getElementById('sesong' + (5 - i)).innerHTML = (p + aar_etter_forste_periode) + '/' + ((p + 1) + aar_etter_forste_periode) + pilstatus
    p += 1;
  }
  document.getElementById('decisive_sesong').innerText = (p + 1 + aar_etter_forste_periode) + '/' + ((p + 2) + aar_etter_forste_periode)
  for (i = 0; i < menyvalg.length; i++) {
    klubbers_assosiasjon.push(menyvalg[i][1])
  }
  for (i = 0; i < landskoeffisienter.length; i++) {
    let assos_ranking_array = []
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
    for (p = 0; p < indeks_klubb.length; p++) {
      if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))] == undefined) {
        antall_klubber1 -= 1
      }
      else {
        enkelt_sesong1 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))]) || 0
      }
    }
    enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0

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
    assos_ranking_array.push(landskoeffisienter[i][11])

    let klubber_igjen = antall_klubber1
    for (p = 0; p < menyvalg.length; p++) {
      if (menyvalg[p][1] == landskoeffisienter[i][0]) {
        if (menyvalg[p][(8 * ((aar_etter_forste_periode+1)))] != undefined) {
          let gruppespillsplassering = (((menyvalg[p][(8 * ((aar_etter_forste_periode+1))) - 3])))
          if (gruppespillsplassering == '4,,' || gruppespillsplassering == ',4,' || gruppespillsplassering == ',,3' || gruppespillsplassering == ',,4') {
            klubber_igjen -= 1
          }
          else {
            antall_knapper = (((menyvalg[p][(8 * ((aar_etter_forste_periode+1))) - 6]).split(',')))
            for (s = 0; s < antall_knapper.length; s++) {
              if (antall_knapper[s] == 'b5' || antall_knapper[s] == 'b8' || antall_knapper[s] == 'b12' || antall_knapper[s] == 'b17' || antall_knapper[s] == 'KO') {
                klubber_igjen -= 1
                break
              }
            }
          }
        }
      }
    }
    assos_ranking_array.push(klubber_igjen + '/' + antall_klubber1)
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
  }
  sorter_etter_sesong(aar_etter_forste_periode)
}






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
  if (column != undefined) {
    sorter(column, order, tekst, ranking_array)
  }
})

function sorter_etter_sesong(aar_etter_forste_periode) {
  let column = localStorage.getItem('kolonne_landskoeffisient') || 'poeng'
  let order = localStorage.getItem('rekkefølge_landskoeffisient') || 'desc'
  if(order == 'desc') {
    document.getElementById(column).dataset.order = 'asc';
  }
  else {
    document.getElementById(column).dataset.order = 'desc';
  }
  if (column == 'poeng') {
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
  if (column == 'poeng') {
    i = 1
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong1') {
    i = 2
    endre_kolonne_overskrift('poeng', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong2') {
    i = 3
    endre_kolonne_overskrift('poeng', opp_ned_pil)
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong3') {
    i = 4
    endre_kolonne_overskrift('poeng', opp_ned_pil)
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong4') {
    i = 5
    endre_kolonne_overskrift('poeng', opp_ned_pil)
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong5', opp_ned_pil)
  }
  else if (column == 'sesong5') {
    i = 6
    endre_kolonne_overskrift('poeng', opp_ned_pil)
    endre_kolonne_overskrift('sesong1', opp_ned_pil)
    endre_kolonne_overskrift('sesong2', opp_ned_pil)
    endre_kolonne_overskrift('sesong3', opp_ned_pil)
    endre_kolonne_overskrift('sesong4', opp_ned_pil)
  }
  if(order == 'desc') {
    if (column == 'poeng') {
      for (p = 6; p > 1; p--) {
        ranking_array.sort(sortFunction_tall_1_flere_desimal_nyligste);
      }
    }
    ranking_array.sort(sortFunction_tall_1_flere_desimal);
    tekst += '<span class="høyrestill"><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
  }
  else {
    if (column == 'poeng') {
      for (p = 6; p > 1; p--) {
        ranking_array.sort(sortFunction_tall_2_flere_desimal_nyligste);
      }
    }
    ranking_array.sort(sortFunction_tall_2_flere_desimal);
    tekst += '<span class="høyrestill"><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
  }
  localStorage.setItem('kolonne_landskoeffisient', column)
  localStorage.setItem('rekkefølge_landskoeffisient', order)
  document.getElementById(column).innerHTML = tekst;
  byggTabell_test(ranking_array, aar_etter_forste_periode)
}



function endre_kolonne_overskrift(kolonne, opp_ned_pil) {
  if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
    document.getElementById(kolonne).innerHTML = document.getElementById(kolonne).innerText + opp_ned_pil
  }
}




function sortFunction_tall_1_flere_desimal(a, b) {
  if (a[i] == '') {a[i] = 0.000}
  if (b[i] == '') {b[i] = 0.000}
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) > parseFloat(b[i])) ? -1 : 1;
  }
}
function sortFunction_tall_2_flere_desimal(a, b) {
  if (a[i] == '') {a[i] = 0.000}
  if (b[i] == '') {b[i] = 0.000}
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) < parseFloat(b[i])) ? -1 : 1;
  }
}

function sortFunction_tall_1_flere_desimal_nyligste(a, b) {
  if (parseFloat(a[p]) === parseFloat(b[p])) {
    return 0;
  }
  else {
    return (parseFloat(a[p]) > parseFloat(b[p])) ? -1 : 1;
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
function byggTabell_test(ranking_array, aar_etter_forste_periode) {
  testTabell.innerHTML = '';
  var helTabellHTML = '';
  for (i = 0; i < ranking_array.length; i++) {
    land_ranking.push(ranking_array[i][7])
    let land = ""
    if (ranking_array[i][0] == 'NIR') {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" id="NIR" src="media/UEFA/' + ranking_array[i][0] + '.svg"></div>'
      land = "Northern Ireland"
    }
    else {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" src="media/UEFA/' + ranking_array[i][0] + '.svg"></div>'
      land = ranking_array[i][7]
    }
    if (ranking_array[i][2] == 0.000) {ranking_array[i][2] = "";}
    if (ranking_array[i][3] == 0.000) {ranking_array[i][3] = "";}
    if (ranking_array[i][4] == 0.000) {ranking_array[i][4] = "";}
    if (ranking_array[i][5] == 0.000) {ranking_array[i][5] = "";}
    if (ranking_array[i][6] == 0.000) {ranking_array[i][6] = "";}
    let sesong1 = ranking_array[i][2]
    let sesong2 = ranking_array[i][3]
    let sesong3 = ranking_array[i][4]
    let sesong4 = ranking_array[i][5]
    let sesong5 = ranking_array[i][6]
    let klubber_igjen = ""

    if ((ranking_array[i][8])[0] == '0') {
      klubber_igjen = `<td class='premie_koeff klubb rød'>${ranking_array[i][8]}</td>`
    } else if (((ranking_array[i][8])[0] - (ranking_array[i][8])[2]) == 0) {
      klubber_igjen = `<td class='premie_koeff klubb grønn'>${ranking_array[i][8]}</td>`
    } else {
      klubber_igjen = `<td class='premie_koeff klubb gul'>${ranking_array[i][8]}</td>`
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
      sesong5 = `<a href="../" onClick="forside_ø_koeff(${i},${7})" class="utydelig_link">${sesong5}</a>`}
    var rad_test = `<tr>
                    <td class="id_nr"> ${i + 1}</td>
                    <td><nobr class="marign_venstre">${flagg_ikon}</nobr></td>
                    <td id="tom_kolonne">${land}</td>
                    <td class='premie_koeff'><b>${ranking_array[i][1]}</b></td>
                    <td class='premie_koeff'>${sesong1}</td>
                    <td class='premie_koeff'>${sesong2}</td>
                    <td class='premie_koeff'>${sesong3}</td>
                    <td class='premie_koeff'>${sesong4}</td>
                    <td class='premie_koeff'>${sesong5}</td>
                    ${klubber_igjen}
                </tr>`
                helTabellHTML += rad_test
  }
  testTabell.innerHTML = helTabellHTML;
}


/*Dropdown meny start*/
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleMeny() {
  if (document.getElementById("myDropdown").classList.contains("show")) {
      document.getElementById("myDropdown").classList.remove("show")
      nedoverpil()
  }
  else {
      document.getElementById("myDropdown").classList.add("show")
      oppoverpil()
  }
}

function nedoverpil() {
  let DropdownMenyElement = (document.getElementById("dropDownMeny").innerText).slice(0, -1)
  document.getElementById("dropDownMeny").innerHTML = DropdownMenyElement + "<div class='opp_ned_pil'>&#10094</div>";
}

function oppoverpil() {
  let DropdownMenyElement = (document.getElementById("dropDownMeny").innerText).slice(0, -1)
  document.getElementById("dropDownMeny").innerHTML = DropdownMenyElement + "<div class='opp_ned_pil'>&#10095</div>";
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

/* Lager knappene i menyen */
for (i = 0; i < nåværende_sesong_periode_valg[0] - 21 + 5; i++) {
  let btn = document.createElement("button");
  btn.innerHTML = (21 + i - 4) + '/' + (22 + i - 4) + ' - ' + (21 + i) + '/' + (22 + i);
  btn.className = "meny_element"
  btn.setAttribute("onClick", "endreMenyTittel(innerHTML)");
  document.getElementById("dropdown_elementer").appendChild(btn);
}

function endreMenyTittel(innerHTML) {
  document.getElementById("dropDownMeny").innerHTML = innerHTML + "<div class='opp_ned_pil'>&#10094</div>";
  toggleMeny();
  localStorage.setItem('dropdownmeny_valg_landskoeffisient', innerHTML)
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

function forside_ø_koeff(i, kolonne) {
  localStorage.setItem('trykte_knapper', JSON.stringify([]))
  localStorage.setItem('trykte_knapper_exclude', JSON.stringify([]))
  localStorage.setItem('kolonne', 'ass_coeff')
  localStorage.setItem('rekkefølge', 'desc')
  localStorage.setItem('kolonne2', 'ass_coeff_ø')
  localStorage.setItem('rekkefølge2', 'desc')
  localStorage.setItem('spoiler', 'synlig')
  $('#tabell_overordnet td').show()
  var rows = document.getElementsByTagName("table")[0].rows;
  var last = rows[i+1];
  var cell = last.cells[1];
  let filter_land_før = [];
  let land = ''
  if ((cell.innerHTML).slice(87,90) == 'dia') {
    land = 'NIR'
  } else {
    land = (cell.innerHTML).slice(87,90)
  }
  filter_land_før.push(land)
  localStorage.setItem('filter_land', JSON.stringify(filter_land_før))
  let aarstall = ((rows[0].cells[kolonne+1].innerText).slice(0,2) - 21)
  localStorage.setItem('sessong', aarstall)
}