export const searchFilter = (searchValue, list) => {
  if (!searchValue) return list;
  let lowerCaseQuery = searchValue.toLowerCase();
  return getSimilarityValue(lowerCaseQuery, list);
};

const getSimilarityValue = (result_keyword, backend_keywords) => {
  let finalMap = new Map();
  for (let j = 0; j < backend_keywords.length; j++) {
    let res = cosdis(
      word2vec(backend_keywords[j].Heading.toLowerCase()),
      word2vec(result_keyword.toLowerCase())
    );
    let averageRes = [];
    averageRes.push(res * 100);

    if (backend_keywords[j].Text) {
      let res2 = cosdis(
        word2vec(backend_keywords[j].Text.toLowerCase()),
        word2vec(result_keyword.toLowerCase())
      );
      averageRes.push(res2 * 100);
    }

    if (backend_keywords[j].Media_description) {
      let res3 = cosdis(
        word2vec(backend_keywords[j].Media_description.toLowerCase()),
        word2vec(result_keyword.toLowerCase())
      );
      averageRes.push(res3 * 100);
    }
    const sum = averageRes.reduce((a, b) => a + b, 0);
    const avg = sum / averageRes.length || 0;
    backend_keywords[j].value = avg;
    finalMap.set(backend_keywords[j], avg);
  }
  const mapSort1 = new Map([...finalMap.entries()].sort((a, b) => b[1] - a[1]));
  let elemCounter = 0;
  let finalList = [];

  for (let [key, value] of mapSort1) {
    key.value = value;
    finalList.push(key);
    if (++elemCounter > 3) break;
  }

  return finalList; // show List
};

function Counter(array) {
  let count = {};
  array.forEach((val) => (count[val] = (count[val] || 0) + 1));
  return count;
}

function findlw(x, y) {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    let z = y[x[i]];
    z *= z;
    sum = sum + z;
  }

  let squroot = Math.sqrt(sum);
  return squroot;
}

function word2vec(word) {
  let array = word.split("");
  let cw = Counter(array);
  let sw = new Set(array);
  let lw = findlw(Object.keys(cw), cw);
  return [cw, sw, lw];
}

function cosdis(v1, v2) {
  let array1 = Array.from(v1[1]);
  let array2 = Array.from(v2[1]);

  let common = array1.filter((value) => array2.includes(value));

  let sum = 0;
  for (let i = 0; i < common.length; i++) {
    let z = v1[0][common[i]] * v2[0][common[i]];
    sum = sum + z;
  }
  return sum / v1[2] / v2[2];
}
