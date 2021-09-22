let clockDigitalElement = document.querySelector('.data .relogio-digital');
let dayCurrent = document.querySelector('.data .data-atual');
document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfo();
        clockDigital();
        showWarning(`<i class="fas fa-spinner"></i> Loading...`);

        //Url da API Current Weather Data
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5b1a1cb5e55a030c805c778ffd9edd20&units=metric&lang=pt_br`;

        //Fazendo a requisição para essa URL.  E vamos pegar o resultado dela 

        let results = await fetch(url);
        
      
        //Pegando os resultados e transformando em objetos JavaScript, para conseguirmos ler o resultado , a let JSON contém as informações de cada cidade
        let json = await results.json();
    
        //Verificando se a cidade que o usuário procurou foi encontrada
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon : json.weather[0].icon,
                windSpeed : json.wind.speed,
                windAngle: json.wind.deg,
                humidity: json.main.humidity
            });
        }else{
            clearInfo();
            showWarning(`Localização não encontrada!`);
        }

    }else{
        clearInfo();
    }
});
//Função para mostrar as informações (Preencher a div resultado)
function showInfo(json){
    showWarning('');
 
    document.querySelector('.titulo').innerHTML = `<i class="fas fa-map-marker-alt"></i>&nbsp; ${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.umidadeInfo').innerHTML = `${json.humidity} <span>%</span>`;

    document.querySelector('.resultado').style.display = 'block';
}
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}
function showWarning(msg){
    document.querySelector('.aviso ').innerHTML =  msg;
}
function clockDigital(){
    let dateCurrent = new Date();
    let hour = dateCurrent.getHours();
    let minute = dateCurrent.getMinutes();
    let second = dateCurrent.getSeconds();

    let day = dateCurrent.getDate();
    let month = dateCurrent.getMonth();
    let year =  dateCurrent.getFullYear();

    clockDigitalElement.innerHTML = `<i class="fas fa-clock"></i>&nbsp; ${createZero(hour)}:${createZero(minute)}:${createZero(second)}`;
    dayCurrent.innerHTML = `<i class="far fa-calendar-alt"></i>&nbsp; ${createZero(day)} / ${createZero(month+1)} / ${year}`;
}
function createZero(time){
    if(time < 10){
        return '0'+time;
    }else{
        return time;
    }
}
setInterval(clockDigital, 1000);
clockDigital();