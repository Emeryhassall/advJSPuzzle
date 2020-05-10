// ******************** practice puzzles *************************
// Solve the below 3 javascript puzzles. 
// The goal of this challenge is to practice our logic skills. 
// Something that is useful not only in interviews when you get challenging problems, 
// but also in your day to day work as a developer.
// First, start off by reading this article: https://medium.freecodecamp.org/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2


// ******************** q1 *************************

// Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], 
// make a function that organizes these into individual array that is ordered. 
// For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
// Bonus: Make it so it organizes strings differently from number types.
//  i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

const sortByType = inputArray => {

    let current = [];
    let stringArray = [];
    let numArray = [];

    for (let i = 0; i <= inputArray.length; i++) {

        current = inputArray[i];
        let typeOf = typeof current;

        if (typeof current === 'string') {
            stringArray.push(current);
            //console.log(stringArray)
        } else if (typeof current === 'number') {
            numArray.push(current);
            //console.log(numArray);
        }

    }
    return [numArray, stringArray];
}

const groupToSortedArray = inputArray => {

    inputArray = inputArray.sort((a, b) => a - b);

    let currentNum = inputArray[0];
    let tempNum = [];
    let groupedNumArray = [];

    for (let i = 0; i <= inputArray.length; i++) {

        if (inputArray[i] != currentNum) {

            currentNum = inputArray[i];
            if (tempNum.length > 1) {
                groupedNumArray.push(tempNum)
            } else if (tempNum.length === 1) {

                groupedNumArray.push(inputArray[i - 1]);
            }

            tempNum = [];
        }
        tempNum.push(inputArray[i]);

    }
    return groupedNumArray;

}

const cleanRoom = inputArray => {

    let sortedArray = sortByType(inputArray);
    //console.log(sortedArray);
    let numArray = sortedArray[0];
    let stringArray = sortedArray[1];

    let groupedNumArray = groupToSortedArray(numArray);
    // console.log(groupedNumArray);
    let groupedStringArray = groupToSortedArray(stringArray);
    //console.log(stringArray);

    if (groupedStringArray.length === 0) { //change to switch statement;
        return groupedNumArray;
    }
    if (groupedNumArray.length === 0) {
        return groupedStringArray;

    } else {
        return [groupedNumArray, groupedStringArray];
    }

}


//************************************** question two **********************/

// Write a javascript function that takes an array of numbers and a target number.
//  The function should find two different numbers in the array that,
//  when added together, give the target number.
//  For example: answer([1,2,3], 4)should return [1,3]

const findSumTarget = (inputArray, target)=> {

    let answer=[];
    let tempAnswer=[];

for (let i=0; i<inputArray.length;i++){

    if(answer.length===0){
        for (let j=i+1 ;j<inputArray.length;j++){

            if(inputArray[i]+inputArray[j]===target){
            tempAnswer.push ([inputArray[i],inputArray[j]])
            //console.log(tempAnswer);

            }
        }
    }
}
    return tempAnswer;
}


//**************************** question 3  *****************************/

// Write a function that converts HEX to RGB.
// Then Make that function auto-dect the formats
// so that if you enter HEX color format it returns RGB
// and if you enter RGB color format it returns HEX.

const hexToRGB = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const rgbToHex = (r,g,b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

}

const checkHex = input => {
    var check, code, len;
    if(typeof input == 'string') {        // check it's a string
        if(input[0] === "#") {            // and it starts with #
            len = input.length;
            // if (len === 4 || len === 7 || len == 5 || len == 9) { // 5 and 9 for #RGBA and #RRGGBBAA
            if (len === 4 || len === 7) { // and it's 4 or 7 characters
                input = input.toLowerCase(); // convert to lower case
                // parse it as hex and output as hex with # prefix
                check = '#' + ('00000000' + parseInt(input.substr(1), 16).toString(16)).substr(1 - len);
                // check it's the same number
                return check === input;
            }
        }
    }
    // all other conditions fall thru to here
    return false;
}

const checkRgb = input => {
    let flag=false;
    let colorobj={message: 'NOT A VALID RGB INPUT --> CHECK FORMAT MATCHES rgb(r,g,b)'};
    let color= input;
    let matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    let match = matchColors.exec(color);
    if (match !== null) {
    colorobj = {Red: match[1],Green: match[2], Blue:  match[3]};
    flag=true;
}
  
    return [colorobj, flag];

}

const convertColor = color => {
    
    let answer =[];
    let isRGB = checkRgb(color)[1];
    let isHex = checkHex(color);
    let rgb = checkRgb(color)[0];

    if(isRGB===true){

        let r = parseInt(rgb.Red,10); //converts string to int 
        let g= parseInt(rgb.Green,10);
        let b= parseInt(rgb.Blue,10);

        answer = rgbToHex(r,g,b);
    }

    else if (isHex===true){
        answer=hexToRGB(color);
    }
    return answer;
}


// ******************** q1 *************************

const input = [1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20]
const stringTest = [1, '1', 3, '1', 2, '2', 56, '3', '3'];
//console.log(input.sort((a,b)=>a-b))

let grouped = cleanRoom(input);
grouped;


let groupedAndSorted = cleanRoom(stringTest);
groupedAndSorted;

// ******************** q2 *************************

let q2Test=[1,2,3,4,5,6,7,8,9,10];
let target =14;

let answ2 = findSumTarget(q2Test,target);
answ2;

// ******************** q3 *************************

console.log(rgbToHex(0,245,100));
console.log(hexToRGB('#00f564'));
console.log(checkHex('#00f546'))
console.log(checkRgb('rgb(0, 245, 100)'));
console.log(checkRgb('rgb(110, 2450, 100)'));
console.log(convertColor('rgb(0, 245, 100)'));
console.log(convertColor('#00f564'));

