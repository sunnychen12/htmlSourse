//获取目录
const fs = require("fs")  

module.exports = {
  getChildrenDir : function(root) {
  	var result=[];
  	readDirSync(root);
  	return result;
  	
  	function readDirSync(path){  
  	    var pa = fs.readdirSync(path);  
  	    pa.forEach(function(ele,index){  
  	        var info = fs.statSync(path+"/"+ele)      
  	        if(info.isDirectory()){  
  	            //console.log("dir: "+ele);
  	            result.push(ele)
  	            //readDirSync(path+"/"+ele);遍历子目录  
  	        }else{  
  	            //console.log("file: "+ele)
  	            result.push(ele);
  	        }     
  	    })  
  	}
  }
};