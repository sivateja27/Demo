({
    doInit : function(component, event, helper){
        component.set("v.submitfeed",false);  
        component.set("v.dislike",false);
        component.set("v.fieldblank",false);
        component.set("v.showFullComponent",true);        
        
        var disabledIcon = component.find("dislike");        
        disabledIcon.set("v.disabled", false);
        var disabledIcon1 = component.find("like");        
        disabledIcon1.set("v.disabled", false);
        component.set("v.fieldblank",false);        
    },    
    submitLike : function(component, event, helper){        
        var disabledIcon = component.find("dislike");        
        disabledIcon.set("v.disabled", true);
        component.set("v.submitfeed",true);        
        component.set("v.dislike",false); 
        // $A.util.addClass(disabledIcon, 'likedislikeclicked');
        helper.recordFeedback(component, event, helper);      
    },
    submitDisLike : function(component, event, helper){               
        var disabledIcon = component.find("like");        
        disabledIcon.set("v.disabled", true);
        component.set("v.submitfeed",true);  
        component.set("v.dislike",true);   
        //$A.util.addClass(disabledIcon, 'likedislikeclicked');
        
        //helper.recordFeedback(component, event, helper);
        
    },
    submitFeedback : function(component, event, helper){
        console.log('submitFeedback  '+component.get("v.comments"));
        
        if((!component.get("v.comments"))&&component.get("v.dislike")){            
            component.set("v.fieldblank",true);
            return;        	            
        }else{
            component.set("v.spinner",true);
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
                    
                    component.set("v.showComponent",false); 
                    setTimeout(function() {
                        console.log('setTimeout ');
                        component.set("v.showFullComponent",false);                                                                       
                    }, 3000);                    
                }
                else {                      
                    console.log('failed ');
                }
                component.set("v.spinner",false);
            });        
            $A.enqueueAction(action);            
        }        
    },   
})