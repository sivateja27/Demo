({
    doInit : function(component, event, helper) {               
        //get picklist values for Stage on load
       	component.set('v.selectedoptyrange', 'All');
        component.set("v.selectedstagename", 'All');         
        
        helper.getStagePicklistValues(component,helper);                                                     
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
        
        component.set('v.selectedoptyrange', 'All');
        component.set("v.selectedstagename", 'All'); 
        component.set('v.fromclosedate', null); 
        component.set('v.toclosedate', null);
        component.set('v.showerrormsg', false);
        component.set('v.errormsg', '');
        
        var appEvent = component.getEvent("applyFilters");
        appEvent.setParams({ "optyrange"   	: component.get("v.selectedoptyrange"),
                            "stagename"			: component.get("v.selectedstagename"),
                            "fromclosedate" : component.get("v.fromclosedate"),
                            "toclosedate" : component.get("v.toclosedate")
                           });        
        appEvent.fire(); 
        
    },
    
    onChangeOptyRange : function(component,event,helper){
                     
    }, 
    onChangeStagename : function(component,event,helper){
              
    },    
    onChangeFromDate : function(component,event,helper){                     
        if(component.get("v.fromclosedate") === ''){
            component.set("v.fromclosedate",null);
        } 
        
               
    },
    onChangeToDate : function(component,event,helper){      
                
        if(component.get("v.toclosedate") === ''){
            component.set("v.toclosedate",null);
        }      
       
    },
    applyFilterValues : function(component,event,helper){ 
        var fromdate =  component.get("v.fromclosedate");
        var todate =  component.get("v.toclosedate");           
        if(fromdate != null  && todate === null ){            
            component.set('v.showerrormsg', true);
        	component.set('v.errormsg', 'Please select "To Close Date" as well');
            return;
        }else if(fromdate === null && todate != null){            
            component.set('v.showerrormsg', true);
        	component.set('v.errormsg', 'Please select "From Close date" as well');
            return;
        }
        /*if(fromdate === null && todate === null && component.get("v.selectedoptyrange") === 'All' && component.get("v.selectedstagename") === 'All'){
            component.set('v.showerrormsg', true);
        	component.set('v.errormsg', 'Please select atleast one filter to apply');            
            return;
        }*/
        var fromdate = helper.formatDate(fromdate);
        var todate = helper.formatDate(todate);
        if(fromdate > todate){
            component.set('v.showerrormsg', true);
        	component.set('v.errormsg', 'To Close date cannot be less than "From Close date"');            
            return;
        }
        component.set('v.showerrormsg', false);
        var appEvent = component.getEvent("applyFilters");
        appEvent.setParams({ "optyrange"   	: component.get("v.selectedoptyrange"),
                            "stagename"			: component.get("v.selectedstagename"),
                            "fromclosedate" : component.get("v.fromclosedate"),
                            "toclosedate" : component.get("v.toclosedate")
                           });        
        appEvent.fire(); 
    },
    
})