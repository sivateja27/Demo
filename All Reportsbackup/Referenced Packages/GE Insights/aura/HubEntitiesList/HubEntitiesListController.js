({
    //Load the component's data on initial load.
    doInit : function(component, event, helper) {
        component.set("v.spinner", true);    
        component.set("v.showError", false);    
        
        helper.getAllData(component, event, helper);
    },
    tierValueChanged : function(component, event, helper) {
        component.set("v.spinner", true);
        if(component.get("v.tier1Value")=='All' && component.get("v.tier2Value")=='All'){
            component.set("v.criteria",'All'); 
            component.set("v.ctry",'All');
            component.set("v.accName",'');

        }
        component.set("v.showOptyOwnersByTiers",false);
        helper.getAllData(component, event, helper);
    },    
    showcollapseFilters : function(component, event, helper) {
        if(component.get("v.showFilters")){
            component.set("v.showCriteria", true);
            component.set("v.showCountry", true);
            component.set("v.showNameSearch", true);            
        }
        else{
            component.set("v.showCriteria", false);
            component.set("v.showCountry", false);
            component.set("v.showNameSearch", false);
        }
    }, 
    //Get the theme. to shoud the Kind pf UI to be diplayed.
    getTheme : function(component, event, helper){     
        var action = component.get("c.getUITheme");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.uiTheme", response.getReturnValue());
            }else if(state === "ERROR"){
                var errors = response.getError();
                if (errors) {
                    component.set("v.errors", errors);
                    component.set("v.showError", true);
                    
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    //Get the countries list for the country filter
    getCountriesValues :function(component, event, helper){
        if(component.get("v.showCountry")){
            var action = component.get("c.getCountryPicklistValues");
            
            action.setCallback(this, function(response){
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.countriesPicklist", response.getReturnValue());
                }else if(state === "ERROR"){
                    var errors = response.getError();
                    if (errors) {
                        component.set("v.errors", errors);
                        component.set("v.showError", true);                        
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },
    
    // set the componets data in response to an event.
    setComponentData : function(component, event, helper){
        var criteria = event.getParam("type");
        var cry = event.getParam("country");
        var comId = event.getParam("comId");
        var accId = event.getParam("accId");
        
        if(criteria.includes("Prospects") || criteria == "Non-MDM Account"){
            criteria = "Non-MDM Account";
        }else{
            criteria = "MDM Accounts";
        }
        
        if(cry == undefined || cry == null || cry == ''){
            cry = "All";
        }
        
        component.set("v.criteria", criteria);
        component.set("v.commercialEntityId", comId);
        component.set("v.ctry", cry);
        component.set("v.accountID",accId);
        helper.getAllData(component, event, helper);
    },
    
    //Respond to the changes in the filter component.
    updateFilter : function(component, event, helper) {        
        var type=  event.getParam("type");
        var value= event.getParam("value");
        if(type == "Country"){
            component.set("v.ctry", value);
        }
        component.set("v.spinner", true);
        helper.getAllData(component, event, helper);
    },
    //Go to associate site components either from the hubAccountsContainer and/or snapshot.
    toggleComp : function(component, event, helper){
        var comId = component.get("v.commercialEntityId");
        var country = component.get("v.ctry");
        var  accId = component.get("v.accountID");   
        
        
        var compEvent = component.getEvent("backToSnapshot");        
        compEvent.setParams({ 
            "screenName"      : 'CommercialEntitySnapshot',
            "entityId" : comId
        }); 
        compEvent.fire();             
        
        var appEvent = $A.get("e.geinsights:EntitiesListToAssociates");
        appEvent.setParams({
            "view":true,
            "country":country,
            "comId":comId,
            "accId": accId
        });
        appEvent.fire(); 
    },
    openmodal: function(component,event,helper) {
        var acc = component.get("v.accountID");
        var com = component.get("v.commercialEntityId");
        var extId = event.currentTarget.getAttribute('data-accId');
        var tier1 = component.get("v.tier1Value");
        var tier2 = component.get("v.tier2Value");
        //alert(tier1);
        //alert(tier2);
        if(acc != null && com == null){
            
            var action = component.get("c.getcommId");
            action.setParams({
                "aId": acc
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                //alert(state);
                if (state === "SUCCESS") {
                    
                    var temp = response.getReturnValue();
                    component.set("v.comId", temp.substring(0,18));
                    component.set("v.salesrepId", null);//temp.substring(19,37));
                    component.set("v.tier1name", tier1);
                    component.set("v.tier2name", tier2);
                    component.set("v.isowner", null);
                    component.set("v.business", null);
                    component.set("v.searchAccId", extId);
                    component.set("v.isAccountTeam", null);
                    component.set("v.role", null);
                    //component.set("v.accountID", null);
                    component.set("v.showOptyOwnersByTiers", true);
                }else if(state === "ERROR"){
                    var errors = response.getError();
                    if (errors) {
                        component.set("v.errors", errors);
                        component.set("v.showError", true);                        
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }
        else{
            component.set("v.comId", com);
            component.set("v.salesrepId", null);//temp.substring(19,37));
            component.set("v.tier1name", tier1);
            component.set("v.tier2name", tier2);
            component.set("v.isowner", null);
            component.set("v.business", null);
            component.set("v.searchAccId", extId);
            component.set("v.isAccountTeam", null);
            component.set("v.role", null);
            //component.set("v.accountID", null);
            component.set("v.showOptyOwnersByTiers", true);
        }
    },
    refreshPage: function(component,event,helper) {
        
        component.set("v.showOptyOwnersByTiers", false);
    },
    toggleFilter:function(component,event,helper){    
        var cmpTarget = component.find('filterPanel');
        var expandFilter = component.get("v.expandFilter");
        if(expandFilter){
            $A.util.removeClass(cmpTarget,'slds-hide');
            $A.util.addClass(cmpTarget,'slds-show');
            
            component.set("v.expandFilter",false);
        } else {
            $A.util.removeClass(cmpTarget,'slds-show');
            $A.util.addClass(cmpTarget,'slds-hide');
            component.set("v.expandFilter",true);
        } 
    }, 
    
})