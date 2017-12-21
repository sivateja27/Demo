({
    // Load account team members from Salesforce
    doInit: function(component, event, helper) {
        helper.helperDoInit(component, event, helper);
    },    
    gotoOptyOwners: function(component, event, helper) {
        //console.log('from== '+component.get("v.fromscreen"));
            var appEvent = component.getEvent("backtoOptyOwners");
            appEvent.setParams({ "screenName"   	: 'OpportunityList',
                                "entityId"			: component.get("v.id")});        
            appEvent.fire(); 
        
          
    },
    applyfilters : function(component, event, helper) {               
        component.set("v.fromclosedt",event.getParam("fromclosedate"));
        component.set("v.toclosedt",event.getParam("toclosedate"));
        component.set("v.optyrange",event.getParam("optyrange"));
        component.set("v.stage",event.getParam("stagename"));    
        helper.helperDoInit(component, event, helper);
    }
})