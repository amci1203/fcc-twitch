// NOTE: NOT THE FIRST FUNCTION TO RUN: go to getWeatherData
function init (data) {

    const
        dp          = (dps, n) => Math.round(n * Math.pow(10, dps)) / Math.pow(10, dps),
        _1dp        = dp.bind(null, 1),
        toCelsius   = F => _1dp((F - 32) / 1.8),
        toFarenheit = C => _1dp(C * 1.8 + 32),

        get  = id => document.getElementById(id),
        text = (elm, str) => elm.innerText(str),
        set  = (elm, attr, val) => elm.setAttribute(attr, val),

        city   = get('city'),
        icon   = get('icon'),
        units  = get('units'),
        value  = get('value'),
        toggle = get('toggle');


    console.log(data);
}

// getting the data before we start anything
(function getWeatherData () {

    const API_KEY = "c8de0e1057e67ef993b4ea7f052d7919";

    navigator.geolocation.getCurrentPosition(d => {
        const
            url = 'http://api.openweathermap.org/data/2.5/weather?' +
                `lat=${d.coords.latitude}&` +
                `lon=${d.coords.longitude}&` +
                'units=metric' +
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
    xhr.readyState === done && ok(xhr.status) ?
        callback( JSON.parse(xhr.responseText) ) : console.log(`${xhr.status}: ${xhr.responseText}`);
}
