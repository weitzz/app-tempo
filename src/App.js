import React, {useState} from 'react';
import axios from 'axios';
const api ={
  key: "85ea258fc09546b82c66d34fbe97196d",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery]= useState('');
  const [weather,setWeather]= useState({});
  const search = evt =>{
    if(evt.key ==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res =>res.json())
      .then(result =>{
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  //DATAS///
  const dateBuilder = (d)=>{
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    let day= days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined")?
    ((weather.main.temp>25)
    ? 'app warm':'app')
    :'app'}>
      <main>
        <div className="search-box">
        <input type="text" className="search-bar" placeholder="Buscar..." onChange={e=> setQuery(e.target.value)} value={query} onKeyPress={search}/>
    </div>
    {(typeof weather.main != "undefined") ?(
    <div>
    <div className="location-box">
      <div className="location">{weather.name}-{weather.sys.country}</div>
      <div className="date">{dateBuilder(new Date())}</div>
    </div>
    <div className="weather-box">
      <div className="temp">
        {Math.round(weather.main.temp)}ºc
      </div>
      <div className="temp-max-min">
        Min: {Math.round (weather.main.temp_min)}ºc
        Max: {Math.round(weather.main.temp_max)}ºc
      </div>
      <div className="humidity"> Humidade no ar: {Math.round(weather.main.humidity)}% </div>
      </div>
      </div>
    ) : ('')}
    </main>
    </div>
  );
}

export default App;
