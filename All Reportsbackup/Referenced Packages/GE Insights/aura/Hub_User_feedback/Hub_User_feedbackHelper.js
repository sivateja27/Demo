({
    recordFeedback : function(component, event, helper) {
        var like='';
        if(component.get("v.dislike")===true){
            like = 'Dislike';   
        }else{
            like = 'Like';   
        }
        var action = component.get("c.recordFeedback");       
        action.setParams({ 
            "compName" : component.get("v.componentName"),
            "comments" : component.get("v.comments"),
            "likeORdislike" : like
            
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
    }
})