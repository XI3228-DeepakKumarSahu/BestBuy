define({ 


  idArrayStore : [],
  globalname   : [],
  flag         : 0,
  
  dataint : function(id,name)
  {


    // code for breadcrumbs
    kony.print("the ame array->"+name );
    if(name===undefined||name===null)
    {
      this.globalname.pop();
    }
    if(this.globalname.length>0)
    {
      this.view.lblPath.text="Home";
      for(var i=0;i<this.globalname.length;i++)
      {
        this.view.lblPath.text=this.view.lblPath.text+"->"+this.globalname[i]; 
      }
    }
    //yaha tak


    kony.model.ApplicationContext.showLoadingScreen("Loading data!!!");
    var serviceName = "Products";

    var client = kony.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService(serviceName);

    var params;
    if(id === null || id === undefined){
      this.view.lblPath.text="Home";
      params = {
        "key"        : "w7bh9czfxvv8sd7a8qqysnbj",
        "categoryID" : "cat00000"
      };

      this.view.imgBackCatagories.isVisible=false;
    }
    else{
      params = {

        "key"        : "w7bh9czfxvv8sd7a8qqysnbj",
        "categoryID" : id
      };
      this.view.imgBackCatagories.isVisible=true;
    }

    var headers = {

    };


    var options = {
      "httpRequestOptions" : {
        "timeoutIntervalForRequest"  : 60,
        "timeoutIntervalForResource" : 600
      }
    };

    integrationSvc.invokeOperation("getCategories", headers, params,
                                   this.success,this.failure,options);

  },

  success : function(response){

    var responseLength = response.subCategories;
  
    if(responseLength === undefined){
     // alert("No Products found");
      //this.view.flxEmptyData.isVisible=true;
      kony.model.ApplicationContext.dismissLoadingScreen();
    }




    if(response.subCategories.length === 0){


      kony.print(response.subCategories.length);
      var rowSelected= this.view.segCatagories.selectedRowItems;
      kony.print(rowSelected[0].id+"this is of home");
      
      var passRowSelected= rowSelected[0].id;

 
      this.idArrayStore.pop();
      this.globalname.pop();

      
      //var passTheId=[
        //{
        //"idKey" : passRowSelected        
        //}
      //];
      
      
      var navigateToNextForm= new kony.mvc.Navigation("frmProductList");
      navigateToNextForm.navigate(passRowSelected);
    }


    else{
      kony.model.ApplicationContext.dismissLoadingScreen();
      kony.print("Entering SuccessCallBack");
      kony.print("Response recieved "+ JSON.stringify(response));

      this.view.segCatagories.widgetDataMap =
        {lblCAT: "name"};






      this.view.segCatagories.setData(response.subCategories);
      this.segRowClick();
    }



    this.productAnim();
    // kony.model.ApplicationContext.dismissLoadingScreen();
  },


  failure : function (response)
  {
    alert("Fetch Data Failiur\n" + JSON.stringify(response));
    kony.model.ApplicationContext.dismissLoadingScreen();
  },




  segRowClick : function(){
    this.view.segCatagories.onRowClick=this.onClick;
  },


  onClick : function ()
  {

    var selectedRow= this.view.segCatagories.selectedRowItems;
    var b= this.view.segCatagories.selectedRowIndex;

    kony.print(selectedRow[0].id+"this is of home");
    var c= selectedRow[0].id;
    var d= selectedRow[0].name;


    this.globalname.push(d);
    //if(c!== this.idArrayStore[this.idArrayStore.length-1])
    this.idArrayStore.push(c);
    this.dataint(c,d);

    kony.print(d);



  },

  goback : function()
  {

    var id,name;
    id= this.idArrayStore[this.idArrayStore.length-2];

    name=this.globalname[this.globalname.length-2];
    this.idArrayStore.pop();
    this.globalname.pop();
    this.flag=1;
    kony.print(id+"ZZZZZZZZZ"+this.globalname);
    this.dataint(id,this.globalname);

  },



  productAnim : function(){
    var animConfig = { "duration"       : 0.3, "iterationCount" : 1,
                      "delay"          : 0, "fillMode"       : kony.anim.FORWARDS };
    var transformProp1 = kony.ui.makeAffineTransform();
    transformProp1.scale(0.0, 0.0);
    var transformProp2 = kony.ui.makeAffineTransform();
    transformProp2.scale(0.5, 0.5);
    var transformProp3 = kony.ui.makeAffineTransform();
    transformProp3.scale(1, 1);
    var animDefinitionOne = {
      0   : { "anchorPoint": { "x": 0.5, "y": 0.5 }, "transform": transformProp1 },
      50  : { "anchorPoint": { "x": 0.5, "y": 0.5 }, "transform": transformProp2 },
      100 : { "anchorPoint": { "x": 0.5, "y": 0.5 }, "transform": transformProp3 }
    };
    var animDefinition = kony.ui.createAnimation(animDefinitionOne);
    var finalAnimation = { definition: animDefinition, config: animConfig };
    this.view.segCatagories.setAnimations({ visible: finalAnimation }) ;
  },



  
  
  
 onQuerySubmitted : function(){
if(this.view.tbSearchCat.text.length !== 0){


var queryData="\""+this.view.tbSearchCat.text+"\"";
kony.print(queryData);
/* 
"query" : "\""+this.view.tbSearchCat.text+"\""

Macbook => "Macbook"

*/

var navigateToNextForm= new kony.mvc.Navigation("frmProductList");
navigateToNextForm.navigate(queryData);
}
else{
alert("Please enter product name");
}
},

  
  
  
  





});