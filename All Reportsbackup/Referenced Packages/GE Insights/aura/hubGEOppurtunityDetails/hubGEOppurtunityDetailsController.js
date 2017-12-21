({
	doInit : function(component, event, helper) {        
        var action = component.get("c.fetchOpportunityDetails");
        var action1 = component.get("c.getSalesRepEmail");
        var oppId = component.get("v.optyId");
        //alert(oppId);
        component.set("v.spinner1", true);
        component.set("v.spinner2", true);
        //console.log('oppId-'+oppId);      
        action.setParams({ 
            "oppId" : oppId
        });
        
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {                
                component.set("v.oppRec", response.getReturnValue());               
                helper.getProductDetails(component,event,helper);                 
            }
            else {
                component.set("v.spinner1", false); 
                component.set("v.spinner2", false);
                //console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);

        action1.setParams({ 
            "oppId" : oppId
        });
        action1.setCallback(this, function(response) {
            //alert('action1');
            var state = response.getState();
            //alert('action1-State'+state);
            if (component.isValid() && state === "SUCCESS") {                
                component.set("v.emailString", response.getReturnValue());     
                //alert('action1-State'+component.get("v.emailString")); 
            }
            else {
                
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action1);
    },           
    handlePrevious: function (cmp, event,helper) {   
        cmp.set("v.spinner2", true);     
        var offset = cmp.get("v.offset");
        var totalRecords = cmp.get("v.totalRecords");
        var numOfRecords = cmp.get("v.numOfRecords");        
            if((offset-numOfRecords) >= 0){
                offset = offset-numOfRecords;
                var offset = cmp.set("v.offset",offset);
            }
       
        helper.getProductDetails(cmp,event,helper );         
    },
    handleNext: function (cmp, event,helper) {    
        cmp.set("v.spinner2", true);     
        var offset = cmp.get("v.offset");
        var totalRecords = cmp.get("v.totalRecords");
        var numOfRecords = cmp.get("v.numOfRecords");        
            if((offset+numOfRecords) < totalRecords){
                offset = offset+numOfRecords;
                var offset = cmp.set("v.offset",offset);
            }        
        helper.getProductDetails(cmp,event,helper ); 
           
    },
    navigateToSalesRep: function (cmp, event,helper) {
        
        var action = cmp.get("c.getSalesRepInfo");
        action.setParams({ 
            "salesRepId" : cmp.get("v.oppRec.salesRepId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (cmp.isValid() && state === "SUCCESS") {                
                cmp.set("v.salesRepRec", response.getReturnValue());
                cmp.set("v.navigateTo", true);
            }
            else {
                
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
        
    },
    navigateToOppDetails: function (cmp, event,helper) {
        cmp.set("v.navigateTo", false);
    }
})