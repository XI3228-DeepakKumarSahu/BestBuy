define({ 
  
  preID : "id",
  
  
   onNavigate : function(ab){
  var sku=ab[0].sku;
     var upc =ab[0].upc;
   this.dataint(upc);
     this.review(sku);
    //return abd;

  },
  
  
   dataint : function(upc)
  {
    
 this.view.flxReadMore.isVisible=false;
    
    kony.model.ApplicationContext.showLoadingScreen("Loading data!!!");
    
    
    var serviceName = "Products";

    var client = kony.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService(serviceName);
    var operationName = "getProductDetails";
    var params = {
      "api"   : "w7bh9czfxvv8sd7a8qqysnbj",
      "upcID" : upc


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
    
    kony.print("Entering SuccessCallBack");
    kony.print("Response recieved "+ JSON.stringify(response));
    
    
     kony.print("this is " +response.product.name);

    this.view.lblDetails.text=response.product.name;
    
    
    
    this.view.lblFullDesc.text=response.product.longDescription;
    
    this.view.lblReview.text=this.view.lblReview.text+response.product.customerReviewAverage;
    
    
    
    
    /*if(response.product.longDescription.length>150)
      {
        var des=response.product.longDescription[1,100];
        this.view.lblDescription.text=des;
      }
   else*/
    kony.print(response.product.longDescription.length);
    if(response.product.longDescription.length>160)
      {
     this.view.lblDescription.text=response.product.longDescription.slice(0,160)+"..."; 
      this.view.lblMore.isVisible=true;
      }
        else
          {
     this.view.lblDescription.text=response.product.longDescription+"...";
          this.view.lblMore.isVisible=false;
          }
    
    this.view.lblPrice.text=this.view.lblPrice.text+response.product.salePrice;
    
   this.view.lblReviewNumber.text=this.view.lblReviewNumber.text+response.product.customerReviewCount;
 
    this.view.imgProductDescription.src=response.product.largeImage;
    
    
    
    
    if(response.product.customerReviewAverage >= 1 && 
       response.product.customerReviewAverage < 2){
this.view.imgReview.src = "r1.png";
} else if(response.product.customerReviewAverage >= 2 && 
          response.product.customerReviewAverage < 3){
this.view.imgReview.src = "r2.png";
} else if(response.product.customerReviewAverage >= 3 && 
          response.product.customerReviewAverage < 4){
this.view.imgReview.src = "r3.png";
} else if(response.product.customerReviewAverage >= 4 && 
          response.product.customerReviewAverage < 5){
this.view.imgReview.src = "r4.png";
} else if(response.product.customerReviewAverage === 5){
this.view.imgReview.src = "r5.png";
}
else{
this.view.imgReview.isVisible = false;
}
    
    
    
    
    
    
    
    var categoryLength=response.categoryPath.length;
   
   this.preID=response.categoryPath[categoryLength-1].id;
    kony.model.ApplicationContext.dismissLoadingScreen();
  },


  failure : function (response)
  {
    alert("Fetch Data Failiur\n" + JSON.stringify(response));
  },
//-------------------------------------------------

  
   review : function(sku)
  {
    
    
    kony.model.ApplicationContext.showLoadingScreen("Loading data!!!");
    
    
    var serviceName = "Products";

    var client = kony.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService(serviceName);
    var operationName = "getUserReviews";
    var params = {
      "api" : "w7bh9czfxvv8sd7a8qqysnbj",
      "sku" : sku


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
                                   this.successReview,
                                   this.failureReview,options);

  },

  successReview : function(response){
    
     kony.model.ApplicationContext.dismissLoadingScreen();
    
    kony.print("Entering SuccessCallBack");
    kony.print("Response recieved "+ JSON.stringify(response));
    
  
    
   
    var revLength = response.reviews.length;



var temReviewList=[];
var reviewList=[];
var reviewCollection=[];
reviewCollection=response.reviews;
  var temcomment, dot=0;  
for(var i=0; i<revLength; i++){
 
  temcomment=reviewCollection[i].comment;
  for(var j=0;j<300;j++)
    {
      
    if(reviewCollection[i].comment[j]=="."||reviewCollection[i].comment[j]==",")
         dot=j;
      
    }
  if( reviewCollection[i].comment.length>300)
    temcomment=reviewCollection[i].comment.slice(0,dot+1);
  
  
temReviewList={
lblTitle : reviewCollection[i].title,
lblDes   : temcomment

};
reviewList.push(temReviewList);
}



this.view.segProductReview.setData(reviewList);
    
    
    
    
    
    
    
    
    
    
    
    
    /* this.view.segProductReview.widgetDataMap =
{lblTitle : "title",
lblDes   : "comment"
};*/

    
    
    
   //this.view.segProductReview.setData(response.reviews);
       
    
    
    
    
   
    kony.model.ApplicationContext.dismissLoadingScreen();
  },


  failureReview : function (response)
  {
    alert("Fetch Data Failiur\n" + JSON.stringify(response));
  },

  
  
  backclick : function()
  {
  
    
    kony.print(this.preID);
    
     this.view.lblReview.text="Average review ";
    this.view.lblPrice.text="On Sale! $";
    this.view.lblReviewNumber.text="Number of Review :";
    
    
    var navigateToNextForm= new kony.mvc.Navigation("frmProductList");
      navigateToNextForm.navigate(this.preID);

    
  },
  
  
  
  readMore : function()
  {
    this.view.flxReadMore.isVisible=true;
    
  },
  
  
  
  
  
 });