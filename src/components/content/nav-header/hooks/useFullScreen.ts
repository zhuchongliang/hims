import { ref } from "vue"
import type { Ref } from "vue";
export default function useFullScreen(): [Ref<boolean>, () => void] {
  const isFullscreen = ref(false);
  function setFullScreen() {
    const element = document.documentElement;
    if (!isFullscreen.value) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    isFullscreen.value = !isFullscreen.value;
  }
  return [isFullscreen, setFullScreen];
}
