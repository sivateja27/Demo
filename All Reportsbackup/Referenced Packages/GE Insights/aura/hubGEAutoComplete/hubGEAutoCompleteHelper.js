({
    getAllRecords : function(component) {
        var action = component.get("c.getAllRecords");
        action.setParams({"objectName": component.get("v.objectName"), 
                          "searchField": component.get("v.searchField"),
                          "selectFields": component.get("v.selectFields")}); 
                       
        action.setCallback(this, function(a){
            var allRecords = a.getReturnValue();
            console.log('allRecords');
            console.log(allRecords);
            component.set("v.allRecords", allRecords);
        });
         $A.enqueueAction(action);
    }, 
    getSelectedRecord : function(component) {
        
        var action = component.get("c.getRecordById");
        action.setParams({"objectName": component.get("v.objectName"), 
                          "selectFields": component.get("v.selectFields"),
                          "recId":component.get("v.lookupVal")}); 
                       
        action.setCallback(this, function(a){
            var rec = a.getReturnValue();
           
            if(rec != null){
                 
                component.set("v.lookupVal", rec[0]);
                component.set("v.lookupLabel", rec[1]); 
                component.set("v.recordChosen", true); 
                component.set("v.showPanel", false);
                component.set("v.matchedRecords", []);
            }
        });
         $A.enqueueAction(action);
    }, 
  clientSearch : function(component,searchText) {
		var matchedRecords = [];
		//var searchText = component.find("searchInput").get("v.value").toLowerCase();
        var allRecords = component.get("v.allRecords");
        var startsWith = component.get("v.startsWith");
		var minChars = 1;
		
        if (searchText.length >= minChars) {
            //loop through all the records and find any which match
            for (var i=0; i<allRecords.length; i++) {
                var record = allRecords[i];
                var nameLcase = record[1].toLowerCase();
                var location = nameLcase.indexOf(searchText);
                
                if (startsWith) {
                    if (location == 0) {
                    	matchedRecords.push(record);   
                    }  
                } else {
                    if (location != -1) {
                    	matchedRecords.push(record);   
                    }                     
                }
            }            
        }

       
        component.set("v.matchedRecords", matchedRecords);
    },  
    serverSearch : function(component,searchText) {
		var minChars = 2;
        var startsWith = component.get("v.startsWith");     
        var filterBy = component.get("v.filterBy");
        var filterText ="";
        if(filterBy != null ){
            console.log('filter by-->'+filterBy);
            for(var i=0;i<filterBy.length;i++ ){
                console.log(filterBy[i]);
                filterText = filterText +(filterText !=""?" AND ":"" )+filterBy[i].fieldName+"="+filterBy[i].fieldValue;
           } 
        }
        console.log('filterText =='+filterText);
        if (searchText.length >= minChars) {
            var action = component.get("c.searchRecords");
            action.setParams({"objectName": component.get("v.objectName"), 
                              "searchField": component.get("v.searchField"),
                              "searchTerm": searchText,
                              "startsWith": startsWith,
                              "selectFields": component.get("v.selectFields"),
                              "filterText":filterText}); 
                           
            action.setCallback(this, function(a){
                var state = a.getState();
            if (state === "SUCCESS") {
                var records = a.getReturnValue();
                console.log('records');
                console.log(records);
                
                if(records){
                 component.set("v.matchedRecords", records);
                  component.set("v.showPanel", true);
                    
                }
                 console.log(component.get("v.matchedRecords").length);
            }
            });
            $A.enqueueAction(action);          
        } else {
        	component.set("v.matchedRecords", []);   
        }       
    }    
})