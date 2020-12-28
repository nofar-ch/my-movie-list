import 'antd/dist/antd.css';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.css'

const Profile = ({isSignIn, userName, image, textMessage}) => {
    return <div className="profile-container">
                <h2>Welcome {userName}!</h2>
                <div className="profileImage">
                    {
                    isSignIn ?
                        <Avatar size={90} src={image}/>
                    :  <Avatar size={90} icon={<UserOutlined/>}/>
                    }
                    </div>
                    <span>{textMessage}</span>     
            </div>
}

export default Profile;