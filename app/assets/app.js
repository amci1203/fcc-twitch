const
    dp          = (dps, n) => Math.round(n * Math.pow(10, dps)) / Math.pow(10, dps),
    _1dp        = dp.bind(null, 1),
    toCelsius   = F => _1dp((F - 32) / 1.8),
    toFarenheit = C => _1dp(C * 1.8 + 32),

    get  = id => document.getElementById(id),
    text = (elm, str) => str ? elm.innerText = str : elm.innerText,
    set  = (elm, attr, val) => elm.setAttribute(attr, val),

    main  = get('info'),
    city  = get('city'),
    icon  = get('icon'),
    units = get('units'),
    value = get('value'),
    desc  = get('description'),

    defaultUnit = 'C';

function init (data) {
    // DONE LOADING
    document.documentElement.classList.remove('page-lock', 'loading');
    main.classList.remove('hidden');

    console.log(data);

    text(city, data.name);
    text(value, data.main.temp - 273.15);
    text(desc, data.weather[0].description);

    // EVENTS //

    units.addEventListener('click', toggleUnits);

}

text(units, defaultUnit);

// getting the data before we start anything
(function getWeatherData () {

    const API_KEY = "c8de0e1057e67ef993b4ea7f052d7919";

    navigator.geolocation.getCurrentPosition(d => {
        const
            url = 'http://api.openweathermap.org/data/2.5/weather?' +
                `lat=${d.coords.latitude}&` +
                `lon=${d.coords.longitude}&` +
                `id=524901&APPID=${API_KEY}`
            ,
            xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.send(null);
        xhr.onreadystatechange = () => isOk(xhr, init);
    });

})()

function isOk (xhr, callback) {
    const done = 4, ok = stat => stat >= 200 && stat < 300;
    return xhr.readyState === done && ok(xhr.status) ?
        callback( JSON.parse(xhr.responseText) ) : false;
}

function toggleUnits () {
    const
        temp = text(value),
        isInCelsius = text(units) === 'C';
    text(value, isInCelsius ? toFarenheit(temp) : toCelsius(temp));
    text(units, isInCelsius ? 'F' : 'C');
}
