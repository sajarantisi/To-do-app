const list = document.getElementById("list");
const add = document.getElementById("btn_Add");
const span_num = document.getElementById("num_list");
const clear = document.getElementById("clear");


add.addEventListener("click",function add(event){
    event.preventDefault();
    const input_new = document.getElementById("write_new").value;
    localStorage.setItem(localStorage.length , input_new);
    document.getElementById("write_new").value = null;
    showToDo(localStorage.length - 1);
    
    
});




function create_element(text){
   
    const div1 = document.createElement("div")
    const par = document.createElement("p")
    const text_note = document.createTextNode(text)
    par.appendChild(text_note);

    const div2 = document.createElement("div")
    const btn_1_delete = document.createElement("button")
    const btn_delete = document.createTextNode("delete")
    btn_1_delete.appendChild(btn_delete)


    const btn_2_edit = document.createElement("button")
    const btn_edit = document.createTextNode("edit")
    btn_2_edit.appendChild(btn_edit)

    div2.appendChild(btn_1_delete)
    div2.appendChild(btn_2_edit)


    div1.setAttribute("id" , "cont_list")

    btn_1_delete.setAttribute("class","btns")
    btn_2_edit.setAttribute("class","btns")

    btn_1_delete.setAttribute("id" ,"btn_delete")
    btn_2_edit.setAttribute("id" ,"btn_edit")

    div1.appendChild(par)
    div1.appendChild(div2)

    list.appendChild(div1)



}

function showToDo(index){
    if(index == 0){ //كل ما اعمل تحديث للصفحة راح يعرض كل العناصر الموجودة  
        for(i = 0; i< localStorage.length; i++){
            create_element(localStorage.getItem(i))
        }
        
    }
    else if (index > 0){ // كل ما اعمل اضافة راح يتم عرضه
        create_element(localStorage.getItem(index))
    }
    else if (index == -1){ // كل ما اعمل clear راح يحذف كل المحتويات 

        document.querySelectorAll('#cont_list').forEach(function(a){
            a.remove()
            }) //حذف المحتوى من الصفحة 
            
    }
    del_element();

    span_num.textContent = localStorage.length ; // لحساب كم عنصر موجود في localStorage 
}

clear.addEventListener("click" , function clean(event){
    event.preventDefault();
    localStorage.clear();
    showToDo(-1);

})
function del_element(){
    const elem= document.querySelectorAll('#btn_delete');
    const content=document.querySelectorAll('#cont_list');
    elem.forEach(function(item , index){
        item.addEventListener('click',function delete_el(event){
            event.preventDefault();
            if(localStorage.length != 1){
              let tmp=index;
              while(tmp < localStorage.length-1){
                  localStorage.setItem(tmp,localStorage.getItem(tmp+1))
                  tmp++ ;
              }
              localStorage.removeItem(tmp);
            }
            else{
            localStorage.removeItem(index);
         }
         content[index].remove();
         
        },{once:true})
    }) 
  
    }

window.onload = showToDo(0); // يتم تحديث الصفحة يعرض كل محتويات الستورج  
