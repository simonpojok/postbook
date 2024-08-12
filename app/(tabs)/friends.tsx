import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useUsers} from "@/hooks/users/useUsers";
import {List, MD2Colors} from "react-native-paper";
import {LoadingStatus} from "@/models/loading_status/loading_status.model";

export default function FriendsTab() {
    const {users, loadingStatus} = useUsers()

    if (loadingStatus === LoadingStatus.LOADING) {
        return (<ActivityIndicator animating={true} color={MD2Colors.red800}/>);
    }

    return (
        <FlatList style={styles.usersContainer} data={users} renderItem={({item}) => <List.Item
            title={item.name}
            description={`@${item.username}`.toLowerCase()}
            left={props => <List.Icon {...props} icon="face-man"/>}
        />}/>
    );
}

const styles = StyleSheet.create({
    usersContainer: {
        flex: 1,
    }
});
