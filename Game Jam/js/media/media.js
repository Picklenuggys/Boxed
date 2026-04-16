// let var = new Image();
// var.src = "./js/media/image.png
//const var = new Audio(source.mp3)
function musicHandler(){
	if(bg){
		musicPlayer(menuMusic)
	}else{
		musicStopper(menuMusic)
		if(player.battling){
			musicPlayer(boss)
			musicStopper(theme)
		}else{
			musicPlayer(theme)
			musicStopper(boss)
		}
	}
}
function musicPlayer(song){
	if (music){
	song.play()
	}else{
		song.pause()
	}
	}
	function musicStopper(song){
	song.pause()
	song.currentTime = 0;
	}
    function soundPlayer(effect){
        if(sounds){
            effect.play()
        }
    }

function playerAnimation(){
		player.aCount--
		player.frame = 0
		if(playerSwing.visible){
			if(player.aCount <= 0){
			player.aCount = 5
			player.frameCount = 0
		}
		player.frame = 24
			if(player.aCount === 2){
				player.frame += 1
			}
			if(player.direction === "right"){
				player.frame += 2
			}
			if(player.swing === "up"){
				player.frame += 4
			}else if(player.swing === "down"){
				player.frame += 8
			}
		}else{
			/*yes im using comments
			because this will be annoying to look at later
			there may or may not be the coconut from tf2
			*/
			if(player.aCount <= 0){
			player.aCount = 12
			player.frameCount++
			}
			//checks for swing direction
			if(player.direction === "left"){
				
			}
			if(player.direction === "right"){
				player.frame += 4
			}
			if(player.swing === "up"){
				player.frame += 8
			}else if(player.swing === "down"){
				player.frame += 16
			}
		if(player.xVel === 0){
			if(player.frameCount === 3 || player.frameCount === 1){
				player.frameCount += 1
			}
			if(player.frameCount > 3){
			player.frameCount = 0
		}
		}else{
			if(player.frameCount > 3){
			player.frameCount = 0
		}
		}
		}
		player.frame += player.frameCount
		}
		
function wrappedAnimation(){
	wrapped.aCount--
	if(wrapped.aCount <= 0){
		wrapped.aCount = 10
		wrapped.frame = 0
		wrapped.frameCount++
		if(wrapped.frameCount > 3){
			wrapped.frameCount = 0
		}
		if(wrapped.xVel > 0){
			wrapped.frame +=4
		}
		if(wrapped.state){
			wrapped.frame += 8
		}
		wrapped.frame += wrapped.frameCount
	}
}
function ducktAnimation(){
	if(duckt.fly){
	duckt.aCount--
	if(duckt.aCount === 0){
		duckt.aCount = 6
	duckt.frame = 0
	duckt.frameCount++
	if(duckt.frameCount > 3){
		duckt.frameCount = 0
	}
	if(duckt.xVel > 0){
		duckt.frame+= 4
	}
	duckt.frame += duckt.frameCount
	}
	}else{
		duckt.frame = 8
		if(duckt.xVel > 0){
		duckt.frame++
	}
	if(duckt.yVel < 0){
		duckt.frame +=2
	}
	}
}
	//dont even look below here, its a mess
	const pImage = []
for(let i = 0; i < 37; i++){
	pImage[i] = new Image()
}
pImage[0].src = "./js/media/playerSprites/Left1.png"
pImage[1].src = "./js/media/playerSprites/Left2.png"
pImage[2].src = "./js/media/playerSprites/Left3.png"
pImage[3].src = "./js/media/playerSprites/Left4.png"
pImage[4].src = "./js/media/playerSprites/Right1.png"
pImage[5].src = "./js/media/playerSprites/Right2.png"
pImage[6].src = "./js/media/playerSprites/Right3.png"
pImage[7].src = "./js/media/playerSprites/Right4.png"
pImage[8].src = "./js/media/playerSprites/LU1.png"
pImage[9].src = "./js/media/playerSprites/LU2.png"
pImage[10].src = "./js/media/playerSprites/LU3.png"
pImage[11].src = "./js/media/playerSprites/LU4.png"
pImage[12].src = "./js/media/playerSprites/RU1.png"
pImage[13].src = "./js/media/playerSprites/RU2.png"
pImage[14].src = "./js/media/playerSprites/RU3.png"
pImage[15].src = "./js/media/playerSprites/RU4.png"
pImage[16].src = "./js/media/playerSprites/LD1.png"
pImage[17].src = "./js/media/playerSprites/LD2.png"
pImage[18].src = "./js/media/playerSprites/LD3.png"
pImage[19].src = "./js/media/playerSprites/LD4.png"
pImage[20].src = "./js/media/playerSprites/RD1.png"
pImage[21].src = "./js/media/playerSprites/RD2.png"
pImage[22].src = "./js/media/playerSprites/RD3.png"
pImage[23].src = "./js/media/playerSprites/RD4.png"
pImage[24].src = "./js/media/playerSprites/LS1.png"
pImage[25].src = "./js/media/playerSprites/LS2.png"
pImage[26].src = "./js/media/playerSprites/RS1.png"
pImage[27].src = "./js/media/playerSprites/RS2.png"
pImage[28].src = "./js/media/playerSprites/LUS1.png"
pImage[29].src = "./js/media/playerSprites/LUS2.png"
pImage[30].src = "./js/media/playerSprites/RUS1.png"
pImage[31].src = "./js/media/playerSprites/RUS2.png"
pImage[32].src = "./js/media/playerSprites/LDS1.png"
pImage[33].src = "./js/media/playerSprites/LDS2.png"
pImage[34].src = "./js/media/playerSprites/RDS1.png"
pImage[35].src = "./js/media/playerSprites/RDS2.png"
pImage[36].src = "./js/media/playerSprites/RDS1.png"
const wImage = []
for(let i = 0; i <= 15; i++){
	wImage[i] = new Image()
}
wImage[0].src = "./js/media/wrappedSprites/DL1.png"
wImage[1].src = "./js/media/wrappedSprites/DL2.png"
wImage[2].src = "./js/media/wrappedSprites/DL3.png"
wImage[3].src = "./js/media/wrappedSprites/DL4.png"
wImage[4].src = "./js/media/wrappedSprites/DR1.png"
wImage[5].src = "./js/media/wrappedSprites/DR2.png"
wImage[6].src = "./js/media/wrappedSprites/DR3.png"
wImage[7].src = "./js/media/wrappedSprites/DR4.png"
wImage[8].src = "./js/media/wrappedSprites/UL1.png"
wImage[9].src = "./js/media/wrappedSprites/UL2.png"
wImage[10].src = "./js/media/wrappedSprites/UL3.png"
wImage[11].src = "./js/media/wrappedSprites/UL4.png"
wImage[12].src = "./js/media/wrappedSprites/UR1.png"
wImage[13].src = "./js/media/wrappedSprites/UR2.png"
wImage[14].src = "./js/media/wrappedSprites/UR3.png"
wImage[15].src = "./js/media/wrappedSprites/UR4.png"
const dImage = []
for(let i = 0; i <= 11; i++){
	dImage[i] = new Image()
}
dImage[0].src = "./js/media/ducktSprites/L1.png"
dImage[1].src = "./js/media/ducktSprites/L2.png"
dImage[2].src = "./js/media/ducktSprites/L3.png"
dImage[3].src = "./js/media/ducktSprites/L4.png"
dImage[4].src = "./js/media/ducktSprites/R1.png"
dImage[5].src = "./js/media/ducktSprites/R2.png"
dImage[6].src = "./js/media/ducktSprites/R3.png"
dImage[7].src = "./js/media/ducktSprites/R4.png"
dImage[8].src = "./js/media/ducktSprites/DL.png"
dImage[9].src = "./js/media/ducktSprites/DR.png"
dImage[10].src = "./js/media/ducktSprites/UL.png"
dImage[11].src = "./js/media/ducktSprites/UR.png"
let eggImage = new Image()
eggImage.src = "./js/media/assets/egg.png"
let rockImage = new Image()
rockImage.src =  "./js/media/assets/rock.png"
let menuMusic = new Audio()
menuMusic.src = "./js/media/audio/MenuTheme.m4a"
let victory = new Audio()
victory.src = "./js/media/audio/Victory.m4a"
let boss = new Audio()
boss.src = "./js/media/audio/bossTheme.m4a"
let theme = new Audio()
theme.src = "./js/media/audio/Theme.m4a"
let thwack = new Audio()
thwack.src = "./js/media/audio/slap.m4a"
//i lied no coconut