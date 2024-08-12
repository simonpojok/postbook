import {StyleSheet, FlatList, View, SafeAreaView} from 'react-native';

import {usePosts} from "@/hooks/posts/usePosts";
import {Divider, List, Text, Button, IconButton, MD3Colors} from 'react-native-paper';
import {Link} from "expo-router";

export default function HomeScreen() {
    const {loadingStatus, posts} = usePosts()
    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList style={styles.listContainer} data={posts} renderItem={({item}) => <Link href={`/post/${item.id}`}>
                <List.Item
                    title={item.user.name}
                    description={`@${item.user.username}`.toLowerCase()}
                    left={props => <List.Icon {...props} icon="face-man"/>}
                />
                <View style={styles.postContent}>
                    <Text style={styles.postTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.postDescription} numberOfLines={3}>{item.body}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <IconButton
                            icon="comment"
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />

                        <Text>69k</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <IconButton
                            icon="share"
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />

                        <Text>69k</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <IconButton
                            icon="bookmark"
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />

                        <Text>69k</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <IconButton
                            icon="access-point-check"
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />

                        <Text>69k</Text>
                    </View>
                </View>

                <Divider/>
            </Link>}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    postContent: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    postTitle: {
        fontSize: 16,
        fontFamily: 'bold',
        color: 'gray'
    },
    postDescription: {
        fontSize: 15,
        color: 'gray',
        paddingTop: 5,
    },
    commentsContainer: {
        marginLeft: 20,
        paddingHorizontal: 20,
        marginTop: 5,
    },
    userComment: {
        backgroundColor: 'grey',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    }
});
