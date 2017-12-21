({
	getCommercialEntity : function(component, event, helper) {
         component.set("v.spinner", true);
        console.log('Top Ten==>33');     
        var legalEntityId = component.get("v.legalEntityId");
        if(legalEntityId == null){
            legalEntityId = component.get("v.recordId" );
            console.log('Top Ten==>legalEntityId =='+legalEntityId);
        }
        var action = component.get("c.getAccountDetails");        
        action.setParams({ 
            "accoundId" : legalEntityId 
        });   
        action.setCallback(this, function(a) {
             component.set("v.spinner", false);
            var state = a.getState(); 
            if(state === "SUCCESS"){
                console.log('Top Ten==>legalEntityId Success');
                
                var result = a.getReturnValue();
                console.log('Top Ten==>legalEntityId Success result ='+result);
                if(result.HUBCommercialEntityId == null || result.HUBCommercialEntityId =='' ){
                    component.set("v.commercialEntityId", result.HUBIdentifier); 
                } else {
                    component.set("v.commercialEntityId", result.HUBCommercialEntityHubId); 
                }
                console.log('Top Ten==>legalEntityId Success call helperDoInit');
                this.helperDoInit(component, event, helper);
            } else if(state === "ERROR"){
                var errors = a.getError();
                if (errors) {
                    component.set("v.errors", errors);
                    component.set("v.showError", true);                    
                } else {
                    console.log("Unknown error");
                }                
            }            
        });
        $A.enqueueAction(action);
    },
    helperDoInit : function(component, event, helper){    
         component.set("v.spinner", true);
        var action = component.get("c.getTopTenOppOwners");                                         
        var commercialEntityId = component.get("v.commercialEntityId");
        console.log('commercialEntityIds in Account id =='+commercialEntityId);
                
        action.setParams({ 
            "ceId":commercialEntityId,
            "acctId":component.get("v.searchAccId"),
            "country":component.get("v.country"),
            "business":component.get("v.business"),
            "numOfRecords":component.get("v.numOfRecords")
        });        
        
        action.setCallback(this, function(response) {
             component.set("v.spinner", false);
            var state = response.getState();
            var result = response.getReturnValue();            
            if (component.isValid() && state === "SUCCESS") {                                                                               
                component.set("v.items", result);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });                
        $A.enqueueAction(action);
    },
    iterate :function(obj, stack){
        console.log("------");
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
    }

})