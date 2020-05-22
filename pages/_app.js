import { RecoilRoot } from "recoil";
import "../css/style.css";

function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default App;
