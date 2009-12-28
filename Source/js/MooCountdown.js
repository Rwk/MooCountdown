/*
---
Script: MooCountdown.js
	MooTools Countdown

License:
	MIT-style license.

Version:
	0.1

Dependencies:
	- MooTools Core 1.2.x
	- MooTools More 1.2.x
	
requires:
- core: 1.2.4 : '*'


Todo:
	- Add image instead of string countdown
	- Add news effects

Inspiration:
	- based on a Script by [David Walsh](http://davidwalsh.name/mootools-countdown-plugin)

Options:
  - Container (string): ID of the HTML element which contains the countdown. Default : ‘countdown’
  - futurDate (Timestamp in milliseconds): The countdown’s start in milliseconds. Minimal value = 1. Default : empty.
  - OnlySeconds (Booleans): If the fixed value is true, there will not be a formatting days/hours/seconds. If you wish to create a countdown for only few seconds, give this value at true. Default : false.
  - dayText, hourText, minuteText, secondText (string): Text for the administration of internalization. Default, French value for day, hour, minute, second.
  - onCompleteText (string): Text displayed after the ended of the countdown. Default : null
  - startFont: starting size of the text for the tween effect. Default : ’32px’
  - finishFont: arrival size of the text for the tween effect. Default : ’16px’
  - duration (int): length of the animation and the count of seconds. Default : ‘1000’

Events:
  - onComplete (function): Personalized function to trigger at the end of the countdown. Default : empty.
*/

var MooCountdown = new Class({

	Implements: [Events, Options],
	
  options: {
    //public options
		container : 'countdown',
		futureDate : $empty,
		onlySeconds : false,
		dayText : 'jour',
		hourText : 'heure',
		minuteText : 'minute',
		secondText : 'seconde',
    onCompleteText : '',
		startFont : '32px',
		finishFont : '16px',
		duration : 1000,
		onComplete : $empty,
		
    //private options
		amount : $empty,
		amountTotal : $empty,
    days : $empty,
    hours : $empty,
    minutes : $empty,
    seconds : $empty,
	},
	
	initialize : function(options){
		this.setOptions(options);
		
		if(this.options.onlySeconds === true) {
		  this.options.amountTotal = this.options.futureDate;
		  this.startOnlySeconds();
		}
		else {
		  this.start();
		}
	},
	
	start : function(){
    this.getCount();	
  },
	
  getCount : function(){
  
    //on ré-initialise la variable de sortie et la nouvelle
    var out = '';
    this.now = new Date();
    
    //Calcul du temps restant en millisecondes
    this.options.amount = this.options.futureDate - this.now.getTime();

    //On récupère le temps en seconde
    this.options.amount = Math.floor(this.options.amount/1000);
    this.options.amountTotal = this.options.amount;
  
    //calcul des jours
    this.options.days = Math.floor(this.options.amount/86400);
    this.options.amount = this.options.amount%86400; 
    
    //calcul des heures
    this.options.hours = Math.floor(this.options.amount/3600);
    this.options.amount = this.options.amount%3600;
    
    //calcul des minutes
    this.options.minutes = Math.floor(this.options.amount/60);
    this.options.amount = this.options.amount%60;
    
    //calcul des secondes
    this.options.seconds = this.options.amount;
    
    //Texte de sortie
    if(this.options.days != 0){out += this.options.days +" "+this.options.dayText+((this.options.days !=1)?"s":"")+", ";}
    if(this.options.days != 0 || this.options.hours != 0){out += this.options.hours +" "+this.options.hourText+((this.options.hours !=1)?"s":"")+", ";}
    if(this.options.days != 0 || this.options.hours != 0 || this.options.minutes != 0){out += this.options.minutes +" "+this.options.minuteText+((this.options.minutes !=1)?"s":"")+", ";}
    
    $(this.options.container).set('text',out);
    
    var elSeconds = new Element('span',{
      id : "seconds",
      html : this.options.seconds
    });
    
    elSeconds.inject(this.options.container);
        
    //l'effet
    this.options.amountTotal--; 
    var fx = new Fx.Tween($("seconds"),{
      duration: this.options.duration,
      onComplete: function() { 
        if(this.options.amountTotal >= 0) {         
          this.getCount();
        }
        else {
           $(this.options.container).set('text',this.options.onCompleteText);
           this.fireEvent('complete');
        }
      }.bind(this)
    }).start('font-size',[this.options.startFont,this.options.finishFont]); 
    
  },
  
  startOnlySeconds : function(){
    
    $(this.options.container).set('text',this.options.amountTotal);
    
    this.options.amountTotal--; 
    var fx = new Fx.Tween(this.options.container,{
      duration: this.options.duration,
      onComplete: function() { 
        if(this.options.amountTotal >= 0) {         
          this.startOnlySeconds();
        }
        else {
           $(this.options.container).set('text',this.options.onCompleteText);
           this.fireEvent('complete');
        }
      }.bind(this)
    }).start('font-size',[this.options.startFont,this.options.finishFont]); 
      
  }

});
