MooCountdown
===========

MooCountdown is a plugin functioning for the JavaScript Mootools Framework allowing to generate a countdown.

Based on the David Walsh’s plugin (http://davidwalsh.name/mootools-countdown-plugin), MooCountdown extend the class to the use of Timestamp for an employment “W days, X hours, Y minutes, Z seconds”. It is easy to create a simple and intuitive countdown.

Thanks to tlkshadow (http://github.com/tlkshadow) for his modifications.

How to use
----------

- Put these following scripts in the header: mootools core 1.2, mootools more 1.2 and MooCountdown.
- Instantiate the MooCountdown object to the Domready
    window.addEvent('domready', function() {
      
        //demo 1
  
        new MooCountdown.Date($('countdown'),{
            date: '06/11/2010 00:00am',
            text:[' An ',' Jours ',' Heures ',' Minutes ',' Secondes '],
            startFont : 20,
            finishFont : 40,
            onComplete: function () {
                alert('Terminé');
            }
        });

      });
    </script>
- Put the container application in your page’s body
  <div id="countdown"></div>
- It Works. More examples at http://web-innovation.fr/blog/?p=239