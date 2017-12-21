({
    slidewidget : function(component, event, helper) {        
        if(component.get("v.showthis") == true){
          component.set("v.showthis", false);  
            component.set("v.showOptyDetail", false);  
            
        }else{
            component.set("v.showthis", true);
            component.set("v.showOptyDetail", true); 
        }
     /* var appEvent = component.getEvent("showOptyDetails");
        appEvent.setParams({ "optyId"   	 : component.get("v.item.Id"),
                             "showOrHide": component.get("v.showthis")});        
        appEvent.fire();                */
    }, 
    doInit: function(component, event, helper) {
        //console.log("entityid--->"+component.get("v.entityid"));
        //console.log("item--->"+component.get("v.item"));
        
    }/*,
    showSpinner : function(component, event, helper) {
        component.set("v.spinner", true); 
    },
    hideSpinner : function(component, event, helper) {
        component.set("v.spinner", false); 
    }*/

})