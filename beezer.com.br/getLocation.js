// Get script file location
// doesn't work for older browsers
 
var getScriptLocation = function() {
	var fileName  	= "fileName";
	var stack       = "stack";
	var stackTrace  = "stacktrace";
	var loc   	= null;
 
	var matcher = function(stack, matchedLoc) { return loc = matchedLoc; };
 
	try { 
 
		// Invalid code
		0();
 
	}  catch (ex) {
 
		if(fileName in ex) { // Firefox
			loc = ex[fileName];
		} else if(stackTrace in ex) { // Opera
			ex[stackTrace].replace(/called from line \d+, column \d+ in (.*):/gm, matcher);
		} else if(stack in ex) { // WebKit, Blink and IE10
			ex[stack].replace(/at.*?\(?(\S+):\d+:\d+\)?$/g, matcher);
		}
 
		return loc;
	}
 
};