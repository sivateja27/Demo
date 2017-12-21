({        
    doInit: function(component, event, helper) {        
        helper.getSalesRepEmails(component, event, helper);
    },
    gotoOptyOwners: function(component, event, helper) {        
        var appEvent = component.getEvent("backToSnapshot");
        appEvent.setParams({ "screenName"   	: component.get("v.navigateBackScreen"),
                            "entityId"			: component.get("v.id")});        
        appEvent.fire();   
    },
    showData: function (cmp, event,helper) {        
        var tab = event.getSource();                               
        switch (tab.get('v.id')) {
            case 'accountOwner' :
                cmp.set("v.ownerOnly",true);
                
                break;
            case 'accountTeam' :
                cmp.set("v.ownerOnly",false);
                
                break;
        }
        helper.onActivegetEmails(cmp, event, helper);
    },
    refreshPage: function(component,event,helper) {   
        
        if(event.getParam("screenName") == 'Opportunity Owners'){
            component.set("v.showOptyOwnersByTiers", false);
        }else if(event.getParam("screenName") == 'OpportunityList'){
            component.set("v.showOptyOwnersByTiers", false); 
        }
            else{
                component.set("v.showOptyOwnersByTiers", false);
            }
        
    },getOptydetails : function(component,event,helper){         
        component.set("v.tier1name",event.getParam("tier1Business"));
        component.set("v.tier2name",event.getParam("tier2Business"));
        component.set("v.accId",event.getParam("accountId"));
        component.set("v.salesrepId",event.getParam("salesrepId"));
        component.set("v.salesrepRole",event.getParam("role"));
        
        component.set("v.showOptyOwnersByTiers", true);  
    }
})