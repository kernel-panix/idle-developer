// start a new game:
var defaultScore = 0,
    totalScore = defaultScore;
updateScore();

// for buying in multiples
var buyMultiplier = 1;

// music control stuff
var volLevel = 50,
    musicPlaying = true;

// for play statistics
var sessionTotalScore = 0,
    sessionTotalSpent = 0,
    sessionTotalWorkers = 0,
    sessionTotalManagers = 0,
    sessionTotalPowerups = 0,
    sessionTotalAchievements = 0,
    sessionTotalClicks = 0,
    alltimeScore = 0,
    alltimeSpent = 0,
    alltimeWorkers = 0,
    alltimeManagers = 0,
    alltimePowerups = 0,
    alltimeAchievements = 0,
    alltimeClicks = 0;

// soft reset bonus variables
var currentEarningsBonus = 0,
    sessionEarningsBonus = 0,
    alltimeEarningsBonus = 0;

// this is legacy stuff that just keeps track of the intervals involved with the timer
var counterSpan = $('#counter');
var currentCount = 0;

// game save variables
var saveTimer = 0,
    saveSpan = $('.save-status'),
    saveTime = 0,
    currentTime = new Date(),
    tempTime = parseInt(currentTime.getTime(), 10) - saveTime;

// we separate this for reset
var workersDefault = [{
    "name": "Personal Blog",
        "pluralName": "Personal Blogs",
        "level": 1,
        "buyPrice": 10,
        "payOut": 3,
        "interval": 1000,
        "currentCount": 10,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.3
}, {
    "name": "Parked Domain",
        "pluralName": "Parked Domains",
        "level": 0,
        "buyPrice": 150,
        "payOut": 40,
        "interval": 2000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.4
}, {
    "name": "Professional Blog",
        "pluralName": "Professional Blogs",
        "level": 0,
        "buyPrice": 500,
        "payOut": 150,
        "interval": 5000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.32
}, {
    "name": "Niche Hobby Site",
        "pluralName": "Niche Hobby Sites",
        "level": 0,
        "buyPrice": 1500,
        "payOut": 500,
        "interval": 50000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.34
}, {
    "name": "Small Business Site",
        "pluralName": "Small Business Sites",
        "level": 0,
        "buyPrice": 5000,
        "payOut": 2000,
        "interval": 30000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.36
}, {
    "name": "News Site",
        "pluralName": "News Sites",
        "level": 0,
        "buyPrice": 20000,
        "payOut": 5000,
        "interval": 60000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.38
}, {
    "name": "Online Retailer",
        "pluralName": "Online Retailers",
        "level": 0,
        "buyPrice": 50000,
        "payOut": 20000,
        "interval": 66000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.38
}, {
    "name": "Social Network",
        "pluralName": "Social Networks",
        "level": 0,
        "buyPrice": 100000,
        "payOut": 30000,
        "interval": 600000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.4
}, {
    "name": "Data API",
        "pluralName": "Data APIs",
        "level": 0,
        "buyPrice": 200000,
        "payOut": 50000,
        "interval": 600000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.42
}, {
    "name": "Advertising Platform",
        "pluralName": "Advertising Platforms",
        "level": 0,
        "buyPrice": 250000,
        "payOut": 25000,
        "interval": 6000000,
        "currentCount": 0,
        "timerSet": false,
        "bonusLevel": 0,
        "payoutMultiplier": 1,
        "speedMultiplier": 1,
        "automated": false,
        "priceMultiplier": 0.44
}];

//
// we use this methodology to deep copy the objects in the 
// array and create new memory pointers, allowing us to preserve
// the original functionality for ease of game resetting
//
var workers = JSON.parse(JSON.stringify(workersDefault));


var managersDefault = [{
    "name": "Brett Lamb",
        "price": 1000,
        "desc": "Almost nobody knows who Mr. Lamb is except his millions of followers. And now lucky for you he's offering his personal touch on personal blogging.",
        "purchased": false
}, {
    "name": "StopMommy",
        "price": 5000,
        "desc": "Some would describe StopMommy as a juggernaut in the world of the web. Others would call them an unsightly burden on the webscape. You? You call them money...",
        "purchased": false
}, {
    "name": "Chris Atwood",
        "price": 20000,
        "desc": "Oh the horror! He's opinionated and horrible at coding. (But then who isn't these days?) How else do you think his blog got its name?",
        "purchased": false
}, {
    "name": "Jax Longtail",
        "price": 50000,
        "desc": "The best market to sell to is always the market the fewest people are looking at... right?",
        "purchased": false
}, {
    "name": "Cube Soft",
        "price": 250000,
        "desc": "Financial firm come to the world of small business site hosting. Can't fault them for that, after all, it makes both you and them money.",
        "purchased": false
}, {
    "name": "Kevin Violet",
        "price": 1000000,
        "desc": "Can you dig it!?",
        "purchased": false
}, {
    "name": "MagnusCarts",
        "price": 2500000,
        "desc": "Ecommerce without all of the headaches! Well, until you find our latest \"Feature\"...",
        "purchased": false
}, {
    "name": "Tom Zuckerfeld",
        "price": 5000000,
        "desc": "Tom's made a career out of creating great social networking sites and he charges the money to prove that.",
        "purchased": false
}, {
    "name": "Terracle",
        "price": 15000000,
        "desc": "Big data... nuff said.",
        "purchased": false
}, {
    "name": "Larry Grinn",
        "price": 20000000,
        "desc": "Welcome to the big leagues, Larry Grinn will keep you grinning from the insane amounts of money your advertising platforms will pull in now.",
        "purchased": false
}];

var managers = JSON.parse(JSON.stringify(managersDefault));

var powerupsDefault = [{
    "name": "Personal Fulfillment",
        "desc": "Personal Blog profit x4!",
        "price": 10000,
        "purchased": false
}, {
    "name": "Misspelled Domain Targeting",
        "desc": "Parked Domain profit x2!",
        "price": 25000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Professional Blog profit x2!",
        "price": 50000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Niche Hobby Site profit x2!",
        "price": 75000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Small Business Site profit x2!",
        "price": 100000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "News Site profit x2!",
        "price": 150000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Online Retailer profit x2!",
        "price": 200000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Social Network profit x2!",
        "price": 250000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Data API profit x2!",
        "price": 500000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Advertising Platform profit x2!",
        "price": 1000000,
        "purchased": false
},
{
    "name": "Quick Cash-in",
        "desc": "Personal Blog speed x4!",
        "price": 1100000,
        "purchased": false
}, {
    "name": "Spam Blog Comments",
        "desc": "Parked Domain speed x2!",
        "price": 1200000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Professional Blog speed x2!",
        "price": 2500000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Niche Hobby Site speed x2!",
        "price": 5000000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Small Business Site speed x2!",
        "price": 7500000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "News Site speed x2!",
        "price": 15000000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Online Retailer speed x2!",
        "price": 30000000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Social Network speed x2!",
        "price": 50000000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Data API speed x2!",
        "price": 75000000,
        "purchased": false
}, {
    "name": "Placeholder",
        "desc": "Advertising Platform speed x2!",
        "price": 100000000,
        "purchased": false
},{
    "name": "Increase All",
        "desc": "All business profits x2!",
        "price": 150000000,
        "purchased": false
}
];

var powerups = JSON.parse(JSON.stringify(powerupsDefault));

// load saved data if localstorage available must occur after variable initialization and before play area set-up
if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("score")) {
        totalScore = parseFloat(localStorage.getItem("score"));
    
        // load statistics
    sessionTotalScore = parseInt(localStorage.getItem("sessionTotalScore"), 10);
    sessionTotalSpent = parseInt(localStorage.getItem("sessionTotalSpent"), 10);
    sessionTotalWorkers = parseInt(localStorage.getItem("sessionTotalWorkers"), 10);
    sessionTotalManagers = parseInt(localStorage.getItem("sessionTotalManagers"), 10);
    sessionTotalPowerups = parseInt(localStorage.getItem("sessionTotalPowerups"), 10);
    sessionTotalAchievements = parseInt(localStorage.getItem("sessionTotalAchievements"), 10);
    sessionTotalClicks = parseInt(localStorage.getItem("sessionTotalClicks"), 10);
    alltimeScore = parseInt(localStorage.getItem("alltimeScore"), 10);
    alltimeSpent = parseInt(localStorage.getItem("alltimeSpent"), 10);
    alltimeWorkers = parseInt(localStorage.getItem("alltimeWorkers"), 10);
    alltimeManagers = parseInt(localStorage.getItem("alltimeManagers"), 10);
    alltimePowerups = parseInt(localStorage.getItem("alltimePowerups"), 10);
    alltimeAchievements = parseInt(localStorage.getItem("alltimeAchievements"), 10);
    alltimeClicks = parseInt(localStorage.getItem("alltimeClicks"), 10);
        
        updateStats();
        
        // load music preferences
        volLevel = localStorage.getItem("volLevel");
        musicPlaying = localStorage.getItem("musicPlaying");

        workers = JSON.parse(localStorage.getItem("workers"));

        managers = JSON.parse(localStorage.getItem("managers"));

        powerups = JSON.parse(localStorage.getItem("powerups"));

        saveTime = parseInt(localStorage.getItem("saveTime"), 10);
        // get their clocks going again
        for (var i in workers) {
            updateWorkerLevel(i);
            if (workers[i].timerSet === true) {
                workers[i].timerSet = false;
                loopingFunction(i);
                workers[i].timerSet = true;
            }
        }

        // apply money earned since last save
        for (var i in workers) {
            tempTime = parseInt(currentTime.getTime(), 10) - saveTime;
            if (workers[i].automated === true && workers[i].level > 0 && tempTime > workers[i].interval / workers[i].speedMultiplier) {
                
                totalScore += (workers[i].payOut * workers[i].level) * workers[i].payoutMultiplier * (workers[i].interval / workers[i].speedMultiplier / tempTime);
                
                sessionTotalScore += (workers[i].payOut * workers[i].level) * workers[i].payoutMultiplier * (workers[i].interval / workers[i].speedMultiplier / tempTime);
                
                alltimeScore += (workers[i].payOut * workers[i].level) * workers[i].payoutMultiplier * (workers[i].interval / workers[i].speedMultiplier / tempTime);
                
                workers[i].currentCount += (workers[i].interval / workers[i].currentCount) % tempTime;
            }
        }
        
        $(saveSpan).html('Saved Game Loaded');
    }
} else {
    $('span.alerts').append("<p>ATTENTION: Your browser doesn\'t support local storage. Your game will NOT BE SAVED. Please update your browser.</p>");
}


// tabs control

$('#tabs-container > div.active').hide();
$('#tabs-container > div').toggle();

var currentTab = 0;

$('ul.tabbed li a').each(function (index) {
    $(this).on('click', function () {
        if (index != currentTab) {
            currentTab = index;
            $('#tabs-container div.active').hide();
            $('a.active, div.active').removeClass('active');

            switch (currentTab) {
                case 0:
                    $('#tabs-container div#playarea').show().addClass('active');
                    break;
                case 1:
                    $('#tabs-container div#managers').show().addClass('active');
                    break;
                case 2:
                    $('#tabs-container div#powerups').show().addClass('active');
                    break;
                case 3:
                    $('#tabs-container div#options').show().addClass('active');
                    break;
                case 4:
                    $('#tabs-container div#info').show().addClass('active');
                    break;
            }

            $(this).addClass('active');
            window.scrollTo(0, 0);
            checkButtons();
        }
    });
});


// workers set-up

for (var j in workers) {
    if (j < workers.length / 2) {
        if (workers[j].level === 1) {
            $('#playarea #workers .col1').append('<span class="item' + j + '"><div class="level"></div> <div class="buy-area"><button>Buy</button><br><p></p></div></span>');
        } else {
            $('#playarea #workers .col1').append('<span class="item' + j + '"><div class="level"></div> <div class="buy-area"><button>Buy</button><br><p></p></div></span>');
        }
    } else {
        if (workers[j].level === 1) {
            $('#playarea #workers .col2').append('<span class="item' + j + '"><div class="level"></div> <div class="buy-area"><button>Buy</button><br><p></p></div></span>');
        } else {
            $('#playarea #workers .col2').append('<span class="item' + j + '"><div class="level"></div> <div class="buy-area"><button>Buy</button><br><p></p></div></span>');
        }
    }
}

updateAllLevels();
checkButtons();
updateStats();


// workers handlers
$('#playarea [class^="item"] button').each(function (index) {
    $(this).on('click', function () {
        purchaseWorker(index);
    });
});

$('#playarea [class^="item"]').each(function (index) {
    $(this).on('click', function () {
        if (workers[index].timerSet === false) {
            sessionTotalClicks++;
            alltimeClicks++;
            
            loopingFunction(index);
        }
    });
});

// managers handlers
for (var m in managers) {
    $('#managers').append('<span class="manager' + m + '"><div class="bonusinfo"><button>Hire</button><strong>' + managers[m].name + '&nbsp;&nbsp;' + managers[m].price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    }) + '</strong><p>' + managers[m].desc + '</p></div></span>');
}
checkButtons();

$('#managers span[class^="manager"] button').each(function (index) {
    $(this).on('click', function () {
        purchaseManager(index);
    });
});


// powerups handlers
for (var m in powerups) {
    $('#powerups').append('<span class="powerup' + m + '"><div class="bonusinfo"><button>Buy</button><strong>' + powerups[m].name + '&nbsp;&nbsp;' + powerups[m].price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    }) + '</strong><p>' + powerups[m].desc + '</p></div></span>');
}
checkButtons();

$('#powerups span[class^="powerup"] button').each(function (index) {
    $(this).on('click', function () {
        purchasePowerup(index);
    });
});


// buy multiplier set-up
$('button[id^="buyx"]').each(function (index) {
    $(this).on('click', function () {
        switch (index) {
            case 0:
                buyMultiplier = 1;
                break;
            case 1:
                buyMultiplier = 10;
                break;
            case 2:
                buyMultiplier = 100;
                break;
        }
        $('button.active').removeClass('active');
        $(this).addClass('active');
        checkButtons();
    });
});

function purchaseWorker(index) {
    if (totalScore >= (calcPrice(index))) {
        totalScore -= calcPrice(index);
        
        alltimeSpent += calcPrice(index);
        sessionTotalSpent += calcPrice(index);
        
        updatePrice(index);
        updateScore();

        workers[index].level += buyMultiplier;
        updateWorkerLevel(index);

        bonusCheck(index);

        checkButtons();

        startWorkerTimer(index);

        saveProgress();
    }
}

function purchaseManager(index) {
    if (totalScore >= managers[index].price && managers[index].purchased === false) {
        totalScore -= managers[index].price;
        updateScore();
        
        sessionTotalSpent += managers[index].price;
        alltimeSpent += managers[index].price;

        switch (index) {
            case 0:
                workers[0].automated = true;
                startWorkerTimer(0);
                break;
            case 1:
                workers[1].automated = true;
                startWorkerTimer(1);
                break;
            case 2:
                workers[2].automated = true;
                startWorkerTimer(2);
                break;
            case 3:
                workers[3].automated = true;
                startWorkerTimer(3);
                break;
            case 4:
                workers[4].automated = true;
                startWorkerTimer(4);
                break;
            case 5:
                workers[5].automated = true;
                startWorkerTimer(5);
                break;
            case 6:
                workers[6].automated = true;
                startWorkerTimer(6);
                break;
            case 7:
                workers[7].automated = true;
                startWorkerTimer(7);
                break;
            case 8:
                workers[8].automated = true;
                startWorkerTimer(8);
                break;
            case 9:
                workers[9].automated = true;
                startWorkerTimer(9);
                break;
            default:
                break;
        }

        managers[index].purchased = true;
        checkButtons();
        saveProgress();
    }
}

function purchasePowerup(index) {
    if (totalScore >= powerups[index].price && powerups[index].purchased === false) {
        totalScore -= powerups[index].price;
        
        sessionTotalSpent += powerups[index].price;
        alltimeSpent += powerups[index].price;
        
        updateScore();

        switch (index) {
            case 0:
                workers[0].payoutMultiplier *= 4;
                break;
            case 1:
                workers[1].payoutMultiplier *= 2;
                break;
			case 2:
				workers[2].payoutMultiplier *= 2;
				break;
			case 3:
				workers[3].payoutMultiplier *= 2;
				break;
			case 4:
				workers[4].payoutMultiplier *= 2;
				break;
			case 5:
				workers[5].payoutMultiplier *= 2;
				break;
			case 6:
				workers[6].payoutMultiplier *= 2;
				break;
			case 7:
				workers[7].payoutMultiplier *= 2;
				break;
			case 8:
				workers[8].payoutMultiplier *= 2;
				break;
			case 9:
				workers[0].speedMultiplier *= 2;
				break;
			case 10:
				workers[1].speedMultiplier *= 2;
				break;
			case 11:
				workers[2].speedMultiplier *= 2;
				break;
			case 12:
				workers[3].speedMultiplier *= 2;
				break;
			case 13:
				workers[4].speedMultiplier *= 2;
				break;
			case 14:
				workers[5].speedMultiplier *= 2;
				break;
			case 15:
				workers[6].speedMultiplier *= 2;
				break;
			case 16:
				workers[7].speedMultiplier *= 2;
				break;
			case 17:
				workers[8].speedMultiplier *= 2;
				break;
			case 18:
				for(var i in workers) {
					workers[i].payoutMultiplier *= 2;
				}
				break;
        }

        powerups[index].purchased = true;
        checkButtons();
        saveProgress();
    }
}

function updatePrice(index) {
    workers[index].buyPrice += workers[index].buyPrice * workers[index].priceMultiplier * buyMultiplier;
    checkButtons();
}

function updateScore() {
    var localeScore = totalScore.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
    $('#payout').html(localeScore);
}

function startWorkerTimer(index) {
    if (workers[index].setTimer === false) {
        loopingFunction(index);
    }
}

function updateAllLevels() {
    for (var j in workers) {
        updateWorkerLevel(j);
    }
}

function updateWorkerLevel(index) {
    if (workers[index].level === 1) {
        $("#playarea .item" + index + " div.level").html("<strong>" + workers[index].level + "&nbsp;&nbsp;" + workers[index].name + "</strong><br>" + (workers[index].payOut * workers[index].level * workers[index].payoutMultiplier).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        }));
    } else {
        $("#playarea .item" + index + " div.level").html("<strong>" + workers[index].level + "&nbsp;&nbsp;" + workers[index].pluralName + "</strong><br>" + (workers[index].payOut * workers[index].level * workers[index].payoutMultiplier).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        }));
    }
}


function calcPrice(index) {
    var futurePrice = workers[index].buyPrice,
        priceMult = workers[index].priceMultiplier,
        tempLevel = workers[index].level;

    for (var i = 0; i < buyMultiplier; i++) {
        if (tempLevel > 0) {
            futurePrice += (futurePrice * priceMult);
        } else {
            tempLevel++;
        }
    }

    return futurePrice;
}


function checkButtons() {
    var buyPrice = 0;
    for (var index in workers) {
        if (totalScore < calcPrice(index)) {
            $("#playarea .item" + index + " div p").html((calcPrice(index)).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            }));
            $("#playarea .item" + index + " button").prop("disabled", true);
        } else {
            $("#playarea .item" + index + " div p").html((calcPrice(index)).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            }));
            $("#playarea .item" + index + " button").prop("disabled", false);
        }
    }

    // managers enabled query logic
    for (index in managers) {
        if (managers[index].purchased) {
            $('#managers span.manager' + index + ' button').html('Hired');
        } else {
            $('#managers span.manager' + index + ' button').html('Hire');
        }

        if (totalScore < managers[index].price || managers[index].purchased === true) {
            $("#managers span.manager" + index + " button").prop("disabled", true);
        } else {
            $("#managers span.manager" + index + " button").prop("disabled", false);
        }
    }

    // powerups enabled query logic
    for (index in powerups) {
        if (powerups[index].purchased) {
            $('#powerups span.powerup' + index + ' button').html('Bought');
        } else {
            $('#powerups span.powerup' + index + ' button').html('Buy');
        }

        if (totalScore < powerups[index].price || powerups[index].purchased === true) {
            $("#powerups span.powerup" + index + " button").prop("disabled", true);
        } else {
            $("#powerups span.powerup" + index + " button").prop("disabled", false);
        }
    }
}

function updateStats() {
    $('#this-session').html("Total Earned: " + sessionTotalScore.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            }) + '<br>Total Spent: ' + sessionTotalSpent.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
    }) + '<br>Total Workers: ' + sessionTotalWorkers + '<br>Total Managers: ' + sessionTotalManagers + '<br>Total Power-ups: ' + sessionTotalPowerups + '<br>Total Achievements: ' + sessionTotalAchievements + '<br>Total Clicks: ' + sessionTotalClicks); 
    
    $('#alltime').html("Total Earned: " + alltimeScore.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
    }) + '<br>Total Spent: ' + alltimeSpent.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
    }) + '<br>Total Workers: ' + alltimeWorkers + '<br>Total Managers: ' + alltimeManagers + '<br>Total Power-ups: ' + alltimePowerups + '<br>Total Achievements: ' + alltimeAchievements + '<br>Total Clicks: ' + alltimeClicks + '<br>Total Daemons: ' + alltimeEarningsBonus);
    
    $('#current-daemons span.daemons').html(currentEarningsBonus);
    
    $('#reset-daemons').html(sessionEarningsBonus);
}

function checkEarningBonus() {
    if(alltimeScore >= ((4 * Math.pow(10,9)) * (sessionEarningsBonus * 1.01))) {
        sessionEarningsBonus += 1;
        alltimeEarningsBonus += 1;
    }
}

function doStuff(index) {
    if (workers[index].level > 0) {
        workers[index].currentCount += workers[index].speedMultiplier;

        currentCount += workers[index].speedMultiplier;

        $('#playarea .item' + index).css({
            "background": "linear-gradient(to right top, rgba(53, 173, 81, 0.5) 0%, rgba(53, 173, 81, 0.5) " + workers[index].currentCount + "%,rgba(0,0,0,0) " + workers[index].currentCount + "%,rgba(0,0,0,0) 100%)"
        });

        if (workers[index].currentCount >= 100) {
            totalScore += (workers[index].payOut * workers[index].level) * (workers[index].payoutMultiplier + (currentEarningsBonus * 0.001));
            
            sessionTotalScore += (workers[index].payOut * workers[index].level) * (workers[index].payoutMultiplier + (currentEarningsBonus * 0.001));
            
            alltimeScore += (workers[index].payOut * workers[index].level) * (workers[index].payoutMultiplier + (currentEarningsBonus * 0.001));
            
            updateScore();
            workers[index].currentCount = 0;
            checkButtons();
            updateStats();
            bonusCheck(index);
			checkEarningBonus();
        }
    }
}

function loopingFunction(index) {

    var delay = workers[index].interval / 100;

    if (workers[index].automated === true) {
        workers[index].timerSet = true;
        doStuff(index);
        setTimeout(function () {
            loopingFunction(index);
        }, delay);
    } else {
        workers[index].timerSet = true;
        doStuff(index);

        setTimeout(function () {
            if (workers[index].currentCount > 0) {
                loopingFunction(index);
            } else {
                workers[index].timerSet = false;
                $('#playarea .item' + index).css({
                    "background": "none"
                });
            }
        }, delay);
    }
}


// These are bonuses earned by purchasing workers. We use dual-confirmation to prevent multiple applications.

function bonusCheck(index) {
    // worker 0 bonuses
    if (index === 0) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 300 && workers[index].bonusLevel < 6) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 400 && workers[index].bonusLevel < 7) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 500 && workers[index].bonusLevel < 8) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 6;
        }
		if (workers[index].level >= 600 && workers[index].bonusLevel < 9) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 700 && workers[index].bonusLevel < 10) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 800 && workers[index].bonusLevel < 11) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 900 && workers[index].bonusLevel < 12) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1000 && workers[index].bonusLevel < 13) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 8;
        }
		if (workers[index].level >= 1100 && workers[index].bonusLevel < 14) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1200 && workers[index].bonusLevel < 15) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1300 && workers[index].bonusLevel < 16) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1400 && workers[index].bonusLevel < 17) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1500 && workers[index].bonusLevel < 18) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 6;
        }
		if (workers[index].level >= 1600 && workers[index].bonusLevel < 19) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1700 && workers[index].bonusLevel < 20) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1800 && workers[index].bonusLevel < 21) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1900 && workers[index].bonusLevel < 22) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 2000 && workers[index].bonusLevel < 23) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 8;
        }
    } else if (index === 1) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[0].speedMultiplier *= 1.5;
            workers[2].speedMultiplier *= 1.5;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[0].speedMultiplier *= 1.5;
            workers[2].speedMultiplier *= 1.5;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[0].payoutMultiplier *= 1.5;
            workers[2].payoutMultiplier *= 1.5;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
            workers[index].payoutMultiplier *= 2;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[0].payoutMultiplier *= 1.5;
            workers[2].payoutMultiplier *= 1.5;
            workers[index].payoutMultiplier *= 4;
        }
    } else if (index === 2) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 300 && workers[index].bonusLevel < 6) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 400 && workers[index].bonusLevel < 7) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 500 && workers[index].bonusLevel < 8) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 600 && workers[index].bonusLevel < 9) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 700 && workers[index].bonusLevel < 10) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 800 && workers[index].bonusLevel < 11) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 900 && workers[index].bonusLevel < 12) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1000 && workers[index].bonusLevel < 13) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1100 && workers[index].bonusLevel < 14) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1200 && workers[index].bonusLevel < 15) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1300 && workers[index].bonusLevel < 16) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1400 && workers[index].bonusLevel < 17) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1500 && workers[index].bonusLevel < 18) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1600 && workers[index].bonusLevel < 19) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1700 && workers[index].bonusLevel < 20) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1800 && workers[index].bonusLevel < 21) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1900 && workers[index].bonusLevel < 22) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 2000 && workers[index].bonusLevel < 23) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
    } else if (index === 3) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
    } else if (index === 4) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 300 && workers[index].bonusLevel < 6) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 400 && workers[index].bonusLevel < 7) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 500 && workers[index].bonusLevel < 8) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 600 && workers[index].bonusLevel < 9) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 700 && workers[index].bonusLevel < 10) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 800 && workers[index].bonusLevel < 11) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 900 && workers[index].bonusLevel < 12) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1000 && workers[index].bonusLevel < 13) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1100 && workers[index].bonusLevel < 14) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1200 && workers[index].bonusLevel < 15) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1300 && workers[index].bonusLevel < 16) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1400 && workers[index].bonusLevel < 17) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1500 && workers[index].bonusLevel < 18) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1600 && workers[index].bonusLevel < 19) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1700 && workers[index].bonusLevel < 20) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1800 && workers[index].bonusLevel < 21) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1900 && workers[index].bonusLevel < 22) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 2000 && workers[index].bonusLevel < 23) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
    } else if (index === 5) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 300 && workers[index].bonusLevel < 6) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 400 && workers[index].bonusLevel < 7) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 500 && workers[index].bonusLevel < 8) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 600 && workers[index].bonusLevel < 9) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 700 && workers[index].bonusLevel < 10) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 800 && workers[index].bonusLevel < 11) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 900 && workers[index].bonusLevel < 12) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1000 && workers[index].bonusLevel < 13) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1100 && workers[index].bonusLevel < 14) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1200 && workers[index].bonusLevel < 15) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1300 && workers[index].bonusLevel < 16) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1400 && workers[index].bonusLevel < 17) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1500 && workers[index].bonusLevel < 18) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1600 && workers[index].bonusLevel < 19) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1700 && workers[index].bonusLevel < 20) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1800 && workers[index].bonusLevel < 21) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1900 && workers[index].bonusLevel < 22) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 2000 && workers[index].bonusLevel < 23) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
    } else if (index === 6) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
    } else if (index === 7) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
    } else if (index === 8) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 300 && workers[index].bonusLevel < 6) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 400 && workers[index].bonusLevel < 7) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 500 && workers[index].bonusLevel < 8) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 600 && workers[index].bonusLevel < 9) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 700 && workers[index].bonusLevel < 10) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 800 && workers[index].bonusLevel < 11) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 900 && workers[index].bonusLevel < 12) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1000 && workers[index].bonusLevel < 13) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1100 && workers[index].bonusLevel < 14) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1200 && workers[index].bonusLevel < 15) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1300 && workers[index].bonusLevel < 16) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1400 && workers[index].bonusLevel < 17) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1500 && workers[index].bonusLevel < 18) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1600 && workers[index].bonusLevel < 19) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1700 && workers[index].bonusLevel < 20) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1800 && workers[index].bonusLevel < 21) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1900 && workers[index].bonusLevel < 22) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 2000 && workers[index].bonusLevel < 23) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
    } else if (index === 9) {
        if (workers[index].level >= 10 && workers[index].bonusLevel < 1) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 25 && workers[index].bonusLevel < 2) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 50 && workers[index].bonusLevel < 3) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 2;
        }
        if (workers[index].level >= 100 && workers[index].bonusLevel < 4) {
            workers[index].bonusLevel += 1;
            workers[index].speedMultiplier *= 4;
        }
        if (workers[index].level >= 200 && workers[index].bonusLevel < 5) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
        if (workers[index].level >= 300 && workers[index].bonusLevel < 6) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 400 && workers[index].bonusLevel < 7) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 500 && workers[index].bonusLevel < 8) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 600 && workers[index].bonusLevel < 9) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 700 && workers[index].bonusLevel < 10) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 800 && workers[index].bonusLevel < 11) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 900 && workers[index].bonusLevel < 12) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1000 && workers[index].bonusLevel < 13) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1100 && workers[index].bonusLevel < 14) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1200 && workers[index].bonusLevel < 15) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1300 && workers[index].bonusLevel < 16) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1400 && workers[index].bonusLevel < 17) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1500 && workers[index].bonusLevel < 18) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
		if (workers[index].level >= 1600 && workers[index].bonusLevel < 19) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1700 && workers[index].bonusLevel < 20) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1800 && workers[index].bonusLevel < 21) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 1900 && workers[index].bonusLevel < 22) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 2;
        }
		if (workers[index].level >= 2000 && workers[index].bonusLevel < 23) {
            workers[index].bonusLevel += 1;
            workers[index].payoutMultiplier *= 4;
        }
    }
}

function softReset() {
    totalScore = defaultScore;
    updateScore();

    // reset statistics
    sessionTotalScore = 0;
    sessionTotalSpent = 0;
    sessionTotalWorkers = 0;
    sessionTotalManagers = 0;
    sessionTotalPowerups = 0;
    sessionTotalAchievements = 0;
    sessionTotalClicks = 0;
	currentEarningsBonus += sessionEarningsBonus;
	sessionEarningsBonus = 0;

    workers = JSON.parse(JSON.stringify(workersDefault));
    managers = JSON.parse(JSON.stringify(managersDefault));
    powerups = JSON.parse(JSON.stringify(powerupsDefault));

    for (var k in workers) {
        updateWorkerLevel(k);
    }

    checkButtons();

    saveSpan.html("Soft Reset!");
    localStorage.removeItem("score");
    localStorage.removeItem("workers");
    checkButtons();
    updateStats();
}

// reset save
function resetButton() {
    totalScore = defaultScore;
    updateScore();

    // reset statistics
    sessionTotalScore = 0;
    sessionTotalSpent = 0;
    sessionTotalWorkers = 0;
    sessionTotalManagers = 0;
    sessionTotalPowerups = 0;
    sessionTotalAchievements = 0;
    sessionTotalClicks = 0;
    alltimeScore = 0;
    alltimeSpent = 0;
    alltimeWorkers = 0;
    alltimeManagers = 0;
    alltimePowerups = 0;
    alltimeAchievements = 0;
    alltimeClicks = 0;

    workers = JSON.parse(JSON.stringify(workersDefault));
    managers = JSON.parse(JSON.stringify(managersDefault));
    powerups = JSON.parse(JSON.stringify(powerupsDefault));

    for (var k in workers) {
        updateWorkerLevel(k);
    }

    saveSpan.html("Hard Reset!");
    localStorage.clear();
    checkButtons();
    updateStats();
}

$('#soft-reset button').on('click', function () {
    softReset();
});

$('#reset button').on('click', function () {
    resetButton();
});

// save game functionality
$('#save-game button').on('click', function () {
    saveProgress();
});

function saveProgress() {
    var d = new Date(),
        saveTime = d.getTime();
    localStorage.setItem("saveTime", parseInt(saveTime, 10));
    localStorage.setItem("score", totalScore);
    
    // stats stuff
    localStorage.setItem("sessionTotalScore", sessionTotalScore);
    localStorage.setItem("sessionTotalSpent", sessionTotalSpent);
    localStorage.setItem("sessionTotalWorkers", sessionTotalWorkers);
    localStorage.setItem("sessionTotalManagers", sessionTotalManagers);
    localStorage.setItem("sessionTotalPowerups", sessionTotalPowerups);
localStorage.setItem("sessionTotalAchievements", sessionTotalAchievements);
    localStorage.setItem("sessionTotalClicks", sessionTotalClicks);
    localStorage.setItem("alltimeScore", alltimeScore);
    localStorage.setItem("alltimeSpent", alltimeSpent);
    localStorage.setItem("alltimeWorkers", alltimeWorkers);
    localStorage.setItem("alltimeManagers", alltimeManagers);
    localStorage.setItem("alltimePowerups", alltimePowerups);
    localStorage.setItem("alltimeAchievements", alltimeAchievements);
    localStorage.setItem("alltimeClicks", alltimeClicks);
    
    // music stuff
    localStorage.setItem("volLevel", volLevel);
    localStorage.setItem("musicPlaying", musicPlaying);
    
    localStorage.setItem("workers", JSON.stringify(workers));
    localStorage.setItem("managers", JSON.stringify(managers));
    localStorage.setItem("powerups", JSON.stringify(powerups));

    saveSpan.html("Last saved at " + d.toLocaleTimeString() + " on " + d.toLocaleDateString());
}

(function autoMagicSaving() {
    if (saveTimer % 2 === 0 && saveTimer !== 0) {
        saveProgress();
        saveTimer = 0;
    } else {
        saveTimer++;
    }

    // set to save once a half mintute
    setTimeout(autoMagicSaving, 30000);
})();

// SoundCloud API stuff
SC.initialize({
    client_id: 'f8a547ed24beb6240d018f9fb55bf4e1'
});

// audio controls set-up
$('#vol-control').val(volLevel);
$('#vol-control').next().html($('#vol-control').val());

if (musicPlaying === false || musicPlaying === 'false') {
    $('#toggle-music').html('Start Music');
} else {
    $('#toggle-music').html('Stop Music');
}

// playback function
function playMusic() {
    SC.stream("/tracks/106113359", function (sound) {
        $('#vol-control').on('change mousemove', function () {
            $(this).next().html($(this).val());
            volLevel = $(this).val();
            sound.setVolume(volLevel);
        });

        $('#toggle-music').on('click', function () {
            if (musicPlaying === true || musicPlaying === 'true') {
                musicPlaying = false;
                $(this).html('Start Music');
                sound.pause();
            } else {
                musicPlaying = true;
                $(this).html('Stop Music');
                sound.resume();
            }
        });

        sound.setVolume(volLevel);
        sound.play();
        
        // must be set to just before end of track to loop properly
        sound.onPosition(97000, function (eventPosition) {
            playMusic();
        });

        if (musicPlaying === false || musicPlaying === 'false') {
            sound.pause();
        }
    });
}

playMusic();