({
    doInit: function(component, event, helper) { 		               
        var commercialEntityId = component.get("v.commercialEntityId");
        component.set("v.showTopTenOptyOwners",true);
        component.set("v.showSalesRepDetails",false);
        console.log('commercialEntityId in mob =='+commercialEntityId);
        if(commercialEntityId=="" || commercialEntityId==null){
            helper.getCommercialEntity(component, event, helper);
        } else {
            helper.helperDoInit(component, event, helper); 
        }
        
    },
    updateFilter :function(component, event, helper) {
      var type=  event.getParam("type");
      var value= event.getParam("value");
           if(type == "Country"){
               component.set("v.country", value);
            } else if(type == "Business"){ 
                component.set("v.business", value);
            } else if(type == "Account"){
                    component.set("v.searchAccId", value);
           }
        helper.helperDoInit(component, event, helper);
    },
    viewTopTepOpportunities : function(component, event, helper) { 
        component.set("v.showTopTenOptyOwners",true);
        component.set("v.showSalesRepDetails",false);
        component.set("v.showOppDetails",false);
    },
    showSalesRepDetails : function(component, event, helper) {     
        var selectedItem = event.currentTarget;
        var salesrepexternalrecord = selectedItem.dataset.record;
        var action = component.get("c.getSalesRepDetails");                                                
        console.log('commercialEntityId in Account id =='+salesrepexternalrecord);
        
        action.setParams({ 
            "salesrepId" : salesrepexternalrecord,			           
        });        
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result = response.getReturnValue();            
            if (component.isValid() && state === "SUCCESS") {                                                                               
                component.set("v.salesrepdtls", result);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });                
        $A.enqueueAction(action);
        //component.set("v.salesrepdtls",salesrepexternalrecord);
        // helper.iterate(component.get("v.salesrepdtls"),''); 
        component.set("v.showTopTenOptyOwners",false);
        component.set("v.showSalesRepDetails",true);
        component.set("v.showOppDetails",false);
        
        //console.log('salesrepexternalid = '+ salesrepexternalid);                        
    },
    showOppDetails : function(component, event, helper) {
        var selectedItem = event.currentTarget;
        var salesrepexternalrecord = selectedItem.dataset.record;                
        var action = component.get("c.fetchOppDetails");                                                
        console.log('salesrepId  =='+salesrepexternalrecord);
        
        action.setParams({ 
            "ceId": component.get("v.commercialEntityId"),
            "SalesRep" : salesrepexternalrecord,
            "accId":component.get("v.searchAccId"),
            "country":component.get("v.country"),
            "isOwnerOnly":false,
            "allOpportunity":true      
        });        
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result = response.getReturnValue();            
            if (component.isValid() && state === "SUCCESS") {                                                                               
                component.set("v.oppdtls", result);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });                
        $A.enqueueAction(action);
        //component.set("v.salesrepdtls",salesrepexternalrecord);
        // helper.iterate(component.get("v.salesrepdtls"),''); 
        component.set("v.showTopTenOptyOwners",false);
        component.set("v.showSalesRepDetails",false);
        component.set("v.showOppDetails",true);
    },
    navigatetoOpp : function(component, event, helper) {
        var selectedItem = event.currentTarget;
        var opprecord = selectedItem.dataset.record;                
        var sObectEvent = $A.get("e.force:navigateToSObject");
        sObectEvent .setParams({
            "recordId": opprecord,
            "slideDevName": "detail"
        });
        sObectEvent.fire(); 
    }, 
})