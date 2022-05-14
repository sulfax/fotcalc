let opp_ned_pil = '<span class="høyrestill"><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
var eksperimentell_profil_e = "Calculate from scratch";
var eksperimentell_profil_n = "Kalkuler fra bunnen";
var din_klubbs_premi_koef_e = "your club’s prize money";
var din_klubbs_premi_koef_n = "din klubb’s premiepenger";

let ranking_array = []
let land_ranking = []
oppdater_ved_refresh()
function oppdater_ved_refresh() {
  ranking_array = []
  testTabell = document.getElementById('minTest')
  testTabell2 = document.getElementById('minTest2')
  document.getElementById("dropDownMeny").innerHTML = (localStorage.getItem('dropdownmeny_valg_landskoeffisient') || (nåværende_sesong[0] - 5) + '/' + (nåværende_sesong[2] - 5) + ' - ' + (nåværende_sesong[0] - 1) + '/' + (nåværende_sesong[2] - 1)) + " <div class='opp_ned_pil'>&#10094</div>";
  
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
      // alert(menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))] + '    ' + menyvalg[indeks_klubb[p]][0])
      if (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))] == undefined) {
        antall_klubber1 -= 1
      }
      else {
        enkelt_sesong1 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))]) || 0
      }
    }
    enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0

    if (aar_etter_forste_periode <= 0) {
      koeff_sesong2 = parseFloat(landskoeffisienter[i][4 + aar_etter_forste_periode])
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
      koeff_sesong3 = parseFloat(landskoeffisienter[i][3 + aar_etter_forste_periode])
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
      koeff_sesong4 = parseFloat(landskoeffisienter[i][2 + aar_etter_forste_periode])
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
      koeff_sesong5 = parseFloat(landskoeffisienter[i][1 + aar_etter_forste_periode])
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
    
    // if (landskoeffisienter[i][0] == 'RUS') {
    //   if (aar_etter_forste_periode == 1) {
    //     enkelt_sesong1 = 4.333
    //   }
    //   if (aar_etter_forste_periode == 2) {
    //     koeff_sesong2 = 4.333
    //   }
    //   if (aar_etter_forste_periode == 3) {
    //     koeff_sesong3 = 4.333
    //   }
    //   if (aar_etter_forste_periode == 4) {
    //     koeff_sesong4 = 4.333
    //   }
    //   if (aar_etter_forste_periode == 5) {
    //     koeff_sesong5 = 4.333
    //   }
    // }
    
      // alert(enkelt_sesong1 + '    ' + landskoeffisienter[i][0] + '     ' + aar_etter_forste_periode)

    assos_ranking_array.push(landskoeffisienter[i][0])
    assos_ranking_array.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
    assos_ranking_array.push(enkelt_sesong1.toFixed(3))
    assos_ranking_array.push(koeff_sesong2.toFixed(3))
    assos_ranking_array.push(koeff_sesong3.toFixed(3))
    assos_ranking_array.push(koeff_sesong4.toFixed(3))
    assos_ranking_array.push(koeff_sesong5.toFixed(3))
    assos_ranking_array.push(landskoeffisienter[i][5])
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
  sorter_etter_sesong(ranking_array)
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
  sorter(column, order, tekst, ranking_array)
})

function sorter_etter_sesong() {
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
  sorter(column, order, tekst, ranking_array)
}


// Endre meta-beskrivelsene
// document.getElementById("tabell_hoved_2").classList.remove("skjul")
// var descval = document.getElementById('tabell_hoved_2').innerText;
// document.getElementById("tabell_hoved_2").classList.add("skjul")


var schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": []
}
var Lag_premiepenger = {
    "@type": "Question",
    "name": "How much prize money has PROMP earned so far?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "€ 15",
    }
}
schema.mainEntity.push(Lag_premiepenger)
const script = document.createElement('script');
script.setAttribute('type', 'application/ld+json');
script.textContent = JSON.stringify(schema);
document.head.appendChild(script);

const table = document.querySelector('table')
const arr = [...table.rows].map(r => [...r.querySelectorAll('td, th')].map(td => td.textContent))
arr[0][1] = "Country"
for (i = 0; i < land_ranking.length; i++) {
  arr[i+1][1] = land_ranking[i]
  arr[i].splice(3,5)
}
// console.log(arr)
var link = document.createElement('meta');  link.setAttribute('name', 'description');  link.content = descval; document.getElementsByTagName('head')[0].appendChild(link);


function sorter(column, order, tekst, ranking_array) {
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
  byggTabell_test(ranking_array)
}



function endre_kolonne_overskrift(kolonne, opp_ned_pil) {
  if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
    document.getElementById(kolonne).innerHTML = document.getElementById(kolonne).innerText + opp_ned_pil
  }
}




function sortFunction_tall_1_flere_desimal(a, b) {
  if (parseFloat(a[i]) === parseFloat(b[i])) {
    return 0;
  }
  else {
    return (parseFloat(a[i]) > parseFloat(b[i])) ? -1 : 1;
  }
}
function sortFunction_tall_2_flere_desimal(a, b) {
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
function byggTabell_test(ranking_array) {
  testTabell.innerHTML = '';
  var helTabellHTML = '';
  for (i = 0; i < ranking_array.length; i++) {
    land_ranking.push(ranking_array[i][7])
    if (ranking_array[i][0] == 'NIR') {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" id="NIR" src="media/UEFA/' + ranking_array[i][0] + '.svg" alt="Northern Ireland"></div>'
    }
    else {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" src="media/UEFA/' + ranking_array[i][0] + '.svg" alt="' + ranking_array[i][7] + '"></div>'
    }
    var rad_test = `<tr>
                    <td class="id_nr"> ${i + 1}</td>
                    <td><nobr class="marign_venstre">${flagg_ikon}</nobr></td>
                    <td class='premie_koeff'><b>${ranking_array[i][1]}</b></td>
                    <td class='premie_koeff'>${ranking_array[i][2]}</td>
                    <td class='premie_koeff'>${ranking_array[i][3]}</td>
                    <td class='premie_koeff'>${ranking_array[i][4]}</td>
                    <td class='premie_koeff'>${ranking_array[i][5]}</td>
                    <td class='premie_koeff'>${ranking_array[i][6]}</td>
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
for (i = 0; i < nåværende_sesong[0] - 21 + 5; i++) {
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
  }
  if (localStorage.getItem('kolonne')) {}
  else {
      localStorage.setItem('kolonne', 'ass_coeff')
      localStorage.setItem('rekkefølge', 'desc')
  }
}