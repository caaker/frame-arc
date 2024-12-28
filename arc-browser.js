// Functions here require access to the browser

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

browser.copyToClipboard = async function(text_to_copy) {
  try {
    await navigator.clipboard.writeText(text_to_copy);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

export default browser;
