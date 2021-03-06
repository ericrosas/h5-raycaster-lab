/** Systeme de menu principal
 * 
 *
 */
O2.extendClass('MenuSystem', 'Cutscene', {
	
	RAYCASTER_WIDTH: 400,
	RAYCASTER_HEIGHT: 250,
	
	bWallPainted: false,
	
	__construct: function() {
		__inherited();
		
		this.bWallPainted = false;

		var nLabySize = this.oRaycaster.nMapSize;
		var nLabyWidth = nLabySize * this.oRaycaster.nPlaneSpacing;
		var t = this.oRaycaster.oCamera.oThinker;
		this.oCameraThinker = t;
		t.xStart = 320;
		t.yStart = 416;
		t.yDelta = 2;
		t.nTime = (nLabyWidth - this.oRaycaster.oCamera.y - this.oRaycaster.oCamera.y) / this.oRaycaster.oCamera.oThinker.yDelta | 0;
		t.nState = 0;
		t.oRaycaster = this.oRaycaster;
		t.thinkStop = function() {
			this.nState = (this.nState + 1) & 3;
			var x0 = 320;
			var y0 = 416;
			var nSpeed = 2;
			var xMax = this.oRaycaster.nPlaneSpacing * this.oRaycaster.nMapSize - x0; 
			var yMax = this.oRaycaster.nPlaneSpacing * this.oRaycaster.nMapSize - y0; 
			switch (this.nState) {
				case 0:
					this.xStart = x0;
					this.yStart = y0;
					this.aStart = 0;
					this.xDelta = 0;
					this.yDelta = nSpeed;
					break;

				case 1:
					this.xStart = y0;
					this.yStart = xMax;
					this.aStart = 3 * PI / 2;
					this.xDelta = nSpeed;
					this.yDelta = 0;
					break;

				case 2:
					this.xStart = xMax;
					this.yStart = yMax;
					this.aStart = PI;
					this.xDelta = 0;
					this.yDelta = -nSpeed;
					break;

				case 3:
					this.xStart = yMax;
					this.yStart = x0;
					this.aStart = PI / 2;
					this.xDelta = -nSpeed;
					this.yDelta = 0;
					break;
			}
			this.think = this.thinkInit;
		};
	},
	
	
	setFinalCanvas: function(c) {
		__inherited(c);
		this.xRC = (this.oRenderCanvas.width - this.oRCCanvas.width) >> 1;
		this.yRC = 32;
	},
	

	getLevelData: function() {
		return {
			map: [],
			walls: GFX_DATA.textures.t_intro,
			visual: GFX_DATA.visuals.dark,
			startpoint: {
				x: 320,
				y: 416,
				angle: 0
			},
			tiles: {
				d_pictures: GFX_DATA.tiles.d_pictures,
				d_title: GFX_DATA.tiles.d_title
			},
			blueprints: {},
			objects: []
		};
	},
	
	/** 
	 * Définition des données du raycaster
	 */
	getLabyMap: function() {
		return [[1,1,5,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,5,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
				[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,1,1,100,0,0,0,0,0,97,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,96,0,0,0,0,0,98,1,96,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,96,0,0,0,96,99,96,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,100,98,0,0,99,100,0,1,0,0,0,0,0,0,0,5],
				[1,0,0,0,0,0,7,1,1,0,9,0,0,0,1,1,1,1,1,3,2,3,1,1,1,1,1,1,0,1,1,1,1,1,1,3,2,3,1,1,1,1,1,3,2,3,1,1,1,1,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,7,0,1,1,1,0,0,0,1,1,16,0,0,0,0,80,0,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,8,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,64,64,70,64,64,0,1,48,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,4,0,0,80,0,80,0,82,4,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,4,0,66,0,0,68,64,0,4,0,0,0,0,0,0,0,5],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,83,80,83,0,0,2,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,2,0,69,0,0,0,64,0,2,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,7,1,0,0,0,0,0,0,0,4,82,0,80,83,80,0,80,4,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,4,0,66,0,0,68,64,0,4,48,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,7,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,80,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,0,64,64,70,64,64,0,1,0,0,0,0,0,0,0,5],
				[1,0,0,0,0,0,1,8,1,1,1,1,1,1,1,0,1,1,80,80,0,80,80,1,1,1,0,1,1,0,0,1,1,8,7,7,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2,3,1,1,1,1,0,1,1,1,9,1,1,0,0,1,1,1,19,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,96,97,0,0,0,100,98,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1],
				[5,0,0,0,0,0,32,0,1,0,0,0,0,0,0,0,1,98,0,0,0,0,0,96,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,64,64,70,64,64,0,1,1,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,32,0,4,0,0,0,0,0,0,0,1,99,0,0,0,0,0,100,1,0,0,0,0,0,0,0,4,1,1,1,1,1,1,1,1,0,64,68,0,0,66,0,4,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,64,0,0,0,69,0,2,0,1,0,0,0,0,0,1],
				[5,0,0,0,0,0,32,0,4,0,0,0,0,0,0,0,1,96,0,0,0,0,0,100,1,1,1,1,0,0,0,0,4,1,1,1,0,1,1,7,1,0,64,68,0,0,66,0,4,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,32,0,1,0,0,0,0,0,0,0,1,100,0,0,0,0,0,100,1,1,1,1,0,0,0,0,1,1,1,1,0,1,0,7,1,0,64,64,70,64,64,0,1,0,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,100,96,96,0,96,96,0,1,1,1,1,0,0,0,1,1,1,1,1,0,1,0,8,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,1,1,1,1,3,2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,96,99,1,0,0,0,0,81,81,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,5],
				[1,0,0,0,0,0,0,98,1,0,0,0,0,0,0,82,1,0,32,32,0,0,32,0,1,0,64,64,64,64,64,0,1,1,1,1,0,1,8,7,7,0,64,64,64,64,64,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,97,1,0,0,80,80,80,0,82,4,0,32,32,0,0,32,0,1,0,64,0,64,0,64,0,4,1,1,1,0,1,1,1,1,0,64,67,0,67,64,0,1,0,0,0,0,0,0,0,1],
				[5,0,0,0,0,0,0,0,1,0,0,0,80,0,0,0,2,0,0,0,0,0,0,0,1,0,70,0,0,0,70,0,2,0,0,0,0,0,0,0,2,0,70,0,0,0,70,0,1,0,0,0,0,0,0,0,5],
				[1,0,0,0,0,0,0,0,1,82,0,80,0,80,0,82,4,0,32,32,0,0,0,0,1,0,64,0,0,0,64,0,4,1,7,1,1,5,1,1,1,0,64,0,0,0,64,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,98,1,82,0,0,0,0,0,0,1,0,32,32,0,32,32,0,1,0,64,65,69,65,64,0,1,1,7,0,1,0,1,1,1,0,64,65,69,65,64,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,100,96,1,1,0,81,0,81,81,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,8,0,1,6,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,5],
				[1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2,3,1,1,1,0,1,3,2,3,1,1,1,1,0,0,0,0,0,1,1,1,1,3,2,3,1,1,1,1,1,0,0,0,0,0,1],
				[5,0,0,0,0,0,0,0,1,0,49,0,0,50,0,0,1,32,32,32,0,32,32,32,1,0,1,0,0,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,64,0,1,0,50,0,0,1,51,48,1,32,0,0,0,0,0,32,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,64,0,0,0,0,0,5],
				[1,0,0,0,0,0,64,0,4,51,1,0,0,0,0,0,1,32,0,0,0,0,0,32,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,64,0,0,0,0,0,1],
				[5,0,0,0,0,0,70,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,1,1,1,0,70,0,0,0,0,0,1],
				[1,0,0,0,0,0,64,0,4,0,0,0,0,0,1,51,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,64,0,0,0,0,0,5],
				[1,0,0,0,0,0,64,0,1,51,1,0,0,0,50,0,1,0,32,0,0,0,32,0,1,1,1,0,0,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,64,0,0,0,0,0,1],
				[5,0,0,0,0,0,0,0,1,0,50,0,0,0,49,0,1,0,0,0,0,0,0,0,1,0,9,0,0,0,9,0,0,1,1,0,0,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,3,2,3,1,1,1,1,1,3,2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,134,0,134,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,5],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,128,133,128,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,7,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,136,1,1,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,4,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,7,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,5],
				[1,0,0,0,0,0,8,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,7,7,8,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,3,2,3,1,1,1,1,1,1,1,1,0,1,1,1,1,3,2,3,1,1,1,1,1,3,25,3,1,1,1,1,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,100,100,96,0,0,96,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,64,65,69,65,64,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,98,1,0,32,32,0,32,32,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,5,1,1,5,1,1,1,1,1,1,1,5,1,1,1,5,1,1,5,1,1,5,1,5,1,1,5,1,1,5,1,1,1,5,1,1,1,1,1,1,5,1,1,5,1,17,1,1,1,1,5,1,1,1,1]];
	},
	
	onRender: function() {
		if (!this.bWallPainted) {
			this.paintPicturesOnWall();
			this.bWallPainted = true;
		}
		var xRC = this.xRC;
		var yRC = this.yRC;
		// afficher le titre

		var fAlpha = 0;
		var nDelayAlpha = 64;
		
		var c = this.oCameraThinker;
		var nCurrentTime = c.nCurrentTime; // 0 ++
		var nTime = c.nTime - nCurrentTime; // nTime : MaxTime--
		
		if (nTime < nDelayAlpha) {
			fAlpha = (nDelayAlpha - nTime) / nDelayAlpha;
		} else if ((c.nTime - nTime) < nDelayAlpha) {
			fAlpha = (nDelayAlpha - c.nTime + nTime) / nDelayAlpha;
		}
		// dark veil
		if (fAlpha) {
			this.oRenderContext.fillStyle = 'rgba(0, 0, 0, ' + fAlpha + ')';
			this.oRenderContext.fillRect(xRC, yRC, this.oRCCanvas.width, this.oRCCanvas.height);
		}

		// rendu du menu (titre et options)
		var oImage = this.oRaycaster.oHorde.oTiles.d_title.oImage;
		this.oRenderContext.drawImage(oImage, (this.oRenderCanvas.width - oImage.width) >> 1, 32);
	},
	
	/**
	 * Peint les textures contenue dans d_picture (entrée des tiles de la horde du raycaster)
	 * Les picture sont peinten sur les mur de valeur 0x12B
	 */
	paintPicturesOnWall: function() {
		var x, y;
		var df = function(rc, c, xBlock, yBlock, n) {
			var p = rc.oHorde.oTiles.d_pictures;
			var xPic = ((xBlock + yBlock + n) % p.nFrames) * p.nWidth;
			c.getContext('2d').drawImage(
				p.oImage, 
				xPic,
				0, 
				p.nWidth, 
				p.nHeight, 
				16, 
				28, 
				p.nWidth, 
				p.nHeight
			);
		};
		for (y = 0; y < this.oRaycaster.aMap.length; y++) {
			for (x = 0; x < this.oRaycaster.aMap[y].length; x++) {
				if (this.oRaycaster.aMap[y][x] == 0x12B) { // 0x12B : picture wall
					if (this.oRaycaster.insideMap(x - 1) && this.oRaycaster.getMapXYPhysical(x - 1, y) === 0) {
						this.oRaycaster.cloneWall(x, y, 0, df);
					}
					if (this.oRaycaster.insideMap(y + 1) && this.oRaycaster.getMapXYPhysical(x, y + 1) === 0) {
						this.oRaycaster.cloneWall(x, y, 1, df);
					}
					if (this.oRaycaster.insideMap(x + 1) && this.oRaycaster.getMapXYPhysical(x + 1, y) === 0) {
						this.oRaycaster.cloneWall(x, y, 2, df);
					}
					if (this.oRaycaster.insideMap(y - 1) && this.oRaycaster.getMapXYPhysical(x, y - 1) === 0) {
						this.oRaycaster.cloneWall(x, y, 3, df);
					}
				}
			}
		}
	}
});
