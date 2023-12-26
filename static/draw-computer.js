let testTabell = document.getElementById('minTest');
let testTabell_titler = document.getElementById('minTest_titler');

// const seededClubs = [
//   ["Bayern",   "GER", 'A'],
//   ["Arsenal",  "ENG", 'B'],
//   ["Real M.",  "ESP", 'C'],
//   ["Sociedad", "ESP", 'D'],
//   ["Atlético", "ESP", 'E'],
//   ["BVB",      "GER", 'F'],
//   ["M. City",  "ENG", 'G'],
//   ["Barcelona","ESP", 'H'],
// ]

// const unseededClubs = [
//   ["FCK",    "DEN", 'A', ],
//   ["PSV",    "NED", 'B', "BVB"],
//   ["Napoli", "ITA", 'C', "Barcelona"],
//   ["Inter",  "ITA", 'D', "Atlético"],
//   ["Lazio",  "ITA", 'E', ],
//   ["PSG",    "FRA", 'F', "Sociedad"],
//   ["RBL",    "GER", 'G', ],
//   ["Porto",  "POR", 'H', "Arsenal"]
// ]

// const seededClubs = [
//   ["Freiburg",    "GER",,],
//   ["Marseille",   "FRA",,],
//   ["Sparta P.",   "CZE",,],
//   ["Sporting C.", "POR",,],
//   ["Toulouse",    "FRA",,],
//   ["Stade R.",    "FRA",,],
//   ["AS Roma",     "ITA",,],
//   ["Qarabağ",     "AZE",,],
// ]

// const unseededClubs = [
//   ["Gala.",     "TUR",,"Sparta P."],
//   ["RC Lens",   "FRA",,"Freiburg"],
//   ["Braga",     "POR",,"Qarabağ"],
//   ["Benfica",   "POR",,"Toulouse"],
//   ["Feyenoord", "NED",,"AS Roma"],
//   ["AC Milan",  "ITA",,"Stade R."],
//   ["Young B.",  "SUI",,"Sporting C."],
//   ["Shakhtar",  "UKR",,]
// ]

const seededClubs = [
  ["Slovan",    "SVK",,],
  ["Gent",      "BEL",,],
  ["Dinamo",    "CRO",,],
  ["Glimt",     "NOR",,],
  ["Legia",     "POL",,],
  ["Fradi",     "HUN",,],
  ["Eintracht", "GER",,],
  ["Ludo",      "BUL",,],
]

const unseededClubs = [
  ["Olympiakos", "GRE",,"Fradi"],
  ["Ajax",       "NED",,"Glimt"],
  ["Real B.",    "ESP",,"Dinamo"],
  ["Sturm",      "AUT",,"Slovan"],
  ["R. USG",     "BEL",,"Eintracht"],
  ["M. Haifa",   "ISR",,],
  ["Servette",   "SUI",,"Ludo"],
  ["Molde",      "NOR",,"Legia"]
]


// Opprett matchCombinen med permutasjoner
let matchCombin = [];
genPermutations();

// exportToExcel(matchCombin);

fjernUlovligeTrekninger();
trukketOppgjor()

console.log(matchCombin.length)

let dataTabell = [];
genererForekomster();
registrerForekomster();


// Kolonnetitler
for(let i = 0; i < seededClubs.length; i++) {
  kolonneTittel = "<th>" + seededClubs[i][0] + "</th>";
  for(let j = 0; j < unseededClubs.length; j++) {
    if (unseededClubs[j][3] == seededClubs[i][0]) {
      kolonneTittel = "<th class='trukket'>" + seededClubs[i][0] + "</th>";
    }
  }
  testTabell_titler.innerHTML += kolonneTittel;
}
for(let i = 0; i < unseededClubs.length; i++) {
  let radHTML = "";
  let trukketKlubb = false;
  for(let j = 0; j < seededClubs.length; j++) {
    let oppgjorProsent = (dataTabell[i][j]*100/matchCombin.length).toFixed(2) + "%";
    if (unseededClubs[i][3] == seededClubs[j][0]) {
      trukketKlubb = true;
    }
    else if (dataTabell[i][j] == 0) {
      oppgjorProsent = "-";
    }
    radHTML += "<td id='" + i+j + "'>" + oppgjorProsent + "</td>"
  }
  let radTittel = "<th class='radTitler'>" + unseededClubs[i][0] + "</th>";
  if (trukketKlubb) {
    radTittel = "<th class='radTitler trukket2'>" + unseededClubs[i][0] + "</th>";
  }
  radHTML = "<tr>" + radTittel + radHTML;
  testTabell.innerHTML += radHTML + "</tr>";
}

fargelegg();








// Generer permuatasjoner
function genPermutations() {
  function permute(current, remaining) {
    if (remaining.length === 0) {
      matchCombin.push(current.slice());
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const next = current.concat([remaining[i]]);
      const remainingCopy = remaining.slice(0, i).concat(remaining.slice(i + 1));
      permute(next, remainingCopy);
    }
  }
  permute([], unseededClubs);
}

// Fjerner alle rader i matchCombinen som involverer hjemlig oppgjør
function fjernUlovligeTrekninger() {
  for(let i = 1; i <= 2; i++) {
    if (unseededClubs[0][i]) {
      for(let j = 0; j < seededClubs.length; j++) {
        for(let k = 0; k < unseededClubs.length; k++) {
          if (unseededClubs[k][i] == seededClubs[j][i]) {
            for(let l = 0; l < matchCombin.length; l++) {
              if (matchCombin[l][j][i] == seededClubs[j][i]) {
                matchCombin.splice(l,1);
                l--;
              }
            }
          }
        }
      }
    }
  }
}

// Kobler sammen klubber som er trukket mot hverandre
function trukketOppgjor() {
  for(let i = 0; i < unseededClubs.length; i++) {
    if (unseededClubs[i][3]) {
      for(let j = 0; j < seededClubs.length; j++) {
        if (seededClubs[j][0] == unseededClubs[i][3]) {
          for(let k = 0; k < matchCombin.length; k++) {
            if (matchCombin[k][j][0] != unseededClubs[i][0]) {
              matchCombin.splice(k,1);
              k--;
            }
          }
        }
      }
    }
  } 
}

// Generer tom tabell som skal inneholde forekomstene
function genererForekomster() {
  for(let i = 0; i < unseededClubs.length; i++) {
    dataTabell.push([]);
    for(let j = 0; j < seededClubs.length; j++) {
      dataTabell[i].push(0);
    }
  }
}

// Teller forekomstene av alle oppgjør og legger dataen i dataTabell
function registrerForekomster() {
  for(let i = 0; i < unseededClubs.length; i++) {
    for(let j = 0; j < seededClubs.length; j++) {
      for(let k = 0; k < matchCombin.length; k++) {
        if (matchCombin[k][j][0] == unseededClubs[i][0]) {
          dataTabell[i][j]++;
        }
      }
    }
  }
}

function fargelegg() {
  // let hoyesteSannsyn = 0;
  // for(let i = 0; i < unseededClubs.length; i++) {
  //   for(let j = 0; j < seededClubs.length; j++) {
  //     if (parseFloat(document.getElementById("" + i+j).innerText) > hoyesteSannsyn) {
  //       hoyesteSannsyn = parseFloat(document.getElementById("" + i+j).innerText);
  //     }
  //   }
  // }
  for(let i = 0; i < unseededClubs.length; i++) {
    for(let j = 0; j < seededClubs.length; j++) {
      let gb = parseInt(255-(parseFloat(document.getElementById("" + i+j).innerText)*2.55)) || 255;
      document.getElementById("" + i+j).style.backgroundColor = "rgb(255,"+gb+","+gb+")";
    }
  }
}

function print2DArray(array) {
  for (var i = 0; i < array.length; i++) {
    console.log(array[i].join(' '));
  }
}

function exportToExcel(threeDimensionalArray) {
  // Opprett et nytt Excel-arbeidsbokobjekt
  var wb = XLSX.utils.book_new();
  
  // Opprett et tomt regnearkobjekt
  var ws = XLSX.utils.aoa_to_sheet([]);

  // Loop gjennom tredimensjonalt array
  threeDimensionalArray.forEach(function(sheetData, rowIndex) {
    // Legg til data fra hvert ark på det samme regnearket
    sheetData.forEach(function(rowData, colIndex) {
      var cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: cellAddress });
    });
  });

  // Legg til regnearket i arbeidsboken
  XLSX.utils.book_append_sheet(wb, ws, 'CombinedSheet');

  // Opprett Excel-filen og last den ned
  XLSX.writeFile(wb, 'output.xlsx');
}
