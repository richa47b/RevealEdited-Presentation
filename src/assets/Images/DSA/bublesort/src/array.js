
function submit(){
    Val=nSelect.value
}

function calculateArray(ext) {
    minElement = ext['min'];
    maxElement = ext['max'];
}


function arrayExt(a) {
    let tmpMin = 0;
    let tmpMax = 0;

    for (let i = 1; i < a.length; i++) {
        if (a[i].value < a[tmpMin].value)
            tmpMin = i;
        if (a[i].value > a[tmpMax].value)
            tmpMax = i;
    }


    return {
        "min": a[tmpMin].value,
        "max": a[tmpMax].value
    };
}

function randomArray(n, min=5, max=50) {
    let a = [];

    for (let i = 0; i <n ; i++) {
        a.push({value: Math.floor(Math.random(min, max)*100)});
        // a.push( {value: i*10});
    }
    return a;
}

function reverserandomArray(n) {
    let a = [];

    for (let i = n; i >0 ; i--) {
        // a.push({value: Math.floor(Math.random(min, max)*100)});
        a.push({value: i*10});
    }
    return a;
}

function orderedArray(n) {
    let a = [];

    for (let i = 1; i <= n; i++) {
        a.push({value:i});
    }

    return a;
}

// function shuffleArray(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     } 
// }
