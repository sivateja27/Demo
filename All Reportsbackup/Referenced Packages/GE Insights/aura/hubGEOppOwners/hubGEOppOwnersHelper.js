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
    getSalesRepEmails: function(component, event, helper) {
        var comId = component.get("v.id");
        var tier1 = component.get("v.tier1Value");
        var tier2 = component.get("v.tier2Value");
        var isAcc = component.get("v.isAccCmp");
        var country = component.get("v.country");
        var isOwner = component.get("v.ownerOnly");
        var isAccCmp = component.get("v.isAccCmp");
        if(isOwner == false){
        	component.set("v.spinner", true);
        }
        //alert(isOwner);
        component.set("v.hideEmail", false);
        var action = component.get("c.getSalesRepDetailsEmail");
        
        action.setParams({
            "comId" : comId,
            "tier1" : tier1,
            "tier2"  : tier2,
            "country":country,
            "owner":isOwner,
            "isAccCmp":isAccCmp
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS"){
                var result = response.getReturnValue();
                if(isOwner == false){
                	component.set("v.spinner", false);
                }
                component.set("v.showError", false);
                component.set("v.emailString", result);
                if(component.get("v.emailString")=='false'){
                    component.set("v.hideEmail", true);
                }
            }
            else if(state === "ERROR"){
                component.set("v.hideEmail", true);
            }
        });
        $A.enqueueAction(action);
    }
    ,
    onActivegetEmails: function(component, event, helper) {
        var comId = component.get("v.id");
        var tier1 = component.get("v.tier1Value");
        var tier2 = component.get("v.tier2Value");
        var isAcc = component.get("v.isAccCmp");
        var country = component.get("v.country");
        var isOwner = component.get("v.ownerOnly");
        var isAccCmp = component.get("v.isAccCmp");
        //alert(isOwner);
        component.set("v.hideEmail", false);
        var action = component.get("c.getSalesRepDetailsEmail");
        
        action.setParams({
            "comId" : comId,
            "tier1" : tier1,
            "tier2"  : tier2,
            "country":country,
            "owner":isOwner,
            "isAccCmp":isAccCmp
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS"){
                var result = response.getReturnValue();
                component.set("v.showError", false);
                component.set("v.emailString", result);
                if(component.get("v.emailString")=='false'){
                    component.set("v.hideEmail", true);
                }
            }
            else if(state === "ERROR"){
                component.set("v.hideEmail", true);
            }
        });
        $A.enqueueAction(action);
    }
})