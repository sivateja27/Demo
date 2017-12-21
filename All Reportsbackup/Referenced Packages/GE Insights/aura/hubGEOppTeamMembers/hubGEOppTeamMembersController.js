({    
    slidewidget : function(component, event, helper) {                
        if(component.get("v.showthis")==true){
            component.set("v.showthis", false);
        }else{
            component.set("v.showthis", true);
            helper.getSalesRepDetails(component, event, helper);
        }        
    },    
    openmodal: function(component,event,helper) {                                                     
        var salesrepdtls = event.currentTarget.dataset.srid;
        var salesrepRole = event.currentTarget.dataset.srrole;
        var appEvent = component.getEvent("showOptyOwnersByTier");
        appEvent.setParams({ "tier1Business" : component.get("v.item.tier1Business"), 
                            "tier2Business" : component.get("v.item.tier2Business"),
                            "accountId": component.get("v.id"),
                            "salesrepId": salesrepdtls,
                            "role":salesrepRole,
                            "fromscreen" :'Opportunity'});        
        appEvent.fire();               
    }
})