"use strict";

var app = app || {};
var usingSticker = false

app.stickerwidget = {
//---PROPERTIES------//
	app: undefined,
	imgObject: undefined,
	stickerwidth: undefined,
	stickerheight: undefined,

//---METHODS------//
	init: function()
	{
		console.log("sticker widget is alive")
		document.querySelector('#swButton').onclick = function(e)
		{
			usingSticker = true;
		}
	},
	setImage: function()
	{
		this.imgObject = new Image();
		this.imgObject.src = "images/" + document.querySelector('#stickerChooser').value + ".png";
	},
	moveSticker: function(tctx,x,y)
	{
		this.setImage();
		var origin = {};
		tctx.clearRect(0,0,tctx.canvas.width,tctx.canvas.height);
		
		tctx.drawImage(this.imgObject,x-this.imgObject.width/2,y-this.imgObject.height/2);
	}
}