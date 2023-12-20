let testTabell = document.getElementById('minTest');
let testTabell_titler = document.getElementById('minTest_titler');

// const seedede_klubber = [
//   ["Bayern",   "GER", 'A'],
//   ["Arsenal",  "ENG", 'B'],
//   ["Real M.",  "ESP", 'C'],
//   ["Sociedad", "ESP", 'D'],
//   ["Atlético", "ESP", 'E'],
//   ["BVB",      "GER", 'F'],
//   ["M. City",  "ENG", 'G'],
//   ["Barcelona","ESP", 'H'],
// ]

// const useedede_klubber = [
//   ["FCK",    "DEN", 'A'],
//   ["PSV",    "NED", 'B'],
//   ["Napoli", "ITA", 'C'],
//   ["Inter",  "ITA", 'D'],
//   ["Lazio",  "ITA", 'E'],
//   ["PSG",    "FRA", 'F'],
//   ["RBL",    "GER", 'G'],
//   ["Porto",  "POR", 'H']
// ]

const seedede_klubber = [
  ["Slovan",    "SVK"],
  ["Gent",      "BEL"],
  ["Dinamo",    "CRO"],
  ["Glimt",     "NOR"],
  ["Legia",     "POL"],
  ["Fradi",     "HUN"],
  ["Eintracht", "GER"],
  ["Ludo",      "BUL"],
]

const useedede_klubber = [
  ["Olympiakos", "GRE"],
  ["Ajax",       "NED"],
  ["Real B.",    "ESP"],
  ["Sturm",      "AUT"],
  ["R. USG",     "BEL"],
  ["M. Haifa",   "ISR"],
  ["Servette",   "SUI"],
  ["Molde",      "NOR"]
]

// const seedede_klubber = [
//   ["Bayern",  "GER", 'A'],
//   ["Real M.", "ESP", 'C'],
//   ["BVB",     "GER", 'F'],
//   ["M. City", "ENG", 'G'],
// ]

// const useedede_klubber = [
//   ["FCK",   "DEN", 'A'],
//   ["PSV",   "NED", 'B'],
//   ["Lazio", "ITA", 'E'],
//   ["RBL",   "GER", 'G']
// ]

// Kolonnetitler
for(let i = 0; i < seedede_klubber.length; i++) {
  testTabell_titler.innerHTML += "<th>" + seedede_klubber[i][0] + "</th>";
}

// Opprett sannhetstabellen med permutasjoner
let sannhetsTabell = [];
genererPermutasjoner();
fjernUlovligeTrekninger(1);
// fjernUlovligeTrekninger(2);
let dataTabell = [];
genererForekomster();

registrerForekomster();




for(let i = 0; i < useedede_klubber.length; i++) {
  let radHTML = "<tr><th class='radTitler'>" + useedede_klubber[i][0] + "</th>";
  for(let j = 0; j < seedede_klubber.length; j++) {
    radHTML += "<td id='" + i+j + "'>" + (dataTabell[i][j]*100/sannhetsTabell.length).toFixed(2) + "%" + "</td>"
  }
  testTabell.innerHTML += radHTML + "</tr>";
}

fargelegg();

function fargelegg() {
  // let hoyesteSannsyn = 0;
  // for(let i = 0; i < useedede_klubber.length; i++) {
  //   for(let j = 0; j < seedede_klubber.length; j++) {
  //     if (parseFloat(document.getElementById("" + i+j).innerText) > hoyesteSannsyn) {
  //       hoyesteSannsyn = parseFloat(document.getElementById("" + i+j).innerText);
  //     }
  //   }
  // }
  // alert(hoyesteSannsyn)

  for(let i = 0; i < useedede_klubber.length; i++) {
    for(let j = 0; j < seedede_klubber.length; j++) {
      let gb = parseInt(255-(parseFloat(document.getElementById("" + i+j).innerText)*2.55))
      document.getElementById("" + i+j).style.backgroundColor = "rgb(255,"+gb+","+gb+")";
    }
  }
}







// Generer permuatasjoner
function genererPermutasjoner() {
  function permute(current, remaining) {
    if (remaining.length === 0) {
      sannhetsTabell.push(current.slice());
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const next = current.concat([remaining[i]]);
      const remainingCopy = remaining.slice(0, i).concat(remaining.slice(i + 1));
      permute(next, remainingCopy);
    }
  }
  permute([], useedede_klubber);
}

// Fjerner alle rader i sannhetstabellen som involverer hjemlig oppgjør
function fjernUlovligeTrekninger(egenskap) {
  for(let i = 0; i < seedede_klubber.length; i++) {
    for(let j = 0; j < useedede_klubber.length; j++) {
      if (useedede_klubber[j][egenskap] == seedede_klubber[i][egenskap]) {
        for(let k = 0; k < sannhetsTabell.length; k++) {
          if (sannhetsTabell[k][i][egenskap] == seedede_klubber[i][egenskap]) {
            sannhetsTabell.splice(k,1);
            k--;
          }
        }
      }
    }
  }
}

// Generer tom tabell som skal inneholde forekomstene
function genererForekomster() {
  for(let i = 0; i < useedede_klubber.length; i++) {
    dataTabell.push([]);
    for(let j = 0; j < seedede_klubber.length; j++) {
      dataTabell[i].push(0);
    }
  }
}

// Teller forekomstene av alle oppgjør og legger dataen i dataTabell
function registrerForekomster() {
  for(let i = 0; i < useedede_klubber.length; i++) {
    for(let j = 0; j < seedede_klubber.length; j++) {
      for(let k = 0; k < sannhetsTabell.length; k++) {
        if (sannhetsTabell[k][j][0] == useedede_klubber[i][0]) {
          dataTabell[i][j]++;
        }
      }
    }
  }
}

// Skriv ut 2d-tabell
// function skrivUt(table) {
//   table.forEach(row => {
//     console.log(row.join(' | '));
//   });
// }