({
    //method to get the commercial entity details
    helperDoInit : function(component, event, helper){
        
        var recordId = component.get("v.recordId");
        var action = component.get("c.getAccountDetails");
        
        action.setParams({
            "accoundId" : recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if(state === "SUCCESS"){
                var result = response.getReturnValue();
                var commercialEntityId = component.get("v.commercialEntityId");
                var commercialEntityName;
                helper.iterate(result,'');
                
                if(commercialEntityId == null || commercialEntityId == undefined){
                    if(result.HUBCommercialEntityId == null){
                        commercialEntityId = result.HUBIdentifier;
                        commercialEntityName = result.name;                        
                    } else {
                        commercialEntityId = result.HUBCommercialEntityHubId;
                        commercialEntityName = result.HUBCommercialEntityName;
                    }
                    
                    component.set("v.commercialEntityId",commercialEntityId);
                    component.set("v.commercialEntityName",commercialEntityName);                   
                }               
                
                helper.initComponents(component, helper);               
                component.set("v.loadComponent", true);
            } else if(state === "ERROR"){
                component.set("v.spinner", false);
                var errors = response.getError();
                if (errors) {
                    helper.iterate(errors,'');
                    component.set("v.errors", errors);
                    component.set("v.showError", true);
                    component.set("v.loadComponent", false);
                } else {
                    console.log("Unknown error");
                }
                
            }
        });
        $A.enqueueAction(action);
        
    },
    //method to initialise all the components
    initComponents:function(component,  helper){
        var list = new Array();
        var commercialEntityId = component.get("v.commercialEntityId");
        var AccountOwnerSnapshotOrder = component.get("v.AccountOwnerSnapshotOrder");
        var OpportunityOwnerSnapshotOrder = component.get("v.OpportunityOwnerSnapshotOrder");
        var associatedSiteEntityOrder = component.get("v.associatedSiteEntityOrder");                
        var attributes = {
            "commercialEntityId" : commercialEntityId,
            "showFilter" : false,
            "verticallyStacked_EL" : true,
            "independentComp":false
        };
        
        
        if(AccountOwnerSnapshotOrder != 0){
            
            list.push({
                "key":
                "geinsights:HUB_GE_Account_Owners",
                "value": AccountOwnerSnapshotOrder
            });
        }
        
        if(OpportunityOwnerSnapshotOrder != 0){
            list.push({
                "key":
                "geinsights:HUB_GE_Opportunity_Owners",
                "value": OpportunityOwnerSnapshotOrder
            });
        }
        
        if(associatedSiteEntityOrder != 0){
            list.push({
                "key":
                "geinsights:AssociatesitesAndEntities",
                "value": associatedSiteEntityOrder
            });
        }
        
        list.push({
            "key":
            "geinsights:HubInsightsSurvey",
            "value": list.length
        });
        
        
        list.sort(function(a, b) { return a.value - b.value; });
        var componentList = new Array();
        
        for(var i=0;i<list.length;i++){                   
            componentList.push([list[i]["key"],attributes]);                    
        }
        
        
        
        
        $A.createComponents(
            componentList,
            function(results) {
                component.set("v.spinner", false);
                component.set("v.componentList", results);
            }
        );
    },
    //method to check current logged in environment whether it is lightning, salesforce1 or Classic
    isLex :function(component, event, helper){
        var action = component.get("c.checkLex");
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if(state === "SUCCESS"){
                var result = response.getReturnValue();
                component.set("v.isLex",result);
                var cName = '';
                if(result){
                    cName = 'GE Insights Button : Lex';
                }else{
                    cName = 'GE Insights Button : Classic';
                }
				var action = component.get("c.recordFeedback");       
                action.setParams({ 
                    "compName" : cName,
                    "comments" : '',
                    "likeORdislike" : ''
                    
                });        
                action.setCallback(this, function(response) {
                    var state = response.getState();  
                     console.log(state);                                 
                });        
                $A.enqueueAction(action);                
            }
        });
        $A.enqueueAction(action);
    },
    // Method to iterate results rertrieved from Apex controllers (to be used for checking results while developing)
    iterate :function(obj, stack){
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == "object") {
                    this.iterate(obj[property], stack + '.' + property);
                } else {
                    // console.log(property + " -  " + obj[property]);
                    
                }
            }
        }
    }
})