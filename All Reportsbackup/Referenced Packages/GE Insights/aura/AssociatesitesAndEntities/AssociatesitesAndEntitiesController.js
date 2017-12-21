({
	//Loads content of the component on initial load of the component
    doInit: function(component, event, helper) {       
        component.set("v.spinner", true);
        helper.getAllData(component, event, helper);
    },
	
    //Responds to change in the filter component.
    updateFilter: function(component, event, helper) {
        component.set("v.spinner", true);
        var type =  event.getParam("type");
        var value = event.getParam("value");
        if(type == "Country"){
            component.set("v.country", value);
            component.set("v.ELCountry", country);
        }
        helper.getAllData(component, event, helper);
    },
	//Responds to change in the commercial Entity
    ChangeCommAccountInAssociated : function(component, event, helper){        
        var newComm = event.getParam("newCommEntity");
        component.set("v.commercialEntityId",newComm); 
        component.set("v.spinner", true);       
        helper.getAllData(component, event, helper);
      },
    
	//Navigates to the HubEntitiesListComponent
    navigateToEntitiesList : function(component, event, helper) {

        var country = component.get("v.country");
        var typeAcc = event.getSource().get("v.value");
        var comId = component.get("v.commercialEntityId");
        //alert(comId);
        var accId = component.get("v.accountID");
        var recId = component.get("v.recordId");
		var optytype = typeAcc;
        if(accId == null || accId == '' || accId == undefined){
             accId = recId;
        }

        if(typeAcc.includes("Prospects")){
            typeAcc = "Prospects";
        }else{
            typeAcc = "Legal Entities";
        }   
        console.log('typeAcc '+ typeAcc);
        $A.createComponent(
             "geinsights:HubEntitiesList",
             {
               "criteria" : typeAcc,
               "ctry" : country,
               "showBackBtn": true,
               "commercialEntityId" :comId,
               "accountID" : accId
             },
             function(newCmp){
                if (component.isValid()) {                    
                    var action = component.get("c.recordFeedback");       
                    action.setParams({ 
                        "compName" : optytype,
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
                        "cmp": newCmp
                    });
                   
                    compEvent.fire();

                }
             }
          );
      },   
    //Responds to the click ofbackbutton. 
    NavigateBack : function(component,event,helper){   
        component.set("v.accountID",event.getParam("entityId"));
   }
})