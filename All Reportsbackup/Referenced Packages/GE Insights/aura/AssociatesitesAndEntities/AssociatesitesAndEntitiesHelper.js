({
    //Loads the component contents.
    getAllData : function(component, event, helper){
        component.set("v.showError", false);     
        var accountID = component.get("v.accountID");
        var recID = component.get("v.recordId");
        var comId = component.get("v.commercialEntityId");
        var ctry = component.get("v.country");
        var action = component.get("c.fetchEntities");
        var accId;        
        if(recID != null || recID != undefined){
            accId = recID;
        }else if(accountID != null || accountID != undefined){
            accId = accountID;
        }
        
        action.setParams({
            "accId" : accId,
            "comId" : comId,
            "country": ctry
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            component.set("v.spinner", false);
            
            if (component.isValid() && state === "SUCCESS") {
                //  console.log("Success!");
                component.set("v.associateDate", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
                var errors = response.getError();
                if (errors) {
                    component.set("v.errors", errors);
                    component.set("v.showError", true);
                    
                } else {
                    console.log("Unknown error");
                }
                
            }
        });
        
        $A.enqueueAction(action);
    }
})