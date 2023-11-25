//----------------import firebase functions--------------//
import {
  app,
  initializeApp,
  getDatabase,
  ref,
  set,
  child,
  get,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  update,
  remove,
  getStorage,
  sref,
  uploadBytesResumable,
  getDownloadURL,
  push,
} from "./firebaseConfig.js";

//------------- All references-----------//

const db = getDatabase();
const dbref = ref(db);
const auth = getAuth(app);

//admin/reseller sign in references 
let email_signin = document.getElementById("emailinp");
let pass_signin = document.getElementById("passInp");
let signin_Button = document.getElementById("signinbtn");
//signup as reseller references
let name_signup = document.getElementById("nameInp");
let email_signup = document.getElementById("emailInp");
let pass_signup = document.getElementById("passInp");
let number_signup = document.getElementById("numberInp");
let location__signup = document.getElementById("LocationInp");
let signup_button = document.getElementById("signupbtn");
let savechanges_Colorbutton = document.getElementById("savechanges_colorbtn");
let edit_Colorbutton = document.getElementById("edit_colorbtn");
let edit_Stockbutton = document.getElementById("edit_stockbtn");
// console.log("editt",edit_Colorbutton)
let savechanges_Stockbutton = document.getElementById("savechanges_stockbtn");
let colorTable = document.getElementById("color-table");
let StockTable = document.getElementById("stock-table");
let DistributionTable = document.getElementById("distribution-table");
let color_arr = [];
let stock_arr = [];
var colorId_selected_to_edit;
var colorId_selected_to_delete;
var stockId_selected_to_edit;
var stockId_selected_to_delete;
let choosen_reseller_to_distribute = document.getElementById("choosenResellerName");
let newStockQty;
//stock references
let stock_qty = document.getElementById("inputQuantitySelector");
let choosen_colorName = document.getElementById("choosenColorName");
let reseller_priceInp = document.getElementById("resellerPriceInp");
let wholesaler_priceInp = document.getElementById("wholeSalerPriceInp");
let productTitle = document.getElementById("productTitleInp");
let productDescription = document.getElementById("productDescriptionInp");
let savechanges_Distributionbutton = document.getElementById("savechanges_distributionbtn");
let usernameLoggedIn = document.getElementById("usernameheader");

let datalist_input_reseller = document.getElementById("datalistOptions_reseller");
let selected_productTitle;
let selected_colourName;
let reseller_Arr = [];
let selected_stock_quantity;
let stockId_Qty_to_update;
let oldStockQty;
let emailinput;
let Usersarr = [];
let view_Distributed_Modal = document.querySelector("#viewdistributionModalContent");

let date = new Date().getTime();
let sarr = [];
let WorkArr = [];
let remainingQty;
 let newarr=[];
  let userarr=[];
  let db_username;
let userArr = [];

let ResellerLoggedIn;
//-------side bar toggle button script start---//
// var checkbox = document.querySelector("input[id=cancel-check]");
// console.log(checkbox)
// function hide_sidebar(){
// console.log("rum")
//   let checkbox= document.querySelector("#cancel");
//   if(checkbox.checked){
// console.log("runn");
// document.querySelector(".sidebar").style.display="none";
//   }


// }
// if(cancel_button){
// cancel_button.addEventListener('change', hide_sidebar);

// }



// if(checkbox){
// checkbox.addEventListener('change', function() {
//   console.log("runnn")
//   if (this.checked) {
//     console.log("Checkbox is checked..");
//     document.querySelector(".sidebar").style.display="none";
//     document.querySelector("#bar_btn").style.display="block";
//   } else {
//     console.log("Checkbox is not checked..");
//   }
// });
// }

//-------side bar toggle button script end---//






//------------admin login script start-------------//

//validation start//

function admin_reseller_login() {

  function isEmptyOrSpaces(str) {
    if (str == "") {
      return true;
    } else {
      return false;
    }
  }

  //-----Authentication Process------//

  function AuthenticationUser() {


    if (isEmptyOrSpaces(email_signin.value) || isEmptyOrSpaces(pass_signin.value)) {

      alert("You cannot leave any field empty!");

    }

    //----------------------validation end-----------------------------------//


    signInWithEmailAndPassword(auth, email_signin.value, pass_signin.value).then((credentials) => {
      get(child(dbref, "UserAuthList/" + credentials.user.uid)).then((snapshot) => {

        if (snapshot.exists()) {

          let dbpass = snapshot.val().Password;
          // console.log("passss", dbpass);
          let dbemail = snapshot.val().Email;
          //  console.log("passss", dbemail);
          let db_usertype = snapshot.val().User_Type;
          db_username = snapshot.val().Reseller_Name;
          if (dbpass == pass_signin.value && dbemail == email_signin.value && db_usertype == "admin") {
            // console.log("the mailllllll",email.value)

            alert("Welcome Admin!");

            // window.location = "adminpanel.html"

          } else if (dbpass == pass_signin.value && dbemail == email_signin.value && db_usertype == "reseller") {
    
            console.log("db_username", db_username)

            // window.location.href = "reseller.html"

          }

        }
      })

    }).catch((error) => {
      console.log(error.message);
    })


  }




  if (signin_Button) {
    signin_Button.addEventListener('click', AuthenticationUser);
  }


}
admin_reseller_login();




//-----------admin login script end-------//



//-----sign up as reseller scrip start----//
function signup_as_reseller() {

  function isEmptyOrSpaces(str) {
    if (str == "") {
      return true;
    } else {
      return false;
    }
  }

  //-----Authentication Process------//
  let adminid = 1;
  function AuthenticationReseller() {

    if (isEmptyOrSpaces(name_signup.value) || isEmptyOrSpaces(email_signup.value) || isEmptyOrSpaces(number_signup.value) || isEmptyOrSpaces(pass_signup.value) || isEmptyOrSpaces(location__signup.value)) {

      alert("You cannot leave any field empty!");

    } else {
      insertReseller();
    }

  }
 


  function insertReseller() {

    console.log("hi");
    createUserWithEmailAndPassword(auth, email_signup.value, pass_signup.value).then((credentials) => {
      set(ref(db, "UserAuthList/" + credentials.user.uid), {
        User_id: credentials.user.uid,
        Reseller_Name: name_signup.value,
        Email: email_signup.value,
        Password: pass_signup.value,
        Number: number_signup.value,
        Location: location__signup.value,
        User_Type: "reseller"
      })
    }).then(() => {
      name_signup.value = '';
      email_signup.value = '';
      pass_signup.value = '';
      number_signup.value = '';
      location__signup.value = '';
      // initApp();
      alert("Reseller Signed Up Successfully!")
      window.location = "index.html";
    }).catch(() => {
      alert("Reseller Signed Up Unsuccessfully!")
    });


  }


  if (signup_button) {
    signup_button.addEventListener('click', AuthenticationReseller);
  }


}
signup_as_reseller();
//-----sign up as reseller scrip end----//






//---------------color managment start----------//

//---------add color to the array/firebase start-------//

//bring  data from Firebase for color
const ColorinitApp = () => {

  // const dbref = ref(db);
  get(child(dbref, "AddColor/")).then((snapshot) => {

    if (snapshot.val()) {
      color_arr = snapshot.val();

    }
    addColorToHTMLTable();
  })

}


function addcolor_to_Array() {
  let color_name_inp = document.getElementById("color-input");
  console.log("name is ", color_name_inp.value);


  // new_arr=color_arr.push(color_name_inp);


  // console.log("fde",color_arr)
  //add data to firebase

  set(ref(db, "AddColor/" + color_arr.length), {
    Id: color_arr.length,
    ColorName: color_name_inp.value
  })
    .then(() => {
      alert("Color inserted Successfully!");

      ColorinitApp();
    })
    .catch((error) => {
      alert("Color inserted Unsuccessfully!");
    });


  color_name_inp.value = "";


}


ColorinitApp();

if (savechanges_Colorbutton) {
  savechanges_Colorbutton.addEventListener('click', addcolor_to_Array);
}


//---------add color to the array/firebase end--------//


//-----------edit color to table/firebase start---------------------//

window.getColorId_edit = (colorId) => {
  colorId_selected_to_edit = colorId
}

function editcolor() {

  let color_name_inp = document.getElementById("color-edit-input");
  console.log("name is ", color_name_inp.value);




  if (color_name_inp != "") {
    update(ref(db, "AddColor/" + colorId_selected_to_edit), {
      ColorName: color_name_inp.value
    })
      .then(() => {
        alert("Color Updated Successfully!");

        ColorinitApp();
      })
      .catch(() => {
        alert("Color Updated Unsuccessfully!");
      });

  }
  color_name_inp.value = "";

}

if (edit_Colorbutton) {

  edit_Colorbutton.addEventListener('click', editcolor)
}
//-----------edit color to table/firebase end---------------------//

//-----------delete color from the table/firebase start---------------------//

window.getColorId_delete = (colorId) => {
  colorId_selected_to_delete = colorId
  console.log("color idddd to delete", colorId_selected_to_delete)


  remove(ref(db, "AddColor/" + colorId_selected_to_delete), {

  })
    .then(() => {
      alert("Color Deleted Successfully!");

      ColorinitApp();
    })
    .catch(() => {
      alert("Color Deleted Unsuccessfully!");
    });
}
//-----------delete color from the table/firebase end---------------------//


//-----------add color to table start---------------------//
function addColorToHTMLTable() {
  if (colorTable) {
    while (colorTable.hasChildNodes()) {
      colorTable.removeChild(colorTable.firstChild);
    }
  }


  // console.log("color array runn",color_arr)
  color_arr.forEach((value, key) => {

    if (colorTable) {
      colorTable.innerHTML += `
   <tr class="${key % 2 == 0 ? "coloured-white" : "coloured-transparent"}">
    <td>${value.Id}</td>
    <td>${value.ColorName}</td>
      <td>
        <div class="row">
          <div class="col-6 action-div">
           <button
              class="pencilbtn" 
              data-toggle="popover"
              
              data-bs-toggle="modal"
              data-bs-target="#editModalCenter"
              onclick="getColorId_edit(${value.Id})"
            ><i class="fa-solid fa-pencil"></i>
            </button>
 </div>
             <div class="col-6 action-div">
                <button
              class="trashbtn" 
              data-toggle="popover"  
              onclick="getColorId_delete(${value.Id})"
            ><i class="fa-solid fa-trash"></i>
            </button>

            </div>
        </div>
      
    </td>
  </tr>
   `
    }


  })



}

//-----------add color to table end---------------------//


//---------------color managment end----------//





//---------reseller management start----------//




let uid;
//   onAuthStateChanged(auth, (user) => {
//     if (user) {


//       const uid = user.uid;
//       console.log("usrsss",user)
//       //  db_username=user.providerData[0].email;
//       get(child(dbref, "UserAuthList/" + uid)).then((snapshot) => {
//         // console.log("snao",snapshot.val().Reseller_Name )
//         db_username = snapshot.val().Reseller_Name;
//         if (usernameLoggedIn) {
//           usernameLoggedIn.innerText += `Welcome ${db_username}`

//         }
//       });

//     } else {
//       //signout

//     }

//       // console.log("uiddd",uid)
//   });



// }

// authFunction();



function authFunction() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        console.log("Inside authFunction:", uid);
        resolve(uid); // Resolve the promise with uid
        get(child(dbref, "UserAuthList/" + uid)).then((snapshot) => {
          // console.log("snao",snapshot.val().Reseller_Name )
          db_username = snapshot.val().Reseller_Name;
          if (usernameLoggedIn) {
            usernameLoggedIn.innerText += `Welcome ${db_username}`

          }
        });
      } else {
        reject("User not authenticated"); // Reject the promise if no user is authenticated
      }
    });
  });


}



authFunction().then((uid) => {
console.log("outer uid" , uid)
let restockTable=document.getElementById("ResellerStocktable");

get(child(dbref, "ResellerManagement/"+`${uid}/`)).then((snapshot) => {


console.log("helooo", snapshot.val())
let UserHasStockArr;
if(snapshot.exists){
  UserHasStockArr=Object.values(snapshot.val());

  console.log("UserHasStockArr",UserHasStockArr)
//  UserHasStockArr.forEach((value,key)=>{
//     console.log("UserHasStockArr Valuesssss", value, "at", key)
//  })

}

UserHasStockArr.forEach((userStockValue, key)=>{
if (restockTable) {
      restockTable.innerHTML += `
   <tr class="${key % 2 == 0 ? "coloured-white" : "coloured-transparent"}">
   
    <td>${new Date(userStockValue.Datedb).toLocaleDateString('en-GB')}</td>
    <td>${userStockValue.ColourNameDist}</td>
    <td>${userStockValue.ProductTitle}</td>
    <td>${userStockValue.StockQtyDist}</td>
    <td>${userStockValue.remainingQty}</td>
      <td>
        <div class="row">
          <div class="col-6 action-div">
           <button
              class="pencilbtn" 
              data-toggle="popover"
              
              data-bs-toggle="modal"
              data-bs-target="#editModalCenter"
            
            ><i class="fa-solid fa-pencil"></i>
            </button>
 </div>
             <div class="col-6 action-div">
                <button
              class="trashbtn" 
              data-toggle="popover"  
             
            ><i class="fa-solid fa-trash"></i>
            </button>

            </div>
        </div>
      
    </td>
     <td>  
    
    <div class="row">
          <div class="col-3 action-div mx-4">
           <button
              class="btn btn-success mx-4"
              data-toggle="popover"
              title="Distribute"
              id="distribute-btn"
              data-bs-toggle="modal"
              data-bs-target="#distributionModal"
             
            >
              Distribute
            </button>
 </div>
             <div class="col-3 action-div mx-4">
                <button
              class="btn btn-success"
              data-toggle="popover"
              title="View"
              id="viewDistributed-btn"
              data-bs-toggle="modal"
              data-bs-target="#viewdistributionModal"
            
            >
              View
            </button>
            

            </div>
        </div>

        </td>
  </tr>
   `
    }

})

});


})
  .catch((error) => {
    console.error(error);
  });

//---------reseller management end----------//







//-----distribution Management Start-------//


//get color name from front end
window.get_distribution_selected_colourName_and_ProductTitle = (ProductTitle, colourname) => {
  selected_productTitle = ProductTitle;
  selected_colourName = colourname;
}

//get quantity from front end
window.getquantityId = (e) => {

  selected_stock_quantity = e;
  console.log("quantittytyyyyy", selected_stock_quantity);
}



//bring all users id

let globalresellername;
let globaluserId;
function addDistributionDataToDb() {

  let chosenResellerName = document.querySelector("#choosenResellerName");
  // console.log("chosenResellerName",chosenResellerName.value);

  if (chosenResellerName) {
    console.log("chosenResellerName", chosenResellerName.value);

globalresellername=chosenResellerName.value;
    get(child(dbref, "UserAuthList/")).then((snapshot) => {
      userArr = Object.values(snapshot.val()); // Ensure snapshot.val() is an object
      console.log("arr", userArr)
     
    }).then(()=>{
console.log("arr2", userArr)
     userArr.forEach((id) => {
        if (id.User_Type == "reseller") {
          // console.log("reselrs", id.Reseller_Name);


          if (id.Reseller_Name == globalresellername) {
           
            globaluserId=id.User_id;

          }

        }
      });

            console.log("userarr", globaluserId);
      

//for reseller management db
 const db = getDatabase();
  const ResellerRef = ref(db, "ResellerManagement/" +`${globaluserId}/`);
  const resellerPostRef = push(ResellerRef);

set(resellerPostRef, {

    ColourNameDist: selected_colourName,
    StockQtyDist: selected_stock_quantity,
    ResellerName: choosen_reseller_to_distribute.value,
    Datedb: date,
    ProductTitle:selected_productTitle,
    StockRemainingQty:selected_stock_quantity
  }).then(() => {

      // alert("Reseller item inserted Successfully!");
  }).catch((error)=>{
    // alert("Reseller item inserted Successfully!");
  });
  


      //for distribution

  const postListRef = ref(db, "AddDistribution/" + `${selected_productTitle}/` + `${globaluserId}/`);
  const newPostRef = push(postListRef);

set(newPostRef, {

    ColourNameDist: selected_colourName,
    StockQtyDist: selected_stock_quantity,
    ResellerName: choosen_reseller_to_distribute.value,
    Datedb: date
  }).then(() => {

    // sarr.push(selected_productTitle);

    get(child(dbref, "AddStock/")).then((snapshot) => {

      if (snapshot.exists()) {

        let getProductTitleFromDBArr = snapshot.val();
        console.log("product title from db arr", getProductTitleFromDBArr);
        getProductTitleFromDBArr.forEach((ele) => {

          if (ele.ProductTitle == selected_productTitle) {
            oldStockQty = ele.StockRemainingQty;
            stockId_Qty_to_update = ele.StockIdDB
            newStockQty = oldStockQty - selected_stock_quantity;

            update(ref(db, "AddStock/" + stockId_Qty_to_update), {
              StockRemainingQty: newStockQty

            }).then(() => {
              // DistributioninitApp();

            }).catch(() => {
              alert("updation unsuccessful of stock QTY")
            })


          }

        })

      }
      DistributioninitApp();
    })


    alert("Distributed item inserted Successfully!");

  })
    .catch((error) => {
      alert("Distributed item inserted Unsuccessfully!");
    });

  // stock_qty.value = "";
  choosen_reseller_to_distribute.value = "";
  // console.log("new array is ", new_arr);






    });




  }
 
 


  // set(newPostRef, {
  //     // ...
  // });
  //  set(ref(db, "AddDistribution/" + `${selected_productTitle}/`+ `${selected_colourName}/`+ sarr.length),

  

}


if (savechanges_Distributionbutton) {
  savechanges_Distributionbutton.addEventListener("click", addDistributionDataToDb)
}



//view product details/distribution assigned to the Resellers details



window.FilterButton=()=>{
console.log("filteredddd",newArrGlobal);
}
window.get_distribution_selected_colourName_and_ProductTitle_forView = (productTitle, colourName) => {


  //  get_Productview_DetailsfromDB(productTitle,colourName);
  get(child(dbref, "AddDistribution/"+`${productTitle}`)).then((snapshot) => {


    if (snapshot.val()) {

      WorkArr = Object.values(snapshot.val());
      // console.log("WorkArr", WorkArr)

    }

     stock_arr.forEach((stockValue) => {

      if (stockValue.ProductTitle == productTitle && stockValue.ColorName == colourName) {
        remainingQty = stockValue.StockRemainingQty;
        console.log("remainingQty", remainingQty)
      }

    });
WorkArr.forEach((value,key)=>{

  userarr=Object.values(value); 

  userarr.forEach((userValues)=>{
    if(userValues.ColourNameDist==colourName){
       newarr.push(userValues);
    }

  })
})
   

//for view header
      if (view_Distributed_Modal) {

        view_Distributed_Modal.innerHTML = `
   <!--modal header-->
  <div class="modal-body">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    ${productTitle} in Colour ${colourName}
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                
                <div class="row">
                 
                       <div class="d-flex justify-content-center flex-row">

                           <div class="row">
                           <div class="col-8 col-lg-8 col-xl-8">
                            <div class="ResellerTitle-Header">Reseller Names:</div>
                           </div>
                           </div>
                        
                         
                           <div class="QtyTitle-Header mx-4">Qty</div>
                      <div class="DateTitle-Header mx-5">At Date</div>
                       </div>   
                   
                </div>
              

<div class="model-middle-content"></div>


                    <div class="row my-5">
                        <div class="col-6 col-lg-6 col-xl-6">
                            <div class="remainingqty d-flex flex-row justify-content-center">
                                <label>Remaining QTY: </label>
                                <label>${remainingQty} </label>
                               
                            </div>

                        </div>

                        <div class="col-6 col-lg-6 col-xl-6">
                            <div class="Totalqty d-flex flex-row justify-content-center">
                                <label>Total Assigned QTY: </label>
                            
                            </div>

                        </div>

                    </div>

                    
  <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                   <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onclick="FilterButton()"
                  >
                    Filter
                  </button>
                  </div>  <!--modal body end-->
                      </div> 


                
  `
      }

//this is showing it in the view modal box
newarr.forEach((value)=>{
  //for view content
      let hi = document.querySelector(".model-middle-content");
      if (hi) {

        hi.innerHTML += `
          
                <!--modal body start-->
              
                  <!-- display for qty -->
                  <div class="container">

                    <div class="row">

                      <div class="col-4 col-lg-4 col-xl-4 my-2">
                       <div class="d-flex justify-content-center flex-column">

                         <div id="AssignedResellerNames">${value.ResellerName}</div>

                       </div>   
                      </div>

                      <div class="col-4 col-lg-4 col-xl-4 my-2">
                       <div class="d-flex justify-content-center flex-column">
                        
                       
                         <div id="AssignedQTY">${value.StockQtyDist}</div>

                       </div>
                      </div>

                        <div class="col-4 col-lg-4 col-xl-4 my-2">
                       <div class="d-flex justify-content-center flex-column">
                        
                       
                         <div class="distributed_at_date">${new Date(value.Datedb).toLocaleDateString('en-GB')}</div>

                       </div>
                      </div>


                    </div>
                  </div> <!--container end-->

              
`
      }

});
    





  })






}


//adding colors to the doropdown list from firebase
function bring_resellers_to_the_datalist() {



  get(child(dbref, "UserAuthList/")).then((snapshot) => {

    if (snapshot.val()) {

      let arr = Object.values(snapshot.val());
      // console.log("after convert to array ", arr)


      if (arr) {
        arr.forEach((value) => {
          // console.log("after array ", value)
          if (value.User_Type == "reseller") {
            reseller_Arr.push(value.Reseller_Name);
            // console.log("reseller array ", reseller_Arr)

          }

        })

      }
    }
    reseller_Arr.forEach((valuee) => {

      if (datalist_input_reseller) {

        datalist_input_reseller.innerHTML += `
  <option value="${valuee}">
  `
      }

    })

  });


}
bring_resellers_to_the_datalist();



// You can use savedUid wherever you need it in your code


function addDistributionToHTMLTable() {
  if (DistributionTable) {
    while (DistributionTable.hasChildNodes()) {
      DistributionTable.removeChild(DistributionTable.firstChild);
    }
  }

  //set qty max value from db
  let qtyofArticle = document.getElementById("qtyfromdb_attached_HTMl");
  stock_arr.forEach((value, key) => {

    if (qtyofArticle) {

      qtyofArticle.innerHTML = `
   <div class="col-3">
                      <label for="ColorNameLabel" class="form-label">Qty</label>
                    </div>

   <div class="col-3">
                      <div class="input-group quantity-selector">
                        <input
                          type="number"
                          id="inputQuantitySelector"
                          class="form-control"
                          aria-live="polite"
                          data-bs-step="counter"
                          name="quantity"
                          title="quantity"
                          value="0"
                          min="0"
                          max="${value.StockQty}"
                          step="1"
                          data-bs-round="0"
                          aria-label="Quantity selector"
                          onchange="getquantityId(this.value)"
                        />
                      </div>
                    </div> 
  `;

    }

    // console.log("stock arr valueee", value);
    // console.log("stock arr key", key);
    if (DistributionTable) {
      DistributionTable.innerHTML += `
   <tr class="${key % 2 == 0 ? "coloured-white" : "coloured-transparent"}">
   
    <td>${new Date(value.Datedb).toLocaleDateString('en-GB')}</td>
    <td>${value.StockQty}</td>
    <td>${value.StockRemainingQty}</td>
    <td>${value.ColorName}</td>
    <td>${value.ProductTitle}</td>
      <td>
        <div class="row">
          <div class="col-6 action-div">
           <button
              class="pencilbtn" 
              data-toggle="popover"
              
              data-bs-toggle="modal"
              data-bs-target="#editModalCenter"
              onclick="getStockId_edit(${value.StockIdDB})"
            ><i class="fa-solid fa-pencil"></i>
            </button>
 </div>
             <div class="col-6 action-div">
                <button
              class="trashbtn" 
              data-toggle="popover"  
              onclick="getStockId_delete(${value.StockIdDB})"
            ><i class="fa-solid fa-trash"></i>
            </button>

            </div>
        </div>
      
    </td>
     <td>  
    
    <div class="row">
          <div class="col-3 action-div mx-4">
           <button
              class="btn btn-success mx-4"
              data-toggle="popover"
              title="Distribute"
              id="distribute-btn"
              data-bs-toggle="modal"
              data-bs-target="#distributionModal"
              onclick="get_distribution_selected_colourName_and_ProductTitle('${value.ProductTitle}' ,'${value.ColorName}')"
            >
              Distribute
            </button>
 </div>
             <div class="col-3 action-div mx-4">
                <button
              class="btn btn-success"
              data-toggle="popover"
              title="View"
              id="viewDistributed-btn"
              data-bs-toggle="modal"
              data-bs-target="#viewdistributionModal"
             onclick="get_distribution_selected_colourName_and_ProductTitle_forView('${value.ProductTitle}' ,'${value.ColorName}')"
            >
              View
            </button>
            

            </div>
        </div>

        </td>
  </tr>
   `
    }


  })



}

const DistributioninitApp = () => {



  // console.log("runnnnnnnnnn",stock_arr);
  get(child(dbref, "AddStock/")).then((snapshot) => {

    if (snapshot.val()) {
      stock_arr = snapshot.val();

    }

    addDistributionToHTMLTable();

  })

  // s
  get(child(dbref, "AddDistribution/" + `${selected_productTitle}/` + `${selected_colourName}/`)).then((snapshot) => {


    if (snapshot.val()) {



      sarr = Object.values(snapshot.val());
      console.log("run childnodes saarr", sarr)
    }
    // console.log("sarrr",sarr )
    addDistributionToHTMLTable();

  })


}
DistributioninitApp();


//-----distribution Management End-------//




//bring stock database from firebase to the stock_arr



//---------------stock managment start----------//

//adding colors to the dropdown list from firebase
function bring_colors_to_the_datalist() {
  let datalist_input = document.getElementById("datalistOptions_color");


  get(child(dbref, "AddColor/")).then((snapshot) => {

    if (snapshot.val()) {
      color_arr = snapshot.val();

    }
    // console.log("color arrayyy stock", color_arr)
    color_arr.forEach((value) => {

      if (datalist_input) {
        datalist_input.innerHTML += `
  <option value="${value.ColorName}">
  `
      }

    })

  });


}
bring_colors_to_the_datalist();


//bring stock database from firebase to the stock_arr
const StockinitApp = () => {

  // console.log("sockkkkkkkkkkkk", stock_arr)

  // console.log("runnnnnnnnnn",stock_arr);
  get(child(dbref, "AddStock/")).then((snapshot) => {


    if (snapshot.val()) {
      stock_arr = snapshot.val();

    }
    addStockToHTMLTable();



    // console.log(" stock arrr from firebase", stock_arr);
  })

}


//-----------add stock to firebase start----------//
function add_stock_to_db() {



  console.log("stock add runn")

  set(ref(db, "AddStock/" + stock_arr.length), {

    StockIdDB: stock_arr.length,
    StockQty: Number(stock_qty.value),
    StockRemainingQty: Number(stock_qty.value),
    ColorName: choosen_colorName.value,
    ResellerPrice: Number(reseller_priceInp.value),
    WholeSalerPrice: Number(wholesaler_priceInp.value),
    ProductTitle: productTitle.value,
    ProductDescription: productDescription.value,
    Datedb: date
  })
    .then(() => {
      alert("Stock inserted Successfully!");
      StockinitApp();
    })
    .catch((error) => {
      alert("Color inserted Unsuccessfully!");
    });

  stock_qty.value = "";
  choosen_colorName.value = "";
  reseller_priceInp.value = "";
  wholesaler_priceInp.value = "";
  productDescription.value = "";
  productTitle.value = "";

  // console.log("new array is ", new_arr);

}
//-----------add stock to firebase end----------//


//-----------add stock to table start---------------------//



//-----------edit stock to table/firebase start---------------------//

window.getStockId_edit = (stockId) => {
  stockId_selected_to_edit = stockId;
}

function editstock() {

  let color_name_inp = document.getElementById("color-edit-input");
  console.log("name is ", color_name_inp.value);




  if (StockQty != "" || ColorName != "" || ResellerPrice != "" || WholeSalerPrice != "" || ProductTitle != "" || ProductDescription != "") {
    update(ref(db, "AddStock/" + stockId_selected_to_edit), {
      StockQty: Number(stock_qty.value),
      ColorName: choosen_colorName.value,
      ResellerPrice: Number(reseller_priceInp.value),
      WholeSalerPrice: Number(wholesaler_priceInp.value),
      ProductTitle: productTitle.value,
      ProductDescription: productDescription.value
    })
      .then(() => {
        alert("Stock Updated Successfully!");

        ColorinitApp();
      })
      .catch(() => {
        alert("Stock Updated Unsuccessfully!");
      });


    stock_qty.value = "";
    choosen_colorName.value = "";
    reseller_priceInp.value = "";
    wholesaler_priceInp.value = "";
    productDescription.value = "";
    productTitle.value = "";

  }
}

if (edit_Stockbutton) {

  edit_Stockbutton.addEventListener('click', editstock)
}
//-----------edit stock to table/firebase end---------------------//

//-----------delete color from the table/firebase start---------------------//

window.getStockId_delete = (stockId) => {
  stockId_selected_to_delete = stockId;
  console.log("stock idddd to delete", stockId_selected_to_delete)


  remove(ref(db, "AddStock/" + stockId_selected_to_delete), {

  })
    .then(() => {
      alert("Stock Deleted Successfully!");

      StockinitApp();
    })
    .catch(() => {
      alert("Stock Deleted Unsuccessfully!");
    });
}
//-----------delete color from the table/firebase end---------------------//

function addStockToHTMLTable() {


  if (StockTable) {
    while (StockTable.hasChildNodes()) {
      StockTable.removeChild(StockTable.firstChild);
    }
  }

  if (stock_arr) {
    stock_arr.forEach((value, key) => {
      // console.log("stock arr valueee", value);
      // console.log("stock arr key", key);
      if (StockTable) {
        StockTable.innerHTML += `
   <tr class="${key % 2 == 0 ? "coloured-white" : "coloured-transparent"}">
   
    <td>${new Date(value.Datedb).toLocaleDateString('en-GB')}</td>
    <td>${value.StockQty}</td>
    <td>${value.ColorName}</td>
    <td>${value.ResellerPrice}</td>
    <td>${value.WholeSalerPrice}</td>
    <td>${value.ProductTitle}</td>
    <td>${value.ProductDescription}</td>
      <td>
        <div class="row">
          <div class="col-6 action-div">
           <button
              class="pencilbtn" 
              data-toggle="popover"
              
              data-bs-toggle="modal"
              data-bs-target="#editModalCenter"
              onclick="getStockId_edit(${value.StockIdDB})"
            ><i class="fa-solid fa-pencil"></i>
            </button>
 </div>
             <div class="col-6 action-div">
                <button
              class="trashbtn" 
              data-toggle="popover"  
              onclick="getStockId_delete(${value.StockIdDB})"
            ><i class="fa-solid fa-trash"></i>
            </button>

            </div>
        </div>
      
    </td>
  </tr>
   `
      }


    })

  }



}
StockinitApp();
//-----------add stock to table end---------------------//

if (savechanges_Stockbutton) {
  savechanges_Stockbutton.addEventListener('click', add_stock_to_db);
}
//---------------stock managment end----------//