function callSortFunction(fName) {
    allArr = [];
    let before;
    let after;
    const time=new Date();
    before = time.getTime();

    switch (fName) {
        case 'bubbleSort':
            bubbleSort(arr);
            break;
        case 'insertionSort':
            insertionSort(arr);
            break;
        case 'selectionSort':
            selectionSort(arr);
            break;
    }
    
    after = time.getTime();
    // return after - before;
}

function bubbleSort(a) {
    a[0].currentstate=false;
    a[1].currentstate=false;
    a[0].currentposition="do";
    a[0].leftelement=null;
    a[0].rightelement=null;
    a[0].index=null;

    allArr.push(a.map(b => Object.assign({}, b)));

    for (let i = 0; i < a.length - 1; i++) {

        a[0].currentposition="swapped";
        allArr.push(a.map(b => Object.assign({}, b)));

        for (let j = 0; j < a.length - i - 1; j++) {
            a[j].currentstate=true;
            a[j+1].currentstate=true;

            a[0].currentposition="for";
            a[0].leftelement=a[j].value;
            a[0].rightelement=a[j+1].value;
            a[0].index=j;
            allArr.push(a.map(b => Object.assign({}, b)));

            if (a[j].value > a[j + 1].value) {
                
                a[0].currentposition="if";

                allArr.push(a.map(b => Object.assign({}, b)));
                
                let tmp = a[j].value;
                a[j].value = a[j + 1].value;
                a[j + 1].value = tmp;

                a[0].currentposition="swapped++";
                a[0].leftelement=a[j].value;
                a[0].rightelement=a[j+1].value;
                allArr.push(a.map(b => Object.assign({}, b)));
                a[j].currentstate=false;
            }
            else{
                
                a[0].currentposition="if";

                allArr.push(a.map(b => Object.assign({}, b)));

                a[j].currentstate=false;
            }
            if(j===(a.length-i-2)){
                a[j+1].endstate=true;
                a[j+1].currentstate=false;
                allArr.push(a.map(b => Object.assign({}, b)));
            }
        }

        a[0].currentposition="while";
        allArr.push(a.map(b => Object.assign({}, b)));
    }
    allArr[allArr.length-1][0].endstate=true;
    allArr.push(a.map(b => Object.assign({}, b)));
}

function insertionSort(a){
    let current;
    a[0].currentposition="mark";
    a[0].markX=a[0].value;
    a[0].index=0;
    a[0].min=a[0].value;
    allArr.push(a.map(b => Object.assign({}, b)));
    for (let i = 0; i < a.length; i++) {
        a[i].currentstate=true;
        current = a[i].value;
        a[0].currentposition="select";
        allArr.push(a.map(b => Object.assign({}, b)));
        let j = i - 1 ;

        while (j >= 0 && a[j].value > current) {
            a[j].minimumstate=true;
            a[j+1].minimumstate=true;
            a[0].currentposition="if";
            a[0].markX=a[j].value;
            a[0].min = current;
            allArr.push(a.map(b => Object.assign({}, b)));

            let temp=a[j+1].value
            let temp2=a[j].value

            a[j+1].minimumstate=false;
            // a[j+1].minimumstate=true;

            a[j + 1].value = a[j].value;
            a[j].value=temp;
            a[0].currentposition="move";
            j=j-1;
            
            // a[0].markX=a[0];
            a[0].index=i;
            allArr.push(a.map(b => Object.assign({}, b)));
            a[j+1].minimumstate=false;

            // a[j+2].minimumstate=false;
        }

        a[i].currentstate=false;
        if(i==a.length-1){
            for(let temp=0;temp<a.length;temp++){
                a[temp].currentstate=false;
                a[temp].minimumstate=false;
                a[temp].endstate=true;
            }
            allArr.push(a.map(b => Object.assign({}, b)));
        }
        a[0].currentposition="break";
        allArr.push(a.map(b => Object.assign({}, b)));
    }
    a[a.length-1].currentposition="end";
    allArr.push(a.map(b => Object.assign({}, b)));
}

function selectionSort(a) {
   allArr=[];
   a[0].currentposition="for";
    a[0].min=a[0].value;
    a[0].i=a[0].value;
    a[0].currentelement=a[0].value;
   allArr.push(a.map(b => Object.assign({}, b)));

    for (let i = 0; i < a.length - 1; i++) {
        let minIndex = i;
        a[0].min=a[i].value;
        a[0].i=a[i].value;
        a[0].currentelement=a[i].value;
        a[i].currentstate=true;
        a[0].currentposition="for";
        allArr.push(a.map(b => Object.assign({}, b)));

        for (let j = i + 1; j < a.length; j++) {
            a[0].min=a[minIndex].value;
            a[0].currentelement=a[j].value;
            a[j].currentstate=true;
            a[0].currentposition="if";
            allArr.push(a.map(b => Object.assign({}, b)));

            if (a[j].value < a[minIndex].value) {

                a[minIndex].minimumstate=false

                minIndex = j;

                a[j].minimumstate=true;
                a[0].currentposition="set";
                a[0].min=a[minIndex].value;
                a[0].i=a[i].value;
                a[0].currentelement=a[j].value;
                allArr.push(a.map(b => Object.assign({}, b)));

            }else{
                a[0].currentposition="if";
                allArr.push(a.map(b => Object.assign({}, b)));
            }

            a[j].currentstate=false;
        }
        let tmp = a[minIndex].value;
        a[minIndex].value = a[i].value;
        a[i].value = tmp;

        a[i].currentstate=false;
        a[i].endstate=true;
        a[i].minimumstate=false
        a[minIndex].minimumstate=false;
        if(i>=a.length-2){
            a[a.length-2].endstate=true;
            a[a.length-1].endstate=true;
            allArr.push(a.map(b => Object.assign({}, b)));
        }
        a[0].currentposition="swap";
        a[0].min=a[minIndex].value;
        a[0].i=a[i+1].value;
        allArr.push(a.map(b => Object.assign({}, b)));

    }
    a[0].currentposition="end";
    a[0].min="ended";
    a[0].i="ended";
    a[0].currentelement='ended'
    allArr.push(a.map(b => Object.assign({}, b)));
}