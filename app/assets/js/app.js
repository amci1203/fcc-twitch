(function () {
    const API_KEY = "c8de0e1057e67ef993b4ea7f052d7919";

    console.log("...running");

    navigator.geolocation.getCurrentPosition(d => {
        const
            url = `http://api.openweathermap.org/data/2.5/weather?lat=${d.coords.latitude}&lon=${d.coords.longitude}&id=524901&APPID=${API_KEY}`,
            xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.send(null)
        xhr.onreadystatechange = () => {
            const done = 4, ok = 200;
            let data;
            if (xhr.readyState === done) {
                if (xhr.status === ok) {
                    data = JSON.parse(xhr.responseText);
                } else {
                    console.log("Error: " + xhr.status);
                }
            }

            console.log(data);
        }
    });
})()
