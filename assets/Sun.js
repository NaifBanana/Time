function Sun(sun, container, scale){
	a=function a(msg){console.log(msg)};
	var sc=typeof scale=='number' ? scale : 2;
	var pi=Math.PI;
	var yRad=($(container).height())/2;
	var xRad=($(container).width())/2;
	var sunRad= yRad>=xRad ? (xRad/sc)/2 : xRad>=yRad ? (yRad/sc)/2: (yRad/sc)/2;
	$(sun).css({"height": sunRad*2+"px", "width": sunRad*2+"px"});
	var dr, time, clockAngle,Angle, xPos, yPos, x, y;
	this.Set=function (rise, set, hr, min){
		var rs=false;
		if(typeof rise=='string' && typeof set=='string'){
			rs=true;
			var rTime=rise.split(":");
			var rHour=parseInt(rTime[0]);
			var rMin=parseInt(rTime[1]);
			var sTime=set.split(":");
			var sHour=parseInt(sTime[0]);
			var sMin=parseInt(sTime[1]);
			var Rise=(rHour*60)+rMin;
			var Set=(sHour*60)+sMin;
			var Day=Set-Rise;
			a(Rise+", "+Set+"  "+Day);
		}
		dt=new Date();
		if(typeof hr=='number' && typeof min=='number'){
			if(hr>=24){var hr=hr % 24;};
			if(min>=60){var hr=hr+Math.floor(min/60); var min=min % 60;}
			dt.setHours(hr);
			dt.setMinutes(min);
			a(dt.getHours+', '+dt.getMinutes)
		};
		time=(dt.getHours())*60+(dt.getMinutes());
		if(rs){
			if(time>=Rise && time<=Set){
				time=(((time-Rise)/Day)*720)+360;
			} else if(time<=Rise){
				time=(time/Rise)*360;
			} else if(time>=Set){
				time=(((time-Set)/(1440-Set))*360)+1080;
			}
		}
		clockAngle=(time/1440)*(2*pi);
		Angle=((clockAngle*(0-1))-(pi/2));
		xPos=(xRad/yRad)*(Math.cos(Angle)*(yRad))+(xRad);
		yPos=(Math.sin(Angle)*(yRad))*-1+(yRad);
		x=xPos-sunRad+"px";
		y=yPos-sunRad+"px";
		$(sun).css({"top": y, "left": x});
		a("Hey!");
	};
	this.SunLoop=function(refresh, rise, set, hr, min){
		this.Set(rise, set, hr, min);
		var that=this;
		loop=setInterval(function(){that.Set(rise, set, hr, min)}, refresh*1000);
	};
	this.Stop=function (){
		clearInterval(loop);
	};
};
