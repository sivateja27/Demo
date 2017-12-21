({
    //method to get top Account Owner details
    getTopAccountOwners : function(component,helper) {
        component.set("v.spinner", true); 
        component.set("v.showError", false);                 
        var commercialEntityId = component.get("v.commercialEntityId");
        var numOfRecords = component.get("v.numOfRecords");
        var country = component.get("v.country");
        var business = component.get("v.business");
        var searchAccId = component.get("v.searchAccId");
        var action = component.get("c.getAccountTeamOwners"); 
        action.setStorable();
        action.setBackground();

        action.setParams({ 
            "ceId" : commercialEntityId,
            "recordLimit": numOfRecords,
            "country": country,
            "business": business,
            "showOwnerOnly":false,
            "offset" : 0,
            "accId": searchAccId
        });
      
        action.setCallback(this, function(response) {
            component.set("v.spinner", false); 
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.accountowners",result.totalNumOfReps);
                component.set("v.items",result.salesRepList.slice(0, numOfRecords));
            }
            else if(state === "ERROR"){
                var errors = response.getError();
                if (errors) {
                    component.set("v.errors", errors);
                    component.set("v.showError", true);
                    
                } else {
                    //console.log("Unknown error");
                }
                
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action); 
    },
    //method to get CommercialEntity details
    getCommercialEntity : function(component,helper) {
        component.set("v.spinner", true); 
        var legalEntityId = component.get("v.legalEntityId");
        if(legalEntityId == null){
            // If legalEntityId is null get recordId.
            legalEntityId = component.get("v.recordId" );
        }
        var action = component.get("c.getAccountDetails");  
        action.setStorable();

        action.setParams({ 
            "accoundId" : legalEntityId 
        });   
        action.setCallback(this, function(a) {
            component.set("v.spinner", false); 
            var state = a.getState(); 
            if(state === "SUCCESS"){
                var result = a.getReturnValue();
                
                if(result.HUBCommercialEntityId == null || result.HUBCommercialEntityId =='' ){
                    component.set("v.commercialEntityId", result.HUBIdentifier); 
                } else {
                    component.set("v.commercialEntityId", result.HUBCommercialEntityHubId); 
                }
                this.getTopAccountOwners(component,helper);
            } else if(state === "ERROR"){
                var errors = a.getError();
                if (errors) {
                    component.set("v.errors", errors);
                    component.set("v.showError", true);
                    
                } else {
                    //console.log("Unknown error");
                }
                
            }
            
        });
        $A.enqueueAction(action);
    },
    iterate :function(obj, stack){
        //console.log("------");
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) { 
                if (typeof obj[property] == "object") {
                    //console.log(stack + '.' + property);
                    this.iterate(obj[property], stack + '.' + property);
                } else {
                    //console.log(property + " -  " + obj[property]);
                    
                }
            }
        }
    }
})