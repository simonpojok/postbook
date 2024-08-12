import {View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList, SafeAreaView} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import {List, MD2Colors} from "react-native-paper";
import {usePostDetail} from "@/hooks/posts/usePostDetail";
import {LoadingStatus} from "@/models/loading_status/loading_status.model";

export default function DetailsScreen() {
    const {id} = useLocalSearchParams();
    const {loadingStatus, post}: { post: Post, loadingStatus: LoadingStatus } = usePostDetail({id: Number(id)});

    if (loadingStatus === LoadingStatus.LOADING && post === null) {
        return (<ActivityIndicator animating={true} color={MD2Colors.red800}/>);
    }

    if (loadingStatus === LoadingStatus.ERROR && post === null) {
        return (<View style={styles.errorContainer}>
            <Text>Error Occurred</Text>
        </View>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View>
                    <List.Item
                        title={post.user.name}
                        description={`@${post.user.username}`.toLowerCase()}
                        left={props => <List.Icon {...props} icon="face-man"/>}
                        right={props => <List.Icon {...props} icon="dots-vertical"/>}
                    />

                    <Text style={styles.postContent}>
                        <Text>{post.title}</Text>
                        {post.body}
                    </Text>

                    <FlatList scrollEnabled={false} data={post.comments}
                              renderItem={({item}) => <View style={styles.commentContainer}>
                                  <Text style={styles.commentUserName}>{item.name}</Text>
                                  <Text>{item.body}</Text>
                              </View>}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postContent: {
        fontSize: 16,
        paddingHorizontal: 20,
    },
    commentContainer: {
        backgroundColor: 'gray',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 10,
    },
    commentUserName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});
