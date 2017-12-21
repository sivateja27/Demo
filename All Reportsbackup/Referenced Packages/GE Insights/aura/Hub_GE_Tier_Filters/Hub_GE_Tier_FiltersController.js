({
    doInit : function(component, event, helper) {             
        //get picklist values for Tier1 on load
        helper.getTierPicklistValues(component,helper);                                                     
    }, 
    //method to display filter components or not
    toggleFilter:function(component,event,helper){    
        var cmpTarget = component.find('filterPanel');
        var expandFilter = component.get("v.expandFilter");
        if(expandFilter){
            $A.util.removeClass(cmpTarget,'slds-show');
            $A.util.addClass(cmpTarget,'slds-hide');
            component.set("v.expandFilter",false);
        } else {
            $A.util.removeClass(cmpTarget,'slds-hide');
            $A.util.addClass(cmpTarget,'slds-show');
            component.set("v.expandFilter",true);
        } 
    },    
    // Resetting Tier filters
    resetFilter :function(component,event,helper){    
                
        component.set('v.selectedTier1', 'All');
        component.set("v.tier2list", []); 
        component.set('v.selectedTier2', 'All'); 
       
        
    },
	// method to recieve Tier 2 based on Tier 1 filter value
    applyTier1Filter : function(component,event,helper){                             
        component.set('v.selectedTier2', 'All');         
        var action = component.get("c.getTier2PicklistValues");  
        action.setParams({ 
            "tier1value" : component.get("v.selectedTier1")
        });  
        action.setCallback(this, function(response) { 
                var state = response.getState();
            if(state === "SUCCESS"){  
                var result = response.getReturnValue(); 
                console.log(result);
                component.set("v.tier2list", result);                  
            }else if(state === "ERROR"){               
                                      } 	
        });
        $A.enqueueAction(action);    
    },
    // method to recieve Tier 2 filter value
    applyTier2Filter : function(component,event,helper){              
        //console.log('tier 1= '+component.get("v.selectedTier1"));
        //console.log('tier 2= '+component.get("v.selectedTier2"));
    }
})