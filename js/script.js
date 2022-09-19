

   //parent Div Element for the table of completed challenges
   const parentDiv = document.querySelector('#challengesTable');

 // the class creates new divs
   class Div {
    constructor(text, nameClass) {
        this.text = text;
        this.nameClass = nameClass;
        const newDiv = document.createElement('div');
        newDiv.innerText = text;
        newDiv.setAttribute('class', nameClass);
        return newDiv;
    }
   }
    // this class listening on which element user to click and create and return activity cards for slider
   class Activity {

       constructor(e) {
           let activity = {
               "title" : "",
               "category" : "",
               "classTitle" : "",
           };
           //in case user click on 'P'
           if (e.target.tagName === 'P') {

               activity.title = e.target.innerText;

               activity.category = e.target.nextSibling.innerText;

               activity.classTitle = e.target.parentNode.getAttribute('class');

               return activity;

           }
           //in case user click on 'H4'
           else if (e.target.tagName === 'H4') {
               activity.title = e.target.previousSibling.innerText;
               activity.category = e.target.innerText;
               activity.classTitle = e.target.parentNode.getAttribute('class');
               return activity;

           }
           //in case user click on 'DIV'
           activity.title = e.target.querySelector('p').innerText;
           activity.category = e.target.querySelector('h4').innerText;
           activity.classTitle = e.target.getAttribute('class');
           return activity;
       }

   }

   // this class creates item of table completed challenges
   class MakeCompleteChallengeItem extends Div{



       constructor(title, category, time, key, text, nameClass) {
           super(text, nameClass);
           this.title = title;
           this.category = category;

           this.time = time;
           let currentTime = new Date().getTime();
           //delta time in seconds
           let deltaTime = Math.round((currentTime - time)/1000);

           let delta;

           if (deltaTime <= 60) {
               delta = 'Just now';

           }
           else if (deltaTime > 60 && deltaTime <= 3600) {
               delta = Math.round(deltaTime/60)+' minutes ago';

           }
           else if (deltaTime > 3600 && deltaTime <= 86400) {
               delta = Math.round(deltaTime/3600)+' hours ago';

           }
           else if (deltaTime > 86400 && deltaTime <= 604800) {
               delta = Math.round(deltaTime/86400)+' days ago';

           }
           else if (deltaTime > 604800 && deltaTime <= 2592000) {
               delta = Math.round(deltaTime/604800)+' weeks ago';

           }
           else if (deltaTime > 2629744 && deltaTime <= 31556926) {
               delta = Math.round(deltaTime/2629744)+' months ago';

           }
           else  {
               delta = Math.round(deltaTime/31556926)+' years ago';

           }


           let divRow = new Div ('', 'row eventTable');
            let divTime = new Div (delta, 'col-3 dateEvent');
            let divEvent = new Div (category, 'col-3 typeEvent');
            let divHeader = new Div(title, 'col-5 headerTable');
            let divNumber = new Div(key, 'col-1');


            divRow.appendChild(divNumber);
            divRow.appendChild(divHeader);
           divRow.appendChild(divEvent);
            divRow.appendChild(divTime);

            parentDiv.appendChild(divRow);
       }


   }



   //this class counts and creates an achieve element
   class AchievementElement {
        constructor(category) {
            this.category = category;
            //$(category).childNodes;
            let currentAchieveBox = document.querySelector('#'+category);
            let currentAchieveCounter = currentAchieveBox.textContent;

            let counter = Number(currentAchieveCounter);
            counter++;

            currentAchieveBox.innerText = counter;
        }
   }




        const j = 2; //amount of rows activities to select
        var m = 0; //variable for customize backgrounds of selectors elements through consctruction switch case


        //build section two - activity selector
        for (i = 0; i < j; i++) {

            //defining main div which contains options of activities
            const activitySelector = document.querySelector('#activitySelector');

            //define div which contains row with 2 options of activities
            const divRow = document.createElement('div');
            //set required attributes to the div
            divRow.setAttribute('class', 'row menu d-flex justify-content-around');
            //filling 2 options of activities and put them to htmlDOM
            for (k = 0; k < 2; k++) {

                const responceFromServer = httpGet('http://www.boredapi.com/api/activity/');//making a request to the server

                const responceObject = JSON.parse(responceFromServer);//making an object from string which we recevied from server


                const divCols = document.createElement('div');

                //selecting backgrounds

                if (m >= 4) m -= 4; //reset count to select of 4 colors, in case amount of rows activities to select is > 2

                switch (m) {
                    case 0:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu menu__menuItem menu__menuItem_first');
                        m++;
                        break;

                    case 1:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu menu__menuItem menu__menuItem_second');
                        m++;
                        break;

                    case 2:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu menu__menuItem menu__menuItem_third');
                        m++;
                        break;

                    case 3:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu menu__menuItem menu__menuItem_fourth');
                        m++;
                        break;

                    default:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu menu__menuItem menu__menuItem_first');
                        m++;
                        break;
                }



                //creating card of activities
                const titleOfActivity = document.createElement('p');
                titleOfActivity.innerText = responceObject['activity'];
                divCols.appendChild(titleOfActivity);
                const typeOfActivity = document.createElement('h4');
                typeOfActivity.innerText = responceObject['type'];
                divCols.appendChild(typeOfActivity);
                divRow.appendChild(divCols);
            }

            activitySelector.appendChild(divRow);

        }

        //function request to server
        function httpGet(theUrl) {
            let xmlHttpReq = new XMLHttpRequest();
            xmlHttpReq.open("GET", theUrl, false);
            xmlHttpReq.send(null);
            return xmlHttpReq.responseText;

        }


        //the function creates and adds an element for slider
        $('div.menu__menuItem').on('click', function(e) {

            let selectActivity = new Activity(e);

            $('.add-remove').slick('slickAdd', '<div class="slide d-flex justify-content-center align-items-center"><div class="' + selectActivity.classTitle + '"><p>' + selectActivity.title + '</p><h4>' + selectActivity.category + '</h4></div>');

        });




        //add slick-slider to the project
        $('.add-remove').slick({
            dots: true,

        });



        //remove slides on click and add info to table and achievements
        $(document).delegate( ".slide", "click", function(e) {
            let curSlide = $('.add-remove').slick('slickCurrentSlide');
            let currentActivity = new Activity(e);
            delete currentActivity.classTitle;
            currentActivity.time = new Date().getTime();

            let currentStorageLength = localStorage.length;

            localStorage.setItem('challenges'+currentStorageLength, JSON.stringify(currentActivity));

            //count achievements categories
            const currentAchievement = new AchievementElement(currentActivity.category);

            const challengeItem = new MakeCompleteChallengeItem(currentActivity.title, currentActivity.category, currentActivity.time, localStorage.length);

            $(".add-remove").slick('slickRemove', curSlide, false).slick('refresh');

    });



   //localStorage.clear();



    //get completed challenges from localstorage
   for (let n = 0; n < localStorage.length; n++) {

       let itemChallenge = JSON.parse(localStorage.getItem('challenges'+n));

       const achievementsCounter = new AchievementElement(itemChallenge.category);
       const challengeItem = new MakeCompleteChallengeItem(itemChallenge.title, itemChallenge.category, itemChallenge.time, parseInt(n + 1));

   }



