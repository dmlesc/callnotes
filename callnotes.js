var sections = ["notes_tab", "notes_first", "notes_second", "escalate_tab", "response_tab",
  "response_form", "redirect_tab", "title_tab", "title_form", "title",
  "body_tab", "body_first", "body_second", "email_tab", "email_form", "remedyURL",
  "displayArea", "att_tab", "att_cancel_tab", "att_misdirect_tab",
  "att_misdirect_form", "att_phone", "att_cancel_form", "att_delegate_tab",
  "att_delegate_form", "tierII_tab", "domreg_tab", "domreg_form", "notice"];
var homeTabs = ["escalate_tab", "email_tab", "att_tab", "notes_tab"];
var escalateTabs = ["tierII_tab", "domreg_tab"];
var tierIITabs = ["redirect_tab", "response_tab"];
var redirectTabs = ["body_tab", "title_tab"];
var attTabs = ["att_misdirect_tab", "att_delegate_tab", "att_cancel_tab"];
var currentTabs;
var tabPos = [-15, -30, -45, -60];
var homeArrowPosition = 41;
var escalateArrowPosition = 115;
var tierIIArrowPosition = 175;
var redirectArrowPosition = 252;
var attArrowPosition = 75;
var descendSpeed = 5;
var descendRate = 1;
var backgroundColor = "black";
var alertColor = "#3B0B24";
var channelName, channelInfo;
var verioAutobahn = "Verio Customer Care\nsupport@verio-hosting.com\n(888)663-6648\n\n" +
  "Visit our support site at http://support.verio.com";
var verioNimbus = "Verio Customer Care\nsupport@veriohosting.com\n(888)663-6648\n\n" +
  "Visit our support site at http://support.verio.com";
var rapidsite = "Rapidsite Customer Care\nsupport@viaverio.com\n(888)727-4326\n\n";
var viaVerio = "viaVerio Customer Care\nsupport@viaverio.com\n(888)224-9346\nwww.viaverio.com";
var att = "AT&T Web Hosting\nhttp://webhosting.att.com/\n1-888-WEB-HOST";
var seconds = 0;
var minutes = 0;
var hold, alert;
var holdOn = false;
var black = true;
var currentForm, formMove;
var formPos = -170;
var leftPos = -170;
var rightPos = 400;
var leftStop, rightStop, currentLeft, currentRight;
var leftContinue = true;
var rightContinue = true;
var moveRate = 2;
var rows = 0;
var cols = 0;
var topCorner, topDec, leftCorner, displayDirection, displayEnlarge;
var rowsContinue = true;
var colsContinue = true;
var rowsAmount = 50;
var state;
var localReset;
var localReseted = false;
var localDiv;

function init() {
  var chrome = /chrome/i;
  if (chrome.test(navigator.userAgent)) {
    // Displays notes form first - this could be modified if you want to show a different form first
    setTop("notes_tab");
    hideAll("notes_tab");
    moveArrow(homeArrowPosition);
    showNotes();
    //showNotice();
  }
  else
    getID("background").innerHTML = "you must use chrome, please.";
}
// Hides all tabs in the sections array except "tab"
function hideAll(tab) {
  for (var i=0; i<sections.length; i++) {
    if (tab == sections[i])
      getID(sections[i]).style.display = "block";
    else
      getID(sections[i]).style.display = "none";
  }
}
// Moves the greater than sign to "position" pixels from the left side of the window
function moveArrow(position) {
  getID("arrow").style.left = position + "px";
}
// Causes the forms in the "tabs" array to descend from the top of the window
function startDescend(tabs, arrowPosition) {
  moveArrow(arrowPosition);
  currentTabs = tabs;
  descendTabs();
}

function descendTabs() {
  for (var i=0; i<currentTabs.length; i++) {
    getID(currentTabs[i]).style.top = tabPos[i] + "px";
    tabPos[i] += descendRate;
  }
  if (tabPos[currentTabs.length - 1] >= 9) {
    clearTimeout(moveTabs);
    resetTabPos();
  }
  else
    moveTabs = setTimeout("descendTabs()", descendSpeed);
}
// Resets the style.top pixel position to start off-screen for the next descendTabs()
function resetTabPos() {
  tabPos = [-15, -30, -45, -60];
}
// The moveForm... functions were used as part of an older version of my Tool. No functionality is lost without
// their utilization, only some eye candy. It works like descendTabs() but the whole forms are moved in horizontally
// from either side of the window.
function moveFormStart(form) {
  currentForm = form;
  moveForm();
}
function moveForm() {
  formPos += moveRate;
  getID(currentForm).style.left = formPos + "px";

  if (formPos >= 8) {
    clearTimeout(formMove);
    formPos = -170;
  }
  else
    formMove = setTimeout("moveForm()", 1);
}
function moveFormHalvesStart(left, leftEnd, right, rightEnd) {
  currentLeft = left;
  leftStop = leftEnd;
  currentRight = right;
  rightStop = rightEnd;
  moveFormHalves();
}
function moveFormHalves() {
  if (leftContinue) {
    if (leftPos >= leftStop) {
      leftContinue = false;
      leftPos = -170;
    }
    else {
      leftPos += moveRate;
      getID(currentLeft).style.left = leftPos + "px";
    }
  }
  if (rightContinue) {
    if (rightPos <= rightStop) {
      rightContinue = false;
      rightPos = 500;
    }
    else {
      rightPos -= moveRate;
      getID(currentRight).style.left = rightPos + "px";
    }
  }
  if (!leftContinue && !rightContinue) {
    clearTimeout(formMove);
    leftContinue = true;
    rightContinue = true;
  }
  else
    formMove = setTimeout("moveFormHalves()", 1);
}
function showHome() {
  hideAll("home");
  showIDs(homeTabs);
  startDescend(homeTabs, homeArrowPosition);
}
function showNotes() {
  showIDs(["notes_form", "notes_first", "notes_second"]);
  hideIDs(["displayArea", "escalate_tab", "email_tab", "att_tab"]);
  //moveFormHalvesStart("notes_first",8,"notes_second",164);
  getID("notes_form").elements[0].focus();
}
function showEscalate() {
  hideAll("escalate_tab");
  showIDs(escalateTabs);
  setTop("escalate_tab");
  startDescend(escalateTabs, escalateArrowPosition);
}
function showTierII() {
  showIDs(tierIITabs);
  hideIDs(["domreg_tab", "response_form", "remedyURL", "title", "title_form", 
           "title_tab", "body_form", "body_tab", "displayArea"]);
  setTop("tierII_tab");
  startDescend(tierIITabs, tierIIArrowPosition);
}
function showResponse() {
  showIDs(["response_form"]);
  hideIDs(["displayArea", "redirect_tab"]);
  setValue("response_form", 0, getID("notes_form").elements[0].value); //puts notes.name into response.name
  setValue("response_form", 2, getID("notes_form").elements[3].value); //puts notes.case into response.case
  showRemedyURL("responseChannel");
  //moveFormHalvesStart("response_form",8,"remedyURL",190);
}
function showRedirect() {
  showIDs(redirectTabs);
  setTop("redirect_tab");
  hideIDs(["response_tab", "title", "title_form", "body_form", "displayArea"]);
  startDescend(redirectTabs, redirectArrowPosition);
}
function showTitle() {
  showIDs(["title_form"]);
  hideIDs(["body_tab", "body_form", "title"]);
  setValue("title_form", 3, getID("notes_form").elements[2].value); //puts notes.userid into title.userid
  //moveFormStart("title_form");
}
function showBody() {
  hideIDs(["title_tab", "displayArea"]);
  setTop("body_tab");
  showIDs(["body_form", "body_first", "body_second"]);
  setValue("body_form", 0, getID("notes_form").elements[8].value); //puts notes.sinfo into body.sinfo
  setValue("body_form", 3, getID("notes_form").elements[6].value); //puts notes.authenticated into body.authenticated
  //moveFormHalvesStart("body_first",8,"body_second",190);
}
function showDomreg() {
  showIDs(["domreg_form"]);
  hideIDs(["displayArea", "tierII_tab"]);
  setValue("domreg_form", 0, ("notes_form").elements[1].value);	//puts notes.domain into domreg.domain
  setValue("domreg_form", 1, getID("notes_form").elements[2].value); //puts notes.userid into domreg.groupuserid
  setValue("domreg_form", 4, getID("notes_form").elements[6].value); //puts notes.authenticated into domreg.authenticated
  //moveFormStart("domreg_form");
}
function showEmail() {
  showIDs(["email_form"]);
  hideIDs(["displayArea", "escalate_tab", "notes_tab", "att_tab"]);
  setTop("email_tab");
  setValue("email_form", 0, getID("notes_form").elements[0].value); // puts notes.name into email.name
  showRemedyURL("emailChannel");
  //moveFormHalvesStart("email_form",8,"remedyURL",190);
}
function showATT() {
  hideAll("att_tab");
  showIDs(attTabs);
  setTop("att_tab");
  startDescend(attTabs, attArrowPosition);
}
function showATTMisdirect() {
  showIDs(["att_misdirect_form", "att_phone", "local1"]);
  hideIDs(["displayArea", "att_cancel_tab", "att_delegate_tab", "local3"]);
  setTop("att_misdirect_tab");
  setValue("att_misdirect_form", 0, getID("notes_form").elements[0].value); // puts notes.name into misdirect.name
  setValue("att_misdirect_form", 1, getID("notes_form").elements[1].value); // puts notes.domain into misdirect.domain
  //moveFormHalvesStart("att_misdirect_form",8,"att_phone",180);
}
function selectLocalPhone(type) {
  state = getID("att_select_state").options[getID("att_select_state").selectedIndex].value;
  if (state == "Select State") {
    localDiv = "local3";
    mustSelectLocal();
  }
  else
    selectNumber(type);
}
function selectNumber(type) {
  var numberFound;
  switch (state) {
    case "Arkansas":
      if (type == "Residential")
        numberFound = "800-464-7928";
      else
        numberFound = "800-499-7928";
      break;
    case "California":
      if (type == "Residential")
        numberFound = "800-310-2355";
      else
        numberFound = "800-750-2355";
      break;
    case "Connecticut":
      if (type == "Residential")
        numberFound = "800-453-7368";
      else
        numberFound = "800-648-3920";
      break;
    case "Illinois":
      numberFound = "800-244-4444";
      break;
    case "Indiana":
      if (type == "Residential")
        numberFound = "800-742-8771";
      else
        numberFound = "800-321-2000";
      break;
    case "Michigan":
      if (type == "Residential")
        numberFound = "800-244-4444";
      else
        numberFound = "800-321-2000";
      break;
    case "Missouri": case "Kansas": case "Oklahoma": case "Texas":
      if (type == "Residential")
        numberFound = "800-585-7928";
      else
        numberFound = "800-559-7928";
      break;
    case "Ohio":
      if (type == "Residential")
        numberFound = "800-660-1000";
      else
        numberFound = "800-321-2000";
      break;
    case "Wisconsin":
      if (type == "Residential")
        numberFound = "800-924-1000";
      else
        numberFound = "800-321-2000";
      break;
    case "Nevada":
      numberFound = "877-469-2355";
      break;
    case "Alabama": case "Florida": case "Georgia": case "Kentucky": case "Louisiana":
    case "Mississippi": case "North Carolina": case "South Carolina": case "Tennessee":
      if (type == "Residential")
        numberFound = "866-805-3921";
      else
        numberFound = "866-620-6000";
      break;
				default:
  }
  setValue("att_misdirect_form", 4, numberFound);
  setValue("att_misdirect_form", 5, state);
}
function mustSelectLocal() {
  hideIDs(["local1"]);
  showIDs([localDiv]);
  mustSelectLocalReset();
}
function mustSelectLocalReset() {
  if (!localReseted) {
    localReseted = true;
    localReset = setTimeout("mustSelectLocalReset()", 825);
  }
  else {
    localReseted = false;
    clearTimeout(localReset);
    showIDs(["local1"]);
    hideIDs([localDiv]);
  }
}
function putPhone(product, number) {
  setValue("att_misdirect_form", 2, product);
  setValue("att_misdirect_form", 4, number);
  if (getID("att_misdirect_form").elements[1].value == "")
    setValue("att_misdirect_form", 1, product);
}
function showATTCancel() {
  showIDs(["att_cancel_form"]);
  hideIDs(["displayArea", "att_misdirect_tab", "att_delegate_tab", "att_dnrRenewDate", ])
  setValue("att_cancel_form", 0, getID("notes_form").elements[0].value); // puts notes.name into misdirect.name
  setValue("att_cancel_form", 1, "canceling hosting");
  setValue("att_cancel_form", 2, getID("notes_form").elements[1].value); // puts notes.domain inot misdirect.domain
  var date = new Date();
  setValue("att_cancel_form", 3, date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear());
  showDNRRenewDate();
  showHostingRenewDate();
  //moveFormStart("att_cancel_form");
}
function showATTDelegate() {
  showIDs(["att_delegate_form"]);
  hideIDs(["displayArea", "att_cancel_tab", "att_misdirect_tab"])
  setTop("att_delegate_tab");
  setValue("att_delegate_form", 0, getID("notes_form").elements[0].value);
  setValue("att_delegate_form", 1, getID("notes_form").elements[4].value);
  setValue("att_delegate_form", 4, getID("notes_form").elements[1].value);
  //moveFormHalvesStart("att_delegate_form",8,"att_delegate_last",170);
}
function createNotes() {
  var text = "";
  var notes = getID("notes_form");
  text += getValue(notes, 0, " ", "\n");
  text += getValue(notes, 1, " ", "\n");
  text += getValue(notes, 2, " ", "\n");
  if (notes.elements[3].value != "")
    text += getValue(notes, 3, " ", "\n");
  text += getValue(notes, 4, " ", "\n");
  text += getValue(notes, 5, " ", "\n");
  text += getValue(notes, 6, " ", "\n\n");
  text += getValue(notes, 7, "\n", "\n\n");
  text += getValue(notes, 8, "\n", "\n\n");
  text += getValue(notes, 9, "\n", "\n\n");
  text += getValue(notes, 10, "\n", "\n\n");
  text += getValue(notes, 11, "\n", "");
  displayForm("notes_form", text, "left", true);
}
function createResponse() {
  getID("remedyURL").style.display = "none";
  setChannel(getID("responseChannel").selectedIndex);
  if (getID("remedyURL").elements[2].checked) {
    var incident = getID("remedyURL").elements[0].value;
    var userID = getID("remedyURL").elements[1].value;
    channelInfo = "Verio Customer Care\nhttps://support.verio.com/remedy/?incid=" + incident +
      "&acctid=" + userID + "\n(888)663-6648\n\nVisit our support site at http://support.verio.com";
  }
  var form = getID("response_form");
  var response = "Hello " + form.elements[0].value + ",\n\n" +
    "Thank you for contacting " + channelName + " Web Hosting Customer Care.\n\n" +
    "I have duplicated the reported issue regarding:\n\n" +
    "===========================================\n\n" +
    form.elements[1].value + "\n\n" +
    "===========================================\n\n" +
    "I have determined that further research is required. " +
    "I am currently working on this issue for you but will need " +
    "more time to research this matter. Please be advised that " +
    "these cases are handled with diligence and most are answered " +
    "within 24 hours. I will make sure you are notified via e-mail " +
    "as soon as we have an answer for you.\n\nThank you for your " +
    "patience as I work to address this issue for you. For reference, " +
    "your Technical Support case number is:\n\n" +
    form.elements[2].value + "\n\n" +
    "Let us know if you have any questions or need additional assistance.\n\n" +
    "Regards,\n\n" + form.elements[3].value + "\n" + channelInfo;
  displayForm("response_form", response);
}
function createTitle() {
  var form = getID("title_form");
  var sevIndex = form.elements[0].selectedIndex;
  var sevValue = form.elements[0].options[sevIndex].value;
  var urgIndex = form.elements[1].selectedIndex;
  var urgValue = form.elements[1].options[urgIndex].value;
  var priority = Number(sevValue) + Number(urgValue);
  var server = form.elements[2].value;
  var userid = form.elements[3].value;
  var platform = form.elements[4].value;
  var description = form.elements[5].value;
  var title = "Pri " + priority + " = (Imp " + sevValue + " + Urg " + urgValue + ") - " + platform + " - " + server + ", " + userid + " - " + description;
  hideIDs(["title_form"]);
  setValue("title", 0, title);
  showIDs(["title"]);
  getID("title").elements[0].select();
}
function createBody() {
  displayForm("body_form", create("body_form"), "left", true);
}
function createDomreg() {
  displayForm("domreg_form", create("domreg_form"), "left", true);
}
function createEmail() {
  getID("remedyURL").style.display = "none";
  setChannel(getID("emailChannel").selectedIndex);
  if (getID("remedyURL").elements[2].checked) {
    var incident = getID("remedyURL").elements[0].value;
    var userID = getID("remedyURL").elements[1].value;
    channelInfo = "Verio Customer Care\nhttps://support.verio.com/remedy/?incid=" + incident +
      "&acctid=" + userID + "\n(888)663-6648\n\nVisit our support site at http://support.verio.com";
  }
  var form = getID("email_form");
  var email = "Hello " + form.elements[0].value + ",\n\n" +
    "Thank you for contacting " + channelName + " Web Hosting Customer Care. " +
    "You contacted us regarding " + form.elements[1].value + ".\n\n" +
    "I apologize for any inconvenience you might have experienced with this issue.\n\n" +
    form.elements[2].value + "\n\n" +
    "If you have any questions or concerns, please let us know. We are here 24 hours 7 days a week.\n\n" +
    "Kind regards,\n\n" + form.elements[3].value + "\n" + channelInfo;
  displayForm("email_form", email, "left", true);
}
function showRemedyURL(channel) {
  if (channel == "emailChannel") {
    getID("remedyURL").style.top = "479px";
    getID("remedyURL").style.left = "140px";
  }
  var type = getID(channel).selectedIndex;
  if (type == 0 || type == 1)
    showIDs(["remedyURL"]);
  else
    hideIDs(["remedyURL"]);
}
function createATTMisdirect() {
  hideIDs(["att_phone"]);
  displayForm("att_misdirect_form", create("att_misdirect_form"), "left", true);
}
function createATTCancel() {
  var form = getID("att_cancel_form");
  var text = "Hello " + form.elements[0].value + ",\n\n" +
    "Thank you for contacting AT&T Web Hosting Customer Service. " +
    "You contacted us regarding " + form.elements[1].value + ".\n\n" +
    "We regret any inconvenience you might have experienced with this issue. " +
    "In response to your request, the web hosting account for " +
    form.elements[2].value + " has been canceled effective " + form.elements[3].value + ".\n\n";
  var type = getID("att_CancelType").selectedIndex;
  if (type == 0)
    ;
  else if (type == 1) {
    text += "Our records show that you also have the domain registration product on this account." +
            "Therefore with the web hosting canceled, your account will be downgraded and remain active " +
            "as a domain registration only account.\n\nIf you do not wish to keep the domain registration, " +
            "please reply to this email authorizing us not to renew it (non-renew).\n\n";
  }
  else {
    text += "In addition, the Domain Name Registration has also been set to not renew at the next renewal date " +
    form.elements[5].value + ".\n\n";
  }
  var refund = getID("att_CancelRefund").selectedIndex;
  if (refund == 0)
    text += "If a refund is due, you will receive it within 60-90 days. ";
  else if (refund == 1) {
    text += "Please be advised that your request is past the " + form.elements[7].value +
						" renewal date, therefore no refund will be issued for this cancelation. " +
						"If your payment method is Billing Telephone Number (BTN), this last charge was " +
						"already exported to your local telephone office and it may take 60-90 days " +
						"to be reflected on your phone bill statement.\n\n";
  }
  else {
    text += "Please be advised that the cancelation falls within the first 30 days of service. " +
						"Therefore you will be given a full refund, excluding mandatory setup fees, ala carte " +
						"items and applicable domain registration fees. If your payment method is Billing Telephone " +
						"Number (BTN), it may take 60-90 days for this change to be reflected on your phone bill statement.";
  }

  text += "To view AT&T web hosting refund policy, please visit:\n\nhttp://webhosting.att.com/Terms-Conditions.aspx\n\n" +
          "We apologize for any inconvenience and thank you for choosing AT&T Web Hosting.\n\n" +
  form.elements[8].value + "\n" + att;
  displayForm("att_cancel_form", text);
}
function createATTDelegate() {
  text = create("att_delegate_form");
  displayForm("att_delegate_form", text, "left", true);
}
function showDNRRenewDate() {
  var type = getID("att_CancelType").selectedIndex;
  if (type == 2)
    showIDs(["att_dnrRenewDate"]);
  else
    hideIDs(["att_dnrRenewDate"]);
}
function showHostingRenewDate() {
  var type = getID("att_CancelRefund").selectedIndex;
  if (type == 1)
    showIDs(["att_hostingRenewDate"]);
  else
    hideIDs(["att_hostingRenewDate"]);
}
function setChannel(index) {
  if (index == 0) {
    channelName = "Verio";
		channelInfo = verioAutobahn;
  }
  else if (index == 1) {
    channelName = "Verio";
    channelInfo = verioNimbus;
  }
  else if (index == 2) {
    channelName = "Rapidsite";
    channelInfo = rapidsite;
  }
  else if (index == 3) {
    channelName = "viaVerio";
    channelInfo = viaVerio;
  }
  else {
    channelName = "AT&T";
    channelInfo = att;
  }
}
function create(tab) {
  var text = "";
  var form = getID(tab);
  var att_form = /att_/;
  var att = att_form.test(tab);
  for (var i = 0; i < form.length; i++) {
    var contents = form.elements[i].value;
    if (contents != "") {
      text += form.elements[i].name;
      if (att)
        text += " ";
      else
        text += "\n";
      text += contents + "\n\n";
    }
  }
  return text;
}
// This is for the animation that occurs after creating a form. It required a lot of trial 
// and error to get the numbers right. I wrote it awhile ago and I forget exactly how it 
// works and I don't feel like going back and figuring it out again to be able to explain it clearly.
function displayForm(form, text, direction, large) {
  hideIDs([form]);
  showIDs(["displayArea"]);
  setValue("displayArea", 0, text);
  getID("displayArea").elements[0].select();
  displayDirection = direction;
  if (large) {
    topCorner = 675;
    rowsAmount = 50;
    topDec = 13;
  }
  else {
    topCorner = 255;
    rowsAmount = 23;
    topDec = 10;
  }
  createDisplay();
}
function createDisplay() {
  if (rowsContinue) {
    if (rows == rowsAmount) {
      rowsContinue = false;
      rows = 0;
    }
    else {
      rows++;
      getID("textDisplay").rows = rows;
      topCorner -= topDec;
      getID("displayArea").style.top = topCorner + "px";
      if (displayDirection == "right")
        leftCorner -= 10;
      getID("displayArea").style.left = leftCorner + "px";
    }
  }
  if (colsContinue) {
    if (cols == 48) {
      colsContinue = false;
      cols = 0;
    }
    else {
      cols += 2;
      getID("textDisplay").cols = cols;
    }
  }
  if (!rowsContinue && !colsContinue) {
    clearTimeout(displayEnlarge);
    rowsContinue = true;
    colsContinue = true;
  }
  else
    displayEnlarge = setTimeout("createDisplay()", 15);
}
function clear(tab) {
  var form = document.getElementById(tab + "_form");
  for (var i = 0; i < form.length; i++)
    form.elements[i].value = "";
}
// These are some helper functions.
function getID(div) {
  return document.getElementById(div);
}
function hideIDs(list) {
  for (var i=0; i<list.length; i++)
    getID(list[i]).style.display = "none";
}
function showIDs(list) {
  for (var i=0; i<list.length; i++)
    getID(list[i]).style.display = "block";
}
function setTop(id) {
  getID(id).style.top = "8px";
}
function setValue(id, el, val) {
  getID(id).elements[el].value = val;
}
function getValue(id, el, sep1, sep2) {
  return id.elements[el].name + sep1 + id.elements[el].value + sep2;
}
// I'm most proud of this feature. It's most useful and it was fun to write. If you want to change the color,
// just change backgroundColor and alertColor to your preference where the variables are initialized.
function holdStart() {
  hideIDs(["hold"]);
  showIDs(["stop"]);
  holdCount();
}
function holdCount() {
  if (!holdOn) {
    if (seconds == 60) {
      minutes++;
      if (minutes == 2)
        alertStart();
      seconds = 0;
    }
    if (seconds < 10)
      getID("time").innerHTML = minutes + ":0" + seconds;
    else
      getID("time").innerHTML = minutes + ":" + seconds;
    seconds++;
    hold = setTimeout("holdCount()", 1000);
  }
}
function stop() {
  clearTimeout(hold);
  holdOn = false;
  clearTimeout(alert);
  black = true;
  seconds = 0;
  minutes = 0;
  getID("background").style.backgroundColor = backgroundColor;
  showIDs(["hold"]);
  hideIDs(["stop"]);
  getID("time").innerHTML = "";
}
function alertStart() {
  if (black) {
    getID("background").style.backgroundColor = alertColor;
    black = false;
  }
  else {
    getID("background").style.backgroundColor = backgroundColor;
    black = true;
  }
  alert = setTimeout("alertStart()", 500);
}

var noticeBlock = false;
var noticeCount = 0;

function showNotice() {
  if (noticeBlock) {
    hideIDs(["notice"]);
    noticeBlock = false;
  }
  else {
    showIDs(["notice"]);
    noticeBlock = true;
  }
  if (noticeCount++ == 120)
    getID("background").innerHTML = "Why do you refuse to click on notice?";
  notice = setTimeout("showNotice()", 500);
}
function displayNotice() {
  notice = "I will be leaving Verio Friday, Nov. 11. So, I imagine paco will be decommissioned shortly" +
    " thereafter. If you want to continue to use my tool, follow these steps:\n\n" +
    "OK, right-click, view source, ctrl-a, ctrl-c, window-r, notepad, enter, ctrl-v, ctrl-s, " +
    "something.html, alt-f4, ctrl-o, open something.html.\n\n" +
    "If you don't want this notice to appear, comment out the showNotice() line in the start() function.";
  alert(notice);
}