export default {
  beforMount(el: any, binding: any) {
    el.clickOutsideEvent = function (event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    // Attach the event listener to the document
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    // Remove the event listener from the document
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
