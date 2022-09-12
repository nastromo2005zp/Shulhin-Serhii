
    $(document).ready(function() {


        const $j = 2; //amount of rows activities to select
        var $m = 0; //variable for customize backgrounds of selectors elements through consctruction switch case

        for ($i = 0; $i < $j; $i++) {
            //define main div which contains options of activities
            const activitySelector = document.querySelector('#activitySelector');
            //define div which contains row with 2 options of activities
            const divRow = document.createElement('div');
            //set required attributes to the div
            divRow.setAttribute('class', 'row menu d-flex justify-content-around');
            //filling 2 options of activities and put them to htmlDOM
            for ($k = 0; $k < 2; $k++) {

                const responceFromServer = httpGet('http://www.boredapi.com/api/activity/');//making a request to the server

                const responceObject = JSON.parse(responceFromServer);//making an object from string which we recevied from server


                const divCols = document.createElement('div');

                //selecting backgrounds

                if ($m >= 4) $m -= 4; //reset count to select of 4 colors, in case amount of rows activities to select is > 2
                switch ($m) {
                    case 0:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu__menuItem menu__menuItem_first');
                        $m++;
                        break;

                    case 1:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu__menuItem menu__menuItem_second');
                        $m++;
                        break;

                    case 2:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu__menuItem menu__menuItem_third');
                        $m++;
                        break;

                    case 3:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu__menuItem menu__menuItem_fourth');
                        $m++;
                        break;

                    default:
                        divCols.setAttribute('class', 'col-6 col-sm-6 menu__menuItem menu__menuItem_first');
                        $m++;
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



        $('div.menu__menuItem').on('click', function(e) {
            let $activity = {
                "title" : "",
                "type" : "",
            };
            $activity = getActivities();
            //console.log($activity);
            

            function getActivities() {
                //in case user click on 'P'
                if (e.target.tagName === 'P') {
                    $activity.title = e.target.innerText;

                    $activity.type = e.target.nextSibling.innerText;

                    return $activity;

                }
                //in case user click on 'H4'
                else if (e.target.tagName === 'H4') {
                    $activity.title = e.target.previousSibling.innerText;
                    $activity.type = e.target.innerText;
                    return $activity;

                }

                    $activity.title = e.target.querySelector('p').innerText;
                    $activity.type = e.target.querySelector('h4').innerText;
                    return $activity;




            }



        });




    });

