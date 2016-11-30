/**
 * Created by Alex on 21.11.2016.
 */
$(function(){
//------------------------------------------------------Model----------------------------------------------------------

    var appConfig={
        currentTaskChosen:null,
        pointsNeededToIncreaseLevel:[
           0,5,10,20,40,80,160,320,640
        ],
        motivationMessages:[
            "Oy eeeeee.Your first level.As Long As You Are Alive Anything Is Possible...Even to reach level ten in this game!",
            "Never forget, no matter how hard life seems, no matter how bad you are treated, you WILL change the " +
            "world. If you don't think so, you are wrong because everyone is special in their own ways.",
            "Your presence in this present moment is the most precious present you will ever receive.",
            "There is no such thing as a failed experiment, only experiments with unexpected outcomes.",
            "Success is perceptible ... We can touch it, smell it and taste it.",
            "Don't let the choice that you didn't make weigh you down.",
            "It is not the time which needs to be managed; it is ourselves.",
            "If life becomes hard, soften it with random acts of kindness."
        ],
        motivationMessagesWhenNewLevelAchievd:[
            "Oy eeeeee.Your first level.As Long As You Are Alive Anything Is Possible...Even to reach level ten in this game!",
            "Not bad.Stay cool and continue to work."

        ]
    };

    var dataBase={
        init: function() {
            var currentTaskChosen=0;
            if (!localStorage.user==' ') {
                //console.log("Reaady"+JSON.parse(localStorage.user));
                //localStorage.user = JSON.stringify([]);
            }else{
                var userInfo= {
                        userName: 'USER',
                        userGender:"male",
                        userLevel: 0,
                        userExperience: 0
                }
                var tasksArray=[
                    {
                        description:'Your first task is to add some more tasks',
                        levelOfImportance:1,
                        points:0,
                        timeCreated:0,
                        timeDeadline:0,
                        timeFinished:0
                    },
                    {
                        description:'Your second task is to delete both this tasks',
                        levelOfImportance:1,
                        points:0,
                        timeCreated:0,
                        timeDeadline:0,
                        timeFinished:0
                    }
                ]
                var tasksCompletedArray=[
                    {
                        description:'competedtask1',
                        levelOfImportance:1,
                        points:1,
                        timeCreated:0,
                        timeDeadline:0,
                        timeFinished:0
                    }
                ]

                localStorage.user=JSON.stringify(userInfo);
                localStorage.tasks=JSON.stringify(tasksArray);
                localStorage.tasksCompleted=JSON.stringify(tasksCompletedArray);
            }
        },
        getUserData:function () {
            return JSON.parse(localStorage.user);
        },
        setUserSettings:function (newSettings) {
            var newUserInfo= {
                userName: newSettings.name,
                userGender:newSettings.gender,
                userLevel: JSON.parse(localStorage.user).userLevel,
                userExperience: JSON.parse(localStorage.user).userExperience
            };
            localStorage.user=JSON.stringify(newUserInfo);
        },
        getTasksData:function () {
            return JSON.parse(localStorage.tasks);
        },
        addNewTaskToDataBase:function (newItem) {
            var temp=JSON.parse(localStorage.tasks);
            temp.push(newItem);
            localStorage.tasks=JSON.stringify(temp);

        },
        deleteTaskFromDataBase:function (newArray) {
            localStorage.tasks=JSON.stringify(newArray);
        },
        addPointsToUser:function (newPoints) {
            var newUserInfo=JSON.parse(localStorage.user);
            newUserInfo.userExperience+=parseInt(newPoints);
            localStorage.user=JSON.stringify(newUserInfo);
        },
        levelUp:function () {
            var newUserLevel=JSON.parse(localStorage.user);
            newUserLevel.userLevel+=1;
            localStorage.user=JSON.stringify(newUserLevel);
        }
    }

//------------------------------------------------------View------------------------------------------------------------
    var header={
        init: function() {
            // store pointers to DOM elements for easy access later
            this.$name=$('#paragraphUserName');
            this.$level=$('#iconUserLevel');
            this.$comment=$('#comment');
            this.$userIcon=$('#iconUser');
            this.$inputUserForm=$('#inputSettingsForm');
            this.$inputUserName=$('#inputUserName');
            this.$inputGender=$('#selectGender');
            this.$progressBar=$('#myBar');


            this.$settingBtn=$('#settingsEdit').click(function () {
                controller.toggleCommentSection("none","block");
            });
            this.$settingDescriptionBtn=$('#settingsDescription').click(function () {
                controller.toggleCommentSection("block","none");
            });
            this.$changeSettingsBtn=$('#changeSettingsBtn').click(function () {
                controller.changeUserSettings();
            });
            this.$cancelBtnHeader=$('#closeSettingsForm').click(function () {
                controller.toggleCommentSection("block","none");
            });
            this.render();
        },
        toggleMessage:function(val){
            this.$comment.css("display",val);
        },
        toggleSettingsForm:function (val) {
           this.$inputUserForm.css("display",val);
       },
        checkInputFields:function () {

            if(this.$inputUserName.val()=="" ||
                this.$inputUserName.val()==" " ||
                this.$inputGender.val()=='0'){
                return false;
            }else {
                return true;
            }

        },
        getUserInput:function () {
           var input={
               name:this.$inputUserName.val(),
               gender:this.$inputGender.val()
           };
            return input;
        },

        render:function () {
            var user=controller.getUserInfo();

            this.$name.text(user.userName);
            this.$level.attr("src","img/num"+user.userLevel+".jpg");
            this.$userIcon.attr("src","img/"+user.userGender+".svg");
            this.$progressBar.css("width",""+controller.calculatePersents()+"%");
        }
    };

    var addTask={
        init: function() {
            // store pointers to DOM elements for easy access later
            this.$inputDescription=$('#inputDescr');
            this.$levelOfImportance=$('#selectLevel');
            this.$form=$('#inputForm');

            this.$addBtn=$('#addTaskBtn').click(function () {

                controller.addNewTask();

            });
            this.$cancelBtn=$('#closeForm').click(function () {
                controller.closeTaskForm();
            });

            this.$openForm=$('#openFormButton').click(function () {
                controller.closeButtonsForTaskElement();
                controller.openTaskForm();
            });

            this.render();
        },
        getNewTask:function () {
            var task={
                description: this.$inputDescription.val(),
                levelOfImportance:this.$levelOfImportance.val(),
                points:0,
                timeCreated: 0,
                timeDeadline:0,
                timeFinished:0
            }
            return task;

        },
        clearInputFields:function () {
            this.$inputDescription.val(" ");
            this.$levelOfImportance.val('...');
        },
        checkInputFields:function () {

            if(this.$inputDescription.val()==" " ||
                                        this.$levelOfImportance.val()=='...'){

                return false;
            }else {
                return true;
            }

        },
        openInputForm:function () {
            //this.$openForm.css("display",'none');
            this.$form.css("display",'block');

        },
        closeInputForm:function () {
            this.$openForm.css("display",'block');
            this.$form.css("display",'none');

        },
        render:function () {
            var user=controller.getUserInfo();

        }
    };

    var taskList={
        init: function() {

            this.render();
        },
        //when user clicks task from the list this function is invoked, and area with 2 buttons is added after this task
        addButtonsArea:function (id) {
            $('#openedTask').remove();

            $("#"+id+"").after("<div id='openedTask' class='taskElementDropDown'>"
                                +"<button id='btnComplete' class='buttonTaskElement'>Complete</button>" +
                                 " <button id='btnDelete' class='buttonTaskElement'>Delete</button>"+
                                "</div>");
            $("#btnComplete").click(function () {

                controller.completeTask();
            });
            $("#btnDelete").click(function () {

                controller.deleteTask();
            });
        },
        closeButtonsArea:function () {
            $('#openedTask').remove();
        },
        render:function () {
            //Remove previous div task  elements
            $('.taskElement').remove();
            $('#openedTask').remove();
            var allTasks=controller.getTasks();

            //Create div elements for all tasks
           for (var i=0;i<allTasks.length;i++){
               var srcStarsImg="img/stars"+allTasks[i].levelOfImportance+".svg"
               $('#tasks').append("<div id='task"+(i)+"' class='taskElement'>"
                                        +"<img class='starsImage' src='"+srcStarsImg+"'>"
                                        +allTasks[i].description+
                                   "</div>");
           };
            $('.taskElement').on('click',function (event) {
                var chosenTaskElement=event.target.attributes.getNamedItem("id").textContent;
               controller.openButtonsForTaskElement(chosenTaskElement);


            });

        }

    };

//------------------------------------------------------Controller----------------------------------------------------------
    var controller = {

        init: function() {
            //model.currentCat=data.cats[0];
            dataBase.init();
            header.init();
            addTask.init();
            taskList.init();


        },
        //-------Header functions-----
        toggleCommentSection:function (val1,val2) {
          header.toggleMessage(val1);
          header.toggleSettingsForm(val2);
        },
        changeUserSettings:function () {

            if(header.checkInputFields()){
                dataBase.setUserSettings(header.getUserInput());
                this.toggleCommentSection("block","none");
                header.render();
            }

        },
        getUserInfo:function () {
            return dataBase.getUserData();
        },
        getTasks:function () {
            return dataBase.getTasksData();
        },
        openTaskForm:function () {
            addTask.openInputForm();
        },
        closeTaskForm:function () {
            addTask.closeInputForm();
        },
        addNewTask:function () {
            if(addTask.checkInputFields()){

                dataBase.addNewTaskToDataBase({
                    description:addTask.getNewTask().description,
                    levelOfImportance:addTask.getNewTask().levelOfImportance,
                    points:0,
                    timeCreated:0,
                    timeDeadline:0,
                    timeFinished:0
                });

                addTask.clearInputFields();
                addTask.closeInputForm();
                taskList.render();
            }else{
                //TODO add message that shows that not all fields are entered
            }


        },
        openButtonsForTaskElement:function (id) {

            appConfig.currentTaskChosen=id.charAt(4);
            taskList.addButtonsArea(id);
        },
        closeButtonsForTaskElement:function () {
            taskList.closeButtonsArea();
        },
        deleteTask:function () {
            deleteItemNum=appConfig.currentTaskChosen;
            var temp=dataBase.getTasksData();
            temp.splice(deleteItemNum,1);

            dataBase.deleteTaskFromDataBase(temp);
            taskList.render();


        },
        calculatePersents:function () {
            var levelPoints=appConfig.pointsNeededToIncreaseLevel[parseInt(dataBase.getUserData().userLevel)-1];
            var numerator=parseInt(dataBase.getUserData().userExperience)-levelPoints;
            var denominator=appConfig.pointsNeededToIncreaseLevel[parseInt(dataBase.getUserData().userLevel)]-levelPoints;
            var result=(numerator/denominator)*100;
            return result;
        },
        completeTask:function (id) {
            deleteItemNum=appConfig.currentTaskChosen;
            var tempArray=dataBase.getTasksData();
            var deletedItem=tempArray.splice(deleteItemNum,1);
            var newPoints=parseInt(dataBase.getUserData().userExperience)+parseInt(deletedItem[0].levelOfImportance);
            var nextLevel=parseInt(dataBase.getUserData().userLevel);
            if(newPoints>=appConfig.pointsNeededToIncreaseLevel[nextLevel]){
                dataBase.levelUp();
            }

            dataBase.addPointsToUser(deletedItem[0].levelOfImportance);
            dataBase.deleteTaskFromDataBase(tempArray);
            taskList.render();
            header.render();
        }

    };

    controller.init();


}());