var storeURL = "https://codestore-348206.ts.r.appspot.com/";

Sk.builtins.RESET = new Sk.builtin.str("\u001b[ 0;2;0;0;0 m");

Sk.builtins.RED = new Sk.builtin.str("\u001b[ 38;2;255;0;0 m");
Sk.builtins.BLACK = new Sk.builtin.str("\u001b[ 38;2;0;0;0 m");
Sk.builtins.WHITE = new Sk.builtin.str("\u001b[ 38;2;255;255;255 m");
Sk.builtins.RED = new Sk.builtin.str("\u001b[ 38;2;255;0;0 m");
Sk.builtins.GREEN = new Sk.builtin.str("\u001b[ 38;2;0;255;0 m");
Sk.builtins.BLUE = new Sk.builtin.str("\u001b[ 38;2;0;0;255 m");
Sk.builtins.CYAN = new Sk.builtin.str("\u001b[ 38;2;0;255;255 m");
Sk.builtins.YELLOW = new Sk.builtin.str("\u001b[ 38;2;255;255;0 m");
Sk.builtins.MAGENTA = new Sk.builtin.str("\u001b[ 38;2;255;0;255 m");
Sk.builtins.ORANGE = new Sk.builtin.str("\u001b[ 38;2;255;165;0 m");
Sk.builtins.PURPLE = new Sk.builtin.str("\u001b[ 38;2;127;0;255 m");
    
Sk.builtins.HL_BLACK = new Sk.builtin.str("\u001b[ 48;2;0;0;0 m");
Sk.builtins.HL_WHITE = new Sk.builtin.str("\u001b[ 48;2;255;255;255 m");
Sk.builtins.HL_RED = new Sk.builtin.str("\u001b[ 48;2;255;0;0 m");
Sk.builtins.HL_GREEN = new Sk.builtin.str("\u001b[ 48;2;0;255;0 m");
Sk.builtins.HL_BLUE = new Sk.builtin.str("\u001b[ 48;2;0;0;255 m");    
Sk.builtins.HL_CYAN = new Sk.builtin.str("\u001b[ 48;2;0;255;255 m");
Sk.builtins.HL_YELLOW = new Sk.builtin.str("\u001b[ 48;2;255;255;0 m");
Sk.builtins.HL_MAGENTA = new Sk.builtin.str("\u001b[ 48;2;255;0;255 m");
Sk.builtins.HL_ORANGE = new Sk.builtin.str("\u001b[ 48;2;255;165;0 m");
Sk.builtins.HL_PURPLE = new Sk.builtin.str("\u001b[ 48;2;127;0;255 m");
    
Sk.builtins.BOLD = new Sk.builtin.str("\u001b[ 1;2;0;0;0 m");    
Sk.builtins.ITALICS = new Sk.builtin.str("\u001b[ 3;2;0;0;0 m");    
Sk.builtins.UNDERLINE = new Sk.builtin.str("\u001b[ 4;2;0;0;0 m");    

function outputf(n) {
    var text = "";
    var color;
    var bgcolor;
    var italics;
    var bold;
    var underlined;
                  
    i = 0;
    while (n.length > 0)
    {
        if (n[0] == "\u001b")
        {
            i++;
            if (text.length > 0)
                pyConsole.appendChild(createColouredTextSpanElement(text, color, bgcolor, italics, bold, underlined));                
            text = "";
            
            var escPattern = /\[ (\d+);2;(\d+);(\d+);(\d+) m/;                          
            var match = n.match(escPattern);
            
            if (typeof(match) !== 'undefined')
            {
                code = parseInt(match[1]);
                if (code == 0)
                {
                    // reset
                    color = "rgb(255,255,255)";
                    bgcolor = "rgb(0,0,0)";                    
                    bold = false;
                    italics = false;
                    underlined = false;
                }
                else if (code == 38)
                {
                    color = "rgb(" + parseInt(match[2]) + "," + parseInt(match[3]) + "," + parseInt(match[4]) + ")"; 
                }
                else if (code == 48)
                {
                    bgcolor = "rgb(" + parseInt(match[2]) + "," + parseInt(match[3]) + "," + parseInt(match[4]) + ")"; 
                }
                else if (code == 1)
                {
                    // bold
                    bold = true;
                }
                else if (code == 3)
                {
                    // italics
                    italics = true;
                }
                else if (code == 4)
                {
                    // underlined
                    underlined = true;
                }                
                i = match.index + match[0].length;
            }
            n = n.substring(i);
        }
        else
        {
            text += n[0];
            n = n.substring(1);
        }                
    }
    if (text.length > 0)
        pyConsole.appendChild(createColouredTextSpanElement(text, color, bgcolor, italics, bold, underlined));                           
    
    pyConsole.scrollTop = document.getElementById("console").scrollHeight;
}

function inputf(n) {
    inputPromise = new Promise((function(n, e) {                    
                inputElement = document.createElement("span");
                inputElement.setAttribute("contenteditable", "true");
                inputElement.style.color = "rgb(255,255,255)";
                inputElement.style.fontSize = "14pt";
                inputElement.style.outlineStyle = "none";
                pyConsole.appendChild(inputElement);
                inputElement.focus();
                inputElement.addEventListener("keyup", (function(e) {
                    e.preventDefault();
                    if (e.key ==="Enter") {
                        userResponse = inputElement.innerText.replace(/\n+$/, "");
                        inputElement.remove();
                        inputElement = null;
                        outputf(userResponse);
                        outputf("\n");
                        n(userResponse);
                    }
                }))
            }));
    return inputPromise;
}
    
var fontColour = "rgba(255, 255, 255, 1)";
var fontBgColour = "rgba(0, 0, 0, 1)";
var fontItalics = false;
var fontBold = false;
var fontUnderlined = false;
var fontSize = "14pt";

function resetConsole()
{
    fontColour = "rgba(255, 255, 255, 1)";
    fontBgColour = "rgba(0, 0, 0, 1)";
    fontItalics = false;
    fontBold = false;
    fontUnderlined = false;
    fontSize = "14pt";    
    clearConsole();
}

function createColouredTextSpanElement(n, color, bgcolor, italics, bold, underlined) {
    let t = document.createTextNode(n);        
    let e = document.createElement("span");    
    
    if (typeof(color) !== 'undefined')
    {
        fontColour = color;
    }    
    
    if (typeof(bgcolor) !== 'undefined')
    {
        fontBgColour = bgcolor;
    }
    
    if (typeof(italics) !== 'undefined')
    {
        if (italics)
        {
            fontItalics = "italic";
        }
        else
        {
            fontItalics = "normal";
        }            
    }
    
    if (typeof(bold) !== 'undefined')
    {
        if (bold)
        {
            fontBold = "bold";
        }
        else
        {
            fontBold = "normal";
        }    
    }    

    if (typeof(underlined) !== 'undefined')
    {
        if (underlined)
        {
            fontUnderlined = "underline";
        }
        else
        {
            fontUnderlined = "none";
        }    
    }  
    
    e.style.textDecoration = fontUnderlined;
    e.style.fontWeight = fontBold;
    e.style.fontStyle = fontItalics;
    e.style.backgroundColor = fontBgColour;
    e.style.color = fontColour;
    e.style.fontSize = fontSize;
    
    e.appendChild(t);        
    return e;
}

function encodeToUTF16(plaintext) {
  var res = "";
  for (i = 0; i < plaintext.length; i++)
  {
    var ch1 = plaintext.charCodeAt(i);
    var ch2 = 0;
    if (ch1 < 256 && i < plaintext.length - 1)
    {
      ch2 = plaintext.charCodeAt(++i);   
      if (ch2 >= 256)
      {      	
        ch2 = 0;
        --i;
      }
    }
    else if (ch1 >= 256)
    {
      ch2 = 0;
      if (i < plaintext.length - 1)
      {
        ch2 = plaintext.charCodeAt(++i);    
      }
      res = res + "@" + String.fromCharCode(ch1, ch2);
      continue;
    }
    res = res + String.fromCharCode(ch1 * 256 + ch2);    
  }
  return res;
}

function decodeFromUTF16(codedText) {
  var res = "";
  
  for (i = 0; i < codedText.length; i++)
  {
    ch = codedText.charCodeAt(i);
    
    if (ch == 64)
    {
      ch1 = codedText.charCodeAt(++i);
      ch2 = codedText.charCodeAt(++i);
      res += String.fromCharCode(ch1, ch2);
    }
    else
    {
      var ch1 = (ch / 256) % (256);
      var ch2 = ch % (256);
           
      if (ch2 == 0)
      {
      	res += String.fromCharCode(ch1);
      }
      else
      {
      	res += String.fromCharCode(ch1, ch2);
      }
    }
  }
  return res;
}

Sk.builtins.clear = function()
{
    clearConsole();
}

function stripPeriodFromGoto(code) {
    pass1 = code;
    // removing '.' in front of labels and gotos
    // so that the pyangelo grammar works
    pass1 = pass1.replace(/label \./g, "label ")  
    pass1 = pass1.replace(/goto \./g, "goto ") 
	return pass1;
}

// preprocess the code to relax language grammar rules for newbies!
function pygmify(code)
{
    pass1 = code;
    
    // removing '.' in front of labels and gotos
    // so that the pyangelo grammar works
    pass1 = pass1.replace(/label \./g, "label ")  
    pass1 = pass1.replace(/goto \./g, "goto ")  

    // forever loop
    var forever_pattern = /^(\s*)(forever).*$/gm;                
    var matches = code.matchAll(forever_pattern);
    for (match of matches)
    {
        pass1 = pass1.substr(0, match.index) + pass1.substr(match.index).replace(match[0], match[1] + "while True");
        //pass1 = pass1.replace(match[0], match[1] + "while True");
    }    

    // until loop
    var until_pattern = /^(\s*)(until )(.*)$/gm;                
    matches = code.matchAll(until_pattern);
    for (match of matches)
    {
        pass1 = pass1.substr(0, match.index) + pass1.substr(match.index).replace(match[0], match[1] + "while not " + match[3]);
        //pass1 = pass1.replace(match[0], match[1] + "while not" + match[3]);
    }      
    
    pass2 = pass1;
    // repeat for
    var repeat_for_pattern = /^(\s*)(repeat )(\s*)(\S+)(\s*)=(\s*)(\S*)(\s*)to(\s*)(.*)$/gm;                
    matches = pass1.matchAll(repeat_for_pattern);
    for (match of matches)
    {
        times = match[10].replace(/(:)|(times)/g, "")
        pass2 = pass2.substr(0, match.index) + pass2.substr(match.index).replace(match[0], match[1] + "for " + match[4] + " in range(" + match[7] + ", " + times + "+ 1):");
    }      
    
    pass3 = pass2;
    // repeat   
    var repeat_pattern = /^(\s*)(repeat )(\s*)(.*)$/gm;                
    matches = pass2.matchAll(repeat_pattern);
    for (match of matches)
    {
        times = match[4].replace(/(:)|(times)/g, "")
        pass3 = pass3.substr(0, match.index) + pass3.substr(match.index).replace(match[0], match[1] + "for _ in range(" + times + "):");
    }  
    
    
    pass4 = pass3;
    // = vs ==   
    //var eq_pattern = /^(\s*)(if |elif |while )(.*[^=\<>\!])(=)([^=\<>\!].*)$/gm;                
    var eq_pattern = /^(\s*)(if |elif |while )(.*)$/gm;                
    matches = pass3.matchAll(eq_pattern);
    for (match of matches)
    {
        var condition = "";
        for (i = 0; i < match[3].length; i++)
        {
            var c = match[3][i];
            condition += c;
            // found an equals sign
            if (c == "=")
            {
                if (i > 0)
                {
                    // check the prev char
                    var prev = match[3][i-1];
                    // if it's not <>!
                    if (prev != ">" && prev != "<" && prev != "!")
                    {
                        // always add another equal sign
                        condition += "=";
                        // if the next char is actually an equals sign, then skip it
                        if (i < match[3].length -1 && match[3][i+1] == "=")
                        {
                            i++;
                        }                        
                    }
                }
            }            
        }
        pass4 = pass4.substr(0, match.index) + pass4.substr(match.index).replace(match[0], match[1] + match[2] + condition);
    }      
    
    lastpass = pass4;
    // no colons   
    var if_elif_else_while_for_def_class_pattern = /^(\s*)(if |elif |else|while |for |def |class )(.*)$/gm;                
    matches = pass4.matchAll(if_elif_else_while_for_def_class_pattern);
    for (match of matches)
    {
        if (match[0].trim().slice(-1) != ":")
        {
            lastpass = lastpass.substr(0, match.index) + lastpass.substr(match.index).replace(match[0], match[0] + ":");
        }
    }      
    return lastpass;
}

 
function clearConsole() {
	var clearButton = document.getElementById("consoleClear");

	pyConsole.innerHTML = "";
	pyConsole.appendChild(clearButton);
	if (inputElement != null)
	{
		inputElement.innerText = "";
		pyConsole.appendChild(inputElement);
	}
}

/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen property yet */
function openFullscreen() {
	/* Get the element you want displayed in fullscreen mode (a video in this example): */
	var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
		(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
		(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
		(document.msFullscreenElement && document.msFullscreenElement !== null);

	if (!isInFullScreen) {
		var docElm = document.documentElement;
		if (docElm.requestFullscreen) {
			docElm.requestFullscreen();
		} else if (docElm.mozRequestFullScreen) {
			docElm.mozRequestFullScreen();
		} else if (docElm.webkitRequestFullScreen) {
			docElm.webkitRequestFullScreen();
		} else if (docElm.msRequestFullscreen) {
			docElm.msRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}
}

//gets the type of browser
function detectBrowser() {
	if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
		return 'Opera';
	} else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
		return 'Chrome';
	} else if(navigator.userAgent.indexOf("Safari") != -1) {
		return 'Safari';
	} else if(navigator.userAgent.indexOf("Firefox") != -1 ){
		return 'Firefox';
	} else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
		return 'IE';
	} else {
		return 'Unknown';
	}
}

function copyToClipboard(text, successMsg, errorMsg)
{
	var browser = detectBrowser();
	if (browser == "Firefox")
	{
		navigator.clipboard.writeText(text);
		alert(successMsg);
	}
	else
	{
		navigator.permissions.query({name: "clipboard-write"}).then(result => {
		  if (result.state == "granted" || result.state == "prompt") {
			navigator.clipboard.writeText(text);
			alert(successMsg);
		  }
		  else
		  {
			alert(errorMsg);
		  }
		});
	}
}

function copyCode()
{
	var code = ace.edit("editor").getValue();
	navigator.clipboard.writeText(code);

	copyToClipboard(code, "Code copied to clipboard.", "Unable to copy code to clipboard. Please copy the code manually.");
}

function isChromiumBrowser()
{
	agent = window.navigator.userAgent.toLowerCase();
	if ((agent.indexOf("edg/") > -1) || (agent.indexOf("chrome") > -1 && !!window.chrome))
		return true;
	else
		return false;
}

    

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function checkForStop() {
	if (_stopped)
		throw 'Stopped!';
}

function logError(text)
{
	outputf(Sk.builtins.RESET + Sk.builtins.RED + text + "\n" + Sk.builtins.RESET);
}

function getStyleSheet(unique_title) {
  for(var i=0; i<document.styleSheets.length; i++) {
	var sheet = document.styleSheets[i];
	if(sheet.title == unique_title) {
	  return sheet;
	}
  }
}

function runSkulpt(code) {

	code = stripPeriodFromGoto(code);
	if (document.getElementById("trainingWheels") !== null && document.getElementById("trainingWheels").checked)
		code = pygmify(code);
	_stopped = false;

	// clear the console
	clearConsole();//pyConsole.innerHTML = "";

	resetConsole();

	Sk.configure({
		output: outputf,
		inputfun: inputf,
		inputfunTakesPrompt: false,
		debugging: true, //stepRun ? true : false,
		killableWhile: true,
		//breakpoints: function() { return true; },
		__future__: Sk.python3
	});

	var e = Sk.misceval.asyncToPromise((function() {
		return Sk.importMainWithBody("<stdin>", true, code, true)})
		);

	e.catch((function(err) {
		if (err.message) {
		   logError(err.message);
		   logError(err.stack);
		   if (err.nativeError) {
			   logError(err.nativeError.message);
			   logError(err.nativeError.stack);
		   }
		}
		else {
		   logError(err.toString());
		   if (err.stack)
		   {
			   logError(err.stack);
		   }
	}}));
	e.finally((function() {
		stopSkulpt();
	} ));
}

function stopSkulpt() {
	just_run = false;
}

function stopEditor()
{
	_stopped = true;
	if (inputElement != null)
	{
		// if stopped during an input...
		stopSkulpt();
		userResponse = inputElement.innerText.replace(/\n+$/, "");
		inputElement.remove();
		outputf(userResponse);
		outputf("\n");
		// TODO: fold this into the main promise/catch process?
		inputElement = null;
		logError("Stopped!");
		throw "Stopped!";
	}
}
function checkForPyangelo(code)
{
	var pyangeloPattern = /^(?:\s*import\s+pyangelo.*)|(?:\s*from\s+pyangelo\s+import.*)$/gm;
	var match = code.match(pyangeloPattern);
	return (match != null ? true: false);
}

function setDisplayMode(mode)
{
	if (prevDisplay != null && prevDisplay == mode)
	{
		return;
	}
	var gutters = document.getElementsByClassName("gutter");
	if (typeof(gutters) !== 'undefined' && gutters.length > 0)
	{
		for (gutter of gutters)
		{
			gutter.parentNode.removeChild(gutter);
		}
	}

	prevDisplay = mode;
}

function prefixedCalc () {
	var prefixes = ["","-webkit-","-moz-","-o-"], el;
	for (var i = 0; i < prefixes.length; i++) {
		el = document.createElement('div');
		el.style.cssText = "width:" + prefixes[i] + "calc(9px)";
		if (el.style.length) return prefixes[i] + "calc";
	}
}


// setting up the ace editor
var pyConsole = document.getElementById("console");


var just_run = false;
var _stopped = false;
var inputElement = null;

