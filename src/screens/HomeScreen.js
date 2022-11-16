import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../components/TinderCard';

import AnimatedStack from '../components/AnimatedStack';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DataStore, Auth} from 'aws-amplify';
import {User, Match} from '../models';

const HomeScreen = ({isUserLoading}) => {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);
  const [matchesIds, setMatchesIds] = useState([]); // all ids of people who we have already matched

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, u =>
        u.sub('eq', user.attributes.sub),
      );
      if (!dbUsers || dbUsers.length <= 0) {
        setMe(null)
        return;
      }
      setMe(dbUsers[0]);
    };
    getCurrentUser();
  }, [isUserLoading]);

  useEffect(() => {
    if (!me) {
      return;
    }
    const fetchMatches = async () => {
      const result = await DataStore.query(Match, m =>
        m
          .isMatch('eq', true)
          .or(m => m.matchUser1Id('eq', me.id).matchUser2Id('eq', me.id)),
      );
      setMatchesIds(
        result.map(match =>
          Match.matchUser1Id === me.id
            ? match.matchUser2Id
            : match.matchUser1Id,
        ),
      );
    };
    fetchMatches();
  }, [me]);

  useEffect(() => {
    if (isUserLoading || !me) {
      return;
    }
    const fetchUsers = async () => {
      //Json parsing is just required to deal with react Native Reanimated.
      const fetchedUsers = await DataStore.query(User, user =>
        user.hasPet('ne', me.hasPet), // since by definition can't be someone of same type we know that i can't see myself
      );
      fetchedUser = fetchedUsers.filter(u => !matchesIds.includes(u.id))
      userArray = JSON.parse(JSON.stringify(fetchedUsers));

      //Dustenfield Shuffle
      for (let i = userArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [userArray[i], userArray[j]] = [userArray[j], userArray[i]];
      }
      setUsers(userArray); 

    };
    fetchUsers(); // getting data from Amplify no longer hardcoded
  }, [isUserLoading, me]);

  const onSwipeLeft = user => {
    if (!me) {
      return; // do nothing if not signed in
    }
    console.warn('swipe left', user.name);
  };

  const onSwipeRight = async user => {
    if (!me) {
      return;
    }

    const myMatches = await DataStore.query(Match, match =>
      match.matchUser1Id('eq', me.id).matchUser2Id('eq', user.id),
    );
    if (myMatches.length > 0) {
      // we already swiped on them (eventually make it so that person doesn't show up)
      console.warn('You already swiped right to this user');
      return;
    }

    const theirMatches = await DataStore.query(Match, match =>
      match.matchUser1Id('eq', user.id).matchUser2Id('eq', me.id),
    );
    if (theirMatches.length > 0) {
      // Did they already swipe right on us
      console.log('This is a new match');
      const theirMatch = theirMatches[0]; // the first match
      DataStore.save(
        Match.copyOf(theirMatch, updated => (updated.isMatch = true)),
      );
      return;
    }

    DataStore.save(
      new Match({
        isMatch: false, // need both sides to swip in order for match to be made.
        User1: me,
        User2: user, // user here refers to the user whose profile is being displayed.
      }),
    );
  };
  const bottomIconSize = 30;

  return (
    <View style={styles.pageContainer}>
      <AnimatedStack
        data={users}
        renderItem={({item}) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      <View style={styles.icons}>
        <View style={styles.button}>
          <FontAwesome name="undo" size={bottomIconSize} color="#FBD88B" />
        </View>
        <View style={styles.button}>
          <Entypo name="cross" size={bottomIconSize} color="#F76C6B" />
        </View>
        <View style={styles.button}>
          <FontAwesome name="star" size={bottomIconSize} color="#3AB4CC" />
        </View>
        <View style={styles.button}>
          <FontAwesome name="heart" size={bottomIconSize} color="#4FCC94" />
        </View>
        <View style={styles.button}>
          <Ionicons name="flash" size={bottomIconSize} color="#A65CD2" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#ededed',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
});

export default HomeScreen;
