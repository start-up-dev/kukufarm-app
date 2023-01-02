import React, {useState} from 'react';
import {
  Modal,
  Platform,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Icons} from 'icon/icons';
import {theme} from 'styles/theme';

interface IProps {
  images: string[];
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ImagePreview: React.FC<IProps> = ({images, children, style}) => {
  const [modal, setModal] = useState(false);

  const imageArray = images.map(image => {
    return {
      url: image,
    };
  });

  return (
    <>
      <Modal visible={modal} transparent={true}>
        <Icons.Close
          onPress={() => setModal(false)}
          size={30}
          color={theme.colors.white}
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 55 : 10,
            right: Platform.OS === 'ios' ? 20 : 10,
            zIndex: 1,

            // margin: 25,
          }}
        />
        <ImageViewer
          renderIndicator={() => <View />}
          enableSwipeDown
          onSwipeDown={() => setModal(false)}
          imageUrls={imageArray}
        />
      </Modal>
      <TouchableOpacity onPress={() => setModal(true)} style={style}>
        {children}
      </TouchableOpacity>
    </>
  );
};

export default ImagePreview;
