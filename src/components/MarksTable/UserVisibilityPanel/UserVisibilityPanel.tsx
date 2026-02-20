import {useStore} from "../../../store/useStore.ts";
import {Button} from "antd";
import {useMemo} from "react";
import type {IMarkInfo} from "../../../interfaces/IMarkInfo.ts";

function UserVisibilityPanel({markers}: {markers: IMarkInfo[]}) {

    const userIds = useMemo(
        () => [...new Set(markers.map(m => m.user_id))],
        [markers]
    );
    const hiddenUserIds = useStore(state => state.hiddenUsersMarks);
    const toggleUser = useStore(state => state.toggleUser);

    return (
        <div>
            <h3>Фильтр по пользователям</h3>
            {userIds.map(userId => {
                const hidden = hiddenUserIds.includes(userId);
                return (
                    <Button
                        key={userId}
                        onClick={() => toggleUser(userId)}
                    >
                        User {userId} {hidden ? "(выключен)" : "(включен)"}
                    </Button>
                );
            })}
        </div>
    );

}

export default UserVisibilityPanel;