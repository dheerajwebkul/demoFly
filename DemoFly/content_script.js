var baseURI = window.location.href;
var result = false;
var module_title, demoUrl, category;
Array.prototype.contains = function ( needle ) {
   for (i in this) {
      if (this[i] == needle) return true;
   }
   return false;
}
try {
	if ((baseURI.startsWith("https://www.webkul.com")) || (baseURI.startsWith("https://store.webkul.com"))) {
		try {
			//module_title = document.getElementsByClassName('product-name')[0].innerText;
			module_title = document.title.split("|")[0];
			module_title = module_title.split("-")[0];
			demoUrl = document.getElementsByClassName('wk-demo-button')[0].children[0].getAttribute("href");
			if (demoUrl == "#") {
				demoUrl = "http://prestashopdemo.webkul.com/waiting?step=2&version=latest&module="+module_title;
			}

			// Get Module Category from Breadcrumbs
			category = document.getElementsByClassName('grid-full breadcrumbs')[0].innerText.split('/')[1];
			result = [demoUrl, category, module_title];
		} catch(err) {
			result = ["You need to go on product page in order to check demo."];
		}
	}
} catch (err) {
	console.error(err);
} finally {
	chrome.runtime.sendMessage(result);
}