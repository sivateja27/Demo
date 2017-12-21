({
     //get picklist values for stage
	getStagePicklistValues : function(component,helper) {
		var action = component.get("c.getStageValues");                
        action.setCallback(this, function(response) { 
                var state = response.getState();
            if(state === "SUCCESS"){  
                var result = response.getReturnValue();                
                component.set("v.stagename", result);                                
                
            }else if(state === "ERROR"){               
                                      } 	
        });
        $A.enqueueAction(action);     
	},     
    iterate :function(obj, stack){
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) { 
                if (typeof obj[property] == "object") {                     
                    this.iterate(obj[property], stack + '.' + property);
                } else {
                    
                    
                }
            }
        }
    },
    formatDate : function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
	},
    
    
})