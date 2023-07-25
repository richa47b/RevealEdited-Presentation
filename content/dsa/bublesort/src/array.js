
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

function randomArray(n=8, min=5, max=50) {
    let a = [];

    for (let i = 0; i < n ; i++) {
        let randomNumber = generateRandom(min,max)
        let count=0;
        if(a.length>0){
            a.forEach((value) => {
                if(randomNumber!=value.value){
                    count++;
                }
            })
            if(count==a.length){
                a.push({value: randomNumber });
            }
            else{
                i=i-1;
            }
        }
        else{
            a.push({value: randomNumber });
        }
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

function generateRandom(min =5, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

function orderedArray(n) {
    let a = [];

    for (let i = 1; i <= n; i++) {
        a.push({value:i});
    }

    return a;
}

function sortedrandomArray(n) {
    let a = [];

    for (let i = 1; i <= n ; i++) {
        // a.push({value: Math.floor(Math.random(min, max)*100)});
        a.push({value: i*10});
    }
    return a;
}
// function shuffleArray(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     } 
// }
