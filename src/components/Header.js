import React from 'react';
import { Menu, Button, message, Dropdown } from 'antd';
import { HomeOutlined, StarOutlined, AlipayCircleOutlined, SearchOutlined, YoutubeOutlined, WeiboCircleOutlined, GitlabOutlined, HeartOutlined  } from '@ant-design/icons';

import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

class Header extends React.Component {

    handleClick = e => {
        console.log(e.key);
        this.props.RenP(e.key, 0, this.props.pageSize);
    };
    render(){
        return(
            <Menu
                onClick={this.handleClick}
                defaultSelectedKeys={['1']}
                mode="horizontal"
                className="nav_bar"
            >
                <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/">Главная</Link></Menu.Item>
                    <SubMenu className="sub_menu" key="forever" icon={<StarOutlined />} title="Избранное">
                        {this.props.BookMarks.map((mark, key) => 
                        <Menu.Item key={"index="+key}>
                            <Link to={"/video_player?id="+mark[2]}><a href="/">{mark[1]}</a></Link>
                            <Button type="text" danger onClick={()=>{this.props.RemoveSaveBookMark(mark[0]); message.success("Успешное удаление: '" + mark[1] + "'");}}>x</Button>
                        </Menu.Item>)}
                    </SubMenu>
                <Menu.Item key="2" icon={<HeartOutlined />}><Link to="/">Рекомендации</Link></Menu.Item>
                <Menu.Item key="3" icon={<YoutubeOutlined />}><Link to="/">Фильмы</Link></Menu.Item>
                <Menu.Item key="4" icon={<GitlabOutlined />}><Link to="/">Сериалы</Link></Menu.Item>
                <Menu.Item key="5" icon={<WeiboCircleOutlined />}><Link to="/">Дорамы</Link></Menu.Item>
                <Menu.Item key="6" icon={<AlipayCircleOutlined />}><Link to="/">Аниме</Link></Menu.Item>
                <Menu.Item key="7" icon={<SearchOutlined />}><Link to="/searth">Поиск</Link></Menu.Item>
            </Menu>
        );
    }
}
export default Header;