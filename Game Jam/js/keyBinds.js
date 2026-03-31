let keyDown = {
	up: false,
	down: false,
	left: false,
	right: false,
	attack: false
}
function detectKeys (){
		     document.addEventListener('keydown', event => {
                if(event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft') keyDown.left = true;
                if(event.key.toLowerCase() === 'd' || event.key === 'ArrowRight') keyDown.right = true;
				if(event.key.toLowerCase() === 'w' || event.key === 'ArrowUp') keyDown.up = true;
                if(event.key.toLowerCase() === 's' || event.key === 'ArrowDown') keyDown.down = true;
                if(event.key.toLowerCase() === ' ') keyDown.jump = true;
				if(event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'j') keyDown.attack = true;
				//if(event.key === "Shift" || event.key === "ShiftRight") keyDown.sprint = true;
				if(event.key.toLowerCase() === "t")keyDown.test = true
         });
	        document.addEventListener('keyup', event => {
                if(event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft') keyDown.left = false;
                if(event.key.toLowerCase() === 'd' || event.key === 'ArrowRight') keyDown.right = false;
				if(event.key.toLowerCase() === 'w' || event.key === 'ArrowUp') keyDown.up = false;
                if(event.key.toLowerCase() === 's' || event.key === 'ArrowDown') keyDown.down = false;
                if(event.key.toLowerCase() === ' ') keyDown.jump = false;
				if(event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'j') keyDown.attack = false;
				if(event.key === "Shift" || event.key === "ShiftRight") keyDown.sprint = false;
				if(event.key.toLowerCase() === "t")keyDown.test = false
         });
		 
}
function keyResponse(){
	if(!player.stuck){
	if(keyDown.left){
		player.xVel += -2
		player.direction = "left"
		player.swing = "left"
		if(keyDown.sprint){
		player.xVel -= 4
	}
	}else if(keyDown.right){
		player.xVel += 2
		player.direction = "right"
		player.swing = "right"
		if(keyDown.sprint){
		player.xVel += 4
	}
	}
	if(keyDown.up){
		player.swing = "up"
	}else if(keyDown.down){
		player.swing = "down"
	}
	}
	if(keyDown.test){
		alert(player.x + " " + player.y)
	}
	}
function jump(){
	if(!player.gravity && keyDown.jump){
		player.stuck = false
		if(player.jumpCount < 25 ){
			player.gravCancel = true
			player.yVel = -3
			player.jumpCount += 1
		}else{
			player.gravCancel = false
			player.gravity = true
		}
	}else{
		player.gravCancel = false
		player.gravity = true
	}
}
function outside(){
	player.outsideX = 0
	player.outsideY = 0
}
function swordLocation(){
	if(playerSwing.swing === "up"){
		playerSwing.width = player.height
		playerSwing.height = player.width
		playerSwing.x = player.x + player.width/2 - playerSwing.width/2 + player.xVel
		playerSwing.y = player.y - playerSwing.height + player.yVel
	}else if(playerSwing.swing === "down"){
		playerSwing.width = player.height
		playerSwing.height = player.width
		playerSwing.x = player.x + player.width/2 - playerSwing.width/2 + player.xVel
		playerSwing.y = player.y + player.height + player.yVel
	}else if(playerSwing.swing === "right"){
		playerSwing.width = player.width
		playerSwing.height =  player.height
		playerSwing.y = player.y + player.height/2 - playerSwing.height/2  + player.yVel
		playerSwing.x = player.x + player.width + player.xVel
	}else{
		playerSwing.width = player.width
		playerSwing.height =  player.height
		playerSwing.y = player.y + player.height/2 - playerSwing.height/2 + player.yVel
		playerSwing.x = player.x - playerSwing.width + player.xVel
	}
	
	}
function swing(){
	if(keyDown.attack && playerSwing.CD <= 0){
		soundPlayer(thwack)
		player.aCount = 0
		playerSwing.swing = player.swing
		playerSwing.visible = true
		playerSwing.attacking = true
		playerSwing.CD = 30
	}else{
		playerSwing.CD--
	}
	if(playerSwing.CD < 20){
		playerSwing.visible = false
		playerSwing.attacking = false
	}
}
