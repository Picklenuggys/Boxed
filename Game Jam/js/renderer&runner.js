let start = false
const camera = {
	x:0,
	y:0,
	width: 600,
	height: 400,
	fade:0.2
}
function draw(){
	playerAnimation()
	wrappedAnimation()
	ducktAnimation()
	let scaled
	if(window.innerHeight/400 < window.innerWidth/600){
		scaled = window.innerHeight/400 * 0.90
	}else{
		scaled = window.innerWidth/600 * 0.90
	}
	canvas.width = 600 * scaled
	canvas.height = 400 * scaled
	
	if(player.y - 500 > player.yGrounded){
		player.x = player.xGrounded
		player.y = player.yGrounded
		if(!player.battling){
		cameraCenter()
		camera.fade = 1
		}
	}
	let bg2 = new Image()
	bg2.src = "./js/media/assets/bg2.png"
	context.drawImage(bg2, 0,0, canvas.width, canvas.height)
	if(debug){
		drawer(npc)
	context.fillStyle = "yellow"
	for(let i = 0; i < tape.length; i++){
	drawer(tape[i])
	}
	context.fillStyle = "black"
	for(let i = 0; i < walls.length; i++){
		drawer(walls[i])
		}
	context.fillStyle = "grey"
	if(playerSwing.visible){
	drawer(playerSwing)
	}
	drawer(wrapped)
	drawer(duckt)
	
	for(let i = 0; i < fallingRocks.length; i++){
		drawer(fallingRocks[i])
	}
	context.fillStyle = "black"
	drawer(player)
	context.fillStyle = "grey"
	for(let i = 0; i < bubbleWrap.length; i++){
	drawer(bubbleWrap[i])
	}
	}
	let image = new Image()
	image.src = "./js/media/playerSprites/Left1.png"
	context.drawImage(image, 0, 0, 30* scaled, 40* scaled)
	image = new Image()
	image.src = "./js/media/assets/Charles.png"
	ImageDrawer(image, npc)
	 image = new Image()
	image.src = "./js/media/assets/tape.png"
	for(let i = 0; i < tape.length; i++){
	ImageDrawer(image, tape[i])
}
	if(player.damageCD % 6 === 0 && player.damageCD > 0){
		context.globalAlpha = 0.4
	}
	ImageDrawer(pImage[player.frame], player)
	context.globalAlpha = 1
	if(wrapped.damageCD % 6 === 0 && wrapped.damageCD > 0){
		context.globalAlpha = 0.4
	}
	ImageDrawer(wImage[wrapped.frame] , wrapped)
	context.globalAlpha = 1
	if(duckt.damageCD % 6 === 0 && duckt.damageCD > 0){
		context.globalAlpha = 0.4
	}
	ImageDrawer(dImage[duckt.frame], duckt)
	context.globalAlpha = 1
for(let i = 0; i < fallingRocks.length; i++){
	if(fallingRocks[i].x > 0){
		ImageDrawer(rockImage, fallingRocks[i])
	}else{
		ImageDrawer(eggImage, fallingRocks[i])
	}
}
context.fillStyle = "grey"
context.globalAlpha = 0.4
	if(playerSwing.visible){
	drawer(playerSwing)
	}
	context.globalAlpha = 1
 image = new Image()
image.src = "./js/media/assets/wall.png"
for(let i = 0; i < walls.length; i++){
	ImageDrawer(image, walls[i])
}
 image = new Image()
image.src = "./js/media/assets/bubbleWrap.png"
for(let i = 0; i < bubbleWrap.length; i++){
	ImageDrawer(image, bubbleWrap[i])
}
context.fillStyle = "black"
context.font = 20 * scaled + "px Arial"
if(dialogueBox.visible){
context.fillRect(dialogueBox.x * scaled, dialogueBox.y * scaled, dialogueBox.width * scaled, dialogueBox.height * scaled)
context.fillStyle = "white"
for(let i = 0; i < dialogue[dialogueBox.value][dialogueBox.page].length ; i++){
	context.fillText(dialogue[dialogueBox.value][dialogueBox.page][i], 120 * scaled, (80 + 20 * i) * scaled,)
}
}
context.fillStyle = "black"
	context.globalAlpha = camera.fade
	context.fillRect(0, 0, canvas.width, canvas.height)
	context.globalAlpha = 1
	context.font = 20 * scaled + "px Arial"
	context.fillText("Health: " + player.health, 30 * scaled, 50 * scaled)
	if(player.battling){
		if(player.x > 0){
			context.fillText("Wrapped Health: " + (wrapped.flipHp + wrapped.health* 5), 300 * scaled, 50 * scaled)
		}else{
			context.fillText("duckt Health: " + (duckt.health), 300 * scaled, 50 * scaled)
		}
	}
	if(endCard){
		image = new Image()
		image.src = "./js/media/assets/endCard.png"
		context.drawImage(image,0,0, canvas.width, canvas.height)
	}
}
function drawer(object){
	let scaled
	if(window.innerHeight/400 < window.innerWidth/600){
		scaled = window.innerHeight/400 * 0.90
	}else{
		scaled = window.innerWidth/600 * 0.90
	}
	if(cameraDraw(object)){
	context.fillRect(object.x * scaled - camera.x * scaled, object.y * scaled - camera.y * scaled, object.width * scaled, object.height * scaled)
}
}
function ImageDrawer(image, object){
	let scaled
	if(window.innerHeight/400 < window.innerWidth/600){
		scaled = window.innerHeight/400 * 0.90
	}else{
		scaled = window.innerWidth/600 * 0.90
	}
	if(cameraDraw(object)){
		
	context.drawImage(image, object.x * scaled - camera.x * scaled -(5 * scaled), object.y * scaled - camera.y * scaled -(5 * scaled), object.width * scaled +(5 * scaled), object.height * scaled +(5 * scaled))

	}
}
function cameraCenter(){
	camera.x = player.x + player.width/2 - camera.width/2
	camera.y = player.y + player.height/2 - camera.height/2
}
function cameraMove(){
	if(player.x - camera.x < 150){
	camera.x += player.xVel
	}else if (player.x - camera.x > 450){
		camera.x += player.xVel
	}
	if(player.y - camera.y < 100){
		camera.y += player.yVel
	}
	if(player.y - camera.y > 300){
		camera.y += player.yVel
	}
}
function fade(){
	if(camera.fade - 0.01 > 0){
	camera.fade -= 0.01
	}
}
function frame(){
	detectKeys()
	outside()
	player.damageCD--
	fade()
	player.xVel = player.outsideX
	player.yVel = player.outsideY
	player.gravCancel = false
	jump()
	grav(player)
	keyResponse()
	swingHit()
	for(let i = 0; i < walls.length; i++){
		if(cameraDraw(walls[i])){
	collisionCheck(player, walls[i])
		}
	}
	//yeah i decided it would be better without collision, allows for the challenge section
	/*for(let i = 0; i < tape.length; i++){
		if(cameraDraw(tape[i])){
	collisionCheck(player, tape[i])
		}
	}
	*/
	collisionCheck(player, wrapped)
	collisionCheck(player, duckt)
	for(let i = 0; i < fallingRocks.length; i++){
	collisionCheck(player, fallingRocks[i])
	}
	battleDetect()
	swordLocation()
	swing()
	wrappedMovement()
	ducktMovement()
	rock()
	player.x += player.xVel
	player.y += player.yVel
	if(!player.battling){
	cameraMove()
	}else{
		cameraBattleCenter()
	}
}
function update(){
	document.addEventListener("click", () => start = true)
	if(music && start){
		musicHandler()
		}
	if(bg){
	Htmlscale()
	buttonCheck()
	let bgCanvas = document.getElementById("bg")
	bgCanvas.style.display = "inline"
	}else{
		let bgCanvas = document.getElementById("bg")
	bgCanvas.style.display = "none"
		frame()
		dialogueValue()
		dialogueToggler()
		death()
		draw()
	}
requestAnimationFrame(update);
}
cameraCenter()
update();
function cameraDraw(object){
	if(object.x <= camera.x + camera.width &&
		object.x + object.width >= camera.x &&
		object.y <= camera.y + camera.height &&
		object.y + object.height >= camera.y
	){
		return true
	}else{
	return false
	}
}
function cameraBattleCenter(){
	let zone
	if(player.x > 0){
		zone = 0
	}else{
		zone = 1
	}
	if(battleZone[zone].active){
	camera.x = battleZone[zone].x 
	camera.y = battleZone[zone].y
	}
}
function dialogueValue(){
	if(wrapped.health === 0 && duckt.health === 0){
		if(dialogueBox.value !==3){
			dialogueBox.page = 0
		}
		dialogueBox.value = 3
	}else if (wrapped.health === 0){
		if(dialogueBox.value !==2){
			dialogueBox.page = 0
		}
		dialogueBox.value = 2
	}else if(duckt.health === 0){
		if(dialogueBox.value !==1){
			dialogueBox.page = 0
		}
		dialogueBox.value = 1
	}
}
function dialogueToggler(){
	if(playerSwing.visible){
	if(collisionCheck(playerSwing, npc)){
		dialogueBox.visible = true
		//dialogue[value][page][line]
		if( playerSwing.CD === 30){
			if(dialogueBox.page + 1 !== dialogue[dialogueBox.value].length){
				dialogueBox.page++
			}else{
				dialogueBox.visible = false
				if(dialogueBox.value === 3){
					endCard = true
				}
			}
		}
	}
}
if(player.x - npc.x > 200 || npc.x - player.x > 200){
	dialogueBox.visible = false
}
}