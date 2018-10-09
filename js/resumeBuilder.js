/* This builds the Résumé dynamically when index.html is opened. */

/* ================================= JSONs ================================== */
/* A lightweight data-interchange format, easy for humans to read & write, easy for machines to parse & generate.
Language-independent (ie not just in JS) SYNTAX / DATA FORMAT for storing & exchanging data
between a browser and a server asynchronously.

Simple text, written with JS Object Notation (JSON): so just like a JS object:
- data in name / key / field / attribute: value pairs, separated by commas,
- (JSON) objects can contain (JSON) objects, too (eg "contacts" below) - in {curly braces}
and arrays (eg "skills" below) - in [square brackets].

But in JSON:
- all "name": "value" pairs must be in "double quotes";
- names must be: strings; values must be: string, number, object, array, boolean, null.
- JSONs (officially) cannot have comments (though there are workarounds)
but as this is a *.js file (not *.json) it can have comments in it
(*.JSON is an open-standard FILE FORMAT that uses human-readable text to transmit data objects
 consisting of attribute–value pairs and array data types (or any other serializable value).) */

var bio = {  // top section ("header")
  "name": "Rajiv Shankar",
  "role": "Web Developer",
  "contacts": {  // object
    "mobile": "207.576.4187",
    "email": "rshankar@post.harvard.edu",
    "github": "rajiv-shankar",
    "twitter": "@RajivShankar1",
    "location": "Portland ME"
  },
  "welcomeMessage": "Hello!  Welcome to my R&eacute;sum&eacute;.",  // " &eacute;" = é [e, accent acute]
  "skills": ["HTML","CSS","JavaScript","JQuery","MS Office","Economics","Investing"],  // array
  "bioPic": "images/me.jpg",

  // "display": function  // replaced by 'bio.display = function...' below [L102] ??
};

var education = {
  "schools": [
    {
      "name": "Harvard University",
      "location": "Cambridge MA",
      "degree": "Bachelor's",
      "major": ["Economics"],  // array
      "dates": 2004,  // simple integer can be left as is
      "url": "http://www.harvard.edu"
    },
    {
      "name": "Harvard University",
      "location": "Cambridge MA",
      "degree": "Master's",
      "major": ["Economics"],
      "dates": 2006,
      "url": "http://www.harvard.edu"
    }
  ],
  "onlineCourse": [
    {
      "title": "Udacity Front-End Web Developer nanodegree",
      "school": "Udacity",
      "dates": 2016,
      "url": "www.udacity.com"
    }
  ]
  // "display": function
}

var work = {
  "jobs": [
    {
      "employer": "Harvard University",
      "title": "Instructor",
      "location": "Cambridge MA",
      "dates": "2003-NOW",
      "description": "Teach economics (microeconomics, game theory) to undergraduate and graduate students."
    },
    {
      "employer": "Morgan Stanley",
      "title": "Financial Advisor",
      "location": "Portland ME",
      "dates": "2010-2011",
      "description": "Wealth Management"
    }
  ]
  // "display": function
}

var projects = {
  "projects": [
    {
      "title": "About Me",
      "dates": "September, 2015",
      "description": "Adapted website to introduce myself to new community.",
      "images": ["images/Project_0.jpg"],
      "url": "http://rajiv-shankar.github.io/Project%200/Project%200%20(Rajiv%20Shankar).html"
    },
    {
      "title": "Responsive Website",
      "dates": "October, 2015",
      "description": "Created a fully responsive and customized website from a mockup",
      "images": ["images/Project_1.jpg"],
      "url": "http://rajiv-shankar.github.io/Project_1/Project%201B.html"
    }
  ]
  // "display": function
}
/* ========================================================================== */

// 😕 DO NOT CLEARLY UNDERSTAND WHAT IS GOING ON IN THIS SECTION

/* ---------- HEADER & FOOTER ---------- */

// add 'display' method to 'bio' object
bio.display = function() {

  // [JS] replace(old, new) swaps out placeholder (e.g. %data%) for data from the JSONs (bio.name)
  var formattedName = HTMLheaderName.replace("%data%",bio.name);  // "HTMLheaderName" is var in helper.js/L10
  var formattedRole = HTMLheaderRole.replace("%data%",bio.role);                // L11
  var formattedImage = HTMLbioPic.replace("%data%",bio.bioPic);                 // L21
  var formattedMessage = HTMLwelcomeMsg.replace("%data%",bio.welcomeMessage);   // L22
  // [jQuery] prepend/append inserts content as first/last child of each element in set of matched elements
  // 😕 SEE NOTES.HTML FOR WHAT HAPPENS HERE: v. useful to learn this setup
  $("#header").prepend(formattedName,formattedRole).append(formattedImage,formattedMessage);  // "header" in index.html L24

  var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);      // L14
  $("#topContacts").append(formattedMobile);                                                  // "topContacts" in index.html L28
  var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);         // L15
  $("#topContacts").append(formattedEmail);
  var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);      // L17
  $("#topContacts").append(formattedGithub);
  var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);   // L16
  $("#topContacts").append(formattedTwitter);
  var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);// L19
  $("#topContacts").append(formattedLocation);

  if(bio.skills.length > 0) {                       // loop for flexible addition of skills

    $("#header").append(HTMLskillsStart);                                       // 24

    for(var i = 0; i < bio.skills.length; i++) {
      formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
      $("#skills").append(formattedSkill);
    }
  }

  $("#footerContacts").append(formattedMobile);     // page-bottom
  $("#footerContacts").append(formattedEmail);
  $("#footerContacts").append(formattedGithub);
  $("#footerContacts").append(formattedTwitter);
  $("#footerContacts").append(formattedLocation);

};

bio.display();

/* ---------- "INTERNATIONALIZE" BUTTON ---------- */

function inName(name) {
    name = name.split(" ");
    name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();
    name[1] = name[1].toUpperCase();  // converts lastName to allCaps
    return name[0] + " " + name[1];
}

$("#main").append(internationalizeButton);

/* ---------- NAVBAR ---------- */

$("#workLink").click(function() {
  $('body,html').animate({
    scrollTop: $("#workExperience").offset().top
  }, 2000);
});

$("#projectLink").click(function() {
  $('body,html').animate({
    scrollTop: $("#projects").offset().top
  }, 2000);
});

$("#educationLink").click(function() {
  $('body,html').animate({
    scrollTop: $("#education").offset().top
  }, 2000);
});

$("#mapLink").click(function() {
  $('body,html').animate({
    scrollTop: $("#mapDiv").offset().top
  }, 2000);
});

/* Code for "return-to-top" (to scroll up to top of page) */

$(window).scroll(function() {
    if ($(this).scrollTop() >= 150) {
        $('#return-to-top').fadeIn(200);
    } else {
        $('#return-to-top').fadeOut(200);
    }
});
$('#return-to-top').click(function() {
    $('body,html').animate({
        scrollTop : 0
    }, 2000);
});

/*---------- EDUCATION ---------- */

education.display = function() {

  for(edu in education.schools) {

    $("#education").append(HTMLschoolStart);

    var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[edu].name).replace("#", education.schools[edu].url);
    $(".education-entry:last").append(formattedSchoolName);
    var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[edu].degree);
    $(".education-entry:last").append(formattedSchoolDegree);
    var formattedDates =  HTMLschoolDates.replace("%data%", education.schools[edu].dates);
    $(".education-entry:last").append(formattedDates);
    var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[edu].location);
    $(".education-entry:last").append(formattedLocation);
    var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[edu].major);
    $(".education-entry:last").append(formattedMajor);

  }

  $(".education-entry:last").append(HTMLonlineClasses);

  for(online in education.onlineCourse) {
    var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourse[online].title);
    $(".education-entry:last").append(formattedTitle);
    var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourse[online].school);
    $(".education-entry:last").append(formattedSchool);
    var formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourse[online].dates);
    $(".education-entry:last").append(formattedDates);
    var formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourse[online].url).replace("#", education.onlineCourse[online].url);
    $(".education-entry:last").append(formattedURL);
  }
}

education.display();

 /*---------- WORK ---------- */

work.display = function() {

  for(jobs in work.jobs) {

    $("#workExperience").append(HTMLworkStart);

    var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[jobs].employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[jobs].title);
    var formattedEmployerTitle = formattedEmployer + formattedTitle;
    var formattedDates = HTMLworkDates.replace("%data%", work.jobs[jobs].dates);
    var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[jobs].location);
    var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[jobs].description);

    $(".work-entry:last").append(formattedEmployerTitle);
    $(".work-entry:last").append(formattedDates);
    $(".work-entry:last").append(formattedLocation);
    $(".work-entry:last").append(formattedDescription);
  }
}

work.display();

/* ---------- PROJECTS ---------- */

projects.display = function() {

  for (project in projects.projects) {        // for EACH project, do the following:

    $("#projects").append(HTMLprojectStart);  // adds a "HTMLprojectStart" <div> to "projects" <div>

    var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title).replace("#", projects.projects[project].url);  // combines JSON data (here) with helper.js data
    $(".project-entry:last").append(formattedTitle);  // combines above with index.html (i.e. modifies DOM); "last" simply adds lines sequentially
    var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
    $(".project-entry:last").append(formattedDates);

    var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
    $(".project-entry:last").append(formattedDescription);

    if (projects.projects[project].images.length > 0) {
      for (image in projects.projects[project].images) {
        var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
        $(".project-entry:last").append(formattedImage);
      }
    }
  }
}

projects.display();

 /*---------- MAP ---------- */

$("#mapDiv").append(googleMap);


/* to display when page fully loaded */
// $(document).ready(function() {
//   document.getElementsByTagName("html")[0].style.visibility = "visible";
// });
