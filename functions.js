var mouseDown = [0, 0, 0, 0, 0, 0, 0, 0, 0], mouseDownCount = 0
var click = [false, 0]
function overflowRange(min, max, n) {
	var size = max-min+1
	if (n>max) return min+(n-max)%size
	else if (n<min) return max+(n-min)%size
	else return n 
}
function repeatFunc(func,times){while(times--){func()}}
document.body.onmousedown = function(evt) { 
	mouseDown[evt.button] = 1;
}
canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }
document.body.onmouseup = function(evt) {
       mouseDown[evt.button] = 0;
}
function weighted_random(a) {
	//a = {"2":weight}
	var b,c=0,d
	for (b in a) c += a[b]
	d = Math.random()*c
	for (b in a) {
		if (d < a[b]) return b
		d -= a[b]
	}
}
function anti_weighted_random(b) {
	a = JSON.parse(JSON.stringify(b))
		for (let n in a) {
			a[n] = 1/a[n]
	     	}
	return weighted_random(a)
}
function getMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	mousePos = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
} //stolem code boo boo boo boo boo boo
function randomRange(min, max) {return Math.random()*(max-min)+min}
function lerp(a,b,t) {
     t = Math.max(Math.min(1,t),0)
     return t*(b-a)+a
}
function unlerp(a,b,t) {
     return (t-a)/(b-a)
}
function clamp(min,max,x) {
     return Math.min(max,Math.max(min,x))
}
function loglerp(a,b,t) {return Math.E**lerp(Math.log(a),Math.log(b),t)}
var keyPressed = {}
window.onkeyup   = function (e) {keyPressed[e.key.toLowerCase()] = false}
window.onkeydown = function (e) {keyPressed[e.key.toLowerCase()] = true }
function updateClick() {
	click[0] = (click[1] != mouseDown[0]) && mouseDown[0]
	click[1] = mouseDown[0]
}
function fix(x) {
	if (x.layer == undefined) x = N(x)
	if (lt(x,1000)) {
		if (gte(sub(x,floor(x)),0.0005)) return x.toFixed(3)
		return floor(x).toString()
	}
	switch (player.settings.notation) {
		case 0: //scientific
			if (lt(x,"ee6")) {
				var p = x.log10(), m = pow(10,sub(p,floor(p)))
				return m.toStringWithDecimalPlaces(2) + "e" + floor(p)
			}
		break;
		case 1: //letters
			if (lt(x, "ee100")) {
				var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
				var exp = x.log10(), man = pow(10,sub(exp,floor(exp))), str = ""

				//higher precision i think
				exp = floor(exp).toNumber()
				man = mul(man,10**(exp%3))
				exp = (exp-exp%3)/3-1

				//convert
				while (exp >= 0) {
					str += alphabet[exp%26]
					exp = (exp-exp%26)/26
					exp--
				}
				return fix(man) + str.split("").reverse().join("")
			}
			
		break;
	}
	
}
function copyObj(a,b) {
	//a: template, b: object
	if (typeof a == "object" && typeof b == "object") {
		if (a.layer != undefined) {
			return N(b)
			//is a an expantanum?
		}
		for (let k in a) {
			b[k] = copyObj(a[k],b[k])
		}
		return b
	} else if (typeof a == "object" && typeof b !== "object") {
		return a
	} else {
		if (b == undefined) return a
		else return b
	}
}
function GEID(x) {return document.getElementById(x)}