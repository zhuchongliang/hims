import useLoginStore from "@/stores/user/index";

export default function setUpStore() {
  const userStore = useLoginStore();
  userStore.loadLoginCache();
}
