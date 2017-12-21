({
    doInit : function(component, event, helper) {
        var recid = component.get("v.lookupVal");
        
        if(recid !='' || recid==null){             
            helper.getSelectedRecord(component, event, helper);
        } else {
            component.set("v.recordChosen", false);
        }
        
        
    },
    // method to search accounts while entering text
    doSearch : function(component, event, helper) {
        var searchStr = event.target.value;
        helper.serverSearch(component,searchStr);   
        
    },
    //method to get account id on selecting the item from displayed results
    chooseItem : function(component, event, helper) {
        var recId =  event.currentTarget.dataset.recid;
        var recLabel =  event.currentTarget.dataset.reclabel;
        component.set("v.lookupVal", recId);
        component.set("v.lookupLabel", recLabel); 
        component.set("v.recordChosen", true); 
        component.set("v.showPanel", false);
        component.set("v.matchedRecords", []);
        var compEvent = component.getEvent("filterChange");
        compEvent.setParams({"type" : "Account","value": recId});
        compEvent.fire();
    },
    //method to clear search results
    clearSearch : function(component, event, helper) {
        
        component.set("v.lookupVal", '');
        component.set("v.lookupLabel", ''); 
        component.set("v.recordChosen", false); 
        component.set("v.showPanel", true);
        component.set("v.matchedRecords", []);
        var compEvent = component.getEvent("filterChange");
        compEvent.setParams({"type" : "Account","value": null});
        compEvent.fire();
        
        
    }
})