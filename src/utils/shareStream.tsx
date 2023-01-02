import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Share} from 'react-native';

export const shareStream = async (streamId: string) => {
  console.log(streamId);

  try {
    var link = await dynamicLinks().buildShortLink(
      {
        link: `https://heartlive.page.link/stream/${streamId}`,
        domainUriPrefix: 'https://heartlive.page.link',
        android: {
          packageName: 'com.heartlive',
          // minimumVersion: '18',
        },
        // ios: {
        //   appStoreId: '1619708498',
        //   bundleId: 'com.fairtoss.com',
        //   minimumVersion: '18',
        // },
      },
      dynamicLinks.ShortLinkType.DEFAULT,
    );
    await Share.share({
      title: 'HeartLive Stream',
      message: 'Hey, Join this live stream ' + link,
      url: link,
    });
  } catch (error) {
    console.log('error raised', error);
  }
};
