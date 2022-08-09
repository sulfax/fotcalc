let antall_MV_elem = 8;
let filter_land = []
let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
let innerHTML = ''
let trykte_knapper = JSON.parse(localStorage.getItem('trykte_knapper')) || [];
let trykte_knapper_exclude = JSON.parse(localStorage.getItem('trykte_knapper_exclude')) || [];
const knapp_filter_turneringer = ['ucl_knapp', 'uel_knapp', 'uecl_knapp']



if (localStorage.getItem('sessong') == null) {
  var aarstall = 1;
}
else {
  var aarstall = parseInt(localStorage.getItem('sessong'));
}

function endre_sessong(clicked_id) {
  let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
  if (clicked_id == 'sessong_kontroller_1') {
    aarstall = 0;
    document.getElementById('sessong_kontroller_1').disabled = true;
    document.getElementById('sessong_kontroller_2').disabled = false;
  }
  else {
    aarstall = 1;
    document.getElementById('sessong_kontroller_2').disabled = true;
    document.getElementById('sessong_kontroller_1').disabled = false;
  }
  localStorage.setItem('sessong', aarstall);
  oppdater_sessong(aarstall)
  sorter_etter_sesong()
  generer_lands_knapper()
  for (i = 0; i < filter_land_før.length; i++) {
    document.getElementById(filter_land_før[i]).style.backgroundColor = 'rgb(196, 217, 255)';
    document.getElementById(filter_land_før[i]).style.border = '1px solid rgb(164, 164, 164)';
  }
  localStorage.setItem('filter_land', JSON.stringify(filter_land_før))
  if (localStorage.getItem('spoiler') == 'skjult') {
    $('#tabell_overordnet td').hide()
  }
};


if (aarstall == 0) {
  document.getElementById('sessong_kontroller_1').disabled = true;
  document.getElementById('sessong_kontroller_2').disabled = false;
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
  if (order == localStorage.getItem('rekkefølge') && order == 'desc') {
    order = 'asc'
  }
  if (order == localStorage.getItem('rekkefølge') && order == 'asc') {
    order = 'desc'
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
  if (column == 'bidrag') {
    var tekst = '<span id="bidrag_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'club_coeff') {
    var tekst = '<span id="klubb_koeff_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'prize_money_total') {
    var tekst = '<span id="premiepenger_land_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'ass_coeff_total') {
    var tekst = '<span id="ass_koeff_land_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'ass_coeff_ø') {
    var tekst = '<span id="bidrag_land_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'club_coeff_total') {
    var tekst = '<span id="klubb_koeff_land_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if(order == 'desc') {
    $(this).data('order', "asc")
  }
  else {
    $(this).data('order', "desc")
  }
  let menyvalg_edit = JSON.parse(localStorage.getItem('menyvalg_edit'))
  if (column == 'club' || column == 'prize_money' || column == 'ass_coeff' || column == 'bidrag' || column == 'club_coeff') {
    sorter(column, order, tekst, menyvalg_edit)
    if (column == 'prize_money') {
      column = 'prize_money_total'
      tekst = '<span id="premiepenger_land_navn">' + document.getElementById(column).innerText + '</span>'
      sorter_land_total(column, order, tekst, menyvalg_edit)
    }
    if (column == 'ass_coeff') {
      column = 'ass_coeff_total'
      tekst = '<span id="ass_koeff_land_navn">' + document.getElementById(column).innerText + '</span>'
      sorter_land_total(column, order, tekst, menyvalg_edit)
    }
    if (column == 'bidrag') {
      column = 'ass_coeff_ø'
      tekst = '<span id="bidrag_land_navn">' + document.getElementById(column).innerText + '</span>'
      sorter_land_total(column, order, tekst, menyvalg_edit)
    }
    if (column == 'club_coeff') {
      column = 'club_coeff_total'
      tekst = '<span id="klubb_koeff_land_navn">' + document.getElementById(column).innerText + '</span>'
      sorter_land_total(column, order, tekst, menyvalg_edit)
    }
  }
  else {
    sorter_land_total(column, order, tekst, menyvalg_edit)
    if (column == 'prize_money_total') {
      column = 'prize_money'
      tekst = '<span id="premiepenger_navn">' + document.getElementById(column).innerText + '</span>'
      sorter(column, order, tekst, menyvalg_edit)
    }
    if (column == 'ass_coeff_total') {
      column = 'ass_coeff'
      tekst = '<span id="ass_koeff_navn">' + document.getElementById(column).innerText + '</span>'
      sorter(column, order, tekst, menyvalg_edit)
    }
    if (column == 'ass_coeff_ø') {
      column = 'bidrag'
      tekst = '<span id="bidrag_navn">' + document.getElementById(column).innerText + '</span>'
      sorter(column, order, tekst, menyvalg_edit)
    }
    if (column == 'club_coeff_total') {
      column = 'club_coeff'
      var tekst = '<span id="klubb_koeff_navn">' + document.getElementById(column).innerText + '</span>'
      sorter(column, order, tekst, menyvalg_edit)
    }
  }
  if (localStorage.getItem('spoiler') == 'skjult') {
    $('#tabell_overordnet td').hide()
    document.getElementById('spoiler').innerHTML = '<div class="spoiler_pil">&#10094</div>'
  }
  // document.getElementById('spoiler').innerHTML = '<img class="jordklode" src="media/red-circle.svg" alt="Country">'
})



function sorter_etter_sesong() {
  var menyvalg_edit = menyvalg.slice(0);
  const ucl_knapper = ['b2', 'b3', 'b6', 'b9', 'b13', 'CLPO', 'b16', 'b18'];
  const uel_knapper = ['b10', 'b14', 'b19'];
  const uecl_knapper = ['b4', 'b7', 'b11', 'b15', 'b20'];
  const scup_knapper = ['b36'];
  for (var i = 0; i < menyvalg_edit.length; i++) {
    let containsAll = false;
    if (menyvalg_edit[i][7 + (aarstall*antall_MV_elem)] == null) {
    }
    else {
      let klubb_knapp = [""];
      if (menyvalg_edit[i][2 + (aarstall*antall_MV_elem)]) {
        klubb_knapp = menyvalg_edit[i][2 + (aarstall*antall_MV_elem)].split(',');
      }
      let gruppeplassering = [""];
      if (menyvalg_edit[i][5 + (aarstall*antall_MV_elem)]) {
        gruppeplassering = menyvalg_edit[i][5 + (aarstall*antall_MV_elem)].split(',');
      }
      if (trykte_knapper.includes(knapp_filter_turneringer[0]) || trykte_knapper.includes(knapp_filter_turneringer[1]) || trykte_knapper.includes(knapp_filter_turneringer[2])) {
        if (trykte_knapper.includes(knapp_filter_turneringer[0])) {
          for (u = 0; u < ucl_knapper.length; u++) {
            if (klubb_knapp.includes(ucl_knapper[u])){
              containsAll = true;
              break
            }
          }
        }
        if (trykte_knapper.includes(knapp_filter_turneringer[1])) {
          for (u = 0; u < uel_knapper.length; u++) {
            if (klubb_knapp.includes(uel_knapper[u])){
              containsAll = true;
              break
            }
          }
          if (gruppeplassering[0] == 3 || gruppeplassering[1] == 2) {
            containsAll = true;
          }
        }
        if (trykte_knapper.includes(knapp_filter_turneringer[2])) {
          for (u = 0; u < uecl_knapper.length; u++) {
            if (klubb_knapp.includes(uecl_knapper[u])){
              containsAll = true;
              break
            }
          }
          if (gruppeplassering[1] == 3 || gruppeplassering[2] == 2) {
            containsAll = true;
          }
        }
      }
      else {
        containsAll = true;
      }
      /* --------------------------------------------------------- */
      const ucl_knapper_riktig = ['b2', 'b3', 'b6', 'b9', 'b13', 'CLPO', 'b16', 'b18', 'b21', 'b24', 'b27', 'b30', 'b33'];
      const uel_knapper_riktig = ['', '', '', 'b10', '', 'b14', 'b16', 'b19', 'b22', 'b25', 'b28', 'b31', 'b34'];
      const uecl_knapper_riktig = ['','b4', 'b7', 'b11', '', 'b15', 'b17', 'b20', 'b23', 'b26', 'b29', 'b32', 'b35'];
      if (containsAll) {
        // if (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2])) {
        // }
        // else {
          if (trykte_knapper.includes(knapp_filter_turneringer[0]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2]))) {
            for (j = 0; j < ucl_knapper_riktig.length; j++) {
              if (containsAll) {
                if (klubb_knapp.includes('b13') && trykte_knapper.includes('b9') && ((ucl_knapper_riktig[j] == 'b9') || (ucl_knapper_riktig[j] == 'b13'))) {
                }
                else if (trykte_knapper.includes(ucl_knapper_riktig[j]) || trykte_knapper.includes('i13')) {
                  if (klubb_knapp.includes(ucl_knapper_riktig[j]) || klubb_knapp.includes('i13')) {
                  }
                  else {
                    containsAll = false;
                  }
                }
              }
            }
          }
          else {
            containsAll = false
          }
          if (!containsAll && (trykte_knapper.includes(knapp_filter_turneringer[1]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2])))) {
            containsAll = true
            if (trykte_knapper.includes(knapp_filter_turneringer[1]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2]))) {
              for (j = 0; j < ucl_knapper_riktig.length; j++) {
                if (containsAll) {
                  if (trykte_knapper.includes(ucl_knapper_riktig[j])) {
                    if (ucl_knapper_riktig[j] == 'b16') {
                      if (klubb_knapp.includes('b14') && klubb_knapp.includes('b20')) {
                      }
                      else {
                        containsAll = false;
                      }
                    }
                    else if (klubb_knapp.includes(uel_knapper_riktig[j]) && uel_knapper_riktig[j]) {
                    }
                    else {
                      containsAll = false;
                    }
                  }
                  if (trykte_knapper.includes('i13')) {
                    if (gruppeplassering[0] == 3 || gruppeplassering[1] == 2) {}
                    else {
                      containsAll = false;
                    }
                  }
                }
              }
            }
          }
          if (!containsAll && (trykte_knapper.includes(knapp_filter_turneringer[2]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2])))) {
            containsAll = true
            if (trykte_knapper.includes(knapp_filter_turneringer[2]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2]))) {
              for (j = 0; j < ucl_knapper_riktig.length; j++) {
                if (containsAll) {
                  if (trykte_knapper.includes(ucl_knapper_riktig[j])) {
                    if (klubb_knapp.includes(uecl_knapper_riktig[j]) && uecl_knapper_riktig[j]) {
                    }
                    else {
                      containsAll = false;
                    }
                  }
                  if (trykte_knapper.includes('i13')) {
                    if (gruppeplassering[1] == 3 || gruppeplassering[2] == 2) {}
                    else {
                      containsAll = false;
                    }
                  }
                }
              }
            }
          }
          const knapper_generelle = ['b1', 'b5', 'b8', 'b12', 'b36', 'b37'];
          for (j = 0; j < knapper_generelle.length; j++) {
            if (trykte_knapper.includes(knapper_generelle[j])) {
              if (klubb_knapp.includes(knapper_generelle[j])) {}
              else {
                containsAll = false;
              }
            }
          }
          if (containsAll && (trykte_knapper.includes(knapp_filter_turneringer[0]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2])))) {
            containsAll = true
            if (trykte_knapper.includes(knapp_filter_turneringer[0]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2]))) {
              for (j = 0; j < ucl_knapper_riktig.length; j++) {
                if (containsAll) {
                  if (trykte_knapper_exclude.includes(ucl_knapper_riktig[j])) {
                    if (klubb_knapp.includes(ucl_knapper_riktig[j])) {
                      containsAll = false;
                    }
                  }
                  if (klubb_knapp.includes('b13') && trykte_knapper_exclude.includes('b9')) {
                    containsAll = false;
                  }
                }
              }
            }
          }
          if (containsAll && (trykte_knapper.includes(knapp_filter_turneringer[1]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2])))) {
            containsAll = true
            const uel_knapper_riktig = ['', '', '', 'b10', '', 'b14', 'b16', 'b19', 'b22', 'b25', 'b28', 'b31', 'b34'];
            if (trykte_knapper.includes(knapp_filter_turneringer[1]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2]))) {
              for (j = 0; j < ucl_knapper_riktig.length; j++) {
                if (containsAll) {
                  if (trykte_knapper_exclude.includes(ucl_knapper_riktig[j])) {
                    if (ucl_knapper_riktig[j] == 'b16') {
                      if (trykte_knapper_exclude.includes('b14') && klubb_knapp.includes('b20')) {
                        containsAll = false;
                      }
                    }
                    else if (klubb_knapp.includes(uel_knapper_riktig[j]) && uel_knapper_riktig[j]) {
                      containsAll = false;
                    }
                  }
                  if (trykte_knapper_exclude.includes('i13')) {
                    if (gruppeplassering[0] == 3 || gruppeplassering[1] == 2) {
                      containsAll = false;
                    }
                  }
                }
              }
            }
          }
          if (containsAll && (trykte_knapper.includes(knapp_filter_turneringer[2]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2])))) {
            containsAll = true
            const uecl_knapper_riktig = ['','b4', 'b7', 'b11', '', 'b15', 'b17', 'b20', 'b23', 'b26', 'b29', 'b32', 'b35'];
            if (trykte_knapper.includes(knapp_filter_turneringer[2]) || (!trykte_knapper.includes(knapp_filter_turneringer[0]) && (!trykte_knapper.includes(knapp_filter_turneringer[1])) && !trykte_knapper.includes(knapp_filter_turneringer[2]))) {
              for (j = 0; j < ucl_knapper_riktig.length; j++) {
                if (containsAll) {
                  if (trykte_knapper_exclude.includes(ucl_knapper_riktig[j])) {
                    if (klubb_knapp.includes(uecl_knapper_riktig[j])) {
                      containsAll = false;
                    }
                  }
                  if (trykte_knapper_exclude.includes('i13')) {
                    if (gruppeplassering[1] == 3 || gruppeplassering[2] == 2) {
                      containsAll = false;
                    }
                  }
                }
              }
            }
          }
          for (j = 0; j < knapper_generelle.length; j++) {
            if (trykte_knapper_exclude.includes(knapper_generelle[j])) {
              if (klubb_knapp.includes(knapper_generelle[j])) {
                containsAll = false;
              }
            }
          }
        // }
      }
    }
    let filter_land = JSON.parse(localStorage.getItem('filter_land')) || [];
    if ((filter_land.includes(menyvalg_edit[i][1]) || filter_land == '') && containsAll) {
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
      let Ny10 = Ny.slice(1,2)
      let Ny11 = ''
      Ny1.push(Ny2, Ny3, Ny4, Ny5, Ny6, Ny7, Ny8, Ny9, Ny10, Ny11)
      menyvalg_edit[i] = Ny1
      
      let antall_klubber_fra_land = 0
      for (let p = 0; p < menyvalg.length; p++) {
        if (menyvalg[p][1] == menyvalg_edit[i][9] && menyvalg[p][(8 * ((aarstall+1)))] !== undefined) {
          antall_klubber_fra_land += 1
        }
      }
      menyvalg_edit[i][10] = menyvalg_edit[i][7]/antall_klubber_fra_land


      let live_aarstall = nåværende_sesong_periode_valg[0] - 21
      if (aarstall == live_aarstall) {
        for (p = 0; p < menyvalg.length; p++) {
          if (menyvalg[p][0] == menyvalg_edit[i][0]) {
            let gruppespillsplassering = (((menyvalg[p][(8 * ((aarstall+1))) - 3])))
            if (gruppespillsplassering == '4,,' || gruppespillsplassering == ',4,' || gruppespillsplassering == ',,3' || gruppespillsplassering == ',,4') {
              menyvalg_edit[i][0] = menyvalg_edit[i][0] + '0/0'
              break
            }
            else {
              antall_knapper = (((menyvalg[p][(8 * ((aarstall+1))) - 6]).split(',')))
              for (s = 0; s < antall_knapper.length; s++) {
                if (antall_knapper[s] == 'b5' || antall_knapper[s] == 'b8' || antall_knapper[s] == 'b12' || antall_knapper[s] == 'b17' || antall_knapper[s] == 'KO') {
                  menyvalg_edit[i][0] = menyvalg_edit[i][0] + '0/0'
                  break
                }
              }
            }
            if (!menyvalg_edit[i][0].includes('0/0')) {
              menyvalg_edit[i][0] = menyvalg_edit[i][0] + '1/1'
            }
          }
        }
      }
    }
    else {
      menyvalg_edit.splice(i, 1)
      i = i - 1
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
  if (column == 'bidrag') {
    var tekst = '<span id="bidrag_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'club_coeff') {
    var tekst = '<span id="klubb_koeff_navn">' + document.getElementById(column).innerText + '</span>'
  }
  sorter(column, order, tekst, menyvalg_edit)
  column = localStorage.getItem('kolonne2') || 'prize_money_total'
  order = localStorage.getItem('rekkefølge2') || 'desc'
  if (column == 'prize_money_total') {
    var tekst = '<span id="premiepenger_land_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'ass_coeff_total') {
    var tekst = '<span id="ass_koeff_land_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'ass_coeff_ø') {
    var tekst = '<span id="bidrag_land_navn">' + document.getElementById(column).innerText + '</span>'
  }
  if (column == 'club_coeff_total') {
    var tekst = '<span id="klubb_koeff_land_navn">' + document.getElementById(column).innerText + '</span>'
  }
  sorter_land_total(column, order, tekst, menyvalg_edit)
}

function sorter(column, order, tekst, menyvalg_edit) {
  if (column == 'club') {
    i = 0
    endre_kolonne_overskrift('prize_money', opp_ned_pil)
    endre_kolonne_overskrift('ass_coeff', opp_ned_pil)
    endre_kolonne_overskrift('bidrag', opp_ned_pil)
    endre_kolonne_overskrift('club_coeff', opp_ned_pil)
  }
  else if (column == 'prize_money') {
    i = 6
    endre_kolonne_overskrift('club', opp_ned_pil_klubb)
    endre_kolonne_overskrift('ass_coeff', opp_ned_pil)
    endre_kolonne_overskrift('bidrag', opp_ned_pil)
    endre_kolonne_overskrift('club_coeff', opp_ned_pil)
  }
  else if (column == 'ass_coeff') {
    i = 7
    endre_kolonne_overskrift('prize_money', opp_ned_pil)
    endre_kolonne_overskrift('club', opp_ned_pil_klubb)
    endre_kolonne_overskrift('bidrag', opp_ned_pil)
    endre_kolonne_overskrift('club_coeff', opp_ned_pil)
  }
  else if (column == 'bidrag') {
    i = 10
    endre_kolonne_overskrift('prize_money', opp_ned_pil)
    endre_kolonne_overskrift('club', opp_ned_pil_klubb)
    endre_kolonne_overskrift('ass_coeff', opp_ned_pil)
    endre_kolonne_overskrift('club_coeff', opp_ned_pil)
  }
  else if (column == 'club_coeff') {
    i = 8
    endre_kolonne_overskrift('prize_money', opp_ned_pil)
    endre_kolonne_overskrift('club', opp_ned_pil_klubb)
    endre_kolonne_overskrift('ass_coeff', opp_ned_pil)
    endre_kolonne_overskrift('bidrag', opp_ned_pil)
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
    if (data[i][0].slice(-3) == '0/0') {
      data[i][0] = '<img class="x_symbol" src="media/x-symbol.svg">' + data[i][0].slice(0, -3)
    }
    else if (data[i][0].slice(-3) == '1/1') {
      data[i][0] = '<img class="check" src="media/check.svg">' + data[i][0].slice(0, -3)
    }
    let premiepenger = "€ " + data[i][6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let ass_koeff = (parseFloat(data[i][7]).toFixed(1));

    data[i][10] = (Math.floor(data[i][10] * 1000) / 1000).toFixed(3) || 0;
    if (data[i][10] == '0.000') {data[i][10] = ''}


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
                  <td class='premie_koeff'><span class="ass_coeff_span"><a class="tabell_link" href="#" onclick="endre_lands_filter_bidrag(${data[i][9]})">${data[i][10]}</a></span></td>
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
    if (kolonne == 'prize_money_total') {
      document.getElementById(kolonne).innerHTML = '<span id="premiepenger_land_navn">' + document.getElementById(kolonne).innerText + '</span><span class="høyrestill">' + opp_ned_pil
    }
    if (kolonne == 'ass_coeff_total') {
      document.getElementById(kolonne).innerHTML = '<span id="ass_koeff_land_navn">' + document.getElementById(kolonne).innerText + '</span><span class="høyrestill">' + opp_ned_pil
    }
    if (kolonne == 'ass_coeff_ø') {
      document.getElementById(kolonne).innerHTML = '<span id="bidrag_land_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
    }
    if (kolonne == 'club_coeff_total') {
      document.getElementById(kolonne).innerHTML = '<span id="klubb_koeff_land_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
    }
    if (kolonne == 'prize_money') {
      document.getElementById(kolonne).innerHTML = '<span id="premiepenger_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
    }
    if (kolonne == 'ass_coeff') {
      document.getElementById(kolonne).innerHTML = '<span id="ass_koeff_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
    }
    if (kolonne == 'bidrag') {
      document.getElementById(kolonne).innerHTML = '<span id="bidrag_navn">' + document.getElementById(kolonne).innerText + '</span>' + opp_ned_pil
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
const $menu = $('.dropdown_land');

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



generer_lands_knapper()
function generer_lands_knapper() {
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
    let antall_klubber1 = indeks_klubb.length;
    let antall_klubber2 = indeks_klubb.length;
    let antall_klubber3 = indeks_klubb.length;
    let antall_klubber4 = indeks_klubb.length;
    let antall_klubber5 = indeks_klubb.length;
    for (p = 0; p < indeks_klubb.length; p++) {
      if (menyvalg[(indeks_klubb[p])][(8 * ((aarstall + 1)))] == undefined) {
        antall_klubber1 -= 1
      } else {
        enkelt_sesong1 += (menyvalg[(indeks_klubb[p])][(8 * ((aarstall + 1)))]) || 0;
      }
    }
    enkelt_sesong1 = Math.floor(enkelt_sesong1/antall_klubber1 * 1000) / 1000 || 0
    if (aarstall <= 0) {
      koeff_sesong2 = parseFloat(landskoeffisienter[i][10 + aarstall])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aarstall)))] == undefined) {
          antall_klubber2 -= 1
        } else {
          koeff_sesong2 += (menyvalg[(indeks_klubb[p])][(8 * ((aarstall)))]) || 0
        }
      }
      koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0}
    if (aarstall <= 1) {
      koeff_sesong3 = parseFloat(landskoeffisienter[i][9 + aarstall])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aarstall - 1)))] == undefined) {
          antall_klubber3 -= 1
        } else {
          koeff_sesong3 += (menyvalg[(indeks_klubb[p])][(8 * ((aarstall - 1)))]) || 0;
        }
      }
      koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0}
    if (aarstall <= 2) {
      koeff_sesong4 = parseFloat(landskoeffisienter[i][8 + aarstall])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aarstall - 2)))] == undefined) {
          antall_klubber4 -= 1
        } else {
          koeff_sesong4 += (menyvalg[(indeks_klubb[p])][(8 * ((aarstall - 2)))]) || 0
        }
      }
      koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0}
    if (aarstall <= 3) {
      koeff_sesong5 = parseFloat(landskoeffisienter[i][7 + aarstall])
    }else {
      for (p = 0; p < indeks_klubb.length; p++) {
        if (menyvalg[(indeks_klubb[p])][(8 * ((aarstall - 3)))] == undefined) {
          antall_klubber5 -= 1
        } else {
          koeff_sesong5 += (menyvalg[(indeks_klubb[p])][(8 * ((aarstall - 3)))]) || 0
        }
      }
      koeff_sesong5 = Math.floor(koeff_sesong5 * 1000/antall_klubber5) / 1000 || 0}
    if (landskoeffisienter[i][0] == 'RUS') {
      if (aarstall == 1) {
        enkelt_sesong1 = 4.333
      }
      if (aarstall == 2) {
        koeff_sesong2 = 4.333
      }
      if (aarstall == 3) {
        koeff_sesong3 = 4.333
      }
      if (aarstall == 4) {
        koeff_sesong4 = 4.333
      }
      if (aarstall == 5) {
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
    ranking_array.push(assos_ranking_array)
  }
  for (p = 6; p > 1; p--) {
    ranking_array.sort(sortFunction_tall_1_flere_desimal_nyligste);
  }
  ranking_array.sort(sortFunction_tall_1_flere_desimal);
  
  var landskode = []
  for (i = 0; i < ranking_array.length; i++) {
    landskode.push(ranking_array[i][0])
  }
  var flagg_ikon = '';
  /* Lager knappene i menyen */
  document.getElementById("dropdown_elementer").innerHTML = "";
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
}


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






function endreMenyTittel(innerHTML) {
  let filter_land = JSON.parse(localStorage.getItem('filter_land')) || [];
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
  if (localStorage.getItem('spoiler') == 'skjult') {
    $('#tabell_overordnet td').hide()
  }
}
/* Dropdown meny slutt */

function resett() {
  document.getElementById('dropDownMeny').innerHTML = '<img class="jordklode" src="media/UEFA/GLOBE2.svg" alt="Globe"><div class="opp_ned_pil">&#10095</div>'
  let filter_land = JSON.parse(localStorage.getItem('filter_land')) || [];
  for (p = 0; p < filter_land.length; p++) {
    document.getElementById(filter_land[p]).style.backgroundColor = '';
    document.getElementById(filter_land[p]).style.border = '';
  }
  filter_land = []
  localStorage.setItem('filter_land', JSON.stringify(filter_land))
  sorter_etter_sesong()
  if (localStorage.getItem('spoiler') == 'skjult') {
    $('#tabell_overordnet td').hide()
  }
}




/*Dropdown avansert meny start*/
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleMeny_adva() {
  if (document.getElementById("myDropdown_adva").classList.contains("show")) {
    document.getElementById("myDropdown_adva").classList.remove("show")
    nedoverpil_adva()
  }
  else {
    if (document.getElementById("myDropdown_adva").classList.contains("show")) {}
    else {
      document.getElementById("myDropdown_adva").classList.add("show")
      oppoverpil_adva()
    }
  }
}

function nedoverpil_adva() {
  document.getElementById("dropDownMeny_adva").innerHTML = document.getElementById("dropDownMeny_adva").innerHTML.replace('❯','❮');
}

function oppoverpil_adva() {
  document.getElementById("dropDownMeny_adva").innerHTML = document.getElementById("dropDownMeny_adva").innerHTML.replace('❮','❯');
}



/* Lukker menyen om musepeker klikker utenfor boksen */
const $menu_adva = $('.dropdown_adva');

$(document).mouseup(e => {
  if (!$menu_adva.is(e.target) // if the target of the click isn't the container...
  && $menu_adva.has(e.target).length === 0) // ... nor a descendant of the container
  {
    if(document.getElementById("myDropdown_adva").classList.contains('show')) {
      document.getElementById("myDropdown_adva").classList.remove("show")
      nedoverpil_adva()
    }
  }
});



const knapplabel_turneringer = ['<img src=media/UEFA/UCL.svg class=turnering_ikon>', '<img src=media/UEFA/UEL.svg class=turnering_ikon>', '<img src=media/UEFA/UECL.svg class=turnering_ikon>']
for (i = 0; i < knapplabel_turneringer.length; i++) {
  let btn = "<abbr data_title='All stages'><button onClick='adva_filtrer(this.id)' class='btn btn-danger " + knapp_filter_turneringer[i] + "' id=" + knapp_filter_turneringer[i] + ">" + knapplabel_turneringer[i] + "</button></abbr>"
  document.getElementById("dropdown_elementer_turnering").innerHTML += btn;
}



const knapp_filter_id_dc = ['b1']
const knapplabel_dc = ['Domestic champion']
for (i = 0; i < knapplabel_dc.length; i++) {
  let btn = document.createElement("button");
  btn.id = knapp_filter_id_dc[i]
  btn.innerHTML = knapplabel_dc[i];
  btn.className = "btn btn-danger gullfarge_aktiver"
  btn.setAttribute("onClick", "adva_filtrer(this.id)");
  document.getElementById("dropdown_elementer_DC").appendChild(btn);
}



const knapp_filter_id_ucl = ['b2', 'b3', 'b6', 'b9', 'CLPO', 'b16', 'b18', 'i13', 'b21', 'b24', 'b27', 'b30', 'b33']
const knapplabel_ucl = ['Preliminary round', 'Q1', 'Q2', 'Q3', 'Play-off', 'Eliminated in Play-off', 'Group stage', 'Knockout round play-off', 'Round of 16' , 'Quarter-final', 'Semi-final', 'Final', 'Champion']
for (i = 0; i < knapplabel_ucl.length; i++) {
  let btn = document.createElement("button");
  btn.id = knapp_filter_id_ucl[i]
  btn.innerHTML = knapplabel_ucl[i]
  btn.className = "btn btn-danger gullfarge_aktiver"
  btn.setAttribute("onClick", "adva_filtrer(this.id)");
  document.getElementById("dropdown_elementer_vanlige").appendChild(btn);
}




const knapp_filter_id_ucel = ['b5', 'b8', 'b12']
const knapplabel_uecl = ['Eliminated in Q1', 'Eliminated in Q2', 'Eliminated in Q3']
for (i = 0; i < knapplabel_uecl.length; i++) {
  let btn = document.createElement("button");
  btn.id = knapp_filter_id_ucel[i]
  btn.innerHTML = knapplabel_uecl[i]
  btn.className = "btn btn-danger CON"
  btn.setAttribute("onClick", "adva_filtrer(this.id)");
  document.getElementById("dropdown_elementer_UECL").appendChild(btn);
}


const knapp_filter_id_scup = ['b36','b37']
const knapplabel_scup = ['SCUP','Champion']
for (i = 0; i < knapplabel_scup.length; i++) {
  let btn = document.createElement("button");
  btn.id = knapp_filter_id_scup[i]
  btn.innerHTML = knapplabel_scup[i]
  btn.className = "btn btn-danger SCUP"
  btn.setAttribute("onClick", "adva_filtrer(this.id)");
  document.getElementById("dropdown_elementer_SCUP").appendChild(btn);
}


btn = document.createElement("button");
btn.id = 'reset'
btn.innerHTML = 'Reset'
btn.className = "btn btn-danger reset"
btn.setAttribute("onClick", "reset(this.id)");
document.getElementById("dropdown_elementer_reset").appendChild(btn);


const filter_id = ['b1', 'b2', 'b3','b5', 'b6', 'b8', 'b9', 'b12', 'CLPO', 'b16', 'b18', 'i13', 'b21', 'b24', 'b27', 'b30', 'b33', 'b36', 'b37'];

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


fargelegg_etter_reset()
function fargelegg_etter_reset() {
  for (p = 0; p < trykte_knapper.length; p++) {
    fargelegg_knapp(trykte_knapper[p])
  }
}
for (p = 0; p < trykte_knapper_exclude.length; p++) {
    fargelegg_knapp(trykte_knapper_exclude[p])
    farge_ramme_knapp(trykte_knapper_exclude[p])
}
if (trykte_knapper[0]) {
  if (document.getElementById('knappetekst').innerText.startsWith('Advanced') == true) {
    document.getElementById('filter_på').innerText = '(on)';
  }
  else {
    document.getElementById('filter_på').innerText = '(på)';
  }
}
if (document.getElementById('b1').classList.contains('no_hover') || trykte_knapper[0]) {}
else {
  for (p = 0; p < filter_id.length; p++) {
    document.getElementById(filter_id[p]).classList.add('no_hover')
  }
}
sorter_etter_sesong()



function reset(clicked_id) {
  for (p = 0; p < trykte_knapper.length; p++) {
    fjern_farge_knapp(trykte_knapper[p])
  }
  for (p = 0; p < trykte_knapper_exclude.length; p++) {
    fjern_farge_knapp(trykte_knapper_exclude[p])
  }
  document.getElementById('filter_på').innerText = '';
  trykte_knapper = []
  trykte_knapper_exclude = []
  localStorage.setItem('trykte_knapper', JSON.stringify(trykte_knapper))
  localStorage.setItem('trykte_knapper_exclude', JSON.stringify(trykte_knapper_exclude))
  sorter_etter_sesong()
  for (p = 0; p < filter_id.length; p++) {
    document.getElementById(filter_id[p]).classList.add('no_hover')
  }
  if (localStorage.getItem('spoiler') == 'skjult') {
    $('#tabell_overordnet td').hide()
  }
}


function adva_filtrer(clicked_id) {
  if (trykte_knapper[0] || knapp_filter_turneringer.includes(clicked_id)) {
    if (document.getElementById('b1').classList.contains('no_hover')) {
      for (p = 0; p < filter_id.length; p++) {
        document.getElementById(filter_id[p]).classList.remove('no_hover')
      }
    }
    if (knapp_filter_turneringer.includes(clicked_id)) {

      let index = trykte_knapper.indexOf(knapp_filter_turneringer[0]);
      if (index > -1) {trykte_knapper.splice(index, 1);}
      index = trykte_knapper_exclude.indexOf(knapp_filter_turneringer[0]);
      if (index > -1) {trykte_knapper_exclude.splice(index, 1);}

      index = trykte_knapper.indexOf(knapp_filter_turneringer[1]);
      if (index > -1) {trykte_knapper.splice(index, 1);}
      index = trykte_knapper_exclude.indexOf(knapp_filter_turneringer[1]);
      if (index > -1) {trykte_knapper_exclude.splice(index, 1);}

      index = trykte_knapper.indexOf(knapp_filter_turneringer[2]);
      if (index > -1) {trykte_knapper.splice(index, 1);}
      index = trykte_knapper_exclude.indexOf(knapp_filter_turneringer[2]);
      if (index > -1) {trykte_knapper_exclude.splice(index, 1);}

      fjern_farge_knapp(knapp_filter_turneringer[0])
      fjern_farge_knapp(knapp_filter_turneringer[1])
      fjern_farge_knapp(knapp_filter_turneringer[2])
    }
    if (trykte_knapper.includes(clicked_id)) {
      index = (trykte_knapper.indexOf(clicked_id));
      trykte_knapper.splice(index, 1)
      trykte_knapper_exclude.push(clicked_id)
      farge_ramme_knapp(clicked_id)
    }
    else if (trykte_knapper_exclude.includes(clicked_id)) {
      index = (trykte_knapper_exclude.indexOf(clicked_id));
      trykte_knapper_exclude.splice(index, 1)
      fjern_farge_knapp(clicked_id)
    }
    else {
      trykte_knapper.push(clicked_id)
      fargelegg_knapp(clicked_id)
    }
    if (trykte_knapper[0] || trykte_knapper_exclude[0]) {
      if (document.getElementById('knappetekst').innerText.startsWith('Advanced') == true) {
        document.getElementById('filter_på').innerText = '(on)';
      }
      else {
        document.getElementById('filter_på').innerText = '(på)';
      }
    }
    else {
      document.getElementById('filter_på').innerText = '';
    }
    localStorage.setItem('trykte_knapper', JSON.stringify(trykte_knapper))
    localStorage.setItem('trykte_knapper_exclude', JSON.stringify(trykte_knapper_exclude))
    sorter_etter_sesong()
  }
  else {
    if (document.getElementById(clicked_id).innerText != 'Choose competition' && document.getElementById(clicked_id).innerText != 'Velg turnering') {
      var gammel_tekst = document.getElementById(clicked_id).innerText;
      document.getElementById(clicked_id).style.color = 'rgba(255,0,0,0.6)'
      document.getElementById(clicked_id).style.transition = "all 0.5s";
      if (document.getElementById('knappetekst').innerText.startsWith('Advanced') == true) {
        document.getElementById(clicked_id).innerText = 'Choose competition'
      }
      else {
        document.getElementById(clicked_id).innerText = 'Velg turnering'
      }
      setTimeout(() => {
        document.getElementById(clicked_id).style.color = ''
        document.getElementById(clicked_id).style.transition = "all 0.1s";
        document.getElementById(clicked_id).innerText = gammel_tekst
      }, 1500)
    }
  }
  if (localStorage.getItem('spoiler') == 'skjult') {
    $('#tabell_overordnet td').hide()
  }
}


function fargelegg_knapp(clicked_id) {
  if(document.getElementById(clicked_id).classList.contains('CHA') || document.getElementById(clicked_id).classList.contains('ucl_knapp')) {
    document.getElementById(clicked_id).classList.add("ucl")
  }
  else if (document.getElementById(clicked_id).classList.contains('EUR') || document.getElementById(clicked_id).classList.contains('uel_knapp')) {
    document.getElementById(clicked_id).classList.add("uel")
  }
  else if (document.getElementById(clicked_id).classList.contains('CON') || document.getElementById(clicked_id).classList.contains('uecl_knapp')) {
    document.getElementById(clicked_id).classList.add("uecl")
  }
  else if (document.getElementById(clicked_id).classList.contains('gullfarge_aktiver')) {
    document.getElementById(clicked_id).classList.add("gullfarge")
  }
  else {
    document.getElementById(clicked_id).classList.add("scup")
  }
}

function farge_ramme_knapp(clicked_id) {
  document.getElementById(clicked_id).classList.add("exclude")
}

function fjern_farge_knapp(clicked_id) {
  document.getElementById(clicked_id).classList.remove("exclude")
  if(document.getElementById(clicked_id).classList.contains('CHA') || document.getElementById(clicked_id).classList.contains('ucl_knapp')) {
    document.getElementById(clicked_id).classList.remove("ucl")
  }
  else if (document.getElementById(clicked_id).classList.contains('EUR') || document.getElementById(clicked_id).classList.contains('uel_knapp')) {
    document.getElementById(clicked_id).classList.remove("uel")
  }
  else if (document.getElementById(clicked_id).classList.contains('CON') || document.getElementById(clicked_id).classList.contains('uecl_knapp')) {
    document.getElementById(clicked_id).classList.remove("uecl")
  }
  else if (document.getElementById(clicked_id).classList.contains('gullfarge_aktiver')) {
    document.getElementById(clicked_id).classList.remove("gullfarge")
  }
  else {
    document.getElementById(clicked_id).classList.remove("scup")
  }
}

function sorter_land_total(column, order, tekst, menyvalg_edit) {
  if (column == 'prize_money_total') {
    i = 1
    endre_kolonne_overskrift('ass_coeff_total', opp_ned_pil)
    endre_kolonne_overskrift('ass_coeff_ø', opp_ned_pil)
    endre_kolonne_overskrift('club_coeff_total', opp_ned_pil)
  }
  else if (column == 'ass_coeff_total') {
    i = 2
    endre_kolonne_overskrift('prize_money_total', opp_ned_pil_klubb)
    endre_kolonne_overskrift('ass_coeff_ø', opp_ned_pil)
    endre_kolonne_overskrift('club_coeff_total', opp_ned_pil)
  }
  else if (column == 'ass_coeff_ø') {
    i = 4
    endre_kolonne_overskrift('prize_money_total', opp_ned_pil)
    endre_kolonne_overskrift('ass_coeff_total', opp_ned_pil_klubb)
    endre_kolonne_overskrift('club_coeff_total', opp_ned_pil)
  }
  else if (column == 'club_coeff_total') {
    i = 3
    endre_kolonne_overskrift('prize_money_total', opp_ned_pil)
    endre_kolonne_overskrift('ass_coeff_total', opp_ned_pil_klubb)
    endre_kolonne_overskrift('ass_coeff_ø', opp_ned_pil)
  }
  totalt_land(column, order, tekst, menyvalg_edit.length)
}

function totalt_land(column, order, tekst, antall_klubber) {
  for (r = 0; r < landskoeffisienter.length; r++) {
    landskoeffisienter[r][1] = 0;
    landskoeffisienter[r][2] = 0;
    landskoeffisienter[r][3] = 0;
    landskoeffisienter[r][4] = 0;
  }
  var rows = document.getElementsByTagName("table")[0].rows;
  for (p = 1; p <= antall_klubber; p++) {
    for (q = 0; q < menyvalg.length; q++) {
      if (rows[p].cells[1].innerText == menyvalg[q][0]) {
        for (r = 0; r < landskoeffisienter.length; r++) {
          if (landskoeffisienter[r][0] == menyvalg[q][1]) {
            landskoeffisienter[r][1] += parseInt((rows[p].cells[2].innerText).replace(/\D/g,''))
            landskoeffisienter[r][2] += parseFloat(rows[p].cells[3].innerText)
            landskoeffisienter[r][3] += parseFloat(rows[p].cells[5].innerText)
            landskoeffisienter[r][4] += 1
          }
        }
        break
      }
    }
  }
  let land_array = []
  for (r = 0; r < landskoeffisienter.length; r++) {
    if (landskoeffisienter[r][4] != 0) {
      landskoeffisienter[r][4] = Math.floor((landskoeffisienter[r][2]) * 1000/landskoeffisienter[r][4]) / 1000
      land_array.push(landskoeffisienter[r])
    }
  }
  let trykte_knapper = JSON.parse(localStorage.getItem('trykte_knapper')) || [];
  let trykte_knapper_exclude = JSON.parse(localStorage.getItem('trykte_knapper_exclude')) || [];
  let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
  if (trykte_knapper.length == 0 && trykte_knapper_exclude.length == 0 && aarstall == 1  && (filter_land_før.length == 0 || filter_land_før.includes('RUS'))) {
    land_array.push(['RUS', 0, '', '', 4.333, 0, 0, 0.166, 0.5, 0, 0.5, 'Russia'])
  }
  if(order == 'desc') {
    land_array.sort(sortFunction_1_tall);
    tekst += '<span class="høyrestill"><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
  }
  else {
    land_array.sort(sortFunction_2_tall);
    tekst += '<span class="høyrestill"><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
  }
  localStorage.setItem('kolonne2', column)
  localStorage.setItem('rekkefølge2', order)
  document.getElementById(column).innerHTML = tekst;
  bygg_tabell_2(land_array)
}


function bygg_tabell_2(land_array) {
  let trykte_knapper = JSON.parse(localStorage.getItem('trykte_knapper')) || [];
  let trykte_knapper_exclude = JSON.parse(localStorage.getItem('trykte_knapper_exclude')) || [];
  let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
  table = document.getElementById('myTable_2')
  table.innerHTML = '';
  var helTabellHTML = '';
  if (trykte_knapper.length > 0 || trykte_knapper_exclude.length > 0) {
    for (r = 0; r < land_array.length; r++) {
      land_array[r][4] = "-"
    }
  }
  for (r = 0; r < land_array.length; r++) {
    if (land_array[r][2] == 0) {
      land_array[r][2] = "";
    }
    else {
      land_array[r][2] = land_array[r][2].toFixed(1)
    }
    if (land_array[r][3] == 0) {
      land_array[r][3] = "";
    }
    else {
      land_array[r][3] = land_array[r][3].toFixed(1)
    }
    if (land_array[r][4] == 0 || (land_array[r][2] == 0 && (filter_land_før.includes('RUS') == false && filter_land_før.length != 0 && aarstall == 1))) {
      land_array[r][4] = "";
    }
    else if (land_array[r][4] != "-") {
      land_array[r][4] = `<a class="tabell_link" href="../country-coefficients" onclick="landsranking_endre_periode()">${land_array[r][4].toFixed(3)}</a>`
    }
    if (land_array[r][0] == 'NIR') {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" id="NIR" src="media/UEFA/' + land_array[r][0] + '.svg" alt="Northern Ireland"></div>'
    }
    else {
      flagg_ikon = '<div class="flagg_div"><img class="flagg" src="media/UEFA/' + land_array[r][0] + '.svg" alt="' + land_array[r][11] + '"></div>'
    }
    let premiepenger = "€ " + land_array[r][1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var rad = `<tr>
                <td class="id_nr">${r+1}</td>
                <td id="flagg_tabell2"><nobr class="marign_venstre">${flagg_ikon}</nobr></td>
                <td class='premie_koeff'><span class="premiepenger_span"><a class="tabell_link" href="../#" onclick="endre_lands_filter_prize(${land_array[r][0]})"><nobr>${premiepenger}</nobr></a></span></td>
                <td class='premie_koeff'><span class="ass_coeff_span"><a class="tabell_link" href="../#" onclick="endre_lands_filter_ass(${land_array[r][0]})">${land_array[r][2]}</a></span></td>
                <td class='premie_koeff'><span class="ass_coeff_span">${land_array[r][4]}</span></td>
                <td class='premie_koeff'><span class="club_coeff_span"><a class="tabell_link" href="../#" onclick="endre_lands_filter_club(${land_array[r][0]})">${land_array[r][3]}</a></span></td>
              </tr>`
    helTabellHTML += rad;
  }
  table.innerHTML = helTabellHTML;
}

function endre_lands_filter_bidrag(land) {
  localStorage.setItem('kolonne', 'bidrag')
  localStorage.setItem('rekkefølge', 'desc')
  localStorage.setItem('kolonne2', 'ass_coeff_ø')
  localStorage.setItem('rekkefølge2', 'desc')
  endre_lands_filter(land)
}
function endre_lands_filter_prize(land) {
  localStorage.setItem('kolonne', 'prize_money')
  localStorage.setItem('rekkefølge', 'desc')
  localStorage.setItem('kolonne2', 'prize_money_total')
  localStorage.setItem('rekkefølge2', 'desc')
  endre_lands_filter(land)
}
function endre_lands_filter_ass(land) {
  localStorage.setItem('kolonne', 'ass_coeff')
  localStorage.setItem('rekkefølge', 'desc')
  localStorage.setItem('kolonne2', 'ass_coeff_total')
  localStorage.setItem('rekkefølge2', 'desc')
  endre_lands_filter(land)
}
function endre_lands_filter_club(land) {
  localStorage.setItem('kolonne', 'club_coeff')
  localStorage.setItem('rekkefølge', 'desc')
  localStorage.setItem('kolonne2', 'club_coeff_total')
  localStorage.setItem('rekkefølge2', 'desc')
  endre_lands_filter(land)
}

function endre_lands_filter(land) {
  reset()
  if ((!land.innerHTML || land.innerHTML == undefined)) {
    land = 'NIR'
  } else {
    land = (land.innerHTML.slice(58,61))
  }
  let filter_land = [land]
  localStorage.setItem('filter_land', JSON.stringify(filter_land))
  for (r = 0; r < landskoeffisienter.length; r++) {
    document.getElementById(landskoeffisienter[r][0]).style.backgroundColor = '';
    document.getElementById(landskoeffisienter[r][0]).style.border = '';
  }
  document.getElementById(land).style.backgroundColor = 'rgb(196, 217, 255)';
  document.getElementById(land).style.border = '1px solid rgb(164, 164, 164)';
  if (land == 'NIR') {
    document.getElementById('dropDownMeny').innerHTML = '<div class="opp_ned_pil">❮</div><div class="flagg_div"><img class="flagg" id="NIR_" src="media/UEFA/NIR.svg" alt="NIR"></div>'
  } else {
    document.getElementById('dropDownMeny').innerHTML = '<div class="opp_ned_pil">❮</div><div class="flagg_div"><img class="flagg" src="media/UEFA/' + land + '.svg" alt="' + land + '"></div>'
  }
  sorter_etter_sesong()
  localStorage.setItem('spoiler', 'synlig')
  document.getElementById('spoiler').innerHTML = '<div class="spoiler_pil">&#10095</div>'
}


function landsranking_endre_periode() {
  localStorage.setItem('kolonne_landskoeffisient', 'poeng')
  localStorage.setItem('rekkefølge_landskoeffisient', 'desc')
  localStorage.setItem('dropdownmeny_valg_landskoeffisient', (nåværende_sesong_periode_valg[0] - 5 + aarstall) + '/' + (nåværende_sesong_periode_valg[2] - 5 + aarstall) + ' - ' + (nåværende_sesong_periode_valg[0] - 1 + aarstall) + '/' + (nåværende_sesong_periode_valg[2] - 1 + aarstall))
}


$('#spoiler').click(function(){
  if ($('#tabell_overordnet td').is(':visible')) {
    $('#tabell_overordnet td').hide()
    localStorage.setItem('spoiler', 'skjult')
    document.getElementById('spoiler').innerHTML = '<div class="spoiler_pil">&#10094</div>'
  } else {
    $('#tabell_overordnet td').show()
    localStorage.setItem('spoiler', 'synlig')
    document.getElementById('spoiler').innerHTML = '<div class="spoiler_pil">&#10095</div>'
  }
})

if (localStorage.getItem('spoiler') == 'skjult') {
  $('#tabell_overordnet td').hide()
  document.getElementById('spoiler').innerHTML = '<div class="spoiler_pil">&#10094</div>'
}
if (localStorage.getItem('spoiler') == 'synlig' || localStorage.getItem('spoiler') == undefined) {
  $('#tabell_overordnet td').show()
  document.getElementById('spoiler').innerHTML = '<div class="spoiler_pil">&#10095</div>'
}


// function endre_klubbnavn(i, kolonne) {
//   var rows = document.getElementsByTagName("table")[0].rows;
//   var last = rows[i + 1];
//   var cell = last.cells[2];
//   let aarstall = (rows[0].cells[kolonne+1].innerText[0] + rows[0].cells[kolonne+1].innerText[1] - 21)
//   localStorage.setItem('sessong', aarstall)
//   var value = cell.innerText;
//   localStorage.setItem('Klubbnavn', value)
// }