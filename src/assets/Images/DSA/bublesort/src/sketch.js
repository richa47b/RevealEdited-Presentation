let arr = [];
let minElement;
let maxElement;
let elementCount;
let allArr;
let k;
let drawingStatus;
let loopStatus;
let cnv;
let currAlg;
let algorithmNames;
let validKeys;
let lastOperationTime;
let manualState;
let color='#A82049';

elementCount = 10;
count=0;
arr = randomArray(elementCount, 5, 50); //this arr is array which has object at each element
allArr = [];
calculateArray(arrayExt(arr));

function codecolor(currentposition,name){
    if(name=="bubbleSort"){
        document.getElementById("codedata").innerHTML=`<span style="font-size:18px;"><b>Current Index</b> : ${allArr[count][0].index}
        <b>LeftElement</b> : ${allArr[count][0].leftelement}  <b>RightElement </b>: ${allArr[count][0].rightelement}</span>`;

        if(currentposition=="do"){
            document.getElementById("code1").style.backgroundColor=color;
        }
        else if(currentposition=="swapped"){
            document.getElementById("code2").style.backgroundColor=color;
        }
        else if(currentposition=="for"){
            document.getElementById("code3").style.backgroundColor=color;
        }
        else if(currentposition=="if"){
            document.getElementById("code4").style.backgroundColor=color;
        }
        else if(currentposition=="swapped++"){
            document.getElementById("code5").style.backgroundColor=color;
            document.getElementById("code6").style.backgroundColor=color;
        }
        else if(currentposition=="while"){
            document.getElementById("code7").style.backgroundColor=color;
        }
    }
    else if(name=="selectionSort"){
        document.getElementById("codedata").innerHTML=`<span style="font-size:20px;"><b>Current element : </b> ${allArr[count][0].currentelement} <br><b>Current Minimun Value : </b> ${allArr[count][0].min}<br><b>Which will be Swapped : </b>${allArr[count][0].i}</span>`

        if(currentposition=="for"){
            document.getElementById("code1").style.backgroundColor=color;
            document.getElementById("code2").style.backgroundColor=color;
            document.getElementById("code3").style.backgroundColor=color;
        }
        else if(currentposition=="if"){
            document.getElementById("code4").style.backgroundColor=color;
        }
        else if(currentposition=="set"){
            document.getElementById("code5").style.backgroundColor=color;
        }
        else if(currentposition=="swap"){
            document.getElementById("code6").style.backgroundColor=color;
        }
    }
    else if(name == "insertionSort"){
        document.getElementById("codedata").innerHTML=`<span style="font-size:18px;"><b>Last Sorted Index(j)</b> : ${allArr[count][0].index}<b>Comparison Element : </b> : ${allArr[count][0].markX}  <b>Current Element </b>: ${allArr[count][0].min}</span>`;

        if(currentposition=="mark"){
            document.getElementById("code1").style.backgroundColor=color;
        }
        else if(currentposition=="select"){
            document.getElementById("code2").style.backgroundColor=color;
            document.getElementById("code3").style.backgroundColor=color;
        }
        else if(currentposition=="if"){
            document.getElementById("code4").style.backgroundColor=color;
        }
        else if(currentposition=="move"){
            document.getElementById("code5").style.backgroundColor=color;}
        else if(currentposition=="break"){
            document.getElementById("code6").style.backgroundColor=color;
        }
    }
}

function resetcolor(name){
    document.getElementById("code1").style.backgroundColor='transparent';
    document.getElementById("code2").style.backgroundColor='transparent';
    document.getElementById("code3").style.backgroundColor='transparent';
    document.getElementById("code4").style.backgroundColor='transparent';
    document.getElementById("code5").style.backgroundColor='transparent';
    document.getElementById("code6").style.backgroundColor='transparent';
    if(name =="bubbleSort"){
        document.getElementById("code7").style.backgroundColor='transparent';
    }
}

function displaycode(name){
    if(name=='bubbleSort'){
        displayBubbleSort();
    }
    else if(name=='insertionSort')
    {
        displayInsertionSort();
    }
    else if(name=='selectionSort'){
        displaySelectionSort();
    }
}
function displayBubbleSort(){
    document.getElementById("codedisplay").innerHTML=`<h4 class="code" id="code1">do</h4>
    <h4 class="code" id="code2">swapped = false</h4>
    <h4 class="code" id="code3" style="padding-left:30px">for i = 1 to indexOfLastUnsortedElement-1</h4>
    <h4 class="code" id="code4" style="padding-left:50px">if leftElement > rightElement</h4>
    <h4 class="code" id="code5" style="padding-left:70px">swap(leftElement, rightElement)</h4>
    <h4 class="code" id="code6" style="padding-left:70px">swapped = true; ++swapCounter</h4>
    <h4 class="code" id="code7">while swapped</h4>`
}
function displaySelectionSort(){
    
    document.getElementById("codedisplay").innerHTML=`<h4 class="code" id="code1">repeat (numOfElements - 1) times</h4>
    <h4 class="code" style="color:#C0C0C0" id="code2">set the first unsorted element as the minimum</h4>
    <h4 class="code" style="color:#C0C0C0" id="code3">for each of the unsorted elements</h4>
    <h4 class="code" style="padding-left:30px; color:#c0c0c0;" id="code4">if element < currentMinimum</h4>
    <h4 class="code" style="padding-left:50px; color:#c0c0c0;" id="code5">set element as new minimum</h4>
    <h4 class="code" id="code6" style="padding-left:30px; color:#c0c0c0;">swap minimum with first unsorted position</h4>`
}
function displayInsertionSort(){

    document.getElementById("codedisplay").innerHTML=`<h4 class="code" id="code1">mark first element as sorted</h4>
    <h4 class="code" id="code2">Select the element X</h4>
    <h4 class="code" id="code3">for j = lastSortedIndex down to 0</h4>
    <h4 class="code" style="padding-left:30px" id="code4">if current element j > X</h4>
    <h4 class="code" style="padding-left:50px" id="code5">move sorted element to the right by 1</h4>
    <h4 class="code" style="padding-left:30px" id="code6">break loop </h4>`
}
