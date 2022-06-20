function createIcon(value){
    let result = `http://openweathermap.org/img/wn/${value}@2x.png`
    return result
}

const current = document.querySelector('.current');
const forecast = document.querySelector('.forecast');

function createElem(tegName, content, nameClass, parent){
    let teg = document.createElement(tegName);
    teg.innerText = content;
    parent.appendChild(teg);
    teg.classList.add(nameClass);
}

function getForecast(linkAPI){
    let httpRequest = new XMLHttpRequest();

    httpRequest.onload = function(){
    
        let country = JSON.parse(httpRequest.responseText);
        createElem("p", country.city.name, "country", current)
    
        //-----------------//
    
        let data = JSON.parse(httpRequest.responseText);
        createElem("p", data.list[0].dt_txt, "time", current) //TIME
    
        //-----------------//
    
        let icon = JSON.parse(httpRequest.responseText);
        let iconId = icon.list[0].weather[0].icon;
    
        //-----------------//
    
        let linkIcon = createIcon(iconId);
        const images = document.createElement('IMG');
        images.setAttribute('src', linkIcon);
        images.classList.add('imgce')
        current.appendChild(images);  //  Images
    
        //-----------------//
    
        let weather = JSON.parse(httpRequest.responseText);
        createElem("H2", Math.round(weather.list[0].main.temp), "weather", current)//Weather
    
        //-----------------//
       //-----------------//
    
       for(let i = 0; i < 40; i +=8){
           createElem("div", '', "row", forecast)
    
            let weather = JSON.parse(httpRequest.responseText);
            createElem("p", Math.round(weather.list[i].main.temp), "weatherforecast", forecast);
            let icon = JSON.parse(httpRequest.responseText);
            let iconId = icon.list[i].weather[0].icon;
    
            //-----------------//
    
            let linkIcon = createIcon(iconId);
            const images = document.createElement('IMG');
            images.setAttribute('src', linkIcon);
            images.classList.add('imgcebott')
            forecast.appendChild(images); 
    
    
            let data = JSON.parse(httpRequest.responseText);
            createElem("p", data.list[i].dt_txt, "time", forecast);
       }
    
    }
    
    httpRequest.open("GET", linkAPI);
    
    httpRequest.send();
}

navigator.geolocation.getCurrentPosition(
    function(position) {
	    // alert('Последний раз вас засекали здесь: ' +
		//     position.coords.latitude + ", " + position.coords.longitude);

                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
    
                let link = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=248dee22376dff44b5f737f243fc02c6`
                getForecast(link)
	}
);







