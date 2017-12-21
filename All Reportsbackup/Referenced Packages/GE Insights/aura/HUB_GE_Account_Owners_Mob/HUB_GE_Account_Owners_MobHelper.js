({
	getCommercialEntity : function(component, event, helper) {
       
         component.set("v.spinner", true);
        var legalEntityId = component.get("v.legalEntityId");
        if(legalEntityId == null){
            legalEntityId = component.get("v.recordId" );            
        }
        var action = component.get("c.getAccountDetails");        
        action.setParams({ 
            "accoundId" : legalEntityId 
        });   
        action.setCallback(this, function(a) {
            
            component.set("v.spinner", false);
            var state = a.getState(); 
            if(state === "SUCCESS"){
                //console.log('Top Ten==>legalEntityId Success');
                
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
                } else {
                    //console.log("Unknown error");
                }                
            }            
        });
        $A.enqueueAction(action);
    },
    helperDoInit : function(component, event, helper){  
         //console.log('helperDoInit');
         component.set("v.spinner", true);
        var action = component.get("c.getAccountTeamOwners");                                         
        var commercialEntityId = component.get("v.commercialEntityId");
       
        var numOfRecords = component.get("v.numOfRecords");
        var country = component.get("v.country");
        var business = component.get("v.business");
        var searchAccId = component.get("v.searchAccId");
        //console.log('commercialEntityId in Account id =='+commercialEntityId);
                
        action.setParams({ 
            "ceId" : commercialEntityId,
            "recordLimit": numOfRecords,
            "country": country,
            "business": business,
            "showOwnerOnly":false,
            "offset" : 0,
            "accId": searchAccId
           
        });        
        //console.log('helperDoInit set param');
        action.setCallback(this, function(response) {
            component.set("v.spinner", false);
            //console.log('helperDoInit call back');
            var state = response.getState();
            var result = response.getReturnValue();            
            if (component.isValid() && state === "SUCCESS") {                                                                               
                component.set("v.items", result.salesRepList);
            }
            else {
                //console.log("Failed with state: " + state);
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