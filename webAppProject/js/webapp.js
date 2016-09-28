"use strict";

var app = app || {};
var animationID;

var videoElement;
var topcanvas;
var topctx;
var bttmcanvas;
var bttmctx;
var cameracanvas;
var camctx; 

app.mousePos = {
	x: 0,
	y: 0
};

window.onload = function()
{
	console.log("app is loaded");
	
	//---A lot of this app relies on the use of the multiple canvases. The top canvas
	//   is only visible if the user has indicated that they are using either the sticker
	//   widget or the text widget.
	videoElement = document.querySelector('video');
	topcanvas = document.querySelector('#topcanvas');
	topctx = topcanvas.getContext("2d");
	bttmcanvas = document.querySelector('#botcanvas');
	bttmctx = bttmcanvas.getContext("2d");
	cameracanvas = document.querySelector('#camcanvas');
	camctx = cameracanvas.getContext("2d");
	if(navigator.webkitGetUserMedia!=null)
	{
		var options = 
		{
			video: true
		};
		navigator.webkitGetUserMedia(options, function(stream)
		{
			videoElement.src = window.webkitURL.createObjectURL(stream);
		},function(e)
		{
			console.log("error happened");
			alert("you have navigator but an error occured");
		});
	}
	
	app.textwidget.app = app;
	app.textwidget.init();
	app.stickerwidget.app = app;
	app.stickerwidget.init();
	update();
	
	function update()
	{
		animationID = requestAnimationFrame(update);
		camctx.drawImage(videoElement,0,0,camctx.canvas.width,camctx.canvas.height);
	}
	function getMousePos(bttmcanvas, e)
	{
		var rect = bttmcanvas.getBoundingClientRect();
		return{
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}
	bttmcanvas.addEventListener('mousemove', function(e)
	{
		var mPos = getMousePos(bttmcanvas, e);
		app.mousePos.x = mPos.x;
		app.mousePos.y = mPos.y;
		
		if(usingText || usingSticker)
		{
			bttmcanvas.style.cursor = "pointer";
		}
		if(usingText)
		{
			app.textwidget.moveText(topctx, app.mousePos.x, app.mousePos.y);
			
			bttmcanvas.onmousedown = function(e)
			{
				bttmctx.drawImage(topcanvas,0,0);
				topctx.clearRect(0,0,topctx.canvas.width,topctx.canvas.height);
				usingText = false;
			}
		}
		if(usingSticker)
		{
			app.stickerwidget.moveSticker(topctx,app.mousePos.x,app.mousePos.y)
			
			bttmcanvas.onmousedown = function(e)
			{
				bttmctx.drawImage(topcanvas,0,0);
				topctx.clearRect(0,0,topctx.canvas.width,topctx.canvas.height);
				usingSticker = false;
			}
		}
		if(!usingText && !usingSticker)
		{
			bttmcanvas.style.cursor = "auto";
		}
	}, false);
	
	document.querySelector('#capbutton').onclick = function(e)
	{
		cancelAnimationFrame(animationID);
		camctx.drawImage(videoElement,0,0,camctx.canvas.width,camctx.canvas.height);
		//camctx.drawImage(bttmctx,0,0,camctx.canvas.width,camctx.canvas.height);
	}
	document.querySelector('#clearbutton').onclick = function(e)
	{
		bttmctx.clearRect(0,0,bttmctx.canvas.width,bttmctx.canvas.height);
	}
}