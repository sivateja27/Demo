({
   jsLoaded: function(component, event, helper) {
    var globalId = component.getGlobalId();
    var aItems = component.get("v.activeAccounts");
    var inaItems = component.get("v.inActiveAccounts");

	/*******************************
	 * Retrieving map data from parent components and creating map.
	 *******************************/
    setTimeout(function() {
 
        var focusLat = component.get("v.centerLat");
        var focusLong = component.get("v.centerLong");
        
        var radCof=10;
        var radcalc;
        //Setting focal point for the map and radius coefficient. 
        if(aItems.length >0 && aItems[0].shipLat != undefined && aItems[0].shipLong != undefined){
            focusLat = aItems[0].shipLat;
            focusLong = aItems[0].shipLong;            
            radcalc = aItems[0].opptyAmt.toFixed(2).toString().indexOf(".")-6;
            if(radcalc >= 1){
               radCof = Math.pow(10, radcalc);
            }
            
        }else if(inaItems.length > 0 && inaItems[0].shipLat != undefined && inaItems[0].shipLong != undefined){
            focusLat = inaItems[0].shipLat;
            focusLong = inaItems[0].shipLong;
        }        
        var map = L.map(globalId+'_map', {zoomControl: true})
                    .setView([focusLat, focusLong], 5);

        L.tileLayer(
         'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
         {
             attribution: 'GE'
         }).addTo(map);
        // Setting marker for accounts with no open opportunities
        for(var j=0; j < inaItems.length ;j++){
            if(inaItems[j].shipLat != undefined && inaItems[j].shipLat != null){
              if(inaItems[j].lastActive != "No Activity"){
                L.circle([inaItems[j].shipLat, inaItems[j].shipLong], {
                    color: 'red',
                    fillColor: 'red',
                    fillOpacity: 0.2,
                    radius: 20
                }).addTo(map).bindPopup("<b>Name: </b>"+inaItems[j].accName+"<br><b>Last Time Active: </b>"+inaItems[j].lastActive + " Days Ago");
              }
                L.circle([inaItems[j].shipLat, inaItems[j].shipLong], {
                    color: 'red',
                    fillColor: 'red',
                    fillOpacity: 0.2,
                    radius: 20
                }).addTo(map).bindPopup("<b>Name: </b>"+inaItems[j].accName+"<br><b>Last Time Active: </b>"+inaItems[j].lastActive);

            }
        }
         
        // Setting marker for accounts with open opportunities
        for(var i=0; i < aItems.length; i++){
          var x = aItems[i].oppCount;
          if(x == undefined || x == null || x == ''){
              x = 0;
          }
            if(aItems[i].shipLat != undefined && aItems[i].shipLat != null){
               var rad=10;
               var currAmt=0;
               var opptyAmnt =0;
                if(aItems[i].opptyAmt != 0 && aItems[i].opptyAmt > 10){
               		 currAmt  = aItems[i].opptyAmt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                     opptyAmnt = aItems[i].opptyAmt;
                     console.log('oppty Amount :'+opptyAmnt);                     
                }
                 
                if(opptyAmnt >=0 && opptyAmnt <=10 ){
                  rad = 20;
                }
                else if(opptyAmnt >10 && opptyAmnt <=999 ){
                  rad = 200;                    
                }else if(opptyAmnt >1000 && opptyAmnt <=9999 ){
                  rad = 1000;                    
                }else if(opptyAmnt >10000 && opptyAmnt <=99999 ){
                  rad = 3000;                    
                }
                else if(opptyAmnt >= 100000 && opptyAmnt <= 999999){
                  rad = 10000;                    
                }else if(opptyAmnt >=1000000 && opptyAmnt <= 9999999 ){
                    rad= 30000;                     
                }else if(opptyAmnt >= 10000000 && opptyAmnt <= 99999999){
                    rad=60000;                    
                }else if(opptyAmnt >=100000000 && opptyAmnt <= 999999999){
                    rad=90000;                    
                }else if(opptyAmnt >=1000000000 && opptyAmnt <= 9999999999){
                    rad=110000;
                }else{
                    rad=130000;
                    
                }
                
                L.circle([aItems[i].shipLat, aItems[i].shipLong], {
                    color: 'green',
                    fillColor: 'green',
                    fillOpacity: 0.2,
                    radius: rad
                }).addTo(map).bindPopup("<b>Name: </b>"+aItems[i].accName+"<br><b>Amount: </b>$"+currAmt+"</a><br><b>Opp Count: </b>"+x);                  
            }
        }
		component.set("v.spinner",false);
    });
  }

})