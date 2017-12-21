({
    getTier1OpptyDetails:function(component, event, helper){
        var id = component.get("v.id");
        var country  = component.get("v.country");
        var accId = component.get("v.searchAccId");
         
        var isAccountTeam = component.get("v.isAccountTeam"); 
        var ownerOnly = component.get("v.ownerOnly"); 
        var fullOpptyOwners = (isAccountTeam)?false:true;
        var action = component.get("c.getOppOwners"); 
        component.set("v.spinner", true); 
		        
        action.setStorable();
        action.setParams({ 
            "ceId" : id,
            "country_v": country,
            "accId": accId, 
            "fullOpptyOwners":fullOpptyOwners,
            "showOwnerOnly":ownerOnly,
            "tier1business":component.get("v.selectedTier1"),
            "tier2business":component.get("v.selectedTier2")
        });        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            component.set("v.spinner", false);                 
            if (component.isValid() && state === "SUCCESS") {
                var result = response.getReturnValue();                                    
                component.set("v.Tier1OpptyList", result.oppOwnersList);                               
            }
            else {
                //console.log("Failed with state: " + state);
            }
        });        
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    iterate :function(obj, stack){
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) { 
                if (typeof obj[property] == "object") {                     
                    this.iterate(obj[property], stack + '.' + property);
                } else {
                  console.log(property + " -  " + obj[property]);   
                    
                }
            }
        }
    }
    
})