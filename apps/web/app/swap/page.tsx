import dynamic from "next/dynamic";

export default dynamic(() => import("./swap"), {
  ssr: false,
});
