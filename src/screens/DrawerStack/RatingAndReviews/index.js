import React, {useCallback, useState} from 'react';
import {View, Image, FlatList, ScrollView} from 'react-native';
// import * as Progress from 'react-native-progress';
import {Rating} from 'react-native-ratings';
import {styles} from './styles';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import RobotoMedium from '../../../components/Wrappers/Text/RobotoMedium';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import {icons, images} from '../../../assets';
import theme from '../../../utils/theme';
import {getAllRidesData} from '../../../Redux/Actions/rider';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
const UserReview = data => {
  const date = new Date(data?.data?.createdAt);

  return (
    // <View>
    <View style={styles.userContainer}>
      <View style={styles.profileImageContainer}>
        <Image source={images.userImage} style={styles.userIcon} />
      </View>
      <View style={styles.userRatingDetails}>
        <View style={styles.usernameContainer}>
          <GilroyRegular style={styles.userNameText}>
            {data?.data?.user?.firstName
              ? data?.data?.user?.firstName + ' ' + data?.data?.user?.lastName
              : 'Guest User'}
          </GilroyRegular>
          <GilroyRegular style={styles.dateText}>
            {date.toLocaleDateString()}
          </GilroyRegular>
        </View>

        <View style={styles.ratingContainer}>
          <Rating
            type="star"
            ratingCount={data?.data?.rating ? data?.data?.rating : 4}
            ratingImage={icons.Stars}
            imageSize={vh * 2}
            readonly={true}
            startingValue={5}
            // style={styles.starRating}
          />
        </View>
        <GilroyMedium style={styles.reviewParaText}>
          {data?.data?.review}
        </GilroyMedium>
        {/* <RobotoMedium style={styles.readMoreText}>Read More</RobotoMedium> */}
      </View>
    </View>

    //   </View>
  );
};

const ProgressStar = props => {
  return (
    <View style={styles.progressContainer}>
      {/* <GilroyRegular style={styles.starText}>5 Star</GilroyRegular> */}
      <Rating
        type="star"
        ratingCount={5}
        ratingImage={icons.starIcon}
        // ratingColor='#FFF'
        imageSize={vh * 1.4}
        readonly={true}
        startingValue={props?.progress?._id}

        // style={styles.starRating}
      />
      <View>
        {/* <Progress.Bar
          progress={props?.progress?.totalRating}
          color={theme.colors.starYellow}
          borderColor={theme.colors.grayprogress}
          height={vh * 0.8}
          borderRadius={vh * 4}
          width={vw * 60}
          unfilledColor={theme.colors.grayprogress}
        /> */}
      </View>
      <GilroyRegular style={styles.starText}>
        {props?.progress?.totalRating}
      </GilroyRegular>
    </View>
  );
};
const RenderHeader = data => {
  const [progress, setProgress] = useState(0.5);
  return (
    <View style={styles.headerContainer}>
      <GilroyBold style={styles.ratingText}>
        {data?.avgrating ? data?.avgrating.toFixed() : 0}/5
      </GilroyBold>
      <Rating
        type="star"
        ratingCount={5}
        ratingImage={icons.starIcon}
        // ratingColor='#FFF'
        imageSize={vh * 4}
        readonly={true}
        startingValue={data?.avgrating ? data?.avgrating : 0}
        style={styles.starRating}
      />
      <FlatList
        data={data?.ratings}
        renderItem={({item}) => <ProgressStar progress={item} />}
        ListFooterComponent={() => <View style={styles.footerViewRating} />}
      />
    </View>
  );
};

const RatingAndReviews = props => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const [refresh, setRefresh] = useState(false);

  // const [driverdetails, setdriverDetails] = useState()
  console.log('Details form getRides ==>', details?.rating);
  const getData = async () => {
    try {
      const response = await dispatch(getAllRidesData());

      setDetails(response);
    } catch (err) {
      showToast(err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getDataonRefresh = async () => {
    try {
      const response = await dispatch(getAllRidesData(true));
      setDetails(response);
      setRefresh(false);
    } catch (err) {
      showToast(err);
    }
  };

  const onRefreshhandler = () => {
    setRefresh(true);
    getDataonRefresh();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: vh * 5,
        marginTop: vh * 10,
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={details?.rating}
        style={{paddingTop: vh, width: vw * 90, height: '100%'}}
        ListHeaderComponent={() =>
          RenderHeader({
            avgrating: details?.averagerating,
            ratings: details?.reviewCount,
          })
        }
        renderItem={({index, item}) => UserReview({data: item})}
        ListFooterComponent={() => (
          <View
            style={styles.footerView}
            refreshing={refresh}
            onRefresh={onRefreshhandler}
          />
        )}
      />
    </View>
  );
};
export default RatingAndReviews;
