({
    getSalesRepDetails : function(component, event, helper) {
        component.set("v.spinner2", true);        
        var tier1name = component.get("v.item.tier1Business");
        var tier2name = component.get("v.item.tier2Business");
        var ceId = component.get("v.id");
        var acctId = component.get("v.searchAccId");
        var country = component.get("v.country");        
        var action = component.get("c.fetchSalesRepDetails");
        var isAccountTeam = component.get("v.isAccountTeam"); 
        var ownerOnly = component.get("v.ownerOnly"); 
        var fullOpptyOwners = (isAccountTeam)?false:true;        
        action.setParams({ 
            "tier1" : tier1name, 
            "tier2" : tier2name,
            "ceId" : ceId,
            "acctId":acctId,
            "country":country,
            "allSalesReps":fullOpptyOwners,
            "ownersOnly":ownerOnly
        });          
        action.setCallback(this, function(a) {
            component.set("v.spinner2", false);
            var state = a.getState();              
            if (state === "SUCCESS"){
                var result = a.getReturnValue();                 
                component.set("v.salesRepRecord", result);                                                                        
            }else{
                //console.log("Failed with state: " + state);
            } 
        });
        $A.enqueueAction(action);
    }
})