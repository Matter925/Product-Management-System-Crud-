
let title=document.getElementById('title')
let price=document.getElementById('price')
let ads=document.getElementById('ads')
let taxes=document.getElementById('taxes')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit= document.getElementById("submit")

let mood ='create';
let temp;


//get total
function getTotal(){
 
    if(price.value !='')
    {
        let result=(+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML=result;
    }else{
        total.innerHTML='';
        total.style.background='#040';
    }
}


//create product 

let datPro;
if(localStorage.product !=null)
{
    datPro=JSON.parse(localStorage.product)
}else{
    datPro=[];
}

submit.onclick = function(){
    if(title.value !='' && category.value!='')
    {
        let newPro ={
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
    
    
    
        }
        if(title.value !='')
        {
            if(mood==='create')
            {
                
                if(newPro.count>1)
                {
                    for(let i=0 ; i<newPro.count ; i++)
                    {
                        datPro.push(newPro);

                    }
                }else{
                    datPro.push(newPro);
                }

            }else{
                datPro[temp]=newPro;
                mood='create';
                submit.innerHTML='Create';
                count.style.display='block';

            }

        }
            
            
            

            
            localStorage.setItem('product',JSON.stringify(datPro))
            clearInputs();
            showData()

    }else{
        alert("Please Complete Your Data Product");
    }

    
}

//clear Data

function clearInputs(){

    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';

    count.value='';

    category.value='';
    


}


//Show Data in table
showData();

function showData(){

    getTotal();
    let table='';

    for (let i=0; i<datPro.length;i++)
    {
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${datPro[i].title}</td>
            <td>${datPro[i].taxes}</td>
            <td>${datPro[i].ads}</td>
            <td>${datPro[i].discount}</td>
            
            <td>${datPro[i].total}</td>
            <td>${datPro[i].category}</td>
            <td><button onclick="updateData(${i})" ">Update</button></td>
            <td><button onclick ="deletPro(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
     document.getElementById('tbody').innerHTML=table;
     let btnDelAll=document.getElementById("deleteAll");
     if(datPro.length >0)
     {
        btnDelAll.innerHTML=`<button onclick ="deleteAll()">Delete All(${datPro.length})</button>`

     }else{
        btnDelAll.innerHTML='';
     }

}

//deletPro
function deletPro(i){

    datPro.splice(i,1);
    localStorage.product=JSON.stringify(datPro);
    showData();

}

//delete All
function deleteAll(){
    localStorage.clear();
    datPro.splice(0);
    showData();

}

//Update Data

function updateData(i){

    title.value=datPro[i].title;
    price.value=datPro[i].price;
    taxes.value=datPro[i].taxes;
    ads.value=datPro[i].ads;
    discount.value=datPro[i].discount;
    getTotal();
    count.style.display='none';
    category.value=datPro[i].category;
    submit.innerHTML='Update';
    mood='update';
    temp=i;
    scroll({
        top:0,
        behavior:'smooth',
    });

}



// Search 
let searchMood ='title';

function getSearchMood(id){

    let search =document.getElementById('search');
    if (id=='searchTitle')
    {
        searchMood='title';
        
    }else{
        searchMood='category';
        
    }
    search.placeholder='Search By'+ ' '+searchMood.toUpperCase();
    search.focus();
    search.value='';
    showData();

};

function searchData(value){

    let table='';
    
    if(searchMood=='title')
    {
        for(let i=0; i<datPro.length; i++)
        {
            
            if(datPro[i].title.includes(value.toLowerCase()))
            {
                table +=`
                        <tr>
                            <td>${i}</td>
                            <td>${datPro[i].title}</td>
                            <td>${datPro[i].taxes}</td>
                            <td>${datPro[i].ads}</td>
                            <td>${datPro[i].discount}</td>
                            
                            <td>${datPro[i].total}</td>
                            <td>${datPro[i].category}</td>
                            <td><button onclick="updateData(${i})" ">Update</button></td>
                            <td><button onclick ="deletPro(${i})" id="delete">Delete</button></td>
                        </tr>
                        `  ; 

            }
        }

    }else{
        for(let i=0; i<datPro.length; i++)
        {
            if(datPro[i].category.includes(value.toLowerCase()))
            {
                table +=`
                        <tr>
                            <td>${i}</td>
                            <td>${datPro[i].title}</td>
                            <td>${datPro[i].taxes}</td>
                            <td>${datPro[i].ads}</td>
                            <td>${datPro[i].discount}</td>
                            
                            <td>${datPro[i].total}</td>
                            <td>${datPro[i].category}</td>
                            <td><button onclick="updateData(${i})" ">Update</button></td>
                            <td><button onclick ="deletPro(${i})" id="delete">Delete</button></td>
                        </tr>
                        ` ;  

            }
        }

    }
    document.getElementById('tbody').innerHTML=table;


};








