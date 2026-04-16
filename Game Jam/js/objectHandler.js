function collisionCheck(object1, object2){
		if(object1.xVel === undefined){
		object1.xVel = 0
	}
	if(object1.yVel === undefined){
		object1.yVel = 0
	}
		if(object2.xVel === undefined){
		object2.xVel = 0
	}
	if(object2.yVel === undefined){
		object2.yVel = 0
	}
	let returnedValue = false
	if(
	object1.x + object1.xVel <= object2.x + object2.width + object2.xVel	&&
    object1.x + object1.width + object1.xVel >= object2.x + object2.xVel &&
    object1.y <= object2.y + object2.height &&
    object1.y + object1.height >= object2.y ){
			collisionResponseX(object1, object2)
		returnedValue = true
	}
	if(
	object1.x <= object2.x + object2.width &&
    object1.x + object1.width  >= object2.x &&
    object1.y + object1.yVel  <= object2.y + object2.height + object2.yVel &&
    object1.y + object1.height + object1.yVel >= object2.y + object2.yVel){
			collisionResponseY(object1, object2)
			returnedValue = true
	}
	return returnedValue
}
function collisionResponseX(object1, object2){
	if(object2.type === "wall" || object2.type === "tape"){
		if(object1.type === "wrapped"){
			object1.xVel *= -1
		}else{
		object1.xVel = 0
		}
	}
	if(object1.type === "hit" && object1.attacking && object2.type === "wrapped"){
		if(wrapped.damageCD <= 0){
		wrapped.flipHp--
		wrapped.damageCD = 25
	}
	}
	if(object1.type === "hit" && object1.attacking && object2.type === "duckt"){
		if(duckt.damageCD <= 0){
		duckt.health--
		duckt.damageCD = 25
	}
	}
	if(object1.type === "hit" &&  object1.attacking && object2.type === "bubbleWrap"){
		player.bubbleCount = 20
	}
	if(object1.type === "hit" &&  object1.attacking && object2.type === "tape"){
		player.stuck = true
	}
	if(object1.type === "player"){
		if(object2.type === "rock" || object2.type === "wrapped" || object2.type === "duckt"){
			if(player.damageCD <= 0){
			player.health--
			player.damageCD = 70
			}
		}
	}
}
function collisionResponseY(object1, object2){
	if(object2.type === "wall" || object2.type === "tape"){
		object1.yVel = 0
		if(object1.type === "player"){
		if(object1.y + object1.height <= object2.y){
			object1.gravity = false
			object1.gravCancel = true
			player.gravForce = 1.1
			player.xGrounded = player.x
			player.yGrounded = player.y
			object1.jumpCount = 0
			object1.yVel = 0
			}
		}
		object1.yVel = 0
	}
	if(object1.type === "hit" && object1.attacking && object2.type === "bubbleWrap"){
		player.bubbleCount = 20
	}
	if(object1.type === "hit" &&  object1.attacking && object2.type === "tape"){
		player.stuck = true
	}
	if(object1.type === "player"){
		if(object2.type === "rock" || object2.type === "wrapped" || object2.type === "duckt"){
			if(player.damageCD <= 0){
			player.health--
			player.damageCD = 70
			}
		}
	}
}
function dialogueHandlet(){
	dialogue.box = true	
}
function grav(object){
	if(!player.stuck){
	if(!object.gravCancel || object.gravity){
		if(object.gravForce * object.fallSpeed <= gravity){
				object.gravForce *= object.fallSpeed
		}
				object.yVel = object.gravForce
}else{
	object.gravForce = 1
}}else{
	player.gravForce = 1.1
	player.jumpCount = 0
	player.gravCancel = true
	player.gravity = false
}
}
function wrappedMovement(){
	wrapped.damageCD--
	if(wrapped.health == 0){
		if(player.battling){
		if(player.x > 0){
		player.battling = false
		soundPlayer(victory)
			}
		wrapped.y = -1000
		battleZone[0].active = false
		}
	}
	if(wrapped.flipHp <= 0){
		wrapped.state = !wrapped.state
		if(wrapped.state){
			wrapped.yVel = -6
			wrapped.flipHp = 5
			wrapped.health--
		}else{
			wrapped.yVel = 6
			wrapped.flipHp = 5
			wrapped.health--
		}
	}
	if(wrapped.x + wrapped.xVel <= camera.x || wrapped.x + wrapped.width + wrapped.xVel >= camera.x + camera.width){
		wrapped.xVel *= -1
	}
	let move = Math.floor(Math.random() * 20)
	if(player.battling){
	if(move > 10){
		let xValue = (Math.floor(Math.random() * 600) + 2320)
		if(fallingRocks.length < (4 - wrapped.health) * 2){
		fallingRocks.push({
	x: xValue,
	y: -250,
	width: 20,
	height: 20,
	type: "rock"
		}
	)
		}
	}
	}
	for(let i = 0; i < walls.length; i++){
		collisionCheck(wrapped ,walls[i])
	}
	collisionCheck(playerSwing, wrapped)
	collisionCheck(playerSwing, duckt)
	wrapped.x += wrapped.xVel
	wrapped.y += wrapped.yVel
}
function swingHit(){
	for(let i = 0; i < bubbleWrap.length; i++){
		if(cameraDraw(bubbleWrap[i])){
	collisionCheck(playerSwing, bubbleWrap[i])
	}
	if(player.bubbleCount >= 0){
		player.gravCancel = true
		player.yVel -= 4
		player.gravForce = 0.1
	}else{
		player.bubbleCount = -1
		player.gravCancel = false
	}
	player.bubbleCount--
	}
	for(let i = 0; i < tape.length; i++){
		if(cameraDraw(tape[i]))
		collisionCheck(playerSwing, tape[i])
	}
}
function rock(){
	if(fallingRocks[0] !== undefined){
	for(let i = 0; i < fallingRocks.length; i++){
	if(!cameraDraw(fallingRocks[i])){
		fallingRocks.splice(i, 1)
	}else{
		fallingRocks[i].y += 2
	}
	}
	}
}
function battleDetect(){
	let zone
	if(player.x > 0){
		zone = 0
	}else{
		zone = 1
	}
	if(collisionCheck(player, battleZone[zone])){
		if(zone === 0){
			if(wrapped.health !== 0){
				if(!player.battling){
					player.battling = true
					player.x += 40
				}
			}else{
				player.battling = false
			}
		}else{
			if(duckt.health !== 0){
			if(!player.battling){
				player.x -= 40
			player.battling = true
			}
		}else{
			player.battling = false
		}
		}
	}
	if(player.battling){
		if(player.x + player.xVel < battleZone[zone].x || player.x + player.width + player.xVel > battleZone[zone].x + battleZone[zone].width){
			player.xVel = 0
		}
	}
}
function ducktMovement(){
	duckt.damageCD--
	if(duckt.health == 0){
		if(player.battling){
			if(player.x < 0){
		player.battling = false
		soundPlayer(victory)
			}
		duckt.y = -1000
		battleZone[1].active = false
		}
		battleZone[1].active = false
	}
	
	if(player.battling){
	if(duckt.fly){
		duckt.eggCD--
		duckt.yVel = Math.sin(duckt.x/10) * 3
		if(duckt.x < camera.x || duckt.x + duckt.width > camera.x + camera.width){
			duckt.wallCount--
			duckt.xVel *= -1
			duckt.yVel += 20
		}
		if(duckt.y < camera.y || duckt.y + duckt.height > 350 || duckt.wallCount === 0){
			duckt.fly = false
			duckt.soarCount= Math.floor(Math.random()* 4) + 4
		}
		if(duckt.eggCD <= 0){
			duckt.eggCD = Math.random() * 20 + 40
		if(fallingRocks.length < (15 - duckt.health/3) * 2 + 1){
		fallingRocks.push({
	x: duckt.x + duckt.width/2,
	y: duckt.y,
	width: 20,
	height: 20,
	type: "rock"
		}
	)
		}
		}
	}else{
		if(!collisionCheck(duckt, camera)){
			duckt.soarCount--
			duckt.x = Math.random() * 550 - 2000 
			duckt.y = 1
			let slope = ((duckt.y - player.y)/(duckt.x - player.x))
			if(duckt.x < player.x){
				duckt.xVel = 2
			}else{
			duckt.xVel = -2
			}
			duckt.yVel = duckt.xVel * slope
			if(duckt.soarCount === 0){
				duckt.fly = true
				duckt.wallCount = 4 * Math.floor(Math.random * 4) + 2
			}
		}
	}
	duckt.x += duckt.xVel
	duckt.y += duckt.yVel
}
}