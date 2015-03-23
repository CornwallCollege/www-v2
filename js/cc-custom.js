   /* SUPER SLIDES OPTIONS */	   
   if ( $( "#slides" ).length ) {
      $('#slides').superslides({
       animation: 'fade',
       play: 5000,
      });
   }
   
   /* BACK BUTTON */
    function goBack() {
        window.history.back()
    }
   /* BACK BUTTON ENDS*/