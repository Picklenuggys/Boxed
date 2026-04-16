const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
let sounds = true
let music = true
let debug = false
if(localStorage.getItem("settings") !== "1"){
	localStorage.setItem("settings", "1")
	localStorage.setItem("images", true)
	
}
const player = {
	type: "player",
	x: 350,
	y: 204,
	width: 30,
	height: 40,
	xVel: 2,
	yVel: 2,
	jumpHeight: 30,
	jumpCount: 2,
	jumping: false,
	fallSpeed: 1.1,
	gravForce: 6,
	gravCancel: false,
	grav: false,
	direction: "right",
	swing: "right",
	stuck: false,
	xGrounded: 400,
	yGrounded: 300,
	battling: false,
	health: 3,
	damageCD: 25,
	//aCount is speed, frame is the location atm, frameCount is 1-4
	aCount: 12,
	frame: 30,
	frameCount: 0,
	swingFrameCount: 0
}
const battleZone = [
{
	x:2320,
	y: -300,
	height: 400,
	width: 600,
	type: "zone",
	active: true
}, {
	x: -2000,
	y: 0,
	y: 0,
	height: 400,
	width: 600,
	type: "zone",
	active: true
}
]
const playerSwing = {
	x:0,
	y: 0,
	width:0,
	height: 0,
	visible: false,
	attacking: false,
	CD: 25,
	swing: "up",
	type: "hit"
}
const npc = {
	x: 400,
	y: 340,
	width: 30,
	height:60
}
const walls = [{
	x: -62,
	y: 300,
	width: 60,
	height: 10,
	type: "wall"
},
 {x: 0,
	y: 400,
	width: 800,
	height: 10,
	type: "wall"
},
{x: 150,
	y: 150,
	width: 820,
	height: 10,
	type: "wall"
},
{
	x:840,
	y: 320,
	width: 130,
	height: 10,
	type:"wall"
},
{
	x: 1040,
	y: 300,
	width: 130,
	height: 10,
	type:"wall"
},
{
	x: 1340,
	y: 300,
	width: 180,
	height: 10,
	type:"wall"
},
{
	x: 1410,
	y: 0,
	width: 10, 
	height: 230,
	type: "wall" 
},
{
	x: 1520,
	y: 0,
	width: 10, 
	height: 310,
	type: "wall" 
},
{
	x: 1520,
	y: 0,
	width: 100, 
	height: 10,
	type: "wall" 
},
{
	x: 2020,
	y: 0,
	width: 950, 
	height: 70,
	type: "wall" 
},
{
	x: 2320,
	y: -260,
	width: 650, 
	height: 30,
	type: "wall" 
},
{
	x: -300,
	y: 350,
	width: 100, 
	height: 10,
	type: "wall" 
	
},
{
	x: -335,
	y: 50,
	width: 10, 
	height: 190,
	type: "wall" 
},
{
	x: -520,
	y: 50,
	width: 10, 
	height: 190,
	type: "wall" 
},
{
	x: -650,
	y: 350,
	width: 100, 
	height: 10,
	type: "wall" 
	
},
{
	x: -2100,
	y: 350,
	width: 975, 
	height: 10,
	type: "wall" 
	
},
	]
const tape = [{
	x: -2, 
	y: 300,
	width: 10,
	height: 105,
	type: "tape"
},
{
	x: -210, 
	y: 350,
	width: 10,
	height: 105,
	type: "tape"
},
{
	x: -510, 
	y: 240,
	width: 175,
	height: 10,
	type: "tape"
},
{
	x: -750, 
	y: 310,
	width: 35,
	height: 10,
	type: "tape"
},
{
	x: -900, 
	y: 340,
	width: 35,
	height: 10,
	type: "tape"
},
{
	x: -1000, 
	y: 300,
	width: 35,
	height: 10,
	type: "tape"
},
{
	x: -1850,
	y:40,
	width: 20,
	height: 320,
	type: "tape"
},
{
	x: -1600,
	y:40,
	width: 20,
	height: 320,
	type: "tape"
},
{
	x: -82,
	y:385,
	width: 40,
	height: 20,
	type: "tape"
},
]
const bubbleWrap = [
{
	x: 720,
	y:380,
	width: 40,
	height: 20,
	type: "bubbleWrap"
},
{
	x: 1230,
	y:370,
	width: 50,
	height: 20,
	type: "bubbleWrap"
},
{
	x: 1500,
	y:270,
	width: 20,
	height: 10,
	type: "bubbleWrap"
},
{
	x: 1410,
	y:170,
	width: 20,
	height: 10,
	type: "bubbleWrap"
},
{
	x: 1490,
	y:66,
	width: 30,
	height: 10,
	type: "bubbleWrap"
},
{
	x: 1720,
	y:66,
	width: 30,
	height: 10,
	type: "bubbleWrap"
},
{
	x: 1820,
	y:166,
	width: 30,
	height: 10,
	type: "bubbleWrap"
},
{
	x: 1920,
	y:36,
	width: 30,
	height: 10,
	type: "bubbleWrap"
},
{
	x: 2470,
	y: -20,
	width: 50,
	height: 20,
	type: "bubbleWrap"
},
{
	x: 2710,
	y: -20,
	width: 50,
	height: 20,
	type: "bubbleWrap"
},
]
	const gravity = 12
const dialogueBox = {
	x: 100,
	y: 20,
	width: 400,
	height: 160,
	box: true,
	value: 0,
	page: 0
}
//outside array: values, inside out array: lines in one box, innermost: different sections
const dialogue = [[["Hello traveler! What are you doing", "here?"],["Oh... Your trying to leave the box?", "well I have a way out"],["If you defeat the beasts to ", "the left and the right of here", "I will get you out"]],
[["Oh, You've defeated the floating Duckt!"], ["You just have to fight Wrapped", "watch out for the flips"]],
[["Oh, You've defeated the mighty Wrapped!"], ["You just have to fight Duckt", "watch out for the flips"]],
[["You've defeated both of them"],["Well I assume since you defeated these beasts", "You really want to leave"], ["Welp, see ya later"]]]
const wrapped = {
	x: 2700, 
	y: -70,
	height: 60,
	width: 80,
	jumpCD: 600,
	state: false,
	health: 5,
	flipHp: 5,
	xVel: 1.5,
	yVel : 2,
	type: "wrapped",
	damageCD: 25,
	frameCount:0,
	frame: 0,
	aCount:10
	//state false is floor, state true is roof
}
const duckt = {
	x:-1900, 
	y: 100,
	width: 50,
	height: 50,
	xVel: 2,
	yVel:0,
	//d: 290,
	health: 15,
	fly: true,
	soarCount: 6,
	wallCount: 6,
	eggCD: 50,
	damageCD: 25,
	type: "duckt",
	aCount: 6,
	frame: 0,
	frameCount: 0
}
const fallingRocks = [{
	
}]
function death(){
	if(!player.battling){
		player.health = 5
	}
	if(player.health <= 0){
		fallingRocks.splice(0, fallingRocks.length)
		bg = true
		document.getElementById("death").style.display = "block"
		canvas.style.display = "none"
		player.health = 5
		if(player.x < 0){
			player.x = -1530
			player.y = 306
			duckt.health = 15
			duckt.fly = true
			duckt.x = -1900
			duckt.y =200
			duckt.xVel = 2
			duckt.yVel = 0
		}else{
			player.x = 2460
			wrapped.health = 6
			wrapped.state = false
			wrapped.flipHp = 5
			wrapped.x = 2700
			wrapped.y = -70
		}
	}
}
const endCard = false