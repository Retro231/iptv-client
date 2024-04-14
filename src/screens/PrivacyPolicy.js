import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header/Header';

const PrivacyPolicy = () => {
  const redirectToGmail = receiverEmail => {
    const gmailURL = `mailto:${receiverEmail}`;

    Linking.canOpenURL(gmailURL)
      .then(supported => {
        if (supported) {
          Linking.openURL(gmailURL);
        } else {
          // Fallback to web URL
          Linking.openURL(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${receiverEmail}`,
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  return (
    <>
      <Header goBackTo={'oneStep'} />
      <View style={styles.container}>
        <Text style={styles.title}>Privacy Policy: </Text>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              <Text style={{fontWeight: 'bold'}}>Retrosoft Mobile Studio</Text>{' '}
              built the USA NEWS IPTV Info app as a Free app. This SERVICE is
              provided by Retrosoft Mobile Studio at no cost and is intended for
              use as is. This page is used to inform visitors regarding my
              policies with the collection, use, and disclosure of Personal
              Information if anyone decided to use my Service. If you choose to
              use my Service, then you agree to the collection and use of
              information in relation to this policy. The Personal Information
              that I collect is used for providing and improving the Service. I
              will not use or share your information with anyone except as
              described in this Privacy Policy. The terms used in this Privacy
              Policy have the same meanings as in our Terms and Conditions,
              which are accessible at UK Work Permit Info unless otherwise
              defined in this Privacy Policy.
            </Text>
            <Text style={styles.contentTitle}>
              Information Collection and Use
            </Text>
            <Text style={styles.contentText}>
              For a better experience, while using our Service, I may require
              you to provide us with certain personally identifiable
              information, including but not limited to Nothing. The information
              that I request will be retained on your device and is not
              collected by me in any way. The app does use third-party services
              that may collect information used to identify you. Link to the
              privacy policy of third-party service providers used by the app
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              {'\u2022'} Google Play Services
            </Text>
            <Text style={styles.contentTitle}>Log Data</Text>
            <Text style={styles.contentText}>
              I want to inform you that whenever you use my Service, in the case
              of an error in the app I collect data and information (through
              third-party products) on your phone called Log Data. This Log Data
              may include information such as your device Internet Protocol
              (“IP”) address, device name, operating system version, the
              configuration of the app when utilizing my Service, the time and
              date of your use of the Service, and other statistics.
            </Text>
            <Text style={styles.contentTitle}>Cookies</Text>
            <Text style={styles.contentText}>
              Cookies are files with a small amount of data that are commonly
              used as anonymous unique identifiers. These are sent to your
              browser from the websites that you visit and are stored on your
              device's internal memory. This Service does not use these
              “cookies” explicitly. However, the app may use third-party code
              and libraries that use “cookies” to collect information and
              improve their services. You have the option to either accept or
              refuse these cookies and know when a cookie is being sent to your
              device. If you choose to refuse our cookies, you may not be able
              to use some portions of this Service.
            </Text>

            <Text style={styles.contentTitle}>Service Providers</Text>
            <Text style={styles.contentText}>
              I may employ third-party companies and individuals due to the
              following reasons:
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              {'\u2022'} To facilitate our Service;
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              {'\u2022'} To provide the Service on our behalf;
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              {'\u2022'} To perform Service-related services; or
            </Text>
            <Text style={[styles.contentText, {marginTop: -15}]}>
              {'\u2022'} To assist us in analyzing how our Service is used.
            </Text>
            <Text style={styles.contentText}>
              I want to inform users of this Service that these third parties
              have access to their Personal Information. The reason is to
              perform the tasks assigned to them on our behalf. However, they
              are obligated not to disclose or use the information for any other
              purpose.
            </Text>
            <Text style={styles.contentTitle}>Security</Text>
            <Text style={styles.contentText}>
              I value your trust in providing us your Personal Information, thus
              we are striving to use commercially acceptable means of protecting
              it. But remember that no method of transmission over the internet,
              or method of electronic storage is 100% secure and reliable, and I
              cannot guarantee its absolute security.
            </Text>
            <Text style={styles.contentTitle}>Links to Other Sites</Text>
            <Text style={styles.contentText}>
              This Service may contain links to other sites. If you click on a
              third-party link, you will be directed to that site. Note that
              these external sites are not operated by me. Therefore, I strongly
              advise you to review the Privacy Policy of these websites. I have
              no control over and assume no responsibility for the content,
              privacy policies, or practices of any third-party sites or
              services.
            </Text>
            <Text style={styles.contentTitle}>Children’s Privacy</Text>
            <Text style={styles.contentText}>
              These Services do not address anyone under the age of 13. I do not
              knowingly collect personally identifiable information from
              children under 13 years of age. In the case I discover that a
              child under 13 has provided me with personal information, I
              immediately delete this from our servers. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact me so that I will be able to
              do the necessary actions.
            </Text>
            <Text style={styles.contentTitle}>
              Changes to This Privacy Policy
            </Text>
            <Text style={styles.contentText}>
              I may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. I will
              notify you of any changes by posting the new Privacy Policy on
              this page. This policy is effective as of 2024-02-22
            </Text>
            <Text style={styles.contentTitle}>Contact Us</Text>
            <Text style={styles.contentText}>
              If you have any questions or suggestions about my Privacy Policy,
              do not hesitate to contact me at{' '}
              <Text
                style={{color: 'blue', textDecorationLine: 'underline'}}
                onPress={() => redirectToGmail('retrosoft.mob@gmail.com')}>
                retrosoft.mob@gmail.com
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    color: '#039EBD',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  content: {
    gap: 10,
    marginBottom: 10,
  },
  contentTitle: {
    textAlign: 'justify',
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginBottom: -12,
  },
  contentText: {
    textAlign: 'justify',
    marginHorizontal: 10,
    fontWeight: '400',
    color: 'black',
    fontSize: 14,
  },
});
