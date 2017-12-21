({
	getAllData : function(component, event, helper) {
		
        var accName = component.get("v.accName");        
        var ctry = component.get("v.ctry");
        var recid = component.get("v.recordId");
        var accountID = component.get("v.accountID");
        var criteria = component.get("v.criteria");        
        var comId = component.get("v.commercialEntityId");
        
        //alert(comId);
        var globalId = component.getGlobalId();        
        var accId;        
        if(recid == undefined || recid == null || recid == ''){
            accId = accountID;
        }else{
            accId = recid;
        }
		component.set("v.accountID",accId);
        var stacked = component.get("v.verticallyStacked");
        var gridElements = 0;
        var fltrElements = 0;

        if(stacked == false){           
            if(component.get("v.showActiveEntitiesGrid")){
                gridElements++;
            }
            if(component.get("v.showNonActiveEntitiesGrid")){
                gridElements++;
            }

            if(component.get("v.showCriteria")){
                fltrElements++;
            }
            
            if(component.get("v.showCountry")){
                fltrElements++;
            }
            if(component.get("v.showNameSearch")){
                fltrElements++;
            }
            fltrElements = 12/fltrElements;
        	gridElements = 12/gridElements;
        }else{
            fltrElements = 12;
        	gridElements = 12;
        }

        component.set("v.gridElements",gridElements);
        component.set("v.fltrElements",fltrElements);

        var action = component.get("c.getEntityDetails");

        //alert(component.get("v.tier1Value"));
        //alert(component.get("v.tier2Value"));
        action.setParams({
            "accId": accId,
            "comId": comId,
            "accName":   accName,
            "country":   ctry,
            "recType": criteria,
            "tier1val" : component.get("v.tier1Value"),
            "tier2val" : component.get("v.tier2Value")
        });


        action.setCallback(this, function(response){
            var state = response.getState();
            component.set("v.spinner", false);
                
            if (state === "SUCCESS") {
                component.set("v.showError", false);
                var aItems = new Array();
                var inItems = new Array();
								var noactivity = new Array();
                var res = response.getReturnValue();
                component.set("v.commName",res.commEntityName);

                for (i = 0; i < res.entities.length; i++){
                    if(res.entities[i].lastActive != null && res.entities[i].lastActive != undefined){
						if(res.entities[i].lastActive == "No Activity"){
							noactivity.push(res.entities[i]);
						}else{
							inItems.push(res.entities[i]);
						}
                    }else{
                        aItems.push(res.entities[i]);
                    }
                }
                
                aItems.sort(function(a,b){
                    return b.opptyAmt - a.opptyAmt;
                });
				
                inItems.sort(function(a,b){
                    return parseInt(b.lastActive) - parseInt(a.lastActive);
                });
                for(var i=0; i<noactivity.length; i++){
                    inItems.push(noactivity[i]);
                }
				
                component.set("v.activeItems", aItems);
                component.set("v.inActiveItems", inItems);
                component.set("v.activeItemsSize",aItems.length);
                component.set("v.inactiveItemsSize",inItems.length);
                $A.createComponent(
                 "geinsights:maps",
                 {

                   "activeAccounts" : aItems,
                   "inActiveAccounts" : inItems
                 },
                 function(newCmp, status){                    
                     if(status === "SUCCESS"){
                        component.set("v.mapBody", newCmp);
                     }
                 }
              );
				
			
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
})