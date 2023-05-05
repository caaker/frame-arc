/**************************************************************************************************
 * requires access to browser
/**************************************************************************************************/

const browser = {};

browser.scrollToHash = function(delay = 0, offset = 0) {
  window.setTimeout(() => {
    const hash = document.location.hash.slice(1);
    if(!hash) {
      return;
    }
    const element = document.getElementById(hash);
    if(!element) {
      return;
    }
    window.scrollTo({
      top: element.getBoundingClientRect().top - offset,
      behavior: 'smooth'
    });
  }, delay);
};

browser.copyToClipboard = function(text_to_copy) {
  const input = document.createElement('input');
  input.style='position:absolute;opacity:0';
  input.value = text_to_copy;
  document.body.append(input);
  input.select();
  document.execCommand('copy');
  input.remove();
};

export default browser;