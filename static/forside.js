let antall_MV_elem = 8;
let filter_land = []
let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
let innerHTML = ''



if (localStorage.getItem('sessong') == null) {
  var aarstall = 0;
}
else {
  var aarstall = parseInt(localStorage.getItem('sessong'));
}

function endre_sessong(clicked_id) {
  if (clicked_id == 'sessong_kontroller_1') {
    aarstall -= 1;
    document.getElementById('sessong_kontroller_1').disabled = true;
    /*document.getElementById('sessong_kontroller_2').disabled = false;*/
  }
  else {
    aarstall += 1;
    document.getElementById('sessong_kontroller_2').disabled = true;
    document.getElementById('sessong_kontroller_1').disabled = false;
  }
  localStorage.setItem('sessong', aarstall);
  oppdater_sessong(aarstall)
  sorter_etter_sesong()
};


if (aarstall == 0) {
  document.getElementById('sessong_kontroller_1').disabled = true;
  /*document.getElementById('sessong_kontroller_2').disabled = false;*/
}
if (aarstall == 1) {
  document.getElementById('sessong_kontroller_1').disabled = false;
  document.getElementById('sessong_kontroller_2').disabled = true;
}
oppdater_sessong(aarstall)
function oppdater_sessong(aarstall) {
  if (aarstall == 0) {
    document.getElementById("sessong_id").innerText = "21/22";
  }
  if (aarstall == 1) {
    document.getElementById("sessong_id").innerText = "22/23";
  }
}


let opp_ned_pil = '<span class="høyrestill"><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></img></span>'
let opp_ned_pil_klubb = '<img src="media/opp_ned_pil.svg" alt="Sorting arrows"></img>'

$('th').on('click', function(){
  var column = $(this).data('column')
  var order = $(this).data('order')
  if (column == 'club') {
    var tekst = '<span id="klubb_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'prize_money') {
    var tekst = '<span id="premiepenger_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'ass_coeff') {
    var tekst = '<span id="ass_koeff_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'club_coeff') {
    var tekst = '<span id="klubb_koeff_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if(order == 'desc') {
    $(this).data('order', "asc")
  }
  else {
    $(this).data('order', "desc")
  }
  let menyvalg_edit = JSON.parse(localStorage.getItem('menyvalg_edit'))
  sorter(column, order, tekst, menyvalg_edit)
})



function sorter_etter_sesong() {
  var menyvalg_edit = menyvalg.slice(0);
  for (var i = 0; i < menyvalg_edit.length; i++) {
    if (menyvalg_edit[i][6 + (aarstall*antall_MV_elem)] == null) {
      menyvalg_edit.splice(i, 1)
      i = i - 1
    }
    else {
      if (filter_land.includes(menyvalg_edit[i][1]) || filter_land == '') {
        var Ny = Object.assign([], menyvalg_edit[i]);
        menyvalg_edit[i] = [];
        let Ny1 = Ny.slice(0,1)
        let Ny2 = Ny.slice(2 + (aarstall*antall_MV_elem),3 + (aarstall*antall_MV_elem))
        let Ny3 = Ny.slice(3 + (aarstall*antall_MV_elem),4 + (aarstall*antall_MV_elem))
        let Ny4 = Ny.slice(4 + (aarstall*antall_MV_elem),5 + (aarstall*antall_MV_elem))
        let Ny5 = Ny.slice(5 + (aarstall*antall_MV_elem),6 + (aarstall*antall_MV_elem))
        let Ny6 = Ny.slice(6 + (aarstall*antall_MV_elem),7 + (aarstall*antall_MV_elem))
        let Ny7 = parseInt(Ny.slice(7 + (aarstall*antall_MV_elem),8 + (aarstall*antall_MV_elem)))
        let Ny8 = parseFloat(Ny.slice(8 + (aarstall*antall_MV_elem),9 + (aarstall*antall_MV_elem)))
        let Ny9 = parseFloat(Ny.slice(9 + (aarstall*antall_MV_elem),10 + (aarstall*antall_MV_elem)))
        Ny1.push(Ny2, Ny3, Ny4, Ny5, Ny6, Ny7, Ny8, Ny9)
        menyvalg_edit[i] = Ny1
      }
      else {
        menyvalg_edit.splice(i, 1)
        i = i - 1
      }
    }
  }
  localStorage.setItem('menyvalg_edit', JSON.stringify(menyvalg_edit))
  let column = localStorage.getItem('kolonne') || 'prize_money'
  let order = localStorage.getItem('rekkefølge') || 'desc'
  if(order == 'desc') {
    document.getElementById(column).dataset.order = 'asc';
  }
  else {
    document.getElementById(column).dataset.order = 'desc';
  }
  if (column == 'club') {
    var tekst = '<span id="klubb_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'prize_money') {
    var tekst = '<span id="premiepenger_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'ass_coeff') {
    var tekst = '<span id="ass_koeff_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'club_coeff') {
    var tekst = '<span id="klubb_koeff_navn">' + document.getElementById(column).innerText + '</span>'
  }
  sorter(column, order, tekst, menyvalg_edit)
}

function sorter(column, order, tekst, menyvalg_edit) {
  if (column == 'club') {
    i = 0
    endre_kolonne_overskrift('prize_money', opp_ned_pil)
    endre_kolonne_overskrift('ass_coeff', opp_ned_pil)
    endre_kolonne_overskrift('club_coeff', opp_ned_pil)
  }
  else if (column == 'prize_money') {
    i = 6
    endre_kolonne_overskrift('club', opp_ned_pil_klubb)
    endre_kolonne_overskrift('ass_coeff', opp_ned_pil)
    endre_kolonne_overskrift('club_coeff', opp_ned_pil)
  }
  else if (column == 'ass_coeff') {
    i = 7
    endre_kolonne_overskrift('prize_money', opp_ned_pil)
    endre_kolonne_overskrift('club', opp_ned_pil_klubb)
    endre_kolonne_overskrift('club_coeff', opp_ned_pil)
  }
  else if (column == 'club_coeff') {
    i = 8
    endre_kolonne_overskrift('prize_money', opp_ned_pil)
    endre_kolonne_overskrift('club', opp_ned_pil_klubb)
    endre_kolonne_overskrift('ass_coeff', opp_ned_pil)
  }
  menyvalg_edit.sort(sortFunction_1_klubb);
  if(order == 'desc') {
    if (column == 'club') {
      menyvalg_edit.sort(sortFunction_1);
      tekst += '<img src="media/opp_NEDpil.svg" alt="Sorting arrows"></img>'
    }
    else {
      menyvalg_edit.sort(sortFunction_1_tall);
      tekst += '<span class="høyrestill"><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></img></span>'
    }
  }
  else {
    if (column == 'club') {
      menyvalg_edit.sort(sortFunction_2);
      tekst += '<img src="media/OPPned_pil.svg" alt="Sorting arrows"></img>'
    }
    else {
      menyvalg_edit.sort(sortFunction_2_tall);
      tekst += '<span class="høyrestill"><img src="media/OPPned_pil.svg" alt="Sorting arrows"></img></span>'
    }
  }
  localStorage.setItem('kolonne', column)
  localStorage.setItem('rekkefølge', order)
  document.getElementById(column).innerHTML = tekst;
  byggTabell_test(menyvalg_edit)
}

function byggTabell_test(data) {
  var table = document.getElementById('myTable')
  table.innerHTML = '';
  var helTabellHTML = '';
  for (var i = 0; i < data.length; i++) {
    let premiepenger = "€ " + data[i][6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let ass_koeff = (parseFloat(data[i][7]).toFixed(1));
    let klubb_koeff = (parseFloat(data[i][8]).toFixed(1));
    if ((data[i][1] + '').includes("b18")) {
      if ((data[i][4] + '').includes("3")) {
        nummer = '<td class="ucl_gs_uel id_nr">' + (i + 1) + '</td>'
      }
      else {
        nummer = '<td class="ucl_gs id_nr">' + (i + 1) + '</td>'
      }
    }
    else if ((data[i][1] + '').includes("b19")) {
      if ((data[i][4] + '').includes("3")) {
        nummer = '<td class="uel_gs_uecl id_nr">' + (i + 1) + '</td>'
      }
      else {
        nummer = '<td class="uel_gs id_nr">' + (i + 1) + '</td>'
      }
    }
    else if ((data[i][1] + '').includes("b20")) {
      nummer = '<td class="uecl_gs id_nr">' + (i + 1) + '</td>'
    }
    else {
      nummer = '<td class="id_nr" >' + (i + 1) + '</td>'
    }
    var rad = `<tr>
                  ${nummer}
                  <td><nobr class="marign_venstre">${data[i][0]}</nobr></td>
                  <td class='premie_koeff'><span class="premiepenger_span"><a class="tabell_link" href="../prize-money-calculator" onclick="endre_klubbnavn(${i})"><nobr>${premiepenger}</nobr></a></span></td>
                  <td class='premie_koeff'><span class="ass_coeff_span"><a class="tabell_link" href="../coefficient-calculator" onclick="endre_klubbnavn(${i})">${ass_koeff}</a></span></td>
                  <td class='premie_koeff'><span class="club_coeff_span"><a class="tabell_link" href="../coefficient-calculator" onclick="endre_klubbnavn(${i})">${klubb_koeff}</a></span></td>
              </tr>`
    helTabellHTML += rad;
  }
  table.innerHTML = helTabellHTML;
}
function endre_klubbnavn(i) {
  var rows = document.getElementsByTagName("table")[0].rows;
  var last = rows[i + 1];
  var cell = last.cells[1];
  var value = cell.innerText;
  localStorage.setItem('Klubbnavn', value)
}


// Endre meta-beskrivelsene
var descval = document.getElementById('tabell_hoved').innerText;
var link = document.createElement('meta');  link.setAttribute('name', 'description');  link.content = descval; document.getElementsByTagName('head')[0].appendChild(link);
var link = document.createElement('meta');  link.setAttribute('property', 'og:description');  link.content = descval; document.getElementsByTagName('head')[0].appendChild(link);

// var paras = document.getElementsByTagName('meta');
// for (i = 0; i < paras.length; i++) {
//   var test = paras[i].getAttribute('name');
  // var test_2 = paras[i].getAttribute('property');
  // if(test == "description" || test_2 == "og:description") {
  //   paras[i].content = descval;
  // }
// }

function endre_kolonne_overskrift(kolonne, opp_ned_pil) {
  if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil) {
    if (kolonne == 'prize_money') {
      document.getElementById(kolonne).innerHTML = '<span id="premiepenger_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
    }
    if (kolonne == 'ass_coeff') {
      document.getElementById(kolonne).innerHTML = '<span id="ass_koeff_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
    }
    if (kolonne == 'club_coeff') {
      document.getElementById(kolonne).innerHTML = '<span id="klubb_koeff_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
    }
  }
  if (document.getElementById(kolonne).innerHTML.replace(document.getElementById(kolonne).innerText, '') != opp_ned_pil_klubb) {
    if (kolonne == 'club') {
      document.getElementById(kolonne).innerHTML = '<span id="klubb_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil_klubb
    }
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
function sortFunction_1_tall(a, b) {
  if (a[i] === b[i]) {
    return 0;
  }
  else {
    return (a[i] > b[i]) ? -1 : 1;
  }
}
function sortFunction_2_tall(a, b) {
  if (a[i] === b[i]) {
    return 0;
  }
  else {
    return (a[i] < b[i]) ? -1 : 1;
  }
}


function sortFunction_1_klubb(a, b) {
  if (a[0].toLowerCase() === b[0].toLowerCase()) {
    return 0;
  }
  else {
    return (a[0].toLowerCase() < b[0].toLowerCase()) ? -1 : 1;
  }
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
    if (document.getElementById("myDropdown").classList.contains("show")) {}
    else {
      document.getElementById("myDropdown").classList.add("show")
      oppoverpil()
    }
  }
}

function nedoverpil() {
  document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace('❯','❮');
}

function oppoverpil() {
  document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace('❮','❯');
}



/* Lukker menyen om musepeker klikker utenfor boksen */
const $menu = $('.dropdown');

$(document).mouseup(e => {
  if (!$menu.is(e.target) // if the target of the click isn't the container...
  && $menu.has(e.target).length === 0) // ... nor a descendant of the container
  {
    if(document.getElementById("myDropdown").classList.contains('show')) {
      document.getElementById("myDropdown").classList.remove("show")
      nedoverpil()
    }
  }
});





let aar_etter_forste_periode = nåværende_sesong[0] - 21
var klubbers_assosiasjon = []
let ranking_array = []
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
  for (p = 0; p < indeks_klubb.length; p++) {
    enkelt_sesong1 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode + 1)))]) || 0
  }
  enkelt_sesong1 = Math.floor(enkelt_sesong1/indeks_klubb.length * 1000) / 1000
  if (aar_etter_forste_periode <= 0) {
    koeff_sesong2 = parseFloat(landskoeffisienter[i][4 + aar_etter_forste_periode])
  }else {
    for (p = 0; p < indeks_klubb.length; p++) {
      koeff_sesong2 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode)))]) || 0
    }
    koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/indeks_klubb.length) / 1000}
  if (aar_etter_forste_periode <= 1) {
    koeff_sesong3 = parseFloat(landskoeffisienter[i][3 + aar_etter_forste_periode])
  }else {
    for (p = 0; p < indeks_klubb.length; p++) {
      koeff_sesong3 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 1)))]) || 0
    }
    koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/indeks_klubb.length) / 1000}
  if (aar_etter_forste_periode <= 2) {
    koeff_sesong4 = parseFloat(landskoeffisienter[i][2 + aar_etter_forste_periode])
  }else {
    for (p = 0; p < indeks_klubb.length; p++) {
      koeff_sesong4 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 2)))]) || 0
    }
    koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/indeks_klubb.length) / 1000}
  if (aar_etter_forste_periode <= 3) {
    koeff_sesong5 = parseFloat(landskoeffisienter[i][1 + aar_etter_forste_periode])
  }else {
    for (p = 0; p < indeks_klubb.length; p++) {
      koeff_sesong5 += (menyvalg[(indeks_klubb[p])][(8 * ((aar_etter_forste_periode - 3)))]) || 0
    }
    koeff_sesong5 = Math.floor(koeff_sesong5 * 1000/indeks_klubb.length) / 1000}
  assos_ranking_array.push(landskoeffisienter[i][0])
  assos_ranking_array.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2 + enkelt_sesong1).toFixed(3))
  assos_ranking_array.push(enkelt_sesong1.toFixed(3))
  assos_ranking_array.push(koeff_sesong2.toFixed(3))
  assos_ranking_array.push(koeff_sesong3.toFixed(3))
  assos_ranking_array.push(koeff_sesong4.toFixed(3))
  assos_ranking_array.push(koeff_sesong5.toFixed(3))

  ranking_array.push(assos_ranking_array)
}

for (p = 6; p > 1; p--) {
  ranking_array.sort(sortFunction_tall_1_flere_desimal_nyligste);
}
ranking_array.sort(sortFunction_tall_1_flere_desimal);

function sortFunction_tall_1_flere_desimal(a, b) {
  if (parseFloat(a[1]) === parseFloat(b[1])) {
    return 0;
  }
  else {
    return (parseFloat(a[1]) > parseFloat(b[1])) ? -1 : 1;
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

var landskode = []
for (i = 0; i < ranking_array.length; i++) {
  landskode.push(ranking_array[i][0])
}
var flagg_ikon = '';
/* Lager knappene i menyen */
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
  btn.className = "meny_element"
  btn.setAttribute("onClick", "endreMenyTittel(innerHTML)");
  document.getElementById("dropdown_elementer").appendChild(btn);
}
btn = document.createElement("button");
btn.innerHTML = '<img class="roter" src="media/UEFA/GLOBE2_element.svg" alt="Globe">';
btn.className = "meny_element ekstra_meny_element"
btn.setAttribute("onClick", "resett()")
document.getElementById("dropdown_elementer").appendChild(btn);



for (p = 0; p < filter_land_før.length; p++) {
  filter_land.push(filter_land_før[p])
  innerHTML = document.getElementById(filter_land[p]).innerHTML;

  
  if (document.getElementById("dropDownMeny").innerHTML.includes('<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">')) {
    document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace('<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">','')
  }
  var id = innerHTML.slice(68, 71)
  if (id == 'NIR') {}
  else {id = innerHTML.slice(72, 75)}
  document.getElementById(id).style.backgroundColor = 'rgb(196, 217, 255)';
  document.getElementById(id).style.border = '1px solid rgb(164, 164, 164)';
  if (filter_land.length == 8) {document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML + '<span class="grå_knappetekst">...(1)</span>'}
  else if (filter_land.length > 8) {document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace(filter_land.length - 8, filter_land.length - 7)}
  else {
    document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML + innerHTML
  }
}
sorter_etter_sesong()



function endreMenyTittel(innerHTML) {
  if (document.getElementById("dropDownMeny").innerHTML.includes('<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">')) {
    document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace('<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">','')
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
    if (filter_land.length == 7) {document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace('...(1)','')}
    if (document.getElementById("dropDownMeny").innerHTML.includes(innerHTML)) {
      if (filter_land.length > 6) {
        if (filter_land[6] == 'NIR') {document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML + '<div class="flagg_div"><img class="flagg" id="NIR_" src="media/UEFA/NIR.svg" alt="NIR"></div>'}
          else {document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML + '<div class="flagg_div"><img class="flagg" src="media/UEFA/' + filter_land[6] + '.svg" alt="' + filter_land[6] + '"></div>'}
      }
      document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace(innerHTML,'')
    }
    if (filter_land.length > 7) {
      document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace(filter_land.length - 6,filter_land.length - 7)
    }
  }
  else {
    filter_land.push(id)
    document.getElementById(id).style.backgroundColor = 'rgb(196, 217, 255)';
    document.getElementById(id).style.border = '1px solid rgb(164, 164, 164)';
    if (filter_land.length == 8) {
      document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML + '<span class="grå_knappetekst">...(1)</span>'}
    else if (filter_land.length > 8) {document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML.replace(filter_land.length - 8, filter_land.length - 7)}
    else {
      document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML + innerHTML
    }
  }
  if (filter_land.length == 0) {
    document.getElementById("dropDownMeny").innerHTML = document.getElementById("dropDownMeny").innerHTML + '<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe">'
  }
  localStorage.setItem('filter_land', JSON.stringify(filter_land))
  sorter_etter_sesong()
}
/* Dropdown meny slutt */

function resett() {
  document.getElementById('dropDownMeny').innerHTML = '<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe"><div class="opp_ned_pil">&#10094</div>'
  for (p = 0; p < filter_land.length; p++) {
    document.getElementById(filter_land[p]).style.backgroundColor = '';
    document.getElementById(filter_land[p]).style.border = '';
  }
  filter_land = []
  localStorage.setItem('filter_land', JSON.stringify(filter_land))
  sorter_etter_sesong()
}