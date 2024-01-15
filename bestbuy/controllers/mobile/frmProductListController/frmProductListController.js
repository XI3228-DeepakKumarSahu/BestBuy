define({ 




  onNavigate : function(key){

    // var name =key.slice(1,-1);
    // kony.print(name);
    var name;
    if(key[0]== "\"")
    {
      name =key.slice(1,-1);
      kony.print("this is my->"+name);

      this.searchInit(name);
    }
    else
      this.dataint(key);


  },

  //Type your controller code here 
  dataint : function(key)
  {


    kony.model.ApplicationContext.showLoadingScreen("Loading data!!!");


    var serviceName = "Products";

    var client = kony.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService(serviceName);
    var operationName = "getProductsByCategory";
    var params = {
      "api"            : "w7bh9czfxvv8sd7a8qqysnbj",
      "categorypathID" : key


    };
    var headers = {

    };


    var options = {
      "httpRequestOptions" : {
        "timeoutIntervalForRequest"  : 60,
        "timeoutIntervalForResource" : 600
      }
    };

    integrationSvc.invokeOperation(operationName, headers, params,this.success,
                                   this.failure,options);

  },

  success : function(response){

    kony.model.ApplicationContext.dismissLoadingScreen();


    var categoryLength=response.products[0].categoryPath.length;

    if(this.view.lblHomeProductList.text.length<=9)
      this.view.lblHomeProductList.text =this.view.lblHomeProductList.text+" "
        +response.products[0].categoryPath[categoryLength-1].name;


    kony.print("Entering SuccessCallBack");
    kony.print("Response recieved "+ JSON.stringify(response));




    var listLength = response.products.length;
    var prodList=[];
    var temProdList=[];
    var prodCollection=[];
//prodCollection[i]["onSale"]==true ? "!!! ON SALE !!!!":"",

    for(var i=0;i<listLength;i++){
      prodCollection=response.products;
      temProdList={
         lblOnSale : (prodCollection[i]["onSale"]=="true") ? "!!! ON SALE !!!!" : "",
        
        lblOnSalePrice : (prodCollection[i]["onSale"]=="true") ? "$ "+prodCollection[i]["salePrice"]:"",
       
        lblPrice      : "$ "+prodCollection[i]["regularPrice"],
        lblTitle      : prodCollection[i]["name"],
        lblListRating : prodCollection[i]["customerReviewAverage"],
        imgSeg        : prodCollection[i]["image"],
        upc           : prodCollection[i]["upc"],
        sku           : prodCollection[i]["sku"]
      };
      prodList.push(temProdList);
      kony.print("This is temp "+prodList[0].lblOnSale);
    }
this.view.segProductList.setData(prodList);











      /* this.view.segProductList.widgetDataMap =
      {lblTitle      : "name",
      lblPrice      : "regularPrice",
       imgSeg        : "image",
       lblListRating : "customerReviewAverage"
      };



   this.view.segProductList.setData(response.products);
   */



      kony.model.ApplicationContext.dismissLoadingScreen();
      this.onRowClicked();


      this.productAnim();


    },


      failure : function (response)
    {
      alert("Fetch Data Failiur\n" + JSON.stringify(response));
    },



      onRowClicked : function ()
    {

      this.view.segProductList.onRowClick=this.onClick;
    },


      onClick : function ()
    {

      var selectedRow= this.view.segProductList.selectedRowItems;

      //kony.print(c);
      //var d=c;
      kony.print(selectedRow[0].sku+" "+ selectedRow[0].upc);
      var navigateToNextForm= new kony.mvc.Navigation("frmProduct");
      navigateToNextForm.navigate(selectedRow);



    },


      // backButton: function()
      //{



      //};


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
        this.view.segProductList.setAnimations({ visible: finalAnimation }) ;
      },



        // ----------- for search-------- // 


        searchInit : function (query)
    {

      kony.model.ApplicationContext.showLoadingScreen("Loading data!!!");
      this.view.lblHomeProductList.text ="Results for: "+" "
        +query;

      var serviceName = "Products";

      var client = kony.sdk.getCurrentInstance();
      var integrationSvc = client.getIntegrationService(serviceName);
      var operationName = "getProductsBySearch";
      var params = {
        "api"   : "w7bh9czfxvv8sd7a8qqysnbj",
        "query" : query


      };
      var headers = {

      };


      var options = {
        "httpRequestOptions" : {
          "timeoutIntervalForRequest"  : 60,
          "timeoutIntervalForResource" : 600
        }
      };

      integrationSvc.invokeOperation(operationName, headers, params,
                                     this.successSearch,
                                     this.failureSearch,options);

    },



      successSearch : function(response){

        kony.model.ApplicationContext.dismissLoadingScreen();



        //if(this.view.lblHomeProductList.text.length<=9)
        // this.view.lblHomeProductList.text =this.view.lblHomeProductList.text+" "
        //+response;


        kony.print("Entering SuccessCallBack");
        kony.print("Response recieved "+ JSON.stringify(response));


 var listLength = response.products.length;
    var prodList=[];
    var temProdList=[];
    var prodCollection=[];
//prodCollection[i]["onSale"]==true ? "!!! ON SALE !!!!":"",

    for(var i=0;i<listLength;i++){
      prodCollection=response.products;
      temProdList={
         lblOnSale : (prodCollection[i]["onSale"]=="true") ? "!!! ON SALE !!!!" : "",
        
        lblOnSalePrice : (prodCollection[i]["onSale"]=="true") ? "$ "+prodCollection[i]["salePrice"]:"",
       
        lblPrice      : "$ "+prodCollection[i]["regularPrice"],
        lblTitle      : prodCollection[i]["name"],
        lblListRating : prodCollection[i]["customerReviewAverage"],
        imgSeg        : prodCollection[i]["image"],
        upc           : prodCollection[i]["upc"],
        sku           : prodCollection[i]["sku"]
      };
      prodList.push(temProdList);
      kony.print("This is temp "+prodList[0].lblOnSale);
    }
this.view.segProductList.setData(prodList);
        
        
        
        
        
        
       /* this.view.segProductList.widgetDataMap =
          {lblTitle : "name",
           lblPrice : "regularPrice",
           imgSeg   : "image"

          };



        this.view.segProductList.setData(response.products);
*/

        this.onRowClickedSearch();


        this.productAnim();


      },


        failureSearch : function (response)
    {
      alert("Fetch Data Failiur\n" + JSON.stringify(response));
    },






      onRowClickedSearch : function ()
    {

      this.view.segProductList.onRowClick=this.onClicksearch;
    },


      onClicksearch : function ()
    {



      var selectedRow= this.view.segProductList.selectedRowItems;

      //kony.print(c);
      //var d=c;
      // kony.print(selectedRow[0].sku+" "+ selectedRow[0].upc);
      var navigateToNextForm= new kony.mvc.Navigation("frmProduct");
      navigateToNextForm.navigate(selectedRow);



    },














  });