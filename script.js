// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------



const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const bookURL = `${baseServerURL}/books`;
let mainSection = document.getElementById("data-list-wrapper");

// book
let bookTitleInput = document.getElementById("book-title");
let bookImageInput = document.getElementById("book-image");
let bookCategoryInput = document.getElementById("book-category");
let bookAuthorInput = document.getElementById("book-author");
let bookPriceInput = document.getElementById("book-price");
let bookCreateBtn = document.getElementById("add-book");

// Update book
let updateBookIdInput = document.getElementById("update-book-id");
let updateBookTitleInput = document.getElementById("update-book-title");
let updateBookImageInput = document.getElementById("update-book-image");
let updateBookAuthorInput = document.getElementById("update-book-author");
let updateBookCategoryInput = document.getElementById("update-book-category");
let updateBookPriceInput = document.getElementById("update-book-price");
let updateBookBtn = document.getElementById("update-book");

//Update price
let updatePriceBookId = document.getElementById("update-price-book-id");
let updatePriceBookPrice = document.getElementById("update-price-book-price");
let updatePriceBookPriceButton = document.getElementById("update-price-book");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterClassic = document.getElementById("filter-Classic");
let filterFantasy = document.getElementById("filter-Fantasy");
let filterMystery = document.getElementById("filter-Mystery");

//Search by title/author

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

//Books Data
let booksData = [];



window.addEventListener("load",()=>{
  handelFetchedBook()
})


const handelFetchedBook= async ()=>{
     try {
      let data=await fetch(`${bookURL}`)
      let res=await data.json()
      booksData.push(res)
      appendCard(res)
     } catch (error) {
        console.log(error)
     }
}

const appendCard=(data)=>{
  mainSection.innerHTML=null
  let card=`
  <div class='card-list'>
     ${data?.map((item)=>getCard(item.id,item.image,item.title,item.author,
      item.category,item.price
      )).join("")}
      </div>
  `
  
  mainSection.innerHTML=card

  let deletbtn=document.querySelectorAll(".card-button")
deletbtn.forEach((item)=>{
   item.addEventListener("click",(e)=>{
          let id=e.target.dataset.id

          fetch(`${bookURL}/${id}`,{
            method: "DELETE"
          }).then((res)=>{
            handelFetchedBook()
          }).catch((err)=>{console.log(err)})
   })
})

let edit=document.querySelectorAll(".card-link")
edit.forEach((item)=>{
    item.addEventListener("click",(e)=>{
      e.preventDefault()
      let id=e.target.dataset.id
                fetch(`${bookURL}/${id}`).then((res)=>res.json()).then((res)=>{
            updateBtn(res)


          }).catch((err)=>{console.log(err)})
   })
    
})


}


const getCard=(id,img,title,author,category,price)=>{
   let card=`
   <div class="card" data-id=${id}>
   <div class="card-img">
     <img src=${img} alt="">

   </div>
   <div class="card-body">
     <h4 class="card-title">
      ${title}
     </h4>
     <p class="card-author">
       ${author}
     </p>
     <p class="card-category">
       ${category}
     </p>
     <p class="card-price">
       ${price}
     </p>
     <a href="#" data-id="${id}" class="card-link">Edit</a>
     <button data-id="${id}" class="card-button"
     >Delete</button>
   </div>
    
 </div>
   `
   return card
}




// //////////////////////////POST///////////////////////////////////////////////
const getPostData=()=>{
  let obj={
    title:bookTitleInput.value,
    author:bookAuthorInput.value,
    category:bookCategoryInput.value,
    image:bookImageInput.value,
    price:bookPriceInput.value
  }
  return obj
}

bookCreateBtn.addEventListener("click",()=>{
  
  let k=getPostData()
  console.log(k)

  fetch(`${bookURL}`,{
    method: "POST",
    headers:{
      "content-type": "application/json"
    },
    body: JSON.stringify(k)
  }).then((Res)=>Res.json).then((res)=>{
    console.log("Post sucessfull")
    handelFetchedBook()
  })
  .catch((err)=>console.log(err))
})


//  Patch  edit\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////////////////////////////////////////////

const updateBtn=(res)=>{
     console.log(res)
     updateBookIdInput.value= res.id
     updateBookTitleInput.value = res.title
    updateBookAuthorInput.value = res.author
    updateBookImageInput.value =res.image
     updateBookCategoryInput.value = res.category
     updateBookPriceInput.value = res.price



     updatePriceBookId.value= res.id
     updatePriceBookPrice.value=res.price




      updateBookBtn.onclick=(e)=>{
     
         let id=updateBookIdInput.value
        let obj={}
            obj.id=updateBookIdInput.value
            obj.title=updateBookTitleInput.value
            obj.image=updateBookImageInput.value
            obj.category=updateBookCategoryInput.value
            obj.price=Number(updateBookPriceInput.value)
            obj.author=updateBookAuthorInput.value
           
          console.log(id)

          fetch(`${bookURL}/${id}`,{
            method: "PATCH",
            headers:{
              "content-type": "application/json"
            },
            body: JSON.stringify(obj)
          }).then((Res)=>Res.json).then((res)=>{
            console.log("Patch sucessfull")
            handelFetchedBook()
          })
          .catch((err)=>console.log(err))
      }

      updatePriceBookPriceButton.onclick = (e) => {
       
        let id=updatePriceBookId.value
          let obj={}
          obj.id=updatePriceBookId.value
          obj.price=Number(updatePriceBookPrice.value)

          fetch(`${bookURL}/${id}`,{
            method: "PATCH",
            headers:{
              "content-type": "application/json"
            },
            body: JSON.stringify(obj)
          }).then((Res)=>Res.json).then((res)=>{
            console.log("Price Patch sucessfull")
            handelFetchedBook()
          })
          .catch((err)=>console.log(err))
      }
}




//sort and filter
// let sortAtoZBtn = document.getElementById("sort-low-to-high");
// let sortZtoABtn = document.getElementById("sort-high-to-low");



sortAtoZBtn.addEventListener("click", function(){
    fetch(`${bookURL}?_sort=price&_order=asc`)
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      appendCard(res)
    }).catch((Err)=>{
      console.log(Err)
    })
})

sortZtoABtn.addEventListener("click", function(){
  fetch(`${bookURL}?_sort=price&_order=desc`)
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res)
    appendCard(res)
  }).catch((Err)=>{
    console.log(Err)
  })
})




// let filterClassic = document.getElementById("filter-Classic");
// let filterFantasy = document.getElementById("filter-Fantasy");
// let filterMystery = document.getElementById("filter-Mystery");

filterClassic.addEventListener("click",(e)=>{
  let check=e.target.name
  
   filterNow(check)
})

filterFantasy.addEventListener("click",(e)=>{
  let check=e.target.name
  console.log(check)
  filterNow(check)
})
filterMystery.addEventListener("click",(e)=>{
  let check=e.target.name
  console.log(check)
  filterNow(check)
})


const filterNow=(query)=>{
    fetch(`${bookURL}?category=${query}`)
    .then((res)=>res.json())
    .then((res)=>appendCard(res))
}


// let searchBySelect = document.getElementById("search-by-select");
// let searchByInput = document.getElementById("search-by-input");
// let searchByButton = document.getElementById("search-by-button");


let searchall={}

searchBySelect.addEventListener('change',(e)=>{
  searchall.search=e.target.value
})

searchByInput.addEventListener('change',(e)=>{
  searchall.query=e.target.value
})
searchByButton.addEventListener('click',(e)=>{
   let{search,query} = searchall
   fetch(`${bookURL}?${search}=${query}`)
    .then((res)=>res.json())
    .then((res)=>appendCard(res))
})