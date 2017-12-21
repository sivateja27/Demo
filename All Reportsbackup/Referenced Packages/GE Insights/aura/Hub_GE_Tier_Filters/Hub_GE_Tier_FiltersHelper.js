({
     //get picklist values for Tier1
	getTierPicklistValues : function(component,helper) {
		var action = component.get("c.getTierPicklistValues");                
        action.setCallback(this, function(response) { 
                var state = response.getState();
            if(state === "SUCCESS"){  
                var result = response.getReturnValue();                
                component.set("v.tier1list", result);                                
                
            }else if(state === "ERROR"){               
                                      } 	
        });
        $A.enqueueAction(action);     
	},     
    
})