chrome.tabs.executeScript(null, {file: "content_script.js"});
var demo_link; // Creating a global variable
chrome.runtime.onMessage.addListener(function(result) {
  if (result.length > 1) {
      demo_link = result[0];
      renderStatus(result[0], result[1], result[2]);
  } else if (result.length == 1){
        document.getElementById('custom_message').innerHTML = result[0];
        toggleMe('capture-menu1', 'none');
        toggleMe('capture-menu2', 'block');
      }
});

function toggleMe(element_id, value='none'){
  document.getElementById(element_id).style.display = value;
}

function renderStatus(demo_url, framework, module_title) {
    document.getElementById('10').href = demo_url;
    document.getElementById('txt_copy').value = demo_url;
    document.getElementById('module_name').innerHTML = module_title;
    document.getElementById('odoo_version').innerHTML = framework;
    toggleMe('capture-menu', 'block');
    toggleMe('capture-menu1', 'none');
}

function getLinkWithLifetime(id) {
  var lifetime = document.getElementById('lifetime').value;
  lifetime = lifetime.match(/\d+/)[0]; //Get only numbers from the string
  var element = document.getElementById(id);
  // Add 'lifetime' only for prestashopdemo site
  if (element.href.indexOf('prestashopdemo') !== -1) {
    if (lifetime == "") {
        element.href = demo_link+"&lifetime=5";
    } else {
        element.href = demo_link+"&lifetime="+lifetime;
    }
  }
}

// When click to see the demo, update lifetime in URL
var id_demo_link = document.getElementById('10');
id_demo_link.addEventListener('click', function(e) {
  getLinkWithLifetime('10');
});

// Copy demo link
var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
copyTextareaBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // @todo::use getLinkWithLifetime() function
  var lifetime = document.getElementById('lifetime').value;
  lifetime = lifetime.match(/\d+/)[0]; //Get only numbers from the string
  var link_copy = document.getElementById("txt_copy");
  if (link_copy.value.indexOf('prestashopdemo') !== -1) {
    if (lifetime == "") {
      link_copy.value = demo_link+"&lifetime=5";
    } else {
      link_copy.value = demo_link+"&lifetime="+lifetime;
    }
  } // --> till here
  var text_copy = document.getElementById("txt_copy");
  text_copy.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    self.close()
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});