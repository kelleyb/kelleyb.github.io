var history = new Array(100);
var currentIndex = 0;
var historyNum = -1;
var total = 0;

for (var i = history.length - 1; i >= 0; i--) {
    // Fill with empty string
    history[i] = "";
};

$("#command").keydown(function (e) {
    if (e.keyCode == "13") {
        submit();
    }
    else if (e.keyCode == "9") {
        e.preventDefault();
        tabComplete();
    }

    else if(e.keyCode == "38") {
        // Up
        if (currentIndex > 0) {
            document.getElementById("command").value = history[currentIndex - 1];
            currentIndex = currentIndex - 1;
        };
    }
    else if(e.keyCode == "40") {
        // Up
        if (currentIndex < total) {
            document.getElementById("command").value = history[currentIndex + 1];
            currentIndex = currentIndex + 1;
        };
    }
});

var commandList = ["help", "education", "experience", "about", "projects", "clear"]

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

var tabComplete = function() {
    // Complete from smaller part of command
    var commandSegment = document.getElementById("command").value;
    var possibleCommands = [];

    for (var i = commandList.length - 1; i >= 0; i--) {
        if (commandList[i].startsWith(commandSegment)) {
            possibleCommands[possibleCommands.length] = commandList[i];
        };
    };
    if (possibleCommands.length === 1) {
        document.getElementById("command").value = possibleCommands[0] + " ";
    };

}

var submit = function () {
	// Get command from input
    var command = document.getElementById("command").value;
    history[currentIndex] = command;
    if (currentIndex == total) {
        currentIndex = currentIndex + 1;
        total = total + 1;
    };
    

    var outputElement = document.getElementById("output");
    var div = document.createElement("div");
    div.innerHTML = "<span id='user'>user@briankelley  ~/&nbsp;</span>" + command;
    document.getElementById("command").value = "";
    // Put the command at the top (like in a Linux terminal)
    outputElement.appendChild(div);

    // Trim extra whitespace
    command = command.trim();
    // Check command, add in correct text
    // Possible commands: help, education, experience, about, projects, clear

    commands = command.split("&&");

    for (var i = 0; i < commands.length; i++) {
        commands[i] = commands[i].trim();
        if (commands[i] == "help") {

            $.get('http://www.briankelley.me/help.txt', function(data) {
                var text = document.createElement("div");
                text.innerHTML = data;
                outputElement.appendChild(text);
                window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "education") {

            $.get('http://www.briankelley.me/education.txt', function(data) {
                var text = document.createElement("div");
                text.innerHTML = data;
                outputElement.appendChild(text);
                window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "experience") {

            $.get('http://www.briankelley.me/experience.txt', function(data) {
                var text = document.createElement("div");
                text.innerHTML = data;
                outputElement.appendChild(text);
                window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "about") {

            $.get('http://www.briankelley.me/about.txt', function(data) {
                var text = document.createElement("div");
                text.innerHTML = data;
                outputElement.appendChild(text);
                window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "projects") {

            $.get('http://www.briankelley.me/projects.txt', function(data) {
                var text = document.createElement("div");
                text.innerHTML = data;
                outputElement.appendChild(text);
                window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "clear") {
            // Clear all from screen
            $("#output").empty();

        } else if (commands[i] == "") {
            // Do nothing
        } else if (commands[i].startsWith("rm -rf") || commands[i].startsWith("sudo rm -rf")) {
            var text = document.createElement("div");
            text.innerHTML = "<p>pls dont :(</p>";
            outputElement.appendChild(text);
            window.scrollTo(0,document.body.scrollHeight);
        } else {
            // They put in an incorrect command :(
            var text = document.createElement("div");
            text.innerHTML = "<p>Invalid command :(</p>";
            outputElement.appendChild(text);
            window.scrollTo(0,document.body.scrollHeight);
        }
    }
};

$('#command').on('blur',function () { var blurEl = $(this); setTimeout(function() {blurEl.focus()},10) });
