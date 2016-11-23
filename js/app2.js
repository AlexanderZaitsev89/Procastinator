/**
 * Created by Alex on 21.11.2016.
 */
$(function(){
//------------------------------------------------------Model----------------------------------------------------------
    var model={
        user: {
        userName:'Alexander',
        userLevel:0,
        userExperience:0
        },
        currenTaskChosenID:null,
        tasks:[
            {
                description:'task1',
                levelOfImportance:1,
                points:0,
                timeCreated:0,
                timeDeadline:0,
                timeFinished:0
            },
            {
                description:'task2',
                levelOfImportance:1,
                points:0,
                timeCreated:0,
                timeDeadline:0,
                timeFinished:0
            }
        ]
    };

    var appConfig={
        currentTaskChosen:null
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

                //console.log("INITIAL DATA: "+JSON.stringify(initialData));
                localStorage.user=JSON.stringify(userInfo);
                localStorage.tasks=JSON.stringify(tasksArray);
                localStorage.tasksCompleted=JSON.stringify(tasksCompletedArray);
            }
        },
        getUserData:function () {
            return JSON.parse(localStorage.user);
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
        addLevelToUser:function (newLevel) {
            var newUserInfo=JSON.parse(localStorage.user);
            newUserInfo.userLevel+=parseInt(newLevel);
           localStorage.user=JSON.stringify(newUserInfo);
        }

    }

//------------------------------------------------------View------------------------------------------------------------
    var header={
        init: function() {
            // store pointers to DOM elements for easy access later
            this.$name=$('#nameUser');
            this.$level=$('#levelUser');
            this.render();
        },
        render:function () {
            var user=controller.getUserInfo();
            this.$name.text(user.userName);
            this.$level.text("Level: "+user.userLevel);
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
            this.$inputDescription.val("Enter task description ...");
            this.$levelOfImportance.val('...');
        },
        checkInputFields:function () {
            if(this.$inputDescription.val()=="Enter task description ..." ||
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
        render:function () {
            //Remove previous div task  elements
            $('.taskElement').remove();
            $('#openedTask').remove();
            var allTasks=controller.getTasks();

            //Create div elements for all tasks
           for (var i=0;i<allTasks.length;i++){
               $('#tasks').append("<div id='task"+(i)+"' class='taskElement'>"+allTasks[i].description+"</div>");
           };
            $('.taskElement').on('click',function (event) {
                var chosenTaskElement=event.target.attributes.getNamedItem("id").textContent;
               controller.openButtonsForTaskElement(chosenTaskElement);

                //console.log(chosenTaskElement);
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

            //console.log(addTask.getNewTask().description);
        },
        openButtonsForTaskElement:function (id) {
            //console.log("test id value   "+id.charAt(4))
            appConfig.currentTaskChosen=id.charAt(4);
            taskList.addButtonsArea(id)
        },
        deleteTask:function () {
            deleteItemNum=appConfig.currentTaskChosen;
            var temp=dataBase.getTasksData();
            temp.splice(deleteItemNum,1);

            dataBase.deleteTaskFromDataBase(temp);
            taskList.render();


        },
        completeTask:function (id) {
            deleteItemNum=appConfig.currentTaskChosen;
            var tempArray=dataBase.getTasksData();
            var deletedItem=tempArray.splice(deleteItemNum,1);
            dataBase.addLevelToUser(deletedItem[0].levelOfImportance);
            //console.log();
            dataBase.deleteTaskFromDataBase(tempArray);
            taskList.render();
            header.render();
        }

    };

    controller.init();


}());