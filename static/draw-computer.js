let testTabell = document.getElementById('minTest');
let testTabell_titler = document.getElementById('minTest_titler');
testTabell.innerHTML = "";

const seedede_klubber = [
  ["Bayern",  "GER", 'A'],
  ["Real M.", "ESP", 'C'],
  ["BVB",     "GER", 'F'],
  ["M. City", "ENG", 'G'],
]

const useedede_klubber = [
  ["FCK",   "DEN", 'A'],
  ["PSV",   "NED", 'B'],
  ["Lazio", "ITA", 'E'],
  ["RBL",   "GER", 'G']
]

// Kolonnetitler
for(let i = 0; i < seedede_klubber.length; i++) {
  testTabell_titler.innerHTML += "<th>" + seedede_klubber[i][0] + "</th>";
}

// Opprett sannhetstabellen med permutasjoner
let sannhetsTabell = generatePermutations(useedede_klubber);

console.log(sannhetsTabell)

for(let i = 0; i < seedede_klubber.length; i++) {
  for(let j = 0; j < useedede_klubber.length; j++) {
    if (useedede_klubber[j][1] == seedede_klubber[i][1]) {
      for(let k = 0; k < sannhetsTabell.length; k++) {
        if (sannhetsTabell[k][i][1] == seedede_klubber[i][1]) {
          sannhetsTabell.splice(k,1);
        }
      }
    }
  }
}





// Generer permuatasjoner
function generatePermutations(arr) {
  const result = [];

  function permute(current, remaining) {
    if (remaining.length === 0) {
      result.push(current.slice());
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const next = current.concat([remaining[i]]);
      const remainingCopy = remaining.slice(0, i).concat(remaining.slice(i + 1));
      permute(next, remainingCopy);
    }
  }

  permute([], arr);
  return result;
}