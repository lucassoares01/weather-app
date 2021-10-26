document.querySelector('.searchForm').addEventListener('submit', searchResult)

async function searchResult(e){
    e.preventDefault()

    let input = document.querySelector('#searchInput').value
    if(input === ''){
        showWarning('Insert a valid city !')
    } else{
        showWarning('Loading ...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&appid=d06cdb298fafc83c520d5ab677fc477e`
        
        let results = await fetch(url)
        let json = await results.json()

        if(json.cod !== 200){
            showWarning('City Not Founded')
        } else{
            showInfo(json)
        }
    
    }
}

function showInfo(info){
    showWarning('')

    let {
        name,
        sys: {country},
        main: {temp},
        weather: {0: {icon}},
        weather: {0: {description}},
        wind: {speed}
    } = info

    document.querySelector('.result').style.display = 'block'
    document.querySelector('.title').innerHTML = `${name}, ${country}`
    document.querySelector('.weatherDetails img').setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
    document.querySelector('.weatherInfo').innerHTML = `${description}`
    document.querySelector('.tempInfo').innerHTML = `${temp.toFixed(0)} ºC`
    document.querySelector('.windInfo span').innerHTML = `${speed}`
}

function showWarning(msg){
    document.querySelector('.result').style.display = 'none'
    document.querySelector('.warning').innerHTML = msg
}