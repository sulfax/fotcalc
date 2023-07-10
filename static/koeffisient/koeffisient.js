(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

var antall_MV_elem = 8;

/*21/22 knapper*/
let Seier_kvalifisering_2122 = 1;
let Uavgjort_kvalifisering_2122 = 0.5;
let Seier_utslagsrunde_2122 = 2;
let Uavgjort_utslagsrunde_2122 = 1;
let Eliminert_Deltatt_2122 = 1;
let Åttendels_Deltatt_2122 = 5;
let Gruppespill_UCL_2122 = 4;
let Gruppespill_UEL_minimum_2122 = 3;
let Gruppespill_UECL_minimum_2122 = 2.5;
let Eliminert_Q2_UECL_2122 = 1.5;
let Eliminert_Q3_UECL_2122 = 2;
let Eliminert_PO_UECL_2122 = 2.5;
/*21/22 input felt*/
var UCL_seier_2122 = 2;
var UEL_seier_2122 = 2;
var UECL_seier_2122 = 2;
var UCL_uavgjort_2122 = 1;
var UEL_uavgjort_2122 = 1;
var UECL_uavgjort_2122 = 1;
var UEL_førsteplass_2122 = 4;
var UECL_førsteplass_2122 = 2;
var UEL_andreplass_2122 = 2; 
var UECL_andreplass_2122 = 1;

const knapp_summer = [
    [Seier_kvalifisering_2122],
    [Uavgjort_kvalifisering_2122],
    [Seier_utslagsrunde_2122],
    [Uavgjort_utslagsrunde_2122],
    [Eliminert_Deltatt_2122],
    [Åttendels_Deltatt_2122],
    [Gruppespill_UCL_2122],
    [Gruppespill_UEL_minimum_2122],
    [Gruppespill_UECL_minimum_2122],
    [Eliminert_Q2_UECL_2122],
    [Eliminert_Q3_UECL_2122],
    [Eliminert_PO_UECL_2122]
]

const input_summer = [
    [UCL_seier_2122],
    [UEL_seier_2122],
    [UECL_seier_2122],
    [UCL_uavgjort_2122],
    [UEL_uavgjort_2122],
    [UECL_uavgjort_2122],

    [UEL_førsteplass_2122],
    [UECL_førsteplass_2122],
    [UEL_andreplass_2122],
    [UECL_andreplass_2122]
];

let resultat_status = [];
let deltakelse_eliminasjon_status = [];

const UCL_assoskoeffisient_celler = ["b1_", "b2_", "b3_", "b6_", "b10_", "b13_", "b17_", "b20_", "b24_", "b27_", "b31_", "i1_", "i4_", "b38_", "b40_", "b43_", "b46_", "b48_", "b51_", "b54_", "b57_", "b60_", "b63_", "b66_"];
const UEL_assoskoeffisient_celler = [/*"b4_", "b7_", "b11_", "b14_",*/ "b18_", "b21_", "b25_", "b28_", "i2_", "i5_", "i8_", "b34_", "b36_", "b39_", "b41_", "b44_", "b47_", "b49_", "b52_", "b55_", "b58_", "b61_", "b64_", "b67_"];
const UECL_assoskoeffisient_celler = ["b5_", "b8_", "b12_", "b15_", "b19_", "b22_", "b26_", "b29_", "i3_", "i6_", "i9_", "b35_", "b37_", "b42_", "b45_", "b50_", "b53_", "b56_", "b59_", "b62_", "b65_", "b68_"];

const UCL_klubbkoeffisient_celler = ["b31__", "i1__", "i4__", "b38__", "b40__", "b43__", "b46__", "b48__", "b51__", "b54__", "b57__", "b60__", "b63__", "b66__"];
const UEL_klubbkoeffisient_celler = ["b32__", "i2__", "i5__", "i8__", "b34__", "b36__", "b39__", "b41__", "b44__", "b47__", "b49__", "b52__", "b55__", "b58__", "b61__", "b64__", "b67__"];
const UECL_klubbkoeffisient_celler = ["b9__", "b16__", "b23__", "b30__", "b33__", "i3__", "i6__", "i9__", "b35__", "b37__", "b42__", "b45__", "b50__", "b53__", "b56__", "b59__", "b62__", "b65__", "b68__"];


var aarstall = parseInt(((localStorage.getItem('sessong'))) || nåværende_sesong_forside[0] - 21);
if (aarstall == 'NaN' || (!aarstall && aarstall != 0)) {
    aarstall = nåværende_sesong_forside[0] - 21;
}
aarstall = parseInt(aarstall)
localStorage.setItem('sessong', aarstall);

if (aarstall > 2) {
    location.href = '/coefficient-calculator-post-24';
}
else if (aarstall == 0) {
    document.getElementById('sessong_kontroller_1').disabled = true;
    // document.getElementById('sessong_kontroller_2').disabled = false;
}
else {
    document.getElementById('sessong_kontroller_1').disabled = false;
    document.getElementById('sessong_kontroller_2').disabled = false;
}
oppdater_sessong(aarstall)

for (let p = 1; p < 10; p++) {
    document.getElementById("i" + p).style.borderColor = "#ced4da";
};

let antall_klubber = 0;

let knapper_som_må_oppdateres = [];

function deltakelse_eliminasjon_pre(clicked_id) {
    deltakelse_eliminasjon(clicked_id)
    if(localStorage.getItem('Klubbnavn')){
    }else{
        localStorage.setItem('deltakelse_eliminasjon_status_local_s', knapper_som_må_oppdateres);
    }
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e) || (localStorage.getItem('Klubbnavn') == eksperimentell_profil_n) || (localStorage.getItem('Klubbnavn') == "") || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb") {
        localStorage.setItem('deltakelse_eliminasjon_status_local_s', knapper_som_må_oppdateres);
    }
}

function deltakelse_eliminasjon(clicked_id) {
    var klasse = (document.getElementById(clicked_id).className);
    var knapp_status = 0;
    if (klasse == "btn btn-danger de0_UCL ele") {
        knapp_status = 1;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UCL ele";
    }
    if (klasse == "btn btn-danger de1_UCL ele") {
        knapp_status = 0;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UCL ele";
    }
    if (klasse == "btn btn-danger de0_UEL ele") {
        knapp_status = 1;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UEL ele";
    }
    if (klasse == "btn btn-danger de1_UEL ele") {
        knapp_status = 0;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UEL ele";
    }
    if (klasse == "btn btn-danger de0_UECL ele") {
        knapp_status = 1;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UECL ele";
    }
    if (klasse == "btn btn-danger de1_UECL ele") {
        knapp_status = 0;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UECL ele";
    }



    if (klasse == "btn btn-danger de0_UCL del") {
        knapp_status = 1;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UCL del";
    }
    if (klasse == "btn btn-danger de1_UCL del") {
        knapp_status = 0;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UCL del";
    }
    if (klasse == "btn btn-danger de0_UEL del") {
        knapp_status = 1;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UEL del";
    }
    if (klasse == "btn btn-danger de1_UEL del") {
        knapp_status = 0;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UEL del";
    }
    if (klasse == "btn btn-danger de0_UECL del") {
        knapp_status = 1;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UECL del";
    }
    if (klasse == "btn btn-danger de1_UECL del") {
        knapp_status = 0;
        document.getElementById(clicked_id).className = "btn btn-danger de" + knapp_status + "_UECL del";
    }


    if (klasse == "btn btn-danger de0_UCL ele" || klasse == "btn btn-danger de0_UEL ele" || klasse == "btn btn-danger de0_UECL ele") {
        var felt_nummer = parseInt(clicked_id.substr(1, clicked_id.length));
        if (felt_nummer == 16) {
            document.getElementById(clicked_id + "__").innerText = (knapp_summer[9][0]);
        }
        else if (felt_nummer == 23) {
            document.getElementById(clicked_id + "__").innerText = (knapp_summer[10][0]);
        }
        else if (felt_nummer == 30) {
            document.getElementById(clicked_id + "__").innerText = (knapp_summer[11][0]);
        }
        else {
            var aktuell_sum = (knapp_summer[4][0]);
            document.getElementById(clicked_id + "__").innerText = aktuell_sum;
        }
    }
    if (klasse == "btn btn-danger de1_UCL ele" || klasse == "btn btn-danger de1_UEL ele" || klasse == "btn btn-danger de1_UECL ele") {
        document.getElementById(clicked_id + "__").innerText = "";
    }
    if (klasse == "btn btn-danger de0_UCL del") {
        if (clicked_id == "b31") {
            var aktuell_sum = (knapp_summer[6][0]);
        }
        else if (clicked_id == "b38") {
            var aktuell_sum = (knapp_summer[5][0]);
        }
        else {
            var aktuell_sum = (knapp_summer[4][0]);
        }
        document.getElementById(clicked_id + "_").innerText = aktuell_sum;
        document.getElementById(clicked_id + "__").innerText = aktuell_sum;
    }
    if (klasse == "btn btn-danger de1_UCL del") {
        document.getElementById(clicked_id + "_").innerText = "";
        document.getElementById(clicked_id + "__").innerText = "";
    }
    if (klasse == "btn btn-danger de0_UEL del" || klasse == "btn btn-danger de0_UECL del") {
        if (clicked_id == "b32" || clicked_id == "b33") {
            oppdater_trostepoeng();
        }
        else {
            var aktuell_sum = (knapp_summer[4][0]);
            document.getElementById(clicked_id + "_").innerText = aktuell_sum;
            document.getElementById(clicked_id + "__").innerText = aktuell_sum;
        }
    }
    if (klasse == "btn btn-danger de1_UEL del" || klasse == "btn btn-danger de1_UECL del") {
        if (clicked_id == "b32" || clicked_id == "b33") {
            document.getElementById(clicked_id + "__").innerText = "";
        }
        else {
            document.getElementById(clicked_id + "_").innerText = "";
            document.getElementById(clicked_id + "__").innerText = "";
        }
    }

    var felt_nummer = parseInt(clicked_id.substr(1, clicked_id.length));
    if (knapp_status == 1) {
        deltakelse_eliminasjon_status[felt_nummer - 1] = 1;
        knapper_som_må_oppdateres.push(clicked_id);

    }
    else {
        deltakelse_eliminasjon_status[felt_nummer - 1] = "";
        knapper_som_må_oppdateres.splice((knapper_som_må_oppdateres.indexOf(clicked_id)), 1);
    }

    if (klasse == "btn btn-danger de0_UCL ele" || klasse == "btn btn-danger de0_UEL ele" || klasse == "btn btn-danger de0_UECL ele") {
        document.getElementById(clicked_id).innerText = (eliminert_språk || "");
    }
    else if (klasse == "btn btn-danger de0_UCL del" || klasse == "btn btn-danger de0_UEL del" || klasse == "btn btn-danger de0_UECL del") {
        document.getElementById(clicked_id).innerText = (spilt_språk || "");
    }
    else {
        document.getElementById(clicked_id).innerText = "";
    }
    summer()
}






function fordeling_resultat(clicked_id) {
    resultat(clicked_id)
    post_resultat(clicked_id)
}

function resultat(clicked_id) {
    var felt_nummer = parseInt(clicked_id.substr(1, clicked_id.length));
    var klasse = (document.getElementById(clicked_id).className);
    var knapp_status = parseInt(klasse[16]) + 1;
    if (knapp_status == 4) {
        knapp_status = 0;
    }
    if (felt_nummer <= 29) {
        if (knapp_status == 1) {
            var aktuell_sum = (knapp_summer[0][0]);
            document.getElementById(clicked_id + "_").innerText = aktuell_sum;
        }
        else if (knapp_status == 2) {
            var aktuell_sum = (knapp_summer[1][0]);
            document.getElementById(clicked_id + "_").innerText = aktuell_sum;
        }
        else {
            document.getElementById(clicked_id + "_").innerText = "";
        }
    }
    else {
        if (knapp_status == 1) {
            var aktuell_sum = (knapp_summer[2][0]);
            document.getElementById(clicked_id + "_").innerText = aktuell_sum;
            if (felt_nummer != 34 && felt_nummer != 35 && felt_nummer != 36 && felt_nummer != 37) {
                document.getElementById(clicked_id + "__").innerText = aktuell_sum;
            }
        }
        else if (knapp_status == 2) {
            var aktuell_sum = (knapp_summer[3][0]);
            document.getElementById(clicked_id + "_").innerText = aktuell_sum;
            if (felt_nummer != 34 && felt_nummer != 35 && felt_nummer != 36 && felt_nummer != 37) {
                document.getElementById(clicked_id + "__").innerText = aktuell_sum;
            }
        }
        else {
            document.getElementById(clicked_id + "_").innerText = "";
            document.getElementById(clicked_id + "__").innerText = "";
        }
    }
    document.getElementById(clicked_id).className = "btn btn-danger r" + knapp_status;
    const resultat_tekst = [
        "",
        seier_språk,
        uavgjort_språk,
        tap_språk,
    ]
    document.getElementById(clicked_id).innerText = resultat_tekst[knapp_status];
    summer()
}

function post_resultat(clicked_id) {
    var felt_nummer = parseInt(clicked_id.substr(1, clicked_id.length));
    var klasse = (document.getElementById(clicked_id).className);
    var knapp_status = parseInt(klasse[16]) + 1;
    if (knapp_status == 4) {
        knapp_status = 0;
    }
    if (knapp_status == 2) {
        resultat_status[felt_nummer - 1] = 3;
    }
    else if (knapp_status == 3) {
        resultat_status[felt_nummer - 1] = 2;
    }
    else if (knapp_status == 0) {
        resultat_status[felt_nummer - 1] = 1;
    }
    else {
        resultat_status[felt_nummer - 1] = "";
    }
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == null || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb")) {
        localStorage.setItem('resultat_status_local_s', resultat_status);
    }
}


function oppdater_trostepoeng() {
    if ((document.getElementById("b32").className) == 'btn btn-danger de1_UEL del') {
        var aktuell_sum = Math.max(0, ((knapp_summer[7][0]) - (document.getElementById("i2__").innerText) - (document.getElementById("i5__").innerText) - (document.getElementById("i8__").innerText)));
        document.getElementById("b32__").innerText = aktuell_sum;
    }
    if ((document.getElementById("b33").className) == 'btn btn-danger de1_UECL del') {
        var aktuell_sum = Math.max(0, ((knapp_summer[8][0]) - (document.getElementById("i3__").innerText) - (document.getElementById("i6__").innerText) - (document.getElementById("i9__").innerText)));
        document.getElementById("b33__").innerText = aktuell_sum;
    }
}


let oppdater_seier_tap_status = [];

function gjennomfør_1_gang_per_knapp(clicked_id) {
    oppdater_seier_tap(clicked_id);
    var id_nummer = parseInt(clicked_id.substr(1, clicked_id.length));
    if (id_nummer <= 3) {
        oppdater_seier_tap("i" + (id_nummer + 3));
    }
    if (id_nummer >= 4) {
        oppdater_seier_tap("i" + (id_nummer - 3));
    }
    oppdater_trostepoeng()
    summer()
}


function oppdater_seier_tap(clicked_id, lagre_endring) {
    var input_felt_verdi = document.getElementById(clicked_id).value;
    var felt_nummer = parseInt(clicked_id.substr(1, clicked_id.length));
    document.getElementById(clicked_id).style.borderColor = "";
    document.getElementById(clicked_id).style.backgroundColor = "";
    document.getElementById(clicked_id).style.color = "";
    document.getElementById(clicked_id).className = "form-control ikke_placeholder";
    var innenfor_1_6 = (input_felt_verdi >= 0) && (input_felt_verdi <= 6)
    if (felt_nummer >= 1 && felt_nummer <= 3 && document.getElementById(clicked_id).value != "") {
        let motsatt_input = (parseInt(document.getElementById("i" + (felt_nummer + 3)).value)) || 0;
        let sammen_innenfor_1_6 = (parseInt(input_felt_verdi) + motsatt_input >= 0 && ((parseInt(input_felt_verdi)) + motsatt_input <= 6));
        let motsatt_input_ikke_avrundet = (document.getElementById("i" + (felt_nummer + 3)).value) || 0;
        if (motsatt_input < 0) {
            motsatt_input = 0
        }
        else if (motsatt_input > 6) {
            motsatt_input = 6
        }
        if (((sammen_innenfor_1_6 || motsatt_input_ikke_avrundet < 0) && innenfor_1_6 && input_felt_verdi % 1 == 0) || (motsatt_input_ikke_avrundet % 1 != 0 && innenfor_1_6 && input_felt_verdi % 1 == 0)) {
            var aktuell_sum = (input_felt_verdi * input_summer[0][0]);
            document.getElementById(clicked_id + "_").innerText = aktuell_sum;
            document.getElementById(clicked_id + "__").innerText = aktuell_sum;
        }
        else if (input_felt_verdi > 6 || input_felt_verdi < 0 || input_felt_verdi % 1 != 0) {
            utenfor_gyldig_input(clicked_id);
        }
        else {
            utenfor_gyldig_input(clicked_id);
            utenfor_gyldig_input("i" + (felt_nummer + 3));
        }
    }
    else if (felt_nummer >= 4 && felt_nummer <= 6 && document.getElementById(clicked_id).value != "") {
        let motsatt_input = (parseInt(document.getElementById("i" + (felt_nummer - 3)).value)) || 0;
        let sammen_innenfor_1_6 = (parseInt(input_felt_verdi) + motsatt_input >= 0 && ((parseInt(input_felt_verdi)) + motsatt_input <= 6));
        let motsatt_input_ikke_avrundet = (document.getElementById("i" + (felt_nummer - 3)).value) || 0;
        if (motsatt_input < 0) {
            motsatt_input = 0
        }
        else if (motsatt_input > 6) {
            motsatt_input = 6
        }
        if (((sammen_innenfor_1_6 || motsatt_input_ikke_avrundet < 0) && innenfor_1_6 && input_felt_verdi % 1 == 0) || (motsatt_input_ikke_avrundet % 1 != 0 && innenfor_1_6 && input_felt_verdi % 1 == 0)) {
            var aktuell_sum = (input_felt_verdi * input_summer[3][0]);
            document.getElementById(clicked_id + "_").innerText = aktuell_sum;
            document.getElementById(clicked_id + "__").innerText = aktuell_sum;
        }
        else if (input_felt_verdi > 6 || input_felt_verdi < 0 || input_felt_verdi % 1 != 0) {
            utenfor_gyldig_input(clicked_id);
        }
        else {
            utenfor_gyldig_input(clicked_id);
            utenfor_gyldig_input("i" + (felt_nummer - 3));
        }
    }
    else {
        document.getElementById(clicked_id).style.borderColor = "#ced4da";
        document.getElementById(clicked_id + "_").innerText = "";
        document.getElementById(clicked_id + "__").innerText = "";
    }
    oppdater_seier_tap_status[felt_nummer - 1] = input_felt_verdi
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == null || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb") && lagre_endring != "nei") {
        localStorage.setItem('oppdater_seier_tap_status_local_s', oppdater_seier_tap_status);
    }
}


function oppdater_plassering(clicked_id, lagre_endring) {
    var felt_nummer = parseInt(clicked_id.substr(1, clicked_id.length));
    var input_felt_verdi = document.getElementById(clicked_id).value;
    document.getElementById(clicked_id).style.borderColor = "";
    document.getElementById(clicked_id).style.backgroundColor = "";
    document.getElementById(clicked_id).style.color = "";
    document.getElementById(clicked_id).className = "form-control ikke_placeholder";
    if (input_felt_verdi >= 1 && input_felt_verdi <= 4 && document.getElementById(clicked_id).value != "" && input_felt_verdi % 1 == 0) {
        if (felt_nummer == 8 || felt_nummer == 9) {
            if (input_felt_verdi == 1) {
                var aktuell_sum = input_summer[felt_nummer-2][0];
                document.getElementById(clicked_id + "_").innerText = aktuell_sum;
                document.getElementById(clicked_id + "__").innerText = aktuell_sum;
            }
            else if (input_felt_verdi == 2) {
                var aktuell_sum = input_summer[felt_nummer][0];
                document.getElementById(clicked_id + "_").innerText = aktuell_sum;
                document.getElementById(clicked_id + "__").innerText = aktuell_sum;
            }
            else {
                document.getElementById(clicked_id + "_").innerText = "";
                document.getElementById(clicked_id + "__").innerText = "";
            }
        }
    }
    else if ((input_felt_verdi > 4 || input_felt_verdi < 1 && input_felt_verdi != "") || (input_felt_verdi != "" && input_felt_verdi % 1 != 0)) {
        utenfor_gyldig_input(clicked_id);
    }
    else {
        document.getElementById(clicked_id).style.borderColor = "#ced4da";
        try {
            document.getElementById(clicked_id + "_").innerText = "";
            document.getElementById(clicked_id + "__").innerText = "";
        }
        catch {
            null;
        }
    }
    oppdater_seier_tap_status[felt_nummer - 1] = input_felt_verdi
    if ((localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == null || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb") && lagre_endring != "nei") {
        localStorage.setItem('oppdater_seier_tap_status_local_s', oppdater_seier_tap_status);
    }
    oppdater_trostepoeng()
    summer()
}

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
        location.href = '/coefficient-calculator-post-24';
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
          oppdater_sessong(aarstall)
          oppdater_ved_refresh_koeff_1()
    }
};

function oppdater_sessong(aarstall) {
    document.getElementById("sessong_id").innerText = (parseInt(aarstall) + 21) + '/' + (parseInt(aarstall) + 22);
    if (aarstall == 0) {
        document.getElementById('uefa_distribution_link').setAttribute('href', 'https://documents.uefa.com/r/Regulations-of-the-UEFA-Champions-League-2023/24/Annex-D-Coefficient-Ranking-System-Online');
    }
    if (aarstall == 1) {
        document.getElementById('uefa_distribution_link').setAttribute('href', 'https://documents.uefa.com/r/Regulations-of-the-UEFA-Champions-League-2023/24/Annex-D-Coefficient-Ranking-System-Online');
    }
    if (aarstall >= 2) {
        document.getElementById('uefa_distribution_link').setAttribute('href', 'https://documents.uefa.com/r/Regulations-of-the-UEFA-Champions-League-2023/24/Annex-D-Coefficient-Ranking-System-Online');
    }
};


function utenfor_gyldig_input(clicked_id) {
    document.getElementById(clicked_id).style.backgroundColor = 'red';
    document.getElementById(clicked_id).style.borderColor = 'red';
    document.getElementById(clicked_id).style.color = 'white';
    document.getElementById(clicked_id).className = "form-control placeholder";
    if (clicked_id != 'i7') {
        document.getElementById(clicked_id + "_").innerText = "";
        document.getElementById(clicked_id + "__").innerText = "";
    }
};

function summer() {
    const UCL_antall_summer_assos = parseInt(UCL_assoskoeffisient_celler.length);
    const UEL_antall_summer_assos = parseInt(UEL_assoskoeffisient_celler.length);
    const UECL_antall_summer_assos = parseInt(UECL_assoskoeffisient_celler.length);
    const UCL_antall_summer_klubb = parseInt(UCL_klubbkoeffisient_celler.length);
    const UEL_antall_summer_klubb = parseInt(UEL_klubbkoeffisient_celler.length);
    const UECL_antall_summer_klubb = parseInt(UECL_klubbkoeffisient_celler.length);
    let UCL_total_sum_assos = 0;
    let UEL_total_sum_assos = 0;
    let UECL_total_sum_assos = 0;
    let UCL_total_sum_klubb = 0;
    let UEL_total_sum_klubb = 0;
    let UECL_total_sum_klubb = 0;
    for (x=0;x<UCL_antall_summer_assos;x++) {
        let UCL_enkeltsum_assos = ((document.getElementById(UCL_assoskoeffisient_celler[x]).innerText));
        UCL_total_sum_assos += parseFloat(UCL_enkeltsum_assos.split(' ').join('')) || 0;
    }
    for (x=0;x<UEL_antall_summer_assos;x++) {
        let UEL_enkeltsum_assos = (document.getElementById(UEL_assoskoeffisient_celler[x]).innerText);
        UEL_total_sum_assos += parseFloat(UEL_enkeltsum_assos.split(' ').join('')) || 0;
    }
    for (x=0;x<UECL_antall_summer_assos;x++) {
        let UECL_enkeltsum_assos = (document.getElementById(UECL_assoskoeffisient_celler[x]).innerText);
        UECL_total_sum_assos += parseFloat(UECL_enkeltsum_assos.split(' ').join('')) || 0;
    }
    let total_sum_assos = (UCL_total_sum_assos + UEL_total_sum_assos + UECL_total_sum_assos);
    document.getElementById("UCL_inntjening_assos").innerText = UCL_total_sum_assos;
    document.getElementById("UEL_inntjening_assos").innerText = UEL_total_sum_assos;
    document.getElementById("UECL_inntjening_assos").innerText = UECL_total_sum_assos;
    document.getElementById("total_inntjening_assos").innerText = total_sum_assos;
    let bidrag = 0;
    if (antall_klubber != 0) {
        bidrag = total_sum_assos/antall_klubber || 0;
        bidrag = bidrag.toFixed(3) || 0;
        document.getElementById("koeffisienter_bidrag_sum").innerHTML = '<span class="ingen_understrek">' + bidrag + '<span>';
    }
    else {
        bidrag = '?';
        document.getElementById("koeffisienter_bidrag_sum").innerHTML = bidrag;
    }

    for (x=0;x<UCL_antall_summer_klubb;x++) {
        let UCL_enkeltsum_klubb = ((document.getElementById(UCL_klubbkoeffisient_celler[x]).innerText));
        UCL_total_sum_klubb += parseFloat(UCL_enkeltsum_klubb.split(' ').join('')) || 0;
    }
    for (x=0;x<UEL_antall_summer_klubb;x++) {
        let UEL_enkeltsum_klubb = (document.getElementById(UEL_klubbkoeffisient_celler[x]).innerText);
        UEL_total_sum_klubb += parseFloat(UEL_enkeltsum_klubb.split(' ').join('')) || 0;
    }
    for (x=0;x<UECL_antall_summer_klubb;x++) {
        let UECL_enkeltsum_klubb = (document.getElementById(UECL_klubbkoeffisient_celler[x]).innerText);
        UECL_total_sum_klubb += parseFloat(UECL_enkeltsum_klubb.split(' ').join('')) || 0;
    }
    let total_sum_klubb = (UCL_total_sum_klubb + UEL_total_sum_klubb + UECL_total_sum_klubb);
    document.getElementById("UCL_inntjening_klubb").innerText = UCL_total_sum_klubb;
    document.getElementById("UEL_inntjening_klubb").innerText = UEL_total_sum_klubb;
    document.getElementById("UECL_inntjening_klubb").innerText = UECL_total_sum_klubb;
    document.getElementById("total_inntjening_klubb").innerText = total_sum_klubb;
}

function slett(slett_lagring) {
    let resultat_status_lengde = resultat_status.length
    for (var c=0;c<resultat_status_lengde;c++) {
        for (var d=0;d<resultat_status[c];d++) {
            resultat("b" + (c + 1))
        }
    }
    resultat_status = [];

    let deltakelse_eliminasjon_status_lengde = deltakelse_eliminasjon_status.length
    for (var c=0;c<deltakelse_eliminasjon_status_lengde;c++) {
        for (var d=0;d<deltakelse_eliminasjon_status[c];d++) {
            deltakelse_eliminasjon("b" + (c + 1))
        }
    }
    deltakelse_eliminasjon_status = []
    for (var c=1;c<=6;c++) {
        document.getElementById("i" + c).value = "";
        oppdater_seier_tap("i" + c, slett_lagring)
    }
    for (var c=7;c<=9;c++) {
        document.getElementById("i" + c).value = "";
        oppdater_plassering("i" + c, slett_lagring)
    }
    if (slett_lagring != "nei" && (localStorage.getItem('Klubbnavn') == eksperimentell_profil_e || localStorage.getItem('Klubbnavn') == eksperimentell_profil_n || localStorage.getItem('Klubbnavn') == "Choose club" || localStorage.getItem('Klubbnavn') == "Velg klubb")) {
        localStorage.setItem('resultat_status_local_s', "");
        localStorage.setItem('oppdater_seier_tap_status_local_s', "");
        localStorage.setItem('deltakelse_eliminasjon_status_local_s', "");
    }
};



function oppdater_ved_refresh_koeff_1() {
    tell_klubber_land()
    let siste_ord_linktekst = JSON.stringify(document.getElementById("klubb_link").innerHTML.split(" ").splice(-1)).replace(',','').replace('[','').replace(']','').replace('"','').replace('"','');
    if (siste_ord_linktekst == "money") {
        siste_ord_linktekst = "prize money"
    }
    var Klubbnavn = localStorage.getItem('Klubbnavn');
    if (Klubbnavn.slice(-1) == "s") {
        document.getElementById("klubb_link").innerHTML = Klubbnavn + "’ " + siste_ord_linktekst;
    }
    else {
        if (siste_ord_linktekst == "premiepenger") {
            document.getElementById("klubb_link").innerHTML = Klubbnavn + "s " + siste_ord_linktekst;
          }
          else {
            document.getElementById("klubb_link").innerHTML = Klubbnavn + "’s " + siste_ord_linktekst;
          }
    }
    if (Klubbnavn == "Choose club" || Klubbnavn == eksperimentell_profil_e) {
        document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_e;
    }
    else if (Klubbnavn == "Velg klubb" || Klubbnavn == eksperimentell_profil_n) {
        document.getElementById("klubb_link").innerHTML = din_klubbs_premi_koef_n;
    }
    if (Klubbnavn == null || Klubbnavn == "null") {
        if (document.getElementById("q1_kamp2").innerHTML == 'Q1 | match 2') {
            Klubbnavn = "Choose club";
        }
        else {
            Klubbnavn = "Velg klubb";
        }
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
        const deltakelse_eliminasjon = localStorage.getItem('deltakelse_eliminasjon_status_local_s') || '';
        const resultat = localStorage.getItem('resultat_status_local_s') || '';
        var oppdater_seier_tap = localStorage.getItem('oppdater_seier_tap_status_local_s') || ',,';
        oppdater_ved_refresh_2(deltakelse_eliminasjon, resultat, oppdater_seier_tap)
    }
    else {
        for(var i=0;i<menyvalg.length;i++){
            if(menyvalg[i][0] == Klubbnavn){
                let p = 1 *antall_MV_elem*aarstall + 2;
                // const resultat = localStorage.getItem('resultat_status_local_s');
                const knapper_fra_prem_kalk = menyvalg[i][p] || '';
                var deltakelse_eliminasjon = "";
                const knapper_til_konvertering = ["b5","b8","b12","b17","b18","b19","b20","b21","b22","b24","b25","b27","b28","b29","b30","b31","b32"];
                const knapper_fra_konvertering = ["b9","b16","b23","b30","b31","b32","b33","b38","b39","b46","b47","b54","b55","b56","b63","b64","b65"]
                for (u=0;u<knapper_til_konvertering.length;u++) {
                    if (knapper_fra_prem_kalk.includes(knapper_til_konvertering[u])) {
                        deltakelse_eliminasjon = deltakelse_eliminasjon + ((knapper_fra_konvertering[u]) + ",");
                    }
                }
                const resultat = menyvalg[i][p+4] || "";
                const oppdater_seier_tap = ((menyvalg[i][p+2] || ',,,,,') + ',' + (menyvalg[i][p+3] || ',,'));
                var forkort = "ja";
                oppdater_ved_refresh_2(deltakelse_eliminasjon, resultat, oppdater_seier_tap, forkort);
            }
        }
    }
}

function oppdater_ved_refresh_2(deltakelse_eliminasjon, resultat, oppdater_seier_tap, forkort) {
    try {
        if (deltakelse_eliminasjon.slice(-1) == ',')
            deltakelse_eliminasjon = deltakelse_eliminasjon.slice(0, -1)
        if (deltakelse_eliminasjon != '') {
            let oppdelt_motak = deltakelse_eliminasjon.split(',');
            for (var u=0;u<oppdelt_motak.length;u++) {
                deltakelse_eliminasjon_pre(oppdelt_motak[u]);
            }
        }
    }
    finally {
        try {
            if (forkort == "ja") {
                if (resultat) {
                    let posisjon = resultat.split(',', 3).join(',').length
                    let resultat2 = resultat.slice(0, posisjon) + "," + resultat.slice(posisjon)
                    let posisjon_2 = resultat2.split(',', 6).join(',').length
                    let resultat3 = resultat2.slice(0, posisjon_2) + "," + resultat2.slice(posisjon_2)
                    let posisjon_3 = resultat3.split(',', 10).join(',').length
                    let resultat4 = resultat3.slice(0, posisjon_3) + "," + resultat3.slice(posisjon_3)
                    let posisjon_4 = resultat4.split(',', 13).join(',').length
                    let resultat5 = resultat4.slice(0, posisjon_4) + "," + resultat4.slice(posisjon_4)
                    var resultat_status_oppdelt = (resultat5.split(','));
                    var resultat_status_oppdelt_lengde = resultat_status_oppdelt.length;
                }
            }
            else {
                var resultat_status_oppdelt = (resultat.split(','));
                var resultat_status_oppdelt_lengde = resultat.length;
            }
            for (var c=0;c<resultat_status_oppdelt_lengde;c++) {
                if (resultat_status_oppdelt[c] == 3) {
                    resultat_status_oppdelt[c] = 1;
                }
                else if (resultat_status_oppdelt[c] == 1) {
                    resultat_status_oppdelt[c] = 3;
                }
                for (var d=0;d<resultat_status_oppdelt[c];d++) {
                    fordeling_resultat("b" + (c + 1))
                }
            }
        }
        finally {
            let oppdater_seier_tap_status_oppdelt = (oppdater_seier_tap.split(',')) || '';
            for (let d=1;d<=(oppdater_seier_tap_status_oppdelt.length);d++) {
                if (d==10) {} else {
                    document.getElementById("i" + d).value = oppdater_seier_tap_status_oppdelt[d - 1];
                    if (d <= 6) {
                        gjennomfør_1_gang_per_knapp("i" + d)
                    }
                    else if (d >= 7) {
                        oppdater_plassering("i" + d)
                    }
                }
            }
        }
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
let land_klubb = "";
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
    land_klubb = menyvalg[i][1];
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
    // document.getElementById("dropDownMeny").innerHTML = Klubbnavn + "<div class='opp_ned_pil'>&#10094</div>";
    toggleMeny();
    localStorage.setItem('Klubbnavn', Klubbnavn);
    slett("nei")
    oppdater_ved_refresh_koeff_1()
}
/* Dropdown meny slutt */

function tell_klubber_land() {
    Klubbnavn = (localStorage.getItem('Klubbnavn') || "Choose club");
    antall_klubber = 0;
    let land = "";
    for (i = 0; i < menyvalg.length; i++) {
        if (menyvalg[i][0] == Klubbnavn) {
            land = menyvalg[i][1];
            break
        }
    }
    if (land == '') {
        document.getElementById('land_bidrag').innerHTML = '';
    } else {
        document.getElementById('land_bidrag').innerHTML = '<div class="flagg_div" id="' + land + '_oversett"></div>';
    }
    let spraak = localStorage.getItem("someVarKey") || 'english'
    language_standard(spraak)
    if (spraak == 'english') {
        document.getElementById('land_lenke').innerHTML = `<a class="graa_hover_link bidrag_lenke" href="country-coefficients" onclick="endre_land('` + land + `')"><span id="ranking_spraak">Ranking</span></a>`;
    } else {
        document.getElementById('land_lenke').innerHTML = `<a class="graa_hover_link bidrag_lenke" href="country-coefficients" onclick="endre_land('` + land + `')"><span id="ranking_spraak">Rangering</span></a>`;
    }
    if (aarstall >= 2) {
        for (i = 0; i < landskoeffisienter.length; i++) {
            if (land == landskoeffisienter[i][0]) {
                antall_klubber = totalt_antall_klubber[i][aarstall - 2];
                if (antall_klubber == '?' || !antall_klubber) {antall_klubber = 0;}
            }
        }
    }
    else {
        for (i = 0; i < menyvalg.length; i++) {
            if (menyvalg[i][1] == land && menyvalg[i][antall_MV_elem*(aarstall + 1) + 1]) {
                antall_klubber += 1;
            }
        }
    }
}

function endre_land(land) {
    if (land == '') {land = localStorage.setItem('filter_land', JSON.stringify([]))}
    else {localStorage.setItem('filter_land', JSON.stringify([land]))}
    sessionStorage.setItem('kolonne_landskoeffisient', 'poeng')
    sessionStorage.setItem('rekkefølge_landskoeffisient', 'asc')
    sessionStorage.setItem('kolonne_landskoeffisient2', 'id_nr_klubb')
    sessionStorage.setItem('rekkefølge_landskoeffisient2', 'asc')
    try {if (sessionStorage.getItem('dropdownmeny_valg_landskoeffisient').length > 10) {
        sessionStorage.setItem('dropdownmeny_valg_landskoeffisient', nåværende_sesong_periode_valg[0] + '/' + nåværende_sesong_periode_valg[2]);
      }}
    catch {null;}
    let perioden_valgt = parseInt((sessionStorage.getItem('dropdownmeny_valg_landskoeffisient') || (nåværende_sesong_periode_valg[0] + '/' + nåværende_sesong_periode_valg[2])).slice(0, 2)) - 4;
    let aarstall_her = parseInt(21 + aarstall)
    let differanse = perioden_valgt - aarstall_her
    if (perioden_valgt <= aarstall_her && perioden_valgt + 4 >= aarstall_her) {
    }
    else if (differanse > 0) {
      sessionStorage.setItem('dropdownmeny_valg_landskoeffisient', (perioden_valgt + 4 - differanse) + '/' + (perioden_valgt + 5 - differanse))
    }
    else {
      sessionStorage.setItem('dropdownmeny_valg_landskoeffisient', (21 + aarstall) + '/' + (22 + aarstall))
    }
}

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