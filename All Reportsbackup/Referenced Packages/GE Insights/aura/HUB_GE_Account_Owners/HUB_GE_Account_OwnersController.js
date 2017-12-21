({	
    doInit : function(component, event, helper) {        
        var commercialEntityId = component.get("v.commercialEntityId");        
        if(commercialEntityId=="" || commercialEntityId==null){ 
            // If commercialEntityId is null get commercial enetity from the record Id context.
            helper.getCommercialEntity(component,helper);
        } else {
            // If commercialEntityId is not null get owners directly
            helper.getTopAccountOwners(component,helper);
        }
        
    }, 
    
    
    toggleComps : function(component, event, helper){
        var showdet = event.getParam("showAllComps");
        var cmp = event.getParam("cmp");
        component.set("v.showFullAccount", true);
        if(cmp != null){
            component.set("v.body", cmp);
        } 
        
        
    },
    refreshPage : function(component, event, helper){
        //console.log('Screen Name==>'+event.getParam("screenName")); 
        if(event.getParam("screenName") == 'AccountSnapshot'){
            component.set("v.commercialEntityId",event.getParam("entityId"));
            component.set("v.showFullAccount", false);
            
        }
    },
    viewAllTeam: function(component,event,helper) {        
        component.set("v.showFullAccount", false);
        var commercialEntityId = component.get("v.commercialEntityId");
        var country = component.get('v.country');
        var business = component.get('v.business'); 
        var searchAccId = component.get('v.searchAccId'); 
        var independentComp = component.get('v.independentComp')
        $A.createComponent(
            "geinsights:hubGEOppOwners",
            {   "id": commercialEntityId,
             "country": country,
             "business": business,
             "searchAccId": searchAccId,
             "navigateBackScreen": (independentComp?"AccountSnapshot":"CommercialEntitySnapshot"),
             "isAccountTeam":true,
             "isAccCmp":true
            },
            function(newcmp, status, errorMessage){
                
                if (status === "SUCCESS") {
                    var action = component.get("c.recordFeedback");       
                    action.setParams({ 
                        "compName" : 'Account Owners : View All',
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
                    //console.log("No response from server or client is offline.")
                    
                }
                    else if (status === "ERROR") {
                        //console.log("Error: " + errorMessage);
                        
                    }
            }
        );
        
    },    
    updateFilter :function(component, event, helper) {
        component.set("v.spinner", true);         
        var type=  event.getParam("type");
        var value= event.getParam("value");
        if(type == "Country"){
            component.set("v.country", value);
        } else if(type == "Business"){ 
            component.set("v.business", value);
        } else if(type == "Account"){
            component.set("v.searchAccId", value);
        }
        helper.getTopAccountOwners(component,helper);
    },
    
    
    
    handleValueChange :function(component, event, helper) {
        component.set("v.spinner", true); 
        helper.getTopAccountOwners(component,helper);
        
        
    }
})