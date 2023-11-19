export const Home = (props) => {
    console.log(props.user)
    return (
    <div>
        {props.user?.Username ? `Hi ${props.user.Username}` : 'You are not logged in'}
    </div>
    )
};
