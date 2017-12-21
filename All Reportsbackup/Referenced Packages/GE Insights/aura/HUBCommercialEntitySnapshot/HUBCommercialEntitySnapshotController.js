({
    //Loads the component's contents on initial load of component.
    doInit : function(component, event, helper) {       
        component.set("v.spinner", true);
        helper.helperDoInit(component, event, helper);
        helper.isLex(component, event, helper);
    },
    
    //Responds to the changes in filter component
    updateFilter :function(component, event, helper) {
        var type=  event.getParam("type");
        var value= event.getParam("value");        
        var componentList = component.get("v.componentList");
        
        for(var i=0;i<componentList.length;i++){
            
            if(type == "Country"){
                component.set("v.country",value);
                if(componentList[i].getName() != 'cHubInsightsSurvey'){
                    componentList[i].set("v.country", value);
                }
            } 
            
            else if(type == "Account"){
                component.set("v.searchAccId",value);
                if(componentList[i].getName() != 'cHubInsightsSurvey' && componentList[i].getName() != 'cAssociatesitesAndEntities'){
                    componentList[i].set("v.searchAccId", value);
                }
            }
            if(typeof  componentList[i].refreshFilterChange != 'undefined'){
                componentList[i].refreshFilterChange();
            }
            
        }
    },
    //takes to more detail view components namley Opportunity owners, Account team and HubEntitieslist 
    toggleComps : function(component, event, helper){
        var showdet = event.getParam("showAllComps");
        var cmp = event.getParam("cmp");
        component.set("v.showAllComps",showdet);
        if(showdet){
            helper.helperDoInit(component, event, helper);
        } else if(cmp != null){
            component.set("v.ELComp", cmp);
        } 
        event.stopPropagation();
        
    },
    //Reloads the snapshot 
    refreshPage : function(component, event, helper){
        
        if(event.getParam("screenName") == 'CommercialEntitySnapshot'){
            component.set("v.commercialEntityId",event.getParam("entityId"));
            component.set("v.showAllComps", true);
            component.set("v.loadComponent", true);
            
            
        }
    },
    //Responds to the chnage in commercial entity and loads the component data related to new commercial entity.
    ChangeCommAccount : function(component, event, helper){        
        var newComm = event.getParam("newCommEntity");
        var newCommName = event.getParam("newCommName");
        component.set("v.commercialEntityId",newComm);
        component.set("v.commercialEntityName",newCommName);
        component.set("v.spinner", true);
        helper.helperDoInit(component, event, helper);
    },
    //Navigates to account detail page. 
    backtoaccount:function(component, event, helper){        
        var isLex= component.get("v.isLex");
        var id= component.get("v.recordId");
        if(isLex) {
            var event = $A.get("e.force:navigateToSObject");
            event.setParams({"recordId": id});
            event.fire();      
            
        } else {
            window.location.assign('/'+id);
            
        }
        
    }
})