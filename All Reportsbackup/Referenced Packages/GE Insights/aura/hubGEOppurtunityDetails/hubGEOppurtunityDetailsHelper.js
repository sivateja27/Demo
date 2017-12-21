({
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
    }, 
    getProductDetails : function(component,event, helper) {        
        var oppId = component.get("v.optyId");
        var numOfRecords = component.get("v.numOfRecords");        
        var offset = component.get("v.offset");        
        var action1 = component.get("c.fetchOpportunityProductDetails");                           
        action1.setParams({ 
            "oppId" : oppId, 
            "recordLimit" : numOfRecords,
            "off" : offset   
        });          
        action1.setCallback(this, function(response) {
            var state = response.getState();
            var result = response.getReturnValue();
            component.set("v.spinner1", false);
            component.set("v.spinner2", false);
            if (component.isValid() && state === "SUCCESS") {                                 
                component.set('v.oppProdRec',result.optyProdList);
                var totalRecords = result.totalNumOfproducts;
                component.set("v.totalRecords",totalRecords);
                if((offset+numOfRecords) < totalRecords){
                    component.set("v.next",false);
                } else {
                    component.set("v.next",true);
                }
                if(offset> 0){
                    component.set("v.prev",false);
                } else {
                    component.set("v.prev",true);
                }
                //console.log("Success! prod end");
                
            }
            else {
                //console.log("Failed with state: " + state);
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action1);
    }
})