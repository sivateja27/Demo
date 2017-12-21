({
    helperDoInit : function(component, event, helper){
        component.set("v.spinner", true);
        
        var action = component.get("c.fetchOppDetails");
        var ceId = component.get("v.id");
        //alert('ceId'+ceId);
        var tier1name = component.get("v.tier1");
        var salesRepId = component.get("v.salesRep");
        //alert('salesRepId'+salesRepId);
        var tier2name = component.get("v.tier2");
        var country = component.get("v.country");
        var business = component.get("v.business");
        var searchAccId = component.get("v.searchAccId");
        var isowner = component.get("v.isowner");
        var isAccountTeam = component.get("v.isAccountTeam");
        var role = component.get("v.role");
        var alloppty = (isAccountTeam)?false:true;
       
       
        
        action.setParams({ 
            "tier1" : tier1name,
            "tier2" : tier2name,
            "ceId" : component.get("v.id"),
            "SalesRep" : salesRepId,
            "country":country,
            "business":business,
            "accId":searchAccId,
            "isOwnerOnly":isowner,
            "allOpportunity":alloppty,
            "role":role,
            "fromclosedate" : component.get("v.fromclosedt"),
            "toclosedate" : component.get("v.toclosedt"),
            "optyrange" : component.get("v.optyrange"),
            "stagename" : component.get("v.stage")  
        });        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            component.set("v.spinner", false);
            if (component.isValid() && state === "SUCCESS") {
                var result = response.getReturnValue();
                //console.log("Success!");         
                //helper.iterate(result,'');       
                component.set("v.items", result);
                //console.log("component set");  
            }
            else if(state === "ERROR"){
                var errors = response.getError();
                if (errors) {
                    helper.iterate(errors,'');                    
                } else {
                    //console.log("Unknown error");
                }                
            }
        });
        
        // Send action off to be executed
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