import React, { useState } from 'react';
import { Button, Tooltip, message, Pagination } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined } from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Link,
    Redirect 
  } from "react-router-dom";

class Films extends React.Component {

    constructor() {
        super();
        this.state = {
            referrer: null,
            pageSize: 5,
        };
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    onShowSizeChange(current, pagesize) {
        console.log(current, pagesize);
        this.setState({pageSize: pagesize});
      }

    render(){
        const data = this.props.ContentVideo;
        console.log(data);
        console.log(this.state.pageSize);
        if(!data){return <div>Загрузка данных....</div>}
        
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;
        
        return(
            <Router>
                <div className="central">  
                <h2 style={{color: "white"}}>Поиск по сайту:</h2>
                    {data.map((post, key) =>
                    <div key={key} className="post-slot">
                        
                        <Tooltip title="Добавить в избранное" className="ForeverVideo">
                                <Button onClick={()=>{
                                if(localStorage.getItem("name")){
                                    this.props.SetSave(post[4], post[1]);
                                    message.success('Добавлено!');
                                }else{message.warning('Эта функция доступна только авторизованным лицам!');}
                                    }} type="primary" shape="circle" icon={<HeartOutlined/>}/>
                        </Tooltip>
                        {post[10] ? <img src={post[10]} height="200px"/> : <img src={require('../images/noposter.png')} height="200px"/>}
                        <Button className="post-slot-button" type="link" onClick={()=>{this.setState({referrer: "/video_player?id="+post[1]})}}><Link to={"/video_player?id="+post[1]}>{post[4]}</Link></Button>
                        {post[6] ?
                        <div className="info_panel">
                            <p>Год: {post[6]}</p>
                            <p>Страна: {post[12] && <p style={{display: "initial"}}>{post[12]} </p>}</p>
                            <p>Жанры: {post[13] && post[13]}</p>
                            <p>Продолжительность: {post[11]} мин.</p>
                            <br/>
                            <p>{post[9] && post[9]}</p>
                            <p className="kino_poisk">КиноПоиск: {post[14]}</p>
                            <p className="imdb">Imdb: {post[16]}</p>
                            <p className="quality">{post[7]}</p>
                        </div>
                        :
                        <p style={{color: "white"}}>Нет информации!</p>}
                    </div>
                    )}

                
                <Pagination className="pagination" defaultCurrent={1} total={this.props.Value} defaultPageSize={5} onChange={page => {this.props.sear(7, page-1, this.state.pageSize, this.props.search); window.scrollTo( 0, 0);}} onShowSizeChange={this.onShowSizeChange} pageSizeOptions={[5, 10, 20, 50, 100]}/>
            </div>
          </Router>
        );
    }
}

export default Films;