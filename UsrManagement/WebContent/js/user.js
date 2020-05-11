function submit() {
    console.log(event.type);
    var name = document.getElementById("name").value; 
    var sapId = document.getElementById("sapId").value;
   
    if(name=="" || name==null){
    	alert("Please Enter User Name");
    	return false;
    }else if(sapId ==null || sapId ==""){
    	alert("Please Enter Sap Id ");
    	return false;
    }
    
    
    var obj = {name : name, sapId : sapId};
    console.log(obj);
    var httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
        httpReq = new ActiveXObject("")
    }
    httpReq.onreadystatechange = function() {
        if(this.readyState ===4 && this.status === 201){ 
            console.log("response: "+this.response);
            alert("added Successfully!!!")
            getData();
        }
    }
    httpReq.open('post', 'http://localhost:3000/user', true);
    httpReq.setRequestHeader("Content-type","application/json");
    httpReq.send(JSON.stringify(obj));
}

/*get data*/
function getData() {
	var tableEl = document.getElementsByTagName('table');
    if (tableEl[0] !== undefined) {
        tableEl[0].remove()
    }
	
    var httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
        httpReq = new ActiveXObject("")
    }
    httpReq.onreadystatechange = function() {

        if(this.readyState ===4 && this.status === 200){
            console.log(this.response);
            tablecreate(this.response);
        }
    }
    httpReq.open('get', 'http://localhost:3000/user', true);
    httpReq.send();
}

/*Create Table*/

function tablecreate(response){
	debugger;
	
	var body = document.getElementsByTagName('body')[0];
	var table = document.createElement('table');
	table.setAttribute("border", "1");
	
	
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    var headTr = document.createElement('tr');
    
    var headTd1 = document.createElement('td');
    var headTd1text = document.createTextNode ("Id");
    headTd1.appendChild(headTd1text);
    
    var headTd2 = document.createElement('td');
    var headTd2text = document.createTextNode ("SapId");
    headTd2.appendChild(headTd2text);
    
    var headTd3 = document.createElement('td');
    var headTd3text = document.createTextNode("Name");
    headTd3.appendChild(headTd3text);

    var headTd4 = document.createElement('td');
    var headTd4text = document.createTextNode ("Action-1");
    headTd4.appendChild(headTd4text);
    
    var headTd5 = document.createElement('td');
    var headTd5text = document.createTextNode ("Action-2");
    headTd5.appendChild(headTd5text);

    headTr.appendChild(headTd1);
    headTr.appendChild(headTd2);
    headTr.appendChild(headTd3);
    headTr.appendChild(headTd4);
    headTr.appendChild(headTd5);
    
    thead.appendChild(headTr);
    var data = JSON.parse(response);
    var len = data.length;
    
    if(len > 0 ){
    for(var i=0; i<len;i++){
        var tbodyTr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td1Text = document.createTextNode(data[i].id);
        td1.appendChild(td1Text);

        var td2 = document.createElement('td');
        var td2Text = document.createTextNode(data[i].sapId);
        td2.appendChild(td2Text);

        var td3 = document.createElement('td');
        var td3Text = document.createTextNode(data[i].name);
        td3.appendChild(td3Text);

        //delete
        var td4=document.createElement('td');
        var delbutton=document.createElement('button');
        delbutton.addEventListener("click",function(){
        	var data=this.parentElement.parentElement.cells;
        	var xmlhttp;
        	if(window.XMLHttpRequest){
        	xmlhttp=new XMLHttpRequest();
        	}
        	xmlhttp.onreadystatechange= function(){
        		if(this.status === 200 && this.readyState===4){
        			alert("Deleted Successfully");
        			getData();
        			
        		}
        	}
        	xmlhttp.open("DELETE", "http://localhost:3000/user/"+data[0].innerHTML, true);
        	xmlhttp.setRequestHeader('Content-type','application/json');
        	xmlhttp.send(null);
        })
        var delbuttontxt=document.createTextNode("delete");
        delbutton.appendChild(delbuttontxt);
        td4.appendChild(delbutton);
        
        //Update
        var td5=document.createElement('td');
        var updatebutton=document.createElement('button');
        var updatebuttontxt=document.createTextNode("Update");
        updatebutton.addEventListener("click",function(){
        	//alert("Update");
        	var data=this.parentElement.parentElement.cells;
        	console.log("data: "+data[0].innerHTML+" "+data[1].innerHTML+"  "+data[2].innerHTML);
        	var obj={id:data[0].innerHTML ,sapId:data[1].innerHTML,name: data[2].innerHTML};
        	console.log("Object: "+obj);
        	localStorage.setItem("user", JSON.stringify(obj));
        	window.location.assign("updateuser.html")
        })
        
        updatebutton.appendChild(updatebuttontxt);
        td5.appendChild(updatebutton);
        tbodyTr.appendChild(td1);
        tbodyTr.appendChild(td2);
        tbodyTr.appendChild(td3);
        tbodyTr.appendChild(td4);
        tbodyTr.appendChild(td5);
        tbody.appendChild(tbodyTr); 
    }
    }
    else{
        var data = document.createElement("h4");
        var noData = document.createTextNode("No data Found")
        data.appendChild(noData);
        tbody.appendChild(data);
    }
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    body.appendChild(table);
	
}






