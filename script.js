let options = document.querySelectorAll('nav ul li a');

options.forEach((opt) => {
    opt.addEventListener("click", () => {
        options.forEach((opt_) => {
            opt_.classList.remove("active");
        });

        opt.classList.add("active");
    });
});

{
    let option1Box = document.querySelector('.option-1');

    setInterval(() => {
        const now = new Date();
        let hours = now.getHours();
        let end = "AM";

        if (hours >= 12) {
            end = "PM";
            if (hours > 12) {
                hours -= 12;
            }
        } else if (hours === 0) {
            hours = 12;
        }

        hours = hours.toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        document.querySelector('#div-1').innerHTML = `${hours}:${minutes}:${seconds} ${end}`;
        document.querySelector('#div-2').innerHTML = now.toDateString();

    }, 1000)
}

options.forEach((opt, index) => {
    opt.addEventListener("click", () => {
        options.forEach((opt_, index_) => {
            document.querySelector(`.option-${index_ + 1}`).style.display = "none";
        });
        document.querySelector(`.option-${index + 1}`).style.display = "flex";
    });
});


{


    const timerBox = document.querySelector('.timer-box');
    const startBtn = document.querySelector('.button-box button:first-child');
    const flagBtn = document.querySelector('.button-box button:last-child');
    const rightDiv = document.querySelector('.right-div');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 1;


    function formatMainTime(time) {
        let diff = time;
        let hours = Math.floor(diff / 3600000);
        diff = diff % 3600000;
        let minutes = Math.floor(diff / 60000);
        diff = diff % 60000;
        let seconds = Math.floor(diff / 1000);
        return (
            (hours < 10 ? "0" : "") + hours + ":" +
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds
        );
    }


    function formatLapTime(time) {
        let diff = time;
        let hours = Math.floor(diff / 3600000);
        diff = diff % 3600000;
        let minutes = Math.floor(diff / 60000);
        diff = diff % 60000;
        let seconds = Math.floor(diff / 1000);
        let milliseconds = diff % 1000;
        return (
            (hours < 10 ? "0" : "") + hours + ":" +
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds + "." +
            (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
        );
    }


    function updateDisplay() {
        const currentTime = Date.now() - startTime + elapsedTime;
        timerBox.textContent = formatMainTime(currentTime);
    }


    startBtn.addEventListener('click', function () {
        if (!isRunning) {

            startTime = Date.now();
            timerInterval = setInterval(updateDisplay, 1000);
            isRunning = true;
            this.textContent = 'Stop';
            flagBtn.textContent = 'Flag';
        } else {

            clearInterval(timerInterval);
            elapsedTime += Date.now() - startTime;
            isRunning = false;
            this.textContent = 'Start';
            flagBtn.textContent = 'Reset';
        }
    });


    flagBtn.addEventListener('click', function () {
        if (isRunning) {

            const lapTime = Date.now() - startTime + elapsedTime;
            const lapItem = document.createElement('div');
            lapItem.innerHTML = `&rarr; Lap ${lapCount}: ${formatLapTime(lapTime)}`;
            rightDiv.prepend(lapItem);
            lapCount++;
        } else {

            clearInterval(timerInterval);
            elapsedTime = 0;
            timerBox.textContent = '00:00:00';
            startBtn.textContent = 'Start';
            this.textContent = 'Flag';
            rightDiv.innerHTML = '';
            lapCount = 1;
        }
    });
}




{
    document.querySelector('.alarm-start-btn').addEventListener("click", () => {
        let this_hh = parseInt(document.querySelector('#hh').value);
        let this_mm = parseInt(document.querySelector('#mm').value);
        let this_ss = parseInt(document.querySelector('#ss').value);

        if (isNaN(this_hh) || isNaN(this_mm) || isNaN(this_ss)) {
            alert("Please enter valid numbers for hours, minutes, and seconds.");
            return;
        }

        function formatTime(time) {
            return time.toString().padStart(2, '0');
        }

        let this_alarm = document.createElement("div");
        this_alarm.innerHTML = `&rarr; Alarm set for ${formatTime(this_hh)}:${formatTime(this_mm)}:${formatTime(this_ss)}`;
        this_alarm.className = "set-alarm";

        document.querySelector('.right-side').prepend(this_alarm);


        let alarms = Array.from(document.querySelectorAll('.set-alarm'));
        alarms.sort((a, b) => {
            let timeA = a.textContent.match(/(\d+):(\d+):(\d+)/);
            let timeB = b.textContent.match(/(\d+):(\d+):(\d+)/);
            return new Date(0, 0, 0, timeA[1], timeA[2], timeA[3]) - new Date(0, 0, 0, timeB[1], timeB[2], timeB[3]);
        });
        alarms.forEach(alarm => document.querySelector('.right-side').appendChild(alarm));


        document.querySelector('#hh').value = '';
        document.querySelector('#mm').value = '';
        document.querySelector('#ss').value = '';

        let checker = setInterval(() => {
            let now = new Date();

            if (now.getHours() === this_hh && now.getMinutes() === this_mm && now.getSeconds() === this_ss) {
                console.log("Alarm triggered!");
                let audio = new Audio('alarm.mp3');
                audio.play();
                this_alarm.remove();
                clearInterval(checker);
            }
        }, 1000);
    });
}

{

    let timerRunning = false;

    document.querySelector('.timer-start-btn').addEventListener("click", () => {

        let this_hh = parseInt(document.querySelector('#hh-2').value);
        let this_mm = parseInt(document.querySelector('#mm-2').value);
        let this_ss = parseInt(document.querySelector('#ss-2').value);

        if (isNaN(this_hh) || isNaN(this_mm) || isNaN(this_ss)) {
            alert("Please enter valid numbers for hours, minutes, and seconds.");
            return;
        }

        if (timerRunning == true) {
            alert("Only one Timer can Run At a time !");
            return;
        }

        else {
            timerRunning = true;
        }

        let totalMilli = this_hh * 60 * 60 * 1000 + this_mm * 60 * 1000 + this_ss * 1000;
        let timeStart = Date.now();

        let timer = setInterval(() => {

            let currentTime = Date.now();
            let timeSpend = currentTime - timeStart;
            let timeLeft = totalMilli - timeSpend;

            if (timeLeft <= 0) {
                clearInterval(timer);

                let audio = new Audio('alarm.mp3');
                audio.play();

                document.querySelector('.right-part').innerHTML = "Set A Timer !";
                timerRunning = false;

                document.querySelector('#hh-2').value = "";
                document.querySelector('#mm-2').value = "";
                document.querySelector('#ss-2').value = "";
            } else {

                let hourLeft = Math.floor(timeLeft / (1 * 60 * 60 * 1000));
                timeLeft %= 3600000;

                let minLeft = Math.floor(timeLeft / (60 * 1000));
                timeLeft %= 60000;

                let secLeft = Math.floor(timeLeft / 1000);
                timeLeft %= 1000;

                let milliLeft = timeLeft;

                document.querySelector('.right-part').innerHTML =
                    `${hourLeft.toString().padStart(2, '0')} : ${minLeft.toString().padStart(2, '0')} : ${secLeft.toString().padStart(2, '0')} : ${milliLeft.toString().padStart(3, '0')}`;
            }

        }, 1);

    });
}