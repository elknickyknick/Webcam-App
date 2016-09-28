"use strict";

var app = app || {};
var usingText = false;

app.textwidget = {
//---PROPERTIES------//
	app: undefined,
	font: undefined,
	style: undefined,
	weight: undefined,
	size: undefined,
	color: undefined,
	
//---METHODS------//
	init: function()
	{
		console.log("text widget is alive");
		document.querySelector('#twButton').onclick = function(e)
		{
			usingText = true;
		}
	},
	makeText: function()
	{
		this.font = document.getElementById("twFontChooser").value;
		this.style = document.getElementById("twStyleChooser").value;
		this.weight = document.getElementById("twWeightChooser").value;
		this.size = document.getElementById("twSizeSlider").value;
		this.color = document.getElementById("twColorChooser").value;
	},
	moveText: function(tctx, x, y)
	{
		this.makeText();
		tctx.clearRect(0,0,tctx.canvas.width,tctx.canvas.height);
		var ctxFont = this.style + " " + this.weight + " " + this.size + "pt " + this.font;
		tctx.font = ctxFont;
		tctx.textAlign = 'center';
		tctx.fillStyle = this.color;
		
		var textInput = document.getElementById("twInput").value;
		tctx.fillText(textInput, x, y);
	}
};