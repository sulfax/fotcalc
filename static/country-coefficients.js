
let opp_ned_pil = '<span class="høyrestill"><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'

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
  ranking_array.sort(sortFunction_tall_flere_desimal_nyligste);
  if(order == 'desc') {
    ranking_array.sort(sortFunction_tall_1_flere_desimal);
    tekst += '<span class="høyrestill"><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
  }
  else {
    ranking_array.sort(sortFunction_tall_2_flere_desimal);
    tekst += '<span class="høyrestill"><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
  }
  localStorage.setItem('kolonne', column)
  localStorage.setItem('rekkefølge', order)
  document.getElementById(column).innerHTML = tekst;
  byggTabell_test(ranking_array)
}



function endre_kolonne_overskrift(kolonne, opp_ned_pil) {
  if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
    document.getElementById(kolonne).innerHTML = '<span id="premiepenger_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
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

function sortFunction_tall_flere_desimal_nyligste(a, b) {
  if (parseFloat(a[2]) === parseFloat(b[2])) {
    return 0;
  }
  else {
    return (parseFloat(a[2]) > parseFloat(b[2])) ? -1 : 1;
  }
}


let ranking_array = []
testTabell = document.getElementById('minTest')

var klubbers_assosiasjon = []
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

  let enkelt_sesong = 0
  for (p = 0; p < indeks_klubb.length; p++) {
    enkelt_sesong += (menyvalg[(indeks_klubb[p])][8]/indeks_klubb.length)
  }

  assos_ranking_array.push(landskoeffisienter[i][0])
  assos_ranking_array.push((landskoeffisienter[i][1] + landskoeffisienter[i][2] + landskoeffisienter[i][3] + landskoeffisienter[i][4] + enkelt_sesong).toFixed(3))
  assos_ranking_array.push(enkelt_sesong.toFixed(3))
  assos_ranking_array.push(landskoeffisienter[i][1].toFixed(3))
  assos_ranking_array.push(landskoeffisienter[i][2].toFixed(3))
  assos_ranking_array.push(landskoeffisienter[i][3].toFixed(3))
  assos_ranking_array.push(landskoeffisienter[i][4].toFixed(3))
  ranking_array.push(assos_ranking_array)
}


// Mange fine flaggikoner: https://github.com/HatScripts/circle-flags
byggTabell_test(ranking_array)
function byggTabell_test(ranking_array) {
  testTabell.innerHTML = '';
  for (i = 0; i < ranking_array.length; i++) {
    if (ranking_array[i][0] == 'NIR') {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" id="NIR" src="media/UEFA/' + ranking_array[i][0] + '.svg" alt="' + ranking_array[i][0] + ' flag"></div>'
    }
    else {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" src="media/UEFA/' + ranking_array[i][0] + '.svg" alt="' + ranking_array[i][0] + ' flag"></div>'
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
                testTabell.innerHTML += rad_test
    }
}