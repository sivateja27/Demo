({
    iterate :function(obj, stack){
        //console.log("------");
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) { 
                if (typeof obj[property] == "object") {
                    console.log(stack + '.' + property);
                    this.iterate(obj[property], stack + '.' + property);
                } else {
                    console.log(property + " -  " + obj[property]);
                    
                }
            }
        } 
    },
    getCommercialEntity : function(component, event, helper) {
        component.set("v.spinner", true); 
        component.set("v.showError", false);     
        var legalEntityId = component.get("v.legalEntityId");
        if(legalEntityId == null){
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
                this.helperDoInit(component, event, helper);
            } else if(state === "ERROR"){
                var errors = a.getError();
                if (errors) {
                    component.set("v.errors", errors);
                    component.set("v.showError", true);
                    console.log("Errro in getCommercialEntity");
                } else {
                    //console.log("Unknown error");
                }
                
            }
            
        });
        $A.enqueueAction(action);
    },
    helperDoInit : function(component, event, helper){
        component.set("v.spinner", true); 
        component.set("v.showError", false);     
         
            
        var numOfRecords = component.get("v.numOfRecords");   
        var searchAccId = component.get("v.searchAccId");   
        
        var commercialEntityId = component.get("v.commercialEntityId");
        
        var action = component.get("c.getOppOwners");    
        action.setStorable();
        
        //component.set("v.showSummarizedOptyOwners", true);
        action.setParams({ 
            "ceId" : commercialEntityId,
            "country_v": component.get("v.country"),
            "business_v": component.get("v.business"),
            "accId": searchAccId,
            "fullOpptyOwners":true,
            "showOwnerOnly":false
        });        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
             component.set("v.spinner", false); 
            var state = response.getState();
            var result = response.getReturnValue();
            var totalPeople = 0;
            component.set("v.spinner", false); 
            if (component.isValid() && state === "SUCCESS") {
                //helper.iterate(result,'');
                //console.log('result.totalNumOfOppOwners--'+result.totalNumOfOppOwners);
                component.set("v.optyowners",result.totalNumOfOppOwners);
                //component.set("v.optyowners",Object.keys(result).length);
                result = result.oppOwnersList.slice(0, numOfRecords);                                
                component.set("v.items", result);
            }
            else if(state === "ERROR"){
                var errors = response.getError();
                if (errors) {
                    component.set("v.errors", errors);
                    component.set("v.showError", true);
                    helper.iterate(errors,'');
                    console.log("Errro in helperDoInit::--::"+response.getError());
                } else {
                    console.log("Unknown error");
                }
                
            }
        });        
        // Send action off to be executed
        $A.enqueueAction(action);
    }
})