({
     //get picklist values for country
	getCountryPicklistValues : function(component,helper) {
		var action = component.get("c.getCountryPicklistValues");                
        action.setCallback(this, function(response) { 
                var state = response.getState();
            if(state === "SUCCESS"){                              
                component.set("v.countryList", response.getReturnValue());
            }else if(state === "ERROR"){               
                                      } 	
        });
        $A.enqueueAction(action);     
	},
     //get picklist values for Business
    /*getBusinessPicklistValues : function(component,helper) {
		var action = component.get("c.getBusinessPicklistValues");                
        action.setCallback(this, function(response) { 
                var state = response.getState();
            if(state === "SUCCESS"){                                            
                component.set("v.businessList", response.getReturnValue());
            }else if(state === "ERROR"){               
                                      } 	
        });
        $A.enqueueAction(action); 
	},*/
    iterate :function(obj, stack){
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) { 
                if (typeof obj[property] == "object") {                     
                    this.iterate(obj[property], stack + '.' + property);
                } else {
                    
                    
                }
            }
        }
    }
})