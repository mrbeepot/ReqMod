function getMasterSwitchCheckBox() {
    console.log("getMasterSwitchCheckBox()");
    return document.getElementById("master-switch-checkbox");
}

function saveMasterSwitchState() {
    console.log("saveMasterSwitchState()");
    let masterSwitchCheckBox = getMasterSwitchCheckBox();
    if(masterSwitchCheckBox.checked) {
        console.log("saveMasterSwitchState() true");
        browser.storage.sync.set({masterSwitchStateFlag: true});
    } else {
        console.log("saveMasterSwitchState() false");
        browser.storage.sync.set({masterSwitchStateFlag: false});
    }
}

function restoreMasterSwitchState() {
    console.log("restoreMasterSwitchState()");
    let currentState = browser.storage.sync.get("masterSwitchStateFlag");
    currentState.then(setMasterSwitch, onErrorFetchingMastSwitchState);
}

function setMasterSwitch(state) {
    console.log("setMasterSwitch()");
    let masterSwitchCheckBox = getMasterSwitchCheckBox();
    if(state !== undefined && state !== null) {
        masterSwitchCheckBox.checked = state.masterSwitchStateFlag;
    } else {
        masterSwitchCheckBox.checked = false;
    }
}

function onErrorFetchingMastSwitchState(error) {
    console.log("ReqMod: error fetching the master switch state.\n" + JSON.parse(error));
}

function openSettingsPage() {
    console.log("openSettingsPage()");
    let masterSwitchCheckBox = getMasterSwitchCheckBox();
    if(masterSwitchCheckBox.checked) {
        console.log("openSettingsPage() checked");
        let settingsPageUrl = browser.runtime.getURL("./settings.html");
        let settingsPageWindow = window.open(settingsPageUrl, "_blank");
        settingsPageWindow.focus();
    }
}

getMasterSwitchCheckBox().addEventListener("click", saveMasterSwitchState);
document.getElementById("open-settings-page-submit").addEventListener("click", openSettingsPage);
document.addEventListener("DOMContentLoaded", restoreMasterSwitchState);