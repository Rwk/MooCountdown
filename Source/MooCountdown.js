/*
---
Script: MooCountdown.js
	MooTools Countdown

License:
	MIT-style license.

Version:
	0.2

Dependencies:
	- MooTools Core 1.2.x
	- MooTools More 1.2.x

Todo:
	- Add image instead of string countdown
	- Add news effects

Inspiration:
	- based on a Script by [David Walsh](http://davidwalsh.name/mootools-countdown-plugin)
	- Thanks to [tlkshadow] http://github.com/tlkshadow] for his correction

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

var MooCountdown;

MooCountdown = new Class({

  Implements: [Events, Options],
  
  options: {
      startFont : '32',
      finishFont : '16',
      duration : 1000,
      onComplete : $empty
  },
  
  initialize : function(element,options){
      this.setOptions(options);
  }

});

MooCountdown.Date = new Class({

  Extends: MooCountdown,
  
  options: {
      date : $empty,
      text: ['year','day','hour','minute','second']
  },
  
  initialize : function(element,options){
      this.Container = document.id(element);
      this.parent(element, options);
      this.getDate();
  },
  
  getDate : function(){
  
      this.now = new Date();
  
      this.amount = Date.parse(this.options.date) - this.now.getTime();
  
      this.amount = Math.floor(this.amount/1000);
      this.amountTotal = this.amount;
  
      this.years = Math.floor(this.amount/31536000);
      this.amount = this.amount%31536000;
  
      this.days = Math.floor(this.amount/86400);
      this.amount = this.amount%86400; 
  
      this.hours = Math.floor(this.amount/3600);
      this.amount = this.amount%3600;
  
      this.minutes = Math.floor(this.amount/60);
      this.amount = this.amount%60;
  
      this.seconds = this.amount;
  
      this.Container.set('text','').addClass('MooCountdown');
  
      if( this.years > 0 ) {
          var elYears = new Element('span',{
            'id' : 'years',
            'class': 'countdown_box'
          }).inject(this.Container);
  
          new Element('span',{'html': this.years,'class':'number'}).inject(elYears);
          new Element('span',{'html': this.options.text[0],'class':'text'}).inject(elYears);
      }
  
      if( this.days > 0 ) {
          var elDays = new Element('span',{
            'id' : 'days',
            'class': 'countdown_box'
          }).inject(this.Container);
  
          new Element('span',{'html': this.days,'class':'number'}).inject(elDays);
          new Element('span',{'html': this.options.text[1],'class':'text'}).inject(elDays);
      }
  
      if( this.hours > 0 ) {
          var elHours = new Element('span',{
            'id' : 'hours',
            'class': 'countdown_box'
          }).inject(this.Container);
  
          new Element('span',{'html': this.hours,'class':'number'}).inject(elHours);
          new Element('span',{'html': this.options.text[2],'class':'text'}).inject(elHours);
      }
  
      if( this.minutes > 0 ) {
          var elMinutes = new Element('span',{
            'id' : 'minutes',
            'html' : "<span class=\"number\">"+this.minutes+"</span><span class=\"text\">"+this.options.text[3]+"</span>",
            'class': 'countdown_box'
          }).inject(this.Container);
          new Element('span',{'html': this.minutes,'class':'number'}).inject(elHours);
          new Element('span',{'html': this.options.text[3],'class':'text'}).inject(elHours);
      }
  
      var elSeconds = new Element('span',{
        'id' : 'seconds',
        'class': 'countdown_box'
      }).inject(this.Container);
      new Element('span',{'html': this.seconds,'class':'number'}).inject(elSeconds);
      new Element('span',{'html': this.options.text[4],'class':'text'}).inject(elSeconds);
  
  
      this.amountTotal--; 
      var fx = new Fx.Tween($("seconds"),{
          duration: this.options.duration,
          onComplete: function() { 
              if(this.amountTotal >= 0) {         
                  this.getDate();
              } else {
                  this.fireEvent('complete');
              }
          }.bind(this)
      }).start('font-size',[this.options.startFont,this.options.finishFont]); 
  
  }

});

MooCountdown.CountDown = new Class({

  Extends: MooCountdown,
  
  options: {
      number : $empty
  },
  
  initialize : function(element,options){
      this.Container = document.id(element);
      this.parent(element, options);
  
      this.interger = this.options.number;
      this.getCountDown();
  },
  
  getCountDown : function(){
  
      $(this.Container).set('text',this.interger);
  
      this.interger--; 
      var fx = new Fx.Tween(this.Container,{
          duration: this.options.duration,
          onComplete: function() { 
              if(this.interger >= 0) {         
                  this.getCountDown();
              } else {
                  this.fireEvent('complete');
              }
          }.bind(this)
      }).start('font-size',[this.options.startFont,this.options.finishFont]);  
  
  }

});