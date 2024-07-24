window.onload=initAll;

var springArr = [1, 2, 5];
var summerArr = [3, 1, 4];
var autumnArr = [1, 3, 5];
var winterArr = [4, 1, 1];
var xValues = [1, 2, 3]


function initAll()
{
    document.getElementById("startBtn").addEventListener("click",Start,false);
    document.getElementById("restartBtn").addEventListener("click",Restart,false);
    document.getElementById("pauseBtn").addEventListener("click",Pause,false);  
    document.getElementById("executebtn").addEventListener("click",ExecuteTrade,false);
    var e=document.getElementsByClassName("trade1");
    for(var i = 0; i < e.length; i++){
        e[i].addEventListener("click", Trade1, false);
    }
    var a=document.getElementsByClassName("trade2");
    for(var i = 0; i < a.length; i++){
        a[i].addEventListener("click", Trade2, false);
    }    
    document.getElementById("pauseBtn").disabled=true;
    document.getElementById("date").value=d.getDate()+"/"+ (d.getMonth()+1)+"/"+d.getFullYear();

    var mychart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: springArr,
                borderColor: "#afb84e",
                fill: false,
                label: "Spring"
            }, {
                data: summerArr,
                borderColor: "#e06e22",
                fill: false,
                label: "Summer"
            }, {
                data: autumnArr,
                borderColor: "#f9a825",
                fill: false,
                label: "Autumn"
            }, {
                data: winterArr,
                borderColor: "#04aaf7",
                fill: false,
                label: "Winter"
            }]
        },
        options: {
            legend: { display: true }
        }
    });



}

var d=new Date();
d.setFullYear(2021,8,5);
var id,id2,id3,id4;
var counter=0;
var flag;

var initial_relative_prices={
    spring: "168",
    summer: "140",
    autumn: "120",
    winter: "105"
};

function Pause()
{
        clearInterval(id);
        clearInterval(id2);
        clearInterval(id3);
        this.disabled=true;
        document.getElementById("startBtn").disabled=false;
}
function new_rates()
{
    let obj= getobj();
    if(counter%4==0)
    {
        obj.spring=obj.spring/2;
    }
    else if(counter%4==1)
    {
        obj.summer=obj.summer/2;
    }
    else if(counter%4==2)
    {
        obj.autumn=obj.autumn/2;
    }
    else
    {
        obj.winter=obj.winter/2;
    }
    console.log(obj);
    counter++;
}
function new_balance()
{
    let obj=getobj();
    document.getElementById("tokenSpring").value=Number(document.getElementById("tokenSpring").value)+Number(obj.spring);
    spring_balance = document.getElementById("tokenSpring").value;
    document.getElementById("tokenSummer").value=Number(document.getElementById("tokenSummer").value)+Number(obj.summer);
    summer_balance = document.getElementById("tokenSummer").value;
    document.getElementById("tokenAutumn").value=Number(document.getElementById("tokenAutumn").value)+Number(obj.autumn);
    autumn_balance = document.getElementById("tokenAutumn").value;
    document.getElementById("tokenWinter").value=Number(document.getElementById("tokenWinter").value)+Number(obj.winter);
    winter_balance = document.getElementById("tokenWinter").value;

    document.getElementById("tokenTotal").value = Number(document.getElementById("tokenSpring").value) + Number(document.getElementById("tokenSummer").value) + Number(document.getElementById("tokenAutumn").value) + Number(document.getElementById("tokenWinter").value);
}
function nextday()
{
    d.setDate(d.getDate() + 1);
    document.getElementById("date").value=d.getDate()+"/"+ (d.getMonth()+1)+"/"+d.getFullYear();
    if (d.getFullYear()=='2031' && d.getDate()=='5' && d.getMonth()=='8') {
        alert("Your Total Tokens are:", document.getElementById("tokenTotal").value)
        clearInterval(id);
    }
}
function absolute_price(n)
{
    return 840/n;
}
function relative_price(a,b)
{
    return absolute_price(a)/mean_price(b);
}
function mean_price(a)
{
    let price=absolute_price(a.spring)+ absolute_price(a.summer)+absolute_price(a.autumn)+absolute_price(a.winter);
    price=price/4;
    return price;
}
function getobj()
{
    return initial_relative_prices;
}
let obj=getobj();
var springPrice = relative_price(obj.spring,obj);
var summerPrice = relative_price(obj.summer,obj);
var autumnPrice = relative_price(obj.autumn,obj);
var winterPrice = relative_price(obj.winter,obj);

var spring_balance = 100;
var summer_balance = 100;
var autumn_balance = 100;
var winter_balance = 100;

function Start(event){

    flag=false;
    id=setInterval(nextday,83.3333);
    this.disabled=true;
    document.getElementById("pauseBtn").disabled=false;
    document.getElementById("tokenSpring").value = spring_balance;
    document.getElementById("tokenSummer").value = summer_balance;
    document.getElementById("tokenAutumn").value = autumn_balance;
    document.getElementById("tokenWinter").value = winter_balance;
    document.getElementById("priceSpring").value = springPrice;
    document.getElementById("priceSummer").value = summerPrice;
    document.getElementById("priceAutumn").value = autumnPrice;
    document.getElementById("priceWinter").value = winterPrice;
    id2=setInterval(new_price,83.3333);
    id3=setInterval(new_balance,0.5787);
    id4=setInterval(new_rates,22500);
    var springBalance = document.getElementById("tokenSpring").value;
    var summerBalance = document.getElementById("tokenSummer").value;
    var autumnBalance = document.getElementById("tokenAutumn").value;
    var winterBalance = document.getElementById("tokenWinter").value;

    document.getElementById("tokenTotal").value = Number(springBalance) + Number(summerBalance) + Number(autumnBalance) + Number(winterBalance);
    event.preventDefault();
}
function new_price()
{
    let obj=getobj();
    document.getElementById("priceSpring").value =(document.getElementById("priceSpring").value *0.99)+(0.01*(1/obj.spring)); 
    springPrice = document.getElementById("priceSpring").value;
    document.getElementById("priceSummer").value =(document.getElementById("priceSummer").value *0.99)+(0.01*(1/obj.summer)); 
    summerPrice = document.getElementById("priceSummer").value;
    document.getElementById("priceAutumn").value =(document.getElementById("priceAutumn").value *0.99)+(0.01*(1/obj.autumn)); 
    autumnPrice = document.getElementById("priceAutumn").value;
    document.getElementById("priceWinter").value =(document.getElementById("priceWinter").value *0.99)+(0.01*(1/obj.winter)); 
    winterPrice = document.getElementById("priceWinter").value;
}
function Restart(event){
    document.getElementsByTagName("body")[0].reset();
    if (flag!=true) 
    {
        StopTime();
        d.setFullYear(2021,8,5);
        document.getElementById("date").value=d.getDate()+"/"+ (d.getMonth()+1)+"/"+d.getFullYear();
        console.log(d);
        document.getElementById("startBtn").disabled=false;
        document.getElementById("pauseBtn").disabled=true;
    }
    flag=true;
}

var balance = 0,index,index1;
var balance2 = 0;
function Trade1()
{
    this.style.border = "2px solid black"
    if(this.id === "springbtn"){
        document.getElementById("tradeSpring").setAttribute('value', spring_balance);
        balance = spring_balance;
        document.getElementById("freeform").innerHTML = `Trade ${balance} Spring Tokens`;
        index=0;
    }else if(this.id === "summerbtn"){
        document.getElementById("tradeSummer").setAttribute('value', summer_balance);
        balance = summer_balance;
        document.getElementById("freeform").innerHTML = `Trade ${balance} Summer Tokens`;
        index=1;
    }else if(this.id === "autumnbtn"){
        document.getElementById("tradeAutumn").setAttribute('value', autumn_balance);
        balance = autumn_balance;
        document.getElementById("freeform").innerHTML = `Trade ${balance} Autumn Tokens`;
        index=2;
    }else if(this.id == "winterbtn"){
        document.getElementById("tradeWinter").setAttribute('value', winter_balance);
        balance = winter_balance;
        document.getElementById("freeform").innerHTML = `Trade ${balance} Winter Tokens`;
        index=3;
    }
}

function Trade2(){
    this.style.border = "2px solid black"

    if(this.id === "forspring"){
        balance2 = balance * springPrice
        document.getElementById("tradeforSpring").setAttribute('value', balance2);
        document.getElementById("freeform").innerHTML += ` for ${balance2} Spring tokens`;
        index1 = 0;
    }else if(this.id === "forsummer"){
        balance2 = balance * summerPrice;
        document.getElementById("tradeforSummer").setAttribute('value', balance2);
        document.getElementById("freeform").innerHTML += ` for ${balance2} Summer tokens`;
        index1 = 1;
    }else if(this.id === "forautumn"){
        balance2 = balance * autumnPrice;
        document.getElementById("tradeforAutumn").setAttribute('value', balance2);
        document.getElementById("freeform").innerHTML += ` for ${balance2} Autumn tokens`;
        index1 = 2;
    }else if(this.id == "forwinter"){
        balance2 = balance * winterPrice;
        document.getElementById("tradeforWinter").setAttribute('value', balance2);
        document.getElementById("freeform").innerHTML += ` for ${balance2} Winter tokens`;
        index1 = 3;

    }
}

function ExecuteTrade(){
    if(index===0){
        document.getElementById("tokenSpring").value = Number(document.getElementById("tokenSpring").value) - balance; 
    }else if(index===1){
        document.getElementById("tokenSummer").value = Number(document.getElementById("tokenSummer").value) - balance; 
    }else if(index===2){
        document.getElementById("tokenAutumn").value = Number(document.getElementById("tokenAutumn").value) - balance; 
    }else if(index===3){
        document.getElementById("tokenWinter").value = Number(document.getElementById("tokenWinter").value) - balance; 
    }

    if(index1===0){
        document.getElementById("tokenSpring").value = Number(document.getElementById("tokenSpring").value) + balance2; 
    }else if(index1===1){
        document.getElementById("tokenSummer").value = Number(document.getElementById("tokenSummer").value) + balance2; 
    }else if(index1===2){
        document.getElementById("tokenAutumn").value = Number(document.getElementById("tokenAutumn").value) + balance2; 
    }else if(index1===3){
        document.getElementById("tokenWinter").value = Number(document.getElementById("tokenWinter").value) + balance2; 
    }

    var e = document.getElementsByClassName("tradeA");
    for(var i of e){
        i.value = ""
    }

    document.getElementById("freeform").value = "";
}

setInterval(updateChart, 1000)

function updateChart(){
    xValues.push(4);
    summerArr.push(2);
    mychart.render();
}