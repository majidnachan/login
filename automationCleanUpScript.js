

<script runat=server>
  Platform.Load("Core","1");

  var api = new Script.Util.WSProxy();
  var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var automationListObject = [];

  // var res = api.describe("DataFolder");
  // var res = api.describe("Automation");
  // Write(Stringify(res));
  // return false;

  var foldersData = getSubFoldersAutomations("DDM", "");
  // Write(Stringify(foldersData.Results));
  
  if (foldersData.Results != undefined && (foldersData.Results).length > 0){
    for (var i = 0; i < (foldersData.Results).length; i++) {
      
      // Write(Stringify(foldersData.Results[i].Name));
      if (foldersData.Results[i].Name == 'Channels') {
        var foldersData1 = getSubFoldersAutomations(foldersData.Results[i].Name, foldersData.Results[i].ObjectID);
        // Write(Stringify(foldersData1.Results));
        
        if (foldersData1.Results != undefined && (foldersData1.Results).length > 0){
          for (var j = 0; j < (foldersData1.Results).length; j++) {
            
            // Write(Stringify(foldersData1.Results[j].Name));
            if (foldersData1.Results[j].Name == 'Email Broadcast') {
              var currentYear = new Date().getFullYear();
              var foldersData2 = getSubFoldersAutomations(foldersData1.Results[j].Name, foldersData1.Results[j].ObjectID);
              // Write(Stringify(foldersData2.Results));
              
              if (foldersData2.Results != undefined && (foldersData2.Results).length > 0){
                for (var k = 0; k < (foldersData2.Results).length; k++) {
                  
                  if (foldersData2.Results[k].Name == currentYear) {
                    var foldersData3 = getSubFoldersAutomations(foldersData2.Results[k].Name, foldersData2.Results[k].ObjectID);
                    // Write(Stringify(foldersData3.Results));
                    
                    if (foldersData3.Results != undefined && (foldersData3.Results).length > 0){
                    
                      var currentMonthNumber = new Date().getMonth();
                      var currentMonthName = month[currentMonthNumber - 1];
                      currentMonthNumber = String(currentMonthNumber);
                      if (currentMonthNumber.length == 1) {
                        currentMonthNumber = '0' + currentMonthNumber;
                      }
                      var targetFolderName = currentMonthNumber + '-' + currentMonthName;
                      //Write(Stringify(targetFolderName));
                      
                      for (var l = 0; l < (foldersData3.Results).length; l++) {
                        if (foldersData3.Results[l].Name == targetFolderName) {
                          
                          // var foldersData4 = getSubFoldersAutomations(foldersData3.Results[l].Name, foldersData3.Results[l].ObjectID);
                          // Write(Stringify(foldersData4.Results));
                          
                          var automationList = getAutomationList(foldersData3.Results[l].ID);
                          if (automationList.Results != undefined && (automationList.Results).length > 0){
                            for (var x = 0; x < (automationList.Results).length; x++) {
                              var automationDetails = {
                                "Name" : automationList.Results[x].Name,
                                "Description" : automationList.Results[x].Description,
                                "CreatedDate" : automationList.Results[x].CreatedDate,
                                "ModifiedDate" : automationList.Results[x].ModifiedDate,
                                "Status" : automationList.Results[x].Status,
                                "LastRunTime" : automationList.Results[x].LastRunTime,
                              };
                              automationListObject.push(automationDetails);
                            }
                            Write(Stringify(automationListObject));
                            Write('<br/>');
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }


  function getAutomationList(CategoryID){
    var cols = ["Name",
                "CustomerKey",
                "Description",
                "CreatedDate",
                "CreatedBy",
                "ModifiedDate",
                "ModifiedBy",
                "Status",
                "AutomationType",
                "LastRunTime",
                "LastSavedBy"
               ];
    var filter = {
      Property: "CategoryID",
      SimpleOperator: "equals",
      Value: CategoryID
    };
    var opts = {
      BatchSize: 25
    };
    return api.retrieve("Automation", cols, filter);
  }


  function getSubFoldersAutomations (folderName,objectId) {
    var cols = [ "Name",
                "ContentType",
                "ID", 
                "ObjectID", 
                "CustomerKey", 
                "ParentFolder.Name", 
                "ParentFolder.ObjectID", 
                "ParentFolder.ID",
                "Client.CreatedBy",
                "Client.ModifiedBy",
                "ModifiedDate",
                "CreatedDate",
                "Description"
               ];
    
    if(objectId.length > 0) {
      var subFilter =  {
    LeftOperand : {
    Property : "ContentType",
  SimpleOperator : "equals",
  Value : "automations"
        },
  LogicalOperator: "AND",
  RightOperand : {
    Property : "ParentFolder.ObjectID",
  SimpleOperator : "equals",
  Value : objectId
        }
      };
    } else {
      var subFilter = {
    Property : "ContentType",
  SimpleOperator : "equals",
  Value : "automations"
      }
    }

  var filter = {
    LeftOperand : {
    Property : "ParentFolder.Name",
  SimpleOperator : "equals",
  Value: folderName
      },
  LogicalOperator: "AND",
  RightOperand : subFilter
    };
  return api.retrieve("DataFolder", cols, filter);
  }



    /*
    try {

        var del = deleteAutomation("GIO_USA_Data_Conversion_Test");

  Write(Stringify(del));

    } catch(err) {
    Write(Stringify(err));
    }

  function deleteAutomation(name) {

    api.setClientId({
      "ID": Platform.Function.AuthenticatedMemberID(),
      "UserID": Platform.Function.AuthenticatedEmployeeID()
    });

  var request = api.retrieve("Automation", ["CustomerKey"], {
    Property: "Name",
  SimpleOperator: "equals",
  Value: name
        });

  var key = request.Results[0].CustomerKey;

  var result = api.deleteItem("Automation", {
    CustomerKey: key
        });

  return result;

    }
  */
</script>

