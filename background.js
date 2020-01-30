// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ [STORAGE_KEYS.cleanLinkTarget]: true }, function() {
    console.log('Forcing all internal links have a target of "_self"');
  });
  chrome.storage.sync.set(
    { [STORAGE_KEYS.selectedDomains]: ["pooh.poly.asu.edu"] },
    function() {
      console.log(
        "Setting default selected domains for the extension to apply to."
      );
    }
  );
});

function checkForValidUrl(tabId, changeInfo, tab) {
  console.log({ tab });
  chrome.storage.sync.get(STORAGE_KEYS.selectedDomains, function(data) {
    const selectedDomains = data.selectedDomains ? data.selectedDomains : [];
    selectedDomains.forEach(domain => {
      try {
        if (tab.url !== undefined) {
          const url = tab.url ? tab.url : "";
          if (url.includes(domain)) {
            chrome.pageAction.show(tabId);
          }
        }
      } catch (e) {
        console.log(e, tab);
      }
    });
  });
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
