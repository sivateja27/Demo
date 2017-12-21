({
	doInit: function(component, event, helper) {         
         helper.getTier1OpptyDetails(component,event,helper); 
    },
    itemsChange1 : function(component, event, helper) {            
        component.set("v.selectedTier2", 'All');        
        helper.getTier1OpptyDetails(component,event,helper); 
    }, 
    itemsChange2 : function(component, event, helper) {                
        helper.getTier1OpptyDetails(component,event,helper); 
    },
})