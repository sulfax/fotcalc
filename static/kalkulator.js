(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

var antall_MV_elem = 6;

/*Variabler som skal brukes i utregninger under*/
/*21/22 variabler til utregning av noen summer*/
var UCL_total_mengde_2122 = 2002000000;
var UEL_total_mengde_2122 = 465000000; 
var UECL_total_mengde_2122 = 235000000;
var UCL_utslåtte_lagene_PO_2122 = 30000000;
// var UCL_deltagelsespenger_2122 = UCL_total_mengde_2122 * 0.25;
// var UEL_deltagelsespenger_2122 = UEL_total_mengde_2122 * 0.25;
// var UECL_deltagelsespenger_2122 = UECL_total_mengde_2122 * 0.40;
var UCL_antall_deltakere_2122 = 32;
var UEL_antall_deltakere_2122 = 32;
var UECL_antall_deltakere_2122 = 32;
var Spilt_SCUP_total_2122 = 7000000;
/*Premiepenger ved ulike situasjoner uavhengig av turnering*/
/*21/22 knapper*/

var Hjemlig_seriemester_2122 = 260000;
var Spilt_Pre_Q_eller_PO_2122 = 100000;
var UECL_Slått_ut_Q1_2122 = 150000;
var UECL_Slått_ut_Q2_2122 = 350000;
var UECL_Slått_ut_Q3_2122 = 550000;
var Spilt_Q3_league_path_2122 = "";
var UCL_utslått_lag_PO_2122 = UCL_utslåtte_lagene_PO_2122 / 6;
var UECL_Slått_ut_PO_2122 = 750000;
var UCL_deltaker_gruppespillet_2122 = 15640000;
var UEL_deltaker_gruppespillet_2122 = 3630000;
var UECL_deltaker_gruppespillet_2122 = 2940000;
var UCL_spilt_åttendedelsfinale_2122 = 9600000;
var UEL_spilt_åttendedelsfinale_2122 = 1200000;
var UECL_spilt_åttendedelsfinale_2122 = 600000;
var UCL_spilt_kvartfinale_2122 = 10600000;
var UEL_spilt_kvartfinale_2122 = 1800000;
var UECL_spilt_kvartfinale_2122 = 1000000;
var UCL_spilt_semifinale_2122 = 12500000;
var UEL_spilt_semifinale_2122 = 2800000;
var UECL_spilt_semifinale_2122 = 2000000;
var UCL_spilt_finale_2122 = 15500000;
var UEL_spilt_finale_2122 = 4600000;
var UECL_spilt_finale_2122 = 3000000;
var UCL_vinner_2122 = 4500000;
var UEL_vinner_2122 = 4000000;
var UECL_vinner_2122 = 2000000;
var Spilt_SCUP_2122 = Spilt_SCUP_total_2122 / 2;
var Vunnet_SCUP_2122 = 1000000;


/*21/22 input felt*/
var UCL_ti_års_kr_2122 = 1137000;
var UEL_ti_års_kr_2122 = 132000;
var UECL_ti_års_kr_2122 = 44500;
var UCL_seier_2122 = 2800000;
var UEL_seier_2122 = 630000;
var UECL_seier_2122 = 500000;
var UCL_uavgjort_2122 = 930000;
var UEL_uavgjort_2122 = 210000;
var UECL_uavgjort_2122 = 166000;
var påfyll_ingen_funksjon_2122 = 0;
var UEL_førsteplass_2122 = 1100000;
var UECL_førsteplass_2122 = 650000;
var UEL_andreplass_2122 = 550000; 
var UECL_andreplass_2122 = 325000;
var UEL_spilt_utslagsrunde_PO_2122 = 500000;
var UECL_spilt_utslagsrunde_PO_2122 = 300000;



const knapp_summer = [
    [Hjemlig_seriemester_2122,          Hjemlig_seriemester_2122,          Hjemlig_seriemester_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [UECL_Slått_ut_Q1_2122,             UECL_Slått_ut_Q1_2122,             UECL_Slått_ut_Q1_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [UECL_Slått_ut_Q2_2122,             UECL_Slått_ut_Q2_2122,             UECL_Slått_ut_Q2_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [UECL_Slått_ut_Q3_2122,             UECL_Slått_ut_Q3_2122,             UECL_Slått_ut_Q3_2122],
    [Spilt_Q3_league_path_2122,         Spilt_Q3_league_path_2122,         Spilt_Q3_league_path_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122,         Spilt_Pre_Q_eller_PO_2122],
    [UCL_utslått_lag_PO_2122,           UCL_utslått_lag_PO_2122,           UCL_utslått_lag_PO_2122],
    [UECL_Slått_ut_PO_2122,             UECL_Slått_ut_PO_2122,             UECL_Slått_ut_PO_2122],
    [UCL_deltaker_gruppespillet_2122,   UCL_deltaker_gruppespillet_2122,   UCL_deltaker_gruppespillet_2122],
    [UEL_deltaker_gruppespillet_2122,   UEL_deltaker_gruppespillet_2122,   UEL_deltaker_gruppespillet_2122],
    [UECL_deltaker_gruppespillet_2122,  UECL_deltaker_gruppespillet_2122,  UECL_deltaker_gruppespillet_2122],
    [UCL_spilt_åttendedelsfinale_2122,  UCL_spilt_åttendedelsfinale_2122,  UCL_spilt_åttendedelsfinale_2122],
    [UEL_spilt_åttendedelsfinale_2122,  UEL_spilt_åttendedelsfinale_2122,  UEL_spilt_åttendedelsfinale_2122],
    [UECL_spilt_åttendedelsfinale_2122, UECL_spilt_åttendedelsfinale_2122, UECL_spilt_åttendedelsfinale_2122],
    [UCL_spilt_kvartfinale_2122,        UCL_spilt_kvartfinale_2122,        UCL_spilt_kvartfinale_2122],
    [UEL_spilt_kvartfinale_2122,        UEL_spilt_kvartfinale_2122,        UEL_spilt_kvartfinale_2122],
    [UECL_spilt_kvartfinale_2122,       UECL_spilt_kvartfinale_2122,       UECL_spilt_kvartfinale_2122],
    [UCL_spilt_semifinale_2122,         UCL_spilt_semifinale_2122,         UCL_spilt_semifinale_2122],
    [UEL_spilt_semifinale_2122,         UEL_spilt_semifinale_2122,         UEL_spilt_semifinale_2122],
    [UECL_spilt_semifinale_2122,        UECL_spilt_semifinale_2122,        UECL_spilt_semifinale_2122],
    [UCL_spilt_finale_2122,             UCL_spilt_finale_2122,             UCL_spilt_finale_2122],
    [UEL_spilt_finale_2122,             UEL_spilt_finale_2122,             UEL_spilt_finale_2122],
    [UECL_spilt_finale_2122,            UECL_spilt_finale_2122,            UECL_spilt_finale_2122],
    [UCL_vinner_2122,                   UCL_vinner_2122,                   UCL_vinner_2122],
    [UEL_vinner_2122,                   UEL_vinner_2122,                   UEL_vinner_2122],
    [UECL_vinner_2122,                  UECL_vinner_2122,                  UECL_vinner_2122],
    [Spilt_SCUP_2122,                   Spilt_SCUP_2122,                   Spilt_SCUP_2122],
    [Vunnet_SCUP_2122,                  Vunnet_SCUP_2122,                  Vunnet_SCUP_2122]
];

const input_summer = [
    [UCL_ti_års_kr_2122,                UCL_ti_års_kr_2122,                UCL_ti_års_kr_2122],
    [UEL_ti_års_kr_2122,                UEL_ti_års_kr_2122,                UEL_ti_års_kr_2122],
    [UECL_ti_års_kr_2122,               UECL_ti_års_kr_2122,               UECL_ti_års_kr_2122],
    [UCL_seier_2122,                    UCL_seier_2122,                    UCL_seier_2122],
    [UEL_seier_2122,                    UEL_seier_2122,                    UEL_seier_2122],
    [UECL_seier_2122,                   UECL_seier_2122,                   UECL_seier_2122],
    [UCL_uavgjort_2122,                 UCL_uavgjort_2122,                 UCL_uavgjort_2122],
    [UEL_uavgjort_2122,                 UEL_uavgjort_2122,                 UEL_uavgjort_2122],
    [UECL_uavgjort_2122,                UECL_uavgjort_2122,                UECL_uavgjort_2122],
    [UCL_uavgjort_2122,                 UCL_uavgjort_2122,                 UCL_uavgjort_2122],
    [UEL_uavgjort_2122,                 UEL_uavgjort_2122,                 UEL_uavgjort_2122],
    [UECL_uavgjort_2122,                UECL_uavgjort_2122,                UECL_uavgjort_2122],
    [påfyll_ingen_funksjon_2122,        påfyll_ingen_funksjon_2122,        påfyll_ingen_funksjon_2122],
    [UEL_førsteplass_2122,              UEL_førsteplass_2122,              UEL_førsteplass_2122],
    [UECL_førsteplass_2122,             UECL_førsteplass_2122,             UECL_førsteplass_2122],
    [UEL_andreplass_2122,               UEL_andreplass_2122,               UEL_andreplass_2122],
    [UECL_andreplass_2122,              UECL_andreplass_2122,              UECL_andreplass_2122],
    [UEL_spilt_utslagsrunde_PO_2122,    UEL_spilt_utslagsrunde_PO_2122,    UEL_spilt_utslagsrunde_PO_2122],
    [UECL_spilt_utslagsrunde_PO_2122,   UECL_spilt_utslagsrunde_PO_2122,   UECL_spilt_utslagsrunde_PO_2122]
];
var eksperimentell_profil_e = "Calculate from scratch";
var eksperimentell_profil_n = "Kalkuler fra bunnen";
var din_klubbs_premi_koef_e = "your club's coefficient points";
var din_klubbs_premi_koef_n = "din klubbs koeffisientpoeng";

const UCL_inntjening_celler = ["b2_", "b3_", "b6_", "b9_", "b13_", "b16_", "b21_", "b24_", "b27_", "b30_", "b33_", "i4_", "i7_", "mp1"]; /*Ikke i1, i2, i3, i10, i11 og i12 fordi de verdiene hentes fra de "ikke avrundede" listene*/
const UEL_inntjening_celler = ["b10_", "b14_", "b22_", "b25_", "b28_", "b31_", "b34_", "i5_", "i8_", "i14_", "i14__", "mp2"];
const UECL_inntjening_celler = ["b4_", "b5_", "b7_", "b8_", "b11_", "b12_", "b15_", "b17_", "b23_", "b26_", "b29_", "b32_", "b35_", "i6_", "i9_", "i15_", "i15__", "mp3"];
const seriemester_inntjening_celler = ["b1_", "b36_", "b36_hoyre", "b37_", "b37_hoyre"];

const UECL_fjerning_av_summer_ved_deltagelse = ["b1_", "b5_", "b8_", "b12_", "b17_"];
var UCL_ikke_avrundet = [0,0,0]
var UEL_ikke_avrundet = [0,0,0]
var UECL_ikke_avrundet = [0,0,0]

var ja_språk = "Yes";
var nei_språk = "No";
var spilt_språk = "Played"
let eliminert_språk = "Eliminated"


for (let p = 1; p < 16; p++) {
    document.getElementById("i" + p).style.borderColor = "#ced4da";
};

var aarstall = parseInt(((localStorage.getItem('sessong'))) || nåværende_sesong_forside[0] - 21);
if (aarstall == 'NaN' || (!aarstall && aarstall != 0)) {
    aarstall = nåværende_sesong_forside[0] - 21;
}
localStorage.setItem('sessong', aarstall);
if (aarstall > 2) {
    location.href = '/prize-money-calculator-post-24';
}

if (aarstall == 0) {
    document.getElementById('sessong_kontroller_1').disabled = true;
    // document.getElementById('sessong_kontroller_2').disabled = false;
}
else {
    document.getElementById('sessong_kontroller_1').disabled = false;
    document.getElementById('sessong_kontroller_2').disabled = false;
}

oppdater_sessong(aarstall)


oppdater_ved_refresh_1()
function paa_av(clicked_id){
    if (((clicked_id == "b6" && document.getElementById('b1')) || (clicked_id == "b-1" && document.getElementById('b-6'))) || clicked_id == "b13" || ((clicked_id == "CLPO" && document.getElementById('b1')) || (clicked_id == "b-1" && document.getElementById('CL-PO'))) || clicked_id == "b18") {
        if ((localStorage.getItem('Klubbnavn') != eksperimentell_profil_e && localStorage.getItem('Klubbnavn') != eksperimentell_profil_n && localStorage.getItem('Klubbnavn') != null && localStorage.getItem('Klubbnavn') != "Choose club" && localStorage.getItem('Klubbnavn') != "Velg klubb")) {
            for (i=0;i<menyvalg.length;i++) {
                if (menyvalg[i][0] == localStorage.getItem('Klubbnavn')) {
                    if (!menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)]) {}
                    else if (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][0] != 0 && menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][0]) {
                        document.getElementById("mp1").innerText = "€ " + (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    }
                    else if (!menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][0] && menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][0] != "0") {
                        document.getElementById("mp1").innerText = "€ ?";
                    }
                    else {document.getElementById("mp1").innerText = "€ 0";}
                }
            }
        }
        else {
            document.getElementById("mp1").innerText = "€ ?";
        }
    }
    if (clicked_id == "b19") {
        if ((localStorage.getItem('Klubbnavn') != eksperimentell_profil_e && localStorage.getItem('Klubbnavn') != eksperimentell_profil_n && localStorage.getItem('Klubbnavn') != null && localStorage.getItem('Klubbnavn') != "Choose club" && localStorage.getItem('Klubbnavn') != "Velg klubb")) {
            for (i=0;i<menyvalg.length;i++) {
                if (menyvalg[i][0] == localStorage.getItem('Klubbnavn')) {
                    if (!menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)]) {}
                    else if (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][1] != 0 && menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][1]) {
                        document.getElementById("mp2").innerText = "€ " + (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    }
                    else if (!menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][1]) {
                        document.getElementById("mp2").innerText = "€ ?";
                    }
                    else {document.getElementById("mp2").innerText = "";}
                }
            }
        }
        else {
            document.getElementById("mp2").innerText = "€ ?";
        }
    }
    if (clicked_id == "b20") {
        if ((localStorage.getItem('Klubbnavn') != eksperimentell_profil_e && localStorage.getItem('Klubbnavn') != eksperimentell_profil_n && localStorage.getItem('Klubbnavn') != null && localStorage.getItem('Klubbnavn') != "Choose club" && localStorage.getItem('Klubbnavn') != "Velg klubb")) {
            for (i=0;i<menyvalg.length;i++) {
                if (menyvalg[i][0] == localStorage.getItem('Klubbnavn')) {
                    if (!menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)]) {}
                    else if (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2] != 0 && menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2]) {
                        document.getElementById("mp3").innerText = "€ " + (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    }
                    else if (!menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2]) {
                        document.getElementById("mp3").innerText = "€ ?";
                    }
                    else {document.getElementById("mp3").innerText = "";}
                }
            }
        }
        else {
            document.getElementById("mp3").innerText = "€ ?";
        }
    }
    if (clicked_id == 'b1' && (document.getElementById("b-6") || document.getElementById("CL-PO")) && document.getElementById("b13") && document.getElementById("b18")) {
        document.getElementById('mp1').innerText = "";
    }
    if (clicked_id == 'CLPO') {
        document.getElementById("b1_").innerText = "";
        document.getElementById("b2_").innerText = "";
        document.getElementById("b3_").innerText = "";
        document.getElementById("b6_").innerText = "";
        document.getElementById("b9_").innerText = "";
        if ((document.getElementById('overskrift_premiepenger').innerText).includes('Prize')) {
            document.getElementById(clicked_id).innerText = 'Played';
        } else {document.getElementById(clicked_id).innerText = 'Spilt';}
        document.getElementById(clicked_id).id = 'CL-PO'
        summer();
    }
    else if (clicked_id == 'CL-PO') {
        if ((document.getElementById("b6") || (document.getElementById("b-6") && document.getElementById("b-1"))) && document.getElementById("b13") && document.getElementById("b18")) {
            document.getElementById('mp1').innerText = "";
        }
        document.getElementById(clicked_id).innerText = "";
        document.getElementById(clicked_id).id = 'CLPO'
        if (!document.getElementById("b-18")) {
            oppdater_b2_b3_b6_b9();
        }
        if (!document.getElementById("b-9") && !document.getElementById("b-13") && !document.getElementById("b-14") && !document.getElementById("b-18") && !document.getElementById("b-19") && !document.getElementById("b-20")) {
            oppdater_b1();
        }
        summer();
    }
    else {
        var nummer = parseInt(clicked_id.substr(1, clicked_id.length));
        const tall = -nummer;
        if (nummer > 0)  {
            if (nummer == 2 || nummer == 3 || nummer == 4 || nummer == 6 || nummer == 7 || nummer == 9 || nummer == 10 || nummer == 11 || nummer == 13 || nummer == 14 || nummer == 15 || nummer == 36 || (nummer >= 21 && nummer <= 32)) {
                document.getElementById(clicked_id).innerText = (spilt_språk || "");
            }
            else if (nummer == 5 || nummer == 8 || nummer == 12 || nummer == 17) {
                document.getElementById(clicked_id).innerText = (eliminert_språk || "");
            }
            else {
                document.getElementById(clicked_id).innerText = (ja_språk || "");
            }
            document.getElementById(clicked_id).id = "b" + tall;
            var aktuell_sum = (knapp_summer[nummer - 1][aarstall]);
            if (clicked_id == "b1") {
                if ((document.getElementById("b9")) && (document.getElementById("b13")) && (document.getElementById("b14")) && (document.getElementById("b18")) && (document.getElementById("b19")) && (document.getElementById("b20")) && (!document.getElementById("CL-PO"))) {
                    document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    summer();
                    rund_av_enkeltcelle(aktuell_sum, clicked_id);
                }
                else if ((document.getElementById("b-9")) || (document.getElementById("b-13")) || (document.getElementById("b-14")) || (document.getElementById("b-18")) || (document.getElementById("b-19")) || (document.getElementById("b-20"))) {
                    summer();
                }
            }
            else if (clicked_id == "b2" || clicked_id == "b3" || clicked_id == "b6" || clicked_id == "b9" || clicked_id == "b10" ||  clicked_id == "b14") {
                if (clicked_id == "b9" || clicked_id == "b14") {
                    document.getElementById("b1_").innerText = "";
                }
                if ((document.getElementById("b16")) && (document.getElementById("b18")) && (document.getElementById("b19") || clicked_id != "b14") && (!document.getElementById("CL-PO"))) {
                    document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    summer();
                    rund_av_enkeltcelle(aktuell_sum, clicked_id);
                }
                else if (clicked_id == 'b10' && ((document.getElementById("b-18") && document.getElementById("b19")) || document.getElementById("CL-PO"))) {
                    document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    summer();
                    rund_av_enkeltcelle(aktuell_sum, clicked_id);
                }
                else if (clicked_id == "b14" && (document.getElementById("b19"))) {
                    document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    summer();
                    rund_av_enkeltcelle(aktuell_sum, clicked_id);
                }
                else if ((document.getElementById("b-13")) || (document.getElementById("b-16")) || (document.getElementById("b-18")) || (document.getElementById("b-19"))) {
                    summer();
                }
            }
            else {
                if (clicked_id == "b16" || clicked_id == "b18") {
                    document.getElementById("b2_").innerText = "";
                    document.getElementById("b3_").innerText = "";
                    document.getElementById("b6_").innerText = "";
                    document.getElementById("b9_").innerText = "";
                }
                else if (clicked_id == "b19") {
                    document.getElementById("b14_").innerText = "";
                }
                if (clicked_id == "b13" || clicked_id == "b18" || clicked_id == "b19" || clicked_id == "b20") {
                    if (nummer == 18) {
                        UCL_ikke_avrundet[0] = aktuell_sum;
                    }
                    if (nummer == 19) {
                        UEL_ikke_avrundet[0] = aktuell_sum;
                    }
                    if (nummer == 20) {
                        UECL_ikke_avrundet[0] = aktuell_sum;
                    }
                    document.getElementById("b1_").innerText = "";
                }
                if (clicked_id == "b13") {
                    summer();
                }
                else {
                    document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    summer();
                    rund_av_enkeltcelle(aktuell_sum, clicked_id);
                }
            }
            flytt_SCUP_sum_hoyre(clicked_id)
        }
        else {
            if ((clicked_id == "b-9" && document.getElementById("b13") && document.getElementById("b14") && document.getElementById("b18") && document.getElementById("b19") && document.getElementById("b20") && document.getElementById("CLPO"))
             || (clicked_id == "b-13" && document.getElementById("b9") && document.getElementById("b14") && document.getElementById("b18") && document.getElementById("b19") && document.getElementById("b20") && document.getElementById("CLPO"))
             || (clicked_id == "b-14" && document.getElementById("b9") && document.getElementById("b13") && document.getElementById("b18") && document.getElementById("b19") && document.getElementById("b20") && document.getElementById("CLPO"))
             || (clicked_id == "b-18" && document.getElementById("b9") && document.getElementById("b13") && document.getElementById("b14") && document.getElementById("b19") && document.getElementById("b20") && document.getElementById("CLPO"))
             || (clicked_id == "b-19" && document.getElementById("b9") && document.getElementById("b13") && document.getElementById("b14") && document.getElementById("b18") && document.getElementById("b20") && document.getElementById("CLPO"))
             || (clicked_id == "b-20" && document.getElementById("b9") && document.getElementById("b13") && document.getElementById("b14") && document.getElementById("b18") && document.getElementById("b19") && document.getElementById("CLPO"))) {
                oppdater_b1();
            }
            if ((clicked_id == "b-16" /*&& document.getElementById("b13")*/ && document.getElementById("b18") /*&& document.getElementById("b19")*/ && document.getElementById("CLPO")) || (clicked_id == "b-18" && document.getElementById("b16") /*&& document.getElementById("b19")*/ && document.getElementById("CLPO")) || (clicked_id == "b-19" && document.getElementById("b18") && document.getElementById("b13") && document.getElementById("b16") && document.getElementById("CLPO"))) {
                oppdater_b2_b3_b6_b9();
            }
            if ((clicked_id == "b-19")) {
                oppdater_b10_b14();
            }
            if (nummer == -18) {
                UCL_ikke_avrundet[0] = 0;
            }
            if (nummer == -19) {
                UEL_ikke_avrundet[0] = 0;
            }
            if (nummer == -20) {
                UECL_ikke_avrundet[0] = 0;
            }
            if (clicked_id == 'b-36') {
                document.getElementById('b36_').innerText = '';
                document.getElementById('b36_hoyre').innerText = '';
            }
            if (clicked_id == 'b-37') {
                document.getElementById('b37_').innerText = '';
                document.getElementById('b37_hoyre').innerText = '';
            }
            document.getElementById(clicked_id).innerText = "" /*nei_språk*/;
            document.getElementById(clicked_id).id = "b" + tall;
            document.getElementById("b" + tall + "_").innerText = "";
            flytt_SCUP_sum_venstre(clicked_id, tall)
            if ((document.getElementById("b6") || (document.getElementById("b-6") && document.getElementById("b-1"))) && document.getElementById("b13") && (document.getElementById("CLPO") || (document.getElementById("CL-PO") && document.getElementById("b-1"))) && document.getElementById("b18")) {
                document.getElementById('mp1').innerText = "";
            }
            if (document.getElementById("b19") && document.getElementById('i13').value != 3) {
                document.getElementById('mp2').innerText = "";
            }
            if (document.getElementById("b20") && document.getElementById('i14').value != 3) {
                document.getElementById('mp3').innerText = "";
            }
            summer();
        }
    }
};

function flytt_SCUP_sum_hoyre(clicked_id) {
    let UEL_celle_1 = (document.getElementById(UEL_inntjening_celler[0]).innerText)
    let UEL_celle_2 = (document.getElementById(UEL_inntjening_celler[1]).innerText)
    let UEL_celle_21 = (document.getElementById('b19_').innerText)
    let UEL_celle_22 = (document.getElementById('i2_').innerText)
    let UEL_celle_23 = (document.getElementById('i11_').innerText)
    let UEL_celle_3 = (document.getElementById(UEL_inntjening_celler[2]).innerText)
    let UEL_celle_4 = (document.getElementById(UEL_inntjening_celler[3]).innerText)
    let UEL_celle_5 = (document.getElementById(UEL_inntjening_celler[4]).innerText)
    let UEL_celle_6 = (document.getElementById(UEL_inntjening_celler[5]).innerText)
    let UEL_celle_7 = (document.getElementById(UEL_inntjening_celler[6]).innerText)
    let UEL_celle_8 = (document.getElementById(UEL_inntjening_celler[7]).innerText)
    let UEL_celle_9 = (document.getElementById(UEL_inntjening_celler[8]).innerText)
    let UEL_celle_10 = (document.getElementById(UEL_inntjening_celler[9]).innerText)
    let UEL_celle_11 = (document.getElementById(UEL_inntjening_celler[10]).innerText)
    if (UEL_celle_1 != '' || UEL_celle_2 != '' || UEL_celle_3 != '' || UEL_celle_4 != '' || UEL_celle_5 != '' || UEL_celle_6 != '' || UEL_celle_7 != '' || UEL_celle_8 != '' || UEL_celle_9 != '' || UEL_celle_10 != '' || UEL_celle_11 != '' || UEL_celle_21 != '' || UEL_celle_22 != '' || UEL_celle_23 != '' || document.getElementById('i14').value == 3 || document.getElementById('i14').value == 4) {
        if (UEL_inntjening_celler.includes(clicked_id + '_') || clicked_id == 'b36' || clicked_id == 'b37' ||  UEL_celle_21 != '' ||  UEL_celle_22 != '' || UEL_celle_23 != '') {
            if (document.getElementById('b36_').innerText != '') {
                document.getElementById('b36_hoyre').innerText = document.getElementById('b36_').innerText
            }
            if (document.getElementById('b37_').innerText != '') {
                document.getElementById('b37_hoyre').innerText = document.getElementById('b37_').innerText
            }
            document.getElementById('b36_').innerText = '';
            document.getElementById('b37_').innerText = '';
        }
    }
}
function flytt_SCUP_sum_venstre(clicked_id) {
    let UEL_celle_1 = (document.getElementById(UEL_inntjening_celler[0]).innerText)
    let UEL_celle_2 = (document.getElementById(UEL_inntjening_celler[1]).innerText)
    let UEL_celle_21 = (document.getElementById('b19_').innerText)
    let UEL_celle_22 = (document.getElementById('i2_').innerText)
    let UEL_celle_23 = (document.getElementById('i11_').innerText)
    let UEL_celle_3 = (document.getElementById(UEL_inntjening_celler[2]).innerText)
    let UEL_celle_4 = (document.getElementById(UEL_inntjening_celler[3]).innerText)
    let UEL_celle_5 = (document.getElementById(UEL_inntjening_celler[4]).innerText)
    let UEL_celle_6 = (document.getElementById(UEL_inntjening_celler[5]).innerText)
    let UEL_celle_7 = (document.getElementById(UEL_inntjening_celler[6]).innerText)
    let UEL_celle_8 = (document.getElementById(UEL_inntjening_celler[7]).innerText)
    let UEL_celle_9 = (document.getElementById(UEL_inntjening_celler[8]).innerText)
    let UEL_celle_10 = (document.getElementById(UEL_inntjening_celler[9]).innerText)
    let UEL_celle_11 = (document.getElementById(UEL_inntjening_celler[10]).innerText)
    if (UEL_celle_1 == '' && UEL_celle_2 == '' && UEL_celle_3 == '' && UEL_celle_4 == '' && UEL_celle_5 == '' && UEL_celle_6 == '' && UEL_celle_7 == '' && UEL_celle_8 == '' && UEL_celle_9 == '' && UEL_celle_10 == '' && UEL_celle_11 == '' && UEL_celle_21 == '' && UEL_celle_22 == '' && UEL_celle_23 == '' && document.getElementById('i14').value != 3 && document.getElementById('i14').value != 4) {
        if (document.getElementById('b36_hoyre').innerText != '') {
            document.getElementById('b36_').innerText = document.getElementById('b36_hoyre').innerText
        }
        if (document.getElementById('b37_hoyre').innerText != '') {
            document.getElementById('b37_').innerText = document.getElementById('b37_hoyre').innerText
        }
        document.getElementById('b36_hoyre').innerText = '';
        document.getElementById('b37_hoyre').innerText = '';
    }
}
function oppdater_b1() {
    if (document.getElementById("b-1")) {
        var aktuell_sum = (knapp_summer[0][aarstall]);
        document.getElementById("b1_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
};
function oppdater_b2_b3_b6_b9() {
    if (document.getElementById("b-2")) {
        var aktuell_sum = (knapp_summer[1][aarstall]);
        document.getElementById("b2_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    if (document.getElementById("b-3")) {
        var aktuell_sum = (knapp_summer[2][aarstall]);
        document.getElementById("b3_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    if (document.getElementById("b-6")) {
        var aktuell_sum = (knapp_summer[5][aarstall]);
        document.getElementById("b6_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    if (document.getElementById("b-9")) {
        var aktuell_sum = (knapp_summer[8][aarstall]);
        document.getElementById("b9_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
};
function oppdater_b10_b14() {
    if (document.getElementById("b-10")) {
        var aktuell_sum = (knapp_summer[9][aarstall]);
        document.getElementById("b10_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    if (document.getElementById("b-14")) {
        var aktuell_sum = (knapp_summer[13][aarstall]);
        document.getElementById("b14_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
};
function forlat_input_felt_1(clicked_id, lagre_endring) {
    const antall_deltakere = [
        UCL_antall_deltakere_2122,
        UEL_antall_deltakere_2122,
        UECL_antall_deltakere_2122
    ];
    var nummer_2 = parseInt(clicked_id.substr(1, clicked_id.length));
    var input_felt_verdi = document.getElementById(clicked_id).value;
    document.getElementById(clicked_id + "_").innerText = "";
    document.getElementById(clicked_id).style.borderColor = "";
    document.getElementById(clicked_id).style.backgroundColor = "";
    document.getElementById(clicked_id).style.color = "";
    document.getElementById(clicked_id).className = "form-control ikke_placeholder";
    if (document.getElementById(clicked_id).value != "") {
        if (input_felt_verdi >= 1 && input_felt_verdi <= antall_deltakere[nummer_2 - 1] && input_felt_verdi % 1 == 0) {
            var deltakere_i_turnering = antall_deltakere[nummer_2 - 1];
            var aktuell_sum = ((deltakere_i_turnering + 1 - input_felt_verdi) * input_summer[nummer_2 - 1][aarstall]);
            document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            if (nummer_2 == 1) {
                UCL_ikke_avrundet[1] = aktuell_sum;
            }
            if (nummer_2 == 2) {
                UEL_ikke_avrundet[1] = aktuell_sum;
            }
            if (nummer_2 == 3) {
                UECL_ikke_avrundet[1] = aktuell_sum;
            }
            summer();
            rund_av_enkeltcelle(aktuell_sum, clicked_id);
            flytt_SCUP_sum_hoyre(clicked_id)
        }
        else {
            if (nummer_2 == 1) {UCL_ikke_avrundet[1] = 0;}
            if (nummer_2 == 2) {UEL_ikke_avrundet[1] = 0;}
            if (nummer_2 == 3) {UECL_ikke_avrundet[1] = 0;}
            utenfor_gyldig_input(clicked_id);
            summer();
            flytt_SCUP_sum_venstre(clicked_id)
        }
    }
    else {
        if (nummer_2 == 1) {UCL_ikke_avrundet[1] = 0;}
        if (nummer_2 == 2) {UEL_ikke_avrundet[1] = 0;}
        if (nummer_2 == 3) {UECL_ikke_avrundet[1] = 0;}
        document.getElementById(clicked_id).style.borderColor = "#ced4da";
        summer();
        flytt_SCUP_sum_venstre(clicked_id)
    }
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == null || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb") && lagre_endring != "nei") {
        lagre_trykking_input_1()
    }
};
function forlat_input_felt_2(clicked_id, lagre_endring) {
    var nummer = parseInt(clicked_id.substr(1, clicked_id.length));
    var nummer_2 = parseInt(clicked_id.substr(1, clicked_id.length));
    var input_felt_verdi = document.getElementById(clicked_id).value;
    var innenfor_1_6 = (input_felt_verdi >= 0) && (input_felt_verdi <= 6);
    document.getElementById(clicked_id + "_").innerText = "";
    document.getElementById(clicked_id).style.borderColor = "";
    document.getElementById(clicked_id).style.backgroundColor = "";
    document.getElementById(clicked_id).style.color = "";
    document.getElementById(clicked_id).className = "form-control ikke_placeholder";
    if (nummer >= 4 && nummer <= 6 && document.getElementById(clicked_id).value != "") {
        let hjelp = (parseInt(document.getElementById("i" + (nummer_2 + 3)).value)) || 0;
        let hjelp_ikke_avrundet = (document.getElementById("i" + (nummer_2 + 3)).value) || 0;
        let sammen_innenfor_1_6 = (parseInt(input_felt_verdi) + hjelp >= 0 && ((parseInt(input_felt_verdi)) + hjelp <= 6));
        if (hjelp < 0) {
            hjelp = 0
        }
        else if (hjelp > 6) {
            hjelp = 6
        }
        if (((sammen_innenfor_1_6 || hjelp_ikke_avrundet < 0) && innenfor_1_6 && input_felt_verdi % 1 == 0) || (hjelp_ikke_avrundet % 1 != 0 && innenfor_1_6 && input_felt_verdi % 1 == 0)) {
            var aktuell_sum = (input_felt_verdi * input_summer[nummer_2 - 1][aarstall]);
            document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            summer();
            rund_av_enkeltcelle(aktuell_sum, clicked_id);
            flytt_SCUP_sum_hoyre(clicked_id)
        }
        else if (input_felt_verdi > 6 || input_felt_verdi < 0 || input_felt_verdi % 1 != 0) {
            utenfor_gyldig_input(clicked_id);
            summer();
            flytt_SCUP_sum_venstre(clicked_id)
        }
        else {
            utenfor_gyldig_input(clicked_id);
            utenfor_gyldig_input("i" + (nummer_2 + 3));
            summer();
            flytt_SCUP_sum_venstre(clicked_id)
        }
    }
    else if (nummer >= 7 && nummer <= 9 && document.getElementById(clicked_id).value != ""){
        let hjelp = (parseInt(document.getElementById("i" + (nummer_2 - 3)).value)) || 0;
        let hjelp_ikke_avrundet = (document.getElementById("i" + (nummer_2 - 3)).value) || 0;
        let sammen_innenfor_1_6 = (parseInt(input_felt_verdi) + hjelp >= 0 && ((parseInt(input_felt_verdi)) + hjelp <= 6));
        if (hjelp < 0) {
            hjelp = 0
        }
        else if (hjelp > 6) {
            hjelp = 6
        }
        if (((sammen_innenfor_1_6 || hjelp_ikke_avrundet < 0) && innenfor_1_6 && input_felt_verdi % 1 == 0) || (hjelp_ikke_avrundet % 1 != 0 && innenfor_1_6 && input_felt_verdi % 1 == 0)) {
            var aktuell_sum = (input_felt_verdi * input_summer[nummer_2 - 1][aarstall]);
            document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            summer();
            rund_av_enkeltcelle(aktuell_sum, clicked_id); 
            flytt_SCUP_sum_hoyre(clicked_id)
        }
        else if (input_felt_verdi > 6 || input_felt_verdi < 0 || input_felt_verdi % 1 != 0) {
            utenfor_gyldig_input(clicked_id);
            summer();
            flytt_SCUP_sum_venstre(clicked_id)
        }
        else {
            utenfor_gyldig_input(clicked_id);
            utenfor_gyldig_input("i" + (nummer_2 - 3));
            summer();
            flytt_SCUP_sum_venstre(clicked_id)
        }
    }
    else {
        document.getElementById(clicked_id).style.borderColor = "#ced4da";
        summer();
        flytt_SCUP_sum_venstre(clicked_id)
    }
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == null || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb") && lagre_endring != "nei") {
        lagre_trykking_input_2()
    }
};
function forlat_input_felt_3(clicked_id, lagre_endring) {
    var nummer_2 = parseInt(clicked_id.substr(1, clicked_id.length));
    document.getElementById(clicked_id + "_").innerText = "";
    document.getElementById(clicked_id).style.borderColor = "";
    document.getElementById(clicked_id).style.backgroundColor = "";
    document.getElementById(clicked_id).style.color = "";
    document.getElementById(clicked_id).className = "form-control ikke_placeholder";
    var totalt_antall_uavgjorte_kamper = document.getElementById(clicked_id).value;
    if (document.getElementById(clicked_id).value != "") {
        var antall_uavgjorte_kamper = parseInt(document.getElementById("i" + (nummer_2 - 3)).value);
        if (!antall_uavgjorte_kamper && antall_uavgjorte_kamper != 0) {antall_uavgjorte_kamper = 0}
        if ((totalt_antall_uavgjorte_kamper >= (antall_uavgjorte_kamper)) && ((totalt_antall_uavgjorte_kamper <= (96 - (6 - (antall_uavgjorte_kamper)) || 96))) && totalt_antall_uavgjorte_kamper % 1 == 0) {
            var totale_ufordelte_ressurser = (totalt_antall_uavgjorte_kamper * input_summer[nummer_2 - 4][aarstall]);
            var totalt_antall_kamper_med_vinner = (96 - document.getElementById(clicked_id).value);
            var antall_seiere = (document.getElementById("i" + (nummer_2 - 6)).value) || 0;
            var aktuell_sum = ((antall_seiere/totalt_antall_kamper_med_vinner)*totale_ufordelte_ressurser);
            let antall_seiere_er_desimal = (document.getElementById("i" + (nummer_2 - 6)).value % 1 == 0) || 0;
            if (antall_seiere_er_desimal && aktuell_sum >= 0) {
                document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                if (nummer_2 == 10) {UCL_ikke_avrundet[2] = aktuell_sum;}
                if (nummer_2 == 11) {UEL_ikke_avrundet[2] = aktuell_sum;}
                if (nummer_2 == 12) {UECL_ikke_avrundet[2] = aktuell_sum;}
                summer();
                rund_av_enkeltcelle(aktuell_sum, clicked_id);
                flytt_SCUP_sum_hoyre(clicked_id)
            }
        }
        else {
            if (nummer_2 == 10) {UCL_ikke_avrundet[2] = 0;}
            if (nummer_2 == 11) {UEL_ikke_avrundet[2] = 0;}
            if (nummer_2 == 12) {UECL_ikke_avrundet[2] = 0;}
            utenfor_gyldig_input(clicked_id);
            summer();
            flytt_SCUP_sum_venstre(clicked_id)
        }
    }
    else {
        if (nummer_2 == 10) {UCL_ikke_avrundet[2] = 0;}
        if (nummer_2 == 11) {UEL_ikke_avrundet[2] = 0;}
        if (nummer_2 == 12) {UECL_ikke_avrundet[2] = 0;}
        document.getElementById(clicked_id).style.borderColor = "#ced4da";
        summer();
        flytt_SCUP_sum_venstre(clicked_id)
    }
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == null || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb") && lagre_endring != "nei") {
        lagre_trykking_input_3()
    }
};
function forlat_input_felt_4(clicked_id, lagre_endring) {
    if (clicked_id == 'i13' && document.getElementById('i13').value != '3' && document.getElementById('b19')) {
        document.getElementById('mp2').innerText = '';
    }
    if (clicked_id == 'i14' && document.getElementById('i14').value != '3' && document.getElementById('b20')) {
        document.getElementById('mp3').innerText = '';
    }
    var nummer_2 = parseInt(clicked_id.substr(1, clicked_id.length));
    var tabellplassering = (document.getElementById(clicked_id).value);
    try {
        document.getElementById(clicked_id + "_").innerText = "";
    }
    catch {
        null;
    }
    document.getElementById(clicked_id).style.borderColor = "";
    document.getElementById(clicked_id).style.backgroundColor = "";
    document.getElementById(clicked_id).style.color = "";
    document.getElementById(clicked_id).className = "form-control ikke_placeholder";
    if (document.getElementById(clicked_id).value != "") {
        if ((tabellplassering >= 1) && (tabellplassering <= 4) && tabellplassering % 1 == 0) {
            if (tabellplassering == 1) {
                var aktuell_sum = input_summer[nummer_2 - 1][aarstall];
                if ((clicked_id == 'i14') || (clicked_id == 'i15')) {
                    document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                }
                if ((document.getElementById('i14').value != 3) && (document.getElementById('i15').value != 2)) {
                    document.getElementById('i15__').innerText = "";
                }
                if ((document.getElementById('i14').value != 2) && (document.getElementById('i13').value != 3)) {
                    document.getElementById('i14__').innerText = "";
                }
                if ((clicked_id == 'i14') || (clicked_id == 'i15')) {
                    summer();
                    rund_av_enkeltcelle(aktuell_sum, clicked_id);
                    flytt_SCUP_sum_hoyre(clicked_id)
                }
            }
            else if (tabellplassering == 2) {
                aktuell_sum = input_summer[nummer_2 + 1][aarstall];
                if ((document.getElementById('i14').value != 3) && (document.getElementById('i15').value != 2)) {
                    document.getElementById('i15__').innerText = "";
                }
                if ((document.getElementById('i14').value != 2) && (document.getElementById('i13').value != 3)) {
                    document.getElementById('i14__').innerText = "";
                }
                if ((clicked_id == 'i14') || (clicked_id == 'i15')) {
                    document.getElementById(clicked_id + "_").innerText = "€ " + aktuell_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    spilt_uslagsrunde_PO = input_summer[nummer_2 + 3][aarstall];
                    document.getElementById(clicked_id + "__").innerText = "€ " + spilt_uslagsrunde_PO.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                }
                if ((clicked_id == 'i14') || (clicked_id == 'i15')) {
                    summer();
                    rund_av_enkeltcelle(aktuell_sum, clicked_id);
                    clicked_id = ("i" + (nummer_2) + "_");
                    rund_av_enkeltcelle_2(spilt_uslagsrunde_PO, clicked_id);
                    flytt_SCUP_sum_hoyre(clicked_id)
                }
            }
            else if (tabellplassering == 3) {
                if (clicked_id != 'i15') {
                    spilt_uslagsrunde_PO = input_summer[nummer_2 + 4][aarstall];
                }
                if ((clicked_id == 'i14') || (clicked_id == 'i15')) {
                    document.getElementById((clicked_id) + "_").innerText = "";
                }
                if ((clicked_id == 'i14') && (document.getElementById('i13').value != 3))  {
                    document.getElementById('i14__').innerText = "";
                }
                if ((document.getElementById('i14').value != 3) && (document.getElementById('i15').value != 2)) {
                    document.getElementById('i15__').innerText = "";
                }
                if ((clicked_id == 'i13') || (clicked_id == 'i14')) {
                    document.getElementById('i' + (nummer_2 + 1) + "__").innerText = "€ " + spilt_uslagsrunde_PO.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                }
                if (clicked_id == 'i13') {
                    if ((localStorage.getItem('Klubbnavn') != eksperimentell_profil_e && localStorage.getItem('Klubbnavn') != eksperimentell_profil_n && localStorage.getItem('Klubbnavn') != null && localStorage.getItem('Klubbnavn') != "Choose club" && localStorage.getItem('Klubbnavn') != "Velg klubb")) {
                        for (i=0;i<menyvalg.length;i++) {
                            if (menyvalg[i][0] == localStorage.getItem('Klubbnavn')) {
                                if (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2] != 0 && menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2]) {
                                    document.getElementById("mp2").innerText = "€ " + (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                                }
                                else if (document.getElementById('i13').value == '3') {document.getElementById("mp2").innerText = "€ ?";}
                                else {document.getElementById("mp2").innerText = "";}
                            }
                        }
                    }
                    else {
                        document.getElementById("mp2").innerText = "€ ?";
                    }
                    
                }
                else if (clicked_id == 'i14') {
                    if ((localStorage.getItem('Klubbnavn') != eksperimentell_profil_e && localStorage.getItem('Klubbnavn') != eksperimentell_profil_n && localStorage.getItem('Klubbnavn') != null && localStorage.getItem('Klubbnavn') != "Choose club" && localStorage.getItem('Klubbnavn') != "Velg klubb")) {
                        for (i=0;i<menyvalg.length;i++) {
                            if (menyvalg[i][0] == localStorage.getItem('Klubbnavn')) {
                                if (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2] != 0 && menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2]) {
                                    document.getElementById("mp3").innerText = "€ " + (menyvalg[i][7 + (localStorage.getItem('sessong')*antall_MV_elem)][2]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                                }
                                else if (document.getElementById('i14').value == '3') {document.getElementById("mp3").innerText = "€ ?";}
                                else {document.getElementById("mp3").innerText = "";}
                            }
                        }
                    }
                    else {
                        document.getElementById("mp3").innerText = "€ ?";
                    }
                }
                summer();
                if ((clicked_id == 'i13') || (clicked_id == 'i14')) {
                    rund_av_enkeltcelle_3(spilt_uslagsrunde_PO, nummer_2);
                    flytt_SCUP_sum_hoyre(clicked_id)
                }
            }
            else {
                if ((document.getElementById('i14').value != 3) && (document.getElementById('i15').value != 2)) {
                    document.getElementById('i15__').innerText = "";
                }
                if ((document.getElementById('i14').value != 2) && (document.getElementById('i13').value != 3)) {
                    document.getElementById('i14__').innerText = "";
                }
                summer();
                flytt_SCUP_sum_hoyre(clicked_id)
            }
        }
        else {
            if ((document.getElementById('i14').value != 2) && (document.getElementById('i13').value != 3)) {
                document.getElementById('i14__').innerText = "";
            }
            if ((document.getElementById('i14').value != 3) && (document.getElementById('i15').value != 2)) {
                document.getElementById('i15__').innerText = "";
            }
            utenfor_gyldig_input(clicked_id);
            summer();
            flytt_SCUP_sum_venstre(clicked_id)
        }
    }
    else {
        if ((document.getElementById('i14').value != 2) && (document.getElementById('i13').value != 3)) {
            document.getElementById('i14__').innerText = "";
        }
        if ((document.getElementById('i14').value != 3) && (document.getElementById('i15').value != 2)) {
            document.getElementById('i15__').innerText = "";
        }
        document.getElementById(clicked_id).style.borderColor = "#ced4da";
        summer();
        flytt_SCUP_sum_venstre(clicked_id)
    }
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == null || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb") && lagre_endring != "nei") {
        lagre_trykking_input_4()
    }
};
function utenfor_gyldig_input(clicked_id) {
    document.getElementById(clicked_id).style.backgroundColor = 'red';
    document.getElementById(clicked_id).style.borderColor = 'red';
    document.getElementById(clicked_id).style.color = 'white';
    document.getElementById(clicked_id).className = "form-control placeholder";
    if ((clicked_id == 'i14') || (clicked_id == 'i15')) {
        document.getElementById(clicked_id + "_").innerText = "";
    }
};


function gjennomfør_1_gang_per_knapp(clicked_id) {
    forlat_input_felt_2(clicked_id);
    var id_nummer = parseInt(clicked_id.substr(1, clicked_id.length));
    if (id_nummer <= 6) {
        forlat_input_felt_2("i" + (id_nummer + 3));
        forlat_input_felt_3("i" + (id_nummer + 6));
    }
    if (id_nummer >= 7) {
        forlat_input_felt_2("i" + (id_nummer - 3));
        forlat_input_felt_3("i" + (id_nummer + 3));
    }
}

function summer() {
    var UCL_antall_summer = parseInt(UCL_inntjening_celler.length);
    var UEL_antall_summer = parseInt(UEL_inntjening_celler.length);
    var UECL_antall_summer = parseInt(UECL_inntjening_celler.length);
    var seriemester_antall_summer = parseInt(seriemester_inntjening_celler.length);
    var UCL_total_sum = 0;
    var UEL_total_sum = 0;
    var UECL_total_sum = 0;
    var seriemester_total_sum = 0;
    for (x=0;x<UCL_antall_summer;x++) {
        var UCL_enkeltsum = ((document.getElementById(UCL_inntjening_celler[x]).innerText).substr(2, (document.getElementById(UCL_inntjening_celler[x]).innerText).length));
        UCL_total_sum += parseFloat(UCL_enkeltsum.split(' ').join('')) || 0;
    }
    for (x=0;x<UEL_antall_summer;x++) {
        var UEL_enkeltsum = ((document.getElementById(UEL_inntjening_celler[x]).innerText).substr(2, (document.getElementById(UEL_inntjening_celler[x]).innerText).length));
        UEL_total_sum += parseFloat(UEL_enkeltsum.split(' ').join('')) || 0;
    }
    for (x=0;x<UECL_antall_summer;x++) {
        var UECL_enkeltsum = ((document.getElementById(UECL_inntjening_celler[x]).innerText).substr(2, (document.getElementById(UECL_inntjening_celler[x]).innerText).length));
        UECL_total_sum += parseFloat(UECL_enkeltsum.split(' ').join('')) || 0;
    }
    for (x=0;x<seriemester_antall_summer;x++) {
        var UECL_enkeltsum = ((document.getElementById(seriemester_inntjening_celler[x]).innerText).substr(2, (document.getElementById(seriemester_inntjening_celler[x]).innerText).length));
        seriemester_total_sum += parseFloat(UECL_enkeltsum.split(' ').join('')) || 0;
    }

    var UCL_faktisk_total_sum = parseFloat(UCL_total_sum) + UCL_ikke_avrundet[0] + UCL_ikke_avrundet[1] + UCL_ikke_avrundet[2];
    var UEL_faktisk_total_sum = parseFloat(UEL_total_sum) + UEL_ikke_avrundet[0] + UEL_ikke_avrundet[1] + UEL_ikke_avrundet[2];
    var UECL_faktisk_total_sum = parseFloat(UECL_total_sum) + UECL_ikke_avrundet[0] + UECL_ikke_avrundet[1] + UECL_ikke_avrundet[2];
    var total_sum = (UCL_faktisk_total_sum + UEL_faktisk_total_sum + UECL_faktisk_total_sum + seriemester_total_sum);

    var avrundet_UCL_total = Number((UCL_faktisk_total_sum).toFixed(0));
    document.getElementById("UCL_inntjening").innerHTML = "<nobr>€ " + (avrundet_UCL_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</nobr>';
    
    var avrundet_UEL_total = Number((UEL_faktisk_total_sum).toFixed(0));
    document.getElementById("UEL_inntjening").innerHTML = "<nobr>€ " + (avrundet_UEL_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</nobr>';
    
    var avrundet_UECL_total = Number((UECL_faktisk_total_sum).toFixed(0));
    document.getElementById("UECL_inntjening").innerHTML = "<nobr>€ " + (avrundet_UECL_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</nobr>';
    
    var avrundet_total = Number((total_sum).toFixed(0));
    document.getElementById("total_inntjening").innerHTML = "<nobr>€ " + (avrundet_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</nobr>';
};

function rund_av_enkeltcelle(aktuell_sum, clicked_id) {
    var avrundet = Number((aktuell_sum).toFixed(0));
    document.getElementById(clicked_id + "_").innerText = "€ " + avrundet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

function rund_av_enkeltcelle_2(spilt_uslagsrunde_PO, clicked_id) {
    var avrundet_2 = Number((spilt_uslagsrunde_PO).toFixed(0));
    document.getElementById(clicked_id + "_").innerText = "€ " + avrundet_2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
function rund_av_enkeltcelle_3(spilt_uslagsrunde_PO, nummer_2) {
    var avrundet_2 = Number((spilt_uslagsrunde_PO || 0).toFixed(0));
    document.getElementById('i' + (nummer_2 + 1) + "__").innerText = "€ " + avrundet_2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};


function videre_fordeling(clicked_id) {
    paa_av(clicked_id);
    if(localStorage.getItem('Klubbnavn')){
    }else{
        lagre_trykking();
    }
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e) || (localStorage.getItem('Klubbnavn') == eksperimentell_profil_n) || (localStorage.getItem('Klubbnavn') == "") || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb") {
        lagre_trykking();
    }
}

function lagre_trykking() {
    var lagrede_verdier = [];
    if (document.getElementById('CL-PO')) {
        lagrede_verdier.push('CLPO');
    }
    for (var l=0;l<37;l++) {
        if (document.getElementById('b-' + (l + 1))) {
            lagrede_verdier.push('b' + (l + 1));
        }
    }
    let Klubbnavn = (localStorage.getItem('Klubbnavn'))
    if (Klubbnavn == "Calculate from scratch" || Klubbnavn == "Kalkuler fra bunnen" || Klubbnavn == "Velg klubb" || Klubbnavn == "Choose club") {
        if (((document.getElementById('dropDownMeny').innerHTML).includes('Calculate from scratch')) || ((document.getElementById('dropDownMeny').innerHTML).includes('Kalkuler fra bunnen')) || ((document.getElementById('dropDownMeny').innerHTML).includes('Velg klubb')) || ((document.getElementById('dropDownMeny').innerHTML).includes('Choose club'))) {
            localStorage.setItem('Hallo', lagrede_verdier);
        }
    }
};
function lagre_trykking_input_1() {
    var lagrede_verdier_input_id_1 = [];
    var lagrede_verdier_input_1 = [];
    for (var f=0;f<3;f++) {
        lagrede_verdier_input_id_1.push('i' + (f + 1));
        var verdi = document.getElementById('i' + (f + 1)).value;
        lagrede_verdier_input_1.push(verdi);
    }
    localStorage.setItem('Hallo_input_id_1', lagrede_verdier_input_id_1);
    localStorage.setItem('Hallo_input_verdi_1', lagrede_verdier_input_1);
};
function lagre_trykking_input_2() {
    var lagrede_verdier_input_id_2 = [];
    var lagrede_verdier_input_2 = [];
    for (var f=3;f<9;f++) {
        lagrede_verdier_input_id_2.push('i' + (f + 1));
        var verdi = document.getElementById('i' + (f + 1)).value;
        lagrede_verdier_input_2.push(verdi);
    }
    localStorage.setItem('Hallo_input_id_2', lagrede_verdier_input_id_2);
    localStorage.setItem('Hallo_input_verdi_2', lagrede_verdier_input_2);
};
function lagre_trykking_input_3() {
    var lagrede_verdier_input_id_3 = [];
    var lagrede_verdier_input_3 = [];
    for (var y=9;y<12;y++) {
        lagrede_verdier_input_id_3.push('i' + (y + 1));
        var verdi = document.getElementById('i' + (y + 1)).value;
        lagrede_verdier_input_3.push(verdi);
    }
    localStorage.setItem('Hallo_input_id_3', lagrede_verdier_input_id_3);
    localStorage.setItem('Hallo_input_verdi_3', lagrede_verdier_input_3);
};
function lagre_trykking_input_4() {
    var lagrede_verdier_input_id_4 = [];
    var lagrede_verdier_input_4 = [];
    for (var z=12;z<15;z++) {
        lagrede_verdier_input_id_4.push('i' + (z + 1));
        var verdi = document.getElementById('i' + (z + 1)).value;
        lagrede_verdier_input_4.push(verdi);
    }
    localStorage.setItem('Hallo_input_id_4', lagrede_verdier_input_id_4);
    localStorage.setItem('Hallo_input_verdi_4', lagrede_verdier_input_4);
};

function slett(slett_lagring) {
    for (var c=0;c<37;c++) {
        if (document.getElementById('b-' + (c + 1))) {
            paa_av('b-' + (c + 1));
        }
    }
    if (document.getElementById('CL-PO')) {
        paa_av('CL-PO');
    }
    for (var ce=0;ce<3;ce++) {
        document.getElementById('i' + (ce + 1)).value = "";
        forlat_input_felt_1('i' + (ce + 1), slett_lagring);
    }
    for (var ce=3;ce<9;ce++) {
        document.getElementById('i' + (ce + 1)).value = "";
        forlat_input_felt_2('i' + (ce + 1), slett_lagring);
    }
    for (var ce=9;ce<12;ce++) {
        document.getElementById('i' + (ce + 1)).value = "";
        forlat_input_felt_3('i' + (ce + 1), slett_lagring);
    }
    for (var ce=12;ce<15;ce++) {
        document.getElementById('i' + (ce + 1)).value = "";
        forlat_input_felt_4('i' + (ce + 1), slett_lagring);
    }
    if (slett_lagring != "nei" && (localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb")) {
        localStorage.setItem('Hallo', null);
        localStorage.setItem('Hallo_input_id_1', "");
        localStorage.setItem('Hallo_input_verdi_1', "");
        localStorage.setItem('Hallo_input_id_2', "");
        localStorage.setItem('Hallo_input_verdi_2', "");
        localStorage.setItem('Hallo_input_id_3', "");
        localStorage.setItem('Hallo_input_verdi_3', "");
        localStorage.setItem('Hallo_input_id_4', "");
        localStorage.setItem('Hallo_input_verdi_4', "");
    }
};

function oppdater_ved_refresh_1() {
    // let spraak = localStorage.getItem("someVarKey");
    // if (spraak == 'norsk') {
    //     document.getElementById('market_pool').innerHTML = '<abbr data_title="Summen er ukjent inntil april ' + (2023 + aarstall) + '">TV-penger:</abbr>';
    // } else {document.getElementById('market_pool').innerHTML = '<abbr data_title="The figure is unknown until April ' + (2023 + aarstall) + '">Market pool:</abbr>';}
    let siste_ord_linktekst = JSON.stringify(document.getElementById("klubb_link").innerHTML.split(" ").splice(-1)).replace(',','').replace('[','').replace(']','').replace('"','').replace('"','').replace('"',' ');
    if (siste_ord_linktekst == "points") {
        siste_ord_linktekst = "coefficient points"
    }
    var Klubbnavn = localStorage.getItem('Klubbnavn') || "Choose club";
    if (Klubbnavn.slice(-1) == "s" || Klubbnavn.slice(-1) == "z" || Klubbnavn.slice(-1) == "x") {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "' " + siste_ord_linktekst;
    }
    else {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "'s " + siste_ord_linktekst;
    }
    if (Klubbnavn == "Choose club" || Klubbnavn == eksperimentell_profil_e) {
        document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_e;
    }
    else if (Klubbnavn == "Velg klubb" || Klubbnavn == eksperimentell_profil_n) {
        document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_n;
    }
    let land = ""
    let klubbnavn_url = Klubbnavn.replace(/\s/g, '')
    if (Klubbnavn == "Velg klubb" || Klubbnavn == "Choose club") {
        klubbnavn_url = "logo"
        land = "standard"
    } else {
        for (i = 0; i < menyvalg.length; i++) {
            if (menyvalg[i][0] == Klubbnavn) {
                land = menyvalg[i][1]
                break
            }
            if (Klubbnavn != eksperimentell_profil_e && Klubbnavn != eksperimentell_profil_n && i+1 == menyvalg.length) {
                Klubbnavn = menyvalg[0][0];
                localStorage.setItem('Klubbnavn',Klubbnavn)
                klubbnavn_url = Klubbnavn.replace(/\s/g, '')
                land = menyvalg[0][1];
            }
        }
        if (klubbnavn_url.includes('/')) {
            klubbnavn_url = klubbnavn_url.replace('/','')
        }
    }
    if (Klubbnavn != "Calculate from scratch" && Klubbnavn != "Kalkuler fra bunnen") {
        document.getElementById("dropDownMeny").innerHTML = '<img class="klubb_logo_kalkulatorer_knapp" loading="lazy" data-sizes="auto" src="media/klubblogo/fallback.png"' + 
        `data-srcset="
        media/klubblogo/` + land + "/" + klubbnavn_url + `1.png 18w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `2.png 32w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `3.png 36w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `4.png 50w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `5.png 64w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `6.png 70w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `7.png 100w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `8.png 140w"
        data-fallback="media/klubblogo/fallback.png" sizes="20px" srcset="
        media/klubblogo/` + land + "/" + klubbnavn_url + `1.png 13w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `2.png 32w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `3.png 36w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `4.png 50w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `5.png 64w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `6.png 70w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `7.png 100w,
        media/klubblogo/` + land + "/" + klubbnavn_url + `8.png 140w">` + Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
    }
    else {
        document.getElementById("dropDownMeny").innerHTML = Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
    }
    if (Klubbnavn == eksperimentell_profil_e || Klubbnavn == eksperimentell_profil_n || Klubbnavn == null || Klubbnavn == "Choose club" || Klubbnavn == "Velg klubb") {
        const motak = localStorage.getItem('Hallo');
        const motak_2 = localStorage.getItem('Hallo_input_id_1');
        const motak_3 = localStorage.getItem('Hallo_input_verdi_1');
        const motak_4 = localStorage.getItem('Hallo_input_id_2');
        const motak_5 = localStorage.getItem('Hallo_input_verdi_2');
        const motak_6 = localStorage.getItem('Hallo_input_id_3');
        const motak_7 = localStorage.getItem('Hallo_input_verdi_3');
        const motak_8 = localStorage.getItem('Hallo_input_id_4');
        const motak_9 = localStorage.getItem('Hallo_input_verdi_4');
        oppdater_ved_refresh_2(motak,motak_2,motak_3,motak_4,motak_5,motak_6,motak_7,motak_8,motak_9);
    }
    else {
        for(var i=0;i<menyvalg.length;i++){
            if(menyvalg[i][0] == Klubbnavn){
                let p = 1 *antall_MV_elem*(localStorage.getItem('sessong')) + 2;
                const motak = menyvalg[i][p];
                if (motak) {
                    if (!motak.includes('CLPO') && document.getElementById("CL-PO")) {
                        paa_av('CL-PO')
                    }
                }
                let turnering = 'ingen';
                if (motak) {
                    if (motak.includes("b18")) {turnering = 0;}
                    else if (motak.includes("b19")) {turnering = 1;}
                    else if (motak.includes("b20")) {turnering = 2;}
                }
                const motak_2 = "i1,i2,i3";
                const motak_3 = menyvalg[i][p+1];
                const motak_4 = "i4,i5,i6,i7,i8,i9";
                const motak_5 = menyvalg[i][p+2];
                const motak_6 = "i10,i11,i12";
                let motak_7 = ",,";
                try {
                    if (turnering != 'ingen') {
                        motak_7 = finnTotaltUavgjort(aarstall,turnering,true);
                    }
                } catch {}
                const motak_8 = "i13,i14,i15";
                const motak_9 = menyvalg[i][p+3];
                oppdater_ved_refresh_2(motak,motak_2,motak_3,motak_4,motak_5,motak_6,motak_7,motak_8,motak_9);
            }
        }
    }
};

function oppdater_ved_refresh_2(motak,motak_2,motak_3,motak_4,motak_5,motak_6,motak_7,motak_8,motak_9) {
    try {
        try {
            var oppdelt_motak = motak.split(',');
            if (oppdelt_motak != 0) {
                for (var u=0;u<oppdelt_motak.length;u++) {
                    paa_av(oppdelt_motak[u]);
                }
            }
        }
        finally {
            var input_id_1 = motak_2.split(',');
            var input_verdi_1 = motak_3.split(',');
            if (input_id_1 != 0) {
                for (var r=0;r<input_id_1.length;r++) {
                    document.getElementById('i' + (r + 1)).value = input_verdi_1[r];
                    forlat_input_felt_1(input_id_1[r]);
                }
            }
        }
    }
    finally {
        try {
            var input_id_2 = motak_4.split(',');
            var input_verdi_2 = motak_5.split(',');
            for (var ha=0;ha<input_id_2.length;ha++) {
                document.getElementById('i' + (ha + 4)).value = input_verdi_2[ha];
                forlat_input_felt_2('i4');
                forlat_input_felt_2('i5');
                forlat_input_felt_2('i6');
                forlat_input_felt_2(input_id_2[ha]);
            }
        }
        finally {
            try {
                var input_id_3 = motak_6.split(',');
                var input_verdi_3 = motak_7.split(',');
                if (input_id_3 != 0) {
                    for (var he=0;he<input_id_3.length;he++) {
                        document.getElementById('i' + (he + 10)).value = input_verdi_3[he];
                        forlat_input_felt_3(input_id_3[he]);
                    }
                }
            }
            finally {
                try {
                    var input_id_4 = motak_8.split(',');
                    var input_verdi_4 = motak_9.split(',');
                    if (input_id_4 != 0) {
                        for (var ho=0;ho<input_id_4.length;ho++) {
                            document.getElementById('i' + (ho + 13)).value = input_verdi_4[ho];
                            forlat_input_felt_4(input_id_4[ho]);
                        }
                    }
                }
                finally {
                    return;
                }
            }
        }
    }
};

function endre_sessong(clicked_id) {
    if (clicked_id == 'sessong_kontroller_1') {
        aarstall -= 1;
    }
    else {
        aarstall += 1;
    }
    if (aarstall > 2) {
        document.getElementById('sessong_kontroller_2').disabled = true;
        localStorage.setItem('sessong', aarstall);
        location.href = '/prize-money-calculator-post-24';
    }
    else {
        if (aarstall == 0) {
            document.getElementById('sessong_kontroller_1').disabled = true;
            document.getElementById('sessong_kontroller_2').disabled = false;
        }
        else if (aarstall == 2) {
            document.getElementById('sessong_kontroller_1').disabled = false;
            document.getElementById('sessong_kontroller_2').disabled = false;
        }
        else {
            document.getElementById('sessong_kontroller_1').disabled = false;
            document.getElementById('sessong_kontroller_2').disabled = false;
        }
        localStorage.setItem('sessong', aarstall);
        slett("nei")
        oppdater_ved_refresh_1()
        oppdater_sessong(aarstall)
    }
};

function oppdater_sessong(aarstall) {
    let spraak = localStorage.getItem("someVarKey");
    if (spraak == 'norsk') {
			if (aarstall == 1) {
				document.getElementById('market_pool').innerHTML = '<abbr data_title="Summen er ukjent inntil 8. februar ' + (2023 + aarstall) + '">TV-penger</abbr>';
			} else if (aarstall == 2) {
				document.getElementById('market_pool').innerHTML = '<abbr data_title="Summen er ukjent inntil 3. april ' + (2023 + aarstall) + '">TV-penger</abbr>';
			} else {
				document.getElementById('market_pool').innerHTML = '<abbr data_title="Summen er ukjent inntil april ' + (2023 + aarstall) + '">TV-penger</abbr>';
			}
    } else {
			if (aarstall == 1) {
				document.getElementById('market_pool').innerHTML = '<abbr data_title="The figure is unknown until February 8 ' + (2023 + aarstall) + '">Market pool</abbr>';
			} else if (aarstall == 2) {
				document.getElementById('market_pool').innerHTML = '<abbr data_title="The figure is unknown until April 3 ' + (2023 + aarstall) + '">Market pool</abbr>';
			} else {
				document.getElementById('market_pool').innerHTML = '<abbr data_title="The figure is unknown until April ' + (2023 + aarstall) + '">Market pool</abbr>';
			}
		}
    document.getElementById("sessong_id").innerText = (2000+parseInt(aarstall) + 21) + '/' + (parseInt(aarstall) + 22);
    if (aarstall == 0) {
        document.getElementById('uefa_distribution_link').setAttribute('href', 'https://editorial.uefa.com/resources/0269-125fde34ba54-30a4c9aeea13-1000/20210520_circular_2021_35_en.pdf');
    }
    if (aarstall == 1) {
        document.getElementById('uefa_distribution_link').setAttribute('href', 'https://editorial.uefa.com/resources/0277-158b0bea495a-ba6c18158cd3-1000/20220704_circular_2022_47_en.pdf');
    }
    if (aarstall >= 2) {
        document.getElementById('uefa_distribution_link').setAttribute('href', 'https://editorial.uefa.com/resources/0283-1874e21d8957-30a439a30e08-1000/20230707_circular_2023_35_en.pdf');
    }
    if (document.getElementById('b-10')) {
        paa_av('b-10')
        paa_av('b10')
    }
    if ((document.getElementById("b-16")) || (document.getElementById("b-18"))) {
        document.getElementById('b2_').innerText = "";
        document.getElementById('b3_').innerText = "";
        document.getElementById('b6_').innerText = "";
        document.getElementById('b9_').innerText = "";
        document.getElementById('b13_').innerText = "";
        if (document.getElementById("b-19")) {
            document.getElementById('b14_').innerText = "";
        }
    }
    if ((document.getElementById("b-9")) || (document.getElementById("b-13")) || (document.getElementById("b-14")) || (document.getElementById("b-18")) || (document.getElementById("b-19")) || (document.getElementById("b-20"))) {
        document.getElementById('b1_').innerText = "";
    }
    if (aarstall == null) {
        aarstall = 0;
    }
    document.getElementById('i10').placeholder = finnTotaltUavgjort(aarstall,0,false);
    document.getElementById('i11').placeholder = finnTotaltUavgjort(aarstall,1,false);
    document.getElementById('i12').placeholder = finnTotaltUavgjort(aarstall,2,false);
    if (document.getElementById('CL-PO')) {
        document.getElementById("b1_").innerText = "";
        document.getElementById("b2_").innerText = "";
        document.getElementById("b3_").innerText = "";
        document.getElementById("b6_").innerText = "";
        document.getElementById("b9_").innerText = "";
    }
    summer();
};

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
        document.getElementById("myInput").focus()
        document.getElementById("myInput").select()
        oppoverpil()
    }
}

function nedoverpil() {
    if (document.getElementsByClassName("opp_ned_pil")[0].innerText = '❯') {
        document.getElementsByClassName("opp_ned_pil")[0].innerText = '❮'
    }
}

function oppoverpil() {
    document.getElementsByClassName("opp_ned_pil")[0].innerText = '❯'
}

function fjernSøkeord() {
    document.getElementById("myInput").value = "";
    document.getElementById("myInput").focus()
    filterFunction()
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
let btnid = "";
let Klubbnavn = (localStorage.getItem('Klubbnavn') || "Choose club");
if (Klubbnavn == 'Kalkuler fra bunnen' || Klubbnavn == 'Calculate from scratch') {
    document.getElementById('eksperimentell_profil_meny_element').classList.add('valgt_element')
}
id = "dropDownMeny";
for (i = 0; i < menyvalg.length; i++) {
    let btn = document.createElement("button");
    let klubbnavn_url = menyvalg[i][0].replace(/\s/g, '')
    if (klubbnavn_url.includes('/')) {
      klubbnavn_url = klubbnavn_url.replace('/','')
    }
    btn.innerHTML = '<img class="klubb_logo_kalkulatorer" loading="lazy" data-sizes="auto" src="media/klubblogo/fallback.png"' + 
    `data-srcset="
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `1.png 18w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `2.png 32w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `3.png 36w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `4.png 50w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `5.png 64w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `6.png 70w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `7.png 100w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `8.png 140w"
    data-fallback="media/klubblogo/fallback.png" sizes="20px" srcset="
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `1.png 13w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `2.png 32w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `3.png 36w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `4.png 50w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `5.png 64w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `6.png 70w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `7.png 100w,
    media/klubblogo/` + menyvalg[i][1] + "/" + klubbnavn_url + `8.png 140w">` + menyvalg[i][0];
    if (menyvalg[i][0] == Klubbnavn) {
        btn.className = "meny_element valgt_element";}
    else {btn.className = "meny_element";}
    btnid = "valgt" + i;
    btn.id = btnid;
    btn.setAttribute("onClick", "endreMenyTittel(innerText,"+id+","+btnid+")");
    document.getElementById("dropdown_elementer").appendChild(btn);
}

function endreMenyTittel(Klubbnavn,id,btnid) {
    try {document.querySelector('.valgt_element').classList.remove("valgt_element");} catch {null;}
    if (id != 'eksperimentell_profil_meny_element') {
        document.getElementById(btnid.id).classList.add("valgt_element");
    }
    else {
        document.getElementById(id).classList.add("valgt_element");
    }
    toggleMeny();
    localStorage.setItem('Klubbnavn', Klubbnavn);
    slett("nei")
    oppdater_ved_refresh_1()
}
/* Dropdown meny slutt */


function endre_sort_kolonne() {
    sessionStorage.setItem('kolonne', 'prize_money')
    sessionStorage.setItem('rekkefølge', 'desc')
    sessionStorage.setItem('kolonne2', 'prize_money_total')
    sessionStorage.setItem('rekkefølge2', 'desc')
    localStorage.setItem('filter_land', JSON.stringify([]))
    sessionStorage.setItem('trykte_knapper', JSON.stringify([]))
    sessionStorage.setItem('trykte_knapper_exclude', JSON.stringify([]))
    sessionStorage.setItem('spoiler', 'synlig')
}


function endre_ti_års_periode() {
    aarstall = parseInt(aarstall)
    localStorage.setItem('filter_land', JSON.stringify([]))
    sessionStorage.setItem('kolonne_ti_års', 'id_nr')
    sessionStorage.setItem('rekkefølge_ti_års', 'asc')
    localStorage.setItem('dropdownmeny_valg_ti_års_midlertidig', (2000+20 + aarstall) + '/' + (21 + aarstall))
    sessionStorage.setItem('dropdownmeny_valg_ti_års', (2000+20 + aarstall) + '/' + (21 + aarstall))
}


let vinduBredde = (window.innerWidth > 0) ? window.innerWidth : screen.width;
$(window).resize(function() {
  if (vinduBredde > 1628) {
    if (((window.innerWidth > 0) ? window.innerWidth : screen.width) <= 1628) {
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