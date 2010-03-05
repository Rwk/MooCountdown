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