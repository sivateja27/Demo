({	
    doInit: function(component, event, helper) { 
        var commercialEntityId = component.get("v.commercialEntityId");
        if(commercialEntityId=="" || commercialEntityId==null){
            helper.getCommercialEntity(component, event, helper);
        } else {
            
            helper.helperDoInit(component, event, helper); 
        }
        
    },
    refreshPage : function(component, event, helper){
        //console.log('Screen Name==>'+event.getParam("screenName"));
        if(event.getParam("screenName") == 'OpportunitySnapshot'){
            //component.set("v.commercialEntityId",event.getParam("entityId"));
            component.set("v.showFullOpportunities", false);
            
        }
    },
    
    
    updateFilter :function(component, event, helper) {
        
        
        var type=  event.getParam("type");
        var value= event.getParam("value");
        component.set("v.spinner", true); 
        if(type == "Country"){
            component.set("v.country", value);
        } else if(type == "Business"){ 
            component.set("v.business", value);
        }
        
        helper.helperDoInit(component, event, helper); 
    },
    
    
    toggleComps : function(component, event, helper){
        var showdet = event.getParam("showAllComps");
        var cmp = event.getParam("cmp");
        component.set("v.showFullOpportunities", true);
        if(cmp != null){
            component.set("v.body", cmp);
        } 
        
        
    },
    viewAllOpportunities: function(component,event,helper) {  
        
        component.set("v.showFullOpportunities", false);
        
        
        var commercialEntityId = component.get("v.commercialEntityId");
        var country = component.get('v.country');
        var business = component.get('v.business'); 
        var searchAccId = component.get('v.searchAccId'); 
        var independentComp = component.get('v.independentComp'); 
        
        $A.createComponent(
            "geinsights:hubGEOppOwners",
            {   "id": commercialEntityId,
             "country": country,
             "business": business,
             "searchAccId": searchAccId,
             "navigateBackScreen": (independentComp?"OpportunitySnapshot":"CommercialEntitySnapshot"),
             "isAccountTeam":false,
             "isAccCmp":false
            },
            function(newcmp, status, errorMessage){
                
                if (status === "SUCCESS") {
                    var action = component.get("c.recordFeedback");       
                    action.setParams({ 
                        "compName" : 'Opportunity Owners : View All',
                        "comments" : '',
                        "likeORdislike" : ''
                        
                    });        
                    action.setCallback(this, function(response) {
                        var state = response.getState();   
                        console.log('state '+ state);
                        if (component.isValid() && state === "SUCCESS") {                
                            console.log('success ');                                        
                        }
                        else {                      
                            console.log('failed ');
                        }                
                    });        
                    $A.enqueueAction(action);
                    var compEvent = $A.get("e.geinsights:ClearComponentsInSnapshot");
                    compEvent.setParams({
                        "showAllComps": false,
                        "cmp":newcmp
                    });
                    compEvent.fire();
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    
                }
                    else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                        
                    }
            } 
        ); 
        
    }
    
    
})