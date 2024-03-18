//copied calendar functions
(function () { Date.prototype.deltaDays = function (c) { return new Date(this.getFullYear(), this.getMonth(), this.getDate() + c) }; Date.prototype.getSunday = function () { return this.deltaDays(-1 * this.getDay()) } })();
function Week(c) { this.sunday = c.getSunday(); this.nextWeek = function () { return new Week(this.sunday.deltaDays(7)) }; this.prevWeek = function () { return new Week(this.sunday.deltaDays(-7)) }; this.contains = function (b) { return this.sunday.valueOf() === b.getSunday().valueOf() }; this.getDates = function () { for (var b = [], a = 0; 7 > a; a++)b.push(this.sunday.deltaDays(a)); return b } }
function Month(c, b) { this.year = c; this.month = b; this.nextMonth = function () { return new Month(c + Math.floor((b + 1) / 12), (b + 1) % 12) }; this.prevMonth = function () { return new Month(c + Math.floor((b - 1) / 12), (b + 11) % 12) }; this.getDateObject = function (a) { return new Date(this.year, this.month, a) }; this.getWeeks = function () { var a = this.getDateObject(1), b = this.nextMonth().getDateObject(0), c = [], a = new Week(a); for (c.push(a); !a.contains(b);)a = a.nextWeek(), c.push(a); return c } };

//page variables
let user_id = -1;
let username = "";
let token = "";


let date = new Date();
let currentMonth = new Month((date.getFullYear()), (date.getMonth())); // October 2017



//checks if a user is already logged in
Window.onload = getSessionId();
function getSessionId() {
    const data = { 'request': 'userID' };

    fetch("calGetId.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? requestSuccess(data.user_id, data.username, data.token) : requestFailed(data.message))
        .catch(err => console.error(err));

    function requestSuccess(curr_user_id, curr_username, tokenPull) {
        user_id = curr_user_id;
        username = curr_username;
        token = tokenPull;

        console.log(username);
        console.log(user_id);
        if (windowLoadVarNum == 0) {
            loginSuccess(user_id, username);
            displayCurrentDate();
        }

    }
    function requestFailed(error) {
        console.log(error);

    }

}



// Change the month when the "next" button is pressed
document.getElementById("rightArrow").addEventListener("click", function (event) {
    currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    daysWithEvents = [];
    addDots();
    addStars();
}, false);

// Change the month when the "back" button is pressed
document.getElementById("leftArrow").addEventListener("click", function (event) {
    currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    daysWithEvents = [];
    addDots();
    addStars();
}, false);



// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
window.onload = updateCalendar();
function updateCalendar() {
    getSessionId();

    //copied code beginning https://bobbyhadz.com/blog/javascript-convert-month-number-to-name
    date.setMonth(currentMonth.month);
    let monthName = date.toLocaleString("en-US", {
        month: 'long',
    })
    //copied code end

    year = currentMonth.year;

    document.getElementById("month").textContent = monthName;
    document.getElementById("year").textContent = year;

    var weeks = currentMonth.getWeeks();

    let divs = document.getElementsByClassName("grid-item");
    let i = 0;
    let oneCounter = 0;

    for (var w in weeks) {
        var days = weeks[w].getDates();
        // days contains normal JavaScript Date objects.

        for (var d in days) {
            // You can see console.log() output in your JavaScript debugging tool, like Firebug,
            // WebWit Inspector, or Dragonfly.
            let currDay = days[d].getDate();

            if (currDay == 1) {
                oneCounter++;
            }

            if (oneCounter == 0) {
                // dispaly light green
                divs[i].style.backgroundColor = "#A6BB8D";
            }
            else if (oneCounter == 1) {
                divs[i].style.backgroundColor = "#61876E";
            }
            else {
                // display light green
                divs[i].style.backgroundColor = "#A6BB8D";
            }

            divs[i].innerHTML = days[d].getDate();


            i++;
        }
    }

    if (weeks.length == 5) {
        var days = weeks[4].getDates();
        let lastDay = days[6].getDate();

        if (lastDay == 30 || lastDay == 31 || lastDay == 28) {
            lastDay = 0;
        }

        while (i < divs.length) {
            lastDay++;
            divs[i].innerHTML = lastDay;
            divs[i].style.backgroundColor = "#A6BB8D";
            i++;
        }
    }

    addDots();
    addStars();

}


let daysWithEvents = [];

//gets all the days that have events
async function addDots() {
    await new Promise(resolve => setTimeout(resolve, 500)); // 3 sec


    getSessionId();
    //alert("Hello!");



    // if (user_id != -1) {

    let divs = document.getElementsByClassName("grid-item");
    let i = 0;

    while (i < 42) {

        let day = divs[i].textContent;

        const data = { 'day': day, 'month': currentMonth.month, 'year': currentMonth.year, 'user_id': user_id };

        fetch("calCheckEvents.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => data.success ? addDot() : noDot())
            .catch(err => console.error(err));

        function addDot() {
            //alert("There is an event");
            if (!daysWithEvents.includes(day)) {
                daysWithEvents.push(day);
            }
        }

        function noDot() {
            console.log("No Events");
        }
        i++;
    }

}

//puts stars on all the days with events
async function addStars() {
    await new Promise(resolve => setTimeout(resolve, 2000)); // 5 sec
    //alert("I am in add stars");
    //daysWithEvents.sort();


    let i = 0;

    let startIndex = 0;
    let endIndex = 42;

    let divs = document.getElementsByClassName("grid-item");

    let monthIndicator = 0;
    let j = 0;

    while (j < 42) {

        let day = divs[j].textContent;

        if (day == 1 && monthIndicator == 0) {
            startIndex = j;
            monthIndicator++;
        }
        else if (day == 1 && monthIndicator == 1) {
            endIndex = j;
        }


        j++;
    }


    while (i < daysWithEvents.length) {

        while (startIndex < endIndex) {

            let day = divs[startIndex].textContent;

            if (day == daysWithEvents[i]) {
                divs[startIndex].textContent += "*";
                i++;
            }
            startIndex++;
        }
        i++;

    }
}


//converts 24 hour to 12 hour time
function timeConvert(time) {
    pm = false;
    append = "AM";
    time = time.split(":");

    hour = time[0];
    if (hour > 12) {
        hour = hour - 12;
        pm = true;
    }

    if (pm == true) {
        append = "PM";
    }

    result = hour + ":" + time[1] + " " + append;
    return result;

}



let previousElement = '14';
let previousDay = 15;


// ADD EVENTLISTENER TO EVERY ELEMENT IN GRID, IF IT IS CLICKED EXECUTE FUNCTION
Window.onload = setEventListeners();

function setEventListeners() {

    let gridArray = document.getElementsByClassName("grid-item");
    let sideBar = document.getElementById("dateTitle");
    let displayCurrentMonth = currentMonth.getDateObject;

    for (let i = 0; i < gridArray.length; i++) {
        gridArray[i].addEventListener('click', e => {

            let displayCurrentYear = currentMonth.year;

            // CONVERT ID TO INT TO COMPARE LATER ON
            let currentElement = e.target.id;
            let currentElementId = parseInt(currentElement);

            // GETTING THE DAY AND CONVERTING IT TO AN INT
            let displayCurrentDay = e.target.textContent;
            let currentDayAsInt = parseInt(displayCurrentDay);

            // IF THE DAY CLICKED WAS IN THE PREVIOUS MONTH
            if (currentElementId < 8 && currentDayAsInt > 7) {

                // CHANGE THE MONTH TO BE THE PREVIOUS MONTH
                displayCurrentMonth = currentMonth.prevMonth().month;

                // IF THE NEW MONTH IS DECEMBER, CHANGE THE YEAR
                if (displayCurrentMonth == 11) {
                    displayCurrentYear = currentMonth.year - 1;
                }
            }

            // IF THE DAY CLICKED WAS IN THE NEXT MONTH
            else if (currentElementId > 28 && currentDayAsInt < 15) {

                // CHANGE MONTH TO BE THE NEXT MONTH
                displayCurrentMonth = currentMonth.nextMonth().month;

                // IF THE NEW MONTH IS JANUARY, CHANGE THE YEAR
                if (displayCurrentMonth == 0) {
                    displayCurrentYear = currentMonth.year + 1;
                }
            }

            // IF THE DAY CLICKED WAS IN THE CURRENT MONTH
            else {
                displayCurrentMonth = currentMonth.month;
                displayCurrentYear = currentMonth.year;
            }

            // CONVERT MONTH NUMBER TO STRING
            date.setMonth(displayCurrentMonth);
            let monthNameSideBar = date.toLocaleString("en-US", {
                month: 'long',
            })


            sideBar.textContent = monthNameSideBar + " " + displayCurrentDay + ", " + displayCurrentYear;

            // CONTROL THE COLOR OF THE GRID BLOCK
            document.getElementById(currentElement).style.backgroundColor = "#3C6255";


            // CHANGE THE PREVIOUS DAY NOT IN THE CURRENT MONTH TO LIGHT GREEN
            if (previousDay == currentDayAsInt && previousElement == currentElementId) {
                document.getElementById(previousElement).style.backgroundColor = "#3C6255";
            }
            else if ((previousElement < 8 && previousDay > 15) || (previousElement > 28 && previousDay < 15)) {
                console.log("current id: " + currentElementId + "  currentDay: " + currentDayAsInt + "  previ: " + previousElement);
                document.getElementById(previousElement).style.backgroundColor = "#A6BB8D";
            }
            /// CHANGE THE PREVIOUS DAY IN CURRENT MONTH BACK TO GREEN
            else {
                document.getElementById(previousElement).style.backgroundColor = "#61876E";
            }

            previousDay = displayCurrentDay;
            previousElement = currentElement;

            getSessionId();

            if (user_id != -1) {
                // CONTROL WHAT IS SHOWN ON THE SIDE
                showEvents(displayCurrentYear, displayCurrentMonth, displayCurrentDay);

            }
            else {
                document.getElementById("addForm").style.display = "none";
                document.getElementById("loginForm").style.display = "block";
                document.getElementById("registerForm").style.display = "none";
                document.getElementById("currentDateEvents").style.display = "none";
                document.getElementById("editForm").style.display = "none";
                document.getElementById("viewEvent").style.display = "none";
            }
        }, false);
    }
}

//displays the current date. Changes the current grid color & sidebar.
//Window.onload = displayCurrentDate();
function displayCurrentDate() {
    let todayYear = date.getFullYear();
    let todayMonth = date.getMonth();
    let todayDay = date.getDate();

    let gridArray = document.getElementsByClassName("grid-item");

    for (let i = 0; i < gridArray.length; i++) {
        if (gridArray[i].textContent == String(todayDay)) {
            if (!(i <= 14 && todayDay > 20)) {
                gridArray[i].style.backgroundColor = "#3C6255";
                gridArray[previousElement].style.backgroundColor = "#61876E";
                previousElement = i + 1;
                previousDay = todayDay;
                break;
            }
        }
    }

    // CONVERT MONTH NUMBER TO STRING
    date.setMonth(todayMonth);
    let monthNameCurrentDate = date.toLocaleString("en-US", {
        month: 'long',
    })

    let sideBar = document.getElementById("dateTitle");
    sideBar.textContent = monthNameCurrentDate + " " + todayDay + ", " + todayYear;

    getSessionId();

    if (user_id != -1) {
        // CONTROL WHAT IS SHOWN ON THE SIDE
        showEvents(todayYear, todayMonth, todayDay);
    }
    else {
        document.getElementById("addForm").style.display = "none";
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("editForm").style.display = "none";
        document.getElementById("currentDateEvents").style.display = "block";
        document.getElementById("viewEvent").style.display = "none";
    }

    windowLoadVar();
}






let windowLoadVarNum = 0;

function windowLoadVar() {
    windowLoadVarNum = 1;
}



// LOGIN STUFF
//WHEN LOGIN BUTTON HAS BEEN CLICKED
// document.getElementById("login").addEventListener('click', displayLoginForm, false);
Window.onload = displayLoginForm();
function displayLoginForm() {

    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("currentDateEvents").style.display = "none";
    document.getElementById("viewEvent").style.display = "none";

    getSessionId();
    // IF USER IS ALREADY LOGGED IN
    if (user_id != -1) {
        loginSuccess(user_id, username);
        console.log("USER ID:" + user_id);
    }
    else {
        // document.getElementById("registerLink").addEventListener('click', displayRegisterForm, false);
        document.getElementById("loginSubmit").addEventListener("click", loginAjax, false);
        document.getElementById("registerLink").addEventListener('click', displayRegisterForm, false);
    }
}

//login functionality 
function loginAjax(event) {
    const usernameSend = document.getElementById("loginUsername").value; // Get the username from the form
    const password = document.getElementById("loginPassword").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'loginUsername': usernameSend, 'loginPassword': password };

    fetch("calLogin.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? loginSuccess(data.user_id, usernameSend, data.token) : loginFailed(data.message))
        .catch(err => console.error(err));

    function loginFailed(error) {
        alert(error);
    }

    addDots();
    addStars();
    event.preventDefault();
}

function loginSuccess(user_idPull, usernamePull, tokenPull) {
    // UPDATE HEADER
    document.getElementById("welcome").innerText = "Hello, " + usernamePull;
    // document.getElementById("login").style.display = "none";
    // document.getElementById("register").style.display = "none";
    document.getElementById("logout").style.display = "block";

    document.getElementById("logout").addEventListener('click', logoutAjax, false);
    user_id = user_idPull;
    username = usernamePull;
    token = tokenPull;

    // display the date that its currently on,
    // SIDEBAR DISPLAYS
    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("currentDateEvents").style.display = "block";
    document.getElementById("viewEvent").style.display = "none";

    updateCalendar();
    daysWithEvents = [];
    addDots();
    addStars();
}

// LOGOUT FUNCTIONS
function logoutAjax(event) {
    const data = { 'request': 'logout' };
    fetch("calGetId.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? requestSuccess() : requestFailed())
        .catch(err => console.error(err));

    function requestSuccess() {
        user_id = -1
        // HEADER DISPLAYS
        document.getElementById("welcome").innerText = "Welcome";
        // document.getElementById("login").style.display = "block";
        // document.getElementById("register").style.display = "block";
        document.getElementById("logout").style.display = "none";

        // SIDEBAR DISPLAYS
        document.getElementById("addForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("editForm").style.display = "none";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("currentDateEvents").style.display = "none";
        document.getElementById("viewEvent").style.display = "none";
    }
    function requestFailed() {
        alert("error");
    }
    daysWithEvents = [];
    updateCalendar();
  
    event.preventDefault();
}



// REGISTRATION STUFF
// WHEN REGISTER BUTTON HAS BEEN CLICKED
// document.getElementById("register").addEventListener('click', displayRegisterForm, false);
// document.getElementById("registerLink").addEventListener('click', displayRegisterForm, false);

function displayRegisterForm() {
    document.getElementById("loginSubmit").addEventListener("click", loginAjax, false);

    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("currentDateEvents").style.display = "none";
    document.getElementById("viewEvent").style.display = "none";

    document.getElementById("registerSubmit").addEventListener('click', registerAjax, false);
    document.getElementById("loginLink").addEventListener('click', displayLoginForm, false);

}

// regristration ajax.js
function registerAjax(event) {
    const first_name = document.getElementById("first_name").value; // Get the username from the form
    const last_name = document.getElementById("last_name").value; // Get the password from the form
    const username = document.getElementById("username").value; // Get the password from the form
    const email = document.getElementById("email").value; // Get the password from the form
    const pwd = document.getElementById("pwd").value; // Get the password from the form
    const pwd_check = document.getElementById("pwd_check").value; // Get the password from the form

    //checks all forms to see that they have been filled out correctly

    if (first_name.length == 0 || first_name.length > 50) {
        alert("First Name Invalid (Max 50 Characters)");
        event.preventDefault();
        return;
    }
    if (last_name.length == 0 || last_name.length > 50) {
        alert("Last Name Invalid (Max 50 Characters)");
        event.preventDefault();
        return;
    }
    if (username.length == 0 || username.length > 50) {
        alert("Username Invalid (Max 50 Characters)");
        event.preventDefault();
        return;
    }
    if (email.length == 0) {
        alert("Email Required");
        event.preventDefault();
        return;
    }
    else {
        let emailRegex = /^[\w!#$%&'*+\/=?^_`{|}~-]+@([\w\-]+(?:\.[\w\-]+)+)$/
        if (emailRegex.test(email) == false) {
            alert("Invalid Email");
            event.preventDefault();
            return;
        }

    }
    if (pwd.length == 0 || pwd_check.length == 0) {
        alert("Password Required");
        event.preventDefault();
        return;
    }

    // Make a URL-encoded string for passing POST data:
    const data = { 'first_name': first_name, 'last_name': last_name, 'username': username, 'email': email, 'pwd': pwd, 'pwd_check': pwd_check };

    fetch("calRegister.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? loginSuccess(data.user_id, username) : registeredFailed(data.message))
        .catch(err => console.error(err));

    // function registeredSuccess() {
    //     alert("registered!");
    // }
    function registeredFailed(error) {
        alert(error);
    }

    event.preventDefault();
}



// ADD EVENT STUFF
// WHEN ADD EVENT FORM BUTTON HAS BEEN CLICKED
document.getElementById("addEventButton").addEventListener('click', displayAddForm, false);

function displayAddForm() {

    // SHOW ADD EVENT FORM, HIDE EVENTS FROM SELECTED DAY
    if (document.getElementById("addForm").style.display == "none") {
        document.getElementById("addForm").style.display = "block";
        document.getElementById("currentDateEvents").style.display = "none";
        document.getElementById("editForm").style.display = "none";
        document.getElementById("viewEvent").style.display = "none";
        document.getElementById("eventSubmit").addEventListener("click", addEventAjax, false);
    }

    // HIDE ADD EVENT FORM, SHOW EVENTS FROM SELECTED DAY
    else {
        document.getElementById("addForm").style.display = "none";
        document.getElementById("currentDateEvents").style.display = "block";
        document.getElementById("editForm").style.display = "none";
        document.getElementById("viewEvent").style.display = "none";
    }
}



//adds event to database
function addEventAjax(event) {

    const eventName = document.getElementById("eventName").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const description = document.getElementById("eventDesc").value;
    console.log("variables set");

    const date = startDate.split('-');
    const startYear = date[0];
    const startMonth = date[1] - 1;
    const startDay = date[2];

    const data = { 'title': eventName, 'day': startDay, 'month': startMonth, 'year': startYear, 'time': startTime, 'description': description, 'user_id': user_id, 'token': token };

    fetch("calAddEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? addSuccess() : addFailed(data.message))
        .catch(err => console.error(err));

    function addSuccess() {
        alert("event added!");
        showEvents(startYear, startMonth, startDay);
        addDots();
        addStars();

    }
    function addFailed(message) {
        alert(message);
    }

    event.preventDefault();
}

function showEvents(year, month, day) {
    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("currentDateEvents").style.display = "block";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("viewEvent").style.display = "none";

    if (year == "a") {
        year = date.getFullYear;
        month = date.getMonth;
        day = date.getDay;
    }

    const data = { 'year': year, 'month': month, 'day': day, 'user_id': user_id };

    fetch("calGetEvents.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            console.log('Success:', JSON.stringify(data))
            getSuccess(data);
        })
        .catch(err => console.error(err));

    function getSuccess(data) {

        let i = 0;
        document.getElementById("dateEvents").innerHTML = "<br>";


        while ((i + 2) <= data.length) {
            document.getElementById("dateEvents").innerHTML += "<div class='eventButton' id='" + data[i + 2] + "-EventId'>" + data[i] + " at " + timeConvert(data[i + 1]) + "<br></div>";

            // document.getElementById("dateEvents").innerHTML += "<div class='eventButton' id='" + data[i + 2] + "-EventId'><strong>" + data[i] + "</strong>" + " at " + timeConvert(data[i + 1]) + "<br></div>";
            i += 3;
        }

        if (data.length == 0) {
            document.getElementById("dateEvents").innerText += "YOU DONT HAVE ANY EVENTS FOR THIS DAY!!";
        }

        // document.getElementById("dateEvents").innerHTML += "<div class='button' id='addEventButton'>Add Event</div>";
        document.getElementById("addEventButton").addEventListener('click', displayAddForm, false);

        showShareEvents(year, month, day);
        viewEventListeners();
    }
    function getFailed(message) {
        alert(message);
    }
}

//adds event listeners to the event buttons on a single day to allow you to view the event
function viewEventListeners() {

    let viewButtonArray = document.getElementsByClassName("eventButton");
    let sideBar = document.getElementById("viewTitle");
    //let displayCurrentMonth = currentMonth.getDateObject;

    for (let i = 0; i < viewButtonArray.length; i++) {


        viewButtonArray[i].addEventListener('click', e => {


            let currentElement = e.target.id;
            const getEventIdArr = currentElement.split("-");
            currentElement = getEventIdArr[0];
            //getSessionId();
            const data = { 'event_id': currentElement };

            fetch("calGetEventsName.php", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' }
            })
                .then(response => response.json())
                .then(function (data) {
                    console.log('Success:', JSON.stringify(data))
                    document.getElementById("addForm").style.display = "none";
                    document.getElementById("loginForm").style.display = "none";
                    document.getElementById("registerForm").style.display = "none";
                    document.getElementById("currentDateEvents").style.display = "none";
                    document.getElementById("editForm").style.display = "none";
                    document.getElementById("viewEvent").style.display = "block";

                    sideBar.innerHTML = data[0];

                    console.log("Title: " + data[0]);

                    let monthNum = parseInt(data[2]);
                    console.log("Month Num: " + monthNum);

                    date.setMonth(monthNum);
                    let viewEventMonthName = date.toLocaleString("en-US", {
                        month: 'long',
                    })

                    // let viewEventMonthName = "March";

                    document.getElementById("eventDate").innerHTML = "<b>Date: </b>" + viewEventMonthName + " " + data[1] + ", " + data[3];
                    document.getElementById("eventTime").innerHTML = "<b>Time: </b>" + timeConvert(data[4]);
                    document.getElementById("eventDescription").innerHTML = "<b>Description: </b>" + data[5];
                    setViewButtonListeners(currentElement, data[0], data[5], data[1], data[2], data[3]);

                })
                .catch(err => console.error(err));

        }, false);

    }
    return;

}

//sets the event listeners for the buttons inside event view
function setViewButtonListeners(event_id, title, description, day, month, year) {
    let editPostButton = document.getElementById("editPostButton");
    let sharePostButton = document.getElementById("sharePostButton");

    sharePostButton.addEventListener('click', sharePostAjax, false);
    sharePostButton.eventId = event_id;

    editPostButton.addEventListener('click', editPostForm, false);
    editPostButton.eventId = event_id;
    editPostButton.title = title;
    editPostButton.desc = description;

    let deletePostButton = document.getElementById("deletePostButton");

    deletePostButton.addEventListener('click', deletePost, false);
    deletePostButton.event_id = event_id;
    deletePostButton.day = day;
    deletePostButton.month = month;
    deletePostButton.year = year;


    return;

}

//edit post functionality
function editPostForm(event) {

    event_id = editPostButton.eventId;
    title = editPostButton.title;
    description = editPostButton.description;

    console.log("edit");

    document.getElementById("addForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("currentDateEvents").style.display = "none";
    document.getElementById("viewEvent").style.display = "none";
    document.getElementById("editForm").style.display = "block";

    document.getElementById("editEventName").value = title;
    document.getElementById("editEventDesc").textContent = description;

    document.getElementById("submitEditPost").addEventListener('click', editPostAjax, false);
    document.getElementById('submitEditPost').event_id = event_id;

}

//edit post server call
function editPostAjax(event) {

    event_id = document.getElementById('submitEditPost').event_id;

    const eventName = document.getElementById("editEventName").value;
    const startDate = document.getElementById("editStartDate").value;
    const startTime = document.getElementById("editStartTime").value;
    const description = document.getElementById("editEventDesc").value;
    console.log("variables set");

    const date = startDate.split('-');
    const startYear = date[0];
    const startMonth = date[1] - 1;
    const startDay = date[2];

    const data = { 'event_id': event_id, 'title': eventName, 'day': startDay, 'month': startMonth, 'year': startYear, 'time': startTime, 'description': description, 'token': token};

    fetch("calEditEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? addSuccess() : addFailed(data.message))
        .catch(err => console.error(err));

    function addSuccess() {
        alert("event edited!");
        showEvents(startYear, startMonth, startDay);
    }
    function addFailed(message) {
        alert(message);
    }
}

//allows you to share a post with another user
function sharePostAjax(event) {

    const shared_id = document.getElementById("shareWithUsername").value;
    event_id = editPostButton.eventId;

    console.log("variables set");

    const data = { 'event_id': event_id, 'shared_id': shared_id };

    fetch("calShareEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? shareSuccess() : shareFailed(data.message))
        .catch(err => console.error(err));

    function shareSuccess() {
        alert("event shared!");

        // showShareEvents();
    }
    function shareFailed(message) {
        alert(message);
    }

}

//displays the events shared with you from other users
function showShareEvents(year, month, day){

    const data = { 'year': year, 'month': month, 'day': day, 'user_id': user_id };
    

    fetch("calGetShare.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            console.log('Success:', JSON.stringify(data))
            getShareSuccess(data);
        })
        .catch(err => console.error(err));

    function getShareSuccess(data) {
        let i = 0;
        document.getElementById("shareDate").innerHTML = "<br>";

        
        while ((i + 5) <= data.length) {
            if(data[i+3] == month && data[i+4] == day && data[i+5] == year){
                document.getElementById("shareDate").innerHTML += "<div class='eventButton' id='" + data[i + 2] + "-EventId'>" + data[i] + " at " + timeConvert(data[i + 1]) + "<br></div>";
                i += 6;
            }

        }

        if (data.length == 0) {
            document.getElementById("shareDate").innerText += "YOU DONT HAVE SHARED EVENTS!!";
        }

    }
    function getFailed(message) {
        alert(message);
    }
}

//delete post functionality
function deletePost(event) {
    event_id = deletePostButton.event_id;
    console.log("variables set");

    const data = { 'event_id': event_id, 'token': token };

    fetch("calDeleteEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data.success ? addSuccess() : addFailed(data.message))
        .catch(err => console.error(err));

    function addSuccess() {
        alert("event deleted!");
        showEvents(startYear, startMonth, startDay);
    }
    function addFailed(message) {
        alert(message);
    }

    day = deletePostButton.day;
    month = deletePostButton.month;
    year = deletePostButton.year;

    showEvents(year, month, day);

    addDots();
    addStars();


}

addDots();
addStars();

