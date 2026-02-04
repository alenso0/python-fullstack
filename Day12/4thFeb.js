let clickCount = 0;

function increaseCount() {
    clickCount++;
    document.getElementById('clickDisplay').textContent = clickCount;
}
function fun1(){
    document.getElementById('txt1').innerHTML="You clicked the button!";
}
function fun2(){
    document.getElementById('txt2').innerHTML="Hello Welcome to JavaScript";
}

document.getElementById('clickButton').addEventListener('click', increaseCount);