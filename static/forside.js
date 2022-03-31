let antall_MV_elem = 8;

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


let opp_ned_pil = '<span class="høyrestill"><img src="media/opp_ned_pil.svg" alt="Sorting arrows"></span>'
let opp_ned_pil_klubb = '<img src="media/opp_ned_pil.svg" alt="Sorting arrows">'

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
  let menyvalg_edit = JSON.parse(localStorage.getItem('menyvalg_edit'))
  sorter(column, order, tekst, menyvalg_edit)
})



sorter_etter_sesong()
function sorter_etter_sesong() {
  var menyvalg_edit = menyvalg.slice(0);
  for (var i = 0; i < menyvalg_edit.length; i++) {
    if (menyvalg_edit[i][6 + (aarstall*antall_MV_elem)] == null) {
      menyvalg_edit.splice(i, 1)
      i = i - 1
    }
    else {
      var Ny = Object.assign([], menyvalg_edit[i]);
      menyvalg_edit[i] = [];
      let Ny1 = Ny.slice(0,1)
      let Ny2 = Ny.slice(1 + (aarstall*antall_MV_elem),2 + (aarstall*antall_MV_elem))
      let Ny3 = Ny.slice(2 + (aarstall*antall_MV_elem),3 + (aarstall*antall_MV_elem))
      let Ny4 = Ny.slice(3 + (aarstall*antall_MV_elem),4 + (aarstall*antall_MV_elem))
      let Ny5 = Ny.slice(4 + (aarstall*antall_MV_elem),5 + (aarstall*antall_MV_elem))
      let Ny6 = Ny.slice(5 + (aarstall*antall_MV_elem),6 + (aarstall*antall_MV_elem))
      let Ny7 = parseInt(Ny.slice(6 + (aarstall*antall_MV_elem),9 + (aarstall*antall_MV_elem)))
      let Ny8 = parseInt(Ny.slice(7 + (aarstall*antall_MV_elem),8 + (aarstall*antall_MV_elem)))
      let Ny9 = parseInt(Ny.slice(8 + (aarstall*antall_MV_elem),9 + (aarstall*antall_MV_elem)))
      Ny1.push(Ny2, Ny3, Ny4, Ny5, Ny6, Ny7, Ny8, Ny9)
      menyvalg_edit[i] = Ny1
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
    if (document.getElementById('prize_money').innerHTML.replace(document.getElementById('prize_money').innerText, '') != opp_ned_pil) {
      document.getElementById('prize_money').innerHTML = '<span id="premiepenger_navn">' + document.getElementById('prize_money').innerText + '</span>' + opp_ned_pil
    }
    if (document.getElementById('ass_coeff').innerHTML.replace(document.getElementById('ass_coeff').innerText, '') != opp_ned_pil) {
      document.getElementById('ass_coeff').innerHTML = '<span id="ass_koeff_navn">' + document.getElementById('ass_coeff').innerText + '</span>' + opp_ned_pil
    }
    if (document.getElementById('club_coeff').innerHTML.replace(document.getElementById('club_coeff').innerText, '') != opp_ned_pil) {
      document.getElementById('club_coeff').innerHTML = '<span id="klubb_koeff_navn">' + document.getElementById('club_coeff').innerText + '</span>' + opp_ned_pil
    }
  }
  else if (column == 'prize_money') {
    i = 6
    if (document.getElementById('club').innerHTML.replace(document.getElementById('club').innerText, '') != opp_ned_pil_klubb) {
      document.getElementById('club').innerHTML = '<span id="klubb_navn">' + document.getElementById('club').innerText + '</span>' + opp_ned_pil_klubb
    }
    if (document.getElementById('ass_coeff').innerHTML.replace(document.getElementById('ass_coeff').innerText, '') != opp_ned_pil) {
      document.getElementById('ass_coeff').innerHTML = '<span id="ass_koeff_navn">' + document.getElementById('ass_coeff').innerText + '</span>' + opp_ned_pil
    }
    if (document.getElementById('club_coeff').innerHTML.replace(document.getElementById('club_coeff').innerText, '') != opp_ned_pil) {
      document.getElementById('club_coeff').innerHTML = '<span id="klubb_koeff_navn">' + document.getElementById('club_coeff').innerText + '</span>' + opp_ned_pil
    }
  }
  else if (column == 'ass_coeff') {
    i = 7
    if (document.getElementById('prize_money').innerHTML.replace(document.getElementById('prize_money').innerText, '') != opp_ned_pil) {
      document.getElementById('prize_money').innerHTML = '<span id="premiepenger_navn">' + document.getElementById('prize_money').innerText + '</span>' + opp_ned_pil
    }
    if (document.getElementById('club').innerHTML.replace(document.getElementById('club').innerText, '') != opp_ned_pil_klubb) {
      document.getElementById('club').innerHTML = '<span id="klubb_navn">' + document.getElementById('club').innerText + '</span>' + opp_ned_pil_klubb
    }
    if (document.getElementById('club_coeff').innerHTML.replace(document.getElementById('club_coeff').innerText, '') != opp_ned_pil) {
      document.getElementById('club_coeff').innerHTML = '<span id="klubb_koeff_navn">' + document.getElementById('club_coeff').innerText + '</span>' + opp_ned_pil
    }
  }
  else if (column == 'club_coeff') {
    i = 8
    if (document.getElementById('prize_money').innerHTML.replace(document.getElementById('prize_money').innerText, '') != opp_ned_pil) {
      document.getElementById('prize_money').innerHTML = '<span id="premiepenger_navn">' + document.getElementById('prize_money').innerText + '</span>' + opp_ned_pil
    }
    if (document.getElementById('club').innerHTML.replace(document.getElementById('club').innerText, '') != opp_ned_pil_klubb) {
      document.getElementById('club').innerHTML = '<span id="klubb_navn">' + document.getElementById('club').innerText + '</span>' + opp_ned_pil_klubb
    }
    if (document.getElementById('ass_coeff').innerHTML.replace(document.getElementById('ass_coeff').innerText, '') != opp_ned_pil) {
      document.getElementById('ass_coeff').innerHTML = '<span id="ass_koeff_navn">' + document.getElementById('ass_coeff').innerText + '</span>' + opp_ned_pil
    }
  }
  menyvalg_edit.sort(sortFunction_1_klubb);
  if(order == 'desc') {
    if (column == 'club') {
      menyvalg_edit.sort(sortFunction_1);
      tekst += '<img src="media/opp_NEDpil.svg" alt="Sorting arrows">'
    }
    else {
      menyvalg_edit.sort(sortFunction_1_tall);
      tekst += '<span class="høyrestill"><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
    }
  }
  else {
    if (column == 'club') {
      menyvalg_edit.sort(sortFunction_2);
      tekst += '<img src="media/OPPned_pil.svg" alt="Sorting arrows">'
    }
    else {
      menyvalg_edit.sort(sortFunction_2_tall);
      tekst += '<span class="høyrestill"><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
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
    table.innerHTML += rad
  }
}



function endre_klubbnavn(i) {
  var rows = document.getElementsByTagName("table")[0].rows;
  var last = rows[i + 1];
  var cell = last.cells[1];
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

const menyvalg_lengde = JSON.parse(localStorage.getItem('menyvalg_edit')).length
var menyvalg_edit_2 = JSON.parse(localStorage.getItem('menyvalg_edit'))
var premiepenger_2 = JSON.parse(localStorage.getItem('menyvalg_edit'))
// for (let i = 0; i < menyvalg_lengde; i++) {

var Lag1 = {
    "@type": "Question",
    "name": "How much prize money has " + menyvalg_edit_2[0][0] + " earned so far?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "€ " + premiepenger_2[0][6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    }
}
var Lag2 = {
  "@type": "Question",
  "name": "How much prize money has " + menyvalg_edit_2[1][0] + " earned so far?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "€ " + premiepenger_2[1][6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
  }
}
var Lag3 = {
  "@type": "Question",
  "name": "How much prize money has " + menyvalg_edit_2[2][0] + " earned so far?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "€ " + premiepenger_2[2][6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
  }
}
var schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [Lag1,Lag2,Lag3]
}
// schema.mainEntity += Lag3
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
// }