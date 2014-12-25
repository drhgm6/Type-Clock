$('document').ready( function() {
	var x = new Date();
	displayTime(x.getHours(), x.getMinutes());
});

var hour = 0, minute =0;
function timeToString(hour,minute) {
	//var hour = time.getHours();
	//var minute = time.getMinutes();
	var minutes = '', hours = '', string = '';
	var noonFlag = false, midnightFlag = false;
	if (((60*hour + minute) > 690 ) && ((60*hour + minute) <= 750))
		noonFlag = true;
	if (((60*hour + minute) < 30) || ((60*hour + minute) >=  1410))
		midnightFlag = true;
	console.log (noonFlag, midnightFlag);
	
	
	//Begin process of setting time. 
	if ((minute == 0) && (hour == 12))
		return 'noon';
	else if ((minute == 0) && (hour == 0))
		return 'midnight';
	else if (minute % 15 == 0) {
		if (minute == 0) {
			minutes = "o'clock";
			hours = convertToString(hour%12);
			string = hours + ' ' +  minutes;
		}
		else if  (minute == 15) {
			minutes = 'quarter past';
			if (hour == 12)
				return minutes + ' noon';
			else if (hour == 0)
				return minutes + ' midnight';
			else
				hours = convertToString(hour%12);
			string = minutes + ' ' +  hours;	
		}
		else if (minute == 45) {
			minutes = 'quarter til';
			if (hour == 11)
				return minutes + ' noon';
			else if (hour == 23)
				return minutes + ' midnight';
			else
				var tmp = (hour+1)%12;
				hours = convertToString(tmp);
			string = minutes + ' ' +  hours;
			
		}
		else if (minute == 30) {
			minutes = 'half past';
			if (hour == 12)
				return minutes + ' noon';
			else if (hour == 0)
				return minutes + ' midnight';
			else
				hours = convertToString(hour%12);	
			string = minutes + ' ' +  hours;
		}
	}
	else if ((minute % 5 == 0) && (minute < 30)) {
		minutes = convertToString(minute) + ' past';
		if (hour == 12)
			return minutes + ' noon';
		else if (hour == 0)
			return minutes + ' midnight';
		else
			hours = convertToString(hour%12);
		string = minutes + ' ' +  hours;
	}
	else if ((minute % 10 == 0) && (minute > 30)) {
		var tmp = 60-minute;
		console.log(tmp);
		minutes = convertToString(tmp) + ' til';
		if (hour == 11)
			return minutes + ' noon';
		else if (hour == 23)
			return minutes + ' midnight';
		else
			hours = convertToString((hour+1)%12);	
		string = minutes + ' ' +  hours;
	}
	else {
		if (minute < 10) 
			minutes += 'o '
		minutes += convertToString(minute);
		hours = convertToString(hour%12);
		string = hours + ' ' +  minutes;
	}
	if (hour >= 12)
		string += " pm";
	else if (hour < 12)
		string += " am";
	return string;

	
	
}
function timeToArray(hour,minute) {
	//var hour = time.getHours();
	//var minute = time.getMinutes();
//Declaration of variables for this time
	var upper =[], middle =[], lower =[];
	var noonFlag = false, midnightFlag = false;
	if (((60*hour + minute) > 690 ) && ((60*hour + minute) <= 750))
		noonFlag = true;
	if (((60*hour + minute) < 30) || ((60*hour + minute) >=  1410))
		midnightFlag = true;			
//Begin process of setting time. 
	if ((minute == 0) && (hour == 12))
		return [[],[],['noon']];
	else if ((minute == 0) && (hour == 0))
		return [[],[],['midnight']];
	else if (minute % 15 == 0) {
		if (minute == 0) {
			middle.push("oclock");
			upper.push(convertToString(hour%12));
		}
		else if  (minute == 15) {
			middle.push('quarter');
			middle.push('past');
			if (hour == 12)
				return [[], middle, ['noon']];
			else if (hour == 0)
				return [[], middle, ['midnight']];
			else
				lower.push(convertToString(hour%12));
		}
		else if (minute == 45) {
			middle.push('quarter');
			middle.push('til');
			if (hour == 11)
				return [[], middle, [' noon']];
			else if (hour == 23)
				return [[], middle, [' midnight']];
			else
				var tmp = (hour+1)%12;
				lower.push(convertToString(tmp));
		}
		else if (minute == 30) {
			middle.push('half');
			middle.push('past');
			if (hour == 12)
				return [[], middle, ['noon']];
			else if (hour == 0)
				return [[], middle, ['midnight']];
			else
				lower.push(convertToString(hour%12));
		}
	}
	else if ((minute % 5 == 0) && (minute < 30)) {
		var minutesDigit = convertToString(minute);
		var hyphen = minutesDigit.indexOf('-');
		if ( hyphen >= 0) {
			upper.push(minutesDigit.substr(0, hyphen));
			upper.push(minutesDigit.substr((hyphen+1), minutesDigit.length));
		}
		else 
			upper.push(convertToString(minute));
		middle.push('past');
		if (hour == 12)
			return [upper, middle,['noon']];
		else if (hour == 0)
			return [upper,middle,['midnight']];
		else
			lower.push(convertToString(hour%12));
	}
	else if ((minute % 10 == 0) && (minute > 30)) {
		var tmp = 60-minute;
		upper.push(convertToString(tmp));
		middle.push('til');
		if (hour == 11)
			return [upper,middle,['noon']];
		else if (hour == 23)
			return [upper,middle,['midnight']];
		else
			var tmp2 = (hour + 1)%12;
			lower.push(convertToString(tmp2));
	}
	else {
		if (minute < 10) 
			lower.push('oh');
		var minutesDigit = convertToString(minute);
		var hyphen = minutesDigit.indexOf('-');
		if ( hyphen >= 0) {
			lower.push(minutesDigit.substr(0, hyphen));
			lower.push(minutesDigit.substr((hyphen+1), minutesDigit.length));
		}
		else 
			lower.push(convertToString(minute));
		if (hour%12 == 0)
			upper.push('twelve');
		else
			upper.push(convertToString(hour%12));
	}
	if (hour >= 12)
		lower.push('pm');
	else if (hour < 12)
		lower.push('am');
	return [upper, middle, lower];	
}
function convertToString(number) {
	var tens = parseInt(parseInt(number)/10), ones = parseInt(parseInt(number) % 10), tensString = "", onesString = '';
		
	if (tens != 1) {
		switch(ones) {
			case 1: 
				onesString = 'one';
				break;
			case 2: 
				onesString = 'two';
				break;
			case 3: 
				onesString = 'three';
				break;							
			case 4: 
				onesString = 'four';
				break;
			case 5: 
				onesString = 'five';
				break;
			case 6: 
				onesString = 'six';
				break;	
			case 7: 
				onesString = 'seven';
				break;
			case 8: 
				onesString = 'eight';
				break;
			case 9: 
				onesString = 'nine';
				break;		
		}
	}	
	switch (tens) {
		case 1: 
			switch(ones) {
			case 1: 
				onesString = 'eleven';
				break;
			case 2: 
				onesString = 'twelve';
				break;
			case 3: 
				onesString = 'thirteen';
				break;							
			case 4: 
				onesString = 'fourteen';
				break;
			case 5: 
				onesString = 'fifteen';
				break;
			case 6: 
				onesString = 'sixteen';
				break;	
			case 7: 
				onesString = 'seventeen';
				break;
			case 8: 
				onesString = 'eighteen';
				break;
			case 9: 
				onesString = 'nineteen';
				break;	
			case 0:
				onesString = 'ten';
				break;	
		}
			break;
		case 2:
			tensString = 'twenty';
			break;
		case 3:
			tensString = 'thirty';
			break;
		case 4:
			tensString = 'forty';
			break;
		case 5:
			tensString = 'fifty';
			break;
		}	

	if ((tensString == '') || (onesString == ''))
		return tensString + onesString;
	else
		return tensString + '-' + onesString;

}
function displayTime(hour,minute) {
	clear();
	var arr = timeToArray(hour,minute);
	console.log(arr);
	for (var i=0; i < arr[0].length; i++) {
		var tmp = '#top .' + arr[0][i];
		console.log(tmp);
		$(tmp).addClass('active');
	}
	for (var i=0; i < arr[1].length; i++) {
		var tmp = "#middle ." + arr[1][i];
		$(tmp).addClass('active');
	}
	for (var i=0; i < arr[2].length; i++) {
		var tmp = "#bottom ." + arr[2][i];
		$(tmp).addClass('active');
	}
}
function clear() {
	$('span').removeClass('active');
}