var ol = $('ol');

function addMessage(message) {
    // Chat messages should be follow the set chat message template
    // (see index.html:15)
	ol.append('<li>' + message + '</li>');
}

function sendMessage(message) {
    // This function sends a message to server via AJAX. See code at the bottom
    // of this file for explanation on the different parts of this AJAX request.
    // This sends a POST request to the server, and since we're not interested
    // on the server's response, we didn't have to listen for the "readystatechange"
    // event anymore.
	var xhr = new XMLHttpRequest();
	//xhr.open('POST', 'http://localhost:3000/message');
	xhr.open('POST', '/message');
	xhr.send(message);
}

function fetchMessages() {
    // This function fetches the messages from the server via AJAX. See code at
    // the bottom of this file for explanation on the different parts of this
    // AJAX request.
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			var messages = JSON.parse(xhr.responseText);
			ol.empty();
			messages.forEach(addMessage);
		}
	};
	xhr.open('GET', 'http://localhost:3000/message');
	xhr.send();
}

// In order to fetch messages from the server, we need to call the "fetchMessages"
// function. With the code below, we are using "setInterval" to repeatedly call
// "fetchMessages". (See https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
// for more info about setInterval). This technique of repeatedly sending AJAX
// requests to the server to retrieve data or check if there's is new data is
// called "polling".
setInterval(fetchMessages, 1);

$('button[type]').on('click', function(e) {
	addMessage(e.target.textContent);
	sendMessage(e.target.textContent);
});

var input = $('input');

$('form').on('submit', function(e) {
	e.preventDefault();
	if (input.val()) {
		addMessage(input.val());
		sendMessage(input.val());
		input.val('');
	}
});

// var section = $('section');
// section.fadeOut().fadeIn().slideUp().slideDown();



// AJAX STARTING HERE

// AJAX (Asynchronouse Javascript and XML) allows us to programatically send
// HTTP requests to a backend server without reloading the page. We can perform
// AJAX operations using the XMLHttpRequest API.

// AJAX operations should be performed using an instance of the XMLHttpRequest
// constructor (xhr in this case).
var xhr = new XMLHttpRequest();

// An XMLHttpRequest can be in different "ready states", which can be either
// one of the following: UNSENT, OPENED, HEADERS_RECEIVED, LOADING, and DONE.
// See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
// for an explanation on what each state means.
//
// Every time the xhr object changes from one ready state to another, it emits
// the "readystatechange" event. We can listen to that event (using any of the
// many ways of listening for events).
xhr.onreadystatechange = function() {
    // Most of the time we're only interested in the server's response to our
    // AJAX request, so it's common to see the following if statement in the
    // "readystatechange" event handler. It checks if the ready state is
    // already DONE, which means that we've already received the response from
    // the server.
	if (xhr.readyState === xhr.DONE) {
		// The server response can be obtained via "xhr.responseText", and from
        // here we can use it however we want.
        console.log(xhr.responseText);
	}
};

// .open() initializes an HTTP request to a given url. We give it the HTTP
// method that will be used for the request, as well as the url that will be
// requested. Note that this does not send the HTTP request yet. It just
// prepares it for sending later.
xhr.open('GET', 'http://localhost:3000/');

// .send() is the one that actually sends the request to the server.
xhr.send();
