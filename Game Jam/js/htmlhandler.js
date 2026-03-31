//html scaling and starting variables
let bg = true
function Htmlscale(){
	let scaled
	if(window.innerHeight/400 < window.innerWidth/600){
		scaled = window.innerHeight/400
	}else{
		scaled = window.innerWidth/600
	}
let divs = document.getElementsByTagName("div")
for(let i = 0; i <= divs.length - 1; i++){
divs[i].style.fontSize = 40 * scaled;
}
let spans = document.getElementsByTagName("span")
for(let i = 0; i <= spans.length - 1; i++){
spans[i].style.fontSize = 20 * scaled;
}
let buttons = document.getElementsByTagName("button")
for(let i = 0; i <= buttons.length - 1; i++){
buttons[i].style.fontSize = 12 * scaled;
buttons[i].style.width = 120 * scaled;
}
let canvasbg = document.getElementById("bg")
canvasbg.style.zIndex = -1
canvasbg.style.width = 600 * scaled
canvasbg.style.height = 400 * scaled
let context = canvasbg.getContext("2d")
let image = new Image()
image.src = "./js/media/assets/bg.png"
context.drawImage(image, 0, 0, canvas.width, canvas.height)
}
function buttonCheck(){
	document.getElementById("start").addEventListener("click", () =>{
		let divs = document.getElementsByTagName("div")
		divs[0].style.display = "none"
		canvas.style.display = "block"
		bg = false
	})
	document.getElementById("credit").addEventListener("click", () =>{
		let divs = document.getElementsByTagName("div")
		divs[0].style.display = "none"
		let span = document.getElementById("credits")
		span.style.display = "block"
	})
	document.getElementById("links").addEventListener("click", () =>{
		let span = document.getElementById("link")
		span.style.display = "block"
		span = document.getElementById("menu")
		span.style.display = "none"
	})
	document.getElementById("credits2menu").addEventListener("click", () =>{
		let span = document.getElementById("credits")
		span.style.display = "none"
		span = document.getElementById("menu")
		span.style.display = "block"
	})
	document.getElementById("links2menu").addEventListener("click", () =>{
		let span = document.getElementById("link")
		span.style.display = "none"
		span = document.getElementById("menu")
		span.style.display = "block"
	})
	document.getElementById("settings").addEventListener("click", () =>{
		let span = document.getElementById("setting")
		span.style.display = "block"
		span = document.getElementById("menu")
		span.style.display = "none"
	})
	document.getElementById("settings2menu").addEventListener("click", () =>{
		let span = document.getElementById("setting")
		span.style.display = "none"
		span = document.getElementById("menu")
		span.style.display = "block"
	})
	document.getElementById("respawn").addEventListener("click", () =>{
	let span = document.getElementById("death")
	span.style.display = "none"
	canvas.style.display = "block"
		bg = false
	})
	document.getElementById("control2menu").addEventListener("click", () =>{
		let span = document.getElementById("control")
		span.style.display = "none"
		span = document.getElementById("menu")
		span.style.display = "block"
	})
	document.getElementById("menu2controls").addEventListener("click", () =>{
		let span = document.getElementById("menu")
		span.style.display = "none"
		span = document.getElementById("control")
		span.style.display = "block"
	})
	document.getElementById("images").addEventListener("click", () =>{	
		debug = !debug
		document.getElementById("images").innerHTML = "debug: " + debug
	})
	document.getElementById("music").addEventListener("click", () =>{	
		music = !music
		document.getElementById("music").innerHTML = "music: " + music
	})
	document.getElementById("sound").addEventListener("click", () =>{	
		sound = !sound
		document.getElementById("sound").innerHTML = "sound: " + sound
	})
}