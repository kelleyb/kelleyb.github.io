var history = new Array(100);
var currentIndex = 0;
var historyNum = -1;
var total = 0;

for (var i = 100; i >= 0; i--) {
    // Fill with empty string
    history[i] = "";
};

$("#command").keydown(function (e) {
    // Catch certain keys and do things based on the input
    if (e.keyCode == "13") {
        // 13 == enter key, try submitting the command
        submit();
    }
    else if (e.keyCode == "9") {
        // 9 is the tab button, first stop the browser from moving the cursor
        // then attempt to autocomplete what the user has there
        e.preventDefault();
        tabComplete();
    }

    else if(e.keyCode == "38") {
        // Up key, go up within history (older commands)
        if (currentIndex > 0) {
            document.getElementById("command").value = history[currentIndex - 1];
            currentIndex = currentIndex - 1;
        };
    }
    else if(e.keyCode == "40") {
        // Down key, go down within history (more recent commands)
        if (currentIndex < total) {
            document.getElementById("command").value = history[currentIndex + 1];
            currentIndex = currentIndex + 1;
        };
    }
});

// List of valid commands, used for tab completion
var commandList = ["help", "education", "experience", "about", "projects", "clear"];

if (typeof String.prototype.startsWith != 'function') {
    // Implement startsWith method for strings. Because I like Python.
    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };
}

var tabComplete = function() {
    // Complete from smaller part of command
    // split the input into smaller parts separated by "&&". We will want to autocomplete the last one.
    // Maybe at some point I'll try to figure out how to autocomplete if the user is typing in the middle of the commands.
    var commandSplit = (document.getElementById("command").value).split("&&");
    var commandSegment = commandSplit[commandSplit.length - 1].trim();
    var possibleCommands = [];

    // Find what the commands could possibly be.
    for (var i = commandList.length - 1; i >= 0; i--) {
        if (commandList[i].startsWith(commandSegment)) {
            possibleCommands[possibleCommands.length] = commandList[i];
        };
    };


    // If there is more than one possible command the user could be trying to enter, don't try to autocomplete.
    if (possibleCommands.length === 1) {
        if (commandSplit.length > 1) {
            // Add a space before the command to make it look nicer. Not entirely necessary, but it's good to have.
            possibleCommands[0] = " " + possibleCommands[0]
        };
        commandSplit[commandSplit.length - 1] = possibleCommands[0];
        // Fill the input with what we think the user meant.
        document.getElementById("command").value = commandSplit.join("&&") + " ";
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
    div.setAttribute("style", "margin-top: 5px;");
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
        // Check if the user entered a valid command. I could probably do this by attempting to load command.txt, 
        // and check http return, but I'll stick with this for now.

        if (commands[i] == "help") {
            // Get the data to be output from the command
            $.ajax(
                {
                    type:"GET",
                    url: "help.txt",
                    async: false

                }).done(function(data) {
                    var text = document.createElement("div");
                    text.innerHTML = data;
                    // Add it to the end of the "output element", meaning the div with ID "output"
                    outputElement.appendChild(text);
                    // Scroll to the bottom of the page. Otherwise, it just looks stupid.
                    window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "education") {

            $.ajax(
                {
                    type:"GET",
                    url: "education.txt",
                    async: false

                }).done(function(data) {
                    var text = document.createElement("div");
                    text.innerHTML = data;
                    // Add it to the end of the "output element", meaning the div with ID "output"
                    outputElement.appendChild(text);
                    // Scroll to the bottom of the page. Otherwise, it just looks stupid.
                    window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "experience") {

            $.ajax(
                {
                    type:"GET",
                    url: "experience.txt",
                    async: false

                }).done(function(data) {
                    var text = document.createElement("div");
                    text.innerHTML = data;
                    // Add it to the end of the "output element", meaning the div with ID "output"
                    outputElement.appendChild(text);
                    // Scroll to the bottom of the page. Otherwise, it just looks stupid.
                    window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "about") {

            $.ajax(
                {
                    type:"GET",
                    url: "about.txt",
                    async: false

                }).done(function(data) {
                    var text = document.createElement("div");
                    text.innerHTML = data;
                    // Add it to the end of the "output element", meaning the div with ID "output"
                    outputElement.appendChild(text);
                    // Scroll to the bottom of the page. Otherwise, it just looks stupid.
                    window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "projects") {

            $.ajax(
                {
                    type:"GET",
                    url: "projects.txt",
                    async: false

                }).done(function(data) {
                    var text = document.createElement("div");
                    text.innerHTML = data;
                    // Add it to the end of the "output element", meaning the div with ID "output"
                    outputElement.appendChild(text);
                    // Scroll to the bottom of the page. Otherwise, it just looks stupid.
                    window.scrollTo(0,document.body.scrollHeight);
            });

        } else if (commands[i] == "clear") {
            // Clear all from screen
            $("#output").empty();

        } else if (commands[i] == "") {
            // Do nothing
            // We don't want the user to be warned about an invalid command if they didn't enter a command in the first place

            // Scroll to the bottom of the page. Otherwise, it just looks stupid.
            window.scrollTo(0,document.body.scrollHeight);

        } else if (commands[i].startsWith("rm -rf") || commands[i].startsWith("sudo rm -rf")) {
            // The user is trying to delete stuff. Maybe they thought there would be an easter egg.
            // Maybe I'll implement a good one later. For now, just show a sad face.

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

// Size of "user@briankelley ~/" is 171 pixels across. 
// At least on my machine. I can test more later
window.onresize = function() {
    var width = $(window).width() - ($("#user").width() + 30); // Why add 30? Because it doesn't work otherwise, of course! 
    // Maybe that's the size of like the margins or something? Whatever. The input now extends across the page on various screen sizes
    // So it turns out if I just do 25, it sort of works. But if I use the "education" command, the prompt goes to the next line.
    // No idea why.
    $("#command").width(width);
}

// Make it so the browser keeps its focus on the input, even if the user clicks out.
$('#command').on('blur',function () { var blurEl = $(this); setTimeout(function() {blurEl.focus()},10) });

// Set initial size of input
var width = $(window).width() - ($("#user").width() + 30);
$("#command").width(width);