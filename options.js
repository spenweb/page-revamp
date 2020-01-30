// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

function constructDomainManager(container, selectedDomains) {
  let textarea = document.createElement("textarea");

  textarea.addEventListener("change", function(e) {
    const domains = filterDomains(e.target.value);
    chrome.storage.sync.set(
      { [STORAGE_KEYS.selectedDomains]: domains },
      function() {
        console.log({ domains });
      }
    );
  });

  textarea.value = selectedDomains.join("\n");

  container.appendChild(textarea);
}

const filterDomains = uncleanDomains => {
  let domains = [];
  const splitted = uncleanDomains.split("\n");
  domains = splitted;
  return domains;
};
chrome.storage.sync.get([STORAGE_KEYS.selectedDomains], function(data) {
  const selectedDomains = data.selectedDomains;
  const domainManagerElm = document.getElementById("domainManagerContainer");
  constructDomainManager(domainManagerElm, selectedDomains);
});
