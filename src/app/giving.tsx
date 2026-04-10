import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const url =
  "https://pushpay.com/g/immanuelanglican?campusId=&clickOrigin=&itemId=&src=in-app";

export default function Giving() {
  const insets = useSafeAreaInsets();
  return (
    <WebView style={{ flex: 1, marginTop: insets.top }} source={{ uri: url }} />
  );
}
