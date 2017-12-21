({
    doInit : function(component, event, helper) {
        var commercialEntityId= component.get("v.commercialEntityId");
        var filterBy = [{"fieldName":"Commercial_Entity_c__c","fieldValue":"\'"+commercialEntityId+"\'"}];
        component.set("v.filterBy",filterBy);
        //get picklist values for country on load
        helper.getCountryPicklistValues(component,helper);                                                     
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
    //apply filter and fire event
    applyFilter :function(component,event,helper){    

        var type = event.getSource().get("v.name");
        var value = event.getSource().get("v.value");
        var compEvent = component.getEvent("filterChange");
        if(value == 'All'){
            value='';
        }
        compEvent.setParams({"type" : type,"value":value });
        compEvent.fire();
    },
    // Resetting country filter value and clearing selected value from account text box
    resetFilter :function(component,event,helper){    
        
        var type = 'Country';
        var value = '';        
        component.set('v.selValue', '');                
        var compEvent = component.getEvent("filterChange");
        compEvent.setParams({"type" : type,"value":value });
        compEvent.fire();
        component.find("accFilter").clearValues();
        
    },
	// method to recieve country filter value
    receiveCountry : function(component,event,helper){      
        var ctry = event.getParam("country");       
        component.set("v.selValue",ctry);
    }
})