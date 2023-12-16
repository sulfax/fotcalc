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


if (sessionStorage.getItem('kolonne_4_års') == 'undefined') {
  sessionStorage.setItem('kolonne_4_års', 'id_nr')
}
if (sessionStorage.getItem('rekkefølge_4_års') == 'undefined') {
  sessionStorage.setItem('rekkefølge_4_års', 'asc')
}


let aar_etter_forste_periode = "";

let uclMestere = [];
let uclMestereLand = [];
let sammeUclMester = 0;
let VM_antallLand = [];
let plass8 = 7;

oppdater_ved_refresh()
function oppdater_ved_refresh() {
  let filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || []
  ranking_array = []
  testTabell = document.getElementById('minTest')
  try {if (sessionStorage.getItem('dropdownmeny_valg_4aar_koeffisient').length > 10) {
    sessionStorage.setItem('dropdownmeny_valg_4aar_koeffisient', 2000+nåværende_klubbvm[0] + '/' + nåværende_klubbvm[2]);
  }} catch {null;}
  document.getElementById("dropDownMeny").innerHTML = (sessionStorage.getItem('dropdownmeny_valg_4aar_koeffisient') || 2000+nåværende_klubbvm[0] + '/' + nåværende_klubbvm[2]) + " <div class='opp_ned_pil'>&#10094</div>";
  var klubbers_assosiasjon = []
  aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(5,7) - 21;
  let p = 17;
  let pilstatus = ''
  for (i = 0; i < 4; i++) {
    pilstatus = (document.getElementById('sesong' + (i + 1)).innerHTML).slice(5)
    document.getElementById('sesong' + (4 - i)).innerHTML = (p + aar_etter_forste_periode) + '/' + ((p + 1) + aar_etter_forste_periode) + pilstatus
    p += 1;
  }
  document.getElementById('decisive_sesong').innerText = 2000 + p + 1 + aar_etter_forste_periode;
  for (i = 0; i < menyvalg.length; i++) {
    klubbers_assosiasjon.push(menyvalg[i][1])
  }

  let klubber_med_i_ranking_menyvalg = [];
  for (i = 0; i < menyvalg.length; i++) {
    let er_i_periode_menyvalg_aar_1 = (menyvalg[i][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_2 = (menyvalg[i][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_3 = (menyvalg[i][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)])
    let er_i_periode_menyvalg_aar_4 = (menyvalg[i][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)])
    if (er_i_periode_menyvalg_aar_1 != undefined || er_i_periode_menyvalg_aar_2 != undefined || er_i_periode_menyvalg_aar_3 != undefined || er_i_periode_menyvalg_aar_4 != undefined) {
      klubber_med_i_ranking_menyvalg.push(menyvalg[i][0])
    }
  }


  let klubber_allerede_lagt_til = []
  let NA_poeng_og_assosiasjon = regn_ut_NA_poeng()
  if (aar_etter_forste_periode == 3) {
    for (i = 0; i < klubb_koeffisienter_1112_2021.length; i++) {
      if (klubb_koeffisienter_1112_2021[i][11]) {
        let assos_ranking_array = [];
        let klubbnavn = (klubb_koeffisienter_1112_2021[i][0]);
        assos_ranking_array.push(klubbnavn)
        let sesong4 = "";
        let sesong3 = "";
        let sesong2 = "";
        let sesong1 = "";
        // let sesong1 = (klubb_koeffisienter_1112_2021[i][8 + aar_etter_forste_periode] || "");
        let deltattUCL = false;
        for (j = 0; j < UCL_klubb_poeng_20_21.length; j++) {
          if (klubb_koeffisienter_1112_2021[i][0] == UCL_klubb_poeng_20_21[j][0]) {
            deltattUCL = true;
            sesong1 = UCL_klubb_poeng_20_21[j][1];
          }
        }
        let knapper = ""
        let plassering = ""
        if (klubber_med_i_ranking_menyvalg.includes(klubb_koeffisienter_1112_2021[i][0])) {
          for (p = 0; p < menyvalg.length; p++) {
            if (menyvalg[p][0] == klubb_koeffisienter_1112_2021[i][0]) {
              // sesong4 = menyvalg[p][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)]
              // sesong3 = menyvalg[p][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)]
              // sesong2 = menyvalg[p][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)]
              let sesonger = [sesong2,sesong3,sesong4];
              for (let l = 0; l < 3; l++) {
                let knapper_ = ((menyvalg[p][2 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").split(",");
                if (knapper_.includes("b18")) {
                  // Hvis FIFA-modell brukes:
                  // deltattUCL = true;
                  // sesonger[l] = 5;
                  // sesonger[l] += parseInt(((menyvalg[p][4 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)])).split(",")[0] * 3);
                  // sesonger[l] += parseInt(((menyvalg[p][4 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)])).split(",")[3]);
                  // if (knapper_.includes("b21")) {
                  //   let seier_uav = ((menyvalg[p][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").replace(/([^\,]*\,){35}/, '').split(",");
                  //   for (j = 0; j < seier_uav.length; j++) {
                  //     if (seier_uav[j] && [0,3,8,11,17,20,26].includes(j)) {
                  //       if (seier_uav[j] == 3) {
                  //         sesonger[l] += 3;
                  //       }
                  //       if (seier_uav[j] == 2) {
                  //         sesonger[l] += 1
                  //       }
                  //     }
                  //   }
                  // }
                  deltattUCL = true;
                  sesonger[l] = 4;
                  sesonger[l] += parseInt(((menyvalg[p][4 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)])).split(",")[0] * 2);
                  sesonger[l] += parseInt(((menyvalg[p][4 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)])).split(",")[3]);
                  if (knapper_.includes("b21")) {
                    if (["1","2"].includes(menyvalg[p][5 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)].replaceAll(",",""))) {
                      sesonger[l] += 4;
                    }
                    for (j = 0; j < knapper_.length; j++) {
                      if (["b21","b24","b27","b30"].includes(knapper_[j])) {
                        sesonger[l] += 1;
                      }
                    }
                    let seier_uav = ((menyvalg[p][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").replace(/([^\,]*\,){35}/, '').split(",");
                    for (j = 0; j < seier_uav.length; j++) {
                      if (seier_uav[j] && [0,3,8,11,17,20,26].includes(j)) {
                        sesonger[l] += seier_uav[j]-1;
                      }
                    }
                  }
                }
              }
              if (deltattUCL) {
                sesong2 = sesonger[0];
                sesong3 = sesonger[1];
                sesong4 = sesonger[2];
                let poeng = (((sesong4||0)+(sesong3||0)+(sesong2||0)+(sesong1||0)).toFixed(3))
                assos_ranking_array.push(poeng)
                for (j = 0; j < landskoeffisienter.length; j++) {
                  if (landskoeffisienter[j][0] == klubb_koeffisienter_1112_2021[i][1]) {
                    assos_ranking_array.push(NA_poeng_og_assosiasjon[j][0])
                    assos_ranking_array.push(NA_poeng_og_assosiasjon[j][2])
                    assos_ranking_array.push((Math.floor(((NA_poeng_og_assosiasjon[j][1]*1000)/4))/1000).toFixed(3))
                  }
                }
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
        }
      }
    }
  }
  for (i = 0; i < menyvalg.length; i++) {
    if (!klubber_allerede_lagt_til.includes(menyvalg[i][0])) {
      let assos_ranking_array = [];
      assos_ranking_array.push(menyvalg[i][0])
      let sesong4 = "";
      let sesong3 = "";
      let sesong2 = "";
      let sesong1 = "";
      // sesong4 = menyvalg[i][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)] || ""
      // sesong3 = menyvalg[i][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)] || ""
      // sesong2 = menyvalg[i][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)] || ""
      let sesonger = [sesong1,sesong2,sesong3,sesong4];
      let l = 0;
      if (aar_etter_forste_periode > 3) {
        l = -1;
      }
      for (; l < 3; l++) {
        let knapper_ = ((menyvalg[i][2 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").split(",");
        if (knapper_.includes("b18")) {
          // Hvis FIFA-modell brukes:
          // sesonger[l+1] = 5;
          // sesonger[l+1] += parseInt(((menyvalg[i][4 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)])).split(",")[0] * 3);
          // sesonger[l+1] += parseInt(((menyvalg[i][4 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)])).split(",")[3]);
          // if (knapper_.includes("b21")) {
          //   let seier_uav = [];
          //   if (menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)] && (((menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)].split(",").length - 1) >= 35 && aar_etter_forste_periode - 3+l < 3) || ((menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)].split(",").length - 1) >= 39 && aar_etter_forste_periode - 3+l >= 3))) {
          //     if (aar_etter_forste_periode - 3+l < 3) {
          //       seier_uav = ((menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").replace(/([^\,]*\,){35}/, '').split(",");
          //     }
          //     else {
          //       seier_uav = ((menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").replace(/([^\,]*\,){39}/, '').split(",");
          //     }
          //     for (j = 0; j < seier_uav.length; j++) {
          //       if (seier_uav[j] && [0,3,8,11,17,20,26].includes(j)) {
          //         if (seier_uav[j] == 3) {
          //           sesonger[l+1] += 3;
          //         }
          //         if (seier_uav[j] == 2) {
          //           sesonger[l+1] += 1
          //         }
          //       }
          //     }
          //   }
          // }
          sesonger[l+1] = 4;
          sesonger[l+1] += parseInt(((menyvalg[i][4 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)])).split(",")[0] * 2);
          sesonger[l+1] += parseInt(((menyvalg[i][4 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)])).split(",")[3]);
          if (knapper_.includes("b21")) {
            sesonger[l+1] += 1
            if (aar_etter_forste_periode - 3+l < 3) {
              if (["1","2"].includes(menyvalg[i][5 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)].replaceAll(",",""))) {
                sesonger[l+1] += 4;
              }
            }
            else {
              if (((menyvalg[i][5 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").replaceAll(",","") <= 8) {
                sesonger[l+1] += 6;
              }
              else if (((menyvalg[i][5 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").replaceAll(",","") <= 24) {
                sesonger[l+1] += 3;
              }
            }
            for (j = 0; j < knapper_.length; j++) {
              if (["b24","b27","b30"].includes(knapper_[j])) {
                sesonger[l+1] += 1;
              }
            }
            let seier_uav = [];
            if (menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)] && (((menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)].split(",").length - 1) >= 35 && aar_etter_forste_periode - 3+l < 3) || ((menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)].split(",").length - 1) >= 39 && aar_etter_forste_periode - 3+l >= 3))) {
              if (aar_etter_forste_periode - 3+l < 3) {
                seier_uav = ((menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").replace(/([^\,]*\,){35}/, '').split(",");
              }
              else {
                seier_uav = ((menyvalg[i][6 + ((aar_etter_forste_periode - 3+l) * antall_MV_elem)]) || "").replace(/([^\,]*\,){39}/, '').split(",");
              }
              for (j = 0; j < seier_uav.length; j++) {
                if (seier_uav[j] && [0,3,8,11,17,20,26].includes(j)) {
                  sesonger[l+1] += seier_uav[j]-1;
                }
              }
            }
          }
          sesong1 = sesonger[0] || "";
          sesong2 = sesonger[1];
          sesong3 = sesonger[2];
          sesong4 = sesonger[3];
          // if (menyvalg[i][9 + ((aar_etter_forste_periode - 1) * antall_MV_elem)] == 0) {sesong4 = 0}
          // if (menyvalg[i][9 + ((aar_etter_forste_periode - 2) * antall_MV_elem)] == 0) {sesong3 = 0}
          // if (menyvalg[i][9 + ((aar_etter_forste_periode - 3) * antall_MV_elem)] == 0) {sesong2 = 0}
          // if (aar_etter_forste_periode >= 4) {
          //   sesong1 = menyvalg[i][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)] || ""}
          //   if (menyvalg[i][9 + ((aar_etter_forste_periode - 4) * antall_MV_elem)] == 0) {sesong1 = 0}
      
          
            if (sesong1 !== false || sesong2 !== false || sesong3 !== false || sesong4 !== false) {
            assos_ranking_array.push(((sesong4||0)+(sesong3||0)+(sesong2||0)+(sesong1||0)).toFixed(3))
            for (p = 0; p < landskoeffisienter.length; p++) {
              if (landskoeffisienter[p][0] == menyvalg[i][1]) {
                assos_ranking_array.push(NA_poeng_og_assosiasjon[p][0])
                assos_ranking_array.push(NA_poeng_og_assosiasjon[p][2])
                assos_ranking_array.push((Math.floor(((NA_poeng_og_assosiasjon[p][1]*1000)/4))/1000).toFixed(3))
              }
            }
            if (sesong4 !== "" || sesong3 !== "" || sesong2 !== "" || sesong1 !== "") {
              if (sesong4 !== "") {
                sesong4 = sesong4.toFixed(3)}
              if (sesong3 !== "") {
                sesong3 = sesong3.toFixed(3)}
              if (sesong2 !== "") {
                sesong2 = sesong2.toFixed(3)}
              if (sesong1 !== "") {
                sesong1 = sesong1.toFixed(3)}
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
    }
  }
  i = 0
  ranking_array.sort(sortFunction_2);
  i = 3
  ranking_array.sort(sortFunction_tall_2_flere_desimal);
  for (x = 8; x >= 5; x--) {
    ranking_array.sort(sortFunction_tall_1_flere_desimal_nyligste);
  }
  ranking_array.sort(sortFunction_tall_1_flere_desimal_original);
  for (p = 0; p < ranking_array.length; p++) {
    let rangering = p
    ranking_array[p].push(rangering)
    if (p > 0) {
      // Kommenter bort dersom rangeringen skal inkludere alle koeffisientpoeng.
      let poeng_lik = (/*(Math.max(*/ranking_array[p][1]/*, ranking_array[p][4]))*/ == /*(Math.max(*/ranking_array[p-1][1]/*, ranking_array[p-1][4]))*/)
      let kolonne1_lik1 = (ranking_array[p][5] == ranking_array[p-1][5] || (ranking_array[p][5] == "0.0" && ranking_array[p-1][5] == "0.000") || (ranking_array[p][5] == "0.000" && ranking_array[p-1][5] == "0.0"))
      let kolonne1_lik2 = (ranking_array[p][6] == ranking_array[p-1][6] || (ranking_array[p][6] == "0.0" && ranking_array[p-1][6] == "0.000") || (ranking_array[p][6] == "0.000" && ranking_array[p-1][6] == "0.0"))
      let kolonne1_lik3 = (ranking_array[p][7] == ranking_array[p-1][7] || (ranking_array[p][7] == "0.0" && ranking_array[p-1][7] == "0.000") || (ranking_array[p][7] == "0.000" && ranking_array[p-1][7] == "0.0"))
      let kolonne1_lik4 = (ranking_array[p][8] == ranking_array[p-1][8] || (ranking_array[p][8] == "0.0" && ranking_array[p-1][8] == "0.000") || (ranking_array[p][8] == "0.000" && ranking_array[p-1][8] == "0.0"))
      let na_lik = ((ranking_array[p][3] == ranking_array[p-1][3]));
      // let na_større = (Math.max(ranking_array[p][1], ranking_array[p][4])*/ == ranking_array[p][4]) && (Math.max(ranking_array[p-1][1], ranking_array[p-1][4]) == ranking_array[p-1][4]);
      if (((poeng_lik/* && !na_større) || (na_lik && na_større*/)) && kolonne1_lik1 && kolonne1_lik2 && kolonne1_lik3 && kolonne1_lik4) {
        ranking_array[p].splice(9,1,ranking_array[p-1][9])
      }
    }
  }

  uclMestere = [];
  uclMestereLand = [];
  let b = aar_etter_forste_periode-4;
  if (aar_etter_forste_periode == 3) {
    uclMestere.push([ucl_mestere[0][1], ucl_mestere[0][2]])
    uclMestereLand.push([ucl_mestere[0][2], 1])
    b=0;
  }
  sammeUclMester = 0;
  for (b; b < aar_etter_forste_periode; b++) {
    for (i = 0; i < menyvalg.length; i++) {
      if (menyvalg[i][2 + antall_MV_elem*b]) {
        if (menyvalg[i][2 + antall_MV_elem*b].split(',').includes('b33')) {
          let landRegistrert = false;
          let registrer = true;
          for (j = 0; j < uclMestere.length; j++) {
            if (uclMestere[j][0] == menyvalg[i][0]) {
              registrer = false;
            }
          }
          if (registrer) {
            uclMestere.push([menyvalg[i][0], menyvalg[i][1]])
            for (j = 0; j < uclMestereLand.length; j++) {
              if (uclMestereLand[j][0] == menyvalg[i][1]) {
                uclMestereLand[j][1] += 1;
                landRegistrert = true;
              }
            }
            if (!landRegistrert) {
              uclMestereLand.push([menyvalg[i][1], 1])
            }
            break;
          } else {sammeUclMester++;}
        }
      }
      if (i == menyvalg.length-1) {break;}
    }
  }
  let godkjente_klubber = 0;
  VM_antallLand = uclMestereLand.map((item) => item.slice());
  filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
  for (i = 0; i < ranking_array.length; i++) {
    ranking_array[i][10] = [];
    let KjørLøkkeUnder = true;
    for (j = 0; j < uclMestere.length; j++) {
      if (uclMestere[j][0] == ranking_array[i][0]) {
        KjørLøkkeUnder = false;
        ranking_array[i][10].push("uclMester")
      }
    }
    let godkjent = true;
    let kjørLøkkeunder2 = true;
    if (KjørLøkkeUnder) {
      for (j = 0; j < uclMestereLand.length; j++) {
        if (uclMestereLand[j][1] >= 2) {
          if (uclMestereLand[j][0] == ranking_array[i][2]) {
            ranking_array[i][10].push("fraLandMedOver2Mestere")
            kjørLøkkeunder2 = false;
            godkjent = false;
          }
        }
      }
      let landRegistrert = false;
      for (j = 0; j < VM_antallLand.length; j++) {
        if (VM_antallLand[j][0] == ranking_array[i][2]) {
          if (godkjente_klubber < 12-uclMestere.length-sammeUclMester) {
            VM_antallLand[j][1] += 1;
            landRegistrert = true;
          }
          if (VM_antallLand[j][1] >= 2 && !landRegistrert || VM_antallLand[j][1] > 2) {
            if (VM_antallLand[j][0] == ranking_array[i][2] && kjørLøkkeunder2) {
              ranking_array[i][10].push("overstiger_maks_2_grense")
              godkjent = false;
            }
          }
        }
      }
      if (!landRegistrert && godkjente_klubber <  12-uclMestere.length-sammeUclMester) {
        VM_antallLand.push([ranking_array[i][2], 1])
      }
    }
    if (godkjent && godkjente_klubber <= 12-uclMestere.length && KjørLøkkeUnder) {
      if (godkjente_klubber < 12-uclMestere.length) {ranking_array[i][10].push(godkjente_klubber+1)}
      godkjente_klubber++;}
    if (godkjent && godkjente_klubber == 8+sammeUclMester && KjørLøkkeUnder) {
      plass8 = ranking_array[i][9];
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
  for (i = 0; i < ranking_array.length; i++) {
    ranking_array[i][0] = (ranking_array[i][0]).substring(ranking_array[i][0].indexOf(">") + 1);
    if (ranking_array[i][0].includes("</abbr")) {
      ranking_array[i][0] = ranking_array[i][0].split('</abbr')[0]
      ranking_array[i][0] = ranking_array[i][0].split('>')[1]
    }else if (ranking_array[i][0].includes("<")) {ranking_array[i][0] = ranking_array[i][0].split('<')[0]}
  }
  if (column != undefined) {
    sorter(column, order, tekst, ranking_array)
  }
})


function sorter_etter_sesong() {
  let column = sessionStorage.getItem('kolonne_4_års') || 'id_nr'
  let order = sessionStorage.getItem('rekkefølge_4_års') || 'asc'
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
    // endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
  }
  if (column == 'klubb') {
    i = 0
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
  }
  if (column == 'land') {
    i = 2
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
  }
  if (column == 'poeng') {
    i = 1
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    // endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
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
  }
  else if (column == 'sesong1') {
    i = 5
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
  }
  else if (column == 'sesong2') {
    i = 6
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
  }
  else if (column == 'sesong3') {
    i = 7
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong4', opp_ned_pil_midten)
  }
  else if (column == 'sesong4') {
    i = 8
    endre_kolonne_overskrift('id_nr', opp_ned_pil_midten)
    endre_kolonne_overskrift('klubb', opp_ned_pil_midten)
    endre_kolonne_overskrift('land', opp_ned_pil_margin)
    endre_kolonne_overskrift('poeng', opp_ned_pil_midten)
    // endre_kolonne_overskrift('na_poeng', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong1', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong2', opp_ned_pil_midten)
    endre_kolonne_overskrift('sesong3', opp_ned_pil_midten)
  }
  if(order == 'desc') {
    if (column != 'klubb' && column != 'land') {
      tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
      if (column == 'poeng') {
        for (i = 8; i >= 5; i--) {
          ranking_array.sort(sortFunction_tall_1_flere_desimal);
        }
        i = 1;
      }
      if (column == 'na_poeng') {ranking_array.sort(sortFunction_tall_2_flere_desimal);}
      else {ranking_array.sort(sortFunction_tall_1_flere_desimal);}
    }
    else {
      tekst += '<span><img src="media/opp_NEDpil.svg" alt="Sorting arrows"></span>'
      ranking_array.sort(sortFunction_1);
    }
  }
  else {
    if (column != 'klubb' && column != 'land') {
      tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
      if (column == 'poeng') {
        for (i = 8; i >= 5; i--) {
          ranking_array.sort(sortFunction_tall_2_flere_desimal);
        }
        i = 1;
      }
      if (column == 'na_poeng') {ranking_array.sort(sortFunction_tall_1_flere_desimal);}
      else {ranking_array.sort(sortFunction_tall_2_flere_desimal);}
    }
    else {
      tekst += '<span><img src="media/OPPned_pil.svg" alt="Sorting arrows"></span>'
      ranking_array.sort(sortFunction_2);
    }
  }
  for (k = 0; k < ranking_array.length; k++) {
    for (j = 5; j <= 8; j++) {
      if (ranking_array[k][j] == "0.0001") {ranking_array[k][j] = "0.000"}
    }
  }
  sessionStorage.setItem('kolonne_4_års', column)
  sessionStorage.setItem('rekkefølge_4_års', order)
  document.getElementById(column).innerHTML = tekst;
  if (order == 'desc' || column == 'id_nr' || column == 'land' || column == 'klubb') {
    let land_over = 0;
    for (p = 0; p < ranking_array.length; p++) {
      if (ranking_array[p][1] == "" || ranking_array[p][1] == "0.0") {
        land_over += 1;
        if (ranking_array[p][11] || ranking_array[p][11] == 0) {
          ranking_array[p][11] = "";
        } else {
          ranking_array[p].push("");
        }
      }
      else {
        if (ranking_array[p][11] || ranking_array[p][11] == 0) {
          ranking_array[p][11] = p+1-land_over;
        } else {
          ranking_array[p].push(p+1-land_over);
        }
      }
    }
  }
  else {
    filter_land_før = JSON.parse(localStorage.getItem('filter_land')) || [];
    // let land_over = filter_land_før.length
    // if (land_over == 0) {land_over = landskoeffisienter.length}
    for (p = 0; p < ranking_array.length; p++) {
      // if (ranking_array[p][1] == "" || ranking_array[p][1] == "0.0") {
      //   land_over -= 1;
      // }
      if (ranking_array[p][11] || ranking_array[p][11] == 0) {
        ranking_array[p][11] = ranking_array.length-p/*-land_over*/;
      } else {
        ranking_array[p].push(ranking_array.length-p/*-land_over*/);
      }
    }
  }
  if (column == 'sesong1' || column == 'sesong2' || column == 'sesong3' || column == 'sesong4' || column == 'na_poeng' || column == 'poeng') {
    if (order == 'desc') {
      for (p = 0; p < ranking_array.length; p++) {
        if (p > 0) {
          if (ranking_array[p-1][11] == "" && ranking_array[p][1] != "" && ranking_array[p][1] != "0.0") {
            ranking_array[p-1][11] = p;
          }
          let sesong_koeff1 = ranking_array[p-1][i];
          let sesong_koeff2 = ranking_array[p][i];
          if (sesong_koeff1 == "0.000") {sesong_koeff1 = "0.0"}
          if (sesong_koeff2 == "0.000") {sesong_koeff2 = "0.0"}
          if (sesong_koeff1 == sesong_koeff2) {
            ranking_array[p].splice(11,1,ranking_array[p-1][11])
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
            ranking_array[p].splice(11,1,ranking_array[p+1][11])
          }
        }
      }
    }
  }
  byggTabell_test(ranking_array, column, order, uclMestere, uclMestereLand)
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
  if (i >= 5 && i <= 8) {
    if (a[i] == "0.000") {a[i] = 0.0001}
    if (b[i] == "0.000") {b[i] = 0.0001}
  }
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
  // Kommenter bort dersom rangeringen skal inkludere alle koeffisientpoeng.
  let sum_a1 = a[1]
  // let sum_a2 = a[4]
  let sum_a = /*(Math.max(*/sum_a1/*, sum_a2))*/
  let sum_b1 = b[1]
  // let sum_b2 = b[4]
  let sum_b = /*(Math.max(*/sum_b1/*, sum_b2))*/

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
  if (i >= 5 && i <= 8) {
    if (a[i] == "0.000") {a[i] = 0.0001}
    if (b[i] == "0.000") {b[i] = 0.0001}
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
function byggTabell_test(ranking_array, column, order, uclMestere, uclMestereLand) {
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

    if (nåværende_sesong_periode_valg[0]-16 != aar_etter_forste_periode) {
      if (!knapper.includes('b5') && !knapper.includes('b8') && !knapper.includes('b12') && !knapper.includes('b17') && !knapper.includes('KO') && ((!plassering.includes("4") && (!plassering.includes("3") || !knapper.includes('b20')) && nåværende_sesong_periode_valg[0] < 24) || ((String(plassering).replaceAll(',', '')) <= 24 && nåværende_sesong_periode_valg[0] >= 24)) && knapper[0] != '' && (aar_etter_forste_periode + nåværende_sesong_periode_valg[0] != 22)) {
        if (!gjennværende_land.includes(menyvalg[i][1])) {
          gjennværende_land.push(menyvalg[i][1])
        }
      }
    }
  }
  let utenfor_8 = false;
  for (i = 0; i < ranking_array.length; i++) {
    poeng =  ranking_array[i][1];
    na_poeng =  ranking_array[i][4];
    poeng = "<b>" + ranking_array[i][1] + "</b>"
    // Kommenter bort dersom rangeringen skal inkludere alle koeffisientpoeng.
    // if (parseFloat(poeng) > parseFloat(na_poeng)) {
    //   poeng = "<b>" + ranking_array[i][1] + "</b>"
    // }
    // else if (parseFloat(poeng) < parseFloat(na_poeng)){
    //   na_poeng = "<b>" + ranking_array[i][4] + "</b>"
    // }
    // else {
    //   poeng = "<b>" + ranking_array[i][1] + "</b>"
    //   na_poeng = "<b>" + ranking_array[i][4] + "</b>"
    // }
    let sesong4 = ranking_array[i][5]
    let sesong3 = ranking_array[i][6]
    let sesong2 = ranking_array[i][7]
    let sesong1 = ranking_array[i][8]
    if (sesong4 === "0.0") {sesong4 = ''}
    if (sesong3 === "0.0") {sesong3 = ''}
    if (sesong2 === "0.0") {sesong2 = ''}
    if (sesong1 === "0.0") {sesong1 = ''}

    let nummer = i+1;
    if (nummer <= 3) {
      nummer = '<img src="media/kolonnefjerner.png">' + ranking_array[i][11] + '<img src="media/kolonnefjerner.png">';
    }
    else {nummer = ranking_array[i][11]}
    let rangering = `<td class="id_nr utydelig ramme_hoyre_tynn"><b>${ranking_array[i][9] + 1}</b></td>`;
    let klubbnavn_HTML_start = '<td>';
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
            if (gjennværende_land.includes(menyvalg[r][1])) {
              klubbnavn_HTML_start = '<td class="var_med">';
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
              klubbnavn_HTML_start = '<td class="fortsatt_med">';
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
    if (klubbnavn_HTML_start == '<td>') {
      if (aar_etter_forste_periode >= nåværende_sesong_periode_valg[0]-21 && aar_etter_forste_periode < nåværende_sesong_periode_valg[0]-16) {
        if (gjennværende_land.includes(ranking_array[i][2])) {
          klubbnavn_HTML_start = '<td class="var_med">';
        }
      }
    }
    let klubbnavn = ranking_array[i][0]
    let klubbnavn_url = klubbnavn.replace(/\s/g, '')
    if (klubbnavn_url.includes('/')) {
      klubbnavn_url = klubbnavn_url.replace('/','')
    }
    if (i == ranking_array.length - 1) {
      if (klubbnavn_HTML_start == '<td class="fortsatt_med">') {
        klubbnavn_HTML_start = '<td class="fortsatt_med ramme_ikke_grønn">'
      } else if (klubbnavn_HTML_start == '<td class="var_med">') {
        klubbnavn_HTML_start = '<td class="var_med ramme_ikke_grønn">'
      }
    }
    ranking_array[i][0] = '<img class="klubb_logo_4y" loading="lazy" data-sizes="auto" src="media/klubblogo/' + ranking_array[i][2] + "/" + klubbnavn_url + '2.png"' + 
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
    media/klubblogo/` + ranking_array[i][2] + "/" + klubbnavn_url + `8.png 140w">`;

    if (ranking_array[i][10].includes("uclMester")) {ranking_array[i][0] += "<abbr class='abbr_klubb' data_title='Qualified by winning UCL'>" + klubbnavn + "</abbr>"}
    else if (ranking_array[i][10].includes("fraLandMedOver2Mestere")) {ranking_array[i][0] += "<abbr class='abbr_klubb' data_title='Two clubs from country has already qualified'>" + klubbnavn + "</abbr>"}
    else if (ranking_array[i][10].includes("overstiger_maks_2_grense")) {ranking_array[i][0] += "<abbr class='abbr_klubb' data_title='Clubs per country cap reached'>" + klubbnavn + "</abbr>"}
    else {ranking_array[i][0] += klubbnavn}

    let topp8nr = ""
    if (ranking_array[i][10][0] <=  12+uclMestere.length && ranking_array[i][10][0] >= 1) {
      ranking_array[i][0] += "<span class='topp8_nr'>" + ranking_array[i][10][0] + "</span>";
      if (klubbnavn_HTML_start == "<td>") {
        klubbnavn_HTML_start = "<td id='toppåtte" + ranking_array[i][10][0] + "'>";
      }
      else {
        klubbnavn_HTML_start = "<td id='toppåtte" + ranking_array[i][10][0] + "' " + klubbnavn_HTML_start.slice(4);
      }
    }

    if (aar_etter_forste_periode == 3) {
      sesong4 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${6})" class="utydelig_link">${sesong4}</a>`
      sesong3 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${7})" class="utydelig_link">${sesong3}</a>`
      sesong2 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${8})" class="utydelig_link">${sesong2}</a>`}
    else if (aar_etter_forste_periode == 7) {
      sesong1 = `<a href="coefficient-calculator" onclick="endre_klubbnavn(${i},${9})" class="utydelig_link">${sesong1}</a>`}
    let marign_venstre = '<nobr class="marign_venstre">';
    if (i == 0) {marign_venstre = '<nobr id="logo_navn" class="marign_venstre">'}
    var rad_test = `
                    <td class="id_nr veldig_utydelig ramme_hoyre">${nummer}</td>
                    ${rangering}
                    ${klubbnavn_HTML_start + marign_venstre + ranking_array[i][0]}</nobr></td>
                    <td id="tom_kolonne">${klubbnavn}</td>
                    <td class='premie_koeff_3 ramme_hoyre'><div class='senter'><div class='premie_koeff_3 utydelig'>${ranking_array[i][2]}</div></div></td>
                    <td class='premie_koeff_2 ramme_hoyre'><div class='senter'><div class='premie_koeff_2'>${poeng}</div></div></td>
                    
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong4}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong3}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong2}</div></div></td>
                    <td class='premie_koeff mørk_bakgrunn'><div class='senter'><div class='premie_koeff utydelig'>${sesong1}</div></div></td>
                </tr>`
                // <td class='premie_koeff ramme_hoyre'><div class='senter'><div class='premie_koeff'>${na_poeng}</div></div></td>
                let rad_test_klasser = '<tr class="">'
                if (column == "id_nr" && order == "asc" && i < ranking_array.length-1 && ranking_array[i][9] <= plass8 && ranking_array[i+1][9] > plass8 && utenfor_8 == false) {
                  utenfor_8 = true;
                  rad_test_klasser = rad_test_klasser.slice(0, rad_test_klasser.length-2) + "grense " + rad_test_klasser.slice(rad_test_klasser.length-2);
                }
                else if (column == "id_nr" && i < ranking_array.length-1 && ranking_array[i][9] > plass8 && ranking_array[i+1][9] <= plass8 && utenfor_8 == false) {
                  utenfor_8 = true;
                  rad_test_klasser = rad_test_klasser.slice(0, rad_test_klasser.length-2) + "grense " + rad_test_klasser.slice(rad_test_klasser.length-2);
                }
                if (ranking_array[i][10].includes("uclMester")) {
                  rad_test_klasser = rad_test_klasser.slice(0, rad_test_klasser.length-2) + "uclMester " + rad_test_klasser.slice(rad_test_klasser.length-2);
                }
                else if (ranking_array[i][10].includes("fraLandMedOver2Mestere")) {
                  rad_test_klasser = rad_test_klasser.slice(0, rad_test_klasser.length-2) + "fraLandMedOver2Mestere " + rad_test_klasser.slice(rad_test_klasser.length-2);
                }
                else if (ranking_array[i][10].includes("overstiger_maks_2_grense")) {
                  rad_test_klasser = rad_test_klasser.slice(0, rad_test_klasser.length-2) + "overstiger_maks_2_grense " + rad_test_klasser.slice(rad_test_klasser.length-2);
                }
                helTabellHTML += rad_test_klasser += rad_test
  }
  testTabell.innerHTML = helTabellHTML;

  topp8_høyde = [];
  for (i = 1; i <= 8+sammeUclMester; i++) {
    if (document.getElementById('toppåtte' + i)) {topp8_høyde.push(document.getElementById('toppåtte' + i))}
  }
  if (høyest_rad(topp8_høyde) > 40) {
    document.getElementById("logo_navn").innerHTML += "<nobr id='no_select'></nobr>"
    while (høyest_rad(topp8_høyde) > 40) {
      document.getElementById("no_select").innerHTML += "&nbsp";
    }
  }
}
function høyest_rad(topp8_høyde) {
  topp8_høyde_verdi = [];
  for (i = 0; i < topp8_høyde.length; i++) {
    topp8_høyde_verdi.push((topp8_høyde[i]).offsetHeight);
  }
  return Math.max.apply(null, topp8_høyde_verdi);
}

function endre_klubbnavn(i, kolonne) {
  var rows = document.getElementsByTagName("table")[0].rows;
  var last = rows[i + 1];
  var cell = last.cells[2];
  let aarstall = (rows[0].cells[kolonne].innerText[0] + rows[0].cells[kolonne].innerText[1] - 21)
  localStorage.setItem('sessong', aarstall)
  var value = cell.innerHTML;
  if (value.includes('140w">')) {
    value = value.split('w">')[1];
    if (value.includes('<span')) {value = value.split('<span')[0]}
    else if (value.includes('reached">')) {
      value = value.split('reached">')[1];
      value = value.split('</abbr')[0];
    }
    else if (value.includes('lified">')) {
      value = value.split('lified">')[1];
      value = value.split('</abbr')[0];
    }
    else if (value.includes('UCL">')) {
      value = value.split('UCL">')[1];
      value = value.split('</abbr')[0];
    }
    if (value.includes('</nobr>')) {
      value = value.split('</nobr>')[0];
    }
  }
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
i = 4;
while (i <= nyligste_poeng_rangering[0] - 16) {
  let btn = document.createElement("button");
  btn.innerHTML = (2000+19 + i) + '/' + (20 + i);
  if ((2000+19 + i) + '/' + (20 + i) == valg_navn) {
    btn.className = "meny_element valgt_element";}
  else {btn.className = "meny_element";}
  btnid = "valgt" + i;
  btn.id = btnid;
  btn.setAttribute("onclick", "endreMenyTittel(innerHTML,"+id+","+btnid+")");
  document.getElementById("dropdown_elementer").appendChild(btn);
  i += 4
}

function endreMenyTittel(innerHTML,id,btnid) {
  document.querySelector('.valgt_element').classList.remove("valgt_element");
  document.getElementById(btnid.id).classList.add("valgt_element");
  document.getElementById("dropDownMeny").innerHTML = innerHTML + "<div class='opp_ned_pil'>&#10094</div>";
  toggleMeny();
  sessionStorage.setItem('dropdownmeny_valg_4aar_koeffisient', innerHTML)
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
  
  
    var koeff_sesong2 = 0;
    var koeff_sesong3 = 0;
    var koeff_sesong4 = 0;
    var koeff_sesong5 = 0;
    let antall_klubber2 = indeks_klubb.length;
    let antall_klubber3 = indeks_klubb.length;
    let antall_klubber4 = indeks_klubb.length;
    let antall_klubber5 = indeks_klubb.length;
    for (p = 0; p < indeks_klubb.length; p++) {
      if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode)))+2-antall_MV_elem] == undefined) {
        antall_klubber2 -= 1
      } else {
        koeff_sesong2 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode) * antall_MV_elem)) , aar_etter_forste_periode - 1) || 0;
      }
    }
    koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0
    for (p = 0; p < indeks_klubb.length; p++) {
      if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 1)))+2-antall_MV_elem] == undefined) {
        antall_klubber3 -= 1
      } else {
        koeff_sesong3 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 1) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 1) * antall_MV_elem)) , aar_etter_forste_periode - 2) || 0;
      }
    }
    koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0
    for (p = 0; p < indeks_klubb.length; p++) {
      if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 2)))+2-antall_MV_elem] == undefined) {
        antall_klubber4 -= 1
      } else {
        koeff_sesong4 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 2) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 2) * antall_MV_elem)) , aar_etter_forste_periode - 3) || 0;
      }
    }
    koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0
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
    if (landskoeffisienter[i][0] == 'RUS') {
      if (aar_etter_forste_periode == 3) {
        koeff_sesong3 = 4.333
        koeff_sesong2 = 4.333
      }
    }
    //Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng.
    // if (['NOR'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 += 1.666}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 += 1.666}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 += 1.666}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 += 1.666}}
    // if (['UKR','SRB','SCO','AUT','NED'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 0.8}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 0.8}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 0.8}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 0.8}}
    // if (['POR','FRA'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 1.333}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 1.333}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 1.333}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 1.333}}
    // if (['ENG'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2}}
    // if (['GER','ITA'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2.285}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2.285}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2.285}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2.285}}
    // if (['ESP'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2.5}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2.5}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2.5}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2.5}}
    assos_ranking_array.push(landskoeffisienter[i][0])
    assos_ranking_array.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2).toFixed(3))
    assos_ranking_array.push(koeff_sesong2.toFixed(3))
    assos_ranking_array.push(koeff_sesong3.toFixed(3))
    assos_ranking_array.push(koeff_sesong4.toFixed(3))
    assos_ranking_array.push(koeff_sesong5.toFixed(3))
  
    ranking_array_2.push(assos_ranking_array)
  }
  for (p = 5; p > 1; p--) {
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
  let aar_etter_forste_periode = document.getElementById("dropDownMeny").innerText.slice(5,7) - 21;
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
  

  
    var koeff_sesong2 = 0;
    var koeff_sesong3 = 0;
    var koeff_sesong4 = 0;
    var koeff_sesong5 = 0;
    let antall_klubber2 = indeks_klubb.length;
    let antall_klubber3 = indeks_klubb.length;
    let antall_klubber4 = indeks_klubb.length;
    let antall_klubber5 = indeks_klubb.length;  
    for (p = 0; p < indeks_klubb.length; p++) {
      if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode)))+2-antall_MV_elem] == undefined) {
        antall_klubber2 -= 1
      }
      else {
        koeff_sesong2 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode) * antall_MV_elem)) , aar_etter_forste_periode - 1) || 0;
      }
    }
    koeff_sesong2 = Math.floor(koeff_sesong2 * 1000/antall_klubber2) / 1000 || 0
    for (p = 0; p < indeks_klubb.length; p++) {
      if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 1)))+2-antall_MV_elem] == undefined) {
        antall_klubber3 -= 1
      }
      else {
        koeff_sesong3 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 1) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 1) * antall_MV_elem)) , aar_etter_forste_periode - 2) || 0;
      }
    }
    koeff_sesong3 = Math.floor(koeff_sesong3 * 1000/antall_klubber3) / 1000 || 0
    for (p = 0; p < indeks_klubb.length; p++) {
      if (menyvalg[(indeks_klubb[p])][(antall_MV_elem * ((aar_etter_forste_periode - 2)))+2-antall_MV_elem] == undefined) {
        antall_klubber4 -= 1
      }
      else {
        koeff_sesong4 += regnUtAssosKoeff(menyvalg[(indeks_klubb[p])].slice(+2-antall_MV_elem + ((aar_etter_forste_periode - 2) * antall_MV_elem), 7-antall_MV_elem + ((aar_etter_forste_periode - 2) * antall_MV_elem)) , aar_etter_forste_periode - 3) || 0;
      }
    }
    koeff_sesong4 = Math.floor(koeff_sesong4 * 1000/antall_klubber4) / 1000 || 0
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


    if (landskoeffisienter[i][0] == 'RUS') {
      if (aar_etter_forste_periode == 3) {
        koeff_sesong3 = 4.333
        koeff_sesong2 = 4.333
      }
    }

    //Brukes dersom land har internt oppgjør og er garantert koeffisientpoeng.
    // if (['NOR'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 += 1.666}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 += 1.666}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 += 1.666}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 += 1.666}}
    // if (['UKR','SRB','SCO','AUT','NED'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 0.8}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 0.8}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 0.8}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 0.8}}
    // if (['POR','FRA'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 1.333}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 1.333}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 1.333}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 1.333}}
    // if (['ENG'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2}}
    // if (['GER','ITA'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2.285}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2.285}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2.285}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2.285}}
    // if (['ESP'].includes(landskoeffisienter[i][0])) {
    //   if (aar_etter_forste_periode == 3) {koeff_sesong2 = 2.5}
    //   if (aar_etter_forste_periode == 4) {koeff_sesong3 = 2.5}
    //   if (aar_etter_forste_periode == 5) {koeff_sesong4 = 2.5}
    //   if (aar_etter_forste_periode == 6) {koeff_sesong5 = 2.5}}
    
    let denne_NA_poeng_og_assos = []

    denne_NA_poeng_og_assos.push(landskoeffisienter[i][0])
    denne_NA_poeng_og_assos.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2).toFixed(3))
    // Kanskje fjern
    denne_NA_poeng_og_assos_skygge.push(landskoeffisienter[i][0])
    denne_NA_poeng_og_assos_skygge.push((koeff_sesong5 + koeff_sesong4 + koeff_sesong3 + koeff_sesong2).toFixed(3))
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong2)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong3)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong4)
    denne_NA_poeng_og_assos_skygge.push(koeff_sesong5)
    // -------------------
    NA_poeng_og_assosiasjon.push(denne_NA_poeng_og_assos)
    // Kanskje fjern
    denne_NA_poeng_og_assos_skygge2.push(denne_NA_poeng_og_assos_skygge)
    // -------------------
    
  }
  // Kanskje fjern
  for (i = 5; i >= 1; i--) {
    denne_NA_poeng_og_assos_skygge2.sort(sortFunction_tall_1_flere_desimal);
  }

  for (i = 0; i < denne_NA_poeng_og_assos_skygge2.length; i++) {
    denne_NA_poeng_og_assos_skygge2[i].push(i+1);
    if (i > 0) {
      let poeng_lik = (denne_NA_poeng_og_assos_skygge2[i][1] == denne_NA_poeng_og_assos_skygge2[i-1][1])
      let kolonne1_lik = (denne_NA_poeng_og_assos_skygge2[i][2] == denne_NA_poeng_og_assos_skygge2[i-1][2])
      let kolonne2_lik = (denne_NA_poeng_og_assos_skygge2[i][3] == denne_NA_poeng_og_assos_skygge2[i-1][3])
      let kolonne3_lik = (denne_NA_poeng_og_assos_skygge2[i][4] == denne_NA_poeng_og_assos_skygge2[i-1][4])
      let kolonne4_lik = (denne_NA_poeng_og_assos_skygge2[i][5] == denne_NA_poeng_og_assos_skygge2[i-1][5])
      if (poeng_lik && kolonne1_lik && kolonne2_lik && kolonne3_lik && kolonne4_lik) {
        denne_NA_poeng_og_assos_skygge2[i].splice(6,1,denne_NA_poeng_og_assos_skygge2[i-1][6])
      }
    }
    for (p = 0; p < NA_poeng_og_assosiasjon.length; p++) {
      if (NA_poeng_og_assosiasjon[p][0] == denne_NA_poeng_og_assos_skygge2[i][0])
      
      NA_poeng_og_assosiasjon[p].push(denne_NA_poeng_og_assos_skygge2[i][6]);
    }
  }
  // -------------------
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
  "name": "How many coefficient points has earned in 2023/24?",
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
