({
    //Toggles the view to display/Close the contents.
	toggledetails : function(component, event, helper) {
		var changeDetails = component.get("v.showDetails");
        component.set("v.showDetails", !changeDetails);
	},
    //Triggers the change in commercial Entity.
    changeComEntity : function(component, event, helper){
        var comEntityName = event.getSource().get("v.value"); 
        var action = component.get("c.getCommericalAccount");
        action.setParams({ 
            	"Name" : comEntityName
        });
		
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") { 
                var compEvent = $A.get("e.geinsights:changeCommEntity");
		        compEvent.setParams({
		            "newCommEntity": response.getReturnValue().ExternalId,
                    "newCommName" : response.getReturnValue().Name__c
		        });                
		        compEvent.fire();  
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
                
        $A.enqueueAction(action);
    }
    
})