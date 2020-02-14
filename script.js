var currentDay = moment().format("dddd, MMMM Do, YYYY");
$("#currentDay").text(currentDay);
var listOfHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var currentHour = moment().format("H");
var events = [];
var eventObj = {
    time: "",
    area: ""
};
var storedEvents = JSON.parse(localStorage.getItem("text"));

if (storedEvents !== null) {
    events = storedEvents; // The array will hold the stored events
};

for (i = 0; i < listOfHours.length; i++) {
    var diff = moment([currentHour]).diff(moment([listOfHours[i]]));
    if (diff > 0) {
        $("#row" + i).addClass("past");
    } else if (diff == 0) {
        $("#row" + i).addClass("present");
    } else if (diff < 0) {
        $("#row" + i).addClass("future");
    };
};

$(".saveBtn").on("click", function () {
    var textInput = $(this).prev().val();
    var textArea = $(this).prev();
    if (textInput != "") {
        eventObj.time = textArea.prev().text();
        eventObj.area = textInput;
        events.push(eventObj);
        localStorage.setItem("text", JSON.stringify(events));
    };
});

function renderEvents() {
    for (i = 0; i < listOfHours.length; i++) {
        var textArea = $("#row" + i);
        for (j = 0; j < events.length; j++) {
            if (textArea.prev().text() == events[j].time) {
                textArea.text(events[j].area);
            };
        };
    };
};

renderEvents();