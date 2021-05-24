import { Platform } from 'react-native';  

const nativeAdPlacementId = Platform.OS === 'android' ? '327887315427772_327888135427690': '327887315427772_327953252087845';
const bannerAdPlacementId = Platform.OS === 'android' ? '327887315427772_327887595427744' : '327887315427772_327949098754927';
const InterstitialAdPlacementId = Platform.OS === 'android' ? '327887315427772_327887995427704' : '327887315427772_327952918754545';

export { nativeAdPlacementId, bannerAdPlacementId, InterstitialAdPlacementId };