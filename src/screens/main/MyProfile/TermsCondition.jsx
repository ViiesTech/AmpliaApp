import React from 'react';
import { View } from 'react-native';
import Container from './../../../components/Container';
import { AppColors, responsiveWidth } from '../../../utils';
import AppHeader from './../../../components/AppHeader';
import AppText from '../../../components/AppText';

const TermsCondition = () => {
  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Terms & Condition'} />

        <AppText
          title={
            'Lorem ipsum odor amet, consectetuer adipiscing elit. Habitasse interdum fermentum efficitur felis volutpat ridiculus vel fermentum. Class hendrerit sollicitudin venenatis adipiscing at ridiculus rhoncus nibh. Consectetur at dignissim mattis enim, purus fames dapibus. Litora non est dignissim natoque aenean vulputate. Lobortis a mus fermentum posuere euismod et.   Laoreet penatibus ornare class hendrerit placerat. Enim himenaeos pulvinar sagittis taciti risus ante.Varius arcu eleifend sit congue sit. Tempus et varius habitasse sed placerat. Class ad curabitur ornare ad vestibulum ad ipsum pharetra maximus. Volutpat rhoncus risus aenean facilisis fusce montes maecenas vulputate. Nam magna luctus conubia nulla imperdiet orci. Pharetra suscipit pellentesque vivamus purus metus eget. Ut magnis aliquet nostra dignissim sociosqu tincidunt elit. Primis venenatis torquent sollicitudin rhoncus fringilla libero ante. Purus posuere quam leo, cursus sem erat adipiscing ligula. Iaculis conubia faucibus suspendisse nunc; nec nisi luctus. Lectus dictum adipiscing inceptos hac ac. Himenaeos placerat elementum quisque augue maximus integer. Est nam urna class porttitor primis. Velit integer id cubilia lectus nisi per est molestie. Fames magnis metus ridiculus egestas suspendisse. Massa habitant conubia sodales ultrices sem vivamus. Enim dis ipsum placerat venenatis senectus faucibus euismod. Primis pellentesque rutrum nibh facilisi etiam himenaeos pulvinar. Proin netus dui luctus hac urna inceptos tellus. Turpis potenti iaculis iaculis dolor; mollis praesent eu praesent diam. Senectus mi augue et donec orci hac ultrices leo. Tincidunt nunc malesuada litora lacus pretium habitasse libero cursus suscipit. Eleifend interdum duis ipsum nibh netus suspendisse dui quisque. Nascetur vel conubia eleifend dapibus taciti.'
          }
          textSize={1.6}
          textColor={AppColors.GRAY}
          lineHeight={2.2}
        />
      </View>
    </Container>
  );
};

export default TermsCondition;
