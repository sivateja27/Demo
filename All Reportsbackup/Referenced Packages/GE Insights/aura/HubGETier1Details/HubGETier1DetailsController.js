({  
    //method to show Tier2 details or not
    slidewidget : function(component, event, helper) {        
        var tier1= event.currentTarget.dataset.tier1;
        
        var tier2val=component.get("v.tier2value");        
        if(component.get("v.showthis")==true){                
            component.set("v.showthis", false);              
            helper.getOpportunityByTier1(component, event, helper,tier1,tier2val);
        }else{            
            component.set("v.showthis", true);            
        }
        
    },
    itemsChange: function(component, event, helper) {        
        var tier1 = component.get("v.tier1value");   
        var tier2val = component.get("v.tier2value");        
        component.set("v.showthis", false);           
        helper.getOpportunityByTier1(component, event, helper,tier1,tier2val);
        
    }  
})