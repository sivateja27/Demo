({
    //method to show Tier2 details
    getOpportunityByTier1 : function(component, event, helper, tier1,tier2value) {		      
        var action = component.get("c.getOppOwnersFullList");
        var id = component.get("v.id");
        var country  = component.get("v.country");
        
        var accId = component.get("v.searchAccId");
        var isAccountTeam = component.get("v.isAccountTeam"); 
        var ownerOnly = component.get("v.ownerOnly"); 
        var fullOpptyOwners = (isAccountTeam)?false:true;       
        component.set("v.spinner", true);     
        action.setParams({ 
            "ceId" : id,
            "country": country,
            "business": tier1,
            "accId": accId,
            "fullOpptyOwners":fullOpptyOwners,
            "showOwnerOnly":ownerOnly,
            "tier2business": tier2value
        });  
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            component.set("v.spinner", false);
            if (component.isValid() && state === "SUCCESS") {
                //console.log("Success!");                
                component.set("v.items", response.getReturnValue());
            }
            else {
                //console.log("Failed with state: " + state);
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action);
    }
})