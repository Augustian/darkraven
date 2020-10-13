import React from 'react';
import { Menu, Button, Dropdown} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
      <Menu.ItemGroup title="Управление аккаунтом">
          <Menu.Item key="setting:1"><a onClick={()=> alert(localStorage.getItem("token"))}>Get token</a></Menu.Item>
      </Menu.ItemGroup>

      <Menu.Item key="setting:4"><a href="/" onClick={()=>{localStorage.clear()}}>Выход</a></Menu.Item>
  </Menu>
);

class Profile extends React.Component {

    render(){
        return(
          <Dropdown className="profile" overlay={menu} placement="bottomRight">
            <Button type="dashed" icon={<UserOutlined />}>{localStorage.getItem("name")}</Button>
          </Dropdown>
        );
    }
}
export default Profile;
