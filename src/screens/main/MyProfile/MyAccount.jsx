/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import { getImageUrl } from '../../../redux/constant';
import AppButton from '../../../components/AppButton';
import {
  useDeleteUserMutation,
  useLazyGetUserDetailQuery,
} from '../../../redux/services/mainService';
import Loader from '../../../components/Loader';
import ImagePicker from 'react-native-image-crop-picker';

const MyAccount = () => {
  const [image, setImage] = useState('');
  const [getUserDetail, { data: userData, isLoading }] =
    useLazyGetUserDetailQuery();
  const [deleteUser, { isLoading: deleteLoader }] = useDeleteUserMutation();

  const data = useMemo(() => {
    if (!userData?.user) return [];

    return [
      {
        id: 1,
        title: 'Email',
        subTitle: userData.user.email,
        isShowBadge: true,
      },
      {
        id: 2,
        title: 'Phone number',
        subTitle: userData.user.phone || '090078601',
      },
      {
        id: 3,
        title: 'Unique ID',
        subTitle: `#${userData.user._id.slice(-4)}`,
      },
    ];
  }, [userData]);

  useEffect(() => {
    getUserDetail();
  }, []);

  const deleteAccount = async () => {
    await deleteUser()
      .unwrap()
      .then(res => {
        console.log('delete account response ===>', res);
        ShowToast(res?.message);
      })
      .catch(error => {
        ShowToast(error?.data?.message || 'Some problem occured');
        console.log('error while deleting the account ===>', error);
      });
  };

  const onConfirmation = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteAccount();
          },
        },
      ],
      { cancelable: true },
    );
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      ?.then(res => {
        console.log('res in selectImage:-', res);
        // setImage(res);
      })
      ?.catch(err => {
        console.log('err in selectImage', err);
      });
  };

  console.log('userData:-', userData);
  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppHeader
          onBackPress={true}
          heading={'My Account'}
        // rightIcon={
        //   <Entypo
        //     name="dots-three-vertical"
        //     size={responsiveFontSize(2)}
        //     color={AppColors.ThemeColor}
        //   />
        // }
        />
        {isLoading ? (
          <View style={{ marginVertical: responsiveHeight(4) }}>
            <Loader color={AppColors.ThemeColor} />
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                gap: responsiveWidth(3),
                alignItems: 'center',
                backgroundColor: AppColors.app_light,
                paddingHorizontal: responsiveWidth(3),
                paddingVertical: responsiveHeight(2),
                borderRadius: 15,
              }}
            >
              <Image
                source={
                  userData?.user?.profile
                    ? { uri: getImageUrl(userData?.user.profile, 'profile') }
                    : AppImages.userprofile
                }
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 45,
                  // backgroundColor: AppColors.light_themeColor,
                }}
              />
              <View>
                <AppText
                  title={`${userData?.user.firstName || ''} ${userData?.user.lastName || ''
                    }`}
                  textSize={2}
                  textColor={AppColors.ThemeColor}
                  textFontWeight
                />
                <AppText
                  title={`#${userData?.user._id.slice(-4)}`}
                  textSize={1.6}
                  textColor={AppColors.ThemeColor}
                />
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => selectImage()}
                  style={{
                    borderWidth: 1,
                    borderColor: AppColors.ThemeColor,
                    paddingHorizontal: responsiveWidth(4),
                    paddingVertical: responsiveHeight(1),
                    borderRadius: 100,
                  }}
                >
                  <AppText
                    title={'Change Image'}
                    textSize={1.6}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                  />
                </TouchableOpacity>
              </View>
            </View>

            <LineBreak space={2} />

            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: AppColors.LIGHTGRAY,
                    paddingVertical: responsiveHeight(2),
                    flexDirection: 'row',
                  }}
                >
                  <View>
                    <AppText
                      title={item.title}
                      textSize={2}
                      textColor={AppColors.BLACK}
                      textFontWeight
                    />
                    <AppText
                      title={item.subTitle}
                      textSize={1.6}
                      textColor={AppColors.BLACK}
                    />
                  </View>
                  {item.isShowBadge && (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        gap: responsiveWidth(2),
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      <SVGXml icon={AppIcons.correct} width={15} height={15} />
                      <AppText
                        title={'Verified User'}
                        textSize={1.6}
                        textColor={AppColors.ThemeColor}
                      />
                    </View>
                  )}
                </View>
              )}
            />
            <LineBreak space={2} />

            <AppButton
              title={'Delete Account'}
              borderWidth={2}
              borderColor={AppColors.RED_COLOR}
              textColor={AppColors.RED_COLOR}
              indicator={deleteLoader}
              handlePress={() => onConfirmation()}
              indicatorColor={AppColors.RED_COLOR}
              btnBackgroundColor={AppColors.WHITE}
            />
          </>
        )}
      </View>
    </Container>
  );
};

export default MyAccount;
