let testTabell = document.getElementById('minTest');
let testTabell_titler = document.getElementById('minTest_titler');

const seededClubs = [
  ["Bayern",   "GER", 'A'],
  ["Arsenal",  "ENG", 'B'],
  ["Real M.",  "ESP", 'C'],
  ["Sociedad", "ESP", 'D'],
  ["Atlético", "ESP", 'E'],
  ["BVB",      "GER", 'F'],
  ["M. City",  "ENG", 'G'],
  ["Barcelona","ESP", 'H'],
]

const unseededClubs = [
  ["FCK",    "DEN", 'A'],
  ["PSV",    "NED", 'B'],
  ["Napoli", "ITA", 'C'],
  ["Inter",  "ITA", 'D'],
  ["Lazio",  "ITA", 'E'],
  ["PSG",    "FRA", 'F'],
  ["RBL",    "GER", 'G'],
  ["Porto",  "POR", 'H']
]

// const seededClubs = [
//   ["Slovan",    "SVK"],
//   ["Gent",      "BEL"],
//   ["Dinamo",    "CRO"],
//   ["Glimt",     "NOR"],
//   ["Legia",     "POL"],
//   ["Fradi",     "HUN"],
//   ["Eintracht", "GER"],
//   ["Ludo",      "BUL"],
// ]

// const unseededClubs = [
//   ["Olympiakos", "GRE"],
//   ["Ajax",       "NED"],
//   ["Real B.",    "ESP"],
//   ["Sturm",      "AUT"],
//   ["R. USG",     "BEL"],
//   ["M. Haifa",   "ISR"],
//   ["Servette",   "SUI"],
//   ["Molde",      "NOR"]
// ]

// const seededClubs = [
//   ["Bayern",  "GER", 'A'],
//   ["Real M.", "ESP", 'C'],
//   ["BVB",     "GER", 'F'],
//   ["M. City", "ENG", 'G'],
// ]

// const unseededClubs = [
//   ["FCK",   "DEN", 'A'],
//   ["PSV",   "NED", 'B'],
//   ["Lazio", "ITA", 'E'],
//   ["RBL",   "GER", 'G']
// ]

const feunseededClubs = [
  [["FCK", 0],  ["DEN",0], ['A',0]],
  [["PSV",0],   ["NED",0], ['B',0]],
  [["Lazio",0], ["ITA",0], ['E',0]],
  [["RBL",0],   ["GER",0], ['G',0]]
]

// Kolonnetitler
for(let i = 0; i < seededClubs.length; i++) {
  testTabell_titler.innerHTML += "<th>" + seededClubs[i][0] + "</th>";
}

// Opprett matchCombinen med permutasjoner
let matchCombin = [];
genPermutations();

exportToExcel(matchCombin);

fjernUlovligeTrekninger(1);
fjernUlovligeTrekninger(2);
let dataTabell = [];
genererForekomster();
registrerForekomster();

for(let i = 0; i < unseededClubs.length; i++) {
  let radHTML = "<tr><th class='radTitler'>" + unseededClubs[i][0] + "</th>";
  for(let j = 0; j < seededClubs.length; j++) {
    radHTML += "<td id='" + i+j + "'>" + (dataTabell[i][j]*100/matchCombin.length).toFixed(2) + "%" + "</td>"
  }
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
function fjernUlovligeTrekninger(egenskap) {
  for(let i = 0; i < seededClubs.length; i++) {
    for(let j = 0; j < unseededClubs.length; j++) {
      if (unseededClubs[j][egenskap] == seededClubs[i][egenskap]) {
        for(let k = 0; k < matchCombin.length; k++) {
          if (matchCombin[k][i][egenskap] == seededClubs[i][egenskap]) {
            matchCombin.splice(k,1);
            k--;
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
      let gb = parseInt(255-(parseFloat(document.getElementById("" + i+j).innerText)*2.55))
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
