var listParagraph = [
  "hai con thằng lằn con đùa nhau cắn nhau đứt con chym non",
  "ba thương con vì con giống mẹ đi vắng con sang chơi nhà bà í a í a",
  "một hai ba bốn năm sáu bảy tám chín mười"
]
var indexArr;
var paragraph;
var eWordGiven = document.getElementsByClassName("word");
var eText = document.getElementById("text");
var eInputed = document.getElementById("inputed");
var eInputText = document.getElementById("input");
var eResultTrue = document.getElementById("result-true");
var eResultFalse = document.getElementById("result-false");
var eTime = document.getElementById("time");
var eResult = document.getElementById("result");

function randomParagraph(listParagraph) {
  let result = listParagraph[Math.floor(Math.random() * listParagraph.length)];
  return result;
}
// Khoi tao

function init() { 
  eInputText.focus();
  eResultTrue.innerText = 0;
  eResultFalse.innerText = 0;
}

function loadParagraph(string) {
  let arrWord = string.split(' ');
  for(let i = 0; i < arrWord.length; i++) {
    eText.innerHTML += '<span class="word">' + arrWord[i] + '</span>'
  }
}
init();

// Dùnng keydown để thực thi hàm ngay sau khi gõ phím xuống
// Hàm sẽ được thực thi trước giá trị khi xuất hiện giá trị của input
eInputText.addEventListener('keydown', checkWord);

/*
  Cách thức hoạt động:
  - Tách chuỗi cho trước thành mảng
  - Bắt đầu từ vị trí đầu tiên so sánh với giá trị của ô input
  - Nếu bấm phím cách thì ô input sẽ reset sau đó vị trí tăng thêm 1
  - Cứ tiếp tục cho tới vị trí cuối cùng
*/


function checkWord(e) {
  let SPACE_KEY = " ";
  let arrWord = paragraph.split(' '); // Tách chuỗi
  let valueInput = eInputText.value;
  let cTrue = parseInt(eResultTrue.innerText);
  let cFalse = parseInt(eResultFalse.innerText);
  // console.log(e);

  // e.keyCode: wee->lỗi
  if (e.key === SPACE_KEY) {
    eInputed.innerText += valueInput; // Hiển thị đoạn input đã nhập
    
    // Trước khi ô input reset thì dấu cách vẫn còn 
    // do đó phải trim để xóa dấu cách
    if (valueInput.trim() === arrWord[indexArr]) {
      setCountTrue(cTrue);
      setColorTrue(eWordGiven[indexArr]);
    }
    else {
      setCountFalse(cFalse);
      setColorFalse(eWordGiven[indexArr]);
    }
    eInputText.value = ''; // Reset lại ô input sau khi nhấm phím cách
    indexArr++;
    if (indexArr < arrWord.length) {
      eWordGiven[indexArr].style.backgroundColor  = "silver";
      eWordGiven[indexArr-1].style.backgroundColor  = "white";
    } else {
      startNewParagraph();
    }
  }
}

function setColorTrue(element) {
  element.style.color = "green";
}

function setColorFalse(element) {
  element.style.color = "red";
}

function setCountTrue(count) {
  eResultTrue.innerText = ++count;
}

function setCountFalse(count) {
  eResultFalse.innerText = ++count;
}

function startNewParagraph() {
  paragraph = randomParagraph(listParagraph);
  eText.innerHTML = '';
  loadParagraph(paragraph);
  indexArr = 0;
  eWordGiven[indexArr].style.backgroundColor  = "silver";
}

function runTime(seconds) {
  startNewParagraph();
  let i = seconds;
  eTime.innerText = seconds;
  let intervalID = setInterval(function(){
    eTime.innerText = --i;
    if(i === 0) {
      clearInterval(intervalID);
      eInputText.disabled  = true;
    }
  },1000);
}

runTime(35);
