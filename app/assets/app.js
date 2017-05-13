(function Pomodoro (pomo) {

    if (!pomo) return false;

    getStringPrototypes();

    const
        get          = id => document.getElementById(id),
        byClass      = (elm, _class) => elm.querySelectorAll(`.${_class}`),
        // takes either a number in ms to reduce to minutes or a whole number (in minutes) to multiply to seconds
        inSeconds    = (n, isInMs) => isInMs ? n / 1000 : n * 60,
        text         = (elm, str) => elm.innerText = str,
        hasClass     = (elm, str) => elm.classList.contains(str),
        toggleClass  = (elm, str) => [...arguments].splice(1).forEach(cls => elm.classList.toggle(cls)),
        click        = (elm, fn)  => elm.addEventListener('click', fn),
        clickEach    = (list, fn) => list.forEach(elm => click(elm, fn)),

        toggle = get('toggle-play'),
        timer  = get('timer'),
        timerC = get('timer-container'),
        timerM = get('timer-minutes'),
        timerS = get('timer-seconds'),

        sessionSpan = get('session-length'),
        breakSpan   = get('break-length'),

        increments = byClass(pomo, 'increment'),
        alarm = get('alarm'),

        second = 1000,
        minute = second * 60,

        breakClass = 'on-break',

        startTimer  = () => {
            start = setInterval(tick, second);
            disableIncrementControls();
        },

        pauseTimer  = () => clearInterval(start),

        resetTimer  = () => left = inSeconds(hasClass(timerC, breakClass) ? breakLen : sessionLen ),

        stopTimer   = () => {
            if (start) clearInterval(start);
            resetTimer();
            activateIncrementControls();
        },

        toggleTimer = () => {
            hasClass(toggle, 'play') ? startTimer() : pauseTimer();
            toggleClass(toggle, 'play', 'pause');
        },

        disableIncrementControls = () => increments.forEach(elm => elm.setAttribute('disbabled', 'disabled')),
        activatedisableIncrementControls = () => increments.forEach(elm => elm.removeAttribute('disabled')),

        ring = () => alarm.play();
    let
        start,

        sessionLen = 0.1,
        breakLen   = 5,

        left = inSeconds(sessionLen);

    function tick () {
        left--
        text(timerM, String(Math.floor(left / 60)).padLeft(2,0));
        text(timerS, String(left % 60).padLeft(2,0));

        !left && toggleClass(timerC, breakClass) && ring() && resetTimer()
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

        left++;
        tick();
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
