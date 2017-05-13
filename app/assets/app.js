(function Pomodoro (pomo) {

    if (!pomo) return false;

    getStringPrototypes();

    const
        get          = id => document.getElementById(id),
        byClass      = (elm, _class) => elm.querySelectorAll(`.${_class}`),
        inSeconds    = (n, isInMs) => isInMs ? n / 1000 : n * 60,
        text         = (elm, str) => elm.innerText = str,
        hasClass     = (elm, str) => elm.classList.contains(str),
        toggleClass  = (elm, str) => elm.classList.toggle(str),
        click        = (elm, fn)  => elm.addEventListener('click', fn),
        clickEach    = (list, fn) => list.forEach(elm => click(elm, fn)),

        toggle = get('toggle-play'),
        timer  = get('timer'),
        timerM = get('timer-minutes'),
        timerS = get('timer-seconds'),

        sessionSpan = get('session-length'),
        breakSpan   = get('break-length'),

        increments = byClass(pomo, 'increment'),

        second = 1000,
        minute = second * 60,

        startTimer  = () => start = setInterval(tick, second),
        pauseTimer  = () => clearInterval(start),
        resetTimer  = () => left = inSeconds( inMinutes(hasClass(timer, 'on-break') ? breakLen : sessionLen )),
        stopTimer   = () => {
            if (start) clearInterval(start);
            left = inSeconds(sessionLen);
            activateIncrementControls();
        },
        toggleTimer = () => {
            hasClass(toggle, 'play') ? startTimer() : pauseTimer();
            toggleClass(toggle, 'play');
        };
    let
        start,

        sessionLen = 25,
        breakLen   = 5,

        left = inSeconds(sessionLen);

    function tick () {
        left--
        text(timerM, String(Math.floor(left / 60)).padLeft(2,0));
        text(timerS, String(left % 60).padLeft(2,0));

        !left && toggleClass(timer, 'break') && ring() && resetTimer()
    }

    function incrementTimerLength () {
        const
            controls = this.parentElement.id.split(':')[1],
            increment = hasClass(this, 'increment-up') ? 1 : -1;

        if (controls === 'session') {
            sessionLen += increment;
            text(sessionSpan, sessionLen);
        }
        if (controls === 'break') {
            breakLen += increment;
            text(breakSpan, breakLen);
        }

        left = inSeconds(sessionLen);
    }

    return (() => {
        click(toggle, toggleTimer);
        clickEach(increments, incrementTimerLength);

        text(sessionSpan, sessionLen);
        text(breakSpan, breakLen);

        text(timerM, sessionLen);
        text(timerS, '00')
    })()

})(document.getElementById('pomodoro'))

function getStringPrototypes () {
    String.prototype.padLeft    = function (targetLength, padString) {
    if (this.length >= targetLength) return this;
    else {
        if (['number', 'string'].indexOf(typeof(padString)) !== -1) {
            const pad  = String(padString);
            let target = this.split('*');
            while (target.length < targetLength) {
                target.unshift(pad);
            }
            return target.join('');
        } else {
            throw new Error('Err: padString is not a number or string');
        }
    }
}
}
