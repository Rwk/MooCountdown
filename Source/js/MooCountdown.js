/*
---
 
script: MooCountdown.js
 
description: MooCountdown extend the class to the use of Timestamp for an employment W days, X hours, Y minutes, Z seconds. It is easy to create a simple and intuitive countdown.
 
license: MIT-style license.
 
authors: Raphaël Deschler
 
docs: http://web-innovation.fr/blog/?p=239
 
requires:
core/1.2.4:
- Class
- Element
 
provides: [MooCountdown]
 
...
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
